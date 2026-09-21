import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bidKitRequests } from "@/db/schema";
import { getActivePurchases } from "@/lib/access";
import { TIERS, type TierId } from "@/lib/tiers";

export interface KitAllocation {
  purchaseId: number;
  tier: TierId;
  tierName: string;
  windowStart: Date;
  windowEnd: Date;
  kits: number;
  used: number;
  remaining: number;
}

export interface BidKitAllowance {
  allocations: KitAllocation[];
  total: number;
  used: number;
  remaining: number;
}

function addMonths(d: Date, months: number): Date {
  const out = new Date(d);
  out.setMonth(out.getMonth() + months);
  return out;
}

/**
 * Term-based bid-kit allowance.
 *
 * Each active (non-refunded, non-expired) purchase contributes its own kit
 * allocation for its own term window [purchasedAt, expiresAt]. The Two-Year
 * All Access plan is split into two 12-month allocations of 10 kits each to
 * enforce the "max 10 per 12-month period" rule.
 *
 * Requests are attributed greedily to the earliest-ending allocation whose
 * window contains the request, so one request never consumes two allocations.
 */
export async function getBidKitAllowance(userId: string): Promise<BidKitAllowance> {
  const empty: BidKitAllowance = { allocations: [], total: 0, used: 0, remaining: 0 };
  let active;
  try {
    active = await getActivePurchases(userId);
  } catch {
    return empty; // fail closed: no kits when the DB is unreachable
  }

  const allocations: KitAllocation[] = [];
  for (const p of active) {
    const kits = TIERS[p.tier as TierId]?.bidKits ?? 0;
    if (kits <= 0) continue;
    if (p.tier === "allaccess") {
      const mid = addMonths(p.purchasedAt, 12);
      const perPeriod = Math.min(10, kits);
      allocations.push({
        purchaseId: p.id,
        tier: p.tier,
        tierName: TIERS[p.tier as TierId].name,
        windowStart: p.purchasedAt,
        windowEnd: mid < p.expiresAt ? mid : p.expiresAt,
        kits: perPeriod,
        used: 0,
        remaining: perPeriod,
      });
      allocations.push({
        purchaseId: p.id,
        tier: p.tier,
        tierName: TIERS[p.tier as TierId].name,
        windowStart: mid,
        windowEnd: p.expiresAt,
        kits: kits - perPeriod,
        used: 0,
        remaining: kits - perPeriod,
      });
    } else {
      allocations.push({
        purchaseId: p.id,
        tier: p.tier,
        tierName: TIERS[p.tier as TierId].name,
        windowStart: p.purchasedAt,
        windowEnd: p.expiresAt,
        kits,
        used: 0,
        remaining: kits,
      });
    }
  }

  if (allocations.length === 0) return empty;

  allocations.sort((a, b) => a.windowEnd.getTime() - b.windowEnd.getTime());

  let requests: { createdAt: Date }[] = [];
  try {
    const db = getDb();
    requests = await db
      .select({ createdAt: bidKitRequests.createdAt })
      .from(bidKitRequests)
      .where(eq(bidKitRequests.userId, userId))
      .orderBy(asc(bidKitRequests.createdAt));
  } catch {
    return empty;
  }

  for (const r of requests) {
    const t = r.createdAt.getTime();
    const slot = allocations.find(
      (a) => a.remaining > 0 && t >= a.windowStart.getTime() && t < a.windowEnd.getTime()
    );
    if (slot) {
      slot.used += 1;
      slot.remaining -= 1;
    }
    // Requests outside every active window (e.g. from an expired term) do not
    // consume current-term kits.
  }

  const total = allocations.reduce((s, a) => s + a.kits, 0);
  const used = allocations.reduce((s, a) => s + a.used, 0);
  return { allocations, total, used, remaining: total - used };
}

const TITLE_MAX = 200;
const URL_MAX = 500;

/**
 * Strict validation for bid-kit request input. Returns the normalized values
 * or an error message safe to show the user. The solicitation due date is
 * optional; when present it must be a real YYYY-MM-DD calendar date.
 */
export function validateBidKitInput(
  title: unknown,
  url: unknown,
  dueDate: unknown
): { title: string; url: string | null; dueDate: string | null } | { error: string } {
  const t = typeof title === "string" ? title.trim() : "";
  if (!t) return { error: "Please enter the solicitation title." };
  if (t.length > TITLE_MAX) {
    return { error: `Please keep the solicitation title under ${TITLE_MAX} characters.` };
  }
  let normalizedDue: string | null = null;
  const rawDue = typeof dueDate === "string" ? dueDate.trim() : "";
  if (rawDue) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(rawDue)) {
      return { error: "That due date does not look like a real calendar date." };
    }
    const [y, m, d] = rawDue.split("-").map(Number);
    const probe = new Date(Date.UTC(y, m - 1, d));
    if (
      probe.getUTCFullYear() !== y ||
      probe.getUTCMonth() + 1 !== m ||
      probe.getUTCDate() !== d
    ) {
      return { error: "That due date does not look like a real calendar date." };
    }
    normalizedDue = rawDue;
  }
  const rawUrl = typeof url === "string" ? url.trim() : "";
  if (!rawUrl) return { title: t, url: null, dueDate: normalizedDue };
  if (rawUrl.length > URL_MAX) {
    return { error: "That link is too long. Please use a shorter URL." };
  }
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { error: "That does not look like a valid link. It should start with http:// or https://." };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { error: "Links must start with http:// or https://." };
  }
  return { title: t, url: parsed.toString(), dueDate: normalizedDue };
}
