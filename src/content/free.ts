import type { Lesson } from "./types";

/**
 * Free tier: the honest do-it-yourself starting point.
 * Everything in this lesson can be done with no money changing hands.
 */
export const FREE_LESSONS: Lesson[] = [
  {
    slug: "free-sam-checklist",
    title: "Your Free SAM.gov Preparation Checklist",
    tier: "free",
    estMinutes: 15,
    summary:
      "What SAM.gov registration actually is, what you need to gather before you start, how long it takes, and where free help lives if you get stuck.",
    blocks: [
      { type: "h2", text: "What SAM.gov is" },
      {
        type: "p",
        text: "SAM.gov, the System for Award Management, is the federal government's official registration database for businesses that want to do work with federal agencies. If you want to bid on a federal contract as a prime contractor, you need an active entity registration in SAM.gov. No registration, no bid, no award.",
      },
      {
        type: "p",
        text: "Registering is free. The government charges nothing for SAM.gov registration, and no private company can register faster than you can on your own. If anyone asks you to pay for SAM.gov registration, that is a sales pitch, not a requirement.",
      },
      {
        type: "callout",
        style: "warn",
        text: "GSA says it plainly: you do not need to pay a third party to register in SAM.gov. Ignore any email or ad that implies registration costs money or must go through them.",
      },
      { type: "h2", text: "What registration is and is not" },
      {
        type: "p",
        text: "Registration is paperwork, not permission. It gives you a Unique Entity ID (UEI), validates your business with the IRS and the Defense Logistics Agency, and puts you in the system agencies check before they can award you a contract. It does not win you work, rank you higher, or guarantee anyone will call you.",
      },
      {
        type: "p",
        text: "Think of it like getting a driver's license before a road trip. You cannot legally drive without it, but having it does not mean you will enjoy the trip or arrive on time. Registration is the starting line, not the finish line.",
      },
      { type: "h2", text: "The free registration path, step by step" },
      {
        type: "ol",
        items: [
          "Gather your documents using the checklist below before you touch the website. Most delays come from typing information that does not match official records.",
          "Create a Login.gov account. SAM.gov signs you in through Login.gov, which is the federal government's single sign-on service.",
          "Go to sam.gov and start an entity registration. The site will validate your entity, which is where the waiting happens.",
          "Wait for validation. Plan on up to 10 to 12 business days while your tax identification number is checked against IRS records and your CAGE code is assigned.",
          "Complete the registration sections: core data, assertions, representations and certifications, and points of contact.",
          "Submit and monitor your status until the registration shows as active.",
        ],
      },
      {
        type: "p",
        text: "From zero to ready-to-bid takes most businesses 4 to 8 weeks, and that is without pursuing any special certifications. If you also apply for set-aside certifications like 8(a), HUBZone, or WOSB, expect 3 to 9 months total. Plan your first bids around that calendar, not the other way around.",
      },
      { type: "h2", text: "Document checklist: gather these first" },
      {
        type: "checklist",
        items: [
          "Your Employer Identification Number (EIN) from the IRS, free and fast to obtain at irs.gov",
          "Your exact legal business name, exactly as it appears on your IRS paperwork",
          "Your physical business address, exactly as the IRS has it on file",
          "Banking information (account and routing numbers) for electronic funds transfer if you are paid",
          "Your NAICS codes, the industry codes that describe what your business does",
          "Names, titles, and contact details for your points of contact",
        ],
      },
      {
        type: "p",
        text: "The number one cause of delays is your legal business name or address not matching IRS records exactly. One missing suite number or a slightly different spelling can bounce your validation and cost you weeks. Pull your IRS paperwork and copy it character for character.",
      },
      { type: "h2", text: "Timeline expectations" },
      {
        type: "ul",
        items: [
          "Entity validation: up to 10 to 12 business days. This is the IRS and CAGE code check, and you cannot speed it up.",
          "Registration review after you submit: usually a few business days, longer if anything needs correction.",
          "Renewal: every 365 days. A lapsed registration means you cannot bid or be paid, so put the renewal date on your calendar the day you are approved.",
          "Rule worth knowing early: a federal rule finalized August 7, 2025 requires your registration to be active at two points, when you submit your offer and when the award is made.",
        ],
      },
      { type: "h2", text: "Where free help exists" },
      {
        type: "p",
        text: "You do not have to figure this out alone, and you do not have to pay for guidance. Two free resources exist specifically for this:",
      },
      {
        type: "ul",
        items: [
          "APEX Accelerators: a national network of procurement technical assistance centers that help small businesses register in SAM.gov and pursue government contracts, at no cost. Find yours at apexaccelerators.us.",
          "The Small Business Administration (SBA): local SBA offices and resource partners offer free counseling on government contracting basics. Start at sba.gov.",
        ],
      },
      {
        type: "p",
        text: "Both are funded to help you. A legitimate counselor will never charge you for SAM.gov registration help and will never ask for a cut of future contracts.",
      },
      { type: "h2", text: "What comes after this checklist" },
      {
        type: "p",
        text: "This checklist gets you prepared. The actual registration has more screens, more judgment calls, and more ways to get bounced than one page can cover. ContractReady Starter walks you through the registration screen by screen, shows you the most common rejection reasons before you hit them, helps you choose your NAICS codes without guessing, and covers how to keep your registration alive after approval.",
      },
      {
        type: "p",
        text: "And registration is only the starting line. Once you are registered, the real question is how to find contracts worth bidding on and how to decide which ones to pursue. That is what the higher tiers are built for: tailored SAM.gov search packs matched to your business, bid and no-bid qualification, proposal templates, and the full 91-lesson library. See the pricing page for the full breakdown.",
      },
      {
        type: "callout",
        style: "info",
        text: "Nothing here requires a paid product. The free path works; it just takes more of your time. Starter exists for business owners who want the guided walkthrough with the pitfalls flagged in advance.",
      },
    ],
  },
];
