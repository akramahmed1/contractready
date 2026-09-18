import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { ReactNode } from "react";
import { getDb } from "@/lib/db";
import { bidKitRequests, leads, purchases, stripeEvents, users } from "@/db/schema";
import { getAdmin } from "@/lib/admin";

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
  const [userRows, purchaseRows, leadRows, kitRows, eventRows] = await Promise.all([
    db.select().from(users).orderBy(desc(users.createdAt)).limit(100),
    db.select().from(purchases).orderBy(desc(purchases.purchasedAt)).limit(100),
    db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100),
    db.select().from(bidKitRequests).orderBy(desc(bidKitRequests.createdAt)).limit(100),
    db.select().from(stripeEvents).orderBy(desc(stripeEvents.createdAt)).limit(50),
  ]);

  const failedEvents = eventRows.filter((e) => e.status === "failed");

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

      <Section title={`Users (${userRows.length})`}>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Email", "Role", "Created", "Change role"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userRows.length === 0 && <EmptyRow cols={4} text="Nothing here yet." />}
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
                {["User", "Tier", "Amount", "Purchased", "Expires", "Refunded", "Ack"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchaseRows.length === 0 && <EmptyRow cols={7} text="Nothing here yet." />}
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
