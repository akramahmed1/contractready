import type { TierOutline } from "./types";

/**
 * Scaffolded outlines for paid tiers above Starter.
 * These describe planned curriculum structure; lesson content is written later.
 */
export const TIER_OUTLINES: TierOutline[] = [
  {
    tier: "bidkit",
    status: "scaffolded",
    modules: [
      {
        title: "How Bid Kits Work",
        objective:
          "Understand exactly what a ContractReady bid kit contains and how to use it on a live opportunity.",
        opener:
          "A bid kit turns a confusing solicitation into a plain-language action plan. This module walks through the anatomy of a kit: the opportunity summary, the requirements checklist, the compliance matrix, and the submission timeline. By the end you will know how to read any kit we build for you and spot the parts that need your input.",
        lessons: [
          "Anatomy of a bid kit",
          "Reading the opportunity summary",
          "Using the compliance matrix",
          "What the kit cannot do for you",
        ],
      },
      {
        title: "Reading a Solicitation",
        objective:
          "Learn to read a federal solicitation's structure and find the sections that determine whether you should bid.",
        opener:
          "Solicitations look intimidating because they are long, not because they are complicated. Every federal solicitation follows the same uniform structure, and only a handful of sections decide whether the opportunity fits you. This module teaches you to navigate that structure and read with a bidder's eye.",
        lessons: [
          "The uniform contract format, section by section",
          "Section L and Section M: instructions and evaluation",
          "Finding the real requirements buried in attachments",
          "Amendments: how to track changes without missing one",
        ],
      },
      {
        title: "The Go or No-Go Decision",
        objective:
          "Build a disciplined requirements checklist so you only bid on work you can actually win and perform.",
        opener:
          "Most new bidders lose money bidding on the wrong opportunities, not by writing bad proposals. A go or no-go checklist forces an honest answer to three questions: are we eligible, can we perform, and can we win. This module gives you the checklist and shows you how to use it in under an hour per opportunity.",
        lessons: [
          "Eligibility: set-asides, clearances, and certifications",
          "Capability: staffing, past performance, and capacity",
          "Winnability: competition, incumbents, and price realism",
          "Documenting your decision",
        ],
      },
      {
        title: "Submission Mechanics",
        objective:
          "Submit a compliant offer without tripping on formatting, deadlines, or portal errors.",
        opener:
          "Good proposals get thrown out for bad submissions every week: wrong file format, missed deadline by minutes, unsigned forms. Submission mechanics are boring and decisive. This module covers the practical details of getting your offer in on time and in the right shape.",
        lessons: [
          "Deadlines, time zones, and late-submission rules",
          "Common submission portals and how they differ",
          "Formatting and file requirements",
          "The pre-submission compliance sweep",
        ],
      },
      {
        title: "Subcontracting Opportunities via SubNet",
        objective:
          "Find and pursue subcontracting work through the SBA's public SubNet board.",
        opener:
          "You do not have to win a prime contract to work on federal projects. Prime contractors post subcontracting opportunities on the SBA's SubNet board, which is fully public and free to browse. This module shows you how to search it, read a posting, and approach a prime contractor professionally.",
        lessons: [
          "What SubNet is and how to search it",
          "Reading a subcontract posting: scope, dates, and contacts",
          "How posting works today: emailing SBA to list",
          "Pitching yourself to a prime contractor",
        ],
      },
    ],
  },
  {
    tier: "growth",
    status: "scaffolded",
    modules: [
      {
        title: "Scaling Your Bid Volume",
        objective:
          "Move from occasional bidding to a steady, sustainable pipeline of opportunities.",
        opener:
          "One bid a quarter is a hobby; a steady flow of qualified bids is a business development function. Scaling volume is not about bidding on everything. It is about building a repeatable process for finding, qualifying, and submitting that your team can run every week without burning out.",
        lessons: [
          "How many bids is the right number for you",
          "Building a weekly bid routine",
          "Staffing the process: roles, not heroes",
          "Tracking win rates and learning from losses",
        ],
      },
      {
        title: "The Bid Calendar",
        objective:
          "Build and maintain a calendar that keeps every deadline visible and nothing slipping.",
        opener:
          "Missed deadlines are the most preventable cause of lost bids. A bid calendar is more than a list of due dates: it works backward from each deadline to schedule drafting, review, pricing, and submission with buffer time. This module shows you how to build one and keep it honest.",
        lessons: [
          "Anatomy of a working bid calendar",
          "Working backward from due dates",
          "Handling amendments and deadline changes",
          "Weekly calendar review habits",
        ],
      },
      {
        title: "Tracking Deadlines and Amendments",
        objective:
          "Set up a tracking system so amendments, Q and A rounds, and deadline shifts never catch you off guard.",
        opener:
          "Solicitations change after publication. Amendments add requirements, answer questions, and move deadlines, and bidding against an outdated version is an automatic loss. This module covers simple tracking habits and tools that keep your team working from the current version of every solicitation.",
        lessons: [
          "Watching opportunities on SAM.gov",
          "Amendment alerts and Q and A timelines",
          "Version control for your proposal drafts",
          "The 48-hour pre-deadline checklist",
        ],
      },
      {
        title: "Capability Statements That Get Read",
        objective:
          "Write a one-page capability statement that makes a contracting officer or prime contractor want to call you.",
        opener:
          "Your capability statement is your business card for the federal market: one page that says who you are, what you do, who you have done it for, and how to reach you. Most are forgettable. This module breaks down the structure that works and the mistakes that get yours filed away.",
        lessons: [
          "The five sections every capability statement needs",
          "Writing differentiators instead of buzzwords",
          "Tailoring versions for agencies versus primes",
          "Keeping it current as you grow",
        ],
      },
      {
        title: "Managing Ten Bid Kits at Once",
        objective:
          "Run multiple concurrent bids without dropping details or burning out your team.",
        opener:
          "Growth tier members get ten bid kits, which means ten live opportunities in flight. That is a coordination problem, not ten separate problems. This module covers pipeline views, status tracking, and the weekly cadence that keeps every bid moving toward its deadline.",
        lessons: [
          "Pipeline stages from identified to submitted",
          "Assigning owners to every bid",
          "Reusing content across proposals ethically",
          "Knowing when to no-bid a kit",
        ],
      },
    ],
  },
  {
    tier: "pro",
    status: "scaffolded",
    modules: [
      {
        title: "Your Project-Finding System",
        objective:
          "Build a repeatable system for finding relevant opportunities across SAM.gov and state portals.",
        opener:
          "Winners do not stumble onto opportunities; they run a system that surfaces the right ones every week. This module shows you how to set up saved searches on SAM.gov, monitor state and local portals, and organize what you find so nothing good slips past.",
        lessons: [
          "SAM.gov saved searches and email alerts",
          "State and local procurement portals worth watching",
          "Organizing your opportunity feed",
          "Weekly triage: from fifty leads to five bids",
        ],
      },
      {
        title: "NAICS Search Packs",
        objective:
          "Turn your NAICS codes into targeted search strategies that find work you can actually win.",
        opener:
          "Your NAICS codes are search keys, not just registration data. A NAICS search pack combines your codes with keywords, set-aside filters, and agency patterns to produce a focused weekly search routine. This module shows you how to build packs for each line of your business.",
        lessons: [
          "Mapping codes to keyword strategies",
          "Set-aside and place-of-performance filters",
          "Reading agency buying patterns",
          "Refreshing your packs quarterly",
        ],
      },
      {
        title: "The Subcontracting-First Playbook",
        objective:
          "Use subcontracting as your fastest path to federal experience and past performance.",
        opener:
          "For many small businesses, the smartest first federal dollar comes as a subcontractor, not a prime. You learn the compliance ropes, build past performance, and get paid while someone else manages the prime relationship. This module is the full playbook for making subcontracting a deliberate strategy.",
        lessons: [
          "Why subcontracting first makes sense",
          "Setting realistic expectations on margins and control",
          "Protecting your interests in a subcontract",
        ],
      },
      {
        title: "Finding and Pitching Prime Contractors",
        objective:
          "Identify prime contractors who need what you offer and pitch them like a professional.",
        opener:
          "Primes do not find you by accident. The SBA, GSA, and DoD all publish directories of prime contractors with subcontracting plans, and those directories are prospecting lists. This module shows you how to work them and how to write an introduction that gets a response.",
        lessons: [
          "The SBA, GSA, and DoD prime directories",
          "Researching a prime before you reach out",
          "Writing the first email",
          "Following up without being a pest",
          "What primes actually want from subs",
        ],
      },
      {
        title: "From Sub to Prime",
        objective:
          "Plan your graduation from subcontractor to prime bidder using the experience you have built.",
        opener:
          "Subcontracting is a strategy, not a permanent identity. The past performance, relationships, and compliance habits you build as a sub become your prime bidding foundation. This module covers how to know when you are ready and how to make the transition deliberately.",
        lessons: [
          "Signs you are ready to prime",
          "Turning sub past performance into prime credibility",
          "Your first prime bids: picking the right size",
          "Keeping sub relationships while competing",
        ],
      },
    ],
  },
  {
    tier: "allaccess",
    status: "scaffolded",
    modules: [
      {
        title: "Building Your Two-Year Pipeline",
        objective:
          "Turn sporadic bidding into a managed pipeline with forecasts you can plan hiring around.",
        opener:
          "Over two years, bidding stops being a series of sprints and becomes a pipeline you manage like any other revenue channel. This module shows you how to forecast opportunity flow, stage your bids, and connect pipeline math to real business decisions like hiring and capacity.",
        lessons: [
          "Pipeline math: leads, bids, wins, and revenue",
          "Forecasting your next four quarters",
          "Capacity planning against the pipeline",
          "Quarterly pipeline reviews",
        ],
      },
      {
        title: "Past Performance Strategy",
        objective:
          "Deliberately build the past performance record that unlocks bigger bids.",
        opener:
          "Past performance is the currency of federal contracting, and it compounds. Every job you do well becomes evidence for the next, bigger bid, but only if you capture it properly. This module covers how to document performance, gather references, and present your record so evaluators trust it.",
        lessons: [
          "What evaluators actually look for",
          "Documenting performance as you go",
          "Collecting references and CPARS awareness",
          "Presenting past performance in proposals",
        ],
      },
      {
        title: "Teaming and Joint Ventures: The Basics",
        objective:
          "Understand when teaming makes sense and how the basic structures work.",
        opener:
          "Some opportunities are too big for one small business and perfect for two. Teaming arrangements and joint ventures let small businesses combine capabilities and chase larger work, but the structures have real rules and real risks. This module gives you the honest basics so you can have an informed conversation with an attorney before you sign anything.",
        lessons: [
          "When teaming beats bidding alone",
          "Teaming agreements versus joint ventures",
          "The rules that trip people up",
          "Finding the right partner",
          "Getting legal review before you commit",
        ],
      },
      {
        title: "Renewal and Growth Planning",
        objective:
          "Keep your foundation current while you scale: registrations, certifications, and capability growth.",
        opener:
          "Growth creates maintenance debt: registrations to renew, certifications to recertify, capabilities to document. This module is your annual operating rhythm for the unglamorous work that keeps you eligible and credible while you chase bigger opportunities.",
        lessons: [
          "The annual compliance calendar",
          "SAM.gov renewal and certification recertification",
          "Updating capability statements and registrations",
          "Planning your next certification",
          "Reviewing win rates and adjusting strategy",
        ],
      },
      {
        title: "The Long Game: Becoming a Known Entity",
        objective:
          "Build agency relationships and market presence that compound over two years of consistent bidding.",
        opener:
          "The businesses that win steadily are the ones agencies already know when the solicitation drops. That reputation is built through consistent bidding, industry days, sources-sought responses, and professional follow-through. This module maps the long-game activities that turn a bidder into a known quantity.",
        lessons: [
          "Responding to sources-sought notices",
          "Industry days and pre-proposal conferences",
          "Debriefings: learning from every loss",
          "Building an agency relationship map",
        ],
      },
    ],
  },
];
