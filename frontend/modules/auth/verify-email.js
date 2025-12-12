import { api } from "../../services/api.js";
import { navigate } from "../../router.js";

export function render(route) {
  const token = route?.params?.[0] || "";
  return `
  <div class="max-w-md mx-auto bg-white p-6 rounded-2xl border">
    <h1 class="text-xl font-semibold">Verifikasi Email</h1>
    <form id="f" class="mt-4 space-y-3">
      <input id="token" type="text" value="${token}" required placeholder="Verification token" class="w-full border rounded-lg p-2"/>
      <button class="w-full bg-brand-primary text-white rounded-lg py-2">Verifikasi</button>
    </form>
    <p class="mt-3 text-sm text-slate-600">Token biasanya dikirim via email registrasi.</p>
  </div>`;
}

export function mount() {
  document.getElementById("f").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const token = document.getElementById("token").value.trim();
      await api(`/api/auth/verify-email?token=${encodeURIComponent(token)}`, {
        method: "GET",
      });
      alert("Email berhasil diverifikasi. Silakan login.");
      navigate("#/login");
    } catch (err) {
      alert(err.message);
    }
  });
}
