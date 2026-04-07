import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";

function getSecret() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SECRET is not set");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionValue(email: string) {
  const payload = `${email}|${Date.now()}`;
  const signature = sign(payload);
  return `${payload}|${signature}`;
}

export function verifySessionValue(value: string) {
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

export async function setAdminSession(email: string) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, createSessionValue(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (!session) return false;
  return verifySessionValue(session);
}
