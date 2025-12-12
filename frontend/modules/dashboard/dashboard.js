import { state } from "../../services/state.js";

export function render() {
  const user = state.getUser();
  const email = user?.email || "";

  return `
    <div class="grid gap-6">

      <!-- Banner -->
      <div class="rounded-2xl overflow-hidden border border-slate-200">
        <img
          src="https://pixelsolusindo.com/store/assets/files/image/banner-desktop-1.webp"
          alt="Pixel Solusindo Banner"
          class="w-full h-28 md:h-40 object-cover"
        />
      </div>

      <!-- Main -->
      <section class="bg-white border border-slate-200 rounded-2xl p-6">
        <h1 class="text-2xl font-semibold">Dashboard</h1>

        <p class="text-sm text-slate-600 mt-1">
          ${email ? `Welcome, ${email}.` : "Welcome."}
          Ini skeleton awal SPA.
        </p>

        <div class="mt-6 grid md:grid-cols-3 gap-4">
          ${card("Company", "Kelola company, logo, notes.", "#/company")}
          ${card("Gantt", "Visualisasi timeline project & task.", "#/gantt")}
          ${card("Tasks", "Task list & progress grouping.", "#/task")}
        </div>
      </section>

      <!-- Next Steps -->
      <section class="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 class="text-lg font-semibold">Next Steps</h2>
        <ul class="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1">
          <li>Connect auth ke backend JWT (Node.js)</li>
          <li>CRUD Company → Department → Project</li>
          <li>Implement move / reassign (drag & drop)</li>
          <li>Build Gantt view (based on dates & relations)</li>
        </ul>
      </section>

    </div>
  `;
}

/**
 * SPA-safe card (no page reload)
 */
function card(title, desc, href) {
  return `
    <button
      data-nav="${href}"
      class="text-left block bg-slate-50 border border-slate-200 rounded-2xl p-4
             hover:bg-white hover:shadow-sm transition w-full"
    >
      <div class="font-semibold">${title}</div>
      <div class="text-sm text-slate-600 mt-1">${desc}</div>
      <div class="text-xs text-brand-primary mt-3">Open →</div>
    </button>
  `;
}
