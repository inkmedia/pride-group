import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ensureAdminRequest } from "@/lib/admin-route";
import { createProject, listProjects } from "@/lib/project-store";
import type { Project } from "@/types/project";

export const runtime = "nodejs";

export async function GET() {
  const unauthorized = await ensureAdminRequest();

  if (unauthorized) {
    return unauthorized;
  }

  const projects = await listProjects();

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const unauthorized = await ensureAdminRequest();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const project = (await request.json()) as Project;
    const createdProject = await createProject(project);

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${createdProject.slug}`);

    return NextResponse.json({
      success: true,
      project: createdProject,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 409 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Failed to create project.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
