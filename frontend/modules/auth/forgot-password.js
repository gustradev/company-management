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
          <h1 class="text-2xl font-semibold mt-3">Forgot Password</h1>
          <p class="text-sm text-slate-600 text-center">
            Reset link will be sent to your email
          </p>
        </div>

        <form id="forgotForm" class="space-y-4">
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

          <button
            type="submit"
            class="w-full py-2 rounded-xl bg-brand-primary text-white font-semibold
                   hover:opacity-90 transition"
          >
            Send reset link
          </button>
        </form>

        <div class="mt-5 text-xs text-slate-500 text-center">
          Jika email terdaftar, instruksi reset akan dikirim.
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

  document.getElementById("forgotForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Placeholder: nanti call API /auth/forgot-password
    navigate("#/verify-email?sent=true");
  });
}
