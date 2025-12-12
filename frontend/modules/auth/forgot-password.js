import { api } from "../../services/api.js";

export function render() {
  return `
  <div class="max-w-md mx-auto bg-white p-6 rounded-2xl border">
    <h1 class="text-xl font-semibold">Forgot Password</h1>
    <form id="f" class="mt-4 space-y-3">
      <input id="email" type="email" required placeholder="Email" class="w-full border rounded-lg p-2"/>
      <button class="w-full bg-slate-900 text-white rounded-lg py-2">Send reset link</button>
    </form>
  </div>`;
}

export function mount() {
  document.getElementById("f").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("email").value;
      await api("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      alert("Jika email terdaftar, link reset sudah dikirim.");
    } catch (err) {
      alert(err.message);
    }
  });
}
