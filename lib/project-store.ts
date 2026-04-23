import { prisma } from "@/lib/prisma";
import { inferProjectCity, normalizeProjectCity } from "@/lib/project-city";
import type { Project, ProjectCity } from "@/types/project";

type ProjectPayload = Project;

function normalizeProject(record: {
  slug: string;
  city: string | null;
  location: string;
  payload: unknown;
}): Project | null {
  if (!record?.payload || typeof record.payload !== "object") {
    return null;
  }

  const payload = record.payload as ProjectPayload;
  const city =
    normalizeProjectCity(payload.city) ??
    normalizeProjectCity(record.city) ??
    inferProjectCity(
      payload.overview?.location,
      payload.location,
      record.location,
    );

  return {
    ...payload,
    slug: payload.slug || record.slug,
    city: city ?? undefined,
  };
}

export async function listProjects(): Promise<Project[]> {
  const records = await prisma.projectRecord.findMany({
    orderBy: { createdAt: "desc" },
  });

  return records
    .map((record) => normalizeProject(record))
    .filter((project): project is Project => project !== null);
}

export const getAllProjects = listProjects;

export async function listProjectsByCity(
  city: ProjectCity,
): Promise<Project[]> {
  const projects = await listProjects();

  return projects.filter((project) => project.city === city);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const record = await prisma.projectRecord.findUnique({
    where: { slug },
  });

  if (!record) {
    return null;
  }

  return normalizeProject(record);
}

export async function createProject(project: Project): Promise<Project> {
  const record = await prisma.projectRecord.create({
    data: {
      slug: project.slug,
      title: project.title,
      city: project.city ?? null,
      location: project.location,
      category: project.overview.category || null,
      status: project.overview.status || null,
      payload: project,
    },
  });

  const normalized = normalizeProject(record);

  if (!normalized) {
    throw new Error("Failed to create project.");
  }

  return normalized;
}

export async function updateProject(
  slug: string,
  project: Project,
): Promise<Project> {
  const record = await prisma.projectRecord.update({
    where: { slug },
    data: {
      slug: project.slug,
      title: project.title,
      city: project.city ?? null,
      location: project.location,
      category: project.overview.category || null,
      status: project.overview.status || null,
      payload: project,
    },
  });

  const normalized = normalizeProject(record);

  if (!normalized) {
    throw new Error("Failed to update project.");
  }

  return normalized;
}

export async function deleteProject(slug: string): Promise<void> {
  await prisma.projectRecord.delete({
    where: { slug },
  });
}
