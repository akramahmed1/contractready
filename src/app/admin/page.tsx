import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { ReactNode } from "react";
import { getDb } from "@/lib/db";
import { analyticsEvents, bidKitRequests, leads, lessonProgress, notificationLog, opportunityProfiles, purchases, reconcileCases, stripeEvents, users } from "@/db/schema";
import { lessonsForTier } from "@/content";
import { PAID_TIERS, TIERS } from "@/lib/tiers";
import type { TierId } from "@/lib/tiers";
import { getAdmin } from "@/lib/admin";
import ReconcilePanel from "@/components/admin/ReconcilePanel";

export const dynamic = "force-dynamic";

const KIT_STATUSES = ["requested", "in_progress", "delivered"] as const;

async function updateBidKitRequest(formData: FormData) {
  "use server";
  const admin = await getAdmin();
  if (!admin) throw new Error("Not authorized");

  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "");
  const adminNotes = String(formData.get("adminNotes") ?? "").trim() || null;
  const deliveryUrlRaw = String(formData.get("deliveryUrl") ?? "").trim();
  if (!Number.isInteger(id) || !KIT_STATUSES.includes(status as (typeof KIT_STATUSES)[number])) {
    throw new Error("Invalid bid kit update");
  }
  let deliveryUrl: string | null = null;
  if (deliveryUrlRaw) {
    try {
      const parsed = new URL(deliveryUrlRaw);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error();
      deliveryUrl = parsed.toString();
    } catch {
      throw new Error("Delivery link must be a valid http(s) URL");
    }
  }

  const db = getDb();
  const before = await db
    .select({ userId: bidKitRequests.userId, title: bidKitRequests.solicitationTitle, status: bidKitRequests.status })
    .from(bidKitRequests)
    .where(eq(bidKitRequests.id, id))
    .limit(1);
  await db
    .update(bidKitRequests)
    .set({
      status,
      adminNotes,
      deliveryUrl,
      updatedAt: new Date(),
      deliveredAt: status === "delivered" ? new Date() : null,
    })
    .where(eq(bidKitRequests.id, id));

  // Notify the member when a kit starts being prepared or is delivered
  // (logged as skipped until an email provider is configured).
  const prev = before[0];
  if (prev && prev.status !== status && (status === "in_progress" || status === "delivered")) {
    try {
      const { sendEmail, bidKitStatusEmail, bidKitDeliveredEmail, getUserEmail } = await import("@/lib/email");
      const email = await getUserEmail(prev.userId);
      if (email) {
        await sendEmail({
          to: email,
          userId: prev.userId,
          type: status === "delivered" ? "bidkit_delivered" : "bidkit_status",
          template:
            status === "delivered"
              ? bidKitDeliveredEmail(prev.title)
              : bidKitStatusEmail(prev.title, status),
        });
      }
    } catch (err) {
      console.error("bid-kit status email failed", err);
    }
  }
  revalidatePath("/admin");
}

async function setUserRole(formData: FormData) {
  "use server";
  const admin = await getAdmin();
  if (!admin) throw new Error("Not authorized");

  const targetId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!targetId || (role !== "admin" && role !== "customer")) {
    throw new Error("Invalid role update");
  }
  // Nobody demotes themselves: guarantees at least one admin remains reachable.
  if (targetId === admin.userId && role !== "admin") {
    throw new Error("You cannot remove your own admin role");
  }

  const db = getDb();
  await db.update(users).set({ role }).where(eq(users.id, targetId));
  revalidatePath("/admin");
}

/**
 * Grants access for an open reconcile case: creates the purchase row the
 * webhook missed (12-month term from today, same as normal fulfillment),
 * then marks the case resolved. Idempotent via the purchases
 * stripe_session_id unique constraint and the case status check.
 */
async function grantReconcileAccess(formData: FormData) {
  "use server";
  const admin = await getAdmin();
  if (!admin) throw new Error("Not authorized");
  const caseId = Number(formData.get("caseId"));
  if (!Number.isInteger(caseId)) throw new Error("Invalid case");

  const db = getDb();
  const rows = await db.select().from(reconcileCases).where(eq(reconcileCases.id, caseId)).limit(1);
  const kase = rows[0];
  if (!kase || kase.status !== "open") throw new Error("Case is not open");
  if (!kase.userId || !PAID_TIERS.some((t) => t.id === kase.tier)) {
    throw new Error("Case is missing the user or tier; resolve it from the Stripe dashboard instead");
  }
  const tier = kase.tier as TierId;
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + TIERS[tier].termMonths);

  await db.insert(users).values({ id: kase.userId }).onConflictDoNothing();
  await db
    .insert(purchases)
    .values({
      userId: kase.userId,
      tier,
      stripeSessionId: kase.stripeSessionId,
      stripePaymentIntentId: null,
      amountCents: kase.amountCents ?? TIERS[tier].priceCents,
      expiresAt,
      refunded: false,
      ackAt: null,
      ackVersion: null,
    })
    .onConflictDoNothing();
  await db
    .update(reconcileCases)
    .set({ status: "resolved", resolvedAt: new Date(), resolutionNote: "Access granted from admin panel" })
    .where(eq(reconcileCases.id, caseId));
  revalidatePath("/admin");
}

