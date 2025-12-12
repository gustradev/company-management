import { getRoute, navigate } from "./router.js";
import { state } from "./services/state.js";

const app = () => document.getElementById("app");

/**
 * Route → Module mapping
 */
const ROUTE_MAP = {
  // auth
  login: () => import("./modules/auth/login.js"),
  register: () => import("./modules/auth/register.js"),
  "forgot-password": () => import("./modules/auth/forgot-password.js"),
  "reset-password": () => import("./modules/auth/reset-password.js"),
  "verify-email": () => import("./modules/auth/verify-email.js"),

  // app
  dashboard: () => import("./modules/dashboard/dashboard.js"),
  company: () => import("./modules/company/company.list.js"),
  department: () => import("./modules/department/department.list.js"),
  project: () => import("./modules/project/project.list.js"),
  task: () => import("./modules/task/task.list.js"),
  gantt: () => import("./modules/gantt/gantt.js"),
};

/**
 * Page title mapping
 */
function setTitle(routeName) {
  const map = {
    login: "Login",
    register: "Register",
    "forgot-password": "Forgot Password",
    "reset-password": "Reset Password",
    "verify-email": "Email Verification",
    dashboard: "Dashboard",
    company: "Company",
    department: "Department",
    project: "Project",
    task: "Task",
    gantt: "Gantt",
  };

  document.title = `${map[routeName] || "App"} — Company Management`;
}

/**
 * Header logo (Pixel Solusindo)
 */
function headerLogo() {
  return `
    <div class="flex items-center gap-3">
      <!-- Mobile / icon logo -->
      <img
        src="https://pixelsolusindo.com/dmcms/upload-aja/media/view.php?file=pixel-solusindo-logo-notext-a88de471.webp"
        alt="Pixel Solusindo"
        class="h-9 w-9 object-contain md:hidden"
      />

      <!-- Desktop logo -->
      <img
        src="https://pixelsolusindo.com/dmcms/upload-aja/media/view.php?file=watermark-pixel-solusindo.png"
        alt="Pixel Solusindo"
        class="hidden md:block h-8 object-contain"
      />
    </div>
  `;
}

/**
 * App shell
 */
function renderShell(contentHtml) {
  const isAuthed = state.isAuthed();

  app().innerHTML = `
    <div class="min-h-screen bg-slate-50">
      <header class="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
        <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          ${headerLogo()}

          <nav class="flex items-center gap-2">
            ${
              isAuthed
                ? `
              <button data-nav="#/dashboard" class="px-3 py-2 rounded-lg text-sm hover:bg-slate-100">Dashboard</button>
              <button data-nav="#/company" class="px-3 py-2 rounded-lg text-sm hover:bg-slate-100">Company</button>
              <button data-nav="#/gantt" class="px-3 py-2 rounded-lg text-sm hover:bg-slate-100">Gantt</button>
              <button id="btnLogout" class="px-3 py-2 rounded-lg text-sm bg-slate-900 text-white hover:bg-slate-800">
                Logout
              </button>
            `
                : `
              <button data-nav="#/login" class="px-3 py-2 rounded-lg text-sm hover:bg-slate-100">Login</button>
              <button data-nav="#/register" class="px-3 py-2 rounded-lg text-sm bg-brand-primary text-white hover:opacity-90">
                Register
              </button>
            `
            }
          </nav>
        </div>
      </header>

      <main class="max-w-6xl mx-auto px-4 py-6">
        ${contentHtml}
      </main>

      <footer class="max-w-6xl mx-auto px-4 py-10 text-xs text-slate-500">
        <div>© ${new Date().getFullYear()} Company Management</div>
        <div>Pixel Solusindo · Self-hosted via Cloudflare Tunnel</div>
      </footer>
    </div>
  `;

  // navigation handler
  app().querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => navigate(btn.getAttribute("data-nav")));
  });

  // logout handler
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      state.clearAuth();
      navigate("#/login");
    });
  }
}

/**
 * Main mount function
 */
export async function mountApp(route = null) {
  const r = route || getRoute();
  const routeName = (r.name || "dashboard").toLowerCase();

  /**
   * Public routes (no auth required)
   */
  const publicRoutes = new Set([
    "login",
    "register",
    "forgot-password",
    "reset-password",
    "verify-email",
  ]);

  if (!publicRoutes.has(routeName) && !state.isAuthed()) {
    navigate("#/login");
    return;
  }

  setTitle(routeName);

  const loadModule = ROUTE_MAP[routeName] || ROUTE_MAP.dashboard;

  let mod;
  try {
    mod = await loadModule();
  } catch (err) {
    console.error("Failed to load module:", routeName, err);
    renderShell(`
      <div class="p-6 bg-white rounded-2xl border border-slate-200">
        <h1 class="text-xl font-semibold">Module load error</h1>
        <p class="mt-2 text-slate-600 text-sm">
          Gagal memuat module: <b>${routeName}</b>
        </p>
      </div>
    `);
    return;
  }

  const html = mod.render ? await mod.render(r) : `<div>Module missing render()</div>`;
  renderShell(html);

  if (mod.mount) await mod.mount(r);
}
