import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getProjectCitySlug,
  getProjectPath,
} from "@/lib/project-city";
import { getProjectBySlug } from "@/lib/project-store";
import type { ProjectCity } from "@/types/project";
import {
  generateProjectMetadata,
  ProjectDetailPage,
} from "@/app/projects/project-detail-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateCityProjectMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return generateProjectMetadata(slug);
}

export async function StaticCityProjectPage({
  city,
  params,
}: {
  city: ProjectCity;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  if (!project.city) {
    redirect(getProjectPath(project));
  }

  if (getProjectCitySlug(project.city) !== getProjectCitySlug(city)) {
    redirect(getProjectPath(project));
  }

  return <ProjectDetailPage slug={slug} />;
}
