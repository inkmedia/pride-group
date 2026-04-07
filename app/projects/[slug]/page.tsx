import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectStickyNav from "@/components/project/ProjectStickyNav";
import ProjectFloatingBadge from "@/components/project/ProjectFloatingBadge";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectRera from "@/components/project/ProjectRera";
import ProjectFeatures from "@/components/project/ProjectFeatures";
import { getProjectBySlug } from "@/lib/project-store";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project page could not be found.",
    };
  }

  const title =
    project.seo?.metaTitle || `${project.hero.heading} | Pride Group`;

  const description =
    project.seo?.metaDescription || project.overview.description;

  const image =
    project.seo?.metaImage ||
    project.overview.imageSrc ||
    (project.hero.type === "image" ? project.hero.src : "") ||
    (project.hero.type === "carousel" ? project.hero.images[0] : "");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image
        ? [
            {
              url: image,
              alt: project.hero.heading,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectFeatures project={project} />
      <ProjectStickyNav />
      <ProjectFloatingBadge />
      <ProjectAmenities project={project} />
      <ProjectDetails project={project} />
      <ProjectRera project={project} />
    </>
  );
}
