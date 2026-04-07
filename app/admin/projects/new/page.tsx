import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import ProjectEditForm from "@/components/admin/ProjectEditForm";
import type { Project } from "@/types/project";

const emptyProject: Project = {
  slug: "",
  title: "",
  location: "",
  hero: {
    type: "image",
    src: "",
    heading: "",
  },
  overview: {
    category: "",
    status: "",
    subtitle: "",
    location: "",
    description: "",
    logoSrc: "",
    imageSrc: "",
    imageAlt: "",
    stats: [],
    highlights: [],
    amenities: [],
    mediaBadges: [],
  },
  details: {
    amenities: {
      title: "",
      categories: [],
      miscTitle: "",
      miscItems: [],
    },
    specifications: [],
    galleryTabs: [],
    connectivity: {
      title: "",
      groups: [],
    },
  },
  features: {
    images: [],
  },
  cta: {
    title: "",
    description: "",
    primaryLabel: "",
    primaryHref: "",
    secondaryLabel: "",
    secondaryHref: "",
  },
  rera: {
    note: "",
    websiteUrl: "",
    items: [],
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    metaImage: "",
  },
};

export default async function NewProjectPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
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
              Add New Project
            </h1>
            <p className="mt-2 text-[14px] text-black/60">
              Create a new project page by filling in the required details
              below.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/projects"
              className="rounded-full border border-black/15 bg-white px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
            >
              Back to Projects
            </Link>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="rounded-full border border-black/15 bg-white px-5 py-3 text-[12px] font-[700] uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <ProjectEditForm project={emptyProject} mode="create" />
      </div>
    </section>
  );
}
