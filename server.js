const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const http = require("node:http");
const { SMTPServer } = require("smtp-server");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const SMTP_PORT = Number(process.env.SMTP_PORT || 2525);
const PORTAL_ID = process.env.PORTAL_ID || "ai-alarm-portal";
const PORTAL_SECRET = process.env.PORTAL_SECRET || "change-me";
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(__dirname, "data"));
const DATA_FILE = path.join(DATA_DIR, "alarms.json");
const SITES_FILE = path.join(DATA_DIR, "sites.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const SETUP_HISTORY_FILE = path.join(DATA_DIR, "setup-history.json");
const BREAK_STATUS_FILE = path.join(DATA_DIR, "break-status.json");
const PUBLIC_DIR = path.join(__dirname, "public");
const LOGO_DIR = path.join(__dirname, "logo");

const DEFAULT_USERS = [
  { username: "superadmin", password: "superadmin", role: "Superadmin", conditions: { viewLive: true, addUser: true, viewLogs: true } },
  { username: "admin", password: "admin123", role: "Admin", conditions: { viewLive: true, addUser: false, viewLogs: true } },
  { username: "operator", password: "operator123", role: "Operator", conditions: { viewLive: true, addUser: false, viewLogs: false } }
];

fs.mkdirSync(DATA_DIR, { recursive: true });
let alarms = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) : [];
let sites = fs.existsSync(SITES_FILE) ? JSON.parse(fs.readFileSync(SITES_FILE, "utf8")) : [];
let users = fs.existsSync(USERS_FILE) ? JSON.parse(fs.readFileSync(USERS_FILE, "utf8")) : DEFAULT_USERS;
let portalSettings = fs.existsSync(SETTINGS_FILE) ? JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8")) : {};
let setupHistory = fs.existsSync(SETUP_HISTORY_FILE) ? JSON.parse(fs.readFileSync(SETUP_HISTORY_FILE, "utf8")) : [];
const storedBreakState = fs.existsSync(BREAK_STATUS_FILE) ? JSON.parse(fs.readFileSync(BREAK_STATUS_FILE, "utf8")) : {};
let breakStatuses = storedBreakState && typeof storedBreakState === "object" && !Array.isArray(storedBreakState)
  ? storedBreakState
  : {};
if (typeof storedBreakState.active === "boolean") {
  const previousOperator = users.find((user) => user.role === "Operator" && (
    String(user.username).toLowerCase() === String(storedBreakState.startedBy || "").toLowerCase() ||
    String(user.fullName || "").toLowerCase() === String(storedBreakState.startedBy || "").toLowerCase()
  ));
  breakStatuses = previousOperator ? { [previousOperator.username]: { ...storedBreakState, username: previousOperator.username } } : {};
}
let handshakeToken = null;

function saveAlarms() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(alarms.slice(0, 500), null, 2));
}

function saveSites() {
  fs.writeFileSync(SITES_FILE, JSON.stringify(sites, null, 2));
}

function saveUsersList() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function savePortalSettings() {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(portalSettings, null, 2));
}

function saveSetupHistoryList() {
  fs.writeFileSync(SETUP_HISTORY_FILE, JSON.stringify(setupHistory.slice(0, 50), null, 2));
}

function saveBreakStatuses() {
  fs.writeFileSync(BREAK_STATUS_FILE, JSON.stringify(breakStatuses, null, 2));
}

function normalizeUser(user = {}) {
  const normalized = { ...user };
  normalized.username = String(normalized.username || "").trim();
  normalized.fullName = String(normalized.fullName || normalized.username || "").trim();
  normalized.password = String(normalized.password || "").trim();
  normalized.role = ["Superadmin", "Admin", "Operator"].includes(normalized.role) ? normalized.role : "Operator";
  const conditions = normalized.conditions && typeof normalized.conditions === "object" ? normalized.conditions : {};
  normalized.conditions = {
    viewLive: typeof conditions.viewLive === "boolean" ? conditions.viewLive : true,
    addUser: typeof conditions.addUser === "boolean" ? conditions.addUser : normalized.role === "Superadmin",
    viewLogs: typeof conditions.viewLogs === "boolean" ? conditions.viewLogs : ["Superadmin", "Admin"].includes(normalized.role)
  };
  if (!normalized.username || !normalized.password) {
    throw new Error("Username and password are required");
  }
  return normalized;
}

