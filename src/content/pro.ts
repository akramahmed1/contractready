import type { Lesson } from "./types";

/**
 * Annual Pro tier: the full opportunity-finding and subcontracting curriculum.
 * All procedural claims are grounded in the Sept 18, 2026 SAM.gov mechanics
 * research. Unverifiable details are hedged or framed as general guidance,
 * per CONTENT_NOTES.md. Subcontracting agreement content is general
 * information, not legal advice.
 */
export const PRO_LESSONS: Lesson[] = [
  {
    slug: "pro-sam-saved-searches",
    title: "SAM.gov Saved Searches and Email Alerts",
    tier: "pro",
    estMinutes: 8,
    summary:
      "Turn SAM.gov from a website you visit into a feed that comes to you: saved searches, email alerts, notice-type filters, and a free API option for when you outgrow email.",
    blocks: [
      {
        type: "p",
        text: "Browsing SAM.gov by hand every morning does not scale. The site lets you save a search once and either rerun it in one click or have matching notices emailed to you. Browsing and reading notices is public, but saving searches and receiving email alerts requires a logged-in SAM.gov account.",
      },
      { type: "h2", text: "What a saved search does" },
      {
        type: "p",
        text: "A saved search stores a full filter set: your keywords, NAICS codes, set-aside types, place of performance, and notice types. Instead of rebuilding those filters every session, you open the saved search and see only what is new since your last visit.",
      },
      { type: "h2", text: "Set up one search per line of business" },
      {
        type: "p",
        text: "Do not build one giant search for everything you do. Build one saved search per line of business, matching the NAICS search packs in the next module. That way each alert stays focused, and you can tell at a glance which part of your business a new notice belongs to.",
      },
      { type: "h2", text: "Filter by notice type" },
      {
        type: "p",
        text: "SAM.gov classifies every notice by type, and each type means something different for your week:",
      },
      {
        type: "ul",
        items: [
          "Solicitation: the actual request for offers. This is what you bid on.",
          "Combined Synopsis/Solicitation: a shorter combined format, often used for simpler buys.",
          "Presolicitation: an official heads-up that a solicitation is coming. Time to start preparing, not bidding.",
          "Sources Sought: the agency asking the market who is capable and interested. These often precede solicitations, and responding can put you on the agency's radar.",
          "Special Notice: announcements such as events or general information.",
          "Award Notice: who won, for how much, and when. Research gold for reading agency patterns.",
        ],
      },
      { type: "h2", text: "Email alerts" },
      {
        type: "p",
        text: "Have SAM.gov email you when new notices match a saved search. Route alerts to a dedicated folder in your inbox so they do not drown in general email, and review them on a fixed schedule. An alert you never read is just inbox clutter with extra steps.",
      },
      { type: "h2", text: "When you outgrow email: the free API" },
      {
        type: "p",
        text: "If you ever want to pull notices into your own spreadsheet or system automatically, SAM.gov offers a free public API. Getting a key is self-serve: register a SAM.gov account, open Account Details, enter your account password, and generate a public API key. You can filter by NAICS code, set-aside type, state, keyword, and response-deadline window, with up to 1,000 results per request. It returns only the latest active version of each notice, and active data is updated daily.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Never put an API key in client-side code on a public website, where anyone can read it. Use it server-side or in your own private tools. Treat the official API documentation as the authority, since example URLs in third-party guides can go stale.",
      },
      {
        type: "callout",
        style: "info",
        text: "SAM.gov updates its screens periodically. Button labels, menu names, and page layouts can change. The concepts in this lesson, saved searches, notice-type filters, and alerts, are stable. When the screens look different from any guide, follow the on-screen labels.",
      },
    ],
  },
  {
    slug: "pro-state-local-portals",
    title: "State and Local Procurement Portals Worth Watching",
    tier: "pro",
    estMinutes: 7,
    summary:
      "The federal market is only one market. How to find your state, county, and city buying portals, what to expect from each, and how to work them alongside SAM.gov.",
    blocks: [
      {
        type: "p",
        text: "States, counties, cities, school districts, and public utilities buy enormous volumes of goods and services through their own portals, completely separate from SAM.gov. Many small businesses find their first public-sector work here: the competition pool is smaller, local presence can be a genuine advantage, and the buying cycles are often shorter.",
      },
      { type: "h2", text: "How to find yours" },
      {
        type: "p",
        text: "There is no single national directory worth trusting here, so do the direct work:",
      },
      {
        type: "ul",
        items: [
          "Search for your state's central purchasing or procurement office and its vendor registration page. This is the state-level equivalent of SAM.gov.",
          "Check the purchasing pages of the counties and cities where you can realistically perform work.",
          "Look at school districts, transit agencies, water utilities, and port authorities in your service area. They buy constantly and publish their own bid notices.",
        ],
      },
      { type: "h2", text: "What to expect" },
      {
        type: "p",
        text: "Each system is its own world. Your SAM.gov registration does not carry over: you will register as a vendor separately on each portal you want to bid through. Notification options vary, some portals email you about matching bids and some expect you to check back. Read each portal's own vendor instructions before assuming anything works like the last one.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Be skeptical of third-party bid-notification services that charge a fee to forward you public bid notices. The portals themselves are the source of truth, and most offer free notifications. Paying a middleman for what the government publishes free is a bad trade.",
      },
      { type: "h2", text: "Work them as one system" },
      {
        type: "p",
        text: "Add your state and local portals to the same weekly routine as SAM.gov. The triage discipline from the next lessons applies everywhere: eligibility first, capability second, winnability third. A lead is only as good as the system that surfaces it twice, once when it posts and once when your review catches it.",
      },
      {
        type: "checklist",
        items: [
          "Identified my state's central procurement portal and vendor registration page",
          "Listed the counties, cities, and special districts I can serve",
          "Registered as a vendor on the two or three portals most likely to buy what I sell",
          "Turned on bid notifications wherever the portal offers them free",
          "Added state and local checks to my weekly opportunity review",
        ],
      },
    ],
  },
  {
    slug: "pro-organizing-feed",
    title: "Organizing Your Opportunity Feed",
    tier: "pro",
    estMinutes: 8,
    summary:
      "Every SAM.gov notice carries the same structured fields. Use them as the columns of a tracking sheet so no deadline, amendment, or contact ever slips past you.",
    blocks: [
      {
        type: "p",
        text: "Every SAM.gov contract opportunity notice follows the same structure, and that structure is your friend. Instead of saving random bookmarks, track each opportunity with the fields the notice already gives you. Everything on a notice page is public without login: the metadata, the full description, the contact information, and the version history.",
      },
      { type: "h2", text: "The fields worth tracking" },
      {
        type: "ul",
        items: [
          "Title and Notice ID, for example FA483026Q0032. Note that the Notice ID is shown prominently but is not the URL identifier, so record both if you deep-link.",
          "Department, agency, and contracting office. Over time you will learn which offices buy what you sell.",
          "Opportunity type plus its Original or Updated marker. An Updated marker means something changed: read what changed before you act.",
          "Original published date and the date offers are due. These drive your whole calendar.",
          "Set-aside type, for example Total Small Business Set-Aside under FAR 19.5. This decides whether you are even eligible.",
          "PSC code and NAICS code with their descriptions. These feed directly into your search packs.",
          "Place of performance, city, state, and ZIP. It can be blank, which is itself useful information.",
          "Primary and secondary points of contact with names, titles, phone numbers, and email addresses.",
          "The canonical detail link, in the form https://sam.gov/opp/{identifier}/view.",
        ],
      },
      { type: "h2", text: "A simple tracking sheet" },
      {
        type: "p",
        text: "One row per opportunity, one status per row: new, reviewing, go, no-go, drafting, submitted, decided. Add a next-action date to every row. A spreadsheet works fine at this stage; the point is that every opportunity has exactly one status and exactly one next step, reviewed weekly.",
      },
      { type: "h2", text: "Watch the history, not just the notice" },
      {
        type: "p",
        text: "Notices carry a versioned history showing every update with timestamps. Solicitations change after publication: amendments add requirements, answer questions, and move deadlines. Bidding against an outdated version of a solicitation is an automatic loss. Make checking the history tab part of your routine for every live bid, especially in the final 48 hours before a deadline.",
      },
      {
        type: "callout",
        style: "info",
        text: "Login is required only for a few extras: downloading attachments on some notices, following an opportunity, joining the interested vendors list, and saving searches with email alerts. If you only need to read notices, track fields, and pull contacts, no login is needed.",
      },
    ],
  },
  {
    slug: "pro-weekly-triage",
    title: "Weekly Triage: From Fifty Leads to Five Bids",
    tier: "pro",
    estMinutes: 10,
    summary:
      "A disciplined three-pass triage that turns a noisy weekly feed into a short list of bids worth your time: eligibility first, capability second, winnability third.",
    blocks: [
      {
        type: "p",
        text: "A working opportunity system surfaces far more leads than you can bid. That is the point. Your job each week is not to bid on everything; it is to run a fast, honest triage that kills weak leads early so your bidding energy goes to the few worth winning. Three passes, in order.",
      },
      { type: "h2", text: "Pass one: eligibility, about ten minutes per lead" },
      {
        type: "p",
        text: "Kill anything you are not allowed to bid before you spend another minute on it:",
      },
      {
        type: "ul",
        items: [
          "Set-aside: does the notice restrict bidding to a category you actually qualify for? A set-aside you are not certified for is not a lead, no matter how perfect the scope looks.",
          "Registration: is your SAM.gov registration active now, and will it still be active at both checkpoints, offer submission and award? A federal rule requires active registration at both moments.",
          "Place of performance: can you actually perform there, at a cost that leaves the bid sensible?",
        ],
      },
      { type: "h2", text: "Pass two: capability" },
      {
        type: "ul",
        items: [
          "Does the scope match work you have genuinely done before, as a prime or a sub?",
          "Do you have the staff, equipment, or partners to deliver on the stated timeline?",
          "Is the deadline realistic for producing a compliant, competitive offer?",
        ],
      },
      { type: "h2", text: "Pass three: winnability" },
      {
        type: "ul",
        items: [
          "Is there an incumbent? Award notices show who won before, for how much, and when. An entrenched incumbent with strong past performance is a steep hill.",
          "How crowded will the competition be? Open competitions draw crowds; well-targeted set-asides narrow the field.",
          "Can you price it realistically and still make money? A bid you win at a loss is worse than a bid you lose.",
        ],
      },
      {
        type: "callout",
        style: "warn",
        text: "Never bid a set-aside you are not certified for. Self-certification for some programs has ended: for example, SDVOSB self-certification was eliminated effective October 1, 2024, with a grace period that ended December 22, 2024. Misrepresenting your eligibility can disqualify your bid and create legal trouble far beyond one lost opportunity.",
      },
      { type: "h2", text: "Document the no-go" },
      {
        type: "p",
        text: "Write one line for every lead you kill: the reason, in plain words. This log becomes valuable twice. First, it stops you from re-triaging the same lead next week. Second, patterns in your no-go reasons tell you what to fix: if eligibility kills most leads, you need a certification; if capability kills them, you need a partner or a narrower focus.",
      },
    ],
  },
  {
    slug: "pro-naics-keywords",
    title: "Mapping Codes to Keyword Strategies",
    tier: "pro",
    estMinutes: 9,
    summary:
      "Your NAICS codes are search keys, not just registration data. How to expand them into keyword strategies that catch the opportunities codes alone would miss.",
    blocks: [
      {
        type: "p",
        text: "Your NAICS codes do two jobs. On your SAM.gov registration they drive your size standards under 13 CFR 121.201 and your eligibility for set-asides. In your opportunity search they are keys: every notice carries a NAICS code and a PSC code, so filtering by code is the fastest way to cut a national feed down to your market.",
      },
      { type: "h2", text: "Start with your registered codes" },
      {
        type: "p",
        text: "List the NAICS codes on your registration and check your size standard for each one with the SBA's size standards tool. Contracting officers choose the code for each solicitation, and the size standard attached to that code decides whether you count as small for that bid. Know your codes cold before you search with them.",
      },
      { type: "h2", text: "Expand to adjacent codes" },
      {
        type: "p",
        text: "Searching only your registered codes misses work you could do that a contracting officer coded differently. Look at neighboring codes in your sector and at the codes on award notices for work similar to yours. As rough context for where federal dollars concentrate, recent fiscal year data shows heavy volume in engineering services, facilities support, IT services, construction, and professional consulting, but treat that as background, not as a promise about any specific opportunity.",
      },
      { type: "h2", text: "Add keywords from the description text" },
      {
        type: "p",
        text: "Every notice carries a full rich-text description of the requirement. Keyword search catches what codes miss: the specific equipment, software, materials, or methods the agency actually names. Build keyword lists from the language agencies use, not the language your industry uses internally. PSC codes give you a second axis: they classify what is being bought, while NAICS classifies the industry doing it.",
      },
      { type: "h2", text: "Build the pack" },
      {
        type: "p",
        text: "One pack per line of business: your core NAICS codes, two or three adjacent codes worth watching, a keyword list drawn from real notice descriptions, and an exclusion list of terms that keep producing irrelevant hits. Save each pack as its own SAM.gov saved search with email alerts, exactly as the first lesson in this module described.",
      },
      {
        type: "callout",
        style: "info",
        text: "Review which keywords actually produce triage survivors each quarter. A keyword that generates fifty leads and zero bids is noise wearing a useful disguise. Cut it.",
      },
    ],
  },
  {
    slug: "pro-setaside-place-filters",
    title: "Set-Aside and Place-of-Performance Filters",
    tier: "pro",
    estMinutes: 10,
    summary:
      "The two filters that cut noise fastest: which set-asides you genuinely qualify for, and where you can realistically perform the work.",
    blocks: [
      {
        type: "p",
        text: "After NAICS codes, two filters eliminate the most irrelevant leads: set-aside type and place of performance. Used honestly, they shrink a national feed to the bids you are actually allowed to win and able to perform.",
      },
      { type: "h2", text: "Set-aside filters, used honestly" },
      {
        type: "p",
        text: "A set-aside restricts bidding to businesses in a specific category. Filter to the categories you genuinely qualify for, and no further. The current program facts, verified September 2026:",
      },
      {
        type: "ul",
        items: [
          "8(a): a nine-year business development program with a 90-day stated decision target. Note a major 2026 change: an SBA final rule dated August 11, 2026, effective September 10, 2026, removed the rebuttable presumption of social disadvantage after the Ultima Services court decision in 2023. A race-neutral, evidence-based test now applies to individually owned firms.",
          "HUBZone: a 60 calendar-day statutory decision target. Requires your principal office and at least 35 percent of your employees in a HUBZone, recertification every three years, and it carries a 10 percent price preference.",
          "SDVOSB: certification runs through SBA VetCert since January 2023, with roughly 30-day stated decisions and three-year validity. Self-certification was eliminated effective October 1, 2024, with the grace period ending December 22, 2024.",
          "WOSB and EDWOSB: a 90-day stated decision target, available only in SBA-authorized NAICS codes.",
        ],
      },
      {
        type: "callout",
        style: "warn",
        text: "Set-aside rules change, sometimes significantly, as the 2026 8(a) rule shows. Verify the current program rules on sba.gov before you apply for a certification or build a filter around one. Never filter to a set-aside you have not actually qualified for.",
      },
      { type: "h2", text: "Place of performance" },
      {
        type: "p",
        text: "Every notice lists a place of performance, city, state, and ZIP, though it can be blank. Filter by the states and regions you can genuinely serve. Do the honest math: travel, lodging, per diem, shipping, and management oversight for distant work. A bid in a faraway state is not a bigger opportunity if performing there erases your margin.",
      },
      { type: "h2", text: "Combine them" },
      {
        type: "p",
        text: "Your tightest saved searches combine all three: your NAICS pack, your qualified set-asides, and your serviceable geography. That combination is what turns fifty weekly leads into a handful worth triaging.",
      },
    ],
  },
  {
    slug: "pro-agency-patterns",
    title: "Reading Agency Buying Patterns",
    tier: "pro",
    estMinutes: 9,
    summary:
      "Past awards predict future buying better than anything. How to use award notices, USAspending, and sources-sought notices to learn who buys what you sell.",
    blocks: [
      {
        type: "p",
        text: "Agencies are creatures of habit. The office that bought facilities maintenance three years running will probably buy it again. Learning those patterns before you bid tells you where your effort has the best odds, which incumbents you would face, and what award sizes are normal in your lane.",
      },
      { type: "h2", text: "Award notices on SAM.gov" },
      {
        type: "p",
        text: "Award notices add four fields to the standard notice structure: the award number, the award amount, the award date, and the awardee's name, address, and UEI. Filter notice type to Award Notice within your NAICS codes and read a few dozen. You will quickly see which companies win repeatedly, which agencies buy your kind of work, and what typical award values look like.",
      },
      { type: "h2", text: "USAspending for the bigger picture" },
      {
        type: "p",
        text: "USAspending.gov publishes federal award and obligation data with a free API that requires no key. It covers awards only, from FPDS data, not pre-solicitation opportunities, so use it for research, not lead generation. Search your NAICS codes and keywords to see total spending by agency, top recipients, and how award dollars split between competitive and set-aside vehicles.",
      },
      { type: "h2", text: "Sources sought as smoke signals" },
      {
        type: "p",
        text: "Sources Sought notices are agencies asking the market who is capable and interested before they write a solicitation. They often precede real solicitations by weeks or months. Responding to one that fits you is low cost: it puts your company on the agency's radar and sometimes shapes the eventual requirements. Track them in the same feed as solicitations, flagged as early-stage.",
      },
      { type: "h2", text: "What to look for" },
      {
        type: "ul",
        items: [
          "Repeat winners in your NAICS: these are your likely competitors and potential teaming or subcontracting targets.",
          "Agencies and offices that buy your work regularly, with typical award sizes you can handle.",
          "Set-aside patterns: whether your kind of work tends to go competitive, small business set-aside, or a specific program.",
          "Timing patterns: some agencies buy on a visible annual rhythm. Learn it and be ready before the notices post.",
        ],
      },
      {
        type: "callout",
        style: "info",
        text: "History is context, not a promise. Agencies change strategies, incumbents lose, and budgets shift. Use patterns to aim your effort, never to assume an outcome.",
      },
    ],
  },
  {
    slug: "pro-refresh-quarterly",
    title: "Refreshing Your Packs Quarterly",
    tier: "pro",
    estMinutes: 6,
    summary:
      "Search packs rot: codes change, rules change, keywords go stale. A thirty-minute quarterly routine that keeps your opportunity system sharp.",
    blocks: [
      {
        type: "p",
        text: "A search pack is a living tool, not a one-time setup. NAICS codes get revised, size standards get updated, set-aside rules change, as the 2026 8(a) rule proved, and keywords that once produced great leads go stale. A pack you built in January and never touched again is quietly missing opportunities by July.",
      },
      { type: "h2", text: "The thirty-minute quarterly routine" },
      {
        type: "ol",
        items: [
          "Check your certifications and registration: SAM.gov renewal every 365 days, HUBZone recertification every three years, SDVOSB three-year validity. A lapsed credential silently kills eligibility.",
          "Re-verify set-aside program rules on sba.gov. Rules changed materially in 2026; assume they can change again.",
          "Review keyword performance: which terms produced triage survivors, and which produced only noise? Cut the noise, keep the winners.",
          "Scan award notices in your codes for new repeat winners and new buying offices you had not noticed.",
          "Check whether adjacent NAICS codes deserve a place in your pack based on what you actually bid last quarter.",
          "Pause or delete saved searches and alerts that no longer serve a line of business.",
        ],
      },
      {
        type: "callout",
        style: "info",
        text: "Put the quarterly review on your calendar next to your SAM.gov renewal reminder. Maintenance is the unglamorous half of the system, and it is the half most businesses skip.",
      },
      { type: "h2", text: "What changes most often" },
      {
        type: "p",
        text: "Four things move under your feet while you are busy bidding. NAICS codes get revised: codes are added, split, or redefined, and a code on your registration can shift meaning. Size standards get updated: the SBA adjusts receipts and employee thresholds, and a code that counted you as small can stop counting. Set-aside program rules change, sometimes significantly, as the 2026 8(a) rule proved. And keyword drift sets in: agencies change terminology, and last year's perfect search term becomes this year's dead end.",
      },
      { type: "h2", text: "Tie it to business planning" },
      {
        type: "p",
        text: "Do the review in the same week each quarter and pair it with your pipeline review from the triage lesson. The questions connect: which packs produced real bids, which produced only noise, and where did your no-go log point to a missing certification or a wrong focus? A search pack is not just a filter set. It is a written record of where you believe your business wins, and it deserves the same quarterly honesty as your books.",
      },
    ],
  },
  {
    slug: "pro-why-sub-first",
    title: "Why Subcontracting First Makes Sense",
    tier: "pro",
    estMinutes: 8,
    summary:
      "For many new businesses, the smartest first federal dollar comes as a subcontractor: learn the compliance ropes, build past performance, and get paid while a prime manages the agency relationship.",
    blocks: [
      {
        type: "p",
        text: "Bidding as a prime contractor means owning everything: the proposal, the compliance, the agency relationship, the performance risk. Subcontracting lets you enter the federal market carrying only your slice of that weight. For many small businesses, it is the fastest credible path to federal experience.",
      },
      { type: "h2", text: "You learn the ropes on someone else's risk" },
      {
        type: "p",
        text: "As a subcontractor you learn how federal work actually operates: invoicing formats, reporting rhythms, quality expectations, security requirements, and the pace of government decision-making. You learn all of it while the prime contractor manages the agency relationship and absorbs the prime-level compliance burden.",
      },
      { type: "h2", text: "You build past performance that counts" },
      {
        type: "p",
        text: "Every subcontract you perform well becomes documented evidence for your future prime bids: scope delivered, dollar value, agency served, dates, results. Past performance is the currency of federal contracting, and subcontracting is how most small businesses earn their first holdings of it.",
      },
      { type: "h2", text: "You get paid while you learn" },
      {
        type: "p",
        text: "Proposal writing is expensive unpaid labor. Subcontracting converts your effort into revenue sooner: you perform defined work for a negotiated rate instead of spending months writing bids that may lose. That cash flow funds the certifications, staff, and bidding capacity your prime ambitions will need later.",
      },
      { type: "h2", text: "Where the work actually lives" },
      {
        type: "p",
        text: "Start with SubNet, the SBA's subcontracting opportunities board. It is fully public with no login: an HTML table you can filter by state and keyword, showing the work description, the prime contractor, performance start date, place of performance, NAICS code, and a point of contact with name and phone. Detail sections add the closing date and the contact's email. Note that self-service posting is currently disabled, so primes email the SBA to list opportunities, which means volume can be thinner than in years past.",
      },
      {
        type: "p",
        text: "Real postings observed on September 18, 2026 illustrate the range: a building door replacement service at a San Diego Job Corps center under NAICS 238150, a sanitary sewer lining project in Roanoke, Illinois, and an infrastructure repair phase for the Army Corps of Engineers St. Louis District. Small, specific, and very much real work.",
      },
      {
        type: "p",
        text: "Two honest caveats. SAM.gov itself has no subcontracting section: subcontracting appears there only indirectly, for example in presolicitation synopses advising interested firms to contact the listed awardee. And the mega-prime supplier portals are mostly login-walled or invitation-only, Boeing and RTX through Exostar, Northrop through SAP Ariba by invitation, so do not burn weeks chasing walled portals before you have worked the public boards and directories.",
      },
    ],
  },
  {
    slug: "pro-margins-control",
    title: "Setting Realistic Expectations on Margins and Control",
    tier: "pro",
    estMinutes: 8,
    summary:
      "Subcontracting is a trade: lower risk, thinner margins, less control. Go in with clear eyes on the money, the authority, and the payment timing.",
    blocks: [
      {
        type: "p",
        text: "Subcontracting is not prime contracting at a discount. It is a different position with different economics and different authority. Businesses that thrive as subs understand the trade explicitly; businesses that struggle usually expected prime economics with sub responsibilities.",
      },
      { type: "h2", text: "The money" },
      {
        type: "p",
        text: "The prime contractor carries the contract management, the agency relationship, the compliance overhead, and the performance risk, and prices its bid accordingly. As a subcontractor you are typically paid for a defined scope at a negotiated rate, and that rate usually leaves thinner margins than prime work. Do the math before you sign: your true costs, plus overhead, plus a real profit. If the numbers only work by cutting corners on wages, insurance, or quality, it is not a good subcontract. It is a trap.",
      },
      { type: "h2", text: "The control" },
      {
        type: "p",
        text: "You do not own the customer relationship; the prime does. Scope changes, schedule shifts, and agency feedback all flow through the prime to you. Your leverage is performance: subs who deliver reliably, communicate early, and cause zero drama get repeat work and better terms. Subs who fight the prime over every change order get replaced.",
      },
      { type: "h2", text: "The payment timing" },
      {
        type: "p",
        text: "You are usually paid on the prime's cycle, which often means after the prime invoices the government and gets paid. Clarify the payment terms in writing before work starts: how you invoice, when payment is due, and what happens if the prime's payment is delayed. Cash flow planning matters more here than in commercial work, because government payment cycles are slow and you cannot speed them up by calling louder.",
      },
      { type: "h2", text: "The trade, summarized" },
      {
        type: "ul",
        items: [
          "What you give up: direct agency relationships, control over scope and schedule, prime-level margins, and visibility into the full contract.",
          "What you get: faster entry into federal work, paid learning, documented past performance, relationships with primes who may team with you later, and revenue without the cost of constant prime bidding.",
        ],
      },
      {
        type: "callout",
        style: "info",
        text: "None of this is an argument against subcontracting. It is an argument against romanticizing it. Price it honestly, negotiate the terms the next lesson covers, and it becomes one of the most reliable growth engines a small federal contractor has.",
      },
    ],
  },
  {
    slug: "pro-protecting-interests",
    title: "Protecting Your Interests in a Subcontract",
    tier: "pro",
    estMinutes: 12,
    summary:
      "What belongs in a written subcontract agreement before you start work: scope, payment, flow-down clauses, termination, and the attorney review that protects everything else.",
    blocks: [
      {
        type: "callout",
        style: "warn",
        text: "This lesson is general information, not legal advice. A subcontract is a legal contract, and the clauses described here work differently in different states. Have an attorney in your state review any subcontract agreement before you sign it. The cheapest attorney hour you will ever buy is the one before you sign.",
      },
      { type: "h2", text: "Get it in writing" },
      {
        type: "p",
        text: "A handshake plus an email thread is not an agreement. Before you mobilize staff, buy materials, or turn down other work, you need a signed subcontract that both sides can point to. If a prime resists putting terms in writing, treat that as information about the prime.",
      },
      { type: "h2", text: "Define the scope precisely" },
      {
        type: "p",
        text: "The agreement should spell out exactly what work you will perform, what deliverables you owe, what is explicitly excluded, and who supplies materials, equipment, and site access. Vague scope is where most subcontract disputes are born: the prime remembers a broader promise than you remember making.",
      },
      { type: "h2", text: "Payment terms" },
      {
        type: "ul",
        items: [
          "The amount or rate, and exactly what triggers each invoice: milestones, monthly progress, or completion.",
          "When payment is due after you invoice, in calendar days, not vibes.",
          "What happens if the prime's own payment from the government is delayed. Watch for clauses that tie your payment to the prime being paid first, and make sure you understand them before you agree.",
          "How change orders and extra work are priced and approved before you perform them.",
        ],
      },
      { type: "h2", text: "Flow-down clauses" },
      {
        type: "p",
        text: "Federal contract clauses pass through to subcontractors. Your agreement should identify which prime-contract clauses apply to you, things like labor standards, reporting, or compliance requirements, so you are not blindsided by obligations you never saw. Ask for the list and read it.",
      },
      { type: "h2", text: "Duration, termination, and changes" },
      {
        type: "p",
        text: "Know the term of the agreement, how either side can end it, what notice is required, and what you are owed if the prime terminates for convenience. Know how scope changes get authorized and priced. An agreement the prime can end tomorrow with no notice and no payment for work in progress is not an agreement in your favor.",
      },
      { type: "h2", text: "Insurance, indemnification, and restrictive clauses" },
      {
        type: "p",
        text: "Insurance requirements, indemnification language, and any non-compete or non-solicitation clauses deserve your attorney's closest attention. These are the clauses that can reach beyond the job itself and limit what your business may do afterward. Never skim them.",
      },
      {
        type: "checklist",
        items: [
          "Scope, deliverables, and exclusions are written, specific, and match what was discussed",
          "Payment amount, invoicing triggers, and payment timing are in calendar days",
          "I understand which prime-contract clauses flow down to me",
          "Termination rights, notice periods, and payment for work in progress are spelled out",
          "Change orders must be approved in writing before the work is performed",
          "Insurance, indemnification, and any non-compete or non-solicitation clauses reviewed",
          "An attorney in my state has reviewed the agreement before I sign",
        ],
      },
    ],
  },
  {
    slug: "pro-prime-directories",
    title: "The SBA, GSA, and DoD Prime Directories",
    tier: "pro",
    estMinutes: 7,
    summary:
      "Four public directories of prime contractors with subcontracting plans, and how to turn them into a focused prospecting list of twenty to thirty targets.",
    blocks: [
      {
        type: "p",
        text: "Large prime contractors on many federal contracts are required to maintain subcontracting plans for small business participation. The government publishes directories of these primes, and for your purposes those directories are prospecting lists: companies that already subcontract, already understand the process, and already expect to hear from small businesses.",
      },
      { type: "h2", text: "The four directories" },
      {
        type: "ul",
        items: [
          "The SBA Directory of Federal Government Prime Contractors with Subcontracting Plans, published as an SBA document and built from FPDS award data.",
          "The GSA Subcontracting Directory, on GSA's small business pages, with a quarterly spreadsheet version published on Data.gov.",
          "The DoD Prime Contractor Directory, on the Defense Department's small business acquisition pages.",
          "The Department of Transportation Subcontracting Directory, on the DOT Office of Small and Disadvantaged Business Utilization pages.",
        ],
      },
      { type: "h2", text: "How to work them" },
      {
        type: "p",
        text: "Do not download a directory and start emailing alphabetically. Filter for primes whose contract history touches your NAICS codes and your geography, cross-reference the names against award notices and USAspending to see what they actually win, and build a target list of twenty to thirty primes worth real research. Twenty researched targets beat two hundred cold emails.",
      },
      { type: "h2", text: "What the directories do not tell you" },
      {
        type: "p",
        text: "A directory tells you who the primes are, not that any of them needs you right now. It will not tell you who has an active need, who is unhappy with a current sub, or who just won something in your lane. That intelligence comes from the research in the next lesson, from SubNet postings, and from award notices. The directory is the map; the outreach is still on you.",
      },
      {
        type: "callout",
        style: "info",
        text: "Government pages move. If a directory link has changed since this lesson was written, search the agency name plus subcontracting directory rather than trusting an old bookmark.",
      },
      { type: "h2", text: "Cross-reference with award data" },
      {
        type: "p",
        text: "A directory name becomes a real target when award data backs it up. Look up each candidate prime on USAspending and in SAM.gov award notices: what they win, in which NAICS codes, for which agencies, and at what values. A prime that wins facilities work for the VA every year and appears in the GSA directory is a warmer target than a name on a list you have never validated.",
      },
      {
        type: "p",
        text: "Also check whether they post on SubNet. A prime with an active posting is telling you exactly what it needs and who to contact. That is the shortest path from a directory entry to a real conversation, and it should jump to the top of your outreach order.",
      },
    ],
  },
  {
    slug: "pro-researching-prime",
    title: "Researching a Prime Before You Reach Out",
    tier: "pro",
    estMinutes: 9,
    summary:
      "Generic outreach gets ignored. How to research a prime contractor's wins, patterns, and active needs so your first contact references something real.",
    blocks: [
      {
        type: "p",
        text: "Prime contractors get a steady stream of vague introductions from subcontractors. The ones that get replies reference something specific: a contract the prime holds, a posting they published, a pattern in their awards. Ten minutes of research per prime is the difference between being noise and being a conversation.",
      },
      { type: "h2", text: "What to learn about each prime" },
      {
        type: "ul",
        items: [
          "What they win: search SAM.gov award notices and USAspending for the prime's name. Note the agencies, the NAICS codes, and the typical award sizes.",
          "Their pattern: do they win in your lane repeatedly, or was it a one-off? Repeat business means ongoing subcontracting needs.",
          "Their active needs: check SubNet for their current postings. A prime posting right now is a prime worth contacting right now.",
          "Their supplier requirements: most large primes publish supplier pages describing registration, quality, and compliance expectations. Read them before you write.",
        ],
      },
      { type: "h2", text: "A note on walled portals" },
      {
        type: "p",
        text: "Treat mega-prime supplier portals as research, not as a bidding channel. Actual requests for quotes on those portals are typically login-walled or invitation-only: Boeing and RTX through Exostar, Northrop through SAP Ariba by invitation. The public pages tell you how the prime wants to be approached; the relationship still starts with a human conversation, not a portal registration.",
      },
      { type: "h2", text: "Turn research into one paragraph" },
      {
        type: "p",
        text: "For each target prime, write one paragraph of relevance: what they do that overlaps your capability, one specific contract or posting as your reason for writing, and the capability you would bring. If you cannot write that paragraph, you have not researched enough to email them yet.",
      },
      {
        type: "checklist",
        items: [
          "Prime's recent awards identified with agencies and NAICS codes",
          "Checked SubNet for their active postings",
          "Read their public supplier or subcontracting page",
          "One paragraph of specific relevance written",
          "Right contact identified, not a generic info address",
        ],
      },
      { type: "h2", text: "Red flags worth noticing" },
      {
        type: "ul",
        items: [
          "No verifiable award history under their name in your market. They may still be real, but verify before investing outreach time.",
          "Supplier pages demanding upfront fees to register as a vendor. Legitimate prime registration is free, so fees are a warning sign.",
          "No named contact anywhere, only web forms that disappear into the void. You can still try, but prioritize primes you can actually reach.",
          "A pattern of awards far outside your capability. Respect the mismatch and move on to a better fit.",
        ],
      },
      {
        type: "p",
        text: "Research is not about finding reasons to disqualify everyone. It is about spending your outreach where the fit is real, so that every email you send has a genuine reason to exist.",
      },
    ],
  },
  {
    slug: "pro-first-email",
    title: "Writing the First Email",
    tier: "pro",
    estMinutes: 8,
    summary:
      "The goal of a first email is a reply, not a contract. A short structure that respects a busy subcontract administrator's time and gives them a reason to answer.",
    blocks: [
      {
        type: "p",
        text: "Your first email to a prime contractor has exactly one job: earn a reply. Nobody awards a subcontract from a cold email. Write for a busy person skimming on a phone, and make answering easy.",
      },
      { type: "h2", text: "The structure" },
      {
        type: "ol",
        items: [
          "Subject line: specific, not clever. Reference their posting, contract, or need by name.",
          "Who you are: one or two lines. Company, location, what you do.",
          "Why them: one or two lines referencing your research. A specific contract they hold or a posting they published.",
          "What you offer: two or three lines tying your capability to their work. Concrete, not adjectives.",
          "The ask: fifteen minutes on a call next week. One clear, low-commitment request.",
        ],
      },
      { type: "h2", text: "What to attach" },
      {
        type: "p",
        text: "One thing: a one-page capability statement. Not a brochure, not a twenty-slide deck, not five project photos. One page that says who you are, what you do, who you have done it for, and how to reach you. Everything else waits until they ask.",
      },
      { type: "h2", text: "What to avoid" },
      {
        type: "ul",
        items: [
          "Mass blasts where only the company name changes. People can tell, and it burns the contact.",
          "Vague claims like full-service solutions provider. Say what you actually do.",
          "Overselling: claiming capabilities you cannot document yet. One honest capability beats five invented ones.",
          "Following up the same day. Give it room to breathe; the next lesson covers cadence.",
        ],
      },
      {
        type: "callout",
        style: "info",
        text: "Find the right person. SubNet postings list a point of contact with a name, email, and phone number, which is a gift: use it. Directories give you companies, not people, so a few minutes of digging for the subcontract administrator or small business liaison beats a generic info address every time.",
      },
      { type: "h2", text: "What it looks like assembled" },
      {
        type: "callout",
        style: "info",
        text: "Subject: Subcontract inquiry regarding your SubNet posting, [project name]. Hello [Name], I am [Name] with [Company] in [City]. We perform [specific trade or service], and I saw your posting for [project]. We recently completed [similar job, value, customer]. I would welcome fifteen minutes next week to discuss whether we fit your needs. My one-page capability statement is attached. Thank you, [Name], [phone].",
      },
      {
        type: "p",
        text: "Notice what the example does not contain: no life story, no buzzwords, no pressure. Ninety seconds to read, one clear ask, one attachment. That is the entire formula.",
      },
    ],
  },
  {
    slug: "pro-following-up",
    title: "Following Up Without Being a Pest",
    tier: "pro",
    estMinutes: 6,
    summary:
      "Most replies come from the follow-up, not the first email. A sane cadence, a rule that every touch adds value, and knowing when to park a contact and move on.",
    blocks: [
      {
        type: "p",
        text: "Silence after a first email usually means busy, not no. Most subcontracting conversations that happen start with the second or third touch. The skill is persistence with manners: visible enough to be remembered, restrained enough to be welcome.",
      },
      { type: "h2", text: "A sane cadence" },
      {
        type: "ol",
        items: [
          "Day one: the first email, with your one-page capability statement.",
          "Day seven to ten: a short follow-up referencing the first note. Two or three lines, same ask.",
          "Week three or four: a final check with something new, a completed job, a new certification, a relevant posting of theirs you noticed.",
          "After that: park them. Log the contact, move on, and revisit in a quarter with a real reason.",
        ],
      },
      { type: "h2", text: "Every touch adds value" },
      {
        type: "p",
        text: "Never send a follow-up that just says bumping this up. Each contact should carry something: a relevant result, a useful observation about their posting, a question that shows you did homework. If you have nothing new to say, you do not have a follow-up yet.",
      },
      { type: "h2", text: "Track everything" },
      {
        type: "p",
        text: "Log every outreach: who, when, what you sent, what they said, and the next step with a date. Memory is not a CRM. A simple sheet with these columns prevents both the embarrassment of double-contacting and the quiet loss of a warm lead you forgot to nurture.",
      },
      { type: "h2", text: "Know when to stop" },
      {
        type: "p",
        text: "Three unanswered touches means not now, not never. Thank them for their time in your final note, leave the door open, and redirect the energy to the next twenty targets. Arguing with silence has never won a subcontract.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Cold outreach is not a mailing list. Do not add people who never asked to your newsletter or drip campaign. Email marketing rules apply once someone is a subscriber; a prospect who got one cold email is not one.",
      },
      { type: "h2", text: "What good follow-up sounds like" },
      {
        type: "ul",
        items: [
          "Following up on my note from last week about your [project] posting. We just wrapped [similar job] and I thought the timing might be right for a brief call.",
          "Saw your team won [contract]. Congratulations. If you need [capability] on it, we are set up for exactly that work.",
          "Last check from me for now. If timing changes, my capability statement is attached and I am one email away.",
        ],
      },
      {
        type: "p",
        text: "Each one references something real, stays short, and respects the silence if it continues. That is the whole tone: persistent, useful, and easy to say yes to.",
      },
    ],
  },
  {
    slug: "pro-what-primes-want",
    title: "What Primes Actually Want From Subs",
    tier: "pro",
    estMinutes: 8,
    summary:
      "Think like a prime contractor: they are judged on delivery, so you are either risk or relief. What makes a subcontractor worth keeping.",
    blocks: [
      {
        type: "p",
        text: "A prime contractor's reputation with the agency rests on work it does not perform itself. Every subcontractor is therefore a risk decision. Primes keep subs who reduce their risk and replace subs who increase it. Everything below follows from that one fact.",
      },
      { type: "h2", text: "Reliability over brilliance" },
      {
        type: "p",
        text: "Show up when you said you would, hit the dates you committed to, and deliver what the scope describes. Primes will forgive a lot, but not surprises. A sub who finishes on time with solid work beats a brilliant sub who needs chasing.",
      },
      { type: "h2", text: "Compliance basics, handled" },
      {
        type: "p",
        text: "Keep your SAM.gov registration active and current, keep your representations and certifications accurate, and meet the flow-down requirements in your agreement without being reminded. Compliance failures on your slice become the prime's problem with the agency, which is exactly why primes screen for this before they ever call you.",
      },
      { type: "h2", text: "Communication that prevents surprises" },
      {
        type: "ul",
        items: [
          "Flag problems early, with a proposed fix, not just a warning.",
          "Answer calls and emails fast during active work. Responsiveness is a competitive advantage most subs undervalue.",
          "Document what you deliver: dates, quantities, photos where appropriate. Good records protect both sides.",
          "Ask before deviating from the scope. Improvisation without approval is how disputes start.",
        ],
      },
      { type: "h2", text: "References they can actually check" },
      {
        type: "p",
        text: "Primes check references. Keep a short list of past prime or agency contacts who will take a call and say you delivered. One reachable reference who speaks concretely about your work outweighs a page of adjectives.",
      },
      { type: "h2", text: "Financial steadiness" },
      {
        type: "p",
        text: "A sub that collapses mid-job is a prime's nightmare: the work stops, the schedule slips, and the agency notices. You do not need to be large, but you need to be stable enough to carry your payroll and materials through the payment cycle. Primes can sense fragility, and they price it into their decisions.",
      },
      {
        type: "callout",
        style: "info",
        text: "Treat your first small job with any prime as the real interview. Primes routinely test new subs on low-risk work before trusting them with anything critical. Nail the small job and the bigger ones follow.",
      },
    ],
  },
  {
    slug: "pro-ready-to-prime",
    title: "Signs You Are Ready to Prime",
    tier: "pro",
    estMinutes: 8,
    summary:
      "Readiness is a checklist, not a feeling. The concrete signs that your business can carry a prime contract, and the warning signs that it cannot yet.",
    blocks: [
      {
        type: "p",
        text: "Moving from subcontractor to prime bidder is a step up in responsibility, not just a bigger payday. Use this checklist honestly. Checking most of these boxes means you are ready to start bidding prime work selectively. Missing several means your next investment should be in closing those gaps first.",
      },
      { type: "h2", text: "Signs you are ready" },
      {
        type: "checklist",
        items: [
          "SAM.gov registration active, with a renewal process that keeps it active at both checkpoints: offer submission and award",
          "Documented past performance as a subcontractor in work similar to what you want to bid",
          "Bonding and insurance capacity that covers the size of bids you plan to pursue",
          "Cash flow that can carry payroll and materials between government payment cycles",
          "Staff or committed partners who can actually perform the work, not just you",
          "Ability to read a solicitation's instructions and evaluation sections and judge fit quickly",
          "The certifications your target set-asides require, already in hand, not in process",
          "A bid routine: a calendar, a compliance checklist, and a triage discipline you actually follow",
        ],
      },
      { type: "h2", text: "Signs you are not ready yet" },
      {
        type: "ul",
        items: [
          "Your registration has lapsed before, or you are unsure of your renewal date.",
          "You have no documented past performance anyone could verify.",
          "One delayed payment would break your payroll.",
          "You cannot explain how the agency will evaluate your offer.",
          "You are counting on winning to afford performing. That is a bet, not a plan.",
        ],
      },
      {
        type: "callout",
        style: "info",
        text: "Not ready is not failure. It is a work list. Every gap above has a fix: a renewal calendar, a documentation habit, a cash reserve target, a certification application. Work the list, then bid.",
      },
      { type: "h2", text: "Closing the gaps" },
      {
        type: "ul",
        items: [
          "Registration lapses: set calendar reminders at 300, 60, and 30 days before expiration, and assign one person as the owner.",
          "No documented past performance: start the evidence file on your current subcontracts today, and ask for a written reference at the end of each job.",
          "Thin cash reserves: build a reserve target equal to two payroll cycles before bidding prime work that would strain you.",
          "Weak solicitation reading: practice triage on five real notices a week with the three-pass method until the instructions and evaluation sections feel familiar.",
          "Missing certifications: start the application now. With 60 to 90 day decision targets, waiting until you need the certification means missing the bids that require it.",
        ],
      },
      {
        type: "p",
        text: "Pick the two gaps that would kill the most bids and fix those first. Readiness is built one closed gap at a time, and every gap you close makes the next bid cheaper to write and easier to win.",
      },
    ],
  },
  {
    slug: "pro-sub-to-prime-credibility",
    title: "Turning Sub Past Performance Into Prime Credibility",
    tier: "pro",
    estMinutes: 9,
    summary:
      "Evaluators buy evidence, not adjectives. How to document subcontract work, collect references, and present it so a contracting officer trusts it.",
    blocks: [
      {
        type: "p",
        text: "Your subcontracting years are only worth something as prime credentials if you can prove them. Contracting officers evaluate evidence: what was done, for whom, at what scale, with what result. Start building that evidence file now, because reconstructing it two years later is miserable.",
      },
      { type: "h2", text: "Document everything while you sub" },
      {
        type: "p",
        text: "For every subcontract, record the scope you performed, the dollar value of your portion, the agency or end customer, the dates, your specific role, and the outcome in concrete terms: completed on schedule, zero defects, renewed for a second year. Save the contract pages that name your company. Memory fades; files do not.",
      },
      { type: "h2", text: "Collect references deliberately" },
      {
        type: "p",
        text: "At the end of every successful subcontract, ask your prime contact for a written reference while the work is fresh. A short letter stating the scope, value, period, and quality of your performance is worth more than any capability statement claim. Keep the contact current: a reference you cannot reach is a reference you do not have.",
      },
      { type: "h2", text: "Present it like an evaluator reads" },
      {
        type: "ul",
        items: [
          "Lead with relevance: work most similar to the bid at hand goes first, not your biggest or most recent job.",
          "Match scale: show work of similar size and complexity. A hundred-thousand-dollar job does not prove you can run a five-million-dollar one.",
          "Name the customer type: government or institutional work carries more weight than commercial work for a government evaluator.",
          "Quantify: dates, values, scope. Specifics are believable; superlatives are not.",
        ],
      },
      { type: "h2", text: "A note on government records" },
      {
        type: "p",
        text: "The government maintains its own past-performance records on prime contracts, and as a subcontractor you generally do not control what goes into those systems. What you do control is your own documentation and your references. In practice, a well-documented record with reachable references is what most evaluators actually weigh for a new prime bidder.",
      },
      {
        type: "callout",
        style: "info",
        text: "Start the file with your very next subcontract, even if you feel years from priming. The evidence compounds quietly, and one day it becomes the foundation of your first prime proposal.",
      },
    ],
  },
  {
    slug: "pro-first-prime-bids",
    title: "Your First Prime Bids: Picking the Right Size",
    tier: "pro",
    estMinutes: 10,
    summary:
      "Your first prime bid should be winnable and survivable. How to pick the right scope, the right agency, and the right financial risk for bid number one.",
    blocks: [
      {
        type: "p",
        text: "Your first prime bid sets the tone for everything after it. Win a well-chosen one and you gain confidence, a reference, and momentum. Chase something oversized and you gain an expensive education. Pick with discipline.",
      },
      { type: "h2", text: "Match scope to proof" },
      {
        type: "p",
        text: "Bid work you have already performed as a subcontractor, at a similar size and complexity. Your first prime proposal is essentially an argument that you can do as a prime what you have already done as a sub. The closer the match, the stronger the argument and the lower your performance risk.",
      },
      { type: "h2", text: "Favor simpler buys" },
      {
        type: "p",
        text: "Combined synopsis and solicitation notices are often more straightforward than full standalone solicitations, and smaller, well-defined requirements are easier to price and perform. Avoid giant multi-year contract vehicles as your first bid: they demand proposal machinery and financial depth you are still building.",
      },
      { type: "h2", text: "One agency, one lane" },
      {
        type: "p",
        text: "Learn one agency's patterns, offices, and evaluation habits before spraying bids across the government. Depth beats breadth at this stage: your second bid to the same agency is always stronger than your first, because you understand how they buy.",
      },
      { type: "h2", text: "Size the financial risk" },
      {
        type: "ul",
        items: [
          "Can you float payroll and materials between invoice and government payment without strain?",
          "Are the bonding and insurance requirements within your current capacity?",
          "If everything goes slightly wrong, schedule slips, a cost overruns, does the company survive?",
          "Never bet the company on bid number one. A survivable loss teaches; a fatal one ends the story.",
        ],
      },
      { type: "h2", text: "Read the evaluation section first" },
      {
        type: "p",
        text: "Before writing a word, read the solicitation's instructions and evaluation sections, the parts that tell you how offers must be formatted and how they will be judged. If you cannot meet the stated evaluation factors, no-bid early and move on. The cheapest proposal is the one you never write.",
      },
      {
        type: "callout",
        style: "warn",
        text: "No-bid is a valid outcome of triage, not a failure of ambition. Bidding everything is how small firms burn out their proposal capacity on unwinnable work.",
      },
    ],
  },
  {
    slug: "pro-keeping-relationships",
    title: "Keeping Sub Relationships While Competing",
    tier: "pro",
    estMinutes: 7,
    summary:
      "You will compete with firms you also subcontract for. How to handle that professionally: separate the lanes, protect their information, and keep delivering.",
    blocks: [
      {
        type: "p",
        text: "In federal contracting, today's prime is tomorrow's competitor and next year's teammate. The market is smaller than it looks, and reputations travel. Handling the sub-to-prime transition with professionalism protects relationships you will need for years.",
      },
      { type: "h2", text: "Separate the lanes" },
      {
        type: "p",
        text: "Be clear, internally and externally, about which opportunities you pursue as a prime and which you pursue as a sub. Competing for a bid while subcontracting to one of your competitors on another is normal in this market, as long as everyone knows where they stand on each specific opportunity.",
      },
      { type: "h2", text: "Never use their proprietary information" },
      {
        type: "p",
        text: "What you learned inside a prime's operation, their pricing, their processes, their customer relationships, stays there. Compete on your own merits with your own knowledge. Using a partner's proprietary information against them is both unethical and a fast way to become someone nobody will team with.",
      },
      { type: "h2", text: "Disclose conflicts early" },
      {
        type: "p",
        text: "If you decide to bid against a prime you currently subcontract for, tell them before it becomes a surprise. A straightforward conversation, that you are pursuing a specific opportunity as a prime while remaining committed to your subcontract work, preserves trust that discovery later would destroy.",
      },
      { type: "h2", text: "Keep delivering" },
      {
        type: "p",
        text: "Your subcontract work quality is your reputation in this market. Do not let prime ambitions degrade the performance that built your name. The primes you treat well on the way up are the same ones who will team with you, refer you, and hire you again.",
      },
      {
        type: "callout",
        style: "info",
        text: "The long game in federal contracting is measured in relationships, not single wins. Bid to win, but behave like someone who plans to be in this market for a decade.",
      },
      { type: "h2", text: "A common scenario" },
      {
        type: "p",
        text: "You subcontract to Prime A on a facilities contract. A new solicitation drops from the same agency, in your exact lane, and you decide to bid it as a prime. Prime A is bidding too. The professional move is to tell your Prime A contact early, plainly, and once: you are pursuing this one directly, and your subcontract performance and commitments are unchanged. Then keep delivering flawless sub work while you compete. Most primes respect this. The ones who do not were going to be difficult anyway, and you would rather learn that from a conversation than from a burned bridge.",
      },
      {
        type: "p",
        text: "After the award, congratulate the other side and mean it, whoever wins. If you win, consider whether parts of the work suit them as your subcontractor. The wheel turns in this market, and today's rival is often next year's teammate.",
      },
    ],
  },
  {
    slug: "pro-state-local-search",
    title: "State and Local Opportunities: The Other Half of the Market",
    summary:
      "Every state, county, and city runs its own purchasing system. Here is how to find yours and build a routine around it.",
    tier: "pro",
    estMinutes: 8,
    blocks: [
      {
        type: "p",
        text: "Federal work gets the attention, but state and local governments buy enormous volumes of goods and services too: road maintenance, IT support, office supplies, custodial work, professional services. And here is the practical difference for a newcomer: competition on state and local bids is often thinner, requirements are often simpler, and you can sometimes talk to the actual buyer before you bid. Many businesses build their early track record at the state and local level, then carry that past performance into federal bidding.",
      },
      { type: "h2", text: "Every state runs its own system" },
      {
        type: "p",
        text: "There is no single SAM.gov for state procurement. Each state operates its own purchasing portal with its own registration, its own notification system, and its own rules. County and city governments add another layer: some post on the state portal, some run their own sites, and some still post in local newspapers or on a bulletin board at city hall. This sounds chaotic, and it is, but it also means most competitors never bother. The bar is effort.",
      },
      { type: "h2", text: "Finding your portals" },
      {
        type: "p",
        text: "Start with a search for your state name plus procurement opportunities or vendor registration. Most states have a central e-procurement site where agencies post solicitations and vendors register for notifications. Register as a vendor on your state's portal first, using the same business information you used for SAM.gov so everything matches. Then do the same for your county and your city if they run separate systems. School districts and transit authorities are worth checking too; they buy constantly and are often overlooked.",
      },
      {
        type: "callout",
        style: "info",
        text: "Portal names and addresses change as states modernize their systems. If a bookmark dies, search again rather than assuming the system went away. It almost certainly moved, not vanished.",
      },
      { type: "h2", text: "A weekly state and local routine" },
      {
        type: "ol",
        items: [
          "Check your state portal's new postings for your keywords, the same way you check SAM.gov.",
          "Scan your county and city postings, even the small ones. Small buys are where newcomers win first.",
          "Note any pre-bid conferences or site visits and put them on your calendar immediately.",
          "Record anything worth pursuing in your bid calendar with the same deadline discipline you use for federal bids.",
        ],
      },
      { type: "h2", text: "State certifications can be worth it" },
      {
        type: "p",
        text: "Many states run their own small business, minority-owned, women-owned, or veteran-owned certification programs, separate from the federal ones. State certifications can unlock set-aside contracts and bid preferences on state work. The applications are usually simpler than federal certifications. Check your state's procurement office site for its certification programs and decide whether the effort fits your target market. Do not assume a federal certification automatically counts at the state level; it usually does not.",
      },
      {
        type: "callout",
        style: "warn",
        text: "State and local rules vary enormously and change without much notice. Treat anything in this lesson as a starting routine, not a rulebook: always read the specific solicitation and the specific portal's instructions before you bid.",
      },
      { type: "h2", text: "Why this pairs with federal bidding" },
      {
        type: "p",
        text: "State and local wins become past performance you can cite on federal bids. The compliance habits are the same: read everything, meet every deadline, document everything. Businesses that treat a $15,000 county contract with the same seriousness as a $500,000 federal one build the track record and the discipline that win at both levels.",
      },
    ],
  },
];
