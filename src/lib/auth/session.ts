import { cookies } from "next/headers";
import { getAuthConfig } from "./config";
import type { CustomerSession } from "./types";

const SESSION_VERSION = 1;

type StoredSession = CustomerSession & { v: number };

function encodeSession(session: CustomerSession): string {
  const payload: StoredSession = { ...session, v: SESSION_VERSION };
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodeSession(raw: string | undefined): CustomerSession | null {
  if (!raw) return null;
  try {
    const json = Buffer.from(raw, "base64url").toString("utf8");
    const data = JSON.parse(json) as StoredSession;
    if (data.v !== SESSION_VERSION || !data.accessToken || !data.expiresAt) {
      return null;
    }
    if (new Date(data.expiresAt).getTime() <= Date.now()) {
      return null;
    }
    return {
      accessToken: data.accessToken,
      expiresAt: data.expiresAt,
      email: data.email,
      customerId: data.customerId,
      rememberMe: Boolean(data.rememberMe),
      provider: data.provider,
    };
  } catch {
    return null;
  }
}

/** Read customer session from httpOnly cookie (server-only). */
export async function getCustomerSession(): Promise<CustomerSession | null> {
  const jar = await cookies();
  const { cookieName } = getAuthConfig();
  return decodeSession(jar.get(cookieName)?.value);
}

export async function isAuthenticated(): Promise<boolean> {
  return Boolean(await getCustomerSession());
}

/** Persist Shopify customer access token (or local scaffold token). */
export async function setCustomerSession(session: CustomerSession): Promise<void> {
  const jar = await cookies();
  const { cookieName, sessionMaxAgeDays, rememberMaxAgeDays } = getAuthConfig();
  const days = session.rememberMe ? rememberMaxAgeDays : sessionMaxAgeDays;
  const maxAge = days * 24 * 60 * 60;

  jar.set(cookieName, encodeSession(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function clearCustomerSession(): Promise<void> {
  const jar = await cookies();
  const { cookieName } = getAuthConfig();
  jar.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
