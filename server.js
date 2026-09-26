const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const http = require("node:http");
const { SMTPServer } = require("smtp-server");

const PORT = Number(process.env.PORT || 3000);
const SMTP_PORT = Number(process.env.SMTP_PORT || 2525);
const PORTAL_ID = process.env.PORTAL_ID || "ai-alarm-portal";
const PORTAL_SECRET = process.env.PORTAL_SECRET || "change-me";
const DATA_FILE = path.join(__dirname, "data", "alarms.json");
const PUBLIC_DIR = path.join(__dirname, "public");
const LOGO_DIR = path.join(__dirname, "logo");

fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
let alarms = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) : [];
let handshakeToken = null;

function saveAlarms() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(alarms.slice(0, 500), null, 2));
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
      alarm.status = "acknowledged";
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
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`Alarm Portal running at http://localhost:${PORT}`);
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
