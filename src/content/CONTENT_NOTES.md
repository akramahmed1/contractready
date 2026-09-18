# ContractReady Content Notes: Verification and Hedging Log

This document lists every factual claim in the ContractReady educational content that
could NOT be verified from the source of truth
(`/home/hatch/workspace/research_notes/sam-gov-mechanics-20260918/report.md`, researched
September 18, 2026), plus how each one was hedged or qualified in the copy.

Rule of thumb used throughout: verified claims are stated plainly; unverified claims are
either hedged with explicit qualifiers, attributed to the source ("SAM.gov's own guidance"),
or framed as general advice rather than procedural fact.

## 1. Claims grounded directly in the research report (stated plainly)

- SAM.gov entity registration is free.
- Registration required at BOTH offer submission AND award (FAR rule finalized Aug 7, 2025);
  continuous registration between the two points is not required.
- Validation takes up to 10 to 12 business days (IRS TIN + DLA CAGE validation).
- Renewal every 365 days.
- UEI replaced DUNS April 4, 2022; issued during SAM registration (immediate on clean
  validation, roughly 5 to 7 days for manual review).
- UEI-only path does NOT allow prime bidding.
- Set-aside program facts: 8(a) is a 9-year program with a 90-day stated decision target;
  HUBZone has a 60 calendar-day statutory decision, 35% employee residency requirement, and
  10% price preference; SDVOSB certification runs through SBA VetCert since January 2023 with
  roughly 30-day decisions; WOSB/EDWOSB has a 90-day stated decision target. (Set-aside
  program details appear only in outlines and timeline references, not as full lessons, so
  the deeper 2026 rule changes from the report were not restated as lesson content.)
- NAICS codes drive size standards under 13 CFR 121.201 and set-aside eligibility.
- Name/address mismatch with IRS records is the number one delay cause.
- Zero-to-first-bid timeline: 4 to 8 weeks without certifications, 3 to 9 months with them.
- SubNet lives at sba.gov (the old subnet.sba.gov app is retired and aliases to it), is fully
  public with no login, and self-service posting is disabled (primes email
  subcontracting@sba.gov to post).
- GSA's "you do not need to pay a third party" language for SAM.gov registration scams.

## 2. Claims NOT verifiable from the research, and how each was hedged

### SAM.gov screen-level detail
- **Claim area:** exact button labels, page names, and click sequences in the registration
  walkthrough (starter-walkthrough).
- **Hedge:** the lesson carries an explicit callout: "SAM.gov updates its screens
  periodically. The steps below follow the current registration flow, but button labels
  and page layouts can change. When in doubt, follow the on-screen labels." A closing
  callout repeats the hedge. The walkthrough is written at the step level (validate, core
  data, assertions, reps and certs, contacts, submit) rather than the click level, since
  only the step sequence is stable enough to assert.

### Login.gov sign-in
- **Claim area:** SAM.gov signs users in through Login.gov.
- **Hedge:** stated as a plain procedural step (this is long-standing public behavior of
  sam.gov), but it was not in the research report, so it is flagged here. If Login.gov
  integration ever changes, this needs updating.

### EIN issuance speed and cost
- **Claim area:** the EIN is "free and fast to obtain at irs.gov."
- **Hedge:** "free" is certain (IRS charges nothing); "fast" is deliberately vague rather
  than a specific turnaround claim.

### Manual review adding "about 5 to 7 days"
- **Claim area:** UEI issuance timing for manual review.
- **Status:** the "~5 to 7 days for manual review" figure IS in the research report, so it
  is stated plainly but kept as an approximation ("roughly 5 to 7 extra days").

### Early renewal not shortening the cycle
- **Claim area:** "early renewal does not shorten your next 365-day cycle."
- **Hedge:** this is standard SAM.gov behavior widely documented by GSA, but it was not in
  the research report, so it is flagged here as needing re-verification if GSA changes
  renewal mechanics.

### "SAM.gov sends reminders" before expiration
- **Claim area:** reminder emails ahead of the 365-day expiration.
- **Hedge:** framed with a caution ("reminders get filtered, ignored, or sent to someone
  who left the company") and the lesson's real advice is calendar reminders, which do not
  depend on the claim being true.

### Correction requests posted to the SAM.gov account
- **Claim area:** reviewers communicate needed fixes through the account; "fix it promptly
  and resubmit."
- **Hedge:** written as practical advice ("check your registration status a couple of times
  a week") rather than a precise description of GSA's notification mechanics, which were
  not in the report.

### APEX Accelerators and SBA as free help
- **Claim area:** APEX Accelerators provide free procurement technical assistance;
  apexaccelerators.us is the finder; SBA offices offer free counseling.
- **Status:** the task brief explicitly directed including these as free-help resources.
  They are long-standing public programs, but they were not verified in the research
  report. The URL apexaccelerators.us is the program's public domain; if it changes, the
  free lesson and PDF need updating.

### Set-aside program deep details
- **Claim area:** 8(a), HUBZone, SDVOSB, WOSB decision timelines and rule changes.
- **Hedge:** deliberately kept OUT of the full lessons (which focus on registration) and
  referenced only at the timeline level ("3 to 9 months with certifications"). The
  scaffolded outlines for higher tiers mention certifications as future curriculum, not as
  factual claims. The August 2026 8(a) rule change from the report was not restated because
  set-aside lessons are not yet written.

### LLC formation walkthrough
- **Claim area:** formation happens at the state Secretary of State; typical steps (name
  search, registered agent, articles of organization, EIN after formation); state fees
  "$50 to $300."
- **Hedge:** the fee range is explicitly "typically" and "depending on the state"; the
  steps are labeled "typical steps" with a note that office names and extra requirements
  (operating agreements, initial reports, publication) vary by state. The lesson carries a
  "general information, not legal advice" callout and states plainly that ContractReady
  does not file anything and state fees are paid by the customer directly to the state.

### SubNet posting mechanics
- **Claim area:** "emailing SBA to list" as a lesson title in the Bid Kit outline.
- **Status:** grounded in the report (self-service posting disabled; email
  subcontracting@sba.gov). Stated plainly in outline form.

### Bid Kit tier mechanics (outlines only)
- **Claim area:** uniform contract format sections (Section L/M), SAM.gov saved searches,
  amendment tracking, CPARS, sources-sought notices, industry days.
- **Hedge:** these appear only as lesson TITLES in scaffolded outlines, not as factual
  lesson content. Titles describe curriculum topics, not claims. Full lessons must be
  written and verified before they ship.

## 3. Standing copy rules observed

- No em dashes or en dashes anywhere in content files, outlines, or the PDF script.
  Ranges use plain hyphens (10 to 12 written out; "365-day" with a hyphen).
- SAM.gov registration is never described as costing money; every mention of cost says
  free, and third-party fees are framed as optional convenience services or scams.
- No promises of wins, awards, revenue, or profit anywhere. Registration is described as
  "the starting line, not the finish line."
- No claim of government affiliation. The PDF carries a disclosure footer; lessons
  describe ContractReady as a guidance product, never as affiliated with GSA, SBA, or any
  agency.
- ContractReady's role boundaries are explicit in the LLC bonus lesson: we do not file
  anything, do not serve as registered agent, do not collect state fees.

## 4. Items to re-verify on a schedule

- Processing times (the 10 to 12 business day figure) if GSA changes validation.
- FAR two-point rule status if further rulemaking occurs.
- Set-aside program rules before writing the Growth/Pro certification lessons.
- apexaccelerators.us and sba.gov URLs in the free lesson and PDF.
- SAM.gov screen flow before any click-level walkthrough is published.
