import type { Lesson } from "./types";

/**
 * Two-Year All Access tier: the long-game curriculum.
 * All procedural claims are grounded in the Sept 18, 2026 SAM.gov mechanics research.
 * Teaming, joint venture, CPARS, and debriefing material is general information only,
 * explicitly framed for attorney review where legal consequences apply. Nothing here
 * promises wins, awards, revenue, or profit.
 */
export const ALLACCESS_LESSONS: Lesson[] = [
  {
    slug: "allaccess-pipeline-math",
    title: "Pipeline math: leads, bids, wins, and revenue",
    tier: "allaccess",
    estMinutes: 10,
    summary:
      "Turn your bidding activity into simple funnel arithmetic using your own numbers, so you can size your effort for the year instead of guessing.",
    blocks: [
      { type: "h2", text: "The funnel" },
      {
        type: "p",
        text: "Every bidder has a funnel whether they track it or not. Leads become qualified opportunities, qualified opportunities become submitted bids, and submitted bids become awards. Each stage has a conversion rate, and those rates are yours, measured from your own activity, not borrowed from someone else's story.",
      },
      {
        type: "p",
        text: "The math is simple division. If you identify 60 opportunities in a year, seriously pursue 20, and win 2, your lead-to-pursuit rate is one in three and your win rate is one in ten. Those two numbers, plus the average value of the contracts you pursue, are the entire model.",
      },
      { type: "h2", text: "Your numbers, not anyone else's" },
      {
        type: "ul",
        items: [
          "Leads: every opportunity you looked at seriously enough to read the solicitation.",
          "Pursuits: leads you decided to bid after a go or no-go review.",
          "Submissions: bids you actually got in on time and complete.",
          "Wins: awards you received. Track the dollar value of each.",
        ],
      },
      {
        type: "p",
        text: "Multiply your pursuit count by your win rate and by your average contract value, and you get the rough size of the awards your current effort can support. An example, labeled clearly as arithmetic and not a prediction: a business that submits 20 bids a year, wins 10 percent, and pursues work averaging $50,000 is looking at roughly $100,000 in awards. Change any input and the output changes. The numbers are yours to plug in.",
      },
      { type: "h2", text: "Fitting your bid-kit allowance" },
      {
        type: "p",
        text: "Under this plan you can request up to 10 bid kits per 12-month period, 20 across the full 24-month term. Treat that allowance as your planning budget for pursued opportunities: it caps how many serious pursuits the membership supports, so size your lead list to feed it. If your funnel math says you need 30 pursuits a year to support your targets, you already know the gap before the year starts.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Pipeline math describes effort, not outcomes. It cannot predict what you will win, and nothing in this lesson is a promise of revenue or profit. Use it to plan how much work you are signing up for, not to project income.",
      },
      { type: "h2", text: "Start with one page" },
      {
        type: "p",
        text: "Write down last year's numbers if you have them, or this year's targets if you do not: leads, pursuits, submissions, wins, and average value. Revisit the page every quarter. The model gets more useful the longer your own history gets, because it stops being a guess and starts being a record.",
      },
    ],
  },
  {
    slug: "allaccess-forecasting-four-quarters",
    title: "Forecasting your next four quarters",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "Turn the funnel math into a rolling four-quarter plan that spreads your bidding effort across the year instead of bunching it.",
    blocks: [
      { type: "h2", text: "Why quarters" },
      {
        type: "p",
        text: "Bidding in bursts, then going quiet for months, is how opportunities get missed and deadlines get rushed. A rolling four-quarter view forces you to spread pursuits across the year and to see, one quarter ahead, whether you have enough in the pipeline to keep bidding steadily.",
      },
      { type: "h2", text: "Build the forecast" },
      {
        type: "ol",
        items: [
          "Write down how many bids you want to submit each quarter. Start from your capacity, not your ambition.",
          "List the opportunities already on your radar with their expected due dates, and assign each to a quarter.",
          "Compare the two lists. If quarter three has one opportunity and you planned six bids, you have a sourcing gap to close now, not in quarter three.",
          "Roll it forward every quarter: drop the quarter that just ended, add a new fourth quarter, and carry over anything that slipped.",
        ],
      },
      { type: "h2", text: "Leave room for amendments" },
      {
        type: "p",
        text: "Solicitations change after publication. Amendments add requirements, answer questions, and move deadlines, and a deadline that shifts from quarter two to quarter three changes your whole plan. The forecast is a living document, not a promise. Update it when the facts change.",
      },
      { type: "h2", text: "Account for your own calendar" },
      {
        type: "p",
        text: "Your business has seasons too. If your busiest delivery period eats your proposal-writing time, plan fewer pursuits that quarter on purpose. Holidays, staff vacations, and known busy spells all belong in the forecast. A plan you cannot staff is fiction, and fiction does not win bids.",
      },
      { type: "h2", text: "What to do when the forecast breaks" },
      {
        type: "p",
        text: "Forecasts break. An expected solicitation gets cancelled, a deadline jumps quarters, or a surprise opportunity appears with a three-week turnaround. When that happens, do not abandon the forecast; revise it. Move the affected pursuits, note why they moved, and check whether the change opens capacity for something else. A forecast that gets updated after every disruption stays useful. One that gets ignored after the first disruption becomes wall art.",
      },
      {
        type: "callout",
        style: "info",
        text: "Review the forecast at the same time you do your quarterly pipeline review, covered in the next lesson. One meeting, one page, once a quarter.",
      },
    ],
  },
  {
    slug: "allaccess-capacity-planning",
    title: "Capacity planning against the pipeline",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "Match your bidding plans to the people and hours you actually have, so pursuits do not collide with the work you already won.",
    blocks: [
      { type: "h2", text: "Every bid costs hours" },
      {
        type: "p",
        text: "A serious bid consumes real staff time: reading the solicitation, writing the technical approach, building the price, assembling the compliance package, and the final review sweep. Multiply that by the number of pursuits in your forecast and you have the hours your pipeline demands each quarter. Most businesses underestimate this by half, because they count only the writing and forget the reading, the pricing, and the rework.",
      },
      { type: "h2", text: "Bidding while performing" },
      {
        type: "p",
        text: "The trap is bidding hard while you are also delivering on work you already won. The same people usually do both. When a new award lands, your available bidding hours drop, and a forecast built on full availability breaks. Plan your pursuits against the hours left over after delivery, not your total hours.",
      },
      { type: "h2", text: "Do the staffing math" },
      {
        type: "ul",
        items: [
          "List who writes, who prices, and who reviews. Name names, not roles.",
          "Estimate hours per bid for each of them, based on bids you have actually done.",
          "Subtract delivery work first, then see how many pursuits fit in what remains.",
          "If the math does not fit, cut pursuits or add help before the quarter starts, not during it.",
        ],
      },
      { type: "h2", text: "Your bid-kit allowance is a natural cap" },
      {
        type: "p",
        text: "Ten bid kits per 12-month period is not just a membership feature. It is a ceiling on supported pursuits that keeps you from overcommitting. If your capacity math says you can handle eight serious pursuits this year, the allowance is not your constraint. If it says twenty, the allowance is doing you a favor by forcing focus.",
      },
      {
        type: "p",
        text: "Revisit capacity every quarter alongside the forecast. Businesses grow, staff changes, and delivery loads shift. The plan that fit in January may not fit in July, and catching that in a review is far cheaper than catching it in a missed deadline.",
      },
    ],
  },
  {
    slug: "allaccess-quarterly-reviews",
    title: "Quarterly pipeline reviews",
    tier: "allaccess",
    estMinutes: 7,
    summary:
      "A simple quarterly routine for checking what your pipeline actually did, and deciding what changes next quarter.",
    blocks: [
      { type: "h2", text: "One meeting, one page" },
      {
        type: "p",
        text: "Set aside an hour, once a quarter, with the same people who do the bidding. Bring one page: the forecast from last quarter next to what actually happened. The gap between the two is the entire agenda. Protect this meeting on the calendar; it is the first thing busy teams cancel and the last thing they should.",
      },
      { type: "h2", text: "The five numbers" },
      {
        type: "ol",
        items: [
          "Leads identified versus planned. A shortfall here is a sourcing problem.",
          "Pursuits started versus planned. A shortfall here is usually a capacity problem.",
          "Bids submitted on time. Late or abandoned bids point to process problems.",
          "Wins and losses, with the dollar values attached.",
          "No-bid reasons. Group them: eligibility, capacity, winnability. Patterns here are the most valuable output of the review.",
        ],
      },
      { type: "h2", text: "Decide, then write it down" },
      { type: "h2", text: "Bring the bid-kit record" },
      {
        type: "p",
        text: "As an All Access member, reconcile your bid-kit usage in the same meeting: how many of the period's 10 kits you requested, which solicitations they covered, and what came of each. Kits that produced no bid are worth examining. Was the opportunity wrong, or did capacity run out? The allowance is a planning budget, and the review is where you check whether you spent it well.",
      },
      {
        type: "p",
        text: "Every review should end with written decisions, not observations. Examples: narrow the NAICS codes you chase, pause bidding for a month to fix the compliance process, add a part-time proposal writer, or stop pursuing a category where you keep losing on price. Then make the next quarter's forecast reflect those decisions, so the review actually changes behavior.",
      },
      {
        type: "callout",
        style: "info",
        text: "Keep every quarter's one-pager. After a year you have a history that makes the next forecast dramatically better than the first one, because it is built on your numbers instead of your hopes.",
      },
    ],
  },
  {
    slug: "allaccess-what-evaluators-look-for",
    title: "What evaluators actually look for",
    tier: "allaccess",
    estMinutes: 10,
    summary:
      "How federal evaluators score past performance, and why relevance and proof matter more than the length of your client list.",
    blocks: [
      { type: "h2", text: "There is no single scorecard" },
      {
        type: "p",
        text: "Every solicitation publishes its own evaluation criteria, usually in Section M of the uniform contract format, with instructions to offerors in Section L. Evaluators score what is in front of them against those criteria. That means the first thing evaluators look for in your past performance is whether you followed the instructions: the right number of references, the right format, the right recency window.",
      },
      {
        type: "callout",
        style: "warn",
        text: "An offer that ignores the past performance instructions can be downgraded or thrown out regardless of how good the underlying work was. Read Section L before you write a word.",
      },
      { type: "h2", text: "Relevance beats volume" },
      {
        type: "p",
        text: "Ten references for work nothing like the solicitation lose to two references for nearly identical work. Evaluators are asking one question: has this bidder done this kind of work, at this scale, successfully? Match your references to the requirement, not to your greatest hits. A reference that mirrors the current scope is worth five impressive but unrelated ones.",
      },
      { type: "h2", text: "Recency and scale" },
      {
        type: "p",
        text: "Recent work counts more than old work, because it reflects your current team and processes. Scale matters too: a small job is weak evidence you can perform a much larger one. If your past work is smaller than the opportunity, say so plainly and show the trajectory, rather than hoping no one notices. Evaluators notice.",
      },
      { type: "h2", text: "The compliance screen comes first" },
      {
        type: "p",
        text: "Before evaluators score quality, many solicitations screen for responsiveness: was the offer on time, complete, signed where required, and formatted as instructed? Offers that fail this screen never get their past performance read at all. Treat every submission requirement as a gate, not a suggestion. The most impressive project history in the world earns zero points from an offer that arrived late.",
      },
      { type: "h2", text: "Proof, not adjectives" },
      {
        type: "p",
        text: "Evaluators cannot verify adjectives. They can verify contract numbers, agency names, periods of performance, dollar values, and points of contact. Every claim in your past performance section should be traceable to a real contract a real person can confirm. That is the whole game: make every statement checkable, and make checking it easy.",
      },
    ],
  },
  {
    slug: "allaccess-documenting-performance",
    title: "Documenting performance as you go",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "Build a project file for every contract while the details are fresh, so your past performance writes itself when you need it.",
    blocks: [
      { type: "h2", text: "Memory fades; files do not" },
      {
        type: "p",
        text: "Two years from now you will not remember the exact period of performance, the contracting officer's name, or how you solved the staffing problem in month four. Write it down now, while it is fresh, and your future proposals get stronger for free. Documentation is the cheapest proposal investment you will ever make.",
      },
      { type: "h2", text: "One file per contract" },
      {
        type: "ul",
        items: [
          "Contract number, agency and office, award date, period of performance, and dollar value.",
          "A plain-language description of the scope: what you were hired to do.",
          "The names and contact details of the contracting officer and your day-to-day client contact.",
          "Staffing: who worked on it and what they did.",
          "Problems and resolutions: what went wrong and how you fixed it. Honest entries here become your best proposal stories.",
          "Deliverables and outcomes: what you delivered, on what schedule, with what measurable result.",
        ],
      },
      { type: "h2", text: "Update it at milestones, not at the end" },
      {
        type: "p",
        text: "Add to the file when the contract starts, at each major milestone, and when it ends. A file updated three times during performance is worth ten times a file reconstructed from memory during a proposal crunch. Put the milestone updates on your calendar the day the contract starts, or they will not happen.",
      },
      { type: "h2", text: "Store it where you can find it" },
      {
        type: "p",
        text: "A project file buried in someone's email is barely better than no file at all. Keep one shared folder per contract, with the same structure every time: contract documents, correspondence, milestone notes, deliverables, and the running log. When a proposal deadline looms, you should be able to open the folder for any past contract and find the facts in minutes. Consistency in storage is what turns documentation from a chore into an asset.",
      },
      {
        type: "p",
        text: "Keep client contact details current. People change jobs, and a reference you cannot reach is a reference you do not have. A quick check-in once or twice a year keeps the relationship warm and the contact information accurate, and it costs you one email.",
      },
    ],
  },
  {
    slug: "allaccess-references-cpars",
    title: "Collecting references and CPARS awareness",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "How to line up client references you can actually use, and what to know about the government's performance evaluation system.",
    blocks: [
      { type: "h2", text: "References you can use" },
      {
        type: "p",
        text: "A reference is only useful if three things are true: the person will speak well of your work, they are reachable, and you have their permission to list them. Confirm all three before a proposal needs them, not during. Scrambling for references under a deadline is how weak references end up in strong proposals.",
      },
      {
        type: "ul",
        items: [
          "Ask at the end of a successful project, when satisfaction is highest, not two years later.",
          "Get explicit permission to use them as a reference, and confirm the phone number and email where they want to be reached.",
          "Brief them before they might be called: which contract, what scope, and what you would like them to be ready to discuss.",
          "Thank them afterward. References are favors, and favors run out.",
        ],
      },
      { type: "h2", text: "CPARS, in plain terms" },
      {
        type: "p",
        text: "CPARS, the Contractor Performance Assessment Reporting System, is the federal system where agencies record evaluations of contractor performance. If an agency evaluates your work there, that record can follow you into future competitions, because evaluators look at documented performance history when they assess risk.",
      },
      {
        type: "p",
        text: "You will not always know when an evaluation is written or what it says, which is exactly why your own project files matter. They are your independent record of what happened, regardless of what any system contains. Good documentation is your version of events, kept contemporaneously.",
      },
      { type: "h2", text: "Keep a reference log" },
      {
        type: "p",
        text: "Maintain a simple list of every reference you have permission to use: the person, their role, the contract, what they can speak to, and the date you last confirmed their contact details. Review it once a year. References go stale as people change jobs or retire, and discovering that during a proposal is a problem you scheduled for yourself. A current log means your past performance section is always one copy away from done.",
      },
      {
        type: "callout",
        style: "info",
        text: "Ask your contracting officer how your performance will be documented and evaluated. It is a normal professional question, and the answer tells you what to pay attention to during performance. Detailed CPARS procedures change over time, so treat current agency guidance as authoritative and anything you read elsewhere as background.",
      },
    ],
  },
  {
    slug: "allaccess-presenting-past-performance",
    title: "Presenting past performance in proposals",
    tier: "allaccess",
    estMinutes: 9,
    summary:
      "Turn your project files into a past performance section that matches the solicitation and gives evaluators exactly what they asked for.",
    blocks: [
      { type: "h2", text: "Start with the instructions" },
      {
        type: "p",
        text: "The solicitation tells you how many past performance references to include, what time period they must fall in, what information each one needs, and sometimes the exact format. Build your section to those instructions first. Creativity in formatting is not rewarded here; compliance is. An evaluator working through fifty offers appreciates the one that made their job easy.",
      },
      { type: "h2", text: "One reference, one story" },
      {
        type: "p",
        text: "For each reference, give the contract facts in a compact block: client, contract number, value, period of performance, and point of contact. Then tell the story in a short paragraph: what the job required, what you did, and what the outcome was. Lead with the parts that mirror the current requirement, so the relevance is obvious without the evaluator having to hunt for it.",
      },
      { type: "h2", text: "Quantify where you honestly can" },
      {
        type: "p",
        text: "Numbers beat adjectives when the numbers are real. Examples of honest quantification:",
      },
      {
        type: "ul",
        items: [
          "Delivered three weeks ahead of the required schedule.",
          "Supported 40 end users across two sites with no unplanned downtime.",
          "Completed all 12 deliverables with zero rejections.",
        ],
      },
      {
        type: "p",
        text: "Only quantify what your records support. An evaluator who checks a number and finds it inflated will doubt everything else on the page. Your project files from the last lesson are what make honest quantification possible.",
      },
      { type: "h2", text: "Address the gaps directly" },
      {
        type: "p",
        text: "If your past work is smaller than the requirement, or in an adjacent field rather than an identical one, say so and explain why it still applies. Evaluators notice gaps whether you mention them or not. Owning the gap with a straight explanation beats hoping it slides by, and it signals the maturity evaluators want to see.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Never invent, inflate, or borrow past performance. Listing work you did not do, or exaggerating your role in work you did, can kill the bid and damage your reputation with the agency permanently.",
      },
    ],
  },
  {
    slug: "allaccess-when-teaming-beats-bidding-alone",
    title: "When teaming beats bidding alone",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "The situations where pursuing an opportunity with a partner is smarter than bidding alone, and how to recognize them early.",
    blocks: [
      { type: "h2", text: "Teaming is a strategy, not a rescue" },
      {
        type: "p",
        text: "The best teams form before the solicitation drops, when both sides can shape the approach together. A partnership assembled in a panic the week before the deadline is a rescue mission, and evaluators can usually tell the difference. If you are reading this module, you are early enough to do it right.",
      },
      { type: "h2", text: "Four situations where teaming makes sense" },
      {
        type: "ul",
        items: [
          "Capability gaps: the work needs a skill or certification you do not have and cannot reasonably build before the deadline.",
          "Past performance gaps: the solicitation weights experience you cannot show yet, but a partner can.",
          "Capacity: you could perform the work but not at the required scale or speed alone.",
          "Competitive positioning: a partner's qualifications or status strengthen how the team is viewed for this particular competition.",
        ],
      },
      { type: "h2", text: "When it does not" },
      {
        type: "p",
        text: "Do not team to hide a fundamental mismatch. If you would not bid alone because the work is outside your business, adding a partner does not fix that; it just shares the mismatch. And do not give away your prime position without thinking: as a subcontractor you trade control and margin for someone else managing the prime relationship. Sometimes that trade is smart, especially while you are building experience. Make it deliberately, with the numbers in front of you.",
      },
      {
        type: "p",
        text: "Have the honest conversation with the potential partner early: who leads, who does what, and what each side gets if you win. Partners who cannot discuss roles and economics plainly before the bid will not discuss problems plainly during performance. Clarity up front is the cheapest risk management in teaming.",
      },
      {
        type: "callout",
        style: "info",
        text: "Teaming arrangements have formal rules that affect eligibility and how the bid is evaluated. The next two lessons cover the structures and the common trouble spots at a general level. None of this is legal advice; bring the specifics to an attorney before you commit to anything.",
      },
    ],
  },
  {
    slug: "allaccess-teaming-agreements-vs-joint-ventures",
    title: "Teaming agreements versus joint ventures",
    tier: "allaccess",
    estMinutes: 10,
    summary:
      "The two basic ways businesses pursue work together, what each one generally means, and why the legal structure matters.",
    blocks: [
      { type: "h2", text: "Two different structures" },
      {
        type: "p",
        text: "When businesses pursue federal work together, they generally use one of two structures. A teaming agreement is an arrangement between companies, often a prospective prime and a prospective subcontractor, to pursue a specific opportunity together. A joint venture is a separate legal entity formed by two or more businesses to bid on and perform work together.",
      },
      {
        type: "p",
        text: "Those sound similar, but the government treats them very differently. The structure you choose affects how your size is determined, whose past performance counts, who signs the bid, and who is responsible if things go wrong. Choosing the structure is a legal decision with competitive consequences, not a paperwork preference.",
      },
      { type: "h2", text: "Why the distinction matters" },
      {
        type: "ul",
        items: [
          "Size and eligibility: the rules for determining whether a team qualifies as a small business differ between teaming arrangements and joint ventures, and getting this wrong can disqualify the bid.",
          "Past performance: whose experience the government will credit depends on the structure you chose.",
          "Liability: in a joint venture, the venturers generally share responsibility for performance in ways a subcontractor relationship does not create.",
          "Control: who makes decisions, who manages the work, and who talks to the government are all defined by the structure and the written agreement behind it.",
        ],
      },
      { type: "h2", text: "General information, not legal advice" },
      {
        type: "callout",
        style: "warn",
        text: "Teaming and joint venture rules involve SBA regulations and federal acquisition rules with real consequences for getting them wrong, including disqualification. This lesson is general background only. Do not sign, form, or rely on any teaming structure based on educational content. Have a qualified attorney review your specific situation before you commit.",
      },
      {
        type: "p",
        text: "When you talk to an attorney, bring the solicitation, any draft agreement, and a clear statement of each company's size status and certifications. The attorney needs the specifics of your situation; general principles are not enough to advise you, and they are not enough for you to act on either.",
      },
    ],
  },
  {
    slug: "allaccess-teaming-rules-that-trip-people-up",
    title: "The rules that trip people up",
    tier: "allaccess",
    estMinutes: 9,
    summary:
      "The areas of teaming law and practice where small businesses most often get surprised, and what to clarify with counsel before you sign.",
    blocks: [
      { type: "h2", text: "Surprises, not rules" },
      {
        type: "p",
        text: "This lesson does not teach you the rules. The rules are detailed, they change, and applying them to your situation is legal work. Instead, here are the areas where businesses most often discover a problem after it is too late, so you know what to ask your attorney about while there is still time to fix things.",
      },
      {
        type: "ul",
        items: [
          "Who counts as the bidder for size purposes. How the government views the team can differ from how the team views itself, and the answer affects eligibility.",
          "How much work each party must actually perform. Arrangements that exist mainly on paper, with one party doing nearly everything, draw scrutiny.",
          "Exclusivity and workshare. Who does what, and whether either side can pursue the same opportunity with someone else, must be in writing before the bid goes in.",
          "What happens if the team wins and then a partner cannot perform. The agreement should answer this before the award, not after.",
          "Past performance credit. Do not assume the team's experience automatically transfers to each member for future bids as a prime.",
        ],
      },
      { type: "h2", text: "The solicitation is part of the rules" },
      {
        type: "p",
        text: "Many solicitations include their own teaming-related requirements: how team members must be identified, what documentation to submit with the offer, and limits on the arrangement itself. Read those sections as carefully as the technical requirements. A teaming structure that is fine in general can still fail a specific solicitation's instructions, and the instructions are what the evaluators score against.",
      },
      {
        type: "callout",
        style: "warn",
        text: "If a potential partner pressures you to sign quickly, without time for legal review, treat that as information about the partner. Legitimate teaming discussions survive attorney review; the ones that cannot are the ones that needed it most.",
      },
    ],
  },
  {
    slug: "allaccess-finding-the-right-partner",
    title: "Finding the right partner",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "Where to look for prime contractors and teaming partners using public directories, and how to approach them professionally.",
    blocks: [
      { type: "h2", text: "Start with the public directories" },
      {
        type: "p",
        text: "Several public directories list prime contractors and their subcontracting activity. They are prospecting lists, free to use:",
      },
      {
        type: "ul",
        items: [
          "The SBA's directory of federal prime contractors with subcontracting plans, built from federal procurement data.",
          "The GSA subcontracting directory.",
          "The Department of Defense prime contractor directory, for defense work.",
          "The Department of Transportation subcontracting directory, for transportation-related work.",
          "The SBA's SubNet board, where prime contractors post live subcontracting opportunities. It is fully public with no login, though primes currently post by emailing the SBA rather than through self-service posting.",
        ],
      },
      {
        type: "p",
        text: "All of these are starting points for research, not endorsements. A directory listing tells you a company exists and does federal work. It tells you nothing about whether they are a good partner. That part is your homework.",
      },
      { type: "h2", text: "Research before you reach out" },
      {
        type: "ul",
        items: [
          "What agencies they work with, and whether those overlap your targets.",
          "Whether they already have subcontractors doing what you do.",
          "Their size and set-aside status, which affects how a team would be viewed.",
          "Any public record of performance problems, which you want to know before your name is attached to theirs.",
        ],
      },
      { type: "h2", text: "Vet the partner like a hire" },
      {
        type: "p",
        text: "A teaming partner will carry your name into a federal competition, so evaluate them the way you would a key hire. Check their public contract history, ask for references from past teaming partners or subcontractors, and have a direct conversation about how they handle disagreements. A partner with a pattern of disputes or a reputation for squeezing subs will cost you more than any capability gap they fill. Trust the research over the pitch.",
      },
      { type: "h2", text: "The first contact" },
      {
        type: "p",
        text: "Write a short, specific introduction: who you are, what you do, which of their contracts or opportunities caught your eye, and what you propose. Prime contractors get vague partnership pitches constantly. Specificity is what gets a reply. Then follow up once, politely, and move on if there is silence. Chasing a non-responsive prime is time you could spend finding a responsive one.",
      },
    ],
  },
  {
    slug: "allaccess-legal-review-before-commit",
    title: "Getting legal review before you commit",
    tier: "allaccess",
    estMinutes: 7,
    summary:
      "How to get useful legal review of a teaming or joint venture arrangement without wasting the attorney's time or your money.",
    blocks: [
      { type: "h2", text: "Bring the attorney in early" },
      {
        type: "p",
        text: "The expensive legal problems in teaming come from agreements signed first and reviewed later. Bring the attorney in when the structure is being discussed, not after everyone has shaken hands. Early review is cheaper than dispute resolution, and it is faster than unwinding a signed agreement that does not do what you thought it did.",
      },
      { type: "h2", text: "What to bring" },
      {
        type: "ul",
        items: [
          "The solicitation, or the draft or anticipated requirements if it has not been released yet.",
          "The draft teaming agreement or joint venture agreement, even if it is rough.",
          "Each company's size status, NAICS codes, and any set-aside certifications.",
          "A plain description of who will do what work, in what proportions.",
          "Your specific questions: eligibility, structure, risk, and exit terms.",
        ],
      },
      { type: "h2", text: "What to ask" },
      {
        type: "ul",
        items: [
          "Does this structure keep us eligible for how the opportunity is competed?",
          "What happens if a partner underperforms or walks away?",
          "How do we exit the arrangement if the bid fails or the relationship sours?",
          "What does this commit us to beyond this one opportunity?",
        ],
      },
      { type: "h2", text: "Budget for it" },
      {
        type: "p",
        text: "Legal review costs money, and small businesses sometimes skip it to save a few hundred dollars on a bid worth hundreds of thousands. That is false economy. Treat attorney review as a standard cost of any teamed pursuit, budgeted alongside the proposal labor itself. If the opportunity cannot support the cost of doing it properly, that tells you something about whether you should be pursuing it at all.",
      },
      {
        type: "callout",
        style: "warn",
        text: "ContractReady is not a law firm and this product is not legal advice. Teaming and joint venture decisions should be reviewed by a qualified attorney licensed in your state before you sign anything or submit a bid as a team.",
      },
    ],
  },
  {
    slug: "allaccess-annual-compliance-calendar",
    title: "The annual compliance calendar",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "Build a single yearly calendar that holds every renewal, recertification, and maintenance deadline your contracting business depends on.",
    blocks: [
      { type: "h2", text: "One calendar for all of it" },
      {
        type: "p",
        text: "A contracting business accumulates recurring deadlines: SAM.gov renewal, certification recertifications, business licenses, insurance renewals. Missing one can pause your ability to bid or get paid. Put them all on one calendar with reminders set weeks ahead, not days, and review it as part of your quarterly routine.",
      },
      { type: "h2", text: "What goes on it" },
      {
        type: "ul",
        items: [
          "SAM.gov registration renewal, every 365 days from when your registration became active. Renewal is free on sam.gov.",
          "Set-aside certification recertifications: HUBZone requires recertification every three years, and SDVOSB certification through SBA VetCert is valid for three years.",
          "State business licenses and registrations, on their own cycles.",
          "Insurance policies: general liability, plus any bonding or coverage that your target solicitations typically require.",
          "Your capability statement and SAM.gov profile review, at least once a year.",
        ],
      },
      { type: "h2", text: "Set reminders you will actually see" },
      {
        type: "p",
        text: "SAM.gov sends renewal reminders, but reminder emails get filtered, ignored, or sent to someone who left the company. Set your own calendar reminders, with the first one at least 60 days before expiration, and assign a named person to each deadline. A deadline nobody owns is a deadline nobody meets.",
      },
      { type: "h2", text: "Assign an owner to every deadline" },
      {
        type: "p",
        text: "A calendar full of deadlines and nobody responsible for them is decoration. For each recurring item, name one person who owns it: the one who starts the renewal, files the recertification, or updates the profile. In a small business that person is often you, which is fine, as long as it is explicit. Ownership means the reminder goes to a person, the task has a due date ahead of the real deadline, and someone checks that it was done.",
      },
      {
        type: "callout",
        style: "info",
        text: "Do this once, this week: list every recurring deadline you already have, with dates, and put them on a shared calendar. The rest of this module fills in the details behind each entry.",
      },
    ],
  },
  {
    slug: "allaccess-sam-renewal-recertification",
    title: "SAM.gov renewal and certification recertification",
    tier: "allaccess",
    estMinutes: 10,
    summary:
      "How to renew your SAM.gov registration and keep your set-aside certifications current, without a last-minute scramble.",
    blocks: [
      { type: "h2", text: "SAM.gov renewal" },
      {
        type: "p",
        text: "Your SAM.gov entity registration expires 365 days after it becomes active, and renewing it is free on sam.gov. There is no paid tier and no official expedited option. Start the renewal well before the expiration date; do not assume it processes instantly.",
      },
      {
        type: "p",
        text: "Remember the two checkpoints from your Starter training: a federal rule finalized August 7, 2025 requires your registration to be active both when you submit your offer and when the contract is awarded. A registration that lapses at either point can disqualify you. The practical rule is simpler: never let it lapse at all.",
      },
      {
        type: "callout",
        style: "warn",
        text: "A lapsed registration is one of the most common reasons businesses discover, too late, that they cannot submit an offer or receive payment. Treat renewal as a business-critical deadline, not paperwork.",
      },
      { type: "h2", text: "What renewal involves" },
      {
        type: "p",
        text: "Renewal means reviewing and updating your entity information, representations and certifications, and points of contact, then resubmitting. If anything changed during the year, a new address, new contacts, new NAICS codes, update it during renewal rather than letting the record go stale. Check that your legal name and address still match your IRS records character for character, since mismatches are the number one cause of validation delays.",
      },
      { type: "h2", text: "Certification recertification" },
      {
        type: "ul",
        items: [
          "HUBZone: recertify every three years. The program also carries ongoing requirements, including the 35 percent employee residency rule, so do not treat the years between recertifications as maintenance-free.",
          "SDVOSB: certification through SBA VetCert is valid for three years.",
          "8(a): a nine-year program, not a permanent status. Plan your graduation from the program as deliberately as your entry into it.",
          "WOSB and EDWOSB: keep your certification current through the SBA or your approved certifier, and confirm which NAICS codes your certification covers before each bid.",
        ],
      },
      {
        type: "p",
        text: "Certification rules change. The August 2026 SBA rule that removed the rebuttable presumption of social disadvantage for 8(a) is a reminder that program requirements are not frozen. Before any recertification or new application, check the SBA's current guidance rather than relying on what was true last year.",
      },
    ],
  },
  {
    slug: "allaccess-updating-capability-statements",
    title: "Updating capability statements and registrations",
    tier: "allaccess",
    estMinutes: 7,
    summary:
      "Keep your capability statement, SAM.gov profile, and directory listings current as your business grows, so buyers always see the real you.",
    blocks: [
      { type: "h2", text: "Review once a year, minimum" },
      {
        type: "p",
        text: "Put a recurring annual task on your compliance calendar: review everything a buyer or contracting officer might read about you. Your SAM.gov entity profile, your capability statement, and any directory listings. Outdated information does not just look sloppy; it can misrepresent your size, capabilities, or contacts at the exact moment someone is deciding whether to call you.",
      },
      { type: "h2", text: "What to update" },
      {
        type: "ul",
        items: [
          "NAICS codes: add codes for new lines of business, remove ones you no longer pursue. Your codes drive size standards and set-aside eligibility.",
          "Points of contact: names, titles, emails, and phone numbers that actually get answered.",
          "Past performance: add completed contracts, remove ancient ones that no longer reflect your business.",
          "Certifications: list only current ones, with accurate dates.",
          "Capability statement: refresh differentiators, client lists, and contact details. One page, current, honest.",
        ],
      },
      { type: "h2", text: "Consistency across sources" },
      {
        type: "p",
        text: "Your SAM.gov profile, your capability statement, and your website should tell the same story about what you do and how to reach you. Inconsistencies make evaluators and potential partners do extra work, and extra work rarely helps you. When you change one source, change them all in the same week.",
      },
      { type: "h2", text: "The one-page discipline" },
      {
        type: "p",
        text: "A capability statement earns its keep by being read, and it gets read because it is one page. Every update is a chance to cut as well as add: remove the service line you no longer offer, the certification that expired, the contact who left. A dense two-pager that nobody finishes loses to a sharp one-pager that gets remembered. If everything feels essential, that is a sign to clarify your positioning, not to shrink the font.",
      },
      {
        type: "p",
        text: "When you update SAM.gov information, allow time for the changes to process before you need the record to be current. Do not make profile changes the week before a major submission if you can avoid it.",
      },
    ],
  },
  {
    slug: "allaccess-planning-next-certification",
    title: "Planning your next certification",
    tier: "allaccess",
    estMinutes: 9,
    summary:
      "How to decide which set-aside certification to pursue next, and how to plan around realistic timelines.",
    blocks: [
      { type: "h2", text: "Certifications are investments" },
      {
        type: "p",
        text: "Each certification costs time and attention: applications, documentation, waiting periods, and ongoing compliance. Pursue the one that matches your business reality, not the one with the best reputation. A certification you cannot maintain is worse than no certification, because it creates obligations you will not meet.",
      },
      { type: "h2", text: "The current timelines, as stated by the programs" },
      {
        type: "ul",
        items: [
          "8(a): nine-year program with a 90-day stated decision target. Note the 2026 rule change: SBA now applies a race-neutral, evidence-based test for individually owned firms.",
          "HUBZone: 60 calendar-day statutory decision target, with a 10 percent price preference once certified. Requires your principal office and 35 percent of employees in a HUBZone.",
          "SDVOSB: certification through SBA VetCert with roughly 30-day stated decisions and three-year validity. Self-certification ended in 2024, so certification is now required.",
          "WOSB and EDWOSB: 90-day stated decision target through the SBA or an approved third-party certifier, limited to SBA-authorized NAICS codes.",
        ],
      },
      {
        type: "p",
        text: "Businesses pursuing certifications alongside their first bids should plan on a 3 to 9 month horizon before they are certified and bidding with the advantage in hand. Start the application before you need the certification, not when an opportunity requires it. Certifications reward the prepared, not the hurried.",
      },
      {
        type: "p",
        text: "Time your applications around your bidding calendar. An application submitted during your quietest quarter costs you less in diverted attention than one filed in the middle of three proposal deadlines. Certification work is real work; schedule it like any other project, with an owner and a deadline.",
      },
      { type: "h2", text: "One at a time" },
      {
        type: "p",
        text: "Do not apply for three certifications simultaneously while also bidding. Each application pulls the same people and the same documents. Sequence them: the certification most aligned with your target opportunities first, then the next. Your compliance calendar keeps the sequence honest and your team sane.",
      },
      {
        type: "callout",
        style: "info",
        text: "Program rules change. Confirm current requirements on sba.gov before applying. This lesson reflects the programs as documented in September 2026.",
      },
    ],
  },
  {
    slug: "allaccess-win-rates-adjusting-strategy",
    title: "Reviewing win rates and adjusting strategy",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "Use your own bidding history to decide what to pursue more of, what to stop pursuing, and what to fix.",
    blocks: [
      { type: "h2", text: "Your history is the strategy input" },
      {
        type: "p",
        text: "After a year or two of bidding, you own something no consultant can sell you: your own record of what you bid, what you won, and why you lost. Strategy for year two should be built on year one's data, not on year one's guesses. This is what the quarterly reviews have been building toward.",
      },
      { type: "h2", text: "Cut the data three ways" },
      {
        type: "ul",
        items: [
          "By opportunity type: which NAICS codes, agencies, and contract sizes produce your wins? Which produce only losses?",
          "By loss reason: price, past performance, technical approach, or non-compliant submission. Your debrief notes are the source here.",
          "By effort: which bids consumed the most hours relative to their value? A win that cost more to pursue than it was worth is a lesson, not a victory.",
        ],
      },
      { type: "h2", text: "The three adjustments" },
      {
        type: "p",
        text: "Most strategy reviews end in some version of three moves. Pursue more of what wins: double down on the categories where your win rate justifies the effort. Stop pursuing what does not: a category with a near-zero win rate after real effort is a donation, not a strategy. Fix what is fixable: if losses cluster on proposal quality or compliance errors, that is a process investment, not a targeting problem.",
      },
      { type: "h2", text: "Write the strategy down" },
      {
        type: "p",
        text: "A strategy that lives in someone's head does not survive staff changes, busy quarters, or the temptation of a shiny but off-target opportunity. Write the conclusions of your review in a page or two: what you will pursue, what you will stop pursuing, and what you will fix. Revisit it each quarter. The written strategy is also what keeps the next go or no-go decision honest, because the criteria were set before the opportunity showed up.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Do not confuse activity with progress. Ten more bids in a category where you have never been competitive is not a growth plan. The data tells you where your effort pays; listen to it.",
      },
    ],
  },
  {
    slug: "allaccess-sources-sought-notices",
    title: "Responding to sources-sought notices",
    tier: "allaccess",
    estMinutes: 9,
    summary:
      "What sources-sought notices are, why agencies publish them, and how a strong response gets your business noticed before the competition starts.",
    blocks: [
      { type: "h2", text: "Market research, published openly" },
      {
        type: "p",
        text: "Before an agency decides how to compete a requirement, it often publishes a sources-sought notice on SAM.gov to ask the market a question: who can do this work? It is not a solicitation and there is nothing to bid on yet. It is the agency doing homework in public, and it wants to hear from you.",
      },
      {
        type: "p",
        text: "Your response is a capability statement tailored to the notice: who you are, what relevant work you have done, and a direct answer to whatever the notice asks. Read the notice carefully; it tells you exactly what information to send and where to send it. Answer what was asked, nothing more, nothing less.",
      },
      { type: "h2", text: "Why bother, if there is no contract yet" },
      {
        type: "ul",
        items: [
          "It puts your name and capabilities in front of the buying office before the solicitation is written.",
          "Your response can influence how the requirement is competed, including whether it is set aside for small businesses.",
          "It is free market intelligence: the notice describes what the agency wants to buy and when.",
          "A pattern of thoughtful responses builds your reputation with that office over time.",
        ],
      },
      { type: "h2", text: "How to find them" },
      {
        type: "p",
        text: "Sources-sought notices are a SAM.gov notice type, listed alongside solicitations, award notices, and the other notice types. All notice metadata, descriptions, and contact details are public without a login. If you want to follow an opportunity or save searches with email alerts, that part requires a SAM.gov login.",
      },
      {
        type: "callout",
        style: "info",
        text: "Respond to every sources-sought notice you genuinely qualify for in your target agencies. It costs little, it is never held against you, and it is one of the few moments in federal contracting when the buyer is explicitly asking to hear from you.",
      },
    ],
  },
  {
    slug: "allaccess-industry-days",
    title: "Industry days and pre-proposal conferences",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "How to get value from the events where agencies explain what they want to buy before they buy it.",
    blocks: [
      { type: "h2", text: "The buyer, explaining itself" },
      {
        type: "p",
        text: "Agencies sometimes hold industry days, pre-proposal conferences, or site visits around upcoming or live solicitations. The format varies: a presentation on the requirement, a question-and-answer session, sometimes one-on-one meetings. The solicitation or its notices announce them, with the date, location, and any registration instructions.",
      },
      { type: "h2", text: "Why attend" },
      {
        type: "ul",
        items: [
          "You hear the requirement explained in the buyer's own words, which often clarifies what the written documents leave ambiguous.",
          "Questions from other attendees reveal how competitors are reading the opportunity.",
          "You meet the buying office and potential teaming partners face to face.",
          "For site visits, you see the actual place of performance, which no document fully conveys.",
        ],
      },
      { type: "h2", text: "How to attend well" },
      {
        type: "ul",
        items: [
          "Read the solicitation first. Good questions come from preparation, not from the room.",
          "Ask the questions that matter to your bid decision, not questions that advertise your strategy.",
          "Take notes on answers; agencies sometimes clarify requirements verbally that later appear in amendments.",
          "Follow up with the contacts you make while the event is fresh.",
        ],
      },
      { type: "h2", text: "After the event" },
      {
        type: "p",
        text: "The value of an industry day decays fast if you do nothing with it. Within a few days, write up your notes while they are fresh: what the agency emphasized, which questions revealed competitive thinking, and who you met. Send brief follow-up messages to the contacts you made, referencing something specific from the conversation. Log the event in your agency relationship map, covered in the last lesson of this module. Attendance without follow-up is tourism; attendance with notes and follow-up is business development.",
      },
      {
        type: "p",
        text: "Not every opportunity has an event, and attendance is rarely mandatory. Treat industry days as high-value optional intelligence: go when the opportunity justifies the time, especially for larger or unfamiliar requirements where misunderstanding the scope is expensive.",
      },
    ],
  },
  {
    slug: "allaccess-debriefings",
    title: "Debriefings: learning from every loss",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "How to request and use post-award debriefings so every lost bid makes the next one stronger.",
    blocks: [
      { type: "h2", text: "The most underused free resource" },
      {
        type: "p",
        text: "After an award is made, unsuccessful offerors can typically request a debriefing: a conversation in which the agency explains how your offer was evaluated. Many small businesses never ask. Those that do get something no training course provides: the buyer's own account of why you lost, in their words.",
      },
      { type: "h2", text: "Ask promptly and prepare" },
      {
        type: "p",
        text: "Request the debriefing soon after you learn of the award; these conversations happen in a short window after the decision. Go in with specific questions prepared: how did the evaluators view your technical approach, where did your past performance fall short, and how did your price compare? Vague questions get vague answers.",
      },
      { type: "h2", text: "Listen like an analyst, not a litigant" },
      {
        type: "ul",
        items: [
          "Write down everything. Debriefings are intelligence-gathering, not arguments.",
          "Do not dispute the evaluation in the room. You will not change the award, and you will close off the candor.",
          "Ask what a winning offer did differently, in general terms.",
          "Thank them. The contracting officer who debriefs you today may evaluate your next bid.",
        ],
      },
      { type: "h2", text: "Turn it into process" },
      {
        type: "p",
        text: "After each debriefing, add the findings to your project records and your quarterly review: was this loss about price, past performance, technical approach, or compliance? Patterns across debriefings are your strategy talking to you. A business that debriefs every loss learns faster than one that only remembers the sting.",
      },
      {
        type: "p",
        text: "Share the findings with everyone who touches proposals, not just the person who attended. A debriefing that stays in one person's notebook helps one person. A debriefing written up and discussed in a team meeting changes how the next proposal gets built. Make the write-up a standard step, due within a week of the debriefing.",
      },
      {
        type: "callout",
        style: "info",
        text: "Debriefing procedures and timelines vary by agency and acquisition type. If a notice or award letter mentions debriefing instructions, follow them exactly.",
      },
    ],
  },
  {
    slug: "allaccess-agency-relationship-map",
    title: "Building an agency relationship map",
    tier: "allaccess",
    estMinutes: 8,
    summary:
      "Track every agency office, contracting officer, and prime contractor you interact with, and turn scattered contacts into a relationship asset.",
    blocks: [
      { type: "h2", text: "Reputation compounds" },
      {
        type: "p",
        text: "Over two years of steady bidding, you will interact with the same agency offices, the same contracting officers, and the same prime contractors repeatedly. Businesses that win steadily are often simply the ones those buyers already know. A relationship map makes that familiarity deliberate instead of accidental.",
      },
      { type: "h2", text: "What to track" },
      {
        type: "ul",
        items: [
          "Agency, office, and program: who buys what you sell.",
          "Contracting officers and specialists: names, contact details, and which solicitations they ran.",
          "Every touchpoint: sources-sought responses, industry days attended, bids submitted, debriefings received.",
          "Prime contractors: who you met, what they buy from subs, and the status of each conversation.",
          "Notes on preferences and patterns: how an office communicates, what it seems to value.",
        ],
      },
      { type: "h2", text: "Work the map" },
      {
        type: "p",
        text: "Before pursuing a new opportunity, check the map: have you bid to this office before? Did you debrief with them? Do you know a prime already working there? A warm introduction or a remembered name at the top of your cover letter is a small edge, and small edges accumulate over two years of bidding.",
      },
      {
        type: "p",
        text: "Keep the map current and keep it honest. Log losses as carefully as wins; the offices where you lost twice are telling you something about fit. And keep every entry factual and professional: this is a business record, and it should read like one.",
      },
      { type: "h2", text: "Review it quarterly" },
      {
        type: "p",
        text: "A relationship map that nobody looks at is a contact list. Review it in your quarterly pipeline review: which offices are heating up, which relationships have gone cold, and where your next sources-sought responses and industry day visits should focus. Cold relationships are not failures; they are a to-do list. One thoughtful check-in per quarter with each key contact keeps the map alive and your name familiar.",
      },
      {
        type: "callout",
        style: "info",
        text: "A simple spreadsheet is enough to start. The value is not in the tool but in the habit: every interaction logged, every quarter reviewed.",
      },
    ],
  },
];
