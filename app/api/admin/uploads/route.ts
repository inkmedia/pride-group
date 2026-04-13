import { NextResponse } from "next/server";
import { mkdir, readdir, stat } from "fs/promises";
import path from "path";
import { ensureAdminRequest } from "@/lib/admin-route";

export const runtime = "nodejs";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov"];

function getFileType(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();

  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (VIDEO_EXTENSIONS.includes(ext)) return "video";
  return "other";
}

export async function GET() {
  const unauthorized = await ensureAdminRequest();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const files = await readdir(uploadDir);

    const items = await Promise.all(
      files.map(async (fileName) => {
        const filePath = path.join(uploadDir, fileName);
        const fileStats = await stat(filePath);

        return {
          name: fileName,
          url: `/uploads/${fileName}`,
          type: getFileType(fileName),
          modifiedAt: fileStats.mtimeMs,
        };
      }),
    );

    const mediaItems = items
      .filter((item) => item.type === "image" || item.type === "video")
      .sort((a, b) => b.modifiedAt - a.modifiedAt);

    return NextResponse.json({
      success: true,
      files: mediaItems,
    });
  } catch (error) {
    console.error("Fetch uploads error:", error);
    return NextResponse.json(
      { error: "Failed to load uploads." },
      { status: 500 },
    );
  }
}
