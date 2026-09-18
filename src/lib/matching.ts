/**
 * Opportunity matching: builds a tailored SAM.gov search pack from the
 * customer's business profile. The search URL pattern below was verified
 * against live SAM.gov search result URLs (index=opp, active status filter,
 * keyword tags). We link out to SAM.gov rather than scraping it: the
 * customer runs the search in their own browser and can save it to their
 * own SAM.gov account for email alerts.
 */

export interface OpportunityProfile {
  companyName: string | null;
  naicsCodes: string | null;
  certifications: string | null;
  state: string | null;
  keywords: string | null;
  capacityNotes: string | null;
}

export interface SearchPackLink {
  label: string;
  url: string;
  hint: string;
}

function samSearchUrl(keyword: string): string {
  const params = new URLSearchParams();
  params.set("index", "opp");
  params.set("page", "1");
  params.set("pageSize", "25");
  params.set("sort", "-modifiedDate");
  params.set("sfm[status][is_active]", "true");
  params.set("sfm[simpleSearch][keywordRadio]", "ALL");
  params.set("sfm[simpleSearch][keywordTags][0][key]", keyword);
  params.set("sfm[simpleSearch][keywordTags][0][value]", keyword);
  return `https://sam.gov/search/?${params.toString()}`;
}

function splitList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** Tailored search links built from the customer's profile. */
export function buildSearchPack(profile: OpportunityProfile): SearchPackLink[] {
  const links: SearchPackLink[] = [];
  const keywords = splitList(profile.keywords).slice(0, 8);
  const naics = splitList(profile.naicsCodes).slice(0, 5);

  for (const kw of keywords) {
    links.push({
      label: `Contract opportunities matching "${kw}"`,
      url: samSearchUrl(kw),
      hint: "Active solicitations on SAM.gov, newest first. Sign in to SAM.gov to save this search and get daily email alerts.",
    });
  }

  for (const code of naics) {
    links.push({
      label: `Contract opportunities under NAICS ${code}`,
      url: samSearchUrl(code),
      hint: "Keyword search on the NAICS code. For exact NAICS filtering, use the NAICS filter on the SAM.gov results page.",
    });
  }

  links.push({
    label: "Subcontracting opportunities on SBA SUBNet",
    url: "https://www.sba.gov/",
    hint: "On sba.gov, search for SUBNet subcontracting opportunities. Prime contractors post subcontracts there; filter by your NAICS code and state. No login needed to browse.",
  });

  return links;
}

/** Plain-language summary of the profile used for admin guidance. */
export function profileSummary(profile: OpportunityProfile): string {
  const parts: string[] = [];
  if (profile.companyName) parts.push(profile.companyName);
  const naics = splitList(profile.naicsCodes);
  if (naics.length > 0) parts.push(`NAICS: ${naics.join(", ")}`);
  if (profile.certifications) parts.push(`Certifications: ${profile.certifications}`);
  if (profile.state) parts.push(`State: ${profile.state.toUpperCase()}`);
  const keywords = splitList(profile.keywords);
  if (keywords.length > 0) parts.push(`Keywords: ${keywords.join(", ")}`);
  return parts.join(" | ") || "Profile not completed yet.";
}
