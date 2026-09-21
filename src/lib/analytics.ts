import { getDb } from "@/lib/db";
import { analyticsEvents } from "@/db/schema";

/**
 * First-party analytics: server-side event logging, no cookies, no
 * third-party trackers. Failures are swallowed after a console log so
 * analytics can never break a user-facing request.
 *
 * Use logEventWait (awaited) on revenue-critical paths such as checkout
 * and webhooks so the write completes before a serverless function
 * freezes. Use logEvent (fire-and-forget) for page views where losing a
 * row is acceptable.
 */
export async function logEventWait(
  event: string,
  path: string,
  userId?: string | null,
  meta?: Record<string, string | number | boolean>
): Promise<void> {
  try {
    const db = getDb();
    await db.insert(analyticsEvents).values({
      event,
      path: path.slice(0, 500),
      userId: userId ?? null,
      meta: meta ? JSON.stringify(meta).slice(0, 2000) : null,
    });
  } catch (err) {
    console.error("analytics logEvent failed", event, err);
  }
}

/**
 * Retention: deletes analytics events older than the given number of months.
 * Called from the scheduled reconciliation sweep so it runs automatically.
 * The privacy policy promises analytics events are kept for up to 24 months.
 */
export async function pruneOldAnalytics(months = 24): Promise<number> {
  const db = getDb();
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  const { lt } = await import("drizzle-orm");
  const deleted = await db
    .delete(analyticsEvents)
    .where(lt(analyticsEvents.createdAt, cutoff))
    .returning({ id: analyticsEvents.id });
  return deleted.length;
}

export function logEvent(
  event: string,
  path: string,
  userId?: string | null,
  meta?: Record<string, string | number | boolean>
): void {
  // Intentionally not awaited: page-view analytics must not slow the request.
  logEventWait(event, path, userId, meta).catch((err) =>
    console.error("analytics logEvent failed", event, err)
  );
}
