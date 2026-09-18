import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users } from "@/db/schema";

export type Role = "customer" | "admin";

/** Bootstrap allowlist from env. Works even before any DB role is assigned. */
export function adminEmailAllowlist(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Durable role lookup. Fails closed: any database error or missing row
 * yields "customer".
 */
export async function getUserRole(userId: string): Promise<Role> {
  try {
    const db = getDb();
    const rows = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return rows[0]?.role === "admin" ? "admin" : "customer";
  } catch {
    return "customer";
  }
}

export interface AdminIdentity {
  userId: string;
  email: string;
  via: "role" | "allowlist";
}

/**
 * Server-side admin check. Admin when the durable DB role is "admin" OR the
 * sign-in email is on the ADMIN_EMAILS bootstrap allowlist. Returns null
 * otherwise. Never trust a client-supplied role.
 */
export async function getAdmin(): Promise<AdminIdentity | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const cu = await currentUser().catch(() => null);
  const email = cu?.emailAddresses?.[0]?.emailAddress ?? "";
  const emailLower = email.toLowerCase();

  if ((await getUserRole(userId)) === "admin") {
    return { userId, email, via: "role" };
  }
  if (emailLower && adminEmailAllowlist().includes(emailLower)) {
    return { userId, email, via: "allowlist" };
  }
  return null;
}
