/**
 * Guidance content for the get_guidance connector tool.
 *
 * Sources: the free SAM.gov preparation checklist (src/content/free.ts) and
 * the "Bidder Roadmap" sheet of the curated opportunities workbook.
 *
 * FTC-safe: registration is stated as free, no credential handling, no
 * win/award/revenue claims, no government affiliation. Educational guidance
 * only, not legal or certification advice.
 */

export interface GuidanceTopic {
  topic: string;
  title: string;
  body: string; // markdown
  official_links: { label: string; url: string }[];
}

const SAM_REGISTRATION = `## SAM.gov registration walkthrough (entity registration)

SAM.gov, the System for Award Management, is the federal government's official
registration database. If you want to bid on a federal contract as a prime
contractor, you need an active entity registration. No registration, no bid, no award.

**Registering is free.** The government charges nothing, and no private company can
register faster than you can on your own. If anyone asks you to pay for SAM.gov
registration, that is a sales pitch, not a requirement. Never share your Login.gov
or SAM.gov login credentials with anyone offering to "help."

### Step by step

1. Gather your documents first (see the checklist below). Most delays come from
   information that does not match official records.
2. Create a Login.gov account. SAM.gov signs you in through Login.gov, the federal
   government's single sign-on service.
3. Go to sam.gov and start an entity registration. Your entity is validated, which
   is where the waiting happens.
4. Wait for validation. Plan on up to 10 to 12 business days while your tax
   identification number is checked against IRS records and your CAGE code is assigned.
5. Complete the registration sections: core data, assertions, representations and
   certifications, and points of contact.
6. Submit and monitor your status until the registration shows as active.

### Document checklist

- Your Employer Identification Number (EIN) from the IRS (free at irs.gov)
- Your exact legal business name, exactly as it appears on your IRS paperwork
- Your physical business address, exactly as the IRS has it on file
- Banking information (account and routing numbers) for electronic funds transfer
- Your NAICS codes, the industry codes that describe what your business does
- Names, titles, and contact details for your points of contact

### Timeline expectations

- Entity validation: up to 10 to 12 business days (IRS and CAGE code check).
- Registration review after you submit: usually a few business days, longer if
  anything needs correction.
- Renewal: every 365 days. A lapsed registration means you cannot bid or be paid.
- A federal rule finalized August 7, 2025 requires your registration to be active
  at two points: when you submit your offer and when the award is made.

### Where free help exists

- APEX Accelerators: procurement technical assistance centers that help small
  businesses register in SAM.gov and pursue government contracts at no cost.
- The Small Business Administration (SBA): local offices and resource partners
  offer free counseling on government contracting basics.

Registration is paperwork, not permission. It gives you a Unique Entity ID (UEI),
validates your business, and puts you in the system agencies check before award.
It does not win you work or guarantee anyone will call you.`;

const NAICS_SELECTION = `## Choosing your NAICS codes

NAICS (North American Industry Classification System) codes describe what your
business does. You list them in your SAM.gov registration and in SBA size
determinations.

### What to do

1. List everything your business actually sells today, in plain language.
2. Look up each line at the Census Bureau's NAICS search and pick the 6-digit
   code whose description best matches the work, not the code with the biggest
   market.
3. Put your primary revenue line first. A company can be small under one NAICS
   code and not small under another, because SBA size standards differ by code
   (revenue-based for most services, employee-based for manufacturing and some
   others).
4. Check the SBA's official size standards table for each code you choose. If
   you exceed the size standard for a code, you are not a small business under
   that code and cannot claim small-business set-asides tied to it.
5. Revisit your codes yearly or when your offerings change. Wrong codes mean the
   wrong solicitations match you and the wrong size status on your bids.

### Common mistakes

- Picking a code because a specific contract uses it, even though it does not
  describe your business.
- Listing only one code when you sell in two or three distinct lines.
- Assuming "small" is a single status. It is always relative to the NAICS code
  on the solicitation.`;

const REJECTION_REASONS = `## Common SAM.gov registration rejection reasons

The number one cause of delays is your legal business name or address not
matching IRS records exactly. One missing suite number or a slightly different
spelling can bounce your validation and cost you weeks. Pull your IRS paperwork
and copy it character for character.

Other common reasons registrations get rejected or stuck:

1. **Name mismatch with the IRS.** Legal business name must match the EIN
   letter exactly, including punctuation, LLC/INC suffixes, and spacing.
2. **Address mismatch.** Physical address must match IRS records exactly.
3. **No EIN or wrong tax ID type.** Sole proprietors using an SSN face extra
   scrutiny; an EIN is cleaner and free from the IRS.
4. **Banking information errors.** Wrong routing or account numbers bounce
   the electronic funds transfer validation.
5. **Missing points of contact.** Required roles must have real people with
   reachable contact details.
6. **Notarized letter / entity administrator issues.** If SAM.gov flags your
   entity administrator, follow the official process to re-designate; do not
   pay a third party for this.
7. **Letting it lapse.** Registration must be renewed every 365 days. A lapsed
   registration means you cannot bid or be paid, and the August 7, 2025 rule
   requires active registration both at offer submission and at award.

When you get a rejection notice, read the exact field it names, fix only that
from the official source document, and resubmit. Do not retype the whole form
from memory.`;

