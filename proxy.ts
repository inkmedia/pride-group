import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";

function getSecret() {
  return process.env.ADMIN_SECRET || "";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function verifySessionValue(value: string) {
  const parts = value.split("|");
  if (parts.length !== 3) return false;

  const [email, issuedAt, signature] = parts;
  const payload = `${email}|${issuedAt}`;
  const expected = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return false;

  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const session = request.cookies.get(COOKIE_NAME)?.value;
  const isAuthenticated = session ? verifySessionValue(session) : false;

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
