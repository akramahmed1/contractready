/**
 * Connector data layer for opportunity tools.
 *
 * Priority: live SAM.gov API when SAMGOV_API_KEY is configured, otherwise the
 * curated seed dataset. Stale items (response_deadline in the past) are
 * dropped unless the caller explicitly asks for history via include_expired.
 */
import { isConfigured, samgovSearch, samgovGetDetail } from "./samgov";
import { SEED_OPPORTUNITIES, type SeedOpportunity } from "./seed-opportunities";
import type { Opportunity, OpportunityDetail, OpportunityFilters } from "./types";

function seedToDetail(s: SeedOpportunity): OpportunityDetail {
  return {
    notice_id: s.notice_id,
    title: s.title,
    agency: s.agency,
    office: s.office,
    notice_type: s.notice_type,
    posted_date: s.posted_date,
    response_deadline: s.response_deadline,
    naics: s.naics,
    set_aside: s.set_aside,
    place_of_performance: s.place_of_performance,
    contract_type: s.contract_type,
    detail_url: s.detail_url,
    summary: s.summary,
    description: s.description,
    requirements: s.requirements,
    submission_method: s.submission_method,
    contacts: s.contacts,
    amendments: null,
    category: s.category,
    source: "seed",
    last_verified_at: s.last_verified_at,
  };
}

const todayIso = () => new Date().toISOString().slice(0, 10);

function isStale(o: OpportunityDetail, today: string): boolean {
  return Boolean(o.response_deadline && o.response_deadline < today);
}

function normalize(s: string): string {
  return s.toLowerCase();
}

/** Normalize a state filter to a 2-letter code for comparison. */
const STATE_NAMES: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA", kansas: "KS",
  kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD", massachusetts: "MA",
  michigan: "MI", minnesota: "MN", mississippi: "MS", missouri: "MO", montana: "MT",
  nebraska: "NE", nevada: "NV", "new hampshire": "NH", "new jersey": "NJ",
  "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND",
  ohio: "OH", oklahoma: "OK", oregon: "OR", pennsylvania: "PA", "rhode island": "RI",
  "south carolina": "SC", "south dakota": "SD", tennessee: "TN", texas: "TX",
  utah: "UT", vermont: "VT", virginia: "VA", washington: "WA",
  "west virginia": "WV", wisconsin: "WI", wyoming: "WY",
  "district of columbia": "DC", "puerto rico": "PR",
};

function matchesState(o: OpportunityDetail, state: string): boolean {
  const code = state.toUpperCase();
  const hay = [o.place_of_performance ?? "", o.title ?? "", o.agency ?? ""].join(" ");
  const hn = normalize(hay);
  if (hn.includes(code.toLowerCase()) && new RegExp(`\\b${code}\\b`, "i").test(hay)) return true;
  for (const [name, c] of Object.entries(STATE_NAMES)) {
    if (c === code && hn.includes(name)) return true;
  }
  return false;
}

function applyFilters(all: OpportunityDetail[], f: OpportunityFilters): OpportunityDetail[] {
  const today = todayIso();
  let list = all;
  if (!f.include_expired) list = list.filter((o) => !isStale(o, today));
  if (f.keywords) {
    const words = normalize(f.keywords).split(/\s+/).filter(Boolean);
    list = list.filter((o) => {
      const hay = normalize([o.title, o.summary, o.description, o.agency, o.category].join(" "));
      return words.every((w) => hay.includes(w));
    });
  }
  if (f.naics && f.naics.length) {
    const set = new Set(f.naics.map((n) => n.trim()));
    list = list.filter((o) => o.naics && set.has(o.naics));
  }
  if (f.set_aside) {
    const needle = normalize(f.set_aside);
    list = list.filter((o) => o.set_aside && normalize(o.set_aside).includes(needle));
  }
  if (f.state) list = list.filter((o) => matchesState(o, f.state!));
  if (f.agency) {
    const needle = normalize(f.agency);
    list = list.filter((o) => o.agency && normalize(o.agency).includes(needle));
  }
  if (f.posted_within_days && f.posted_within_days > 0) {
    const cutoff = new Date(Date.now() - f.posted_within_days * 86400000).toISOString().slice(0, 10);
    list = list.filter((o) => o.posted_date && o.posted_date >= cutoff);
  }
  if (f.due_within_days && f.due_within_days > 0) {
    const cutoff = new Date(Date.now() + f.due_within_days * 86400000).toISOString().slice(0, 10);
    list = list.filter((o) => o.response_deadline && o.response_deadline <= cutoff && o.response_deadline >= today);
  }
  // Soonest deadline first; undated items last.
  list.sort((a, b) => (a.response_deadline ?? "9999") < (b.response_deadline ?? "9999") ? -1 : 1);
  const limit = Math.min(Math.max(f.limit ?? 10, 1), 50);
  return list.slice(0, limit);
}

function toSummary(o: OpportunityDetail): Opportunity {
  const { notice_id, title, agency, posted_date, response_deadline, naics, set_aside,
    place_of_performance, contract_type, detail_url, summary } = o;
  return { notice_id, title, agency, posted_date, response_deadline, naics, set_aside,
    place_of_performance, contract_type, detail_url, summary };
}

/** Which upstream served this request: live API or seed fallback. */
export function dataSource(): "samgov" | "seed" {
  return isConfigured() ? "samgov" : "seed";
}

export async function searchOpportunities(f: OpportunityFilters): Promise<{ source: "samgov" | "seed"; results: Opportunity[] }> {
  const source = dataSource();
  if (source === "samgov") {
    try {
      const live = await samgovSearch({
        keywords: f.keywords,
        naics: f.naics,
        set_aside: f.set_aside,
        state: f.state,
        posted_within_days: f.posted_within_days,
        limit: f.limit,
      });
      // Apply the remaining filters (agency text, due_within_days, staleness)
      // uniformly on top of live results.
      const filtered = applyFilters(live, { ...f, naics: undefined, set_aside: undefined, keywords: undefined, posted_within_days: undefined, state: undefined });
      return { source, results: filtered.map(toSummary) };
    } catch (err) {
      console.error("[connector] SAM.gov search failed, falling back to seed:", err);
      // fall through to seed
    }
  }
  const seed = SEED_OPPORTUNITIES.map(seedToDetail);
  return { source: "seed", results: applyFilters(seed, f).map(toSummary) };
}

export async function getOpportunityDetail(noticeId: string): Promise<{ source: "samgov" | "seed"; detail: OpportunityDetail | null }> {
  if (dataSource() === "samgov") {
    try {
      const hit = await samgovGetDetail(noticeId);
      if (hit) return { source: "samgov", detail: hit };
    } catch (err) {
      console.error("[connector] SAM.gov detail failed, falling back to seed:", err);
    }
  }
  const seed = SEED_OPPORTUNITIES.find((s) => s.notice_id === noticeId);
  return { source: "seed", detail: seed ? seedToDetail(seed) : null };
}
