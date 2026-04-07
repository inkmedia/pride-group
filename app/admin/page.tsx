import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <section className="min-h-screen px-4 py-10 sm:px-8 mt-30">
      <div className="mx-auto max-w-[1200px]">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-[30px] font-[600] text-black">Welcome</h1>
          <p className="mt-3 text-[15px] text-black/65">
            Admin login is working. You can now access the project management
            area.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/projects"
              className="rounded-full bg-[#172f55] px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90"
            >
              Manage Projects
            </Link>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="rounded-full border border-black/15 px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
