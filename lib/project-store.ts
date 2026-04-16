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

export async function getAllProjects(): Promise<Project[]> {
  const records = await prisma.projectRecord.findMany({
    orderBy: { createdAt: "desc" },
  });

  return records
    .map((record) => normalizeProject(record))
    .filter((project): project is Project => project !== null);
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
