const feed = document.querySelector("#feed");
const gridSizes = [2, 3, 4, 5];
const gridSizeStorageKey = "alarmPortal.gridSize";
const gridSizeButtons = Array.from(document.querySelectorAll(".grid-selector [data-grid-size]"));
const newCount = document.querySelector("#new-count");
const todayCount = document.querySelector("#today-count");
const clock = document.querySelector("#clock");
const receiverTools = document.querySelector(".receiver-tools");
const takeBreakTrigger = document.querySelector("#take-break-trigger");
const breakOverlay = document.querySelector("#break-overlay");
const breakStartedAt = document.querySelector("#break-started-at");
const doneBreakTrigger = document.querySelector("#done-break-trigger");
const breakConfirmDialog = document.querySelector("#break-confirm-dialog");
const breakConfirmCancel = document.querySelector("#break-confirm-cancel");
const breakConfirmStart = document.querySelector("#break-confirm-start");
const breakConfirmError = document.querySelector("#break-confirm-error");
const mainContainer = document.querySelector("#tab-content-container");
const navLinks = Array.from(document.querySelectorAll(".topnav a[data-view]"));
const historyTabButtons = Array.from(document.querySelectorAll("[data-history-view]"));
const historySiteFilter = document.querySelector("#history-site-filter");
const historyCameraFilter = document.querySelector("#history-camera-filter");
const historyDateFrom = document.querySelector("#history-date-from");
const historyDateTo = document.querySelector("#history-date-to");
const historyTableBody = document.querySelector("#history-table-body");
const historyCount = document.querySelector("#history-count");
const userLogsList = document.querySelector("#user-logs-list");
const userLogTabButtons = Array.from(document.querySelectorAll("[data-user-log-view]"));
const views = {
  alarms: document.querySelector("#view-alarms"),
  history: document.querySelector("#view-history"),
  sources: document.querySelector("#view-sources"),
  analytics: document.querySelector("#view-analytics"),
  sitesetup: document.querySelector("#view-sitesetup"),
  users: document.querySelector("#view-users"),
  logs: document.querySelector("#view-logs")
};
const setupForm = document.querySelector("#site-setup-form");
const setupStatus = document.querySelector("#setup-status");
const siteSetupPreview = document.querySelector("#site-setup-preview");
const authToggle = document.querySelector("#auth-toggle");
const mobileMenuToggle = document.querySelector("#mobile-menu-toggle");
const topnav = document.querySelector(".topnav");
const loginPanel = document.querySelector("#login-panel");
const loginForm = document.querySelector("#login-form");
const loginStatus = document.querySelector("#login-status");
const userNameElement = document.querySelector("#user-name");
const brandLogo = document.querySelector(".brand-logo");
const liveIndicator = document.querySelector("#live-indicator");
const liveLabel = document.querySelector("#live-label");
const alarmAckDialog = document.querySelector("#alarm-ack-dialog");
const alarmAckConfirm = document.querySelector("#alarm-ack-confirm");
const alarmAckCancel = document.querySelector("#alarm-ack-cancel");
const alarmAckClose = document.querySelector("#alarm-ack-close");
const alarmAckError = document.querySelector("#alarm-ack-error");
const alarmDismissDialog = document.querySelector("#alarm-dismiss-dialog");
const alarmDismissConfirm = document.querySelector("#alarm-dismiss-confirm");
const alarmDismissCancel = document.querySelector("#alarm-dismiss-cancel");
const alarmDismissClose = document.querySelector("#alarm-dismiss-close");
const alarmDismissError = document.querySelector("#alarm-dismiss-error");
const alarmSnoozeDialog = document.querySelector("#alarm-snooze-dialog");
const alarmSnoozePicker = document.querySelector("#alarm-snooze-picker");
const alarmSnoozeDurationLabel = document.querySelector("#alarm-snooze-duration-label");
const alarmSnoozeDurationButtons = Array.from(document.querySelectorAll("[data-snooze-duration]"));
const alarmSnoozeConfirm = document.querySelector("#alarm-snooze-confirm");
const alarmSnoozeCancel = document.querySelector("#alarm-snooze-cancel");
const alarmSnoozeClose = document.querySelector("#alarm-snooze-close");
const alarmSnoozeError = document.querySelector("#alarm-snooze-error");
const userForm = document.querySelector("#user-form");
const userStatus = document.querySelector("#user-status");
const usersList = document.querySelector("#users-list");
const siteInfoTabButtons = Array.from(document.querySelectorAll(".site-info-tabs [data-site-tab]"));
const siteActions = document.querySelector(".site-actions");
const siteOverviewGrid = document.querySelector("#site-overview-grid");
const siteDirectoryPreview = document.querySelector("#site-directory-preview");
const siteSearchInput = document.querySelector("#site-search-input");
const siteAddTrigger = document.querySelector("#site-add-trigger");
const siteDetailsPanel = document.querySelector("#site-details-panel");
const siteDetailsTitle = document.querySelector("#site-details-title");
const siteDetailsContent = document.querySelector("#site-details-content");
const siteDetailsCloseIcon = document.querySelector("#site-details-close-icon");
const siteEditTrigger = document.querySelector("#site-edit-trigger");
const siteScheduleForm = document.querySelector("#site-schedule-form");
const siteScheduleDays = document.querySelector("#site-schedule-days");
const siteScheduleStatus = document.querySelector("#site-schedule-status");
const siteMonitoring24Hours = document.querySelector("#site-monitoring-24-hours");
const siteMonitoringNote = document.querySelector("#site-monitoring-note");
const siteMonitoringStatus = document.querySelector("#site-monitoring-status");
const siteMapForm = document.querySelector("#site-map-form");
const siteMapEmbedField = document.querySelector("#site-map-embed-field");
const siteMapEditUrl = document.querySelector("#site-map-edit-url");
const siteMapRemove = document.querySelector("#site-map-remove");
const siteMapPreview = document.querySelector("#site-map-preview");
const siteMapStatus = document.querySelector("#site-map-status");
const addSitePanel = document.querySelector("#add-site-panel");
const addSiteForm = document.querySelector("#add-site-form");
const addSiteTitle = document.querySelector("#add-site-title");
const addSiteDescription = document.querySelector("#add-site-description");
const addSiteSubmit = document.querySelector("#add-site-submit");
const addSiteClose = document.querySelector("#add-site-close");
const addSiteCancel = document.querySelector("#add-site-cancel");
const addSiteStatus = document.querySelector("#add-site-status");
const clientContactsList = document.querySelector("#client-contacts-list");
const addClientContact = document.querySelector("#add-client-contact");
const setupHistoryPanel = document.querySelector("#setup-history-panel");
const siteIntegrationPanel = document.querySelector("#site-integration-panel");
const siteIntegrationDirectory = document.querySelector("#site-integration-directory");
const integrationSiteSearchInput = document.querySelector("#integration-site-search-input");
const siteIntegrationDetails = document.querySelector("#site-integration-details");
const siteIntegrationTitle = document.querySelector("#site-integration-title");
const siteIntegrationForm = document.querySelector("#site-integration-form");
const siteIntegrationStatus = document.querySelector("#site-integration-status");
const setupHistoryList = document.querySelector("#setup-history-list");
const setupHistoryTrigger = document.querySelector("#setup-history-trigger");
const setupHistoryBack = document.querySelector("#setup-history-back");
const siteStorageKey = "alarmPortal.sites";
const userStorageKey = "alarmPortal.users";
const settingsStorageKey = "alarmPortal.siteSettings";
const setupHistoryStorageKey = "alarmPortal.setupHistory";
const breakUserStorageKey = "alarmPortal.breakUsername";
const SCHEDULE_DAYS = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" }
];
const savedGridSize = Number(localStorage.getItem(gridSizeStorageKey));
let currentGridSize = gridSizes.includes(savedGridSize) ? savedGridSize : 3;
let currentAlarms = [];
let alarmGridAvailable = false;
let breakStatus = { username: null, active: false, startedAt: null, startedBy: null, endedAt: null };
let currentSiteName = "Alarm Portal";
let expandedAlarmId = null;
let lastAlarmGridSignature = null;
let connectionStatusTimeout = null;
let pendingAcknowledgeAlarmId = null;
let pendingDismissAlarmId = null;
let pendingSnoozeAlarmId = null;
let selectedSnoozeMinutes = 5;
let activeHistoryView = "global";
let activeUserLogView = "system-update";
let selectedSiteId = null;
let selectedIntegrationSiteId = null;
let editingSiteId = null;

function fitAlarmGrid() {
  if (!feed || views.alarms?.classList.contains("hidden")) return;
  const feedRect = feed.getBoundingClientRect();
  if (!feedRect.width) return;

  const main = feed.closest("main");
  const bottomPadding = parseFloat(getComputedStyle(main).paddingBottom) || 0;
  feed.style.height = `${Math.max(0, window.innerHeight - feedRect.top - bottomPadding - 2)}px`;

  const feedStyle = getComputedStyle(feed);
  const horizontalPadding = (parseFloat(feedStyle.paddingLeft) || 0) + (parseFloat(feedStyle.paddingRight) || 0);
  const verticalPadding = (parseFloat(feedStyle.paddingTop) || 0) + (parseFloat(feedStyle.paddingBottom) || 0);
  const columnGap = parseFloat(feedStyle.columnGap) || 0;
  const rowGap = parseFloat(feedStyle.rowGap) || 0;
  const tileWidth = Math.max(0, Math.floor((feed.clientWidth - horizontalPadding - columnGap * (currentGridSize - 1)) / currentGridSize));
  const tileHeight = Math.max(0, Math.floor((feed.clientHeight - verticalPadding - rowGap * (currentGridSize - 1)) / currentGridSize));
  feed.style.setProperty("--alarm-tile-width", `${tileWidth}px`);
  feed.style.setProperty("--alarm-tile-height", `${tileHeight}px`);
  const expandedTile = feed.querySelector(".alarm-expanded");
  if (expandedTile) {
    const headerHeight = document.querySelector(".topbar")?.getBoundingClientRect().height || 0;
    expandedTile.style.width = `${Math.min(tileWidth * 1.5, Math.max(0, window.innerWidth - 32))}px`;
    expandedTile.style.height = `${Math.min(tileHeight * 1.5, Math.max(0, window.innerHeight - headerHeight - 32))}px`;
    expandedTile.style.left = "50%";
    expandedTile.style.top = `${headerHeight + (window.innerHeight - headerHeight) / 2}px`;
    feed.style.setProperty("--alarm-expanded-top", `${headerHeight}px`);
  }
}

