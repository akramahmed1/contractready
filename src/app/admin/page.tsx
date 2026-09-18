import { currentUser } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users, purchases, leads } from "@/db/schema";

export const dynamic = "force-dynamic";

function Table({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: (string | number | null | undefined)[][];
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-2 font-semibold text-slate-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-4 text-slate-500">
                  Nothing here yet.
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-slate-700">
                      {cell == null ? "-" : String(cell)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function AdminPage() {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const user = await currentUser().catch(() => null);
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase() ?? "";

  if (!email || !adminEmails.includes(email)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Not authorized</h1>
        <p className="mt-2 text-slate-600">This area is restricted to administrators.</p>
      </div>
    );
  }

  const db = getDb();

  const userRows = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(100);
  const purchaseRows = await db
    .select()
    .from(purchases)
    .orderBy(desc(purchases.purchasedAt))
    .limit(100);
  const leadRows = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt))
    .limit(100);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Admin</h1>
      <p className="mt-1 text-slate-600">Signed in as {email}. Latest 100 records each.</p>

      <Table
        title={`Users (${userRows.length})`}
        headers={["ID", "Email", "Created"]}
        rows={userRows.map((u) => [u.id, u.email ?? "-", u.createdAt.toLocaleString()])}
      />
      <Table
        title={`Purchases (${purchaseRows.length})`}
        headers={["User", "Tier", "Amount", "Purchased", "Expires", "Refunded"]}
        rows={purchaseRows.map((p) => [
          p.userId,
          p.tier,
          `$${(p.amountCents / 100).toFixed(2)}`,
          p.purchasedAt.toLocaleString(),
          p.expiresAt.toLocaleString(),
          p.refunded ? "Yes" : "No",
        ])}
      />
      <Table
        title={`Leads (${leadRows.length})`}
        headers={["Email", "Source", "Created"]}
        rows={leadRows.map((l) => [l.email, l.source, l.createdAt.toLocaleString()])}
      />
    </div>
  );
}
