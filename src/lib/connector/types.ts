/**
 * Shared types and the FTC-safe disclaimer for the ContractReady MCP connector (v1).
 *
 * Product rules (from repo README): never imply SAM.gov registration costs
 * money; never ask for, store, or use SAM.gov/Login.gov credentials; no
 * win/award/revenue/profit claims; no government affiliation claims.
 */

/** Canonical opportunity shape returned by the connector tools. */
export interface Opportunity {
  notice_id: string;
  title: string;
  agency: string | null;
  posted_date: string | null;
  response_deadline: string | null;
  naics: string | null;
  set_aside: string | null;
  place_of_performance: string | null;
  contract_type: string | null;
  detail_url: string | null;
  summary: string | null;
}

/** Full detail shape for get_opportunity_details. */
export interface OpportunityDetail extends Opportunity {
  office: string | null;
  notice_type: string | null;
  description: string | null;
  requirements: string | null;
  submission_method: string | null;
  contacts: string | null;
  amendments: string | null;
  category: string | null;
  source: "samgov" | "seed";
  last_verified_at: string | null;
}

/** Filters accepted by search_opportunities. */
export interface OpportunityFilters {
  keywords?: string;
  naics?: string[];
  set_aside?: string;
  state?: string;
  agency?: string;
  posted_within_days?: number;
  due_within_days?: number;
  limit?: number;
  include_expired?: boolean;
}

/**
 * Exact disclaimer attached to every tool response in v1.
 * Required by the connector spec; do not shorten or paraphrase.
 */
export const CONNECTOR_DISCLAIMER =
  "ContractReady is an independent private education and guidance service, not a government agency and not affiliated with SAM.gov. " +
  "The official solicitation and its amendments control; always read the official materials. " +
  "No registration approval, bid acceptance, award, or revenue is ever guaranteed.";

/** Tagline / description used in the Meta connectors listing. */
export const CONNECTOR_TAGLINE =
  "Find government contracts you can actually bid on, and learn how to bid, right inside Muse.";

export const CONNECTOR_DESCRIPTION =
  "ContractReady helps small businesses find live US federal, state, and subcontracting opportunities matched to what they do, track deadlines, and prepare bid-ready checklists. " +
  "We are an independent private education and guidance service. We are not a government agency and are not affiliated with SAM.gov.";