const ROLE_PERMISSIONS = {
  Superadmin: ["alarms", "history", "sources", "analytics", "sitesetup", "users"],
  Admin: ["alarms", "history", "sources", "analytics", "sitesetup"],
  Operator: ["alarms", "history", "sitesetup"]
};

const DEFAULT_USERS = [
  { username: "superadmin", password: "superadmin", role: "Superadmin", conditions: { viewLive: true, addUser: true, viewLogs: true } },
  { username: "admin", password: "admin123", role: "Admin", conditions: { viewLive: true, addUser: false, viewLogs: true } },
  { username: "operator", password: "operator123", role: "Operator", conditions: { viewLive: true, addUser: false, viewLogs: false } }
];

function getUserConditions(user = {}) {
  const conditions = user.conditions && typeof user.conditions === "object" ? user.conditions : {};
  return {
    viewLive: typeof conditions.viewLive === "boolean" ? conditions.viewLive : true,
    addUser: typeof conditions.addUser === "boolean" ? conditions.addUser : user.role === "Superadmin",
    viewLogs: typeof conditions.viewLogs === "boolean" ? conditions.viewLogs : ["Superadmin", "Admin"].includes(user.role)
  };
}

function normalizeUserConditions(user = {}) {
  return { ...user, conditions: getUserConditions(user) };
}

function updateClock() { if (clock) clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

function setConnectionStatus(statusText) {
  if (connectionStatusTimeout !== null) {
    clearTimeout(connectionStatusTimeout);
    connectionStatusTimeout = null;
  }
  const updateStatus = () => {
    const liveState = statusText === "Connected" ? "connected" : statusText === "Checking..." ? "checking" : "disconnected";
    const statusTitle = liveState === "connected" ? "System connected" : liveState === "checking" ? "Checking system connection" : "System disconnected";
    if (brandLogo) {
      brandLogo.classList.remove("connected", "checking", "disconnected");
      brandLogo.classList.add(liveState);
      brandLogo.title = statusTitle;
    }
    if (liveIndicator && liveLabel) {
      liveLabel.textContent = liveState === "connected" ? "LIVE" : liveState === "checking" ? "SYNCING" : "OFFLINE";
      liveIndicator.classList.remove("connected", "checking", "disconnected");
      liveIndicator.classList.add(liveState);
      liveIndicator.title = liveState === "connected" ? "Live alarms connected" : liveState === "checking" ? "Checking alarm connection" : "Alarm stream offline";
    }
  };
  if (statusText === "Checking...") {
    connectionStatusTimeout = setTimeout(() => {
      connectionStatusTimeout = null;
      updateStatus();
    }, 500);
    return;
  }
  updateStatus();
}

function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(userStorageKey) || "null");
    return Array.isArray(users) && users.length ? users.map(normalizeUserConditions) : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
}

async function syncUsersFromServer() {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error("Failed to load users");
    const { users } = await response.json();
    const normalized = Array.isArray(users) ? users.map(normalizeUserConditions) : DEFAULT_USERS;
    localStorage.setItem(userStorageKey, JSON.stringify(normalized));
    return normalized;
  } catch {
    const fallback = getUsers();
    localStorage.setItem(userStorageKey, JSON.stringify(fallback));
    return fallback;
  }
}

async function persistUsersToServer(users) {
  const normalized = Array.isArray(users) ? users.map(normalizeUserConditions) : DEFAULT_USERS;
  localStorage.setItem(userStorageKey, JSON.stringify(normalized));
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized)
    });
    if (!response.ok) throw new Error("Failed to save users");
    return normalized;
  } catch {
    return normalized;
  }
}

function saveUsers(users) {
  localStorage.setItem(userStorageKey, JSON.stringify(users));
}

let userFormMode = "add";
let userEditTarget = null;

function renderUsers() {
  if (!usersList) return;
  const users = getUsers();
  const canManageUsers = getAuthState().role === "Superadmin";
  usersList.innerHTML = users.map((user) => `
      <div class="user-row ${user.username === userEditTarget ? "user-row-active" : ""}" data-user="${escapeHtml(user.username)}">
        <div class="user-identity"><strong>${escapeHtml(user.fullName || "Full name not set")}</strong><span>${escapeHtml(user.username)}</span></div>
        <div><span class="role-badge role-${user.role.toLowerCase()}">${escapeHtml(user.role)}</span></div>
        <div class="user-row-actions">
          ${canManageUsers ? `<button class="user-update" data-user="${escapeHtml(user.username)}">Update</button>${user.role === "Superadmin" ? "" : `<button class="user-delete" data-user="${escapeHtml(user.username)}">Remove</button>`}` : ""}
        </div>
      </div>`).join("");
}

function updateUserFormMode() {
  if (!userForm) return;
  const heading = document.querySelector("#user-form-heading");
  const submitButton = userForm.querySelector("button[type='submit']");
  const cancelButton = document.querySelector("#user-form-cancel");
  const passwordInput = userForm.querySelector("[name='password']");
  const auth = getAuthState();
  const canAddUsers = auth.role === "Superadmin" || getUserConditions(auth).addUser;
  userForm.classList.toggle("hidden", !canAddUsers);
  if (userFormMode === "edit" && userEditTarget) {
    if (heading) heading.textContent = "Update user";
    if (submitButton) submitButton.textContent = "Save Changes";
    cancelButton?.classList.remove("hidden");
    if (passwordInput) {
      passwordInput.required = false;
      passwordInput.placeholder = "Leave blank to keep current password";
    }
  } else {
    if (heading) heading.textContent = "Add user";
    if (submitButton) submitButton.textContent = "Add User";
    cancelButton?.classList.add("hidden");
    if (passwordInput) {
      passwordInput.required = true;
      passwordInput.placeholder = "temporary password";
    }
  }
}

function startUserEdit(username) {
  const user = getUsers().find((item) => item.username === username);
  if (!user || !userForm) return;
  userFormMode = "edit";
  userEditTarget = username;
  const usernameInput = userForm.querySelector("[name='username']");
  const fullNameInput = userForm.querySelector("[name='fullName']");
  const passwordInput = userForm.querySelector("[name='password']");
  const roleInput = userForm.querySelector("[name='role']");
  if (usernameInput) usernameInput.value = user.username;
  if (fullNameInput) fullNameInput.value = user.fullName || "";
  if (passwordInput) passwordInput.value = "";
  if (roleInput) roleInput.value = user.role;
  ["viewLive", "addUser", "viewLogs"].forEach((condition) => {
    const input = userForm.querySelector(`[name='${condition}']`);
    if (input) input.checked = getUserConditions(user)[condition];
  });
  updateUserFormMode();
  renderUsers();
  usernameInput?.focus();
}

function resetUserForm() {
  if (!userForm) return;
  userFormMode = "add";
  userEditTarget = null;
  userForm.reset();
  if (userForm.querySelector("[name='role']")) {
    userForm.querySelector("[name='role']").value = "Admin";
  }
  updateUserFormMode();
  renderUsers();
}

function applyPermissions(auth) {
  const allowed = auth.loggedIn && auth.role && ROLE_PERMISSIONS[auth.role] ? [...ROLE_PERMISSIONS[auth.role]] : ["alarms"];
  const conditions = getUserConditions(auth);
  if (!conditions.viewLive) allowed.splice(allowed.indexOf("alarms"), 1);
  if (auth.loggedIn && (auth.role === "Superadmin" || conditions.addUser)) allowed.push("users");
  if (auth.loggedIn && conditions.viewLogs) allowed.push("logs");
  const canManageSites = auth.loggedIn && ["Superadmin", "Admin"].includes(auth.role);
  const canViewSetupHistory = auth.loggedIn && ["Superadmin", "Admin"].includes(auth.role);
  navLinks.forEach((link) => {
    const visible = allowed.includes(link.dataset.view);
    link.style.display = visible ? "inline-flex" : "none";
  });
  siteAddTrigger?.classList.toggle("hidden", !canManageSites);
  siteEditTrigger?.classList.toggle("hidden", !canManageSites);
  setupHistoryTrigger?.classList.toggle("hidden", !canViewSetupHistory);
  mainContainer?.classList.toggle("operator-view", auth.loggedIn && auth.role === "Operator");
  topnav?.classList.add("ready");
  if (auth.loggedIn && !allowed.includes(getViewFromHash())) {
    setActiveView("alarms");
    window.location.hash = "#alarms";
  }
  const selectedSite = selectedSiteId && getSavedSites().find((site) => site.id === selectedSiteId);
  if (selectedSite && allowed.includes("sitesetup")) renderSiteDetails(selectedSite);
}

