import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getProjectBySlug } from "@/lib/project-store";
import ProjectEditForm from "@/components/admin/ProjectEditForm";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="min-h-screen mt-30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-[28px] font-[600] text-black sm:text-[34px]">
              Edit Project
            </h1>
            <p className="mt-2 text-[14px] text-black/60">
              Editing:{" "}
              <span className="font-[700] text-black">
                {project.hero.heading}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/projects"
              className="rounded-full border border-black/15 bg-white px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
            >
              Back to Projects
            </Link>

            <Link
              href={`/projects/${project.slug}`}
              target="_blank"
              className="rounded-full bg-[#172f55] px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90"
            >
              View Live Page
            </Link>

            <DeleteProjectButton
              slug={project.slug}
              redirectTo="/admin/projects"
              className="rounded-full border border-red-200 px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-red-600 transition hover:bg-red-50"
            />
          </div>
        </div>

        <ProjectEditForm project={project} mode="edit" />
      </div>
    </section>
  );
}