const normalizedUsers = users.map((user) => ({ ...user, conditions: normalizeUser(user).conditions }));
if (JSON.stringify(normalizedUsers) !== JSON.stringify(users)) {
  users = normalizedUsers;
  saveUsersList();
}

function normalizeSite(site = {}) {
  const normalized = { ...site };
  normalized.id = String(normalized.id || crypto.randomUUID());
  normalized.createdAt = normalized.createdAt || new Date().toISOString();
  normalized.siteName = String(normalized.siteName || "").trim();
  if (!normalized.siteName) {
    throw new Error("Site name is required");
  }
  return normalized;
}

function json(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => { body += chunk; });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function parseAlarm(raw) {
  const subject = (raw.match(/^Subject:\s*(.+)$/im) || [])[1] || "Motion detected";
  const sender = (raw.match(/^From:\s*(.+)$/im) || [])[1] || "AI Alarm Portal";
  const transferEncoding = (raw.match(/^Content-Transfer-Encoding:\s*(.+)$/im) || [])[1] || "";
  let body = raw.split(/\r?\n\r?\n/).slice(1).join("\n\n").trim();
  if (transferEncoding.toLowerCase().includes("quoted-printable")) {
    body = body.replace(/=\r?\n/g, "").replace(/=([0-9a-f]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }
  body = body.replace(/=\r?\n/g, "").trim();
  let details = {};
  try {
    details = JSON.parse(body);
  } catch {
    const camera = body.match(/camera\s*[:=]\s*(.+)/i);
    const location = body.match(/location\s*[:=]\s*(.+)/i);
    details = {
      camera: camera ? camera[1].trim() : "Unknown camera",
      location: location ? location[1].trim() : "Unknown location",
      message: body
    };
  }
  return {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    subject,
    sender,
    severity: details.severity || "warning",
    camera: details.camera || details.cameraName || "Unknown camera",
    location: details.location || "Unknown location",
    message: details.message || "Motion detected",
    confidence: details.confidence ?? null,
    status: "new"
  };
}

function addAlarm(raw) {
  const alarm = parseAlarm(raw);
  alarms.unshift(alarm);
  saveAlarms();
  console.log(`[alarm] ${alarm.camera} at ${alarm.location}`);
}

function buildAlarmFromPayload(payload = {}) {
  return {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    subject: payload.subject || payload.title || "Alert received",
    sender: payload.sender || "Webhook",
    severity: payload.severity || "warning",
    camera: payload.camera || payload.cameraName || payload.device || "Unknown camera",
    location: payload.location || payload.site || "Unknown location",
    message: payload.message || payload.body || payload.description || "Alert received",
    confidence: payload.confidence ?? null,
    status: "new"
  };
}

function addAlarmFromPayload(payload) {
  const alarm = buildAlarmFromPayload(payload);
  alarms.unshift(alarm);
  saveAlarms();
  console.log(`[webhook] ${alarm.camera} at ${alarm.location}`);
  return alarm;
}

const smtpServer = new SMTPServer({
  secure: false,
  authOptional: false,
  disabledCommands: ["STARTTLS"],
  onAuth(auth, session, callback) {
    if (auth.username !== PORTAL_ID || auth.password !== PORTAL_SECRET) {
      return callback(new Error("Invalid portal credentials"));
    }
    callback(null, { user: auth.username });
  },
  onData(stream, session, callback) {
    let raw = "";
    stream.on("data", (chunk) => { raw += chunk.toString(); });
    stream.on("end", () => {
      addAlarm(raw);
      callback();
    });
    stream.on("error", callback);
  }
});

function createServer() {
  return http.createServer(async (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (request.method === "GET" && url.pathname === "/healthz") {
      return json(response, 200, { ok: true });
    }
    if (request.method === "GET" && url.pathname === "/api/break-status") {
      const username = String(url.searchParams.get("username") || "").trim();
      if (!username) return json(response, 400, { ok: false, error: "Username is required" });
      return json(response, 200, { breakStatus: breakStatuses[username] || { username, active: false, startedAt: null, startedBy: null, endedAt: null } });
    }
    if (request.method === "POST" && url.pathname === "/api/break-status") {
      let body = "";
      try {
        body = await readBody(request);
      } catch {
        return json(response, 400, { ok: false, error: "Request body could not be read" });
      }
      let payload = {};
      try {
        payload = body ? JSON.parse(body) : {};
      } catch {
        return json(response, 400, { ok: false, error: "Expected a JSON object body" });
      }
      const username = String(payload?.username || "").trim();
      if (!payload || typeof payload.active !== "boolean" || !username) {
        return json(response, 400, { ok: false, error: "Username and active boolean are required" });
      }
      const operator = users.find((user) => user.username === username && user.role === "Operator");
      if (!operator) return json(response, 403, { ok: false, error: "Break mode is only available to Operators" });
      const currentBreakStatus = breakStatuses[username] || {};
      const timestamp = new Date().toISOString();
      breakStatuses[username] = payload.active
        ? {
          username,
          active: true,
          startedAt: currentBreakStatus.active ? currentBreakStatus.startedAt : timestamp,
          startedBy: operator.fullName || operator.username,
          endedAt: null
        }
        : {
          username,
          active: false,
          startedAt: currentBreakStatus.startedAt || null,
          startedBy: currentBreakStatus.startedBy || operator.fullName || operator.username,
          endedAt: timestamp
        };
      saveBreakStatuses();
      return json(response, 200, { ok: true, breakStatus: breakStatuses[username] });
    }
    if (request.method === "GET" && url.pathname === "/api/sites") {
      return json(response, 200, { sites, total: sites.length });
    }
    if (request.method === "POST" && url.pathname === "/api/sites") {
      let body = "";
      try {
        body = await readBody(request);
      } catch {
        return json(response, 400, { ok: false, error: "Request body could not be read" });
      }
      let payload = {};
      try {
        payload = body ? JSON.parse(body) : {};
      } catch {
        return json(response, 400, { ok: false, error: "Expected a JSON body" });
      }
      try {
        const site = normalizeSite(payload);
        sites.unshift(site);
        saveSites();
        return json(response, 201, { ok: true, site });
      } catch (error) {
        return json(response, 400, { ok: false, error: error.message || "Invalid site payload" });
      }
    }
    if (request.method === "PATCH" && url.pathname.startsWith("/api/sites/")) {
      const id = decodeURIComponent(url.pathname.slice("/api/sites/".length));
      const siteIndex = sites.findIndex((site) => site.id === id);
      if (siteIndex === -1) return json(response, 404, { ok: false, error: "Site not found" });
      let body = "";
      try {
        body = await readBody(request);
      } catch {
        return json(response, 400, { ok: false, error: "Request body could not be read" });
      }
      let payload = {};
      try {
        payload = body ? JSON.parse(body) : {};
      } catch {
        return json(response, 400, { ok: false, error: "Expected a JSON object body" });
      }
      if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return json(response, 400, { ok: false, error: "Expected a JSON object body" });
      }
      try {
        const site = normalizeSite({ ...sites[siteIndex], ...payload, id: sites[siteIndex].id });
        sites[siteIndex] = site;
        saveSites();
        return json(response, 200, { ok: true, site });
      } catch (error) {
        return json(response, 400, { ok: false, error: error.message || "Invalid site payload" });
      }
    }
    if (request.method === "GET" && url.pathname === "/api/users") {
      return json(response, 200, { users, total: users.length });
    }
    if (request.method === "POST" && url.pathname === "/api/users") {
      let body = "";
      try {
        body = await readBody(request);
      } catch {
        return json(response, 400, { ok: false, error: "Request body could not be read" });
      }
      let payload = [];
      try {
        payload = body ? JSON.parse(body) : [];
      } catch {
        return json(response, 400, { ok: false, error: "Expected a JSON array body" });
      }
      if (!Array.isArray(payload)) {
        return json(response, 400, { ok: false, error: "Expected a JSON array body" });
      }
      try {
        users = payload.map((user) => normalizeUser(user));
        saveUsersList();
        return json(response, 200, { ok: true, users });
      } catch (error) {
        return json(response, 400, { ok: false, error: error.message || "Invalid user payload" });
      }
    }
    if (request.method === "GET" && url.pathname === "/api/settings") {
      return json(response, 200, { settings: portalSettings || {} });
    }
    if (request.method === "POST" && url.pathname === "/api/settings") {
      let body = "";
      try {
        body = await readBody(request);
      } catch {
        return json(response, 400, { ok: false, error: "Request body could not be read" });
      }
      let payload = {};
      try {
        payload = body ? JSON.parse(body) : {};
      } catch {
        return json(response, 400, { ok: false, error: "Expected a JSON object body" });
      }
      portalSettings = { ...(portalSettings || {}), ...payload };
      savePortalSettings();
      return json(response, 200, { ok: true, settings: portalSettings });
    }
    if (request.method === "GET" && url.pathname === "/api/setup-history") {
      return json(response, 200, { entries: setupHistory.slice(0, 50) });
    }
    if (request.method === "POST" && url.pathname === "/api/setup-history") {
      let body = "";
      try {
        body = await readBody(request);
      } catch {
        return json(response, 400, { ok: false, error: "Request body could not be read" });
      }
      let payload = [];
      try {
        payload = body ? JSON.parse(body) : [];
      } catch {
        return json(response, 400, { ok: false, error: "Expected a JSON array body" });
      }
      if (!Array.isArray(payload)) {
        return json(response, 400, { ok: false, error: "Expected a JSON array body" });
      }
      setupHistory = payload.slice(0, 50);
      saveSetupHistoryList();
      return json(response, 200, { ok: true, entries: setupHistory });
    }
    if (request.method === "GET" && url.pathname === "/api/alarms") {
      return json(response, 200, { alarms, total: alarms.length });
    }
    if (request.method === "POST" && url.pathname === "/api/alerts") {
      let body = "";
      try {
        body = await readBody(request);
      } catch {
        return json(response, 400, { ok: false, error: "Request body could not be read" });
      }
      let payload = {};
      try {
        payload = body ? JSON.parse(body) : {};
      } catch {
        return json(response, 400, { ok: false, error: "Expected a JSON body" });
      }
      const alarm = addAlarmFromPayload(payload);
      return json(response, 200, { ok: true, alarm });
    }
    if (request.method === "POST" && url.pathname === "/api/handshake") {
      const body = JSON.parse(await readBody(request) || "{}");
      if (body.portalId !== PORTAL_ID || body.secret !== PORTAL_SECRET) {
        return json(response, 401, { ok: false, error: "Handshake rejected" });
      }
      handshakeToken = crypto.randomBytes(24).toString("hex");
      return json(response, 200, {
        ok: true,
        token: handshakeToken,
        smtp: { host: body.host || "this server", port: SMTP_PORT, secure: false, username: PORTAL_ID }
      });
    }
    if (request.method === "PATCH" && url.pathname.startsWith("/api/alarms/")) {
      const id = url.pathname.split("/").pop();
      const alarm = alarms.find((item) => item.id === id);
      if (!alarm) return json(response, 404, { error: "Alarm not found" });
      let payload = {};
      try {
        payload = JSON.parse(await readBody(request) || "{}");
      } catch {
        return json(response, 400, { error: "Expected a JSON body" });
      }
      const hasPinUpdate = Object.prototype.hasOwnProperty.call(payload, "pinned");
      if (hasPinUpdate && typeof payload.pinned !== "boolean") {
        return json(response, 400, { error: "Invalid pinned value" });
      }
      const hasSnoozeUpdate = Object.prototype.hasOwnProperty.call(payload, "snoozedUntil");
      const snoozedUntil = hasSnoozeUpdate && typeof payload.snoozedUntil === "string" ? Date.parse(payload.snoozedUntil) : NaN;
      const now = Date.now();
      if (hasSnoozeUpdate && (!Number.isFinite(snoozedUntil) || snoozedUntil <= now || snoozedUntil > now + 5 * 60 * 1000)) {
        return json(response, 400, { error: "Invalid snooze time" });
      }
      if (payload.status && !["acknowledged", "dismissed"].includes(payload.status)) {
        return json(response, 400, { error: "Invalid alarm status" });
      }
      const status = payload.status || (hasPinUpdate || hasSnoozeUpdate ? null : "acknowledged");
      if (hasPinUpdate) alarm.pinned = payload.pinned;
      if (hasSnoozeUpdate) alarm.snoozedUntil = new Date(snoozedUntil).toISOString();
      if (status === "acknowledged" && typeof payload.acknowledgedBy === "string") {
        const acknowledgedBy = payload.acknowledgedBy.trim().slice(0, 80);
        if (acknowledgedBy) alarm.acknowledgedBy = acknowledgedBy;
      }
      if (status) alarm.status = status;
      saveAlarms();
      return json(response, 200, alarm);
    }
    if (request.method === "GET") {
      if (url.pathname.startsWith("/logo/")) {
        const requested = path.normalize(path.join(LOGO_DIR, url.pathname.replace("/logo/", "")));
        if (!requested.startsWith(LOGO_DIR)) return json(response, 403, { error: "Forbidden" });
        return fs.readFile(requested, (error, content) => {
          if (error) return json(response, 404, { error: "Not found" });
          const type = requested.endsWith(".png") ? "image/png" : requested.endsWith(".svg") ? "image/svg+xml" : "application/octet-stream";
          response.writeHead(200, { "Content-Type": type });
          response.end(content);
        });
      }
      const requested = url.pathname === "/" ? "/index.html" : url.pathname;
      const file = path.normalize(path.join(PUBLIC_DIR, requested));
      if (!file.startsWith(PUBLIC_DIR)) return json(response, 403, { error: "Forbidden" });
      return fs.readFile(file, (error, content) => {
        if (error) return json(response, 404, { error: "Not found" });
        const type = file.endsWith(".css") ? "text/css" : file.endsWith(".js") ? "text/javascript" : "text/html";
        response.writeHead(200, { "Content-Type": `${type}; charset=utf-8` });
        response.end(content);
      });
    }
    json(response, 404, { error: "Not found" });
  });
}

function startServer() {
  if (process.env.NODE_ENV === "production" && (PORTAL_SECRET === "change-me" || PORTAL_SECRET.length < 32)) {
    throw new Error("Production requires PORTAL_SECRET to be a unique value of at least 32 characters.");
  }
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log(`Alarm Portal running at http://${HOST}:${PORT}`);
    console.log(`Handshake portal ID: ${PORTAL_ID}`);
  });
  return server;
}

function startServices() {
  smtpServer.on("error", (error) => {
    if (error && error.code === "EADDRINUSE") {
      console.warn(`[smtp] Port ${SMTP_PORT} is already in use; continuing without SMTP receiver.`);
      return;
    }
    console.error("[smtp] Server error", error);
  });

  smtpServer.listen(SMTP_PORT, () => {
    console.log(`SMTP receiver listening on port ${SMTP_PORT}`);
  });
  return startServer();
}

if (require.main === module) {
  startServices();
}

module.exports = { createServer, startServer, startServices, addAlarm, addAlarmFromPayload, buildAlarmFromPayload };
