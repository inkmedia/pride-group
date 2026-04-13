import { NextResponse } from "next/server";
import { mkdir, writeFile, access } from "fs/promises";
import path from "path";
import { ensureAdminRequest } from "@/lib/admin-route";

export const runtime = "nodejs";

async function getUniqueFileName(
  uploadDir: string,
  baseName: string,
  ext: string,
) {
  let fileName = `${baseName}${ext}`;
  let filePath = path.join(uploadDir, fileName);
  let counter = 1;

  while (true) {
    try {
      await access(filePath);
      fileName = `${baseName}-${counter}${ext}`;
      filePath = path.join(uploadDir, fileName);
      counter++;
    } catch {
      return fileName;
    }
  }
}

export async function POST(request: Request) {
  const unauthorized = await ensureAdminRequest();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name).toLowerCase() || "";
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const fileName = await getUniqueFileName(uploadDir, safeName, ext);
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
      name: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 },
    );
  }
}
