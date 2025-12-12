import { initRouter } from "./router.js";
import { mountApp } from "./module-loader.js";
import { state } from "./services/state.js";

(async function bootstrap() {
  // Basic global error handler (dev-friendly)
  window.addEventListener("unhandledrejection", (e) => {
    console.error("[UnhandledRejection]", e.reason);
  });
  window.addEventListener("error", (e) => {
    console.error("[WindowError]", e.error || e.message);
  });

  // Restore auth state if exists
  state.hydrate();

  // Mount initial UI + start router
  await mountApp();
  initRouter(async (route) => {
    await mountApp(route);
  });
})();
