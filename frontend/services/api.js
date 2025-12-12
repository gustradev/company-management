import { state } from "./state.js";

/**
 * API base URL
 * - Dev: localhost
 * - Prod: api.gustradev.com (Cloudflare)
 */
export const API_BASE = "http://localhost:3000"; // change later to https://api.gustradev.com

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = state.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });

  // Try decode JSON
  let data = null;
  const isJson = res.headers.get("content-type")?.includes("application/json");
  if (isJson) data = await res.json();
  else data = await res.text();

  if (!res.ok) {
    const message = (data && data.message) ? data.message : `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}
