import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import AdminNavLink from "@/components/admin/AdminNavLink";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listProjects } from "@/lib/project-store";

export default async function AdminProjectsPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const projects = await listProjects();

  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-[28px] font-[600] text-black sm:text-[34px]">
              Projects
            </h1>
            <p className="mt-2 text-[14px] text-black/60">
              Manage all project pages from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <AdminNavLink
              href="/admin"
              className="rounded-full border border-black/15 bg-white px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
            >
              Dashboard
            </AdminNavLink>

            <AdminNavLink
              href="/admin/projects/new"
              className="rounded-full bg-[#172f55] px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90"
            >
              Add New Project
            </AdminNavLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="border-b border-black/10 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-[18px] font-[600] text-black">
                All Projects
              </h2>
              <p className="text-[13px] text-black/55">
                Total:{" "}
                <span className="font-[700] text-black">{projects.length}</span>
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-[1.2fr_0.7fr_1fr_0.8fr_0.8fr_1fr] border-b border-black/10 bg-[#f8f8f8] px-6 py-4 text-[12px] font-[700] uppercase tracking-[0.08em] text-black/55">
              <div>Project</div>
              <div>City</div>
              <div>Slug</div>
              <div>Category</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            <div>
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="grid grid-cols-[1.2fr_0.7fr_1fr_0.8fr_0.8fr_1fr] items-center border-b border-black/5 px-6 py-5 transition hover:bg-[#fafafa]"
                >
                  <div className="pr-4">
                    <h3 className="text-[16px] font-[600] text-black">
                      {project.hero.heading}
                    </h3>
                    <p className="mt-1 text-[13px] text-black/60">
                      {project.title}
                    </p>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.06em] text-black/45">
                      {project.location}
                    </p>
                  </div>

                  <div>
                    <span className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1 text-[12px] font-[600] text-black/70">
                      {project.city || "Unassigned"}
                    </span>
                  </div>

                  <div>
                    <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[12px] font-[600] text-black/70">
                      {project.slug}
                    </span>
                  </div>

                  <div>
                    <span className="inline-flex rounded-full bg-[#eef2f7] px-3 py-1 text-[12px] font-[700] text-[#172f55]">
                      {project.overview.category || "—"}
                    </span>
                  </div>

                  <div>
                    <span className="inline-flex rounded-full bg-[#f7f7f7] px-3 py-1 text-[12px] font-[600] text-black/70">
                      {project.overview.status || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                    >
                      View
                    </Link>

                    <AdminNavLink
                      href={`/admin/projects/${project.slug}/edit`}
                      className="rounded-full bg-[#172f55] px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90"
                    >
                      Edit
                    </AdminNavLink>

                    <DeleteProjectButton slug={project.slug} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 p-4 lg:hidden">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="rounded-[16px] border border-black/10 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[17px] font-[600] leading-[1.3] text-black">
                      {project.hero.heading}
                    </h3>
                    <p className="mt-1 text-[13px] text-black/60">
                      {project.title}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#eef2f7] px-3 py-1 text-[11px] font-[700] uppercase tracking-[0.08em] text-[#172f55]">
                    {project.overview.category || "—"}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-[13px] text-black/65">
                  <p>
                    <span className="font-[700] text-black">City:</span>{" "}
                    {project.city || "Unassigned"}
                  </p>
                  <p>
                    <span className="font-[700] text-black">Slug:</span>{" "}
                    {project.slug}
                  </p>
                  <p>
                    <span className="font-[700] text-black">Status:</span>{" "}
                    {project.overview.status || "N/A"}
                  </p>
                  <p>
                    <span className="font-[700] text-black">Location:</span>{" "}
                    {project.location}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
                  >
                    View
                  </Link>

                  <AdminNavLink
                    href={`/admin/projects/${project.slug}/edit`}
                    className="rounded-full bg-[#172f55] px-4 py-2 text-[11px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90"
                  >
                    Edit
                  </AdminNavLink>

                  <DeleteProjectButton slug={project.slug} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