function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }
function capitalizeWords(value) {
  return String(value || "").replace(/(^|[\s'-])([a-z])/g, (_, separator, letter) => `${separator}${letter.toUpperCase()}`);
}
function getViewFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash === "history" || hash === "sources" || hash === "analytics" || hash === "sitesetup" || hash === "users" || hash === "logs") return hash;
  return "alarms";
}
function setActiveView(viewName) {
  let normalized = views[viewName] ? viewName : "alarms";
  const auth = getAuthState();
  const conditions = getUserConditions(auth);
  const roleViews = ROLE_PERMISSIONS[auth.role] || [];
  const allowed = (roleViews.includes(normalized) && (normalized !== "alarms" || conditions.viewLive)) || (normalized === "users" && (auth.role === "Superadmin" || conditions.addUser)) || (normalized === "logs" && conditions.viewLogs);
  if (!allowed) normalized = "alarms";
  navLinks.forEach((link) => {
    const active = link.dataset.view === normalized;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
  Object.entries(views).forEach(([key, view]) => {
    if (view) view.classList.toggle("hidden", key !== normalized);
  });
  mainContainer?.classList.toggle("alarm-view-active", normalized === "alarms");
  mainContainer?.classList.toggle("site-view-active", normalized === "sitesetup");
  receiverTools?.classList.toggle("hidden", normalized !== "alarms");
  if (normalized === "alarms") fitAlarmGrid();
  if (normalized === "history") renderAlarmHistory();
  if (normalized === "logs") renderUserLogs();
}
async function syncSettingsFromServer() {
  try {
    const response = await fetch("/api/settings");
    if (!response.ok) throw new Error("Failed to load settings");
    const { settings } = await response.json();
    const normalized = settings && typeof settings === "object" ? settings : {};
    localStorage.setItem(settingsStorageKey, JSON.stringify(normalized));
    return normalized;
  } catch {
    const fallback = JSON.parse(localStorage.getItem(settingsStorageKey) || "null") || {};
    localStorage.setItem(settingsStorageKey, JSON.stringify(fallback));
    return fallback;
  }
}

async function persistSettingsToServer(settings) {
  const payload = settings && typeof settings === "object" ? settings : {};
  localStorage.setItem(settingsStorageKey, JSON.stringify(payload));
  try {
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Failed to save settings");
    return payload;
  } catch {
    return payload;
  }
}

async function loadSiteSettings() {
  const defaults = {
    siteName: "Alarm Portal",
    webhookUrl: "http://localhost:5000/api/alerts",
    portalId: "ai-alarm-portal",
    portalSecret: "change-me",
    contactEmail: "ops@example.com"
  };
  const saved = await syncSettingsFromServer();
  const values = { ...defaults, ...(saved || {}) };
  currentSiteName = values.siteName || defaults.siteName;
  if (setupForm) {
    Array.from(setupForm.elements).forEach((field) => {
      if (field.name) field.value = values[field.name] ?? "";
    });
  }
  if (siteSetupPreview) {
    siteSetupPreview.innerHTML = `
      <h3>${escapeHtml(values.siteName || "Alarm Portal")}</h3>
      <p><strong>Webhook:</strong> ${escapeHtml(values.webhookUrl || "http://localhost:5000/api/alerts")}</p>
      <p><strong>Portal ID:</strong> ${escapeHtml(values.portalId || "ai-alarm-portal")}</p>
      <p><strong>Contact:</strong> ${escapeHtml(values.contactEmail || "ops@example.com")}</p>`;
  }
  await syncSavedSitesFromServer();
  await syncUsersFromServer();
  await syncSetupHistoryFromServer();
  renderSiteDirectory();
  renderAlarmGrid();
  return values;
}
function getSavedSites() {
  try {
    const sites = JSON.parse(localStorage.getItem(siteStorageKey) || "[]");
    return Array.isArray(sites) ? sites : [];
  } catch {
    return [];
  }
}
async function syncSavedSitesFromServer() {
  try {
    const response = await fetch("/api/sites");
    if (!response.ok) throw new Error("Failed to load sites");
    const { sites } = await response.json();
    const normalized = Array.isArray(sites) ? sites : [];
    localStorage.setItem(siteStorageKey, JSON.stringify(normalized));
    return normalized;
  } catch {
    return getSavedSites();
  }
}
async function persistSiteToServer(site) {
  const normalized = {
    ...site,
    id: site.id || crypto.randomUUID(),
    createdAt: site.createdAt || new Date().toISOString()
  };
  try {
    const response = await fetch("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized)
    });
    if (!response.ok) throw new Error("Failed to save site");
    const { site: savedSite } = await response.json();
    const currentSites = getSavedSites();
    const nextSites = [savedSite, ...currentSites.filter((item) => item.id !== savedSite.id)];
    localStorage.setItem(siteStorageKey, JSON.stringify(nextSites));
    return savedSite;
  } catch {
    const currentSites = getSavedSites();
    currentSites.push(normalized);
    localStorage.setItem(siteStorageKey, JSON.stringify(currentSites));
    return normalized;
  }
}
async function updateSiteOnServer(site) {
  const updatedSite = { ...site };
  const response = await fetch(`/api/sites/${encodeURIComponent(updatedSite.id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedSite)
  });
  if (!response.ok) throw new Error("Failed to update site");
  const { site: savedSite } = await response.json();
  const sites = getSavedSites().map((item) => item.id === savedSite.id ? savedSite : item);
  localStorage.setItem(siteStorageKey, JSON.stringify(sites));
  return savedSite;
}
function renderSiteDirectoryInto(container, searchInput, activeSiteId) {
  if (!container) return;
  const sites = getSavedSites();
  const query = searchInput?.value.trim().toLocaleLowerCase() || "";
  const matchingSites = sites.filter((site) => String(site.siteName || "Unnamed site").toLocaleLowerCase().includes(query));
  container.innerHTML = `${matchingSites.map((site) => `
    <button class="site-node ${site.id === activeSiteId ? "active" : ""}" type="button" data-site-id="${escapeHtml(site.id)}" aria-pressed="${site.id === activeSiteId}"><strong>${escapeHtml(site.siteName || "Unnamed site")}</strong>${site.siteAddress || site.address ? `<span>${escapeHtml(site.siteAddress || site.address)}</span>` : ""}</button>`).join("")}${query && !matchingSites.length ? `<div class="site-directory-empty">No sites match "${escapeHtml(searchInput.value.trim())}".</div>` : !query && !sites.length ? `<div class="site-directory-empty">No sites configured.</div>` : ""}`;
}
function renderSiteDirectory() {
  renderSiteDirectoryInto(siteDirectoryPreview, siteSearchInput, selectedSiteId);
  renderIntegrationSiteDirectory();
}
function renderIntegrationSiteDirectory() {
  renderSiteDirectoryInto(siteIntegrationDirectory, integrationSiteSearchInput, selectedIntegrationSiteId);
}
function getIntegrationDefaults() {
  let settings = {};
  try {
    settings = JSON.parse(localStorage.getItem(settingsStorageKey) || "{}") || {};
  } catch {
    settings = {};
  }
  return {
    webhookUrl: settings.webhookUrl || "http://localhost:5000/api/alerts",
    deviceId: settings.deviceId || settings.portalId || "ai-alarm-portal",
    portalSecret: settings.portalSecret || "change-me"
  };
}
function renderIntegrationSetup(site) {
  if (!siteIntegrationDetails || !siteIntegrationForm) return;
  selectedIntegrationSiteId = site.id;
  siteIntegrationTitle.textContent = site.siteName || "Unnamed site";
  siteIntegrationDetails.classList.remove("hidden");
  const integration = site.integration && typeof site.integration === "object" ? site.integration : {};
  const defaults = getIntegrationDefaults();
  const integrationValues = { ...integration, deviceId: integration.deviceId ?? integration.portalId };
  siteIntegrationForm.elements.namedItem("enabled").checked = integration.enabled === true;
  ["webhookUrl", "deviceId", "portalSecret"].forEach((fieldName) => {
    siteIntegrationForm.elements.namedItem(fieldName).value = integrationValues[fieldName] ?? defaults[fieldName];
  });
  if (siteIntegrationStatus) {
    siteIntegrationStatus.textContent = "";
    siteIntegrationStatus.className = "setup-status";
  }
  renderIntegrationSiteDirectory();
}
function createClientContactCard(contactNumber, values = {}) {
  const contact = document.createElement("fieldset");
  contact.className = "client-contact-card";
  contact.innerHTML = `<legend>Contact ${contactNumber}</legend><button class="client-contact-remove" type="button" aria-label="Remove contact ${contactNumber}">Remove</button><label>Full Name<input type="text" data-contact-field="fullName" autocomplete="name" autocapitalize="words" required></label><label>Designation<input type="text" data-contact-field="designation" autocapitalize="words"></label><label>Email Address<input type="email" data-contact-field="email" autocomplete="email"></label><label>Contact Number<input type="tel" data-contact-field="contactNumber" autocomplete="tel"></label><label>Master Password / Entry Access Code<input type="text" data-contact-field="entryAccessCode" autocomplete="off" autocapitalize="off" spellcheck="false"></label><p class="master-password-note">Saved in this browser with the site. Anyone with access to this browser can view it.</p>`;
  Object.entries(values).forEach(([key, value]) => {
    const field = contact.querySelector(`[data-contact-field="${key}"]`);
    if (field) field.value = value ?? "";
  });
  return contact;
}
function resetAddSiteForm() {
  if (!addSiteForm) return;
  editingSiteId = null;
  addSiteForm.reset();
  clientContactsList?.querySelectorAll(".client-contact-card:not(:first-child)").forEach((contact) => contact.remove());
  clientContactsList?.querySelectorAll(".client-contact-card [data-contact-field]").forEach((field) => { field.value = ""; });
  clientContactsList?.querySelector("[data-contact-field='fullName']")?.setAttribute("required", "");
  if (addSiteTitle) addSiteTitle.textContent = "Add Site";
  if (addSiteDescription) addSiteDescription.textContent = "Enter site details and client contacts.";
  if (addSiteSubmit) addSiteSubmit.textContent = "Add Site";
  if (addSiteStatus) {
    addSiteStatus.textContent = "";
    addSiteStatus.className = "setup-status";
  }
}
function startSiteEdit(site) {
  if (!addSiteForm || !clientContactsList) return;
  resetAddSiteForm();
  editingSiteId = site.id;
  Array.from(addSiteForm.elements).forEach((field) => {
    if (field.name && Object.prototype.hasOwnProperty.call(site, field.name)) field.value = site[field.name] ?? "";
  });
  const hasSavedContacts = Array.isArray(site.clientContacts) && site.clientContacts.length > 0;
  const contacts = hasSavedContacts ? site.clientContacts : [{}];
  const contactCards = Array.from(clientContactsList.querySelectorAll(".client-contact-card"));
  contacts.forEach((contact, index) => {
    const card = contactCards[index] || createClientContactCard(index + 1, contact);
    if (contactCards[index]) {
      Object.entries(contact).forEach(([key, value]) => {
        const field = card.querySelector(`[data-contact-field="${key}"]`);
        if (field) field.value = value ?? "";
      });
    } else {
      clientContactsList.append(card);
    }
  });
  contactCards.slice(contacts.length).forEach((contact) => contact.remove());
  if (!hasSavedContacts) clientContactsList.querySelector("[data-contact-field='fullName']")?.removeAttribute("required");
  if (addSiteTitle) addSiteTitle.textContent = "Update Site";
  if (addSiteDescription) addSiteDescription.textContent = `Update information for ${site.siteName || "this site"}.`;
  if (addSiteSubmit) addSiteSubmit.textContent = "Save Changes";
  addSitePanel?.showModal();
  addSiteForm.elements.namedItem("siteName")?.focus();
}
function renderSiteDetails(site) {
  if (!siteDetailsTitle || !siteDetailsContent || !siteDetailsPanel) return;
  selectedSiteId = site.id;
  siteDetailsPanel.classList.remove("hidden");
  siteDetailsTitle.textContent = site.siteName || "Unnamed site";
  const detailRow = (label, value) => `<div class="site-detail-item"><dt>${escapeHtml(label)}</dt><dd>${value ? escapeHtml(value) : "Not provided"}</dd></div>`;
  const section = (title, rows, className = "") => `<section class="site-detail-section ${className}"><h3>${escapeHtml(title)}</h3><dl>${rows.join("")}</dl></section>`;
  const contacts = Array.isArray(site.clientContacts) ? site.clientContacts : [];
  const contactSections = contacts.length ? contacts.map((contact, index) => section(`Client Contact ${index + 1}`, [
    detailRow("Full Name", contact.fullName),
    detailRow("Designation", contact.designation),
    detailRow("Email Address", contact.email),
    detailRow("Contact Number", contact.contactNumber),
    detailRow("Entry Access Code", contact.entryAccessCode)
  ])).join("") : `<p class="site-details-empty">No client contacts configured.</p>`;
  siteDetailsContent.innerHTML = [
    section("Site Information", [
      detailRow("Site Address", site.siteAddress || site.address),
      detailRow("Time Zone", site.timeZone),
      detailRow("Type", site.siteType),
      detailRow("Site Notes", site.siteNotes || site.notes)
    ], "site-detail-primary"),
    section("Police Department", [detailRow("State", site.policeState), detailRow("Contact Number", site.policeContactNumber)]),
    section("Fire Department", [detailRow("State", site.fireState), detailRow("Contact Number", site.fireContactNumber)]),
    section("Security Information", [detailRow("Name", site.securityName), detailRow("Contact Number", site.securityContactNumber)]),
    `<section class="site-detail-section site-detail-contacts"><h3>Client Contact Information</h3>${contactSections}</section>`
  ].join("");
  const schedule = site.schedule && typeof site.schedule === "object" ? site.schedule : {};
  const canManageSite = canManageSiteConfiguration();
  const monitoring24Hours = site.monitoring24Hours === true;
  if (siteMonitoring24Hours) siteMonitoring24Hours.checked = monitoring24Hours;
  if (siteMonitoring24Hours) siteMonitoring24Hours.disabled = !canManageSite;
  if (siteScheduleForm) siteScheduleForm.hidden = monitoring24Hours;
  siteScheduleForm?.querySelector("button[type='submit']")?.toggleAttribute("hidden", !canManageSite);
  if (siteMonitoringNote) siteMonitoringNote.hidden = !monitoring24Hours;
  if (siteMonitoringStatus) siteMonitoringStatus.textContent = "";
  if (siteScheduleDays) {
    siteScheduleDays.innerHTML = SCHEDULE_DAYS.map(({ key, label }) => {
      const day = schedule[key] || {};
      const enabled = day.enabled === true;
      const controlsDisabled = !canManageSite || !enabled;
      return `<div class="site-schedule-row"><label class="site-schedule-day"><input type="checkbox" name="${key}-enabled" data-schedule-enabled="${key}" ${enabled ? "checked" : ""} ${canManageSite ? "" : "disabled"}><span>${label}</span></label><input type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" name="${key}-start" aria-label="${label} start time (24-hour HH:MM)" placeholder="HH:MM" value="${escapeHtml(day.start || "09:00")}" ${controlsDisabled ? "disabled" : ""}><input type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" name="${key}-end" aria-label="${label} end time (24-hour HH:MM)" placeholder="HH:MM" value="${escapeHtml(day.end || "17:00")}" ${controlsDisabled ? "disabled" : ""}></div>`;
    }).join("");
  }
  const map = site.siteMap && parseGoogleMapsEmbed(site.siteMap.embedUrl) ? site.siteMap : null;
  if (siteMapForm) {
    siteMapForm.hidden = !canManageSite;
    siteMapForm.elements.namedItem("name").value = map?.name || "";
    siteMapForm.elements.namedItem("embed").value = map?.embedUrl || "";
  }
  if (siteMapEmbedField) siteMapEmbedField.hidden = Boolean(map);
  if (siteMapEditUrl) {
    siteMapEditUrl.hidden = !canManageSite || !map;
    siteMapEditUrl.textContent = "Edit Embed URL";
  }
  if (siteMapRemove) siteMapRemove.hidden = !canManageSite || !map;
  if (siteMapPreview) {
    siteMapPreview.innerHTML = map
      ? `<iframe src="${escapeHtml(map.embedUrl)}" title="${escapeHtml(map.name || `${site.siteName} map`)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`
      : `<p class="site-map-empty">No map configured for this site.</p>`;
  }
  if (siteScheduleStatus) siteScheduleStatus.textContent = "";
  if (siteMapStatus) siteMapStatus.textContent = "";
  renderSiteDirectory();
}
function getSetupHistory() {
  try {
    const entries = JSON.parse(localStorage.getItem(setupHistoryStorageKey) || "[]");
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}
async function syncSetupHistoryFromServer() {
  try {
    const response = await fetch("/api/setup-history");
    if (!response.ok) throw new Error("Failed to load setup history");
    const { entries } = await response.json();
    const normalized = Array.isArray(entries) ? entries : [];
    localStorage.setItem(setupHistoryStorageKey, JSON.stringify(normalized));
    return normalized;
  } catch {
    const fallback = getSetupHistory();
    localStorage.setItem(setupHistoryStorageKey, JSON.stringify(fallback));
    return fallback;
  }
}
async function persistSetupHistoryToServer(entries) {
  const payload = Array.isArray(entries) ? entries.slice(0, 50) : [];
  localStorage.setItem(setupHistoryStorageKey, JSON.stringify(payload));
  try {
    const response = await fetch("/api/setup-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Failed to save setup history");
    return payload;
  } catch {
    return payload;
  }
}
function renderSetupHistory() {
  if (!setupHistoryList) return;
  const entries = getSetupHistory();
  if (!entries.length) {
    setupHistoryList.innerHTML = `<div class="setup-history-empty">No setup changes have been recorded yet.</div>`;
    return;
  }
  setupHistoryList.innerHTML = entries.map((entry) => `
    <article class="setup-history-entry">
      <div class="setup-history-entry-head">
        <div class="setup-history-actor">
          <strong>${escapeHtml(entry.actorName || "Unrecorded user")}</strong>
          <span class="setup-history-role">Role: ${escapeHtml(entry.actorRole || "Unrecorded")}</span>
        </div>
        <time datetime="${escapeHtml(entry.timestamp || "")}">${escapeHtml(new Date(entry.timestamp || Date.now()).toLocaleString())}</time>
      </div>
      <div class="setup-history-change"><strong>${escapeHtml(entry.message || "Portal updated")}</strong>${entry.detail ? `<p>${escapeHtml(entry.detail)}</p>` : ""}</div>
    </article>
  `).join("");
}
function renderUserLogs() {
  if (!userLogsList) return;
  const breakMessages = new Set(["User started a break", "User ended a break", "Break started", "Break ended"]);
  const sessionMessages = new Set(["User logged in", "User logged out"]);
  const entries = getSetupHistory().filter((entry) => activeUserLogView === "break-logs"
    ? breakMessages.has(entry.message)
    : !breakMessages.has(entry.message) && !sessionMessages.has(entry.message));
  if (!entries.length) {
    const emptyMessage = activeUserLogView === "break-logs" ? "No break logs have been recorded yet." : "No system updates have been recorded yet.";
    userLogsList.innerHTML = `<div class="setup-history-empty">${emptyMessage}</div>`;
    return;
  }
  userLogsList.innerHTML = entries.map((entry) => `
    <article class="setup-history-entry">
      <div class="setup-history-entry-head">
        <div class="setup-history-actor">
          <strong>${escapeHtml(entry.actorName || "Unrecorded user")}</strong>
          <span class="setup-history-role">Role: ${escapeHtml(entry.actorRole || "Unrecorded")}</span>
        </div>
        <time datetime="${escapeHtml(entry.timestamp || "")}">${escapeHtml(new Date(entry.timestamp || Date.now()).toLocaleString())}</time>
      </div>
      <div class="setup-history-change"><strong>${escapeHtml(entry.message || "User activity")}</strong>${entry.detail ? `<p>${escapeHtml(entry.detail)}</p>` : ""}</div>
    </article>
  `).join("");
}
function setUserLogView(viewName) {
  activeUserLogView = ["system-update", "break-logs"].includes(viewName) ? viewName : "system-update";
  userLogTabButtons.forEach((button) => {
    const selected = button.dataset.userLogView === activeUserLogView;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  const selectedTab = document.querySelector(`[data-user-log-view="${activeUserLogView}"]`);
  if (userLogsList && selectedTab) userLogsList.setAttribute("aria-labelledby", selectedTab.id);
  renderUserLogs();
}

function recordSetupHistory(message, detail = "") {
  const entries = getSetupHistory();
  const auth = getAuthState();
  const nextEntries = [{
    id: crypto.randomUUID(),
    message: String(message || "Portal updated").trim(),
    detail: String(detail || "").trim(),
    actorName: auth.fullName || auth.userName || "Unknown user",
    actorRole: auth.role || "Unknown",
    timestamp: new Date().toISOString()
  }, ...entries].slice(0, 50);
  localStorage.setItem(setupHistoryStorageKey, JSON.stringify(nextEntries));
  persistSetupHistoryToServer(nextEntries);
  renderSetupHistory();
  renderUserLogs();
}
function setSiteInfoTab(tabName) {
  const canViewSetupHistory = ["Superadmin", "Admin"].includes(getAuthState().role);
  const selectedTab = tabName === "setup-history" && !canViewSetupHistory ? "site" : ["site", "integration", "setup-history"].includes(tabName) ? tabName : "site";
  siteInfoTabButtons.forEach((button) => {
    const selected = button.dataset.siteTab === selectedTab;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  siteActions?.classList.toggle("hidden", selectedTab !== "site");
  siteOverviewGrid?.classList.toggle("hidden", selectedTab !== "site");
  siteIntegrationPanel?.classList.toggle("hidden", selectedTab !== "integration");
  setupHistoryPanel?.classList.toggle("hidden", selectedTab !== "setup-history");
  siteAddTrigger?.classList.toggle("hidden", selectedTab !== "site");
  if (addSitePanel?.open) addSitePanel.close();
  if (selectedTab === "setup-history") {
    renderSetupHistory();
    setupHistoryList?.scrollTo({ top: 0 });
  }
}
function parseGoogleMapsEmbed(input) {
  let candidate = input.trim();
  if (candidate.startsWith("<")) {
    candidate = new DOMParser().parseFromString(candidate, "text/html").querySelector("iframe")?.getAttribute("src") || "";
  }
  try {
    const url = new URL(candidate);
    const googleHost = url.hostname === "google.com" || url.hostname.endsWith(".google.com");
    const embedPath = url.pathname.startsWith("/maps/embed") || url.pathname.includes("/maps/d/embed");
    return url.protocol === "https:" && googleHost && embedPath ? url.href : null;
  } catch {
    return null;
  }
}
function getAuthState() {
  return JSON.parse(localStorage.getItem("alarmPortal.auth") || "null") || { loggedIn: false, userName: "guest", role: "Operator" };
}
function saveAuthState(state) {
  localStorage.setItem("alarmPortal.auth", JSON.stringify(state));
  if (state.loggedIn && state.userName) localStorage.setItem(breakUserStorageKey, state.userName);
}
async function syncBreakStatus() {
  const auth = getAuthState();
  const username = auth.loggedIn ? auth.userName : localStorage.getItem(breakUserStorageKey);
  if (!username) {
    breakStatus = { username: null, active: false, startedAt: null, startedBy: null, endedAt: null };
    renderBreakStatus();
    return;
  }
  try {
    const response = await fetch(`/api/break-status?username=${encodeURIComponent(username)}`);
    if (!response.ok) throw new Error("Unable to load break status");
    const { breakStatus: savedStatus } = await response.json();
    if (savedStatus && typeof savedStatus.active === "boolean") breakStatus = savedStatus;
  } catch {
    // Keep the most recently known state if the service is temporarily unavailable.
  }
  renderBreakStatus();
}
function renderBreakStatus() {
  const auth = getAuthState();
  const username = auth.loggedIn ? auth.userName : localStorage.getItem(breakUserStorageKey);
  const isBreakOwner = Boolean(username && breakStatus.username === username);
  const breakActiveForUser = breakStatus.active && isBreakOwner;
  document.body.classList.toggle("break-active", Boolean(breakActiveForUser));
  if (breakOverlay) breakOverlay.hidden = !breakActiveForUser;
  if (breakStartedAt) {
    const time = breakStatus.startedAt ? new Date(breakStatus.startedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
    const startedBy = breakStatus.startedBy || username || "Current user";
    breakStartedAt.textContent = time ? `${startedBy} is on break. Started at ${time}` : `${startedBy} is on break.`;
  }
  if (takeBreakTrigger) takeBreakTrigger.hidden = !auth.loggedIn || auth.role !== "Operator" || breakActiveForUser;
}
async function saveBreakStatus(active) {
  const auth = getAuthState();
  const username = auth.loggedIn ? auth.userName : localStorage.getItem(breakUserStorageKey);
  if (!username || (active && (!auth.loggedIn || auth.role !== "Operator"))) throw new Error("Only the Operator who owns this break can change it");
  const response = await fetch("/api/break-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, active })
  });
  if (!response.ok) throw new Error("Unable to update break status");
  const { breakStatus: savedStatus } = await response.json();
  breakStatus = savedStatus;
  renderBreakStatus();
  recordSetupHistory(active ? "User started a break" : "User ended a break", `${auth.fullName || username} ${active ? "started" : "ended"} a break.`);
  if (!active) {
    lastAlarmGridSignature = null;
    renderAlarmGrid();
  }
}
function canManageSiteConfiguration() {
  const auth = getAuthState();
  return auth.loggedIn && ["Superadmin", "Admin"].includes(auth.role);
}
function showLoginPanel() {
  loginPanel?.classList.remove("hidden");
  loginPanel?.classList.add("visible");
  if (loginStatus) loginStatus.textContent = "";
}
function hideLoginPanel() {
  loginPanel?.classList.add("hidden");
  loginPanel?.classList.remove("visible");
}
function renderAlarmGrid() {
  if (!feed || !alarmGridAvailable) return;
  if (breakStatus.active) return;
  const capacity = currentGridSize * currentGridSize;
  const now = Date.now();
  const availableAlarms = currentAlarms.filter((alarm) => alarm.status !== "dismissed" && !(alarm.snoozedUntil && Date.parse(alarm.snoozedUntil) > now));
  if (expandedAlarmId && !availableAlarms.some((alarm) => alarm.id === expandedAlarmId)) expandedAlarmId = null;
  const orderedAlarms = [
    ...availableAlarms.filter((alarm) => alarm.pinned),
    ...availableAlarms.filter((alarm) => !alarm.pinned)
  ];
  const expandedIndex = orderedAlarms.findIndex((alarm) => alarm.id === expandedAlarmId);
  if (expandedIndex > 0) orderedAlarms.unshift(orderedAlarms.splice(expandedIndex, 1)[0]);
  const visibleAlarms = orderedAlarms.slice(0, capacity);
  const renderSignature = JSON.stringify([currentGridSize, currentSiteName, expandedAlarmId, visibleAlarms]);
  if (renderSignature === lastAlarmGridSignature && !feed.querySelector(".empty")) {
    fitAlarmGrid();
    return;
  }
  lastAlarmGridSignature = renderSignature;
  const alarmTiles = visibleAlarms.map((alarm) => {
    const hasCameraOutput = typeof alarm.camera === "string" && alarm.camera.trim() && alarm.camera.trim().toLowerCase() !== "unknown camera";
    const showTestWatermark = alarm.testAlarm === true || !hasCameraOutput;
    return `<article class="alarm ${alarm.id === expandedAlarmId ? "alarm-expanded" : ""}">
      <button class="alarm-snooze" type="button" data-id="${escapeHtml(alarm.id)}" aria-label="Choose snooze duration" title="Choose snooze duration"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg></button>
      <button class="alarm-expand" type="button" data-id="${escapeHtml(alarm.id)}" aria-label="${alarm.id === expandedAlarmId ? "Restore alarm size" : "Expand alarm"}" title="${alarm.id === expandedAlarmId ? "Restore alarm size" : "Expand alarm"}" aria-expanded="${alarm.id === expandedAlarmId}"><svg viewBox="0 0 24 24" aria-hidden="true">${alarm.id === expandedAlarmId ? '<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"></path>' : '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>'}</svg></button>
      <button class="alarm-pin" type="button" data-id="${escapeHtml(alarm.id)}" aria-label="${alarm.pinned ? "Unpin alarm" : "Pin alarm"}" title="${alarm.pinned ? "Unpin alarm" : "Pin alarm"}" aria-pressed="${Boolean(alarm.pinned)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3.2V9l4.8 4.8a.5.5 0 0 1-.35.85H13v6l-1 1-1-1v-6H3.55a.5.5 0 0 1-.35-.85L8 9V3.2"></path><path d="M8 3.2C8 2.54 8.54 2 9.2 2h5.6c.66 0 1.2.54 1.2 1.2"></path></svg></button>
      <button class="alarm-dismiss" type="button" data-id="${escapeHtml(alarm.id)}" aria-label="Dismiss alarm" title="Dismiss alarm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
      ${showTestWatermark ? `<div class="alarm-test-watermark" aria-hidden="true">Test Alarm</div>` : ""}
      <span class="severity ${alarm.severity === "critical" ? "critical" : ""}"></span>
      <div class="alarm-content"><h3>${escapeHtml(currentSiteName)}</h3><p>${escapeHtml(alarm.subject)} · ${escapeHtml(alarm.message)}</p></div>
      <div class="alarm-footer"><div class="alarm-camera-location">${alarm.status === "new" ? `<span class="alarm-pending">PENDING</span>` : alarm.status === "acknowledged" ? `<span class="alarm-acknowledged">${alarm.acknowledgedBy ? `ACK · ${escapeHtml(alarm.acknowledgedBy)}` : "ACKNOWLEDGED"}</span>` : ""}<div class="alarm-camera-details"><strong>${escapeHtml(alarm.camera || "Unknown camera")}</strong><span>${escapeHtml(alarm.location || "Unknown location")}</span></div></div><div class="alarm-time-actions">${alarm.status === "new" ? `<button class="ack" data-id="${alarm.id}">Acknowledge</button>` : ""}<time>${new Date(alarm.receivedAt).toLocaleString()}</time></div></div>
    </article>`;
  }).join("");
  const standbyTiles = Array.from({ length: capacity - visibleAlarms.length }, () => `<div class="alarm-grid-empty" aria-label="Standby grid slot"><span class="standby-dot"></span><span>Standby</span></div>`).join("");
    const expandedBackdrop = expandedAlarmId ? `<button class="alarm-expand-backdrop" type="button" aria-label="Close expanded alarm"></button>` : "";
    feed.innerHTML = `${expandedBackdrop}${alarmTiles}${standbyTiles}`;
  fitAlarmGrid();
}
function getAlarmSite(alarm) {
  return String(alarm.siteName || alarm.site || alarm.location || "Unknown site");
}
function getAlarmHistoryStatus(alarm) {
  if (alarm.status === "acknowledged") return "Reviewed";
  if (alarm.status === "dismissed") return "Closed";
  return "Pending";
}
function renderAlarmHistory() {
  if (!historyTableBody) return;
  const siteQuery = historySiteFilter?.value.trim().toLocaleLowerCase() || "";
  const cameraQuery = historyCameraFilter?.value.trim().toLocaleLowerCase() || "";
  const dateFrom = historyDateFrom?.value || "";
  const dateTo = historyDateTo?.value || "";
  const filteredAlarms = currentAlarms.filter((alarm) => {
    if (activeHistoryView === "processed" && !["acknowledged", "dismissed"].includes(alarm.status)) return false;
    if (activeHistoryView === "pending" && alarm.status !== "new") return false;
    const receivedAt = new Date(alarm.receivedAt);
    const dateKey = Number.isNaN(receivedAt.getTime()) ? "" : receivedAt.toISOString().slice(0, 10);
    if (siteQuery && !getAlarmSite(alarm).toLocaleLowerCase().includes(siteQuery)) return false;
    if (cameraQuery && !String(alarm.camera || "Unknown camera").toLocaleLowerCase().includes(cameraQuery)) return false;
    if (dateFrom && (!dateKey || dateKey < dateFrom)) return false;
    if (dateTo && (!dateKey || dateKey > dateTo)) return false;
    return true;
  });
  if (historyCount) historyCount.textContent = `${filteredAlarms.length} alarm${filteredAlarms.length === 1 ? "" : "s"}`;
  historyTableBody.innerHTML = filteredAlarms.length ? filteredAlarms.map((alarm) => {
    const receivedAt = new Date(alarm.receivedAt);
    const receivedLabel = Number.isNaN(receivedAt.getTime()) ? "Unknown time" : receivedAt.toLocaleString();
    const operator = alarm.acknowledgedBy || (alarm.status === "new" ? "Unassigned" : "Not recorded");
    const alarmLabel = `${alarm.subject || "Alarm"} · ${alarm.message || ""}`;
    return `<tr>
      <td>${escapeHtml(getAlarmSite(alarm))}</td>
      <td>${escapeHtml(alarm.camera || "Unknown camera")}</td>
      <td>${escapeHtml(operator)}</td>
      <td>${escapeHtml(receivedLabel)}</td>
      <td><span class="history-status history-status-${escapeHtml(alarm.status)}">${getAlarmHistoryStatus(alarm)}</span></td>
      <td>${escapeHtml(alarmLabel)}</td>
    </tr>`;
  }).join("") : `<tr><td class="history-empty" colspan="6">No alarms match these filters.</td></tr>`;
}
function setAlarmHistoryView(viewName) {
  activeHistoryView = ["global", "processed", "pending"].includes(viewName) ? viewName : "global";
  historyTabButtons.forEach((button) => {
    const selected = button.dataset.historyView === activeHistoryView;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  const results = document.querySelector("#history-results");
  const selectedTab = document.querySelector(`#history-tab-${activeHistoryView}`);
  if (results && selectedTab) results.setAttribute("aria-labelledby", selectedTab.id);
  renderAlarmHistory();
}
function setAlarmGridSize(size) {
  currentGridSize = gridSizes.includes(size) ? size : 3;
  localStorage.setItem(gridSizeStorageKey, String(currentGridSize));
  gridSizes.forEach((gridSize) => {
    feed?.classList.toggle(`grid-${gridSize}`, currentGridSize === gridSize);
  });
  gridSizeButtons.forEach((button) => {
    const selected = Number(button.dataset.gridSize) === currentGridSize;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  renderAlarmGrid();
}
function updateAuthUI() {
  const auth = getAuthState();
  setConnectionStatus(auth.loggedIn ? "Checking..." : "Disconnected");
  if (userNameElement) userNameElement.textContent = auth.loggedIn ? `${auth.userName} (${auth.role})` : "guest";
  if (authToggle) authToggle.textContent = auth.loggedIn ? "Logout" : "Login";
  if (auth.loggedIn) {
    hideLoginPanel();
  } else {
    showLoginPanel();
  }
  applyPermissions(auth);
  renderBreakStatus();
  renderUsers();
  updateUserFormMode();
}
function tryLogin(username, password) {
  const users = getUsers();
  const user = users.find((item) => item.username === username && item.password === password);
  if (user) {
    saveAuthState({ loggedIn: true, userName: user.username, fullName: user.fullName || user.username, role: user.role, conditions: getUserConditions(user) });
    updateAuthUI();
    return true;
  }
  return false;
}
async function loadAlarms() {
  if (!newCount || !todayCount || !feed) return;
  await syncBreakStatus();
  const auth = getAuthState();
  if (!auth.loggedIn) {
    alarmGridAvailable = false;
    lastAlarmGridSignature = null;
    feed.setAttribute("aria-busy", "false");
    setConnectionStatus("Disconnected");
    newCount.textContent = "0";
    todayCount.textContent = "0";
    feed.innerHTML = `<div class="empty">Please login to view alarms.<br><small>Use the portal login in the header.</small></div>`;
    return;
  }
  if (!getUserConditions(auth).viewLive) {
    alarmGridAvailable = false;
    lastAlarmGridSignature = null;
    currentAlarms = [];
    feed.setAttribute("aria-busy", "false");
    newCount.textContent = "0";
    todayCount.textContent = "0";
    feed.innerHTML = `<div class="empty">You do not have permission to view live alarms.</div>`;
    return;
  }
  if (!alarmGridAvailable) setConnectionStatus("Checking...");
  try {
    const response = await fetch("/api/alarms");
    if (!response.ok) throw new Error("Failed to fetch alarms");
    const { alarms } = await response.json();
    setConnectionStatus("Connected");
    alarmGridAvailable = true;
    feed.setAttribute("aria-busy", "false");
    const today = new Date().toISOString().slice(0, 10);
    newCount.textContent = alarms.filter((alarm) => alarm.status === "new").length;
    todayCount.textContent = alarms.filter((alarm) => alarm.receivedAt.startsWith(today)).length;
    currentAlarms = alarms;
    renderAlarmGrid();
    renderAlarmHistory();
  } catch (error) {
    alarmGridAvailable = false;
    lastAlarmGridSignature = null;
    feed.setAttribute("aria-busy", "false");
    setConnectionStatus("Disconnected");
    newCount.textContent = "0";
    todayCount.textContent = "0";
    feed.innerHTML = `<div class="empty">Unable to load alarms.<br><small>Check that the portal backend is running and reachable.</small></div>`;
  }
}
gridSizeButtons.forEach((button) => {
  button.addEventListener("click", () => setAlarmGridSize(Number(button.dataset.gridSize)));
});
setAlarmGridSize(currentGridSize);
takeBreakTrigger?.addEventListener("click", async () => {
  const auth = getAuthState();
  if (!auth.loggedIn || auth.role !== "Operator") return;
  if (breakConfirmError) breakConfirmError.textContent = "";
  breakConfirmDialog?.showModal();
});
breakConfirmCancel?.addEventListener("click", () => breakConfirmDialog?.close());
breakConfirmStart?.addEventListener("click", async () => {
  if (breakConfirmError) breakConfirmError.textContent = "";
  breakConfirmStart.disabled = true;
  try {
    await saveBreakStatus(true);
    breakConfirmDialog?.close();
  } catch {
    if (breakConfirmError) breakConfirmError.textContent = "Unable to start break. Check the server connection and try again.";
  } finally {
    breakConfirmStart.disabled = false;
  }
});
doneBreakTrigger?.addEventListener("click", async () => {
  doneBreakTrigger.disabled = true;
  try {
    await saveBreakStatus(false);
  } catch {
    doneBreakTrigger.textContent = "RETRY DONE BREAK";
  } finally {
    doneBreakTrigger.disabled = false;
  }
});
historyTabButtons.forEach((button) => {
  button.addEventListener("click", () => setAlarmHistoryView(button.dataset.historyView));
});
userLogTabButtons.forEach((button) => {
  button.addEventListener("click", () => setUserLogView(button.dataset.userLogView));
});
[historySiteFilter, historyCameraFilter, historyDateFrom, historyDateTo].forEach((input) => {
  input?.addEventListener("input", renderAlarmHistory);
  input?.addEventListener("change", renderAlarmHistory);
});
setAlarmHistoryView(activeHistoryView);
setUserLogView(activeUserLogView);
siteInfoTabButtons.forEach((button) => {
  button.addEventListener("click", () => setSiteInfoTab(button.dataset.siteTab));
});
siteSearchInput?.addEventListener("input", renderSiteDirectory);
integrationSiteSearchInput?.addEventListener("input", renderIntegrationSiteDirectory);
siteDirectoryPreview?.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-site-id]");
  if (!trigger) return;
  const site = getSavedSites().find((item) => item.id === trigger.dataset.siteId);
  if (!site) return;
  renderSiteDetails(site);
});
siteIntegrationDirectory?.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-site-id]");
  if (!trigger) return;
  const site = getSavedSites().find((item) => item.id === trigger.dataset.siteId);
  if (site) renderIntegrationSetup(site);
});
siteIntegrationForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const site = getSavedSites().find((item) => item.id === selectedIntegrationSiteId);
  if (!site) return;
  const submitButton = siteIntegrationForm.querySelector("button[type='submit']");
  const form = new FormData(siteIntegrationForm);
  const integration = {
    enabled: form.get("enabled") === "on",
    webhookUrl: String(form.get("webhookUrl") || "").trim(),
    deviceId: String(form.get("deviceId") || "").trim(),
    portalSecret: String(form.get("portalSecret") || "").trim()
  };
  if (submitButton) submitButton.disabled = true;
  if (siteIntegrationStatus) {
    siteIntegrationStatus.textContent = "Saving integration...";
    siteIntegrationStatus.className = "setup-status";
  }
  try {
    const savedSite = await updateSiteOnServer({ ...site, integration });
    renderIntegrationSetup(savedSite);
    renderSiteDirectory();
    recordSetupHistory("Site integration updated", `${savedSite.siteName}'s integration settings were updated.`);
    if (siteIntegrationStatus) {
      siteIntegrationStatus.textContent = "Integration settings saved.";
      siteIntegrationStatus.className = "setup-status success";
    }
  } catch {
    if (siteIntegrationStatus) {
      siteIntegrationStatus.textContent = "Unable to save integration settings.";
      siteIntegrationStatus.className = "setup-status error";
    }
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});
const closeSiteDetails = () => {
  selectedSiteId = null;
  siteDetailsPanel?.classList.add("hidden");
  renderSiteDirectory();
};
siteDetailsCloseIcon?.addEventListener("click", closeSiteDetails);
siteEditTrigger?.addEventListener("click", () => {
  const site = getSavedSites().find((item) => item.id === selectedSiteId);
  if (site) startSiteEdit(site);
});
siteMonitoring24Hours?.addEventListener("change", async () => {
  const site = getSavedSites().find((item) => item.id === selectedSiteId);
  if (!site) return;
  const enabled = siteMonitoring24Hours.checked;
  siteMonitoring24Hours.disabled = true;
  if (siteMonitoringStatus) {
    siteMonitoringStatus.textContent = "Saving monitoring setting...";
    siteMonitoringStatus.className = "setup-status";
  }
  try {
    const savedSite = await updateSiteOnServer({ ...site, monitoring24Hours: enabled });
    recordSetupHistory(enabled ? "24-hour monitoring enabled" : "Weekly schedule enabled", `${savedSite.siteName}'s monitoring mode was updated.`);
    renderSiteDetails(savedSite);
    if (siteMonitoringStatus) {
      siteMonitoringStatus.textContent = enabled ? "24-hour monitoring enabled." : "Weekly schedule enabled.";
      siteMonitoringStatus.className = "setup-status success";
    }
  } catch {
    siteMonitoring24Hours.checked = !enabled;
    if (siteScheduleForm) siteScheduleForm.hidden = !enabled;
    if (siteMonitoringNote) siteMonitoringNote.hidden = enabled;
    if (siteMonitoringStatus) {
      siteMonitoringStatus.textContent = "Unable to save monitoring setting. Check the server connection and try again.";
      siteMonitoringStatus.className = "setup-status error";
    }
  } finally {
    siteMonitoring24Hours.disabled = false;
  }
});
siteScheduleDays?.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-schedule-enabled]");
  if (!checkbox) return;
  const day = checkbox.dataset.scheduleEnabled;
  siteScheduleForm?.elements.namedItem(`${day}-start`)?.toggleAttribute("disabled", !checkbox.checked);
  siteScheduleForm?.elements.namedItem(`${day}-end`)?.toggleAttribute("disabled", !checkbox.checked);
});
siteScheduleForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const site = getSavedSites().find((item) => item.id === selectedSiteId);
  if (!site || !siteScheduleDays) return;
  const schedule = Object.fromEntries(SCHEDULE_DAYS.map(({ key }) => {
    const row = siteScheduleDays.querySelector(`[data-schedule-enabled="${key}"]`)?.closest(".site-schedule-row");
    const enabled = Boolean(row?.querySelector(`[name="${key}-enabled"]`)?.checked);
    const start = row?.querySelector(`[name="${key}-start"]`)?.value || "09:00";
    const end = row?.querySelector(`[name="${key}-end"]`)?.value || "17:00";
    return [key, {
      enabled,
      start,
      end
    }];
  }));
  const invalidEnabledDay = SCHEDULE_DAYS.find(({ key }) => {
    const day = schedule[key];
    return day.enabled && (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(day.start) || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(day.end));
  });
  if (invalidEnabledDay) {
    if (siteScheduleStatus) {
      siteScheduleStatus.textContent = `Enter ${invalidEnabledDay.label}'s times in 24-hour HH:MM format.`;
      siteScheduleStatus.className = "setup-status error";
    }
    return;
  }
  try {
    const savedSite = await updateSiteOnServer({ ...site, schedule });
    recordSetupHistory("Site schedule updated", `${savedSite.siteName}'s weekly schedule was updated.`);
    renderSiteDetails(savedSite);
    if (siteScheduleStatus) {
      siteScheduleStatus.textContent = "Schedule saved.";
      siteScheduleStatus.className = "setup-status success";
    }
  } catch {
    if (siteScheduleStatus) {
      siteScheduleStatus.textContent = "Unable to save schedule. Check the server connection and try again.";
      siteScheduleStatus.className = "setup-status error";
    }
  }
});
siteMapForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const site = getSavedSites().find((item) => item.id === selectedSiteId);
  if (!site) return;
  const form = new FormData(siteMapForm);
  const name = form.get("name")?.toString().trim() || "";
  const embedUrl = parseGoogleMapsEmbed(form.get("embed")?.toString() || "");
  if (!name || !embedUrl) {
    if (siteMapStatus) {
      siteMapStatus.textContent = "Enter a map name and a valid HTTPS Google Maps embed URL or iframe.";
      siteMapStatus.className = "setup-status error";
    }
    return;
  }
  try {
    const savedSite = await updateSiteOnServer({ ...site, siteMap: { name, embedUrl } });
    recordSetupHistory("Site map updated", `${savedSite.siteName}'s map was updated.`);
    renderSiteDetails(savedSite);
    if (siteMapStatus) {
      siteMapStatus.textContent = "Map saved.";
      siteMapStatus.className = "setup-status success";
    }
  } catch {
    if (siteMapStatus) {
      siteMapStatus.textContent = "Unable to save map. Check the server connection and try again.";
      siteMapStatus.className = "setup-status error";
    }
  }
});
siteMapEditUrl?.addEventListener("click", () => {
  if (!siteMapEmbedField) return;
  siteMapEmbedField.hidden = !siteMapEmbedField.hidden;
  siteMapEditUrl.textContent = siteMapEmbedField.hidden ? "Edit Embed URL" : "Hide Embed URL";
  if (!siteMapEmbedField.hidden) siteMapForm?.elements.namedItem("embed")?.focus();
});
siteMapRemove?.addEventListener("click", async () => {
  const site = getSavedSites().find((item) => item.id === selectedSiteId);
  if (!site) return;
  const { siteMap, ...siteWithoutMap } = site;
  try {
    const savedSite = await updateSiteOnServer(siteWithoutMap);
    recordSetupHistory("Site map removed", `${savedSite.siteName}'s map was removed.`);
    renderSiteDetails(savedSite);
  } catch {
    if (siteMapStatus) {
      siteMapStatus.textContent = "Unable to remove map. Check the server connection and try again.";
      siteMapStatus.className = "setup-status error";
    }
  }
});
setupHistoryBack?.addEventListener("click", () => {
  setSiteInfoTab("site");
});
siteAddTrigger?.addEventListener("click", () => {
  resetAddSiteForm();
  if (addSiteStatus) addSiteStatus.textContent = "";
  addSitePanel?.showModal();
  addSiteForm?.elements.namedItem("siteName")?.focus();
});
const closeAddSiteDialog = () => {
  resetAddSiteForm();
  addSitePanel?.close();
};
addSiteClose?.addEventListener("click", closeAddSiteDialog);
addSiteCancel?.addEventListener("click", closeAddSiteDialog);
addSitePanel?.addEventListener("cancel", (event) => event.preventDefault());
addSitePanel?.addEventListener("close", () => siteAddTrigger?.focus());
addClientContact?.addEventListener("click", () => {
  if (!clientContactsList) return;
  const contactNumber = clientContactsList.querySelectorAll(".client-contact-card").length + 1;
  const contact = createClientContactCard(contactNumber);
  clientContactsList.append(contact);
  contact.querySelector("[data-contact-field='fullName']")?.focus();
});
addSiteForm?.addEventListener("focusout", (event) => {
  if (event.target.matches('[autocapitalize="words"]')) {
    event.target.value = capitalizeWords(event.target.value);
  }
});
clientContactsList?.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".client-contact-remove");
  if (!removeButton) return;
  const contact = removeButton.closest(".client-contact-card");
  contact?.remove();
});
addSiteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  addSiteForm.querySelectorAll('[autocapitalize="words"]').forEach((input) => {
    input.value = capitalizeWords(input.value);
  });
  const site = Object.fromEntries(new FormData(addSiteForm).entries());
  site.siteName = site.siteName.toString().trim();
  if (!site.siteName) return;
  site.clientContacts = Array.from(clientContactsList?.querySelectorAll(".client-contact-card") || []).map((contact) => {
    const fields = Object.fromEntries(Array.from(contact.querySelectorAll("[data-contact-field]")).map((input) => [input.dataset.contactField, input.value.trim()]));
    return fields;
  }).filter((contact) => Object.values(contact).some(Boolean));
  try {
    const currentSite = editingSiteId ? getSavedSites().find((item) => item.id === editingSiteId) : null;
    if (editingSiteId && !currentSite) throw new Error("Site could not be found");
    const savedSite = currentSite
      ? await updateSiteOnServer({ ...currentSite, ...site, id: currentSite.id })
      : await persistSiteToServer({ ...site, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    const wasEditing = Boolean(currentSite);
    recordSetupHistory(wasEditing ? "Site updated" : "Site added", wasEditing ? `${savedSite.siteName} was updated.` : `${savedSite.siteName} was added to the portal.`);
    if (!wasEditing && siteSearchInput) siteSearchInput.value = "";
    renderSiteDirectory();
    if (wasEditing && selectedSiteId === savedSite.id) renderSiteDetails(savedSite);
    resetAddSiteForm();
    addSitePanel?.close();
    if (addSiteStatus) {
      addSiteStatus.textContent = wasEditing ? `${savedSite.siteName} updated.` : `${savedSite.siteName} added.`;
      addSiteStatus.className = "setup-status success";
    }
  } catch {
    if (addSiteStatus) {
      addSiteStatus.textContent = editingSiteId ? "Unable to update site. Check the server connection and try again." : "Unable to add site. Check the server connection and try again.";
      addSiteStatus.className = "setup-status error";
    }
  }
});
if (feed) {
  feed.addEventListener("click", async (event) => {
    const button = event.target.closest("button.ack, button.alarm-dismiss, button.alarm-pin, button.alarm-expand, button.alarm-snooze, button.alarm-expand-backdrop");
    if (!button) return;
    if (button.matches(".alarm-expand-backdrop")) {
      const previousId = expandedAlarmId;
      expandedAlarmId = null;
      renderAlarmGrid();
      Array.from(feed.querySelectorAll(".alarm-expand")).find((item) => item.dataset.id === previousId)?.focus();
      return;
    }
    if (button.matches(".alarm-expand")) {
      const nextExpandedId = expandedAlarmId === button.dataset.id ? null : button.dataset.id;
      expandedAlarmId = nextExpandedId;
      renderAlarmGrid();
      const nextFocus = nextExpandedId
        ? feed.querySelector(".alarm-expanded .alarm-expand")
        : Array.from(feed.querySelectorAll(".alarm-expand")).find((item) => item.dataset.id === button.dataset.id);
      nextFocus?.focus();
      return;
    }
    if (button.matches(".alarm-dismiss")) {
      pendingDismissAlarmId = button.dataset.id;
      if (alarmDismissError) alarmDismissError.textContent = "";
      alarmDismissDialog?.showModal();
      return;
    }
    if (button.matches(".alarm-snooze")) {
      pendingSnoozeAlarmId = button.dataset.id;
      setAlarmSnoozeDuration(5);
      if (alarmSnoozeError) alarmSnoozeError.textContent = "";
      alarmSnoozeDialog?.showModal();
      return;
    }
    if (button.matches(".ack")) {
      pendingAcknowledgeAlarmId = button.dataset.id;
      if (alarmAckError) alarmAckError.textContent = "";
      alarmAckDialog?.showModal();
      return;
    }
    const auth = getAuthState();
    const options = { method: "PATCH" };
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(button.matches(".alarm-pin")
      ? { pinned: button.getAttribute("aria-pressed") !== "true" }
      : { snoozedUntil: new Date(Date.now() + 5 * 60 * 1000).toISOString() });
    await fetch(`/api/alarms/${button.dataset.id}`, options);
    loadAlarms();
  });
}
function cancelAlarmAcknowledge() {
  pendingAcknowledgeAlarmId = null;
  if (alarmAckError) alarmAckError.textContent = "";
  if (alarmAckDialog?.open) alarmAckDialog.close();
}
alarmAckCancel?.addEventListener("click", cancelAlarmAcknowledge);
alarmAckClose?.addEventListener("click", cancelAlarmAcknowledge);
alarmAckDialog?.addEventListener("cancel", () => {
  pendingAcknowledgeAlarmId = null;
  if (alarmAckError) alarmAckError.textContent = "";
});
alarmAckDialog?.addEventListener("click", (event) => {
  if (event.target === alarmAckDialog) cancelAlarmAcknowledge();
});
alarmAckConfirm?.addEventListener("click", async () => {
  if (!pendingAcknowledgeAlarmId) return;
  const alarmId = pendingAcknowledgeAlarmId;
  const auth = getAuthState();
  alarmAckConfirm.disabled = true;
  if (alarmAckError) alarmAckError.textContent = "";
  try {
    const response = await fetch(`/api/alarms/${alarmId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "acknowledged", acknowledgedBy: auth.fullName || auth.userName })
    });
    if (!response.ok) throw new Error("Alarm could not be acknowledged");
    pendingAcknowledgeAlarmId = null;
    alarmAckDialog?.close();
    await loadAlarms();
  } catch {
    if (alarmAckError) alarmAckError.textContent = "Unable to acknowledge the alarm. Please try again.";
  } finally {
    alarmAckConfirm.disabled = false;
  }
});
function cancelAlarmDismiss() {
  pendingDismissAlarmId = null;
  if (alarmDismissError) alarmDismissError.textContent = "";
  if (alarmDismissDialog?.open) alarmDismissDialog.close();
}
alarmDismissCancel?.addEventListener("click", cancelAlarmDismiss);
alarmDismissClose?.addEventListener("click", cancelAlarmDismiss);
alarmDismissDialog?.addEventListener("cancel", () => {
  pendingDismissAlarmId = null;
  if (alarmDismissError) alarmDismissError.textContent = "";
});
alarmDismissDialog?.addEventListener("click", (event) => {
  if (event.target === alarmDismissDialog) cancelAlarmDismiss();
});
alarmDismissConfirm?.addEventListener("click", async () => {
  if (!pendingDismissAlarmId) return;
  const alarmId = pendingDismissAlarmId;
  alarmDismissConfirm.disabled = true;
  if (alarmDismissError) alarmDismissError.textContent = "";
  try {
    const response = await fetch(`/api/alarms/${alarmId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "dismissed" })
    });
    if (!response.ok) throw new Error("Alarm could not be closed");
    pendingDismissAlarmId = null;
    alarmDismissDialog?.close();
    await loadAlarms();
  } catch {
    if (alarmDismissError) alarmDismissError.textContent = "Unable to close the alarm. Please try again.";
  } finally {
    alarmDismissConfirm.disabled = false;
  }
});
function cancelAlarmSnooze() {
  pendingSnoozeAlarmId = null;
  if (alarmSnoozeError) alarmSnoozeError.textContent = "";
  if (alarmSnoozeDialog?.open) alarmSnoozeDialog.close();
}
function setAlarmSnoozeDuration(minutes) {
  selectedSnoozeMinutes = minutes;
  if (alarmSnoozeDurationLabel) alarmSnoozeDurationLabel.textContent = `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  alarmSnoozeDurationButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.snoozeDuration) === minutes));
  });
  if (alarmSnoozePicker) alarmSnoozePicker.open = false;
}
alarmSnoozeDurationButtons.forEach((button) => {
  button.addEventListener("click", () => setAlarmSnoozeDuration(Number(button.dataset.snoozeDuration)));
});
alarmSnoozeCancel?.addEventListener("click", cancelAlarmSnooze);
alarmSnoozeClose?.addEventListener("click", cancelAlarmSnooze);
alarmSnoozeDialog?.addEventListener("cancel", () => {
  pendingSnoozeAlarmId = null;
  if (alarmSnoozeError) alarmSnoozeError.textContent = "";
});
alarmSnoozeDialog?.addEventListener("click", (event) => {
  if (event.target === alarmSnoozeDialog) cancelAlarmSnooze();
});
alarmSnoozeConfirm?.addEventListener("click", async () => {
  if (!pendingSnoozeAlarmId) return;
  const alarmId = pendingSnoozeAlarmId;
  const minutes = selectedSnoozeMinutes;
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 5) return;
  alarmSnoozeConfirm.disabled = true;
  if (alarmSnoozeError) alarmSnoozeError.textContent = "";
  try {
    const response = await fetch(`/api/alarms/${alarmId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ snoozedUntil: new Date(Date.now() + minutes * 60 * 1000).toISOString() })
    });
    if (!response.ok) throw new Error("Alarm could not be snoozed");
    pendingSnoozeAlarmId = null;
    alarmSnoozeDialog?.close();
    await loadAlarms();
  } catch {
    if (alarmSnoozeError) alarmSnoozeError.textContent = "Unable to snooze the alarm. Please try again.";
  } finally {
    alarmSnoozeConfirm.disabled = false;
  }
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && alarmSnoozeDialog?.open && alarmSnoozePicker?.open) {
    event.preventDefault();
    alarmSnoozePicker.open = false;
    alarmSnoozePicker.querySelector("summary")?.focus();
    return;
  }
  if (event.key === "Escape" && alarmDismissDialog?.open) {
    event.preventDefault();
    cancelAlarmDismiss();
    return;
  }
  if (event.key === "Escape" && alarmSnoozeDialog?.open) {
    event.preventDefault();
    cancelAlarmSnooze();
    return;
  }
  if (event.key !== "Escape" || !expandedAlarmId) return;
  const previousId = expandedAlarmId;
  expandedAlarmId = null;
  renderAlarmGrid();
  Array.from(feed?.querySelectorAll(".alarm-expand") || []).find((button) => button.dataset.id === previousId)?.focus();
});
if (setupForm) {
  setupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(setupForm).entries());
    const siteName = String(payload.siteName || "Alarm Portal").trim();
    await persistSettingsToServer(payload);
    localStorage.setItem(settingsStorageKey, JSON.stringify(payload));
    recordSetupHistory("Portal settings updated", `${siteName} settings were saved.`);
    if (setupStatus) {
      setupStatus.textContent = "Site setup saved.";
      setupStatus.className = "setup-status success";
    }
    loadSiteSettings();
  });
}
if (authToggle) {
  authToggle.addEventListener("click", () => {
    const auth = getAuthState();
    if (auth.loggedIn) {
      recordSetupHistory("User logged out", `${auth.fullName || auth.userName} signed out of the portal.`);
      saveAuthState({ loggedIn: false, userName: "guest", role: "Operator" });
      updateAuthUI();
    } else {
      showLoginPanel();
    }
  });
}
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(loginForm);
    const username = form.get("username")?.toString().trim() || "";
    const password = form.get("password")?.toString().trim() || "";
    if (!username || !password) {
      if (loginStatus) {
        loginStatus.textContent = "Please enter both username and password.";
        loginStatus.className = "login-status error";
      }
      return;
    }
    if (tryLogin(username, password)) {
      const auth = getAuthState();
      recordSetupHistory("User logged in", `${auth.fullName || auth.userName} signed in to the portal.`);
      if (loginStatus) {
        loginStatus.textContent = "Login successful.";
        loginStatus.className = "login-status";
      }
      loadAlarms();
    } else if (loginStatus) {
      loginStatus.textContent = "Invalid username or password.";
      loginStatus.className = "login-status error";
    }
  });
}
navLinks.forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  const nextView = link.dataset.view || "alarms";
  window.location.hash = `#${nextView}`;
  setActiveView(nextView);
  topnav?.classList.remove("open");
  mobileMenuToggle?.setAttribute("aria-expanded", "false");
}));
mobileMenuToggle?.addEventListener("click", () => {
  topnav?.classList.toggle("open");
  const expanded = topnav?.classList.contains("open");
  mobileMenuToggle?.setAttribute("aria-expanded", expanded ? "true" : "false");
});
window.addEventListener("hashchange", () => setActiveView(getViewFromHash()));
window.addEventListener("resize", fitAlarmGrid);
if (userForm) {
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const auth = getAuthState();
    const canAddUsers = auth.role === "Superadmin" || getUserConditions(auth).addUser;
    if (!auth.loggedIn || !canAddUsers || (userFormMode === "edit" && auth.role !== "Superadmin")) {
      if (userStatus) {
        userStatus.textContent = "You do not have permission to perform this user action.";
        userStatus.className = "setup-status error";
      }
      return;
    }
    const form = new FormData(userForm);
    const username = form.get("username")?.toString().trim() || "";
    const fullName = form.get("fullName")?.toString().trim() || "";
    const password = form.get("password")?.toString().trim();
    const role = form.get("role")?.toString() || "Operator";
    const conditions = {
      viewLive: form.get("viewLive") === "on",
      addUser: form.get("addUser") === "on",
      viewLogs: form.get("viewLogs") === "on"
    };
    if (!username) {
      if (userStatus) {
        userStatus.textContent = "Please enter a username.";
        userStatus.className = "setup-status error";
      }
      return;
    }
    if (!fullName) {
      if (userStatus) {
        userStatus.textContent = "Please enter the full name.";
        userStatus.className = "setup-status error";
      }
      return;
    }
    const users = getUsers();
    if (userFormMode === "edit" && userEditTarget) {
      const existing = users.find((item) => item.username === userEditTarget);
      if (!existing) {
        if (userStatus) {
          userStatus.textContent = "User not found.";
          userStatus.className = "setup-status error";
        }
        return;
      }
      if (username !== userEditTarget && users.some((item) => item.username === username)) {
        if (userStatus) {
          userStatus.textContent = "That username already exists.";
          userStatus.className = "setup-status error";
        }
        return;
      }
      const updatedUsers = users.map((item) => {
        if (item.username !== userEditTarget) return item;
        return {
          ...item,
          username,
          fullName,
          password: password ? password : item.password,
          role,
          conditions
        };
      });
      saveUsers(updatedUsers);
      persistUsersToServer(updatedUsers);
      recordSetupHistory("User updated", `${fullName} (${username}) was updated with role ${role}.`);
      if (auth.userName === userEditTarget) {
        saveAuthState({ loggedIn: true, userName: username, fullName, role, conditions });
      }
      if (userStatus) {
        userStatus.textContent = "User updated successfully.";
        userStatus.className = "setup-status success";
      }
      resetUserForm();
      updateAuthUI();
      return;
    }
    if (!password) {
      if (userStatus) {
        userStatus.textContent = "Please enter a password.";
        userStatus.className = "setup-status error";
      }
      return;
    }
    if (users.some((item) => item.username === username)) {
      if (userStatus) {
        userStatus.textContent = "That username already exists.";
        userStatus.className = "setup-status error";
      }
      return;
    }
    users.push({ username, fullName, password, role, conditions });
    saveUsers(users);
    persistUsersToServer(users);
    recordSetupHistory("User added", `${fullName} (${username}) was added as ${role}.`);
    if (userStatus) {
      userStatus.textContent = "User added successfully.";
      userStatus.className = "setup-status success";
    }
    userForm.reset();
    renderUsers();
  });
  const cancelButton = userForm.querySelector("#user-form-cancel");
  cancelButton?.addEventListener("click", (event) => {
    event.preventDefault();
    resetUserForm();
    if (userStatus) {
      userStatus.textContent = "Update canceled.";
      userStatus.className = "setup-status";
    }
  });
}
if (usersList) {
  usersList.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    if (!target) return;
    const button = target.closest("button");
    if (!button) return;
    if (button.matches(".user-delete")) {
      const auth = getAuthState();
      if (auth.role !== "Superadmin") return;
      const username = button.dataset.user;
      const removedUser = getUsers().find((item) => item.username === username);
      const users = getUsers().filter((item) => item.username !== username);
      saveUsers(users);
      persistUsersToServer(users);
      if (removedUser) recordSetupHistory("User removed", `${removedUser.fullName || removedUser.username} (${username}) was removed from the portal.`);
      renderUsers();
      return;
    }
    if (button.matches(".user-update")) {
      startUserEdit(button.dataset.user);
      if (userStatus) {
        userStatus.textContent = "Editing user details on the right.";
        userStatus.className = "setup-status";
      }
      return;
    }
  });
}
setInterval(loadAlarms, 5000);
setInterval(updateClock, 1000);
setActiveView(getViewFromHash());
loadSiteSettings();
updateAuthUI();
updateClock();
loadAlarms().catch(() => setConnectionStatus("Disconnected"));
