import type { Lesson } from "./types";

/**
 * Growth tier: scaling from occasional bidding to a steady, sustainable pipeline.
 * All SAM.gov procedural claims are grounded in the Sept 18, 2026 SAM.gov mechanics
 * research. Process and management advice is framed as general business practice.
 * No promises of wins, awards, revenue, or profit. No government affiliation claimed.
 */
export const GROWTH_LESSONS: Lesson[] = [
  {
    slug: "growth-right-bid-count",
    title: "How many bids is the right number for you",
    tier: "growth",
    estMinutes: 8,
    summary:
      "Find a sustainable bid volume by working from your real hours and per-bid effort, not from ambition. Includes a planning exercise to compute your number and a rule for revisiting it.",
    videoUrl: "/walkthroughs/video4-bid-volume.mp4",
    videoLabel: "Video walkthrough: choosing how many bids to place",
    blocks: [
      { type: "h2", text: "Start with capacity, not ambition" },
      {
        type: "p",
        text: "The right number of bids per month is the number you can prepare properly with the hours you actually have. Every bid costs time: reading the solicitation, checking the requirements, writing the response, reviewing the pricing, and running a final compliance sweep. A rushed proposal that you barely finish does not teach you the process, and a sloppy submission can cost you more than the hours it took. As a Growth member you have up to 10 bid kits in your 12-month term. Treat that as a ceiling, not a quota. Nobody is keeping score on how many you use.",
      },
      { type: "h2", text: "Estimate the effort of one bid" },
      {
        type: "p",
        text: "Before you pick a number, estimate what one complete bid costs you in hours. Walk through a recent or typical bid and write down the time each phase took, or would take if you have not bid yet.",
      },
      {
        type: "ul",
        items: [
          "Reading and triage: understanding the solicitation, checking your eligibility, and deciding whether to pursue it.",
          "Drafting the response: writing technical answers, past performance narratives, and completing required forms.",
          "Pricing: building your price, checking it against the requirements, and getting any internal approvals.",
          "Review and submission: a second pair of eyes, the compliance sweep, and the actual portal submission.",
        ],
      },
      {
        type: "p",
        text: "Add the numbers up. If one solid bid takes you 20 hours and you have 10 hours a week for bidding, your sustainable pace is about two bids a month. That is a planning exercise, not an industry standard. Your number will differ, and that is the point: the number has to come from your calendar, not from someone else's advice.",
      },
      { type: "h2", text: "Quality beats quantity" },
      {
        type: "p",
        text: "Five careful bids will teach you more and cost you less than fifteen rushed ones. Contracting officers evaluate what you submit, not how many solicitations you downloaded. A smaller number of well-prepared bids also protects the rest of your business, because bidding time comes out of the same week as operations, delivery, and everything else you have to keep running.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Do not chase a bid count to feel productive. Unused bid kits simply expire when your term ends. A kit you never use costs you nothing, while a bad bid costs you hours and focus.",
      },
      { type: "h2", text: "Revisit the number quarterly" },
      {
        type: "p",
        text: "Your capacity changes. You get faster at reading solicitations, you build reusable content for common sections, and you may add staff or contractors. Every quarter, redo the math with your new per-bid time and your new available hours. The goal is a pace you can hold for the full 12-month term without burning out, not a sprint that collapses in month three.",
      },
    ],
  },
  {
    slug: "growth-weekly-bid-routine",
    title: "Building a weekly bid routine",
    tier: "growth",
    estMinutes: 7,
    summary:
      "Turn bidding from an occasional scramble into a fixed weekly rhythm with four repeating sessions: search, triage, drafting, and review.",
    blocks: [
      { type: "h2", text: "Why a routine beats motivation" },
      {
        type: "p",
        text: "Bidding fails most often as a scheduling problem, not a skill problem. When finding and preparing bids competes with client work and operations for the same unstructured hours, bidding loses. A fixed weekly routine protects bidding time the way a standing meeting protects itself: it happens because it is on the calendar, not because you feel like it that day.",
      },
      { type: "h2", text: "The four sessions" },
      {
        type: "p",
        text: "Block four recurring sessions each week. They do not have to be long, but they do have to be regular.",
      },
      {
        type: "ul",
        items: [
          "Search session, 30 to 60 minutes: run your saved searches on SAM.gov, scan new postings, and check your alerts. You are collecting candidates, not deciding yet.",
          "Triage session, 30 to 45 minutes: apply your go or no-go checklist to the candidates and pick the ones worth pursuing.",
          "Drafting session, the big block, 2 to 4 hours: work the active bids, one at a time, with everything else closed.",
          "Review session, 30 minutes: check the calendar, confirm deadlines, and verify every active bid has an owner and a next step.",
        ],
      },
      { type: "h2", text: "Protect the drafting block" },
      {
        type: "p",
        text: "The drafting session is where bids get won or lost, and it is the first thing a busy week will try to steal. Treat it as immovable. If a true emergency displaces it, reschedule it the same day you cancel it, to a specific new slot. A vague plan to catch up later in the week is how bids quietly die.",
      },
      { type: "h2", text: "Batch similar work" },
      {
        type: "p",
        text: "Do all your SAM.gov scanning in the search session, not scattered across the week. Do all your proposal writing in the drafting session. Batching cuts the context-switching tax: you read solicitations once, with your bidder's eye already on, instead of re-reading the same document three separate times.",
      },
      {
        type: "callout",
        style: "info",
        text: "Put the routine in your calendar as recurring events with reminders, and share it with everyone who staffs the process. A routine nobody else knows about is a routine nobody respects.",
      },
      { type: "h2", text: "Review the routine monthly" },
      {
        type: "p",
        text: "Once a month, ask whether the routine is producing bids or just activity. If search sessions keep surfacing nothing worth pursuing, your searches need adjusting, not more hours. If drafting sessions keep getting preempted, the schedule needs defending, not redesigning.",
      },
    ],
  },
  {
    slug: "growth-staffing-roles",
    title: "Staffing the process: roles, not heroes",
    tier: "growth",
    estMinutes: 8,
    summary:
      "Split bidding work into five named roles so nothing depends on one person's memory or heroic effort, and learn when part-time help makes sense.",
    blocks: [
      { type: "h2", text: "The one-person bottleneck" },
      {
        type: "p",
        text: "In most small businesses, one person finds the opportunity, reads the solicitation, writes the proposal, checks the price, and submits the bid. That works until the second bid lands in the same week, or that person gets sick, or a deadline moves. Bidding that depends on a hero is bidding that fails the first time the hero is unavailable.",
      },
      { type: "h2", text: "The five roles" },
      {
        type: "p",
        text: "You do not need five employees. You need five jobs that are named, so it is always clear who is doing each one, even if one person wears two hats on a small bid.",
      },
      {
        type: "ul",
        items: [
          "Owner: one person accountable for the bid. They make the go or no-go call and own the calendar.",
          "Researcher: finds opportunities, pulls the solicitation and attachments, and fills in the requirements checklist.",
          "Writer: drafts the technical response and the past performance sections.",
          "Pricing lead: builds the price and sanity-checks it against the scope.",
          "Reviewer: the second pair of eyes who runs the compliance sweep before submission. The reviewer should not be the writer.",
        ],
      },
      { type: "h2", text: "When part-time help pays for itself" },
      {
        type: "p",
        text: "If writing is the bottleneck, a freelance proposal writer for drafting support can unlock bids your team cannot otherwise staff. If research eats your week, a part-time researcher or assistant running your saved searches and building the first-pass checklist is often the cheapest hour you can buy. Hire for the bottleneck role, not for a title, and start with a trial bid before committing to anything ongoing.",
      },
      {
        type: "callout",
        style: "info",
        text: "ContractReady guidance covers the process and the bid kits themselves. Pricing decisions, certifications, and the final submission are always yours. Anything involving legal or financial judgment belongs to a licensed professional, not to a checklist.",
      },
      { type: "h2", text: "Document how you work" },
      {
        type: "p",
        text: "Write down your routine and your roles on a single page: who does what, where files live, and what the review steps are. The next person you bring in reads that page instead of learning everything by shadowing you for a month. A process that lives in one person's head is not a process; it is a risk.",
      },
    ],
  },
  {
    slug: "growth-win-rate-learning",
    title: "Tracking win rates and learning from losses",
    tier: "growth",
    estMinutes: 7,
    summary:
      "Set up a simple bid log that turns every win and loss into usable information, and learn how to read what the numbers are telling you.",
    blocks: [
      { type: "h2", text: "Your bid log is your teacher" },
      {
        type: "p",
        text: "Memory lies about bidding. You will remember the painful loss and forget the three quiet no-bids that saved you weeks of wasted effort. A simple log, one row per bid, turns your history into something you can actually learn from instead of a blur of deadlines.",
      },
      { type: "h2", text: "What to record" },
      {
        type: "ul",
        items: [
          "Solicitation number, agency, and title.",
          "Go or no-go decision, and the reason in one sentence.",
          "Key dates: when you found it, when it was due, when you submitted.",
          "Hours spent, roughly. Estimates are fine; consistency matters more than precision.",
          "Result: win, loss, or no award posted.",
          "If you lost, what you know about why: price, technical score, a missed requirement, or unknown.",
        ],
      },
      {
        type: "p",
        text: "A spreadsheet is enough. The point is consistency, not software. Log every bid the week you submit it, while the details are fresh and honest.",
      },
      { type: "h2", text: "Reading your win rate honestly" },
      {
        type: "p",
        text: "Divide wins by bids submitted. That is your win rate, and it is a diagnostic tool, not a grade. A low win rate on well-chosen bids may mean your pricing or technical approach needs work. A low win rate on poorly chosen bids means your go or no-go filter needs work. The log lets you tell those two problems apart instead of guessing.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Do not read a small sample as a verdict. Ten bids is a start, not a trend. Make decisions on patterns across a full term, not on any single loss.",
      },
      { type: "h2", text: "Learn from every loss" },
      {
        type: "p",
        text: "When you lose, spend 30 minutes on three questions: did we pick the right bid, did we understand the requirements, and did our price reflect the work. If the solicitation offered a debriefing or a way to ask questions, use it; the solicitation's own process is your best source of feedback. File the answers in the log. Over a year, those notes become your most valuable bidding asset: a record of what this market actually rewards.",
      },
      {
        type: "p",
        text: "And when you win, log that too, with the same honesty. Note what you think worked. Wins teach as much as losses, if you write them down before the glow fades.",
      },
    ],
  },
  {
    slug: "growth-calendar-anatomy",
    title: "Anatomy of a working bid calendar",
    tier: "growth",
    estMinutes: 6,
    summary:
      "The entries, fields, and recurring reminders that make a bid calendar actually work, including the compliance dates most small businesses forget.",
    blocks: [
      { type: "h2", text: "What goes on the calendar" },
      {
        type: "p",
        text: "A bid calendar is not a list of due dates. It is a schedule of everything that has to happen before each due date, plus the recurring dates that keep you eligible to bid at all. If an entry has a date but no owner and no preparation steps, it is a wish, not a plan.",
      },
      { type: "h2", text: "Every bid gets a cluster of entries" },
      {
        type: "ul",
        items: [
          "The due date and exact time, with the time zone stated in the solicitation.",
          "Milestones working backward: draft complete, internal review, pricing locked, compliance sweep, submission.",
          "The owner of each milestone, by name.",
          "A buffer day before submission for portal problems and last-minute amendments.",
        ],
      },
      { type: "h2", text: "The dates everyone forgets" },
      {
        type: "p",
        text: "Put these on the calendar as recurring entries, not as things you will remember when the time comes.",
      },
      {
        type: "ul",
        items: [
          "SAM.gov registration renewal: your registration expires 365 days after it goes active, and a federal rule requires it to be active both when you submit your offer and when the award is made. Set the reminder 60 days before expiration, because renewal problems take time to fix.",
          "Certification renewals and recertifications, if you hold any set-aside certifications.",
          "Annual updates to your capability statement and business registrations.",
        ],
      },
      {
        type: "p",
        text: "A lapsed registration at the wrong moment can disqualify an otherwise strong bid. That is a calendar problem, and calendar problems are preventable.",
      },
      { type: "h2", text: "One calendar, shared" },
      {
        type: "p",
        text: "Keep one shared calendar for bidding, not three personal ones. Everyone staffing the process should see every bid's milestones. Use whatever calendar tool your team already uses; the tool matters far less than the habit of entering every date the day you learn it. If your team already lives in a project tool, mirror the key dates there too, but keep the calendar as the single source of truth for deadlines.",
      },
      {
        type: "callout",
        style: "info",
        text: "Enter dates the day you learn them. A deadline that lives only in the solicitation PDF is a deadline you will rediscover the night before it is due.",
      },
    ],
  },
  {
    slug: "growth-working-backward",
    title: "Working backward from due dates",
    tier: "growth",
    estMinutes: 7,
    summary:
      "Build a milestone schedule for each bid by planning in reverse from the deadline, with buffers that survive real-world delays.",
    blocks: [
      { type: "h2", text: "Plan in reverse" },
      {
        type: "p",
        text: "Start at the due date and walk backward. This is the only reliable way to build a bid schedule, because the deadline is the one date you cannot move. Everything else is derived from it.",
      },
      { type: "h2", text: "A sample schedule" },
      {
        type: "p",
        text: "Suppose a solicitation is due in four weeks. A reasonable reverse plan looks like this, adjusted to the size of the bid and the speed of your team.",
      },
      {
        type: "ol",
        items: [
          "Submission day: the bid goes in, with a full buffer day before it reserved for portal issues.",
          "One week before due: compliance sweep and final review complete.",
          "Two weeks before due: full draft complete, pricing locked.",
          "Three weeks before due: technical approach drafted, past performance written.",
          "Now: requirements checklist done, go decision made, owner assigned.",
        ],
      },
      {
        type: "p",
        text: "The exact spacing depends on the bid's size and your team's speed. The principle does not change: every milestone gets a date, and the dates come from the deadline, not from optimism.",
      },
      { type: "h2", text: "Build in buffers" },
      {
        type: "p",
        text: "Things slip. A key person gets sick, an amendment arrives, a pricing question takes two days instead of two hours. Put buffer time between milestones, not just before the deadline. A schedule with no slack is a schedule that fails at the first surprise, and surprises are normal in bidding. As a rule of thumb, add about twenty percent to every time estimate you make in your first year; your estimates will get sharper as your bid log grows.",
      },
      { type: "h2", text: "Short deadlines get the same treatment" },
      {
        type: "p",
        text: "When a solicitation gives you ten days, the temptation is to start writing immediately and never plan. Resist it. A 30-minute reverse plan for a short-fuse bid still beats none: it tells you by day three whether you can finish, which is exactly when you need to know.",
      },
      {
        type: "callout",
        style: "warn",
        text: "If the reverse plan shows you cannot finish properly, that is a no-bid signal, not a challenge. A bid you cannot complete is worse than no bid at all.",
      },
    ],
  },
  {
    slug: "growth-amendment-deadline-changes",
    title: "Handling amendments and deadline changes",
    tier: "growth",
    estMinutes: 6,
    summary:
      "What to do when a solicitation changes after publication: how to spot amendments, how deadline shifts ripple through your calendar, and how to re-plan without panic.",
    blocks: [
      { type: "h2", text: "Solicitations change" },
      {
        type: "p",
        text: "Agencies amend solicitations after publication: they answer bidder questions, clarify requirements, fix errors, and sometimes move the deadline. SAM.gov keeps a versioned history on each notice page showing every published update, so you can see what changed and when. Bidding against an outdated version of a solicitation is an automatic loss, which makes amendment tracking a core discipline, not a nice-to-have.",
      },
      { type: "h2", text: "When an amendment arrives" },
      {
        type: "p",
        text: "Treat every amendment as an event with a checklist, not as an email to skim.",
      },
      {
        type: "ol",
        items: [
          "Read the amendment itself, not just the summary, and note exactly what changed: requirements, dates, attachments, or published answers.",
          "Update your requirements checklist to match the new version.",
          "Check whether the due date moved. If it did, rebuild your milestone schedule from the new date.",
          "Confirm the whole team is working from the new version, and archive the old one.",
        ],
      },
      { type: "h2", text: "Deadline moves cut both ways" },
      {
        type: "p",
        text: "An extended deadline is a gift and a trap. It gives you more time, but it also tempts you to relax and lose momentum. Keep your original milestones where possible and use the extra time for review, not for starting late. A shortened deadline is a re-plan trigger: run the reverse schedule immediately and make an honest go or no-bid call the same day.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Never assume you saw every amendment. Before final submission, open the notice page one last time and confirm your copy matches the latest published version.",
      },
      { type: "h2", text: "Make it someone's job" },
      {
        type: "p",
        text: "Assign amendment-watching to a named role in your process, not to everybody. When everyone is responsible, nobody checks. The researcher or the bid owner checks the notice pages on a fixed cadence, and every check gets logged with the date. If your process involves more than one active bid, keep a simple watch log: one row per solicitation, with the latest version seen and the date it was checked, so the weekly review can verify nothing was missed.",
      },
    ],
  },
  {
    slug: "growth-weekly-calendar-review",
    title: "Weekly calendar review habits",
    tier: "growth",
    estMinutes: 5,
    summary:
      "A 30-minute weekly review that keeps every bid on track: the agenda, the questions to ask, and what to do with the answers.",
    blocks: [
      { type: "h2", text: "The 30-minute review" },
      {
        type: "p",
        text: "Once a week, the bid owner sits down with the calendar and every active bid. Thirty minutes, same time each week, no skipping. This is the cheapest risk management in your whole process, and it is the habit that separates businesses that bid steadily from businesses that bid in panics.",
      },
      { type: "h2", text: "The agenda" },
      {
        type: "checklist",
        items: [
          "Every active bid: is it on track for its next milestone, and who owns that milestone.",
          "Deadlines in the next 14 days: is the compliance sweep scheduled.",
          "Amendments: has every active solicitation been checked for updates this week.",
          "New opportunities: did triage produce any new go decisions that need calendar entries.",
          "Recurring dates: any renewals, recertifications, or capability-statement updates coming due.",
        ],
      },
      { type: "h2", text: "What the review produces" },
      {
        type: "p",
        text: "The review should end with a short list of actions, each with an owner and a date. Checking the amendment is not an action; having Mara check the amendment on the transportation solicitation by Thursday is an action. Write the actions down where the whole team can see them, and start next week's review by closing out last week's list.",
      },
      { type: "h2", text: "When the review finds trouble" },
      {
        type: "p",
        text: "Some weeks the review will surface a bid that is behind. Resist the urge to solve it inside the review meeting. Note the problem, assign one person to diagnose it, and set a deadline for the diagnosis. Most troubled bids are behind for one of three reasons: the scope was underestimated, a dependency is stuck, or the owner is overloaded. Each has a different fix, and guessing wrong wastes the week.",
      },
      { type: "h2", text: "The monthly deeper look" },
      {
        type: "p",
        text: "Once a month, zoom out beyond the individual bids. Are deadlines clustering in the same week? Is one person owning everything? Are your reverse plans consistently underestimating the drafting time? The weekly review keeps bids on track; the monthly review keeps the system honest.",
      },
      {
        type: "callout",
        style: "info",
        text: "If the review keeps surfacing the same problem, fix the system, not the people. A calendar nobody updates is a process problem. A milestone everyone misses is a planning problem.",
      },
    ],
  },
  {
    slug: "growth-watching-sam",
    title: "Watching opportunities on SAM.gov",
    tier: "growth",
    estMinutes: 8,
    summary:
      "How to monitor SAM.gov efficiently: saved searches, email alerts, and following specific opportunities, plus what stays public without a login.",
    blocks: [
      { type: "h2", text: "What you can see without logging in" },
      {
        type: "p",
        text: "Every notice page on SAM.gov is public: the title, the agency, the set-aside type, the NAICS and PSC codes, the place of performance, the published date, the due date, the full description, the contact information, and the version history. You do not need an account to read any of that. Logging in unlocks the tracking tools: saving searches, email alerts, following an opportunity, and joining the Interested Vendors List. Some attachments also require a login.",
      },
      { type: "h2", text: "Saved searches and email alerts" },
      {
        type: "p",
        text: "SAM.gov lets logged-in users save searches and receive email alerts when new notices match. Set up one saved search per line of business, using your NAICS codes and keywords, rather than one giant search that floods your inbox. An alert you start ignoring is worse than no alert at all, because it trains you to stop looking.",
      },
      {
        type: "callout",
        style: "info",
        text: "SAM.gov updates its screens periodically, so exact button labels and page layouts can change. If a step in this lesson does not match what you see, follow the on-screen labels. The concepts of saved searches and alerts are stable even when the interface moves.",
      },
      { type: "h2", text: "Follow the opportunities you pursue" },
      {
        type: "p",
        text: "For every solicitation you decide to bid, use the follow or watch feature so updates come to you instead of depending on your memory to check. The Interested Vendors List is also worth joining where available: it signals to the agency that you are a serious bidder, and it keeps you in the loop on communications tied to the opportunity.",
      },
      { type: "h2", text: "Keep a watch list outside SAM.gov too" },
      {
        type: "p",
        text: "SAM.gov is your primary source for federal prime opportunities, but it should not be your only list. Keep your own watch list, a simple document or spreadsheet, with every opportunity you are tracking: the notice link, the due date, the latest version you have seen, and the next check date. Your own list survives interface changes, and it is the list your weekly review runs from.",
      },
      {
        type: "p",
        text: "For subcontracting opportunities, the SBA's SubNet board is fully public with no login required, and primes currently list new opportunities by emailing the SBA directly. Check it on the same cadence as your SAM.gov searches if subcontracting is part of your strategy.",
      },
    ],
  },
  {
    slug: "growth-amendment-alerts",
    title: "Amendment alerts and Q and A timelines",
    tier: "growth",
    estMinutes: 7,
    summary:
      "How amendments and question-and-answer rounds unfold on a live solicitation, and how to make sure you never miss a change that affects your bid.",
    blocks: [
      { type: "h2", text: "The amendment lifecycle" },
      {
        type: "p",
        text: "After a solicitation publishes, bidders read it and find ambiguities, errors, and conflicts. They submit questions, the agency answers, and the answers sometimes change the requirements. Each round of changes is published as an amendment, and the notice page keeps a versioned history of every update. Your job is to see each one before you submit, because your bid is judged against the latest version, not the one you first downloaded.",
      },
      { type: "h2", text: "Question and answer rounds" },
      {
        type: "p",
        text: "Many solicitations include a window for bidder questions, with a cutoff date and a named point of contact. Read the solicitation for the Q and A instructions: the deadline, the format for submitting, and where answers will be posted. Ask early, because answers can take days to appear and may change your whole approach.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Never treat another bidder's question as irrelevant. An answer that changes one requirement can reshape the entire bid. Read every published Q and A round in full.",
      },
      { type: "h2", text: "Your amendment routine" },
      {
        type: "p",
        text: "For each active bid, set a checking cadence based on the deadline: weekly when the due date is far out, every few days inside the final month, daily in the final week. Log each check with the date and the latest version you saw. If email alerts are available for an opportunity you are following, turn them on, but do not rely on them alone. Verify against the notice page directly before submission, because an alert that arrives late is the same as no alert at all.",
      },
      { type: "h2", text: "When an amendment changes your bid" },
      {
        type: "p",
        text: "Some amendments are clarifications; some rewrite the work. When a change affects your technical approach or your pricing, stop and re-plan: update the requirements checklist, rework the affected sections of your draft, and confirm the deadline has not moved. A significant amendment late in the process is a legitimate reason to revisit your go decision with fresh eyes.",
      },
    ],
  },
  {
    slug: "growth-version-control",
    title: "Version control for your proposal drafts",
    tier: "growth",
    estMinutes: 6,
    summary:
      "A simple file-naming and archiving system that keeps your drafts matched to the right solicitation version, so nobody ever edits or submits the wrong copy.",
    blocks: [
      { type: "h2", text: "One master, clearly named" },
      {
        type: "p",
        text: "Every bid gets one folder, and every file in it carries the solicitation version it matches. A naming convention that includes the date, the amendment number, and your draft version looks fussy until the day it prevents a disaster. A vague label like final is not a version; it is how the wrong copy gets submitted. Make the filename answer three questions at a glance: which bid, which amendment, which draft.",
      },
      { type: "h2", text: "The archive rule" },
      {
        type: "p",
        text: "When a new amendment arrives, freeze the old draft before you touch anything. Copy the whole folder, mark it with the old amendment number, and start the new version from the frozen copy. You now have a complete record of what you planned against each version of the solicitation, which is invaluable if a debriefing or a dispute ever references an earlier requirement.",
      },
      { type: "h2", text: "One editor at a time" },
      {
        type: "p",
        text: "If two people edit the same document simultaneously, you will eventually merge the wrong paragraphs. Keep one master copy that one person edits at a time, with changes tracked or clearly marked. Reviewers comment; they do not edit the master directly. When the writer incorporates the comments, the version number goes up and the previous version is archived, not deleted.",
      },
      {
        type: "callout",
        style: "info",
        text: "Cloud storage with built-in version history gives you an automatic safety net for accidents like overwritten files or accidental deletions. It does not replace the naming convention; it backs it up.",
      },
      { type: "h2", text: "Match drafts to amendments" },
      {
        type: "p",
        text: "Before the compliance sweep, verify that the draft version matches the latest published amendment. This is a five-minute check that catches the most embarrassing failure in bidding: a polished, expensive proposal written against last month's requirements. Add it to your 48-hour checklist as a non-negotiable line item, and have the reviewer confirm it independently rather than taking the writer's word.",
      },
    ],
  },
  {
    slug: "growth-48-hour-checklist",
    title: "The 48-hour pre-deadline checklist",
    tier: "growth",
    estMinutes: 6,
    summary:
      "The final two days before submission: a compliance sweep, a portal test, and a calm sequence that gets your bid in on time and in the right shape.",
    blocks: [
      { type: "h2", text: "Two days out: the compliance sweep" },
      {
        type: "p",
        text: "Pull out the requirements checklist you built from the solicitation and walk the draft against it, line by line. Every required document, every form, every signature block, every page limit. This is not editing; it is verification. If the solicitation requires specific forms or certifications, confirm each one is present and filled in correctly.",
      },
      {
        type: "checklist",
        items: [
          "Every document the solicitation requires is in the package.",
          "Forms and certifications are complete, and signed where signatures are required.",
          "Page limits and formatting rules are respected throughout.",
          "Pricing matches the required format and covers the full scope of work.",
          "The draft reflects the latest amendment, not an earlier version.",
          "Contact information and company details are current and consistent.",
        ],
      },
      { type: "h2", text: "One day out: the portal test" },
      {
        type: "p",
        text: "Log in to the submission portal a full day early and confirm you can reach the opportunity and upload files. Portals have their own quirks: file size limits, accepted formats, and multi-step submission flows. Discovering a login problem or a rejected file type on deadline day is a preventable emergency. If the portal allows a test upload, do one, and note each step of the process for submission day.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Deadlines are enforced by the clock, not by sympathy. A bid submitted one minute late is a late bid. Aim to submit a full day early; the buffer day exists for exactly the problems you cannot foresee.",
      },
      { type: "h2", text: "Submission day" },
      {
        type: "p",
        text: "Submit early in the day, confirm the submission went through, and save the confirmation receipt where the whole team can find it. Then tell the bid owner the bid is in. Do not reopen the draft for one more improvement after submitting; most solicitations do not allow revisions after the deadline, and tinkering creates version chaos.",
      },
      {
        type: "p",
        text: "After submission, log the bid in your tracker with the date and time, and archive the final package alongside the solicitation version it matched. Then move on. The next bid is already on the calendar.",
      },
    ],
  },
  {
    slug: "growth-capability-five-sections",
    title: "The five sections every capability statement needs",
    tier: "growth",
    estMinutes: 8,
    summary:
      "The standard one-page structure that contracting officers and prime contractors expect, and exactly what belongs in each section.",
    blocks: [
      { type: "h2", text: "One page, five jobs" },
      {
        type: "p",
        text: "A capability statement is your business card for the federal market: a single page that tells a contracting officer or a prime contractor who you are, what you do, who you have done it for, and how to reach you. It is not a brochure and it is not a resume. Every section has one job, and the whole page should be readable in under two minutes.",
      },
      { type: "h2", text: "The five sections" },
      { type: "h3", text: "Core competencies" },
      {
        type: "p",
        text: "What you do, in plain language, tied to your NAICS codes. Name your services and the codes that describe them, so a reader can immediately place you in the market and see which requirements you fit.",
      },
      { type: "h3", text: "Past performance" },
      {
        type: "p",
        text: "Who you have done it for. List clients or contracts with a one-line description of the work. If you are new to federal work, commercial clients count; relevance and recency matter more than the logo on the page.",
      },
      { type: "h3", text: "Differentiators" },
      {
        type: "p",
        text: "Why you, specifically. This is the section most businesses waste on buzzwords. The next lesson fixes that.",
      },
      { type: "h3", text: "Company data" },
      {
        type: "p",
        text: "The facts a reader needs to check your eligibility: legal business name, UEI, CAGE code once you have one, NAICS codes, business size and socioeconomic status, and your point of contact details. Keep this section factual and current; it is the part people verify.",
      },
      { type: "h3", text: "Contact information" },
      {
        type: "p",
        text: "Name, title, direct phone, and email of a person who answers. A capability statement that ends at a general inbox dies there.",
      },
      {
        type: "callout",
        style: "info",
        text: "Keep it to one page. If everything is important, nothing is. A two-page capability statement is a capability statement nobody finishes.",
      },
      { type: "h2", text: "Design for scanning" },
      {
        type: "p",
        text: "Use clear headings, short bullets, and plenty of white space. The reader is comparing you against a stack of others in minutes. Make the five sections visually obvious so the eye lands where you want it, and put the most important facts where they cannot be missed.",
      },
    ],
  },
  {
    slug: "growth-differentiators",
    title: "Writing differentiators instead of buzzwords",
    tier: "growth",
    estMinutes: 6,
    summary:
      "How to replace generic claims with specific, checkable statements about what makes your business the right choice.",
    blocks: [
      { type: "h2", text: "The buzzword problem" },
      {
        type: "p",
        text: "Read ten capability statements and you will read the same words ten times: world-class, cutting-edge, customer-focused, innovative solutions. These words say nothing, because anyone can claim them and nobody can verify them. A contracting officer who has read a hundred of these pages filters buzzwords out automatically. Your differentiators have to survive that filter.",
      },
      { type: "h2", text: "The specificity test" },
      {
        type: "p",
        text: "Run every differentiator through one question: could a competitor truthfully say the same thing? If yes, it is not a differentiator. Rewrite it until the answer is no.",
      },
      {
        type: "ul",
        items: [
          "Weak: we provide high-quality IT services. Strong: we have supported the same agency help desk contract for six years with 98 percent of tickets resolved inside the service target.",
          "Weak: our team is highly experienced. Strong: our four project leads average 12 years in federal facilities maintenance.",
          "Weak: we deliver on time and on budget. Strong: across our last 14 task orders, we finished on schedule 13 times.",
          "Weak: we are a full-service contractor. Strong: we self-perform electrical and HVAC with 22 licensed technicians across three offices.",
        ],
      },
      {
        type: "p",
        text: "Notice the pattern: numbers, timeframes, and specifics a reader could check. You do not need dramatic claims. You need claims with edges.",
      },
      { type: "h2", text: "Honest differentiators for new businesses" },
      {
        type: "p",
        text: "If you are new to federal contracting, do not invent a track record. Differentiate on what is true: specialized expertise, relevant commercial experience, key personnel backgrounds, certifications you actually hold, or capacity that others lack. A founder who spent nine years supporting federal programs brings a real differentiator that requires no federal past performance at all. Specificity is free; vagueness is what costs you the reader's trust.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Never inflate past performance, certifications, or clearances. Misrepresentation in federal contracting is not a marketing problem; it is a legal one. If a claim is on your capability statement, be ready to prove it.",
      },
    ],
  },
  {
    slug: "growth-tailoring-agencies-primes",
    title: "Tailoring versions for agencies versus primes",
    tier: "growth",
    estMinutes: 7,
    summary:
      "Why one capability statement does not serve two audiences, and how to adjust yours for contracting officers and for prime contractors.",
    blocks: [
      { type: "h2", text: "Two readers, two questions" },
      {
        type: "p",
        text: "A contracting officer and a prime contractor read your capability statement with different questions in mind. The contracting officer asks: is this business eligible, capable, and a safe choice for my requirement. The prime contractor asks: can this business help me perform my contract and meet my subcontracting commitments. One page cannot answer both perfectly, so keep two versions.",
      },
      { type: "h2", text: "The agency version" },
      {
        type: "p",
        text: "Lead with eligibility and fit. Put your NAICS codes, set-aside status, and relevant past performance where they cannot be missed. Contracting officers think in requirements and compliance, so mirror that language: name the agencies or requirement types you have supported, and make your socioeconomic certifications impossible to overlook. If you hold a facility clearance or a specific credential the agency values, it belongs on the front of this version, stated plainly without exaggeration.",
      },
      { type: "h2", text: "The prime version" },
      {
        type: "p",
        text: "Lead with capacity and reliability. Primes care about whether you can staff the work, hit their schedule, and handle their compliance flow-downs. Emphasize your team size, your geographic reach, your relevant experience as a subcontractor, and a contact who picks up the phone. Mention the NAICS codes too, but the headline is dependability, not eligibility. If you can bond work at the scale the prime needs, say so plainly; bonding capacity is one of the first things a prime will ask about.",
      },
      { type: "h2", text: "Keep one source of truth" },
      {
        type: "p",
        text: "Two versions means double the maintenance, so keep a single master document with all your facts and generate both versions from it. When a fact changes, update the master once, then refresh both pages. The fastest way to embarrass yourself is handing someone an agency version that lists a certification you let lapse.",
      },
      {
        type: "callout",
        style: "info",
        text: "Bring the right version to the right meeting. Handing a prime contractor the agency version signals that you do not understand their business, and first impressions in this market are durable.",
      },
    ],
  },
  {
    slug: "growth-keeping-current",
    title: "Keeping it current as you grow",
    tier: "growth",
    estMinutes: 5,
    summary:
      "The update triggers and the annual review that keep your capability statement accurate, so it never sells work you can no longer do or hides work you now can.",
    blocks: [
      { type: "h2", text: "Stale is worse than plain" },
      {
        type: "p",
        text: "A capability statement with old past performance, a lapsed certification, or a contact who left the company does active damage. It tells the reader you do not maintain your own materials, which is exactly the impression you cannot afford in a market that runs on compliance. Accuracy is part of the product.",
      },
      { type: "h2", text: "Update triggers" },
      {
        type: "p",
        text: "Update the statement the week any of these happen, not at some later review that may never come.",
      },
      {
        type: "ul",
        items: [
          "You complete a significant contract or task order.",
          "You earn, renew, or lose a certification.",
          "Your capabilities, staffing, or service lines change.",
          "Your contact person, phone number, or email changes.",
          "Your NAICS codes or business size status change.",
        ],
      },
      { type: "h2", text: "The annual review" },
      {
        type: "p",
        text: "Once a year, read the whole page as a stranger would and ask three questions: is every claim still true, does it still describe where the business is going, and would I call this company. Replace anything that fails, and tighten anything that has gone soft. This pairs naturally with your SAM.gov renewal cycle: when you confirm your registration each year, refresh the capability statement in the same week.",
      },
      {
        type: "callout",
        style: "info",
        text: "Date-stamp the footer quietly with the month and year of the last update. It signals maintenance without shouting, and it tells you at a glance how stale any copy you find in the wild has become before you send it anywhere.",
      },
      { type: "h2", text: "Retire old copies" },
      {
        type: "p",
        text: "Every update creates an obsolete version floating around in someone's inbox. When you publish a new version, replace the file everywhere you control: your website, your shared drive, and any portal profiles. You cannot recall every copy you ever sent, but you can make sure the current one is the easiest to find. If you keep a version number or date in the filename, old copies identify themselves before they cause confusion.",
      },
    ],
  },
  {
    slug: "growth-pipeline-stages",
    title: "Pipeline stages from identified to submitted",
    tier: "growth",
    estMinutes: 7,
    summary:
      "The six stages every bid passes through, how to run them as one visible pipeline, and where ContractReady bid kits fit in.",
    blocks: [
      { type: "h2", text: "See all your bids at once" },
      {
        type: "p",
        text: "With up to ten bid kits in a term, you need a single view of every bid and where it stands. A pipeline is just that: a board or a list where each bid sits in exactly one stage, and moves forward as it progresses. A spreadsheet with one row per bid works; a simple kanban board works better visually. The tool does not matter. The single shared view does.",
      },
      { type: "h2", text: "The six stages" },
      {
        type: "ol",
        items: [
          "Identified: the opportunity is on your watch list but not yet evaluated.",
          "Evaluating: the go or no-go review is underway.",
          "Kit requested: you have requested a ContractReady bid kit for this solicitation.",
          "In progress: the kit is delivered and you are drafting the response.",
          "In review: the draft is with the reviewer for the compliance sweep.",
          "Submitted: the bid is in, confirmed, and logged.",
        ],
      },
      { type: "h2", text: "Where bid kits fit" },
      {
        type: "p",
        text: "A bid kit is an educational package for one selected solicitation: an opportunity summary, eligibility checkpoints, requirements checklists, and submission guidance built from the solicitation. It does not write your proposal, make your pricing decisions, or submit anything on your behalf. You remain responsible for reading the full official solicitation, making every final decision, and submitting the bid yourself. The kit accelerates your preparation; it never replaces your judgment.",
      },
      { type: "h2", text: "Move bids, do not just list them" },
      {
        type: "p",
        text: "A pipeline only works if bids move. In your weekly review, every bid should either advance a stage or get a dated reason why it did not. A bid that sits in progress for three weeks with no movement is a stalled bid wearing a healthy label. Either unblock it with a concrete next step and an owner for that step, or no-bid it and free the capacity.",
      },
      {
        type: "callout",
        style: "info",
        text: "Limit how many bids sit in progress at once. Three active drafts moving steadily will outperform six drafts competing for the same hours.",
      },
    ],
  },
  {
    slug: "growth-assigning-owners",
    title: "Assigning owners to every bid",
    tier: "growth",
    estMinutes: 6,
    summary:
      "Why every bid needs exactly one owner, what ownership actually means, and how to keep ten concurrent bids from collapsing into confusion.",
    blocks: [
      { type: "h2", text: "One bid, one owner" },
      {
        type: "p",
        text: "Every bid in your pipeline gets exactly one owner: a named person who is accountable for that bid reaching submission on time. Not a committee, not the team. One name. When a deadline moves or an amendment lands, everyone should know instantly whose job it is to respond.",
      },
      { type: "h2", text: "What ownership means" },
      {
        type: "p",
        text: "Ownership is not doing all the work yourself. It means four specific things.",
      },
      {
        type: "ul",
        items: [
          "The owner keeps the bid moving through the pipeline stages.",
          "The owner makes sure every milestone has someone assigned to it.",
          "The owner is the first to know about amendments, deadline changes, and problems.",
          "The owner makes the final go or no-bid recommendation when circumstances change.",
        ],
      },
      {
        type: "p",
        text: "The owner can delegate every task on that list. They cannot delegate the accountability.",
      },
      { type: "h2", text: "Cap concurrent ownership" },
      {
        type: "p",
        text: "One person can own two or three bids at once, depending on their size. Nobody can own ten. Spread ownership across the team, and watch for the quiet failure mode where the most capable person accumulates every hard bid. That is how you lose your best person and your pipeline in the same month.",
      },
      { type: "h2", text: "Handoffs between owners" },
      {
        type: "p",
        text: "Ownership sometimes has to move: someone goes on leave, or a bid turns out to need expertise someone else has. Hand it off deliberately, not by drift. The outgoing owner briefs the incoming owner on the current stage, the next milestone, and any open risks, and the pipeline card gets the new name the same day. A bid with two owners has none, so the handoff is a clean transfer, never a shared arrangement.",
      },
      { type: "h2", text: "Owners report in the weekly review" },
      {
        type: "p",
        text: "The weekly calendar review runs bid by bid, and each owner reports on theirs: current stage, next milestone, blockers. Thirty seconds per bid keeps ten bids visible in five minutes. If an owner cannot report, that is the blocker, and it gets fixed before anything else.",
      },
      {
        type: "callout",
        style: "info",
        text: "Write the owner's name on the pipeline card itself, not in a separate document. Accountability that requires a lookup does not exist under deadline pressure.",
      },
    ],
  },
  {
    slug: "growth-reusing-content",
    title: "Reusing content across proposals ethically",
    tier: "growth",
    estMinutes: 7,
    summary:
      "What you can safely reuse between bids, what must be written fresh every time, and the line between efficiency and a generic proposal.",
    blocks: [
      { type: "h2", text: "Reuse is smart, copy-paste is dangerous" },
      {
        type: "p",
        text: "By your fifth bid, you will have written your company background, your key personnel bios, and your standard processes several times. Rewriting them from scratch each time is waste. Reusing them intelligently is how experienced bidders move fast without getting sloppy. The skill is knowing what transfers between bids and what does not.",
      },
      { type: "h2", text: "Safe to reuse" },
      {
        type: "ul",
        items: [
          "Company background and history.",
          "Key personnel resumes and bios, kept current.",
          "Standard processes: quality control, safety, and project management approach.",
          "Past performance write-ups, updated with the latest results.",
          "Certifications and company data.",
        ],
      },
      {
        type: "p",
        text: "Keep these in a shared content library that the whole team can reach, and review it quarterly, so every bid pulls from the same current source instead of from someone's old laptop.",
      },
      { type: "h2", text: "Write fresh every time" },
      {
        type: "p",
        text: "The technical approach must answer this solicitation's requirements, not last month's. Pricing must reflect this scope. The executive summary must speak to this agency's stated priorities. These sections are where bids are evaluated, and evaluators can spot a generic answer immediately. A reused technical section that ignores the current statement of work is worse than a short, honest one.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Never reuse another company's content, and never share one client's confidential information in another client's proposal. Reuse your own material. Borrowing anything else is a legal and ethical line you do not cross.",
      },
      { type: "h2", text: "Tailor the seams" },
      {
        type: "p",
        text: "Even reused content needs tailoring at the edges: the agency name, the contract number, the specific requirement it maps to. Build the habit of reading every reused paragraph once against the current solicitation before it goes in. That single read is the difference between a library and a liability. Pay special attention to any paragraph that mentions dates, quantities, or places of performance, because those are the details most likely to be wrong for the new bid.",
      },
    ],
  },
  {
    slug: "growth-no-bid",
    title: "Knowing when to no-bid a kit",
    tier: "growth",
    estMinutes: 6,
    summary:
      "The no-bid criteria that protect your time, why a disciplined no-bid is a good decision, and how to record it so the kit was not wasted.",
    blocks: [
      { type: "h2", text: "No-bid is a decision, not a failure" },
      {
        type: "p",
        text: "Experienced bidders decline most of what they see. A no-bid made early, for clear reasons, saves the hours a doomed bid would have consumed and frees those hours for an opportunity you can actually win. The failure is not the no-bid. The failure is the bid you knew was wrong and submitted anyway.",
      },
      { type: "h2", text: "No-bid criteria" },
      {
        type: "p",
        text: "Write these down before you need them, and apply them the same way every time.",
      },
      {
        type: "ul",
        items: [
          "You cannot meet a mandatory requirement, no matter how the rest looks.",
          "The scope is outside what you can staff or deliver in the timeframe.",
          "The deadline cannot be met with the team you have, even planning backward honestly.",
          "The pricing cannot work: the scope costs more to deliver than the contract can bear.",
          "A late amendment fundamentally changes the work and you cannot re-plan in time.",
        ],
      },
      { type: "h2", text: "No-bid early" },
      {
        type: "p",
        text: "The value of a no-bid decays fast. A no-bid at the evaluating stage costs you an hour. A no-bid the night before the deadline costs you weeks. When the evidence points to no-bid, decide the same day and tell the team, so nobody keeps working a bid that is already dead.",
      },
      { type: "h2", text: "Log it and move on" },
      {
        type: "p",
        text: "Record the no-bid in your tracker with the reason in one sentence. Over a term, your no-bid reasons become a map of where your business actually fits: if you keep declining on staffing grounds, that is a hiring signal; if pricing keeps killing bids, that is a strategy signal. A requested bid kit that ends in a disciplined no-bid was not wasted. It bought you a clear, cheap decision.",
      },
      {
        type: "callout",
        style: "info",
        text: "Review your no-bid log quarterly alongside your win rate. The pattern of what you decline teaches you as much about your market position as the pattern of what you pursue.",
      },
    ],
  },
];
