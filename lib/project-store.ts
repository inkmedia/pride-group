import { prisma } from "@/lib/prisma";
import type { Project } from "@/types/project";

type ProjectPayload = Project;

function normalizeProject(record: {
  slug: string;
  payload: unknown;
}): Project | null {
  if (!record?.payload || typeof record.payload !== "object") {
    return null;
  }

  const payload = record.payload as ProjectPayload;

  return {
    ...payload,
    slug: payload.slug || record.slug,
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
