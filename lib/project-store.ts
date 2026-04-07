import { Prisma } from "@prisma/client";
import { projects as fallbackProjects } from "@/data/projects";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/types/project";

type ProjectRecordData = {
  slug: string;
  title: string;
  location: string;
  category: string | null;
  status: string | null;
  payload: Prisma.InputJsonValue;
};

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function toProjectPayload(project: Project) {
  return JSON.parse(JSON.stringify(project)) as Prisma.InputJsonValue;
}

function fromProjectPayload(payload: Prisma.JsonValue) {
  return payload as unknown as Project;
}

export function buildProjectRecordData(project: Project): ProjectRecordData {
  return {
    slug: project.slug,
    title: project.title,
    location: project.location,
    category: project.overview.category || null,
    status: project.overview.status || null,
    payload: toProjectPayload(project),
  };
}

export function validateProjectInput(project: Project) {
  if (!project.slug.trim()) {
    throw new Error("Project slug is required.");
  }

  if (!project.title.trim()) {
    throw new Error("Project title is required.");
  }

  if (!project.hero.heading.trim()) {
    throw new Error("Project heading is required.");
  }
}

export async function listProjects() {
  if (!isDatabaseConfigured()) {
    return fallbackProjects;
  }

  const records = await prisma.projectRecord.findMany({
    orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
  });

  return records.map((record) => fromProjectPayload(record.payload));
}

export async function getProjectBySlug(slug: string) {
  if (!isDatabaseConfigured()) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  const record = await prisma.projectRecord.findUnique({
    where: { slug },
  });

  return record ? fromProjectPayload(record.payload) : null;
}

export async function createProject(project: Project) {
  validateProjectInput(project);

  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const record = await prisma.projectRecord.create({
    data: buildProjectRecordData(project),
  });

  return fromProjectPayload(record.payload);
}

export async function updateProject(currentSlug: string, project: Project) {
  validateProjectInput(project);

  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const record = await prisma.projectRecord.update({
    where: { slug: currentSlug },
    data: buildProjectRecordData(project),
  });

  return fromProjectPayload(record.payload);
}

export async function deleteProject(slug: string) {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return prisma.projectRecord.delete({
    where: { slug },
  });
}
