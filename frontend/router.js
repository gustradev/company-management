/**
 * Simple SPA Router (hash-based)
 * Routes format:
 *  - #/login
 *  - #/register
 *  - #/dashboard
 *  - #/company/123
 */
let onRouteChange = null;

export function getRoute() {
  const hash = window.location.hash || "#/dashboard";
  const path = hash.replace(/^#/, "") || "/dashboard";
  const parts = path.split("/").filter(Boolean);

  return {
    hash,
    path,
    parts,
    name: parts[0] || "dashboard",
    params: parts.slice(1)
  };
}

export function navigate(to) {
  if (!to.startsWith("#")) window.location.hash = `#${to}`;
  else window.location.hash = to;
}

export function initRouter(cb) {
  onRouteChange = cb;

  window.addEventListener("hashchange", () => {
    if (onRouteChange) onRouteChange(getRoute());
  });

  // trigger first route
  if (onRouteChange) onRouteChange(getRoute());
}
