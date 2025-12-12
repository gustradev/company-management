import { api } from "../../services/api.js";
import { state } from "../../services/state.js";
import { navigate } from "../../router.js";

export function render() {
  return `
  <div class="max-w-md mx-auto bg-white p-6 rounded-2xl border">
    <h1 class="text-xl font-semibold">Login</h1>
    <form id="f" class="mt-4 space-y-3">
      <input id="email" type="email" required placeholder="Email" class="w-full border rounded-lg p-2"/>
      <input id="password" type="password" required placeholder="Password" class="w-full border rounded-lg p-2"/>
      <button class="w-full bg-slate-900 text-white rounded-lg py-2">Login</button>
    </form>
    <div class="mt-3 text-sm">
      <a href="#/forgot-password" class="underline">Forgot password?</a>
    </div>
  </div>`;
}

export function mount() {
  document.getElementById("f").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const r = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      state.setAuth({ token: r.token, user: { email } });
      navigate("#/dashboard");
    } catch (err) {
      alert(err.message);
    }
  });
}
