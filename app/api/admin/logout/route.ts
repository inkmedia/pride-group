import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { clearAdminSession } from "@/lib/admin-auth";

export async function POST() {
  await clearAdminSession();

  const headerStore = await headers();
  const protocol = headerStore.get("x-forwarded-proto") || "http";
  const host =
    headerStore.get("x-forwarded-host") ||
    headerStore.get("host") ||
    "localhost:3000";

  return NextResponse.redirect(`${protocol}://${host}/`, 303);
}
