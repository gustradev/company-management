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
          <h1 class="text-2xl font-semibold mt-3">Create Account</h1>
          <p class="text-sm text-slate-600 text-center">
            Verification email will be sent
          </p>
        </div>

        <form id="registerForm" class="space-y-4">
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
              placeholder="Create password"
              class="mt-1 w-full px-4 py-2 rounded-xl border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>

          <div>
            <label class="text-sm font-medium">Confirm Password</label>
            <input
              name="confirm"
              type="password"
              required
              placeholder="Repeat password"
              class="mt-1 w-full px-4 py-2 rounded-xl border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>

          <button
            type="submit"
            class="w-full py-2 rounded-xl bg-brand-primary text-white font-semibold
                   hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <div class="mt-5 text-xs text-slate-500 text-center">
          Setelah registrasi, silakan cek email untuk verifikasi akun.
        </div>

        <div class="mt-4 text-sm text-center">
          <button
            type="button"
            data-nav="#/login"
            class="text-slate-600 hover:text-brand-primary"
          >
            Back to login
          </button>
        </div>

      </div>
    </div>
  `;
}

export function mount() {
  document.querySelector("[data-nav]").addEventListener("click", () =>
    navigate("#/login")
  );

  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    if (form.password.value !== form.confirm.value) {
      alert("Password confirmation does not match");
      return;
    }

    // Placeholder: nanti call API /auth/register
    navigate("#/verify-email?sent=true");
  });
}