async function ignoreReconcileCase(formData: FormData) {
  "use server";
  const admin = await getAdmin();
  if (!admin) throw new Error("Not authorized");
  const caseId = Number(formData.get("caseId"));
  if (!Number.isInteger(caseId)) throw new Error("Invalid case");
  const db = getDb();
  await db
    .update(reconcileCases)
    .set({ status: "ignored", resolvedAt: new Date(), resolutionNote: "Ignored by admin" })
    .where(eq(reconcileCases.id, caseId));
  revalidatePath("/admin");
}

/**
 * Issues a full Stripe refund for a purchase and marks it refunded.
 * Admin-only. Safe to re-run: already-refunded purchases are rejected, and
 * the Stripe refund call is idempotent per payment intent. When no Stripe
 * key or payment intent exists, the purchase is still marked refunded so
 * access is revoked and the record stays truthful.
 */
async function issueRefund(formData: FormData) {
  "use server";
  const admin = await getAdmin();
  if (!admin) throw new Error("Not authorized");
  const purchaseId = Number(formData.get("purchaseId"));
  if (!Number.isInteger(purchaseId)) throw new Error("Invalid purchase");

  const db = getDb();
  const rows = await db.select().from(purchases).where(eq(purchases.id, purchaseId)).limit(1);
  const purchase = rows[0];
  if (!purchase) throw new Error("Purchase not found");
  if (purchase.refunded) throw new Error("Purchase is already refunded");

  if (purchase.stripePaymentIntentId && process.env.STRIPE_SECRET_KEY) {
    try {
      const { getStripe } = await import("@/lib/stripe");
      await getStripe().refunds.create({ payment_intent: purchase.stripePaymentIntentId });
    } catch (err) {
      throw new Error(
        `Stripe refund failed: ${err instanceof Error ? err.message : "unknown error"}`
      );
    }
  }
  await db.update(purchases).set({ refunded: true }).where(eq(purchases.id, purchaseId));
  revalidatePath("/admin");
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function EmptyRow({ cols, text }: { cols: number; text: string }) {
  return (
    <tr>
      <td colSpan={cols} className="px-4 py-4 text-slate-500">
        {text}
      </td>
    </tr>
  );
}

export default async function AdminPage() {
  const admin = await getAdmin();
  if (!admin) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Not authorized</h1>
        <p className="mt-2 text-slate-600">This area is restricted to administrators.</p>
      </div>
    );
  }

  const db = getDb();
  const [userRows, purchaseRows, leadRows, kitRows, eventRows, profileRows, progressCounts, openCases, notifRows] = await Promise.all([
    db.select().from(users).orderBy(desc(users.createdAt)).limit(100),
    db.select().from(purchases).orderBy(desc(purchases.purchasedAt)).limit(100),
    db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100),
    db.select().from(bidKitRequests).orderBy(desc(bidKitRequests.createdAt)).limit(100),
    db.select().from(stripeEvents).orderBy(desc(stripeEvents.createdAt)).limit(50),
    db.select().from(opportunityProfiles).orderBy(desc(opportunityProfiles.updatedAt)).limit(100),
    db
      .select({ userId: lessonProgress.userId, count: sql<number>`count(*)::int` })
      .from(lessonProgress)
      .groupBy(lessonProgress.userId),
    db
      .select()
      .from(reconcileCases)
      .where(eq(reconcileCases.status, "open"))
      .orderBy(desc(reconcileCases.createdAt))
      .limit(50),
    db.select().from(notificationLog).orderBy(desc(notificationLog.createdAt)).limit(50),
  ]);

  const failedEvents = eventRows.filter((e) => e.status === "failed");

  // Refund-review evidence: lessons used per user vs. lessons in their plan.
  // "Used" means opened (started) or completed; the refund policy treats
  // accessing more than 50% of included lessons as a no-refund condition.
  const progressByUser = new Map(progressCounts.map((p) => [p.userId, p.count]));
  const tierByUser = new Map<string, TierId>();
  const TIER_RANK: TierId[] = ["free", "starter", "bidkit", "growth", "pro", "allaccess"];
  for (const p of purchaseRows) {
    if (p.refunded) continue;
    if (p.expiresAt < new Date()) continue;
    const cur = tierByUser.get(p.userId);
    const next = p.tier as TierId;
    if (!cur || TIER_RANK.indexOf(next) > TIER_RANK.indexOf(cur)) tierByUser.set(p.userId, next);
  }
  const lessonTotalByTier = new Map<TierId, number>();
  function lessonsUsedPct(userId: string): string {
    const used = progressByUser.get(userId) ?? 0;
    const tier = tierByUser.get(userId) ?? "free";
    let total = lessonTotalByTier.get(tier);
    if (total === undefined) {
      total = lessonsForTier(tier).length;
      lessonTotalByTier.set(tier, total);
    }
    if (total === 0) return "0/0";
    return `${used}/${total} (${Math.round((used / total) * 100)}%)`;
  }

  // Analytics: last-30-day aggregates. Best effort; never blocks the page.
  let dailyRows: { day: string; count: number }[] = [];
  let funnelRows: { event: string; count: number }[] = [];
  let topLessons: { path: string; count: number }[] = [];
  try {
    const [d, f, t] = await Promise.all([
      db
        .select({
          day: sql<string>`to_char(${analyticsEvents.createdAt}, 'YYYY-MM-DD')`,
          count: sql<number>`count(*)::int`,
        })
        .from(analyticsEvents)
        .where(sql`${analyticsEvents.createdAt} >= now() - interval '30 days'`)
        .groupBy(sql`to_char(${analyticsEvents.createdAt}, 'YYYY-MM-DD')`)
        .orderBy(sql`to_char(${analyticsEvents.createdAt}, 'YYYY-MM-DD')`),
      db
        .select({ event: analyticsEvents.event, count: sql<number>`count(*)::int` })
        .from(analyticsEvents)
        .where(sql`${analyticsEvents.createdAt} >= now() - interval '30 days'`)
        .groupBy(analyticsEvents.event),
      db
        .select({ path: analyticsEvents.path, count: sql<number>`count(*)::int` })
        .from(analyticsEvents)
        .where(
          sql`${analyticsEvents.event} = 'lesson_view' and ${analyticsEvents.createdAt} >= now() - interval '30 days'`
        )
        .groupBy(analyticsEvents.path)
        .orderBy(sql`count(*) desc`)
        .limit(10),
    ]);
    dailyRows = d;
    funnelRows = f;
    topLessons = t;
  } catch (e) {
    console.error("admin analytics query failed", e);
  }

  const funnelOrder = ["pricing_view", "checkout_started", "purchase_completed", "checklist_signup", "bid_kit_requested"];
  const funnel = funnelOrder.map((ev) => ({
    event: ev,
    count: funnelRows.find((r) => r.event === ev)?.count ?? 0,
  }));
  const totalEvents = funnelRows.reduce((s, r) => s + r.count, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Admin</h1>
      <p className="mt-1 text-slate-600">
        Signed in as {admin.email} ({admin.via === "role" ? "role: admin" : "email allowlist"}).
        Latest records shown.
      </p>

      {failedEvents.length > 0 && (
        <div role="alert" className="mt-6 rounded-xl bg-red-50 p-5 ring-1 ring-red-200">
          <p className="font-bold text-red-900">
            {failedEvents.length} Stripe webhook event{failedEvents.length === 1 ? "" : "s"} need
            review
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm text-red-800">
            {failedEvents.map((e) => (
              <li key={e.id}>
                {e.id} ({e.type}): {e.error ?? "unknown error"}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Section title="Payment reconciliation">
        <ReconcilePanel />
      </Section>

      <Section title={`Open reconcile cases (${openCases.length})`}>
        <p className="mb-3 text-sm text-slate-600">
          Paid Stripe sessions with no matching purchase record. Granting access
          creates the purchase row the webhook missed, with a 12-month term from
          today, exactly as normal fulfillment would.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Session", "Email", "Tier", "Amount", "Paid at", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {openCases.length === 0 && <EmptyRow cols={6} text="No open cases. All paid sessions have purchase records." />}
              {openCases.map((kase, i) => (
                <tr key={kase.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-2 font-mono text-xs text-slate-700">{kase.stripeSessionId}</td>
                  <td className="px-4 py-2 text-slate-700">{kase.email ?? kase.userId ?? "unknown"}</td>
                  <td className="px-4 py-2 text-slate-700">{kase.tier ?? "unknown"}</td>
                  <td className="px-4 py-2 text-slate-700">
                    {kase.amountCents != null ? `$${(kase.amountCents / 100).toFixed(2)}` : "unknown"}
                  </td>
                  <td className="px-4 py-2 text-slate-700">
                    {kase.sessionCreatedAt?.toLocaleString() ?? "unknown"}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <form action={grantReconcileAccess}>
                        <input type="hidden" name="caseId" value={kase.id} />
                        <button
                          type="submit"
                          className="rounded-lg bg-emerald-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                        >
                          Grant access
                        </button>
                      </form>
                      <form action={ignoreReconcileCase}>
                        <input type="hidden" name="caseId" value={kase.id} />
                        <button
                          type="submit"
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Ignore
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Analytics (last 30 days)">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900">Conversion funnel</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {funnel.map((f) => (
                <li key={f.event} className="flex items-center justify-between">
                  <span className="font-mono text-slate-700">{f.event}</span>
                  <span className="font-bold text-slate-900">{f.count.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              {totalEvents.toLocaleString()} total events tracked in the last 30 days.
              First-party only: no cookies, no third-party trackers.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900">Top lessons</h3>
            {topLessons.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No lesson views yet.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {topLessons.map((l) => (
                  <li key={l.path} className="flex items-center justify-between gap-4">
                    <span className="truncate font-mono text-xs text-slate-700">{l.path}</span>
                    <span className="shrink-0 font-bold text-slate-900">{l.count.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900">Events per day</h3>
          {dailyRows.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">No events yet.</p>
          ) : (
            <div className="mt-3 flex h-32 items-end gap-1">
              {dailyRows.map((d) => {
                const max = Math.max(...dailyRows.map((x) => x.count), 1);
                return (
                  <div
                    key={d.day}
                    title={`${d.day}: ${d.count}`}
                    className="min-w-2 flex-1 rounded-t bg-emerald-800"
                    style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
                  />
                );
              })}
            </div>
          )}
          {dailyRows.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              {dailyRows[0].day} to {dailyRows[dailyRows.length - 1].day}
            </p>
          )}
        </div>
      </Section>

      <Section title={`Email notifications (${notifRows.length})`}>
        <p className="mb-3 text-sm text-slate-600">
          Transactional emails the system attempted to send. Status{" "}
          <span className="font-mono">skipped</span> means no email provider is
          configured yet (set <span className="font-mono">RESEND_API_KEY</span> and{" "}
          <span className="font-mono">EMAIL_FROM</span> to start sending).
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["To", "Type", "Status", "When"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notifRows.length === 0 && <EmptyRow cols={4} text="No notifications yet." />}
              {notifRows.map((n, i) => (
                <tr key={n.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-2 text-slate-700">{n.email}</td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-700">{n.type}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        n.status === "sent"
                          ? "bg-emerald-100 text-emerald-900"
                          : n.status === "failed"
                            ? "bg-red-100 text-red-900"
                            : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-700">{n.createdAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={`Users (${userRows.length})`}>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Email", "Role", "Lessons used", "Created", "Change role"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userRows.length === 0 && <EmptyRow cols={5} text="Nothing here yet." />}
              {userRows.map((u, i) => (
                <tr key={u.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-2 text-slate-700">{u.email ?? u.id}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        u.role === "admin" ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-700" title="Lessons opened or completed vs. lessons in the user's plan. Over 50% accessed is a no-refund condition.">
                    {lessonsUsedPct(u.id)}
                  </td>
                  <td className="px-4 py-2 text-slate-700">{u.createdAt.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <form action={setUserRole} className="flex items-center gap-2">
                      <input type="hidden" name="userId" value={u.id} />
                      <select
                        name="role"
                        defaultValue={u.role}
                        className="rounded border border-slate-300 px-2 py-1 text-sm"
                        aria-label={`Role for ${u.email ?? u.id}`}
                      >
                        <option value="customer">customer</option>
                        <option value="admin">admin</option>
                      </select>
                      <button
                        type="submit"
                        className="rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-700"
                      >
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={`Purchases (${purchaseRows.length})`}>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["User", "Tier", "Amount", "Purchased", "Expires", "Refunded", "Ack", "Action"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchaseRows.length === 0 && <EmptyRow cols={8} text="Nothing here yet." />}
              {purchaseRows.map((p, i) => (
                <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-2 text-slate-700">{p.userId}</td>
                  <td className="px-4 py-2 text-slate-700">{p.tier}</td>
                  <td className="px-4 py-2 text-slate-700">${(p.amountCents / 100).toFixed(2)}</td>
                  <td className="px-4 py-2 text-slate-700">{p.purchasedAt.toLocaleString()}</td>
                  <td className="px-4 py-2 text-slate-700">{p.expiresAt.toLocaleString()}</td>
                  <td className="px-4 py-2 text-slate-700">{p.refunded ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-slate-700">
                    {p.ackVersion ? `${p.ackVersion}` : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {!p.refunded && (
                      <form
                        action={issueRefund}
                        onSubmit={(e) => {
                          if (
                            !confirm(
                              `Refund $${(p.amountCents / 100).toFixed(2)} to this buyer and revoke access?`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="purchaseId" value={p.id} />
                        <button
                          type="submit"
                          className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          Refund
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={`Bid kit requests (${kitRows.length})`}>
        <div className="space-y-3">
          {kitRows.length === 0 && (
            <p className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-500">
              Nothing here yet.
            </p>
          )}
          {kitRows.map((r) => (
            <form
              key={r.id}
              action={updateBidKitRequest}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <input type="hidden" name="id" value={r.id} />
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{r.solicitationTitle}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    User {r.userId} · Requested {r.createdAt.toLocaleString()}
                    {r.updatedAt && ` · Updated ${r.updatedAt.toLocaleString()}`}
                  </p>
                  {r.solicitationUrl && (
                    <a
                      href={r.solicitationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block max-w-xl truncate text-sm text-emerald-800 underline"
                    >
                      {r.solicitationUrl}
                    </a>
                  )}
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-700">Status</span>
                  <select
                    name="status"
                    defaultValue={r.status}
                    className="rounded border border-slate-300 px-2 py-1"
                  >
                    {KIT_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold text-slate-700">Internal notes</span>
                  <textarea
                    name="adminNotes"
                    defaultValue={r.adminNotes ?? ""}
                    rows={2}
                    maxLength={2000}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Only visible to admins"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold text-slate-700">Delivery link</span>
                  <input
                    name="deliveryUrl"
                    defaultValue={r.deliveryUrl ?? ""}
                    type="url"
                    maxLength={500}
                    className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                    placeholder="https://..."
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-3 rounded-lg bg-[#0f3d2e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0c3125]"
              >
                Save changes
              </button>
            </form>
          ))}
        </div>
      </Section>

      <Section title={`Leads (${leadRows.length})`}>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Email", "Source", "Consent", "Unsubscribed", "Created"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leadRows.length === 0 && <EmptyRow cols={5} text="Nothing here yet." />}
              {leadRows.map((l, i) => (
                <tr key={l.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-2 text-slate-700">{l.email}</td>
                  <td className="px-4 py-2 text-slate-700">{l.source}</td>
                  <td className="px-4 py-2 text-slate-700">{l.consentVersion ?? "-"}</td>
                  <td className="px-4 py-2 text-slate-700">{l.unsubscribed ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-slate-700">{l.createdAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={`Opportunity profiles (${profileRows.length})`}>
        <p className="mb-3 text-sm text-slate-600">
          Business profiles customers completed for opportunity matching. Use these to
          provide written guidance through bid kit notes or direct outreach.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Company", "NAICS", "Certifications", "State", "Keywords", "Updated"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {profileRows.length === 0 && <EmptyRow cols={6} text="Nothing here yet." />}
              {profileRows.map((p, i) => (
                <tr key={p.userId} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-2 text-slate-700">{p.companyName ?? "-"}</td>
                  <td className="px-4 py-2 text-slate-700">{p.naicsCodes ?? "-"}</td>
                  <td className="px-4 py-2 text-slate-700">{p.certifications ?? "-"}</td>
                  <td className="px-4 py-2 text-slate-700">{p.state ?? "-"}</td>
                  <td className="px-4 py-2 text-slate-700">{p.keywords ?? "-"}</td>
                  <td className="px-4 py-2 text-slate-700">{p.updatedAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={`Stripe webhook events (${eventRows.length})`}>
        <p className="mb-3 text-sm text-slate-600">
          Reconciliation log. Any event stuck in <em>received</em> or <em>failed</em> needs
          manual review.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Event", "Type", "Status", "Error", "At"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventRows.length === 0 && <EmptyRow cols={5} text="Nothing here yet." />}
              {eventRows.map((e, i) => (
                <tr key={e.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-4 py-2 font-mono text-xs text-slate-700">{e.id}</td>
                  <td className="px-4 py-2 text-slate-700">{e.type}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        e.status === "failed"
                          ? "bg-red-100 text-red-900"
                          : e.status === "processed"
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-700">{e.error ?? "-"}</td>
                  <td className="px-4 py-2 text-slate-700">{e.createdAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
