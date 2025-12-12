import { api } from "../../services/api.js";
import { navigate } from "../../router.js";

export function render() {
  return `
  <div class="max-w-md mx-auto bg-white p-6 rounded-2xl border">
    <h1 class="text-xl font-semibold">Register</h1>
    <form id="f" class="mt-4 space-y-3">
      <input id="email" type="email" required placeholder="Email" class="w-full border rounded-lg p-2"/>
      <input id="password" type="password" required placeholder="Password (min 8)" class="w-full border rounded-lg p-2"/>
      <button class="w-full bg-brand-primary text-white rounded-lg py-2">Create account</button>
    </form>
    <p class="mt-3 text-sm text-slate-600">Kami akan kirim email verifikasi.</p>
  </div>`;
}

export function mount() {
  document.getElementById("f").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      alert("Cek email untuk verifikasi.");
      navigate("#/login");
    } catch (err) {
      alert(err.message);
    }
  });
}
