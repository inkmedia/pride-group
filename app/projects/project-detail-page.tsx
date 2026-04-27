import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectFeatures from "@/components/project/ProjectFeatures";
import ProjectFloatingBadge from "@/components/project/ProjectFloatingBadge";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectRera from "@/components/project/ProjectRera";
import ProjectStickyNav from "@/components/project/ProjectStickyNav";
import { getProjectPath } from "@/lib/project-city";
import { getProjectBySlug } from "@/lib/project-store";

const getCachedProjectBySlug = cache(async (slug: string) =>
  getProjectBySlug(slug),
);

export async function generateProjectMetadata(slug: string): Promise<Metadata> {
  const project = await getCachedProjectBySlug(slug);

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
    alternates: {
      canonical: `https://www.pridegroup.net${getProjectPath(project)}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.pridegroup.net${getProjectPath(project)}`,
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

export async function ProjectDetailPage({ slug }: { slug: string }) {
  const project = await getCachedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectFeatures project={project} />
      <ProjectStickyNav />
      {project.city === "Pune" ? <ProjectFloatingBadge /> : null}
      <ProjectAmenities project={project} />
      <ProjectDetails project={project} />
      <ProjectRera project={project} />
    </>
  );
}
