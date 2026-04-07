import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function ensureAdminRequest() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
}
