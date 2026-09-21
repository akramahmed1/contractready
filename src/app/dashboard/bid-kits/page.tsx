import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bidKitRequests } from "@/db/schema";
import { ensureUser } from "@/lib/access";
import { getBidKitAllowance } from "@/lib/bidkits";
import BidKitRequestForm from "@/components/dashboard/BidKitRequestForm";
import { bidKitSlaStatus, formatLongYMD } from "@/lib/sla";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  requested: "Requested",
  in_progress: "In progress",
  delivered: "Delivered",
};

export default async function BidKitsPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Please sign in</h1>
        <p className="mt-2 text-slate-600">Your bid kits live behind your account.</p>
        <Link href="/sign-in" className="mt-6 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white">
          Sign in
        </Link>
      </div>
    );
  }

  await ensureUser(userId).catch(() => undefined);
  const allowance = await getBidKitAllowance(userId);

  let history: typeof bidKitRequests.$inferSelect[] = [];
  try {
    const db = getDb();
    history = await db
      .select()
      .from(bidKitRequests)
      .where(eq(bidKitRequests.userId, userId))
      .orderBy(asc(bidKitRequests.createdAt));
  } catch {
    history = [];
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/dashboard" className="text-sm font-medium text-emerald-800 underline">
        Back to dashboard
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Bid kits</h1>
      <p className="mt-1 text-slate-600">
        Request a done-for-you bid kit for a live solicitation, and track each request below.
      </p>
      <div className="mt-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
        <h2 className="font-bold text-slate-900">How bid kits work</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-600">
          <li>Delivered within 5 business days of your request, through this dashboard. Every request shows its promised-by date below.</li>
          <li>Each kit includes a compliance checklist, document templates, and a bid/no-bid worksheet tailored to the solicitation.</li>
          <li>Tell us the solicitation due date when you request so we can prioritize time-sensitive work. If it closes before the 5-business-day promise, we will flag it as a rush.</li>
          <li>One revision round is included if the solicitation is amended before the due date.</li>
          <li>We never submit anything for you, set your pricing, or make certifications on your behalf. You review and submit everything yourself.</li>
        </ul>
      </div>

      <div className="mt-6">
        {allowance.remaining > 0 ? (
          <BidKitRequestForm remaining={allowance.remaining} />
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              {allowance.total > 0 ? "No bid kits left in this period" : "Bid kits are not on your plan"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {allowance.total > 0
                ? "You have used all the bid kits in your current plan period. Unused kits do not roll over."
                : "Bid kits come with the Bid Kit plan ($79.99 one time) and above."}
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-block rounded-lg bg-[#0f3d2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0c3125]"
            >
              See plans with bid kits
            </Link>
          </div>
        )}
      </div>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Request history</h2>
      {history.length === 0 ? (
        <p className="mt-3 text-slate-600">No requests yet. Your requests will appear here.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {history.map((r) => {
            const sla = bidKitSlaStatus(r.createdAt, r.deliveredAt ?? null, new Date());
            const dueYmd = r.solicitationDueDate ?? null;
            return (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{r.solicitationTitle}</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {STATUS_LABELS[r.status] ?? r.status}
                </span>
              </div>
              {r.solicitationUrl && (
                <a
                  href={r.solicitationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block truncate text-sm text-emerald-800 underline"
                >
                  {r.solicitationUrl}
                </a>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Requested {r.createdAt.toLocaleDateString()}
                {r.status === "delivered" && r.deliveryUrl && (
                  <>
                    {" · "}
                    <a href={r.deliveryUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-800 underline">
                      Open your bid kit
                    </a>
                  </>
                )}
              </p>
              <p className="mt-2 text-xs text-slate-600">
                {r.status === "delivered" ? (
                  <>
                    Promised by {formatLongYMD(sla.promisedBy)} ·{" "}
                    {sla.status === "met" ? (
                      <span className="font-semibold text-emerald-800">delivered within the 5-business-day promise</span>
                    ) : (
                      <span className="font-semibold text-red-800">delivered late</span>
                    )}
                  </>
                ) : (
                  <>
                    Promised by <span className="font-semibold text-slate-900">{formatLongYMD(sla.promisedBy)}</span>
                    {sla.status === "due_today" && (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-900">Due today</span>
                    )}
                    {sla.status === "overdue" && (
                      <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-900">Overdue</span>
                    )}
                  </>
                )}
              </p>
              {dueYmd && (
                <p className="mt-1 text-xs text-slate-500">
                  Solicitation closes {formatLongYMD(dueYmd)}
                </p>
              )}
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
