import type { TierId } from "@/lib/tiers";
import { TIERS, tierUnlocks } from "@/lib/tiers";

export interface TemplateDef {
  id: string;
  title: string;
  /** Minimum tier required. Higher tiers unlock lower-tier templates. */
  tier: TierId;
  summary: string;
  filename: string;
  markdown: string;
}

export const TEMPLATES: TemplateDef[] = [
  {
    id: "bid-no-bid-checklist",
    title: "Bid / No-Bid Decision Checklist",
    tier: "bidkit",
    summary:
      "A structured checklist for deciding whether an opportunity is worth pursuing, covering eligibility, capability, and winnability.",
    filename: "bid-no-bid-checklist.md",
    markdown: `# Bid / No-Bid Decision Checklist

Opportunity title: _______________________________________________
Notice ID: ______________________________________________________
Agency / Office: ________________________________________________
Response deadline: ______________________________________________
Date of this review: ____________________________________________

Answer every question honestly. A single "No" in Section 1 means no-bid.
Two or more "No" answers in Sections 2 or 3 means no-bid unless you can
fix the gap before the deadline.

## Section 1: Eligibility (all must be Yes)

- [ ] Our SAM.gov entity registration is active and will remain active through award
- [ ] We meet the NAICS code size standard for this solicitation
- [ ] We meet the set-aside requirement (or the solicitation is unrestricted and we can compete)
- [ ] We hold, or can obtain before award, every required certification, license, or clearance
- [ ] We can perform in the stated place of performance
- [ ] We are not excluded, debarred, or suspended from federal contracting

Decision on eligibility:  BID / NO-BID

## Section 2: Capability (all must be Yes)

- [ ] We have the staff, or can hire or subcontract the staff, to perform the work
- [ ] We have relevant past performance we can cite (prime or subcontractor)
- [ ] We can meet the delivery schedule as written
- [ ] We understand every technical requirement, or we know exactly what to ask during Q and A
- [ ] We can obtain any required bonding or insurance at a cost that fits the bid

Decision on capability:  BID / NO-BID

## Section 3: Winnability

- [ ] We can identify at least one genuine differentiator (not just "quality" or "experience")
- [ ] Our likely price is realistic against the incumbent or the independent estimate
- [ ] The evaluation criteria (Section M) reward something we are actually strong at
- [ ] We have enough calendar time to write a compliant, reviewed proposal before the deadline
- [ ] Bidding here does not starve a stronger opportunity of time and attention

Decision on winnability:  BID / NO-BID

## Final decision

FINAL DECISION:  BID / NO-BID

Reason in one paragraph:

___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________

Reviewed by: ______________________________  Date: ______________

## Notes

- File one completed checklist per opportunity you seriously consider. Review your
  no-bid decisions quarterly; patterns in your no-bids reveal where your business
  needs to grow.
- If you answered "No" anywhere in Section 1, stop. Eligibility problems cannot
  be fixed with a better proposal.
- ContractReady bid kits include a requirements checklist for your selected
  solicitation, but this go or no-go decision is always yours to make.
`,
  },
  {
    id: "compliance-matrix",
    title: "Solicitation Compliance Matrix",
    tier: "bidkit",
    summary:
      "A table for mapping every solicitation requirement to where your proposal answers it, so nothing required goes unanswered.",
    filename: "solicitation-compliance-matrix.md",
    markdown: `# Solicitation Compliance Matrix

Opportunity title: _______________________________________________
Notice ID: ______________________________________________________
Solicitation version / amendment number: __________________________
Date prepared: __________________________________________________

## How to use this matrix

1. Read Sections L (instructions) and M (evaluation) of the solicitation first.
2. List every "shall," "must," "will," and "required" statement as its own row.
3. For each row, note exactly where in your proposal you answer it
   (volume, section, page). If you cannot point to a location, the
   requirement is unanswered.
4. Update this matrix with every amendment. Bidding against an outdated
   version of the solicitation is an automatic loss.

## Matrix

| # | Requirement (quote or paraphrase) | Source (section / page) | Proposal location (volume, section, page) | Owner | Done |
|---|-----------------------------------|-------------------------|-------------------------------------------|-------|------|
| 1 |                                   |                         |                                           |       | [ ]  |
| 2 |                                   |                         |                                           |       | [ ]  |
| 3 |                                   |                         |                                           |       | [ ]  |
| 4 |                                   |                         |                                           |       | [ ]  |
| 5 |                                   |                         |                                           |       | [ ]  |
| 6 |                                   |                         |                                           |       | [ ]  |
| 7 |                                   |                         |                                           |       | [ ]  |
| 8 |                                   |                         |                                           |       | [ ]  |

(Add rows until every requirement is captured. Most solicitations need
20 to 60 rows. If you have fewer than 15, you probably missed the
attachments.)

## Submission requirements checklist

- [ ] Page limits observed for every volume
- [ ] File formats match the instructions (PDF version, Word version, etc.)
- [ ] Every required form is signed and dated
- [ ] Representations and certifications are current in SAM.gov
- [ ] Price volume is separate from the technical volume (when required)
- [ ] Submission method confirmed (portal, email, or physical delivery)
- [ ] Deadline confirmed with time zone: ______________ on ______________

## Pre-submission sweep

- [ ] Matrix shows every requirement answered with a proposal location
- [ ] A second person reviewed the matrix against the solicitation
- [ ] Amendments through number ______ are incorporated
- [ ] Final files open correctly and are the correct versions

Completed by: ______________________________  Date: ______________

## Notes

- The official solicitation and its amendments always control. This matrix
  is your tracking tool, not a substitute for reading the source documents.
- Keep one matrix per opportunity. Archive it after submission; it becomes
  the backbone of your debrief request if you lose.
`,
  },
  {
    id: "capability-statement",
    title: "Capability Statement Builder",
    tier: "growth",
    summary:
      "A fill-in framework for a one-page capability statement that contracting officers and prime contractors will actually read.",
    filename: "capability-statement-builder.md",
    markdown: `# Capability Statement Builder

A capability statement is one page. If it needs two pages, cut it until
it fits. Write for a reader who gives it 30 seconds.

## Section 1: Header block

Company legal name: ______________________________________________
DBA (if any): ____________________________________________________
Address: ________________________________________________________
Phone: ______________________  Website: __________________________
Primary contact name, title, email, phone:
___________________________________________________________________________
UEI: ______________________  CAGE code: __________________________
NAICS codes (list up to 5, most relevant first):
___________________________________________________________________________

## Section 2: Core competencies (3 to 5 bullets, plain language)

Rule: describe outcomes, not activities. "We manage facilities" is an
activity. "We maintain 99.2% uptime across 14 federal buildings" is a
competency. Numbers beat adjectives.

- ___________________________________________________________________________
- ___________________________________________________________________________
- ___________________________________________________________________________
- ___________________________________________________________________________

## Section 3: Differentiators (2 to 4 bullets)

Rule: a differentiator must be something a competitor cannot claim
tomorrow. Certifications, clearances, proprietary processes, and
documented performance qualify. "Dedicated team" and "commitment to
quality" do not.

- ___________________________________________________________________________
- ___________________________________________________________________________
- ___________________________________________________________________________

## Section 4: Past performance (3 to 5 entries, most relevant first)

Format per entry: Client | Contract value | Period | One-line scope |
One-line outcome. Government and prime-contractor work first.

1. ___________________________________________________________________________
2. ___________________________________________________________________________
3. ___________________________________________________________________________

## Section 5: Certifications and set-aside status

List only current, verifiable statuses (for example: 8(a), HUBZone,
SDVOSB, WOSB, small business). Do not list applications in progress as
if they were awards.

___________________________________________________________________________

## Tailoring checklist

- [ ] For an AGENCY version: lead with mission relevance and contract vehicles
- [ ] For a PRIME CONTRACTOR version: lead with the scope you can take off their plate and your past performance as a sub
- [ ] Contact information is current and answered by a human
- [ ] Reviewed and updated within the last 12 months

## Notes

- Save as a one-page PDF. Keep the source file editable so tailoring a
  version for a specific opportunity takes minutes, not hours.
- Never inflate past performance or certifications. Verification takes a
  contracting officer one search, and getting caught ends the relationship.
`,
  },
];
const MORE_TEMPLATES: TemplateDef[] = [  {
    id: "amendment-tracking-log",
    title: "Amendment Tracking Log",
    tier: "growth",
    summary:
      "A running log for solicitation amendments, Q and A rounds, and deadline changes, so your team always works from the current version.",
    filename: "amendment-tracking-log.md",
    markdown: `# Amendment Tracking Log

Opportunity title: _______________________________________________
Notice ID: ______________________________________________________
Original response deadline: ______________________________________
Current response deadline: _______________________________________

## Watch schedule

- SAM.gov opportunity page checked on: Mon / Wed / Fri (circle your days)
- Watcher (person responsible): ____________________________________
- Q and A cutoff date: ____________________________________________
- Final amendment check (48 hours before deadline): ________________

## Amendment log

| Amendment # | Date issued | What changed (summary) | Impact on our proposal | Incorporated into draft | Date |
|-------------|-------------|------------------------|------------------------|-------------------------|------|
|             |             |                        |                        | [ ]                     |      |
|             |             |                        |                        | [ ]                     |      |
|             |             |                        |                        | [ ]                     |      |
|             |             |                        |                        | [ ]                     |      |

## Q and A log

| # | Our question | Date submitted | Answer received | Changes our approach? |
|---|--------------|----------------|-----------------|-----------------------|
| 1 |              |                |                 |                       |
| 2 |              |                |                 |                       |
| 3 |              |                |                 |                       |

## Deadline change log

| Date announced | Old deadline | New deadline | Source (amendment #) |
|----------------|--------------|--------------|----------------------|
|                |              |              |                      |
|                |              |              |                      |

## 48-hour pre-deadline checklist

- [ ] Opportunity page re-checked today; no new amendments
- [ ] Compliance matrix matches the latest amendment version
- [ ] All Q and A answers incorporated
- [ ] Submission portal tested (login works, file upload works)
- [ ] Final files are the correct versions and open correctly

## Notes

- One log per opportunity. Archive it with the compliance matrix after
  submission.
- If an amendment arrives inside the final 48 hours, stop and re-read it
  completely before touching the proposal. Late amendments change
  requirements more often than they clarify them.
`,
  },
  {
    id: "bid-calendar-worksheet",
    title: "Bid Calendar Worksheet",
    tier: "growth",
    summary:
      "A worksheet for working backward from each deadline to schedule drafting, review, pricing, and submission with buffer time.",
    filename: "bid-calendar-worksheet.md",
    markdown: `# Bid Calendar Worksheet

Week of: ________________________________________________________

## Active opportunities

| Opportunity | Notice ID | Deadline (with time zone) | Days left | Stage | Owner |
|-------------|-----------|---------------------------|-----------|-------|-------|
|             |           |                           |           |       |       |
|             |           |                           |           |       |       |
|             |           |                           |           |       |       |

Stages: Identified, Qualified, Drafting, Review, Pricing, Ready to submit, Submitted.

## Backward plan for the nearest deadline

Opportunity: ________________________  Deadline: ________________________

Work backward and fill every row. If a row has no date, the plan has a hole.

| Milestone | Target date | Owner | Done |
|-----------|-------------|-------|------|
| Submission (with 24-hour buffer before the real deadline) | | | [ ] |
| Final compliance sweep against the matrix | | | [ ] |
| Price volume finalized and reviewed | | | [ ] |
| Full proposal internal review complete | | | [ ] |
| Technical volume draft complete | | | [ ] |
| Past performance and resume inputs collected | | | [ ] |
| Compliance matrix built from the solicitation | | | [ ] |
| Go / no-go decision recorded | | | [ ] |

## Weekly review (15 minutes, same time every week)

- [ ] Every active opportunity still has a current deadline (amendments checked)
- [ ] Every opportunity has an owner and a next milestone with a date
- [ ] No owner has two proposals due in the same week without backup
- [ ] No-bid decisions from last week are filed with reasons

## Notes

- The 24-hour buffer is not optional. Portals go down, files corrupt, and
  uploads stall. Submitting a day early costs nothing; submitting a minute
  late costs the bid.
- Review this calendar every week. A calendar nobody looks at is decoration.
`,
  },
  {
    id: "proposal-outline",
    title: "Proposal Outline Framework",
    tier: "pro",
    summary:
      "A volume-by-volume outline framework that maps your proposal structure to the solicitation's instructions and evaluation criteria.",
    filename: "proposal-outline-framework.md",
    markdown: `# Proposal Outline Framework

Opportunity title: _______________________________________________
Notice ID: ______________________________________________________
Page limits: Technical ______  Management ______  Price ______  Total ______

## Before you write a word

- [ ] Sections L (instructions) and M (evaluation criteria) read in full
- [ ] Compliance matrix started (every "shall" and "must" captured)
- [ ] Win themes drafted (3 or fewer; see below)
- [ ] Page budget assigned per section (see below)

## Win themes

Write at most three. A win theme is a reason to select you, stated from
the evaluator's point of view, and every section of the proposal should
reinforce at least one of them.

1. ___________________________________________________________________________
2. ___________________________________________________________________________
3. ___________________________________________________________________________

## Volume 1: Technical approach

Mirror the solicitation's structure. If Section L lists topics in an
order, use that order. Evaluators score against their checklist, not
your creativity.

| Section | Solicitation reference | Pages budgeted | Win theme(s) | Draft owner |
|---------|------------------------|----------------|--------------|-------------|
| Understanding of the requirement | | | | |
| Technical approach / methodology | | | | |
| Staffing plan and key personnel | | | | |
| Schedule and milestones | | | | |
| Risk identification and mitigation | | | | |
| Quality control plan | | | | |

## Volume 2: Management approach and past performance

| Section | Solicitation reference | Pages budgeted | Draft owner |
|---------|------------------------|----------------|-------------|
| Organization and management structure | | | |
| Relevant past performance (3 to 5 contracts) | | | |
| Subcontractor management (if any) | | | |

Past performance entry format: contract title, client, value, period,
scope in two lines, outcome in one line with numbers.

## Volume 3: Price

- [ ] Pricing matches the exact format in Section L (CLIN structure, labor categories, rates)
- [ ] Every CLIN priced; no blanks, no "TBD"
- [ ] Basis of estimate documented for each major cost element
- [ ] Price narrative explains what is included, not just the totals

## Cross-cutting rules

- Answer the requirement first, then add the win theme. Features without
  a tied requirement are filler.
- Every claim about capability points to evidence: a past contract, a
  certification, a named person, a documented process.
- No section exceeds its page budget in the first draft. Cutting later
  is harder than constraining now.

## Notes

- This framework organizes your proposal; it does not write it. The
  writing quality still decides whether the evaluator believes you.
- ContractReady does not write, rewrite, or review proposals. This
  template is an educational tool.
`,
  },
  {
    id: "past-performance-record",
    title: "Past Performance Record Sheet",
    tier: "allaccess",
    summary:
      "A structured sheet for documenting every contract's performance as it happens, so your record is ready when evaluators ask.",
    filename: "past-performance-record-sheet.md",
    markdown: `# Past Performance Record Sheet

Complete one sheet per contract, and update it quarterly while the work
is active. Memory fades; this sheet does not.

## Contract identification

Contract title: ___________________________________________________
Client / agency: __________________________________________________
Contract number: __________________________________________________
Contract value: __________________  Period: __________ to __________
Your role: Prime / Subcontractor (circle one)
If subcontractor, prime contractor: ________________________________
Contracting officer or COR name and contact:
___________________________________________________________________________
NAICS code: __________________  Set-aside type (if any): ___________

## Scope (5 lines maximum)

___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________

## Performance metrics (numbers, not adjectives)

| Metric | Target | Actual | Notes |
|--------|--------|--------|-------|
| On-time delivery | | | |
| Budget / cost control | | | |
| Quality (defect or rework rate) | | | |
| Customer satisfaction score (if measured) | | | |
| Safety incidents | | | |

## Narrative evidence (collect while it is fresh)

- Problem you solved that was not in the original scope:
  ___________________________________________________________________________
- Compliment or positive feedback received (who, when, exact words if possible):
  ___________________________________________________________________________
- Challenge overcome and how:
  ___________________________________________________________________________

## References

List people who will take a reference call, and confirm with each of
them once a year that they are still willing.

1. Name, title, organization, phone, email, relationship to the work:
   ___________________________________________________________________________
2. Name, title, organization, phone, email, relationship to the work:
   ___________________________________________________________________________

## CPARS awareness

- [ ] I know whether this contract is evaluated in CPARS
- [ ] I have reviewed my most recent CPARS evaluation (if applicable)
- [ ] Any marginal or unsatisfactory rating has a documented corrective action

## How to use this in proposals

When a solicitation asks for past performance, pull the three most
relevant sheets (relevant means similar scope, similar size, similar
client), and write each up in one paragraph: what the work was, what
you delivered, and the numbers that prove it. Attach the reference
contacts. Evaluators trust specific numbers over general claims.

## Notes

- Start these sheets now, even for commercial work. Commercial past
  performance still counts as evidence of capability while your federal
  record is being built.
- Never invent metrics. If you did not measure it, write "not measured"
  and start measuring it on the next contract.
`,
  },
];

TEMPLATES.push(...MORE_TEMPLATES);

/** All templates unlocked by a tier. Higher tiers include all lower tiers. */
export function templatesForTier(tier: TierId): TemplateDef[] {
  const rank = TIERS[tier].rank;
  return TEMPLATES.filter((t) => TIERS[t.tier].rank <= rank);
}

/** Find a single template by its id. */
export function getTemplate(id: string): TemplateDef | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
