const PROD_API_BASE = "https://api.gustradev.com";
const isLocal =
  window.location.origin.startsWith("http://localhost") ||
  window.location.origin.startsWith("http://127.0.0.1");
const isViteDev = typeof import.meta !== "undefined" && !!import.meta.hot;
const devEnvBase =
  typeof import.meta !== "undefined" ? import.meta.env?.VITE_DEV_API_BASE : null;
// Dev: use env override if provided, else relative (for proxy). Prod: fixed host.
const API_BASE = isViteDev ? devEnvBase || "" : PROD_API_BASE;

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "API error");
  return data;
}
