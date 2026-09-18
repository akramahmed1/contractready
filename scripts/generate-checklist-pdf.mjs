/**
 * Generates public/sam-gov-checklist.pdf: the free "SAM.gov Registration
 * Preparation Checklist" handout with ContractReady branding.
 *
 * Run: node scripts/generate-checklist-pdf.mjs  (from the project root)
 * Requires: pdfkit (npm install pdfkit)
 *
 * Copy rules: no em dashes or en dashes anywhere. Registration is always
 * described as free. No promises of wins or awards. Disclosure footer included.
 */
import PDFDocument from "pdfkit";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "sam-gov-checklist.pdf");
mkdirSync(dirname(outPath), { recursive: true });

const NAVY = "#1e3a5f";
const ACCENT = "#2f7d4f";
const GRAY = "#555555";
const LIGHT = "#f2f5f9";

const doc = new PDFDocument({ size: "LETTER", margins: { top: 54, bottom: 64, left: 54, right: 54 } });
doc.pipe((await import("node:fs")).createWriteStream(outPath));

const W = doc.page.width - 108; // usable width

function heading(text, size = 16) {
  doc.moveDown(0.9).fillColor(NAVY).font("Helvetica-Bold").fontSize(size).text(text, { width: W });
}
function body(text) {
  doc.moveDown(0.35).fillColor("#222222").font("Helvetica").fontSize(10.5).text(text, { width: W, lineGap: 2 });
}
function bullets(items) {
  doc.moveDown(0.25);
  for (const item of items) {
    doc.fillColor("#222222").font("Helvetica").fontSize(10.5);
    const y = doc.y;
    doc.text("\u2022", 54, y, { width: 18 });
    doc.text(item, 72, y, { width: W - 18, lineGap: 2 });
    doc.moveDown(0.3);
  }
}
function checkItems(items) {
  doc.moveDown(0.25);
  for (const item of items) {
    const y = doc.y;
    doc.rect(54, y + 2, 11, 11).strokeColor(NAVY).lineWidth(1).stroke();
    doc.fillColor("#222222").font("Helvetica").fontSize(10.5).text(item, 72, y, { width: W - 18, lineGap: 2 });
    doc.moveDown(0.45);
  }
}
function linkRow(label, url) {
  doc.moveDown(0.2);
  doc.fillColor("#222222").font("Helvetica-Bold").fontSize(10.5).text(label + ": ", { continued: true, width: W });
  doc.fillColor("#1a56db").font("Helvetica").text(url, { link: url, underline: true });
}
function divider() {
  doc.moveDown(0.6);
  doc.strokeColor("#d5dde8").lineWidth(1).moveTo(54, doc.y).lineTo(54 + W, doc.y).stroke();
}

// ---------- Page 1: header + what SAM.gov is ----------
doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(24).text("SAM.gov Registration", { width: W });
doc.fillColor(ACCENT).font("Helvetica-Bold").fontSize(24).text("Preparation Checklist", { width: W });
doc.moveDown(0.3);
doc.fillColor(GRAY).font("Helvetica").fontSize(11).text("A free guide from ContractReady", { width: W });

divider();

heading("What SAM.gov Is");
body(
  "SAM.gov, the System for Award Management, is the federal government's official registration " +
    "database for businesses that want to work with federal agencies. To bid on a federal contract " +
    "as a prime contractor, you need an active entity registration in SAM.gov."
);
body(
  "Registration is free. The government charges nothing for it, and no private company can register " +
    "faster than you can on your own. GSA says it plainly: you do not need to pay a third party " +
    "to register in SAM.gov."
);

heading("The Free Registration Path");
body(
  "1. Gather your documents using the checklist on the next page. Most delays come from information " +
    "that does not match official records.\n" +
    "2. Create a Login.gov account. SAM.gov signs you in through Login.gov.\n" +
    "3. Go to sam.gov and start an entity registration. Choose the full registration path for " +
    "bidding. The UEI-only path does not allow prime bidding.\n" +
    "4. Wait for validation. Plan on up to 10 to 12 business days while your tax ID is checked " +
    "against IRS records and your CAGE code is assigned.\n" +
    "5. Complete the registration sections: core data, assertions, representations and " +
    "certifications, and points of contact. Then submit and monitor your status until active."
);

heading("Timeline Expectations");
bullets([
  "Entity validation: up to 10 to 12 business days. You cannot pay to speed this up.",
  "Zero to first bid: 4 to 8 weeks for most businesses without certifications.",
  "With set-aside certifications (8(a), HUBZone, WOSB): 3 to 9 months total.",
  "Renewal: every 365 days. A lapsed registration can block bids and payments.",
  "Rule to know: your registration must be active when you submit your offer AND when the award is made.",
]);

// ---------- Page 2: document checklist ----------
doc.addPage();
heading("Document Checklist: Gather These First", 18);
body(
  "The number one cause of delays is your legal business name or address not matching IRS " +
    "records. Pull your IRS paperwork and copy the name and address character for character."
);
checkItems([
  "Employer Identification Number (EIN), free from the IRS at irs.gov",
  "Legal business name, exactly as it appears on your IRS paperwork",
  "Physical business address, exactly as the IRS has it (no PO box)",
  "Primary NAICS code plus secondary codes for your other lines of work",
  "Business bank account and routing numbers for electronic funds transfer",
  "Point of contact names, titles, email addresses, and phone numbers",
  "A Login.gov account, created before you start at sam.gov",
]);

heading("Common Pitfalls to Avoid");
bullets([
  "Name or address mismatch with IRS records: the top delay cause. Copy from paperwork, not memory.",
  "Taking the UEI-only path by mistake: it does not allow prime bidding.",
  "Starting registration the week a solicitation closes: validation takes business days.",
  "Paying a third party for registration: it is free at sam.gov, the only official site.",
  "Letting the 365-day renewal lapse: set calendar reminders at 90, 60, and 30 days out.",
  "Guessing on representations and certifications: these are legal statements. When unsure, ask a free counselor.",
]);

heading("Where Free Help Exists");
bullets([
  "APEX Accelerators: free procurement technical assistance for small businesses. Find yours at apexaccelerators.us.",
  "The Small Business Administration (SBA): free counseling on government contracting basics at sba.gov.",
]);
body(
  "A legitimate counselor will never charge you for SAM.gov registration help and will never " +
    "ask for a cut of future contracts."
);

heading("Free-Path Links");
linkRow("SAM.gov (official registration)", "https://sam.gov");
linkRow("SBA contracting guide", "https://www.sba.gov");
linkRow("APEX Accelerators finder", "https://apexaccelerators.us");
linkRow("SubNet subcontracting board", "https://www.sba.gov/federal-contracting/contracting-guide/prime-subcontracting/subcontracting-opportunities");

divider();
doc.moveDown(0.4);
doc.fillColor(GRAY).font("Helvetica").fontSize(9).text(
  "ContractReady is an independent educational product and is not affiliated with, endorsed by, " +
    "or acting on behalf of the U.S. government, GSA, or SBA. SAM.gov registration is free at " +
    "sam.gov. This guide is general information, not legal advice.",
  { width: W, lineGap: 2 }
);

doc.end();
console.log("Wrote " + outPath);
