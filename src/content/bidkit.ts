import type { Lesson } from "./types";

/**
 * Bid Kit tier: the full lesson curriculum for understanding, qualifying,
 * and responding to live federal solicitations.
 * All procedural claims are grounded in the Sept 18, 2026 SAM.gov mechanics
 * research. Anything beyond that research is framed as general guidance,
 * not as a verified procedural fact.
 */
export const BIDKIT_LESSONS: Lesson[] = [
  {
    slug: "bidkit-anatomy",
    title: "Anatomy of a bid kit",
    tier: "bidkit",
    estMinutes: 8,
    summary:
      "What a ContractReady bid kit contains, what each part is for, and how the parts fit together when you sit down to work a live opportunity.",
    blocks: [
      { type: "h2", text: "An educational package, not a done-for-you bid" },
      {
        type: "p",
        text: "A ContractReady bid kit takes one live solicitation and turns it into a plain-language action plan. It summarizes and organizes what the government is asking for so you can understand the opportunity and decide what to do. It does not write your proposal, it does not submit anything for you, and it does not make decisions on your behalf. Every final representation, certification, pricing decision, and submission is yours. That boundary is worth internalizing before you read another word of this curriculum, because it shapes how you should use everything a kit gives you.",
      },
      { type: "h2", text: "The five parts of a kit" },
      {
        type: "ul",
        items: [
          "Opportunity summary: who is buying, what they want, the key dates, the set-aside and NAICS classification, and where the work happens. This is the two-minute orientation that tells you whether the opportunity is worth a deeper look.",
          "Eligibility and qualification checkpoints: the gates you must pass to be a legitimate bidder, translated from solicitation language into plain questions you can answer yes or no to.",
          "Requirements checklist: every substantive thing the solicitation asks for, extracted from the instructions and the statement of work, in the order you should handle them.",
          "Compliance matrix: a table that maps each requirement to the place in your response where you address it. You will use it while drafting and again in your final sweep before submission.",
          "Submission timeline: the deadlines from the solicitation, worked backward into a schedule with buffer time for drafting, review, pricing, and the actual submission.",
        ],
      },
      { type: "h2", text: "How the parts work together" },
      {
        type: "p",
        text: "Start with the summary and the eligibility checkpoints. Those two parts answer the only question that matters first: should I spend any more time on this. If the answer is yes, the requirements checklist becomes your project plan, the timeline tells you when each piece is due, and the compliance matrix keeps you honest as you draft. At the end, the matrix flips into a verification tool: walk every row and confirm your response actually addresses it before you submit.",
      },
      {
        type: "callout",
        style: "info",
        text: "A kit organizes the solicitation. It never replaces it. The official solicitation and its amendments always control. If anything in a kit and the solicitation disagree, the solicitation wins, every time.",
      },
    ],
  },
  {
    slug: "bidkit-opportunity-summary",
    title: "Reading the opportunity summary",
    tier: "bidkit",
    estMinutes: 10,
    summary:
      "How to read every field on a SAM.gov notice page, from the Notice ID to the contact information, so a summary tells you in minutes whether an opportunity fits.",
    blocks: [
      { type: "h2", text: "Every notice page speaks the same language" },
      {
        type: "p",
        text: "Every Contract Opportunities notice on SAM.gov uses the same structure, and once you learn the fields, you can size up any opportunity in a few minutes. Everything described here is public: no login is needed to read notice pages, search, or see contact information. Here is what each section tells you.",
      },
      { type: "h2", text: "The header: what and who" },
      {
        type: "ul",
        items: [
          "Title and the Active or Inactive badge: is this opportunity currently open.",
          "Notice ID: the solicitation number shown prominently, like FA483026Q0032. This is the number everyone refers to, but it is not the web address of the page.",
          "Department, agency, subtier, major command, office: the buying organization, from the top level down to the office running the buy. Knowing the office matters because agencies buy in patterns you can learn.",
          "Related Notice: links to connected notices, useful when a solicitation grew out of an earlier sources-sought or presolicitation notice.",
        ],
      },
      { type: "h2", text: "General information: the clock" },
      {
        type: "ul",
        items: [
          "Contract Opportunity Type: solicitation, combined synopsis and solicitation, presolicitation, sources sought, special notice, or award notice. Each type means something different about how close the government is to buying.",
          "Original Published Date and Original Date Offers Due: when it posted and the deadline as originally set.",
          "Inactive Policy: how the notice expires, for example manual removal or a set number of days after the due date.",
        ],
      },
      { type: "h2", text: "Classification: can you bid" },
      {
        type: "ul",
        items: [
          "Original Set Aside: who is allowed to compete, for example a total small business set-aside. If you do not qualify for the set-aside, this is a fast no.",
          "PSC and NAICS codes with descriptions: what the government thinks it is buying and the industry classification. The NAICS code drives size standards, so check it against your registrations.",
          "Place of Performance: city, state, and ZIP where the work happens. It can be blank, and when it is, the solicitation documents usually clarify.",
        ],
      },
      { type: "h2", text: "Description, contacts, and history" },
      {
        type: "p",
        text: "The Description section carries the full requirement narrative in rich text. Contact Information lists the contracting office address plus primary and secondary points of contact with names, titles, phone numbers, and email addresses. The History section is a versioned list of everything that has happened to the notice, including amendments, each with a timestamp. When you are deciding whether to pursue, the history tells you at a glance whether the opportunity has been amended and how the deadline has moved.",
      },
      {
        type: "p",
        text: "One more field worth knowing: the web address of a notice page contains a long identifier that is not the Notice ID and cannot be guessed from it. You reach notices through search results or links, not by typing the solicitation number into the address bar.",
      },
      {
        type: "callout",
        style: "info",
        text: "Award notices use the same page structure and add the award number, award amount, award date, and the awardee's name, address, and UEI. They are public, and they are how you research who already wins the kind of work you want.",
      },
    ],
  },
  {
    slug: "bidkit-compliance-matrix",
    title: "Using the compliance matrix",
    tier: "bidkit",
    estMinutes: 8,
    summary:
      "How to build and use the table that maps every solicitation requirement to the exact place your response addresses it.",
    blocks: [
      { type: "h2", text: "What it is" },
      {
        type: "p",
        text: "A compliance matrix is a simple table. The left column lists every requirement the solicitation places on your response: documents to include, forms to sign, sections to write, certifications to make, formatting rules to follow. The right column records where in your response each requirement is addressed: page number, section heading, or attachment name. That is the whole idea, and it is one of the highest-value habits in bidding because it turns a long, intimidating solicitation into a finite list of checkable items.",
      },
      { type: "h2", text: "Building one from a kit" },
      {
        type: "ol",
        items: [
          "Start from the requirements checklist in your bid kit. Each checklist item becomes one row in the matrix.",
          "Add the instructions-section requirements separately: page limits, file formats, copies, signatures, and submission method. These are the items most often missed because they are not about the work itself.",
          "For each row, note the source: the section of the solicitation it came from. When an amendment arrives, you can check whether it touched any row.",
          "Leave the right column blank until you draft. As you write, fill in where each requirement is answered.",
        ],
      },
      { type: "h2", text: "Using it twice" },
      {
        type: "p",
        text: "Use the matrix first while drafting, as a guide that keeps you from forgetting requirements buried in the middle of long sections. Use it a second time right before submission, as a verification sweep: read every row in the left column, find the answer in your response, and confirm it is really there. Any row with a blank right column is a defect you caught before the government did. Evaluators do not give partial credit for requirements you forgot.",
      },
      {
        type: "callout",
        style: "warn",
        text: "The matrix is only as good as its left column. If a requirement never made it into the matrix, the sweep will not catch it. That is why the first pass, extracting every requirement from the solicitation and its attachments, is the most important step.",
      },
    ],
  },
  {
    slug: "bidkit-kit-limits",
    title: "What the kit cannot do for you",
    tier: "bidkit",
    estMinutes: 6,
    summary:
      "The plain-language boundaries of a ContractReady bid kit: what is never included, what stays your responsibility, and why those limits protect you.",
    blocks: [
      { type: "h2", text: "The boundary list" },
      {
        type: "p",
        text: "A bid kit is an educational package. It summarizes, organizes, and explains. The following are never part of a kit, and understanding why will save you from expecting something the product is not designed to be.",
      },
      {
        type: "ul",
        items: [
          "No proposal writing or review. The kit helps you understand what to write; the words, the pricing, and the technical approach are yours.",
          "No legal, tax, accounting, or financial advice. Anything that looks like a legal or financial judgment in your response needs a qualified professional, not a kit.",
          "No certifications or representations made on your behalf. When a solicitation asks you to attest to something, only you can sign it.",
          "No submission of anything. You submit your own registration, bid, quote, proposal, or certification, through the channel the solicitation specifies.",
          "No representation before an agency. The kit does not speak to contracting officers for you.",
          "No phone or text-message support. Guidance runs through the member portal in writing, so there is a record of what was said.",
          "No guarantee of anything: not registration approval, not eligibility, not responsiveness, not award, not revenue, not profit.",
        ],
      },
      { type: "h2", text: "Why the limits exist" },
      {
        type: "p",
        text: "These limits are not the product being unhelpful. They are the product staying in its lane. A company that writes your proposal for you, certifies things on your behalf, or submits bids under your name is taking on legal and ethical exposure that would eventually land on you. The businesses that last in federal contracting are the ones that understand their own bids. The kit is built to make you that kind of bidder, not to make you dependent on it.",
      },
      { type: "h2", text: "Your responsibility, stated once clearly" },
      {
        type: "p",
        text: "You read the complete official solicitation, including every amendment and attachment. You make every final representation, certification, and pricing decision. You submit. The kit makes each of those steps clearer and less error-prone, but it never takes them over.",
      },
    ],
  },
  {
    slug: "bidkit-ucf",
    title: "The uniform contract format, section by section",
    tier: "bidkit",
    estMinutes: 10,
    summary:
      "The standard A through M structure of a federal solicitation, what lives in each section, and which sections actually decide whether you should bid.",
    blocks: [
      { type: "h2", text: "One structure, reused everywhere" },
      {
        type: "p",
        text: "Most federal solicitations follow the same standard layout, sections labeled A through M. It exists so that bidders and contracting officers always know where to find things. Learn it once and every solicitation you ever open will feel familiar. Two honest caveats: not every solicitation uses every section, and simplified or commercial-item buys often use a shorter format. The section letters still mean the same things wherever they appear.",
      },
      { type: "h2", text: "The sections, in order" },
      {
        type: "ul",
        items: [
          "Section A, the form: the cover page of the buy, identifying the solicitation number, the issuing office, and the offer due date.",
          "Section B, supplies or services and prices: what is being bought and how pricing should be structured.",
          "Section C, description, specifications, or statement of work: what the government actually wants done. This is the heart of the buy. Read it slowly.",
          "Section D, packaging and marking: how deliverables should be packaged and labeled. Often short, occasionally decisive.",
          "Section E, inspection and acceptance: how the government will check your work and what counts as acceptable.",
          "Section F, deliveries or performance: when and where the work happens, including period of performance and delivery schedules.",
          "Section G, contract administration data: invoicing, payment, and accounting instructions.",
          "Section H, special contract requirements: anything unusual about this particular buy that did not fit elsewhere.",
          "Section I, contract clauses: the legal terms incorporated by reference or in full. Long, but skim for anything that changes your cost or risk.",
          "Section J, list of attachments: the index of everything appended to the solicitation. Treat this as your inventory checklist.",
          "Section K, representations, certifications, and statements of offerors: what you must attest to about your business. Only you can sign these.",
          "Section L, instructions, conditions, and notices to offerors: how to build and submit your offer. This section controls your submission.",
          "Section M, evaluation factors for award: how the government will pick the winner. This section controls your strategy.",
        ],
      },
      { type: "h2", text: "Where to spend your reading time" },
      {
        type: "p",
        text: "For the go or no-go decision, read C, L, and M first, in that order: what they want, how to submit, how they choose. For drafting, live in C and L. For pricing, B, F, and I tell you what drives cost. Everything else is reference material you consult when a question comes up. New bidders go wrong by reading A through M linearly and running out of attention before they reach the sections that matter.",
      },
    ],
  },
  {
    slug: "bidkit-section-lm",
    title: "Section L and Section M: instructions and evaluation",
    tier: "bidkit",
    estMinutes: 9,
    summary:
      "Why Section L controls whether your bid survives and Section M controls whether it wins, and the habit of reading M before L.",
    blocks: [
      { type: "h2", text: "L tells you how to bid; M tells you how to win" },
      {
        type: "p",
        text: "Section L contains the instructions for preparing and submitting your offer: what to include, how to organize it, page limits, file formats, copies, signatures, and where and when to send it. Section M contains the evaluation factors: what the government will score, how the factors are weighted, and how the award decision gets made. L is about compliance. M is about competition. You need both, and confusing them is one of the most common beginner mistakes.",
      },
      { type: "h2", text: "Read M first" },
      {
        type: "p",
        text: "It feels backwards, but read the evaluation factors before the instructions. M tells you what the government actually cares about, which tells you where to put your effort. If M says past performance is significantly more important than price, your energy goes into documenting experience, not shaving margin. If M says award goes to the lowest priced technically acceptable offer, you know fancy extras will not help and compliance plus price will. Once M has told you the game, L tells you the rules for playing it.",
      },
      { type: "h2", text: "What to extract from each" },
      {
        type: "ul",
        items: [
          "From M: every evaluation factor, its relative importance, and whether award is best-value tradeoff or lowest-price technically acceptable. Map each factor to a section of your proposal.",
          "From L: every formatting and submission requirement, each as a row in your compliance matrix. Miss one and your proposal can be rejected before anyone scores it.",
          "From both: anything ambiguous. If L and M seem to ask for different things, that is a candidate for a question to the contracting officer during the question and answer period, not something to guess at.",
        ],
      },
      {
        type: "callout",
        style: "warn",
        text: "A compliant proposal that ignores M loses to a weaker writer who answered what the evaluators were scoring. A brilliant proposal that ignores L never gets scored at all. Most new-bidder failures are L failures, not M failures: they were disqualified on instructions, not outscored on merit.",
      },
    ],
  },
  {
    slug: "bidkit-attachments",
    title: "Finding the real requirements buried in attachments",
    tier: "bidkit",
    estMinutes: 8,
    summary:
      "Why the statement of work usually lives in the attachments, how to inventory every file, and the login rule for restricted attachments.",
    blocks: [
      { type: "h2", text: "The notice page is the cover; the attachments are the book" },
      {
        type: "p",
        text: "The SAM.gov notice page gives you the metadata: title, dates, set-aside, NAICS, contacts. But the substantive requirements, the statement of work, the drawings, the pricing templates, the past-performance questionnaires, usually live in the attachments. Section J of the solicitation lists them. Bidders who read only the notice page are bidding on a summary of a summary. Download everything, then read. Pay special attention to the statement of work or performance work statement, which is where the government describes the actual job in detail, and to any pricing schedule, which dictates exactly how your price must be broken out.",
      },
      { type: "h2", text: "Inventory first" },
      {
        type: "ol",
        items: [
          "List every attachment from Section J with its file name and stated purpose.",
          "Download each one and confirm it opens. Corrupt or unreadable files happen; discovering that the night before the deadline is a disaster.",
          "Note which attachments are for your information and which ones you must fill out, sign, or return with your offer. Pricing schedules and representation forms almost always come back with the proposal.",
          "Add every return-with-offer attachment as a row in your compliance matrix.",
        ],
      },
      { type: "h2", text: "The login rule" },
      {
        type: "p",
        text: "Most attachments are public, but some notices restrict theirs. The notice will say so plainly, with language like access to the attachments will require an active SAM.gov vendor registration with login. If you hit that wall, it is a sign to get your registration in order, not a dead end. And it is one more reason the Starter curriculum puts registration before bidding: you do not want to discover a locked attachment on a solicitation you otherwise could have won.",
      },
      {
        type: "callout",
        style: "info",
        text: "When a solicitation is amended, attachments change too. Re-download the full set after every amendment and check file names and dates against your inventory. Working from a superseded statement of work is the same as not reading it.",
      },
    ],
  },
  {
    slug: "bidkit-amendments",
    title: "Amendments: how to track changes without missing one",
    tier: "bidkit",
    estMinutes: 7,
    summary:
      "How solicitation amendments work, where they appear on the notice page, and the tracking habit that keeps you bidding on the current version.",
    blocks: [
      { type: "h2", text: "Solicitations change after publication" },
      {
        type: "p",
        text: "After a solicitation posts, the government can amend it: extend the deadline, answer bidder questions, clarify requirements, add or remove work, change attachments. Amendments are numbered and each one becomes part of the official solicitation. Bidding against an outdated version, working from the original deadline after it moved, or missing a new requirement added in a later amendment, is an automatic loss that has nothing to do with how good your proposal was. Amendments also frequently arrive in response to bidder questions, which means the question and answer period is worth participating in: other bidders' questions often surface ambiguities you had not noticed.",
      },
      { type: "h2", text: "Where amendments live" },
      {
        type: "p",
        text: "On the SAM.gov notice page, the History section keeps a versioned list of everything that has happened to the notice, with timestamps for each entry, including solicitation updates. That is your source of truth for whether anything has changed. Some notices also let you follow or watch the opportunity for notifications, but that requires a login, so do not rely on it as your only method.",
      },
      { type: "h2", text: "The tracking habit" },
      {
        type: "ul",
        items: [
          "Check the notice history on a fixed schedule while you are working a bid: at minimum when you start, halfway through drafting, and in the final 48 hours.",
          "Every time you check, compare the amendment count and the due date against what you recorded last time. If either changed, re-download the full attachment set.",
          "Log each amendment in your bid file with its number, date, and what it changed. If the solicitation requires you to acknowledge amendments in your offer, and many do, this log becomes the evidence you did.",
          "Build amendment checks into your submission timeline as explicit tasks, not as something you will remember to do.",
        ],
      },
      {
        type: "callout",
        style: "warn",
        text: "Amendments can arrive days before the deadline. A question-and-answer round near the close can add requirements with very little time to respond. Your timeline needs buffer at the end precisely because the solicitation is allowed to change underneath you.",
      },
    ],
  },
  {
    slug: "bidkit-eligibility",    title: "Eligibility: set-asides, clearances, and certifications",
    tier: "bidkit",
    estMinutes: 11,
    summary:
      "The three eligibility gates that decide whether you are allowed to bid at all: set-aside qualification, registration standing, and any clearance or certification the solicitation demands.",
    blocks: [
      { type: "h2", text: "Gate one: the set-aside" },
      {
        type: "p",
        text: "The notice's Classification section names the set-aside, and it is a hard gate. A total small business set-aside means only small businesses may compete; an 8(a) or HUBZone set-aside means only certified firms in that program. If you do not hold the status named, stop here. No amount of proposal quality overrides it. The main programs, in brief: 8(a) is a nine-year business development program with a stated 90-day decision target on applications. HUBZone requires your principal office and at least 35 percent of employees in a historically underutilized zone, carries a 10 percent price preference, has a 60 calendar-day statutory decision target, and requires recertification every three years. Service-disabled veteran-owned certification runs through the SBA's VetCert system since January 2023 with roughly 30-day decisions and three-year validity, and self-certification for that status ended in late 2024. Women-owned and economically disadvantaged women-owned certifications carry a 90-day stated decision target and apply only to SBA-authorized NAICS codes.",
      },
      {
        type: "p",
        text: "Two warnings. First, program rules change: treat the figures above as orientation, not as current procedure, and check the SBA's current guidance before you plan around any of them. Second, certifications take months, not weeks. A business pursuing set-aside certifications should plan on a 3 to 9 month zero-to-first-bid timeline. Starting a certification application the week a set-aside solicitation closes is planning to fail.",
      },
      { type: "h2", text: "Gate two: your registration standing" },
      {
        type: "p",
        text: "Your SAM.gov entity registration must be active when you submit your offer and again when the award is made. Check both before you invest in a bid: an expired registration discovered at submission time kills the bid, and one discovered at award time can kill the win. Renewal is free and yearly, on a 365-day cycle, so there is no reason to let it lapse except inattention.",
      },
      { type: "h2", text: "Gate three: clearances and special qualifications" },
      {
        type: "p",
        text: "Some solicitations require security clearances, specific licenses, or certifications as a condition of bidding. As general guidance: if the solicitation requires a facility or personnel clearance you do not hold, that is usually a no-go for prime bidding, because clearances cannot be obtained on a bidding timeline. The honest alternatives are to pursue the work as a subcontractor to a cleared prime, or to skip it and bid on work that matches the qualifications you actually have. Anything involving legal or regulatory interpretation of what a solicitation demands is general information here, not legal advice; when the stakes are high, consult a qualified attorney before you attest to anything.",
      },
      {
        type: "callout",
        style: "info",
        text: "Eligibility is the cheapest no-go. It takes minutes to check and saves weeks of wasted proposal work. Run these three gates before you read another page of the solicitation.",
      },
    ],
  },
  {
    slug: "bidkit-capability",
    title: "Capability: staffing, past performance, and capacity",
    tier: "bidkit",
    estMinutes: 9,
    summary:
      "The honest capability audit: whether you can staff the work, prove you have done similar work, and absorb the contract without breaking your business.",
    blocks: [
      { type: "h2", text: "Can you staff it" },
      {
        type: "p",
        text: "Read the statement of work and translate it into people: how many, with what skills, for how long, starting when. Then compare that against your actual bench, not your aspirational hiring plan. Key personnel requirements are common in service contracts, and naming people you have not hired yet is a risk, not a strategy. If the staffing math only works with hires you have not made, be honest about lead times and whether the period of performance allows them.",
      },
      { type: "h2", text: "Can you prove it" },
      {
        type: "p",
        text: "Most solicitations score past performance, and evaluators want relevant, recent, and referenceable work. Relevant means similar in scope and scale, not just in industry. If your biggest completed project is a tenth the size of this one, that is a weakness to acknowledge in your planning, not to hide from yourself. New businesses without federal past performance are not automatically disqualified, commercial work can count depending on the solicitation, but you should know exactly what you will put in that section before you decide to bid.",
      },
      { type: "h2", text: "Can you absorb it" },
      {
        type: "p",
        text: "Capacity is the gate founders skip. A contract worth twice your annual revenue is not automatically a good thing: it can strain cash flow, since government payment cycles are real and slow, and it can consume every person you have, leaving no room for the rest of your business. Ask what happens if you win and the start date slips, or if the government exercises every option year. If winning would break the company, it is a no-bid no matter how attractive the top line looks.",
      },
      {
        type: "callout",
        style: "info",
        text: "A capability gap is not always a no-go. It can be a subcontracting signal: if you cannot prime this one, a prime contractor might need exactly what you offer. Module five covers how to find those opportunities.",
      },
    ],
  },
  {
    slug: "bidkit-winnability",
    title: "Winnability: competition, incumbents, and price realism",
    tier: "bidkit",
    estMinutes: 10,
    summary:
      "How to research who you are up against, what incumbency really means, and how to think about pricing without fooling yourself.",
    blocks: [
      { type: "h2", text: "Who else wants this" },
      {
        type: "p",
        text: "You will rarely know the full competitor list, but you can learn a lot. Check whether the notice is a follow-on to earlier work: the Related Notice field and the notice history sometimes link back to presolicitation or sources-sought notices that drew public responses. Award notices for similar past work are public and name the awardee, the amount, and the date. Patterns emerge quickly: the same few firms winning the same agency's work in your NAICS tells you the competitive bar.",
      },
      { type: "h2", text: "The incumbent question" },
      {
        type: "p",
        text: "If there is an incumbent doing this work today, they have advantages: known performance, relationships, and no learning curve. That does not make them unbeatable. Incumbents lose on price, on past-performance problems, and when the government wants a new approach. What incumbency should change is your pricing and your strategy, not automatically your decision. Bid against an incumbent only if you can articulate, concretely, why you would be better, not just cheaper.",
      },
      { type: "h2", text: "Price realism, honestly" },
      {
        type: "p",
        text: "Price yourself to perform the work well and stay in business, not to win at any cost. Underbidding to win and then failing to deliver is how small businesses earn a reputation that follows them. Read Section M first: if award is lowest-price technically acceptable, price discipline matters enormously and extras will not save you. If it is a best-value tradeoff, understand what the government is willing to pay more for and price the value, not just the hours. Nothing in this lesson promises that any pricing approach wins; it only warns that unsustainable pricing loses twice, once in margin and once in performance.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Never promise yourself a win to justify a bid. The decision to bid should survive the sentence: we would still bid if we knew our odds were one in ten. If it does not survive that sentence, it is hope, not strategy.",
      },
    ],
  },
  {
    slug: "bidkit-decision-doc",
    title: "Documenting your decision",
    tier: "bidkit",
    estMinutes: 6,
    summary:
      "Why every go or no-go decision gets written down, what the one-page record contains, and when to reopen a decision you already made.",
    blocks: [
      { type: "h2", text: "Write it down, either way" },
      {
        type: "p",
        text: "Every opportunity you seriously evaluate gets a short written record of the decision, whether you bid or not. This is not bureaucracy. It is how a one-person business builds institutional memory: six months from now you will not remember why you passed on that solicitation, and the next similar one will force you to redo the analysis from scratch. A no-bid log is also how you learn. Reviewing it quarterly shows you patterns in what you pass on, which tells you what capabilities to build. It also protects you from the most expensive cognitive bias in bidding, the sunk-cost pull to keep working an opportunity you already decided was a bad fit.",
      },
      { type: "h2", text: "The one-page record" },
      {
        type: "ul",
        items: [
          "The opportunity: title, Notice ID, agency and office, due date, set-aside, NAICS.",
          "The decision: go or no-go, with the date it was made and who made it.",
          "Eligibility: which gates you passed and any that were close.",
          "Capability: the staffing, past performance, and capacity assessment in two or three sentences.",
          "Winnability: the competitive read and the pricing logic, in two or three sentences.",
          "The deciding factor: the one reason that tipped it, stated plainly.",
        ],
      },
      { type: "h2", text: "Reopen when the facts change" },
      {
        type: "p",
        text: "A go decision is conditional on the solicitation you evaluated. An amendment that extends the deadline, changes the scope, or adds requirements reopens the decision: run the gates again against the new facts. A no-go can also be reopened. A solicitation you passed on for capacity reasons may fit six months later after a hire, or a set-aside you did not qualify for may become available after a certification comes through. The written record is what makes reopening fast instead of starting over, because the eligibility and capability analysis is already done and only the changed facts need review.",
      },
      {
        type: "callout",
        style: "info",
        text: "Discipline here compounds. Businesses that document decisions bid less often, win a higher share of what they bid, and stop repeating the same analysis. The log is a competitive asset.",
      },
    ],
  },
  {
    slug: "bidkit-deadlines",    title: "Deadlines, time zones, and late-submission rules",
    tier: "bidkit",
    estMinutes: 7,
    summary:
      "Why the due date on the notice page is the most dangerous field in bidding, how time zones cause misses, and the buffer habit that prevents them.",
    blocks: [
      { type: "h2", text: "The deadline is absolute" },
      {
        type: "p",
        text: "As a general rule, late offers are not considered. The government sets a date and time for receipt of offers, and missing it, by minutes, ends your bid regardless of its quality. The exact late-submission rules live in the solicitation and the applicable acquisition regulations, and there are narrow exceptions in specific circumstances, but you should never plan around exceptions. Plan around the deadline as a wall.",
      },
      { type: "h2", text: "Time zones are a trap" },
      {
        type: "p",
        text: "Solicitations specify a time zone with the due time, and it is frequently not yours. A 2:00 PM Eastern deadline is 1:00 PM Central, 12:00 noon Mountain, 11:00 AM Pacific. Daylight saving transitions add another layer: a deadline set in one season can mean a different clock reading than you expect if you convert carelessly. The safe habit is to convert the deadline into your local time the day the solicitation posts, write both times on your timeline, and verify the conversion once more in the final week. Notice history timestamps on SAM.gov display in Pacific time, which is another conversion to handle carefully when you are checking whether a deadline moved.",
      },
      { type: "h2", text: "The buffer habit" },
      {
        type: "ul",
        items: [
          "Set your personal deadline 48 hours before the real one. Drafting, review, pricing, and the submission itself all expand to fill available time.",
          "Submit early enough that a technical problem still leaves you time to recover. Portals go down, files corrupt, passwords expire.",
          "Confirm what counts as receipt: some channels timestamp when you hit send, others when the file finishes uploading or the email arrives. The solicitation's instructions control this, so read them.",
          "Watch for deadline changes in amendments. The Original Date Offers Due on the notice page is the starting point, not the final word; the notice history shows every move.",
        ],
      },
      {
        type: "callout",
        style: "warn",
        text: "More bids are lost to deadline misses than to bad writing. It is the most preventable failure in federal contracting, and it is entirely a process problem, not a talent problem.",
      },
    ],
  },
  {
    slug: "bidkit-portals",
    title: "Common submission portals and how they differ",
    tier: "bidkit",
    estMinutes: 8,
    summary:
      "Where offers actually get submitted, why the SAM.gov notice page is for reading rather than submitting, and how to prepare for whichever channel the solicitation names.",
    blocks: [
      { type: "h2", text: "The notice page is the bulletin board, not the mailbox" },
      {
        type: "p",
        text: "SAM.gov Contract Opportunities is where the government announces buys and posts documents. It is generally not where you submit your offer. The submission channel is specified in the solicitation itself, usually in Section L, and it varies: some solicitations direct you to email your proposal to the contracting officer, others to an agency-specific portal or electronic system. Never assume the channel. Read the instructions and follow them exactly.",
      },
      { type: "h2", text: "How channels differ in practice" },
      {
        type: "ul",
        items: [
          "Email submission: confirm the exact address, the subject-line format if one is specified, attachment size limits, and what counts as the official receipt time.",
          "Agency portals: these usually require advance registration, sometimes with identity verification that takes days. Register the week the solicitation posts, not the week it closes. Keep your login credentials somewhere secure and retrievable, because a password reset on deadline day is a crisis you can prevent in advance.",
          "Electronic systems: file-naming conventions, upload order, and virus-scan delays can all matter. A file stuck in a scan queue at the deadline is a late submission.",
        ],
      },
      { type: "h2", text: "Prepare for the channel early" },
      {
        type: "p",
        text: "As general guidance: identify the submission channel during your first reading of the solicitation, test your access immediately, and do a dry run if the channel allows it. If the channel requires credentials you do not have, that is a task for week one, not the final 48 hours. Confirm file size limits before you finalize large attachments like past-performance volumes, because a proposal that cannot be uploaded is the same as a proposal that was never written. And keep a complete local copy of everything you submit, with timestamps, so you can prove what you sent and when if any question ever arises.",
      },
      {
        type: "callout",
        style: "info",
        text: "Channel details change between solicitations even from the same office. What worked for the last bid is a hint, not a rule. The current solicitation's Section L is the only authority.",
      },
    ],
  },
  {
    slug: "bidkit-formatting",
    title: "Formatting and file requirements",
    tier: "bidkit",
    estMinutes: 6,
    summary:
      "The formatting rules solicitations impose, why evaluators enforce them, and how to turn them into compliance-matrix rows instead of last-minute surprises.",
    blocks: [
      { type: "h2", text: "The solicitation controls, down to the font" },
      {
        type: "p",
        text: "Section L often specifies exactly how your offer should look: page limits, margins, font type and size, file formats, how volumes are organized, how many copies, and how pages are numbered. These are not suggestions. They exist so evaluators can compare offers fairly and read them efficiently, and noncompliance can get your proposal set aside before it is scored. As general guidance, treat every formatting instruction as mandatory unless the solicitation explicitly marks it otherwise. When page limits are tight, the constraint is doing you a favor: it forces you to answer the evaluation factors directly instead of burying them in filler.",
      },
      { type: "h2", text: "Common patterns to expect" },
      {
        type: "ul",
        items: [
          "Page or word limits per volume, sometimes with stated exclusions like cover pages and tables of contents.",
          "File format requirements, most commonly PDF, sometimes with separate files per volume.",
          "Organization rules: volumes in a specified order, tabs or bookmarks, a table of contents matching the required structure.",
          "Signature requirements: who signs, where, and in what form. Unsigned forms are a classic disqualifier.",
          "Amendment acknowledgment: a signed statement that you received each amendment, which is why you kept the amendment log.",
        ],
      },
      { type: "h2", text: "Make formatting a matrix, not a memory" },
      {
        type: "p",
        text: "Every formatting requirement becomes a row in your compliance matrix during the first reading, not the night before submission. Assign formatting checks to a specific person and a specific time in your timeline, separate from content review. Content reviewers read for persuasion; formatting reviewers read for compliance. They are different jobs, and combining them is how page-limit violations slip through. One practical tip: build your proposal in the required structure from the first draft rather than reformatting at the end. Reformatting under time pressure introduces exactly the errors, misnumbered pages, broken cross-references, orphaned headings, that the sweep is supposed to catch.",
      },
    ],
  },
  {
    slug: "bidkit-presubmission-sweep",
    title: "The pre-submission compliance sweep",
    tier: "bidkit",
    estMinutes: 8,
    summary:
      "The final verification pass before you submit: walking the compliance matrix, confirming every attachment and signature, and proving your registration is active.",
    blocks: [
      { type: "h2", text: "Sweep with the matrix, not your memory" },
      {
        type: "p",
        text: "In the final 48 hours, stop writing and start verifying. Open your compliance matrix and walk every row in the left column: find the answer in your response, confirm it is really there, and check it off. This is the second use of the matrix from the earlier lesson, and it is the highest-leverage hour in the entire bid. A fresh pair of eyes helps enormously here; the person who wrote a section is the worst person to verify it, because they see what they meant instead of what is on the page.",
      },
      { type: "h2", text: "The sweep checklist" },
      {
        type: "checklist",
        items: [
          "Every Section L instruction has a matrix row, and every row is checked off against the response.",
          "Every Section M evaluation factor is addressed somewhere in the proposal.",
          "All required attachments, forms, and signed representations are included, with the current versions.",
          "Every amendment is acknowledged as the solicitation requires.",
          "Page limits, formatting, file names, and organization match Section L exactly.",
          "Pricing is in the required structure and location, and the numbers tie out across volumes.",
          "SAM.gov entity registration is active today, not just when you started drafting.",
          "The submission channel, address or portal, deadline, and time zone are confirmed against the current solicitation, not your notes from three weeks ago.",
        ],
      },
      { type: "h2", text: "After you submit" },
      {
        type: "p",
        text: "Keep your proof of submission: confirmation screens, sent-email records with timestamps, portal receipts. Save a complete copy of exactly what you submitted. Then log the outcome when it comes, win or lose, and if you lose, request a debriefing. Debriefings are how you learn what the evaluators actually thought, and that feedback is worth more than any lesson in this curriculum for your next bid.",
      },
      {
        type: "callout",
        style: "info",
        text: "The sweep is a ritual, not a reaction. Do it the same way every time, and it will catch the errors that vary every time.",
      },
    ],
  },
  {
    slug: "bidkit-subnet-search",    title: "What SubNet is and how to search it",
    tier: "bidkit",
    estMinutes: 8,
    summary:
      "The SBA's public board where prime contractors list subcontracting opportunities, how to find it, and how to search the listings.",
    blocks: [
      { type: "h2", text: "Prime work is not the only work" },
      {
        type: "p",
        text: "You do not have to win a prime contract to work on federal projects. Prime contractors regularly need subcontractors, and many of them advertise those needs publicly. The Small Business Administration runs a board for exactly this: SubNet, the subcontracting opportunities board. It lives on the SBA's own website, it is fully public with no login required, and it costs nothing to browse.",
      },
      { type: "h2", text: "Finding it" },
      {
        type: "p",
        text: "SubNet is at sba.gov, on the SBA's federal contracting pages under subcontracting opportunities. The old standalone address, subnet.sba.gov, is retired and now redirects to the current page, so if you find old links or bookmarks pointing there, follow them to the new location. The listing is an HTML table you can filter by state and keyword, with sorting on the column headers and pagination for longer result sets.",
      },
      { type: "h2", text: "What the table shows" },
      {
        type: "ul",
        items: [
          "Description: the opportunity title, the prime contractor's name, and a description of the work.",
          "Performance start date: when the subcontract work is expected to begin.",
          "Place of performance: where the work happens.",
          "NAICS code: the industry classification, which tells you at a glance whether it fits your business.",
          "Point of contact: a name and phone number for the prime's contact on the posting.",
        ],
      },
      {
        type: "p",
        text: "Clicking into a posting reveals detail sections on the same page: the closing date for responses, the performance start date, the place of performance, the NAICS code, and the point of contact with name, email, and phone. As an example of what a real posting looks like, research in September 2026 found listings such as a building door replacement job at a Job Corps center in San Diego, posted by the prime contractor with a named contact, email, phone number, NAICS code, and closing date all visible. That is the shape of every posting: enough information to decide in minutes whether to pursue it.",
      },
      {
        type: "callout",
        style: "info",
        text: "SAM.gov itself has no subcontracting section; its Contract Opportunities are prime-level. SubNet is the public board built for the subcontracting side of the market. Use both, for different jobs.",
      },
    ],
  },
  {
    slug: "bidkit-subnet-posting",
    title: "Reading a subcontract posting: scope, dates, and contacts",
    tier: "bidkit",
    estMinutes: 7,
    summary:
      "How to read a SubNet posting the way you read a solicitation: scope first, dates second, contact last, and what to do with each.",
    blocks: [
      { type: "h2", text: "Scope: what are they actually buying" },
      {
        type: "p",
        text: "Start with the description: the title, the prime contractor's name, and the work description. Ask the same go or no-go questions you would for a prime bid, compressed: is this work you can actually perform, does the NAICS code match your capabilities, and does the place of performance work for you. The description is shorter than a federal statement of work, which makes it faster to evaluate but also means details will come from the conversation with the prime, not the posting. Note the prime's name carefully: if you have encountered them before, on another posting or in an award notice, that context tells you what kind of work they typically subcontract.",
      },
      { type: "h2", text: "Dates: the two that matter" },
      {
        type: "ul",
        items: [
          "Closing date: the prime's deadline for hearing from interested subcontractors. Treat it with the same seriousness as a federal due date.",
          "Performance start date: when the work begins. Compare it against your current commitments and hiring timeline the same way you assessed capacity for prime bids.",
        ],
      },
      { type: "h2", text: "Contact: your next step" },
      {
        type: "p",
        text: "Every posting names a point of contact with email and phone. That person is your entry point, and the next lesson covers how to approach them. Before you reach out, prepare: know the posting's details cold, know what you want to say about your capabilities in two sentences, and have a one-page capability summary ready to send. Primes are busy; the subcontractors who get callbacks are the ones who make the first conversation easy. If the posting lists a closing date that has already passed, do not assume the need is gone, but do acknowledge the date when you write and ask whether they are still considering subcontractors.",
      },
      {
        type: "callout",
        style: "warn",
        text: "A posting is an invitation to start a conversation, not a contract. Verify everything that matters, scope, schedule, payment terms, before you commit resources. The posting gets you in the door; diligence decides whether you walk through it.",
      },
    ],
  },
  {
    slug: "bidkit-subnet-listing",
    title: "How posting works today: emailing SBA to list",
    tier: "bidkit",
    estMinutes: 5,
    summary:
      "Why SubNet postings arrive the way they do now, how a prime lists an opportunity, and what the posting freeze means for seekers.",
    blocks: [
      { type: "h2", text: "Self-service posting is paused" },
      {
        type: "p",
        text: "An important piece of context for using the board: self-service posting on SubNet is currently disabled. Prime contractors cannot log in and post opportunities themselves right now. Instead, the board instructs primes to email their subcontracting opportunities to the SBA at subcontracting@sba.gov for posting. That is the current process, stated on the board itself. Because every listing passes through this email step, allow for the possibility that a posting you see is slightly delayed relative to when the prime first sent it, and act promptly on closings that are near.",
      },
      { type: "h2", text: "What this means for you as a seeker" },
      {
        type: "ul",
        items: [
          "Posting volume may be thinner than in the past, because every listing now passes through an email process instead of instant self-service. Check the board regularly rather than assuming you have seen everything.",
          "Listings that do appear are still real opportunities from real primes, with real contacts. The bar for acting on one has not changed.",
          "Do not rely on SubNet alone. The public prime-contractor directories, from GSA, the SBA, the Department of Defense, and the Department of Transportation, list primes with subcontracting plans and are legitimate prospecting lists for direct outreach. A thin board week is a good week to work the directories instead.",
        ],
      },
      {
        type: "p",
        text: "There is no public API for SubNet; it is an HTML table. If you ever want to monitor it systematically, that means checking the page itself on a schedule, the same tracking habit you built for SAM.gov amendments. Weekly is a reasonable cadence for most businesses, and pairing that check with your SAM.gov amendment review keeps both halves of your opportunity pipeline on one routine.",
      },
      {
        type: "callout",
        style: "info",
        text: "If you are ever on the other side, as a prime looking to post, the current path is the SBA email address above. Processes like this change, so confirm the current instructions on the board before you act.",
      },
    ],
  },
  {
    slug: "bidkit-pitch-prime",
    title: "Pitching yourself to a prime contractor",
    tier: "bidkit",
    estMinutes: 9,
    summary:
      "How to turn a SubNet posting or a directory listing into a conversation: researching the prime, writing the first email, and following up professionally.",
    blocks: [
      { type: "h2", text: "Research before you reach out" },
      {
        type: "p",
        text: "Before contacting any prime, learn what you can about them. Public directories from GSA, the SBA, the Department of Defense, and the Department of Transportation list prime contractors with subcontracting plans; those directories are prospecting lists. Award notices on SAM.gov show who wins the kind of work you do. Going in with knowledge of the prime's contracts and needs turns a cold email into a relevant one.",
      },
      { type: "h2", text: "The first email" },
      {
        type: "ul",
        items: [
          "Reference the specific posting or contract: title, and the work you are responding to. Primes can tell instantly whether you read it.",
          "Say what you do in two sentences, tied to their need, not your company history.",
          "Attach or link a one-page capability summary: who you are, what you do, relevant past work, certifications, and contact information.",
          "Ask for a short call, and suggest that you will follow up if you do not hear back. Then actually follow up.",
        ],
      },
      { type: "h2", text: "Follow up without being a pest" },
      {
        type: "p",
        text: "One follow-up email after a week of silence is professional. A second after another week or two is persistence. Beyond that, you are noise. Space your follow-ups, add something new each time, a recent project completion or a new certification, and keep every message short. The goal of each touch is a conversation, not a contract; contracts come after the prime decides you are credible and easy to work with.",
      },
      { type: "h2", text: "What primes actually want" },
      {
        type: "p",
        text: "As general guidance: primes want subcontractors who reduce their risk. That means demonstrated capability in the specific work, reliable communication, financial stability enough to handle payment timing, and no drama. Your pitch should answer the unspoken question behind every subcontracting conversation: if I put you on my project, will my life get easier or harder. Everything you send, from the first email to the capability summary, should make easier the obvious answer.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Protect your interests before you sign anything as a subcontractor: scope, payment terms, schedule, and who owns what. Subcontract terms are negotiable business agreements, and anything you do not understand is worth a qualified attorney's review before you commit.",
      },
    ],
  },
];