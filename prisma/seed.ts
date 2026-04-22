import { PrismaClient, Prisma } from "@prisma/client";
import { projects } from "../data/projects";

const prisma = new PrismaClient();

function toPayload(project: unknown) {
  return JSON.parse(JSON.stringify(project)) as Prisma.InputJsonValue;
}

async function main() {
  for (const project of projects) {
    await prisma.projectRecord.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        city: project.city ?? null,
        location: project.location,
        category: project.overview.category || null,
        status: project.overview.status || null,
        payload: toPayload(project),
      },
      create: {
        slug: project.slug,
        title: project.title,
        city: project.city ?? null,
        location: project.location,
        category: project.overview.category || null,
        status: project.overview.status || null,
        payload: toPayload(project),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Failed to seed projects:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
