export type TierId = "free" | "starter" | "bidkit" | "growth" | "pro" | "allaccess";

export interface TierDef {
  id: TierId;
  name: string;
  tagline: string;
  priceCents: number;
  priceLabel: string;
  termMonths: number;
  bidKits: number;
  rank: number;
  cta: string;
  bestFor: string;
}

export const TIERS: Record<TierId, TierDef> = {
  free: {
    id: "free",
    name: "The Honest Start",
    tagline: "Do it yourself with the official free path and our preparation checklist.",
    priceCents: 0,
    priceLabel: "$0",
    termMonths: 0,
    bidKits: 0,
    rank: 0,
    cta: "Start free at SAM.gov",
    bestFor: "Business owners who want to handle everything themselves.",
  },
  starter: {
    id: "starter",
    name: "Starter",
    tagline: "A clear, step-by-step SAM.gov registration walkthrough for one business.",
    priceCents: 3999,
    priceLabel: "$39.99 one time",
    termMonths: 12,
    bidKits: 0,
    rank: 1,
    cta: "Get the Starter Pack",
    bestFor: "One business that wants a clear SAM.gov registration walkthrough.",
  },
  bidkit: {
    id: "bidkit",
    name: "Bid Kit",
    tagline: "Understand up to five live opportunities with done-for-you bid kits.",
    priceCents: 7999,
    priceLabel: "$79.99 one time",
    termMonths: 12,
    bidKits: 5,
    rank: 2,
    cta: "Get 5 Bid Kits",
    bestFor: "A new bidder that wants help understanding up to five live opportunities.",
  },
  growth: {
    id: "growth",
    name: "Growth",
    tagline: "More project coverage for the active bidder.",
    priceCents: 14900,
    priceLabel: "$149 one time",
    termMonths: 12,
    bidKits: 10,
    rank: 3,
    cta: "Get 10 Bid Kits",
    bestFor: "An active bidder that needs more project coverage.",
  },
  pro: {
    id: "pro",
    name: "Annual Pro",
    tagline: "Build a repeatable government-contracting process.",
    priceCents: 49999,
    priceLabel: "$499.99 one time",
    termMonths: 12,
    bidKits: 10,
    rank: 4,
    cta: "Choose Annual Pro",
    bestFor: "A business building a repeatable government-contracting process.",
  },
  allaccess: {
    id: "allaccess",
    name: "Two-Year All Access",
    tagline: "Bid consistently for two full years with everything included.",
    priceCents: 149900,
    priceLabel: "$1,499 one time",
    termMonths: 24,
    bidKits: 20,
    rank: 5,
    cta: "Choose All Access",
    bestFor: "A business committed to bidding consistently over two years.",
  },
};

export const PAID_TIERS: TierDef[] = ["starter", "bidkit", "growth", "pro", "allaccess"].map((id) => TIERS[id as TierId]);

/** Returns true if a purchase of `owned` unlocks content gated at `required` (higher tiers include lower tiers). */
export function tierUnlocks(owned: TierId, required: TierId): boolean {
  return TIERS[owned].rank >= TIERS[required].rank;
}

/** Highest tier wins. */
export function highestTier(tiers: TierId[]): TierId {
  return tiers.reduce<TierId>((best, t) => (TIERS[t].rank > TIERS[best].rank ? t : best), "free");
}
