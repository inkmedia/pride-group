export default function AdminPage() {
  return (
    <section className="h-[80vh]">
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
            Overview
          </p>
          <h2 className="mt-2 text-[28px] font-[600] text-black">
            Welcome to the Pride Group admin dashboard
          </h2>
          <p className="mt-3 max-w-[780px] text-[15px] leading-7 text-black/65">
            This area can be used to manage projects, content sections, media
            assets, and future internal tools. For now, this dashboard acts as
            the central entry point for the admin experience.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
            Quick Actions
          </p>

          <div className="mt-4 space-y-3">
            <a
              href="/admin/projects"
              className="block rounded-xl border border-black/10 px-4 py-3 text-[14px] font-[600] text-black transition hover:bg-black hover:text-white"
            >
              Manage Projects
            </a>

            <a
              href="/admin/content"
              className="block rounded-xl border border-black/10 px-4 py-3 text-[14px] font-[600] text-black transition hover:bg-black hover:text-white"
            >
              Manage Content
            </a>

            <a
              href="/admin/settings"
              className="block rounded-xl border border-black/10 px-4 py-3 text-[14px] font-[600] text-black transition hover:bg-black hover:text-white"
            >
              Admin Settings
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