const FIRST_BID_ROADMAP = `## Zero-to-first-bid roadmap

A practical order of operations for a person, LLC, company, or small business.
Timing varies, but the sequence does not.

1. **Choose a business structure.** Ownership, state, registered agent, tax and
   liability plan. Use your state's official business filing office.
2. **Get an EIN and business banking.** Keep legal name and address consistent
   across every record. Use official IRS and bank channels.
3. **Register the entity in SAM.gov** (free; validation can take up to 10 to 12
   business days; renew every 365 days). Do not share login credentials with
   anyone.
4. **Receive a UEI.** Issued through SAM registration. Note: a UEI-only record
   does not equal full registration for prime contracting.
5. **Select NAICS codes and check size standards.** Do this before bidding; you
   can be small under one code and not another. Use the SBA's official size
   standards.
6. **Assess certifications.** 8(a), HUBZone, WOSB, SDVOSB and similar take weeks
   to months and require ownership or control evidence. Never claim a
   certification or set-aside status you do not hold.
7. **Register on buyer portals.** Each state, county, city, authority, and prime
   contractor may use a separate vendor portal. Vendor profile, W-9, commodity
   codes, insurance, and licenses are the usual asks.
8. **Build a bid / no-bid checklist.** Capability match, past performance,
   staffing, pricing, schedule. Check the notice type: Sources Sought and RFIs
   are usually market research, not bid invitations. Read the complete official
   notice and every amendment.
9. **Submit and retain proof.** Signed forms, pricing, technical response,
   representations and certifications, attachments. Late submissions are
   commonly rejected. Use only the submission method named in the notice, and
   keep your submission receipt.

Plan 4 to 8 weeks from zero to ready-to-bid without special certifications, and
3 to 9 months if you also pursue set-aside certifications. Plan your first bids
around that calendar.`;

const SET_ASIDE_BASICS = `## Set-aside basics for small businesses

A "set-aside" is a contract reserved for a specific category of small business.
The federal government has a goal of awarding a share of contract dollars to
small businesses, and set-asides are the main mechanism.

### The main categories

- **Total Small Business set-aside.** Reserved for small businesses generally.
  You must qualify as small under the solicitation's NAICS code size standard.
- **8(a).** SBA's business development program for socially and economically
  disadvantaged businesses. Requires SBA certification and a multi-year program
  term; application takes months.
- **HUBZone.** For businesses in Historically Underutilized Business Zones that
  meet employee residency requirements. Requires SBA certification.
- **SDVOSB (Service-Disabled Veteran-Owned Small Business).** Requires the
  service-disabled veteran to own and control the business. SBA certification
  is now required (self-certification ended).
- **WOSB / EDWOSB (Women-Owned / Economically Disadvantaged Women-Owned).**
  Requires SBA certification through an approved third-party certifier or the
  SBA.
- **ISBEE.** Indian Small Business Economic Enterprise, used by some agencies
  such as Indian Health Service.

### Rules that matter

- Never claim a certification or set-aside status you do not hold. Misrepresentation
  can end in debarment and criminal referral.
- Certification applications take weeks to months. Start early and bid unrestricted
  or Total Small Business set-asides while you wait.
- Size status is per-NAICS. Winning a set-aside under one code does not make you
  small under another.
- Read the set-aside language in each solicitation. "Total Small Business
  Set-Aside (FAR 19.5)" is different from an 8(a) sole-source, which is different
  from a HUBZone competition.`;

const TOPICS: Record<string, GuidanceTopic> = {
  "sam-registration": {
    topic: "sam-registration",
    title: "SAM.gov registration walkthrough",
    body: SAM_REGISTRATION,
    official_links: [
      { label: "SAM.gov", url: "https://sam.gov" },
      { label: "APEX Accelerators (free help)", url: "https://apexaccelerators.us" },
      { label: "SBA", url: "https://www.sba.gov" },
      { label: "IRS: apply for an EIN", url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" },
    ],
  },
  "naics-selection": {
    topic: "naics-selection",
    title: "Choosing your NAICS codes",
    body: NAICS_SELECTION,
    official_links: [
      { label: "NAICS search (Census)", url: "https://www.census.gov/naics" },
      { label: "SBA size standards", url: "https://www.sba.gov/document/support-table-size-standards" },
    ],
  },
  "rejection-reasons": {
    topic: "rejection-reasons",
    title: "Common SAM.gov registration rejection reasons",
    body: REJECTION_REASONS,
    official_links: [
      { label: "SAM.gov", url: "https://sam.gov" },
      { label: "SAM.gov help", url: "https://www.fsd.gov" },
    ],
  },
  "first-bid-roadmap": {
    topic: "first-bid-roadmap",
    title: "Zero-to-first-bid roadmap",
    body: FIRST_BID_ROADMAP,
    official_links: [
      { label: "SAM.gov", url: "https://sam.gov" },
      { label: "SBA contracting guide", url: "https://www.sba.gov/federal-contracting" },
      { label: "APEX Accelerators (free help)", url: "https://apexaccelerators.us" },
    ],
  },
  "set-aside-basics": {
    topic: "set-aside-basics",
    title: "Set-aside basics for small businesses",
    body: SET_ASIDE_BASICS,
    official_links: [
      { label: "SBA contracting guide", url: "https://www.sba.gov/federal-contracting" },
      { label: "SBA 8(a) program", url: "https://www.sba.gov/federal-contracting/contracting-assistance-programs/sba-8a-business-development-program" },
      { label: "SBA HUBZone program", url: "https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program" },
    ],
  },
};

export function listGuidanceTopics(): string[] {
  return Object.keys(TOPICS);
}

export function getGuidance(topic: string): GuidanceTopic | null {
  return TOPICS[topic] ?? null;
}
