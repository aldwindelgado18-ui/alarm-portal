const feed = document.querySelector("#feed");
const count = document.querySelector("#alarm-count");
const newCount = document.querySelector("#new-count");
const todayCount = document.querySelector("#today-count");
const clock = document.querySelector("#clock");
const navLinks = Array.from(document.querySelectorAll(".topnav a[data-view]"));
const views = {
  alarms: document.querySelector("#view-alarms"),
  history: document.querySelector("#view-history"),
  sources: document.querySelector("#view-sources"),
  analytics: document.querySelector("#view-analytics"),
  sitesetup: document.querySelector("#view-sitesetup"),
  users: document.querySelector("#view-users")
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
const connectionLabel = document.querySelector("#connection");
const connectionDot = document.querySelector(".dot");
const userForm = document.querySelector("#user-form");
const userStatus = document.querySelector("#user-status");
const usersList = document.querySelector("#users-list");

const ROLE_PERMISSIONS = {
  Superadmin: ["alarms", "history", "sources", "analytics", "sitesetup", "users"],
  Admin: ["alarms", "history", "sources", "analytics", "sitesetup"],
  Operator: ["alarms", "history"]
};

const DEFAULT_USERS = [
  { username: "superadmin", password: "superadmin", role: "Superadmin" },
  { username: "admin", password: "admin123", role: "Admin" },
  { username: "operator", password: "operator123", role: "Operator" }
];

function updateClock() { if (clock) clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }

function setConnectionStatus(statusText) {
  if (connectionLabel) connectionLabel.textContent = statusText;
  if (!connectionDot) return;
  connectionDot.classList.toggle("connected", statusText === "Connected");
  connectionDot.classList.toggle("checking", statusText === "Checking...");
  connectionDot.classList.toggle("disconnected", statusText === "Disconnected");
}

function getUsers() {
  return JSON.parse(localStorage.getItem("alarmPortal.users") || "null") || DEFAULT_USERS;
}

function saveUsers(users) {
  localStorage.setItem("alarmPortal.users", JSON.stringify(users));
}

let userFormMode = "add";
let userEditTarget = null;

function renderUsers() {
  if (!usersList) return;
  const users = getUsers();
  usersList.innerHTML = users.map((user) => `
      <div class="user-row ${user.username === userEditTarget ? "user-row-active" : ""}" data-user="${escapeHtml(user.username)}">
        <div>${escapeHtml(user.username)}</div>
        <div><span class="role-badge role-${user.role.toLowerCase()}">${escapeHtml(user.role)}</span></div>
        <div class="user-row-actions">
          <button class="user-update" data-user="${escapeHtml(user.username)}">Update</button>
          ${user.role === "Superadmin" ? "" : `<button class="user-delete" data-user="${escapeHtml(user.username)}">Remove</button>`}
        </div>
      </div>`).join("");
}

function updateUserFormMode() {
  if (!userForm) return;
  const heading = document.querySelector("#user-form-heading");
  const submitButton = userForm.querySelector("button[type='submit']");
  const cancelButton = document.querySelector("#user-form-cancel");
  const passwordInput = userForm.querySelector("[name='password']");
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
  const passwordInput = userForm.querySelector("[name='password']");
  const roleInput = userForm.querySelector("[name='role']");
  if (usernameInput) usernameInput.value = user.username;
  if (passwordInput) passwordInput.value = "";
  if (roleInput) roleInput.value = user.role;
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
  const allowed = auth.loggedIn && auth.role && ROLE_PERMISSIONS[auth.role] ? ROLE_PERMISSIONS[auth.role] : ["alarms"];
  navLinks.forEach((link) => {
    const visible = allowed.includes(link.dataset.view);
    link.style.display = visible ? "inline-flex" : "none";
  });
  topnav?.classList.add("ready");
  if (auth.loggedIn && !allowed.includes(getViewFromHash())) {
    setActiveView("alarms");
    window.location.hash = "#alarms";
  }
}

function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }
function getViewFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash === "history" || hash === "sources" || hash === "analytics" || hash === "sitesetup" || hash === "users") return hash;
  return "alarms";
}
function setActiveView(viewName) {
  const normalized = views[viewName] ? viewName : "alarms";
  navLinks.forEach((link) => {
    const active = link.dataset.view === normalized;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
  Object.entries(views).forEach(([key, view]) => {
    if (view) view.classList.toggle("hidden", key !== normalized);
  });
}
function loadSiteSettings() {
  const defaults = {
    siteName: "Alarm Portal",
    webhookUrl: "http://localhost:5000/api/alerts",
    portalId: "ai-alarm-portal",
    portalSecret: "change-me",
    contactEmail: "ops@example.com"
  };
  const saved = JSON.parse(localStorage.getItem("alarmPortal.siteSettings") || "null");
  const values = { ...defaults, ...(saved || {}) };
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
  return values;
}
function getAuthState() {
  return JSON.parse(localStorage.getItem("alarmPortal.auth") || "null") || { loggedIn: false, userName: "guest", role: "Operator" };
}
function saveAuthState(state) {
  localStorage.setItem("alarmPortal.auth", JSON.stringify(state));
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
  renderUsers();
}
function tryLogin(username, password) {
  const users = getUsers();
  const user = users.find((item) => item.username === username && item.password === password);
  if (user) {
    saveAuthState({ loggedIn: true, userName: user.username, role: user.role });
    updateAuthUI();
    return true;
  }
  return false;
}
async function loadAlarms() {
  const auth = getAuthState();
  if (!count || !newCount || !todayCount || !feed) return;
  if (!auth.loggedIn) {
    setConnectionStatus("Disconnected");
    count.textContent = `0 alarms`;
    newCount.textContent = "0";
    todayCount.textContent = "0";
    feed.innerHTML = `<div class="empty">Please login to view alarms.<br><small>Use the portal login in the header.</small></div>`;
    return;
  }
  setConnectionStatus("Checking...");
  try {
    const response = await fetch("/api/alarms");
    if (!response.ok) throw new Error("Failed to fetch alarms");
    const { alarms } = await response.json();
    setConnectionStatus("Connected");
    const today = new Date().toISOString().slice(0, 10);
    count.textContent = `${alarms.length} alarm${alarms.length === 1 ? "" : "s"}`;
    newCount.textContent = alarms.filter((alarm) => alarm.status === "new").length;
    todayCount.textContent = alarms.filter((alarm) => alarm.receivedAt.startsWith(today)).length;
    if (!alarms.length) {
      feed.innerHTML = `<div class="empty">No motion alarms received yet.<br><small>Authenticated SMTP messages will appear here.</small></div>`;
      return;
    }
    feed.innerHTML = alarms.map((alarm) => `<article class="alarm">
      <span class="severity ${alarm.severity === "critical" ? "critical" : ""}"></span>
      <div><h3>${escapeHtml(alarm.subject)}</h3><p><b>${escapeHtml(alarm.camera)}</b> · ${escapeHtml(alarm.location)} · ${escapeHtml(alarm.message)}</p></div>
      <div><time>${new Date(alarm.receivedAt).toLocaleString()}</time>${alarm.status === "new" ? `<br><button class="ack" data-id="${alarm.id}">Acknowledge</button>` : ""}</div>
    </article>`).join("");
  } catch (error) {
    setConnectionStatus("Disconnected");
    count.textContent = `0 alarms`;
    newCount.textContent = "0";
    todayCount.textContent = "0";
    feed.innerHTML = `<div class="empty">Unable to load alarms.<br><small>Check that the portal backend is running and reachable.</small></div>`;
  }
}
if (feed) {
  feed.addEventListener("click", async (event) => {
    if (!event.target.matches(".ack")) return;
    await fetch(`/api/alarms/${event.target.dataset.id}`, { method: "PATCH" });
    loadAlarms();
  });
}
if (setupForm) {
  setupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(setupForm).entries());
    localStorage.setItem("alarmPortal.siteSettings", JSON.stringify(payload));
    if (setupStatus) {
      setupStatus.textContent = "Site setup saved locally.";
      setupStatus.className = "setup-status success";
    }
    loadSiteSettings();
  });
}
if (authToggle) {
  authToggle.addEventListener("click", () => {
    const auth = getAuthState();
    if (auth.loggedIn) {
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
document.querySelector("#refresh")?.addEventListener("click", loadAlarms);
if (userForm) {
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const auth = getAuthState();
    if (auth.role !== "Superadmin") {
      if (userStatus) {
        userStatus.textContent = "Only Superadmin can add or update users.";
        userStatus.className = "setup-status error";
      }
      return;
    }
    const form = new FormData(userForm);
    const username = form.get("username")?.toString().trim() || "";
    const password = form.get("password")?.toString().trim();
    const role = form.get("role")?.toString() || "Operator";
    if (!username) {
      if (userStatus) {
        userStatus.textContent = "Please enter a username.";
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
          password: password ? password : item.password,
          role
        };
      });
      saveUsers(updatedUsers);
      if (auth.userName === userEditTarget) {
        saveAuthState({ loggedIn: true, userName: username, role });
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
    users.push({ username, password, role });
    saveUsers(users);
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
      const users = getUsers().filter((item) => item.username !== username);
      saveUsers(users);
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
loadAlarms().catch(() => { if (connectionLabel) connectionLabel.textContent = "Disconnected"; });
