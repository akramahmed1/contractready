import type { Lesson } from "./types";

/**
 * Starter tier: the full guided SAM.gov registration walkthrough.
 * All procedural claims are grounded in the Sept 18, 2026 SAM.gov mechanics research.
 */
export const STARTER_LESSONS: Lesson[] = [
  {
    slug: "starter-start-here",
    title: "SAM.gov Registration: What It Is, What It Costs, What It Takes",
    tier: "starter",
    estMinutes: 20,
    summary:
      "The complete picture of SAM.gov entity registration before you begin: what it does, what it does not do, the free path, the 10 to 12 business day timeline, the yearly renewal, the two-point registration rule, and UEI basics.",
    furtherWatching: [
      {
        title: "Validating Your Entity in SAM.gov",
        url: "https://www.youtube.com/watch?v=56NQ77JX5yo",
        source: "U.S. General Services Administration",
      },
    ],
    blocks: [
      { type: "h2", text: "The one-paragraph version" },
      {
        type: "p",
        text: "SAM.gov is the federal government's system for registering businesses that want to work with federal agencies. Entity registration is free, it takes up to 10 to 12 business days because your tax ID has to be validated against IRS records and a CAGE code has to be assigned, it must be renewed every 365 days, and a federal rule now requires your registration to be active at two specific moments: when you submit your offer and when the contract is awarded.",
      },
      { type: "h2", text: "What registration actually does" },
      {
        type: "ul",
        items: [
          "Gives your business a Unique Entity ID (UEI), the identifier the government uses instead of the old DUNS number.",
          "Validates your tax identification number against IRS records so agencies know you are a real, tax-compliant entity.",
          "Assigns you a CAGE code through the Defense Logistics Agency, which identifies your business location in defense and federal logistics systems.",
          "Records your representations and certifications, your official statements about your business size, ownership, and eligibility for set-asides.",
          "Makes your business visible to contracting officers who check the system before they can award you anything.",
        ],
      },
      { type: "h2", text: "What registration does not do" },
      {
        type: "ul",
        items: [
          "It does not find contracts for you or match you with agencies.",
          "It does not make you more likely to win. Contracting officers evaluate your offer, not your registration date.",
          "It does not certify you for set-aside programs like 8(a), HUBZone, or SDVOSB. Those are separate applications.",
          "It does not replace a business license, insurance, bonding, or any capability you need to actually perform the work.",
        ],
      },
      {
        type: "p",
        text: "Treat registration as a gate you pass through once and then maintain. The real work, finding opportunities and writing competitive offers, starts after it.",
      },
      { type: "h2", text: "It costs nothing" },
      {
        type: "p",
        text: "Registering your entity in SAM.gov is free, and so is renewing it. There is no paid tier, no expedited option sold by the government, and no official requirement to use a third party. If a company emails you offering to handle your SAM.gov registration for a fee, they are selling a convenience service, not a requirement, and GSA's own guidance says you do not need to pay a third party to register.",
      },
      { type: "h2", text: "How long it takes" },
      {
        type: "p",
        text: "Plan on up to 10 to 12 business days for entity validation alone. That clock covers the IRS check on your tax identification number and the CAGE code assignment. It is not something you can rush, and starting your registration the week a solicitation closes is how bids get missed.",
      },
      {
        type: "p",
        text: "The realistic zero-to-first-bid timeline for a business with no certifications is 4 to 8 weeks. That includes gathering documents, validation, completing the registration, and learning how to read and respond to a solicitation. If you are also pursuing set-aside certifications, the honest timeline is 3 to 9 months.",
      },
      { type: "h2", text: "The two-point rule" },
      {
        type: "p",
        text: "A federal acquisition rule finalized August 7, 2025 settled an old gray area: your SAM.gov registration must be active at the time you submit your offer AND at the time the award is made. Those are the two checkpoints.",
      },
      {
        type: "p",
        text: "What the rule does not require is continuous registration in between. If your registration lapses between offer submission and award and you renew it before award, you are fine. But letting it lapse at either checkpoint can disqualify you, so the practical advice is simple: keep it active and current at all times.",
      },
      { type: "h2", text: "UEI basics" },
      {
        type: "p",
        text: "The Unique Entity ID replaced the DUNS number on April 4, 2022. You do not apply for a UEI separately; it is issued to you as part of your SAM.gov registration. If validation goes smoothly it can be immediate; if your entity needs manual review, allow roughly 5 to 7 extra days.",
      },
      {
        type: "p",
        text: "One trap to know about: there is a UEI-only path in SAM.gov that gives you an identifier without full entity registration. That path does not let you bid on federal contracts as a prime contractor. If your goal is to bid, you need the full registration, not just the number.",
      },
      { type: "h2", text: "The 365-day renewal" },
      {
        type: "p",
        text: "Your registration expires 365 days after it becomes active, and you must renew it every year to keep bidding and getting paid. Renewal is free and done inside SAM.gov. A lapsed registration is one of the most common reasons businesses discover, too late, that they cannot submit an offer or receive payment.",
      },
      {
        type: "callout",
        style: "info",
        text: "Your first action item: write down today's date and add a calendar reminder for your expected renewal date once your registration goes active. Maintenance starts the day you are approved, not the day before it expires.",
      },
    ],
  },
  {
    slug: "starter-documents",
    title: "The Document and Information Checklist, and Why Each Item Matters",
    tier: "starter",
    estMinutes: 25,
    summary:
      "Every document and data point SAM.gov registration requires, explained with the reason behind each one, plus the single most common cause of delays and how to avoid it.",
    blocks: [
      { type: "h2", text: "Gather first, type later" },
      {
        type: "p",
        text: "Most SAM.gov delays do not come from the website. They come from people typing information from memory and getting it slightly wrong. The single most common cause of registration delays is your legal business name or physical address not matching IRS records. Gather everything below, check it against official paperwork, and only then start the online form.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Name and address mismatch with IRS records is the number one delay cause. Pull your IRS paperwork, your EIN confirmation letter if you have it, and copy the name and address character for character. A missing suite number or a slightly different spelling can bounce validation and cost you weeks.",
      },
      { type: "h2", text: "Tax identification" },
      {
        type: "h3",
        text: "Employer Identification Number (EIN)",
      },
      {
        type: "p",
        text: "SAM.gov validates your tax identification number against IRS records, so this is the anchor of your whole registration. If you do not have an EIN yet, apply free at irs.gov. It is issued quickly and costs nothing. Sole proprietors can sometimes use a Social Security Number, but getting an EIN is cleaner and keeps your personal number out of more systems.",
      },
      {
        type: "p",
        text: "Why it is needed: the government has to confirm you are a real, tax-compliant entity before it can pay you. The IRS check is one of the two validations that make up the 10 to 12 business day timeline.",
      },
      { type: "h2", text: "Legal identity" },
      {
        type: "h3",
        text: "Legal business name, exactly as the IRS has it",
      },
      {
        type: "p",
        text: "This is the name on your IRS paperwork, not your logo, not your website header, not the name you wish you had filed. If your LLC is registered as Brightline Facilities LLC and your site says Brightline Facilities, the registration needs Brightline Facilities LLC. DBA or trade names can be recorded separately, but the legal name must match the IRS record exactly.",
      },
      {
        type: "h3",
        text: "Physical business address, exactly as the IRS has it",
      },
      {
        type: "p",
        text: "SAM.gov wants the real street address where the business operates, matching IRS records. PO boxes do not work as a physical address. If you moved since you filed with the IRS, update the IRS first or expect validation trouble.",
      },
      {
        type: "p",
        text: "Why these matter: SAM.gov cross-checks your identity against federal records. Any mismatch kicks your entity into manual review or rejection, and manual review adds days to weeks. This is the delay trap almost everyone falls into at least once.",
      },
      { type: "h2", text: "Industry classification" },
      {
        type: "h3",
        text: "NAICS codes",
      },
      {
        type: "p",
        text: "NAICS codes are the industry codes that describe what your business does, and they drive two important things: the size standards that determine whether you count as a small business under 13 CFR 121.201, and your eligibility for certain set-aside programs. You will pick a primary NAICS that best describes your main line of work, plus secondary codes for other work you do.",
      },
      {
        type: "p",
        text: "Why they are needed: contracting officers use NAICS codes to set aside solicitations for small businesses and to check your size status. Pick them carefully; we have a full lesson on choosing them next.",
      },
      { type: "h2", text: "Payment information" },
      {
        type: "h3",
        text: "Banking details for electronic funds transfer",
      },
      {
        type: "p",
        text: "The federal government pays electronically, so SAM.gov collects your bank account and routing numbers during registration. Use a business account in the business's name. This is how award payments reach you, so double-check every digit.",
      },
      {
        type: "p",
        text: "Why it is needed: agencies pay through the Treasury's electronic systems, which pull from your SAM.gov record. Wrong banking details mean delayed or misdirected payments.",
      },
      { type: "h2", text: "People" },
      {
        type: "h3",
        text: "Points of contact",
      },
      {
        type: "p",
        text: "You will name points of contact for your registration, typically including an accounts receivable contact and a primary contact who can answer questions about your entity. Use real people with real email addresses and phone numbers that get answered. These contacts are who the government reaches out to about your registration and, later, about awards.",
      },
      {
        type: "p",
        text: "Why they are needed: if something in your registration needs fixing or an agency has a question, they call these people. Dead inboxes and disconnected numbers have killed more than one opportunity.",
      },
      { type: "h2", text: "The pre-flight checklist" },
      {
        type: "checklist",
        items: [
          "EIN confirmed, obtained free from the IRS",
          "Legal business name copied exactly from IRS paperwork",
          "Physical address copied exactly from IRS paperwork, no PO box",
          "Primary NAICS code chosen, plus secondary codes listed",
          "Business bank account and routing numbers on hand",
          "Point of contact names, titles, emails, and phone numbers ready",
          "A Login.gov account created before you start at sam.gov",
        ],
      },
      {
        type: "p",
        text: "If every item above is gathered and verified against official records, the online portion of registration is straightforward data entry. The people who struggle are the ones who start typing before they finish gathering.",
      },
    ],
  },
  {
    slug: "starter-walkthrough",
    title: "The Registration Walkthrough, Screen by Screen",
    tier: "starter",
    estMinutes: 35,
    summary:
      "A step-by-step walkthrough of SAM.gov entity registration: Login.gov sign-in, entity validation, core data, assertions, representations and certifications, points of contact, and submission, with notes on what to expect at each stage.",
    blocks: [
      { type: "h2", text: "Before you begin" },
      {
        type: "p",
        text: "Finish the document checklist from the previous lesson first. Registration sessions can time out, and retyping everything because you had to go find your EIN is how errors creep in. Set aside an uninterrupted hour, and use a desktop browser rather than a phone.",
      },
      {
        type: "callout",
        style: "info",
        text: "SAM.gov updates its screens periodically. The steps below follow the current registration flow, but button labels and page layouts can change. When in doubt, follow the on-screen labels; they always describe what the government actually wants on that page.",
      },
      { type: "h2", text: "Step 1: Create your Login.gov account" },
      {
        type: "p",
        text: "SAM.gov does not have its own username and password. You sign in through Login.gov, the federal government's single sign-on service. Create the account with an email address you will keep long term, ideally a business address rather than a personal one you might lose access to. Turn on two-factor authentication. You will use this login for every future visit, including renewals.",
      },
      {
        type: "p",
        text: "Use the same person as the account owner going forward. If your Login.gov email belongs to an employee who leaves, recovering access becomes a project. Pick an owner and a backup plan now.",
      },
      { type: "h2", text: "Step 2: Start an entity registration at sam.gov" },
      {
        type: "p",
        text: "Sign in at sam.gov with your Login.gov account and look for the entity registration option. The site will ask whether you are registering to bid on federal contracts and assistance awards or whether you only need a Unique Entity ID. Choose the full registration path for bidding. Remember: the UEI-only path does not allow prime bidding, and picking it by mistake is a common and costly wrong turn.",
      },
      { type: "h2", text: "Step 3: Validate your entity" },
      {
        type: "p",
        text: "This is the step where the waiting happens. You enter your legal business name, physical address, and tax identification information, and SAM.gov checks it against external records. This validation is what takes up to 10 to 12 business days, covering the IRS tax ID check and the CAGE code assignment through the Defense Logistics Agency.",
      },
      {
        type: "p",
        text: "If validation passes cleanly, your UEI can be issued right away. If anything needs a closer look, your entity goes to manual review, which typically adds about 5 to 7 days. Most manual reviews trace back to the name and address mismatch problem from the documents lesson.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Do not start registration the week a solicitation closes. The validation clock runs on business days and you cannot pay to skip it. If you have a bid in mind, start registration at least a month before the due date.",
      },
      { type: "h2", text: "Step 4: Enter your core data" },
      {
        type: "p",
        text: "Core data is the factual heart of your registration: your business information, your CAGE code once assigned, your NAICS codes, and your business type and size details. Enter your primary NAICS code, the one that best describes your main line of business, plus any secondary codes. The screens here are mostly structured forms with dropdowns, so take your time and match everything to your source documents.",
      },
      { type: "h2", text: "Step 5: Complete your assertions" },
      {
        type: "p",
        text: "Assertions cover what your business does and where: goods and services you provide, the NAICS codes tied to them, and your business size. This section feeds the searches contracting officers and prime contractors run when looking for vendors. Describe your capabilities in plain terms a stranger could understand, because that is exactly who will be reading it.",
      },
      { type: "h2", text: "Step 6: Representations and certifications" },
      {
        type: "p",
        text: "Reps and certs are your official statements to the government about your business: your size status, ownership, and eligibility claims. Answer truthfully and conservatively. Claiming a status you do not hold, like calling yourself a small business when you exceed the size standard, is not a marketing decision; it is a legal representation that follows your bids around.",
      },
      {
        type: "p",
        text: "Read each question literally. If you are unsure how to answer one, that is exactly the kind of question a free APEX Accelerator counselor can help with. Guessing on reps and certs is never worth it.",
      },
      { type: "h2", text: "Step 7: Add your points of contact" },
      {
        type: "p",
        text: "Enter the people from your checklist: the primary contact, the accounts receivable contact, and any others the form asks for. Use names, titles, direct emails, and phone numbers that actually get answered. These are the people the government contacts about your registration and your awards.",
      },
      { type: "h2", text: "Step 8: Review and submit" },
      {
        type: "p",
        text: "Review every section before you submit. Check the legal name and address against your IRS paperwork one more time, verify the banking digits, and confirm your NAICS codes. Then submit. You will get a confirmation, and your registration will move through review until it shows as active.",
      },
      {
        type: "p",
        text: "After submitting, monitor your registration status inside SAM.gov. If the reviewers need corrections, they will tell you what to fix; fix it promptly and resubmit. Most post-submission delays are businesses not noticing a correction request sitting in their account for weeks.",
      },
      { type: "h2", text: "What happens after you submit" },
      {
        type: "ul",
        items: [
          "Watch for a status change to active. Until then, you cannot use the registration to bid.",
          "Save your UEI somewhere permanent. You will put it on bids, invoices, and correspondence for years.",
          "Note your activation date and set a renewal reminder for 365 days out.",
          "Download or screenshot your confirmation for your records.",
        ],
      },
      {
        type: "callout",
        style: "info",
        text: "Screens may change; follow the on-screen labels. The government occasionally renames sections or reorders pages. The sequence above, validate, core data, assertions, reps and certs, contacts, submit, has been stable even as labels shift, so if a page looks unfamiliar, match it to the step it belongs to rather than hunting for an exact button name.",
      },
    ],
  },
  {
    slug: "starter-naics",
    title: "Choosing Your NAICS Codes Without Guessing",
    tier: "starter",
    estMinutes: 25,
    summary:
      "What NAICS codes drive in federal contracting, how size standards work under 13 CFR 121.201, how to use the SBA's size standards tools, and how to pick a primary code you can defend.",
    blocks: [
      { type: "h2", text: "What a NAICS code is" },
      {
        type: "p",
        text: "NAICS, the North American Industry Classification System, is the standard the federal government uses to classify business establishments by industry. Each code is six digits and describes a specific line of work, like 541512 for Computer Systems Design Services or 236220 for Commercial and Institutional Building Construction. You will list these codes in your SAM.gov registration, and they follow you into every bid.",
      },
      { type: "h2", text: "What your codes actually drive" },
      {
        type: "p",
        text: "Your NAICS codes are not decorative. They drive two things that directly affect your business:",
      },
      {
        type: "ul",
        items: [
          "Size standards: each NAICS code has a size standard set by the SBA under 13 CFR 121.201, usually a revenue cap or an employee count. If you are under the standard for the code on a solicitation, you count as a small business for that bid. Pick the wrong code and you can accidentally disqualify yourself from small business set-asides, or claim small status you do not actually hold.",
          "Set-aside eligibility: solicitations are often set aside for small businesses generally or for specific programs like WOSB, and those set-asides are tied to NAICS codes. Your codes determine which set-aside doors are open to you.",
        ],
      },
      {
        type: "p",
        text: "Because size status is evaluated per solicitation against that solicitation's NAICS code, you can be small for one bid and other-than-small for another. That is normal and by design.",
      },
      { type: "h2", text: "How to find your codes" },
      {
        type: "ol",
        items: [
          "Start with the SBA's size standards table, which lists NAICS codes alongside their size standards. It is the authoritative reference for which code carries which threshold.",
          "Use the SBA size standards tool to search by keyword describing your work and see candidate codes with their thresholds.",
          "Read the code descriptions, not just the titles. Two codes can sound similar while covering very different work, and the description is what determines whether the code fits.",
          "Check what NAICS codes appear on solicitations you want to bid on. If agencies consistently buy your kind of work under one code, that is strong evidence about which code matters in your market.",
          "When torn between two codes, look at the size standards. A code with a higher revenue threshold keeps you small longer, but only pick it if it honestly describes your work.",
        ],
      },
      { type: "h2", text: "Picking your primary NAICS" },
      {
        type: "p",
        text: "Your primary NAICS should describe the work that brings in the most revenue or represents your main line of business. This is the code the government will associate most closely with you, and it is the one size status is most often judged against.",
      },
      {
        type: "p",
        text: "List secondary codes for the other work you genuinely do. There is no prize for listing twenty codes, and there is real risk in listing work you cannot perform. Contracting officers and prime contractors search these codes when looking for vendors; a bloated list makes you look unfocused, and a dishonest one makes you look worse.",
      },
      {
        type: "callout",
        style: "warn",
        text: "Do not pick a NAICS code just because its size standard is generous. If the code does not describe work you actually perform, it can undermine your credibility in a bid and create problems in a size protest. Fit first, threshold second.",
      },
      { type: "h2", text: "Common NAICS mistakes" },
      {
        type: "ul",
        items: [
          "Choosing by title alone without reading the full code description.",
          "Listing codes for aspirational work you have never done and cannot staff.",
          "Using the same primary code as a competitor without checking whether it fits your revenue mix.",
          "Forgetting to update codes as the business evolves into new lines of work.",
          "Confusing NAICS codes with PSC codes. NAICS describes your industry; PSC, the Product or Service Code, describes what the government is buying on a specific solicitation. You will see both on SAM.gov notices.",
        ],
      },
      {
        type: "p",
        text: "Revisit your NAICS codes once a year, ideally at renewal time. Businesses drift into new work gradually, and your registration should reflect what you actually do today, not what you did when you first registered.",
      },
    ],
  },
  {
    slug: "starter-rejections",
    title: "The Rejections Hall of Fame: What Goes Wrong and How to Prevent It",
    tier: "starter",
    estMinutes: 20,
    summary:
      "The most common reasons SAM.gov registrations get delayed or rejected, from name and address mismatches to lapsed renewals and third-party scams, and exactly how to prevent each one.",
    blocks: [
      { type: "h2", text: "Why this lesson exists" },
      {
        type: "p",
        text: "Almost every registration problem falls into a small set of patterns. Learn them once and you will avoid the mistakes that cost other businesses weeks. Each pattern below comes with its prevention, because knowing what goes wrong is only half the value.",
      },
      { type: "h2", text: "1. Name or address mismatch with IRS records" },
      {
        type: "p",
        text: "The number one delay cause. Your legal name or physical address in the registration does not exactly match what the IRS has on file, so validation fails or drops into manual review. Common versions: a missing suite number, St. versus Street, a DBA used instead of the legal name, or an old address from before a move.",
      },
      {
        type: "p",
        text: "Prevention: copy the name and address character for character from your IRS paperwork before you start. If you moved, update your IRS records first and wait for that to process before registering.",
      },
      { type: "h2", text: "2. Expired or inconsistent documents" },
      {
        type: "p",
        text: "Business licenses, state filings, or identification documents that expired without anyone noticing, or documents that contradict each other on basic facts like the business name or formation date. Reviewers notice inconsistencies, and each round of corrections adds days.",
      },
      {
        type: "p",
        text: "Prevention: before registering, lay out your formation documents, EIN letter, and state filings side by side and confirm the name, address, and dates agree. Renew anything expired first.",
      },
      { type: "h2", text: "3. The UEI-only trap" },
      {
        type: "p",
        text: "SAM.gov offers a path that issues just a Unique Entity ID without full entity registration. Some businesses take it thinking they are registered, then discover they cannot bid as a prime contractor. A UEI alone does not make you eligible for prime awards.",
      },
      {
        type: "p",
        text: "Prevention: when SAM.gov asks what you are registering for, choose the full entity registration for federal contracts. If you already went down the UEI-only path, you can complete the full registration; you do not need a second UEI.",
      },
      { type: "h2", text: "4. Lapsed renewals" },
      {
        type: "p",
        text: "Registration expires every 365 days, and businesses routinely discover the lapse when a bid is due or a payment is held up. Remember the two-point rule: your registration must be active when you submit your offer and when the award is made. A lapse at either point can knock you out.",
      },
      {
        type: "p",
        text: "Prevention: set calendar reminders at 90, 60, and 30 days before expiration. Renewal is free and done inside SAM.gov, and early renewal does not shorten your next cycle.",
      },
      { type: "h2", text: "5. Third-party registration scams" },
      {
        type: "p",
        text: "Companies send official-looking emails and run ads implying that SAM.gov registration costs money, is expiring imminently, or must go through them. Some charge hundreds of dollars for what you can do free in an afternoon. Others are outright phishing operations harvesting business and banking details.",
      },
      {
        type: "callout",
        style: "warn",
        text: "GSA's guidance is direct: you do not need to pay a third party to register in SAM.gov. Registration and renewal are free at sam.gov, the only official site. Treat any email demanding payment or immediate action as suspect, and never enter your Login.gov credentials on a site you reached through an email link.",
      },
      {
        type: "p",
        text: "Prevention: bookmark sam.gov and always navigate there directly. If someone contacts you about your registration, verify the claim by signing in yourself rather than clicking their link.",
      },
      { type: "h2", text: "6. Guessing on reps and certs" },
      {
        type: "p",
        text: "Representations and certifications are legal statements about your size, ownership, and eligibility. Answering from gut feeling instead of checking the actual standards can put false statements on your record, which is far worse than a delayed registration.",
      },
      {
        type: "p",
        text: "Prevention: read each question literally, check the SBA size standards table for your NAICS code, and ask a free APEX Accelerator counselor about anything ambiguous. Slow and accurate beats fast and wrong.",
      },
      { type: "h2", text: "7. Letting correction requests sit" },
      {
        type: "p",
        text: "When reviewers need a fix, they post a correction request to your SAM.gov account. Businesses that do not check their account for weeks add those weeks to their timeline for no reason.",
      },
      {
        type: "p",
        text: "Prevention: check your registration status a couple of times a week while it is pending. Fix requested corrections the same day you see them.",
      },
      {
        type: "callout",
        style: "info",
        text: "Every problem on this list is preventable with preparation and attention. None of them requires paying anyone. The businesses that sail through registration are not lucky; they gathered documents first, matched IRS records exactly, and monitored their status.",
      },
    ],
  },
  {
    slug: "starter-after-approval",
    title: "After Approval: Keeping Your Registration Alive and Useful",
    tier: "starter",
    estMinutes: 20,
    summary:
      "What to do the day your registration goes active, how the 365-day renewal works, which changes require updates, and why the UEI-only path is not a shortcut to bidding.",
    blocks: [
      { type: "h2", text: "Day one: lock in the win" },
      {
        type: "p",
        text: "When your registration shows as active, do four things before you celebrate. Save your UEI somewhere permanent; you will use it on bids, invoices, and correspondence for years. Note your activation date. Set renewal reminders for 90, 60, and 30 days before the 365-day expiration. And save a copy of your confirmation for your records.",
      },
      {
        type: "checklist",
        items: [
          "UEI saved in a permanent, backed-up location",
          "Activation date recorded",
          "Renewal reminders set for 90, 60, and 30 days before expiration",
          "Registration confirmation saved with business records",
          "Login.gov credentials stored securely with a backup owner identified",
        ],
      },
      { type: "h2", text: "The 365-day renewal" },
      {
        type: "p",
        text: "Your registration expires 365 days after activation, and renewal is your responsibility. SAM.gov sends reminders, but reminders get filtered, ignored, or sent to someone who left the company. Your calendar reminders are the real safety net.",
      },
      {
        type: "p",
        text: "Renewal is free and done inside SAM.gov. You review your information, update anything that changed, re-certify your representations, and submit. Renew early; an early renewal does not shorten your next 365-day cycle, and it protects you against the two-point rule if a bid or award lands near your expiration date.",
      },
      {
        type: "callout",
        style: "warn",
        text: "A lapsed registration can disqualify your offer at submission or block your award, and it can hold up payments on work you already performed. Of all the maintenance tasks in this lesson, renewal is the one with real money attached.",
      },
      { type: "h2", text: "What changes require an update" },
      {
        type: "p",
        text: "Your registration is a living record, not a one-time filing. Update it whenever the underlying facts change:",
      },
      {
        type: "ul",
        items: [
          "Legal business name changes, including mergers or restructuring.",
          "Physical address changes. Remember the IRS matching rule: update the IRS first so the records agree.",
          "Ownership changes that affect your reps and certs, such as a new majority owner.",
          "Banking changes. If your EFT account changes and SAM.gov still points to the old one, payments go to the wrong place.",
          "Points of contact. When people leave, replace them the same week, not the same quarter.",
          "NAICS codes as your lines of business evolve.",
        ],
      },
      {
        type: "p",
        text: "Small, prompt updates beat big, annual corrections. A registration that drifts from reality creates the same mismatch problems as a sloppy initial filing, just later and at worse moments.",
      },
      { type: "h2", text: "The UEI-only path, one more time" },
      {
        type: "p",
        text: "It is worth repeating because it keeps catching people: getting just a Unique Entity ID through SAM.gov's UEI-only path does not register your entity and does not allow prime bidding on federal contracts. The UEI is an identifier, not a registration. If someone told you that you are registered because you have a UEI, check your status in SAM.gov right now. If it does not show an active entity registration, you have work to do before you can bid.",
      },
      { type: "h2", text: "Keeping the registration useful, not just alive" },
      {
        type: "p",
        text: "An active registration you never look at is a missed opportunity. A few habits make it an asset:",
      },
      {
        type: "ul",
        items: [
          "Review your assertions yearly and rewrite them in plain language a stranger could understand. Contracting officers and primes search these descriptions.",
          "Keep your NAICS codes current with what you actually do today.",
          "Verify your points of contact still work there and still answer.",
          "After every bid, win or lose, note anything about your registration that slowed you down and fix it before the next one.",
        ],
      },
      {
        type: "p",
        text: "Registration maintenance is unglamorous and takes maybe an hour a year plus a few minutes per change. Treat it like changing the oil: boring, cheap, and the thing that keeps the engine from seizing at the worst possible time.",
      },
    ],
  },
  {
    slug: "starter-llc-bonus",
    title: "Bonus: Forming Your LLC at the State Level",
    tier: "starter",
    estMinutes: 25,
    summary:
      "How LLC formation works at the state Secretary of State, the typical steps in order, what the state fees cover, and what ContractReady does and does not do for you.",
    blocks: [
      { type: "h2", text: "Where formation actually happens" },
      {
        type: "p",
        text: "LLCs are formed at the state level, not the federal level. The office that handles it is usually called the Secretary of State, though the exact name varies by state. SAM.gov, the IRS, and the SBA all come after formation; none of them creates your LLC. If you already have a formed entity, you can skip this lesson entirely.",
      },
      {
        type: "callout",
        style: "info",
        text: "This lesson is general information about a common process, not legal advice. Business formation has tax and liability implications that vary by state and situation. For advice about your specific circumstances, talk to a licensed attorney or CPA in your state.",
      },
      { type: "h2", text: "The typical steps, in order" },
      {
        type: "ol",
        items: [
          "Choose your state. Most small businesses form in the state where they operate. Forming in a different state adds registered agent costs and foreign qualification filings in your home state, so have a real reason before you shop states.",
          "Search the name. Every Secretary of State has an online business name search. Your chosen name must be distinguishable from existing entities in that state, and it generally must include an LLC designator like LLC or Limited Liability Company.",
          "Designate a registered agent. This is the person or company authorized to receive legal documents on the LLC's behalf, with a physical address in the formation state. You can often serve as your own agent if you have an in-state address, or you can hire a commercial registered agent service.",
          "File the articles of organization. This is the formation document, usually a short form filed online with the Secretary of State. It names the LLC, the registered agent, and basic organizational details. Filing is what legally creates the LLC.",
          "Get your EIN from the IRS. After the state approves your formation, apply for an Employer Identification Number free at irs.gov. You need the EIN for taxes, banking, and SAM.gov registration.",
          "Handle the extras your state requires. Some states require an operating agreement, initial reports, or publication of the formation. Check your Secretary of State's website for the full list rather than assuming the articles alone finish the job.",
        ],
      },
      { type: "h2", text: "What it costs" },
      {
        type: "p",
        text: "State filing fees for articles of organization typically run $50 to $300 depending on the state. That fee is paid by you directly to the state when you file. Some states also have annual report fees or franchise taxes that recur every year, so check the ongoing costs, not just the formation fee.",
      },
      {
        type: "callout",
        style: "warn",
        text: "State formation fees are paid by the customer to the state, not to us. ContractReady does not file anything on your behalf, collect state fees, or act as your registered agent. When you file, you pay the Secretary of State directly through the state's own filing system.",
      },
      { type: "h2", text: "What ContractReady does and does not do" },
      {
        type: "ul",
        items: [
          "We explain the process in plain language so you know what to expect.",
          "We do not file your articles of organization or any other formation document.",
          "We do not serve as your registered agent.",
          "We do not give legal or tax advice about entity choice, state selection, or operating agreements.",
          "We do not collect state fees. Any fee you pay goes directly to the state.",
        ],
      },
      {
        type: "p",
        text: "If anyone offering to help with formation is vague about who files what and where the money goes, slow down and get specifics. Legitimate formation services are transparent about exactly which state filings they prepare and which fees go to the state.",
      },
      { type: "h2", text: "After formation: the sequence" },
      {
        type: "ol",
        items: [
          "Receive your approved articles of organization from the state.",
          "Obtain your EIN from the IRS.",
          "Open a business bank account in the LLC's legal name.",
          "Then begin SAM.gov registration, using the legal name and address exactly as they appear on your state and IRS records.",
        ],
      },
      {
        type: "p",
        text: "That order matters. SAM.gov validates against IRS records, and the IRS record starts from your formation documents. Rushing to register before the paperwork chain is consistent is how name mismatches are born.",
      },
      { type: "h2", text: "One more thing: the operating agreement" },
      {
        type: "p",
        text: "Many states do not require you to file an operating agreement, but having one is still good practice. It documents who owns what, how decisions get made, and what happens if a member leaves. It is an internal document, you do not file it with the state, and a simple template reviewed by an attorney in your state is enough for most single-owner businesses.",
      },
    ],
  },
];
