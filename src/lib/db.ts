import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

/**
 * Lazy Neon HTTP database client.
 *
 * Use getDb() instead of a module-level `db` export so that marketing pages
 * (which never touch the database) build fine when DATABASE_URL is not set.
 * Throws a clear error at call time if the env var is missing.
 */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return drizzle(neon(url));
}

export type Db = ReturnType<typeof getDb>;
