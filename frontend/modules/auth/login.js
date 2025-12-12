import { state } from "../../services/state.js";
import { navigate } from "../../router.js";

export function render() {
  return `
    <div class="max-w-md mx-auto">
      <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div class="flex flex-col items-center mb-6">
          <img
            src="https://pixelsolusindo.com/dmcms/upload-aja/media/view.php?file=pixel-solusindo-logo-notext-a88de471.webp"
            alt="Pixel Solusindo"
            class="h-12 w-12 object-contain"
          />
          <h1 class="text-2xl font-semibold mt-3">Login</h1>
          <p class="text-sm text-slate-600">
            Company Management System
          </p>
        </div>

        <form id="loginForm" class="space-y-4">
          <div>
            <label class="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="email@company.com"
              class="mt-1 w-full px-4 py-2 rounded-xl border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>

          <div>
            <label class="text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              class="mt-1 w-full px-4 py-2 rounded-xl border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>

          <button
            type="submit"
            class="w-full py-2 rounded-xl bg-brand-primary text-white font-semibold
                   hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <div class="flex justify-between mt-4 text-sm">
          <button
            type="button"
            data-nav="#/forgot-password"
            class="text-slate-600 hover:text-brand-primary"
          >
            Forgot password?
          </button>

          <button
            type="button"
            data-nav="#/register"
            class="text-slate-600 hover:text-brand-primary"
          >
            Create account
          </button>
        </div>

        <div class="mt-5 text-xs text-slate-500 text-center">
          Development mode: login menggunakan token dummy.
        </div>

      </div>
    </div>
  `;
}

export function mount() {
  // SPA navigation
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () =>
      navigate(btn.getAttribute("data-nav"))
    );
  });

  // Login handler (dummy, replace with API later)
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value.trim();

    state.setAuth({
      token: "dev_dummy_token",
      user: { id: 1, email },
    });

    navigate("#/dashboard");
  });
}
