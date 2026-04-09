import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ensureAdminRequest } from "@/lib/admin-route";
import {
  deleteProject,
  getProjectBySlug,
  updateProject,
} from "@/lib/project-store";
import type { Project } from "@/types/project";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const unauthorized = await ensureAdminRequest();

  if (unauthorized) {
    return unauthorized;
  }

  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const unauthorized = await ensureAdminRequest();

  if (unauthorized) {
    return unauthorized;
  }

  const { slug } = await params;

  try {
    const project = (await request.json()) as Project;
    const updatedProject = await updateProject(slug, project);

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${slug}/edit`);
    revalidatePath(`/admin/projects/${updatedProject.slug}/edit`);
    revalidatePath("/projects");
    revalidatePath(`/projects/${slug}`);
    revalidatePath(`/projects/${updatedProject.slug}`);

    return NextResponse.json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

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
      error instanceof Error ? error.message : "Failed to update project.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const unauthorized = await ensureAdminRequest();

  if (unauthorized) {
    return unauthorized;
  }

  const { slug } = await params;

  try {
    await deleteProject(slug);

    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${slug}`);
    revalidatePath(`/admin/projects/${slug}/edit`);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 400 },
    );
  }
}
