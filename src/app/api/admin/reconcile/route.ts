import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin";
import { runReconciliation } from "@/lib/reconcile";

/**
 * Admin-only reconciliation sweep. Compares recently paid Stripe Checkout
 * sessions against the purchases table and reports sessions that were paid
 * at Stripe but never recorded (paid, no access granted).
 *
 * Can also be called on a schedule: pass ?cron=1 with header
 * x-cron-secret matching CRON_SECRET.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);

  if (url.searchParams.get("cron") === "1") {
    const secret = req.headers.get("x-cron-secret");
    if (!secret || secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }
  } else {
    const admin = await getAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    }
  }

  let days = 7;
  try {
    const body = (await req.json().catch(() => null)) as { days?: unknown } | null;
    if (typeof body?.days === "number" && body.days >= 1 && body.days <= 90) {
      days = Math.floor(body.days);
    }
  } catch {
    // default stands
  }

  const result = await runReconciliation(days);

  // On the scheduled run, also enforce the 24-month analytics retention policy.
  if (url.searchParams.get("cron") === "1") {
    try {
      const { pruneOldAnalytics } = await import("@/lib/analytics");
      const pruned = await pruneOldAnalytics(24);
      if (pruned > 0) console.log(`analytics retention: pruned ${pruned} events older than 24 months`);
    } catch (err) {
      console.error("analytics prune failed", err);
    }
  }

  if (result.mismatches.length > 0) {
    console.error(
      `reconciliation: ${result.mismatches.length} paid session(s) with no purchase record`,
      result.mismatches.map((m) => m.stripeSessionId)
    );
  }

  return NextResponse.json(result);
}
