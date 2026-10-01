/**
 * SAM.gov Contract Opportunities API client.
 *
 * GET https://api.sam.gov/opportunities/v2/search
 *
 * Configured but keyless: there is no SAMGOV_API_KEY yet, so
 * `isConfigured()` returns false and the data layer serves the curated seed
 * dataset instead. When a key is added to the Railway service env, this
 * client is used directly with no code changes.
 *
 * Public API docs: https://open.gsa.gov/api/get-opportunities-public-api/
 */
import type { OpportunityDetail } from "./types";

const SEARCH_URL = "https://api.sam.gov/opportunities/v2/search";

/** True when a SAM.gov API key is present in the environment. */
export function isConfigured(): boolean {
  return Boolean(process.env.SAMGOV_API_KEY && process.env.SAMGOV_API_KEY.trim().length > 0);
}

interface SamOpp {
  noticeId?: string;
  title?: string;
  department?: string;
  subTier?: string;
  office?: string;
  postedDate?: string;
  responseDeadLine?: string;
  naicsCode?: string;
  typeOfSetAsideDescription?: string;
  typeOfSetAside?: string;
  type?: { value?: string; description?: string };
  placeOfPerformance?: {
    city?: { name?: string };
    state?: { code?: string; name?: string };
    zip?: string;
    country?: { name?: string };
  };
  uiLink?: string;
  description?: string;
  pointOfContact?: Array<{ fullName?: string; email?: string; phone?: string; title?: string; type?: string }>;
  additionalInfoLink?: string;
}

function pop(place?: SamOpp["placeOfPerformance"]): string | null {
  if (!place) return null;
  const bits = [place.city?.name, place.state?.code || place.state?.name, place.zip].filter(Boolean);
  return bits.length ? bits.join(", ") : null;
}

function detailUrl(o: SamOpp): string | null {
  if (o.uiLink) return o.uiLink;
  if (o.noticeId) return `https://sam.gov/opp/${o.noticeId}/view`;
  return null;
}

function mapOpp(o: SamOpp, source: "samgov"): OpportunityDetail {
  return {
    notice_id: o.noticeId ?? "",
    title: o.title ?? "",
    agency: o.department ?? o.subTier ?? null,
    office: o.office ?? null,
    notice_type: o.type?.description ?? o.type?.value ?? null,
    posted_date: o.postedDate ? o.postedDate.slice(0, 10) : null,
    response_deadline: o.responseDeadLine ? o.responseDeadLine.slice(0, 10) : null,
    naics: o.naicsCode ?? null,
    set_aside: o.typeOfSetAsideDescription ?? o.typeOfSetAside ?? null,
    place_of_performance: pop(o.placeOfPerformance),
    contract_type: null,
    detail_url: detailUrl(o),
    summary: o.description ? o.description.slice(0, 600) : null,
    description: o.description ?? null,
    requirements: null,
    submission_method: null,
    contacts: (o.pointOfContact ?? [])
      .map((p) => [p.fullName, p.title, p.email, p.phone].filter(Boolean).join(" "))
      .join("; ") || null,
    amendments: null,
    category: null,
    source,
    last_verified_at: new Date().toISOString(),
  };
}

export interface SamSearchParams {
  keywords?: string;
  naics?: string[];
  set_aside?: string;
  state?: string;
  posted_within_days?: number;
  limit?: number;
}

async function samFetch(params: Record<string, string>): Promise<{ opportunitiesData?: SamOpp[]; totalRecords?: number }> {
  const apiKey = process.env.SAMGOV_API_KEY!.trim();
  const qs = new URLSearchParams({ api_key: apiKey, ...params });
  const res = await fetch(`${SEARCH_URL}?${qs.toString()}`, {
    headers: { Accept: "application/json" },
    // SAM.gov search is read-only public data; keep the call short.
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    throw new Error(`SAM.gov API error: ${res.status}`);
  }
  return (await res.json()) as { opportunitiesData?: SamOpp[]; totalRecords?: number };
}

/** Search live SAM.gov opportunities. Only called when isConfigured() is true. */
export async function samgovSearch(p: SamSearchParams): Promise<OpportunityDetail[]> {
  const params: Record<string, string> = {
    limit: String(Math.min(Math.max(p.limit ?? 10, 1), 50)),
    ptype: "p,s,r,o", // solicitation + combined synopsis + sources sought + RFI
    active: "true",
  };
  if (p.keywords) params.title = p.keywords;
  if (p.naics && p.naics.length) params.ncode = p.naics.join(",");
  if (p.state) params.state = p.state;
  if (p.posted_within_days) {
    const from = new Date(Date.now() - p.posted_within_days * 86400000).toISOString().slice(0, 10);
    params.postedFrom = from;
    params.postedTo = new Date().toISOString().slice(0, 10);
  }
  const data = await samFetch(params);
  let opps = (data.opportunitiesData ?? []).map((o) => mapOpp(o, "samgov"));
  if (p.set_aside) {
    const needle = p.set_aside.toLowerCase();
    opps = opps.filter((o) => (o.set_aside ?? "").toLowerCase().includes(needle));
  }
  return opps;
}

/** Fetch full detail for one notice from SAM.gov by noticeId. */
export async function samgovGetDetail(noticeId: string): Promise<OpportunityDetail | null> {
  const data = await samFetch({ noticeid: noticeId, limit: "1", active: "true" });
  const hit = (data.opportunitiesData ?? [])[0];
  return hit ? mapOpp(hit, "samgov") : null;
}
