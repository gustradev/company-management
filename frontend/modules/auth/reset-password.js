import { api } from "../../services/api.js";
import { navigate } from "../../router.js";

export function render(route) {
  const token = route?.params?.[0] || "";
  return `
  <div class="max-w-md mx-auto bg-white p-6 rounded-2xl border">
    <h1 class="text-xl font-semibold">Reset Password</h1>
    <form id="f" class="mt-4 space-y-3">
      <input id="token" type="text" value="${token}" required placeholder="Reset token" class="w-full border rounded-lg p-2"/>
      <input id="password" type="password" required minlength="8" placeholder="New password (min 8)" class="w-full border rounded-lg p-2"/>
      <button class="w-full bg-slate-900 text-white rounded-lg py-2">Reset password</button>
    </form>
    <p class="mt-3 text-sm text-slate-600">Token biasanya dikirim lewat email reset.</p>
  </div>`;
}

export function mount() {
  document.getElementById("f").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const token = document.getElementById("token").value.trim();
      const password = document.getElementById("password").value;
      await api("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      alert("Password berhasil direset. Silakan login.");
      navigate("#/login");
    } catch (err) {
      alert(err.message);
    }
  });
}
