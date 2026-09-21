import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { notificationLog, users } from "@/db/schema";

/**
 * Transactional email. Provider: Resend (ranked pick: simplest API,
 * generous free tier, no SDK needed). Set RESEND_API_KEY and
 * EMAIL_FROM (a verified sending domain, e.g. hello@getcontractready.com)
 * to actually send. Until then every call is logged as "skipped" and
 * nothing leaves the server, so triggers can be wired safely today.
 *
 * Every template is transactional (purchase, delivery, account), never
 * marketing, and carries the independence disclosure so no message can
 * be read as coming from a government agency.
 */

const DISCLOSURE = `ContractReady is an independent private education and guidance service. It is not affiliated with or endorsed by SAM.gov, the General Services Administration, the Small Business Administration, or any government agency. Government registrations, certifications, and contract awards are controlled by the responsible agencies. Results vary, and no outcome is guaranteed.`;

function wrap(title: string, body: string): string {
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b;">
<h1 style="font-size:22px;color:#0f3d2e;">${title}</h1>
${body}
<hr style="margin:32px 0;border:none;border-top:1px solid #e2e8f0;" />
<p style="font-size:12px;color:#64748b;">${DISCLOSURE}</p>
</body></html>`;
}

export interface EmailTemplate {
  subject: string;
  html: string;
}

export function welcomeEmail(name?: string): EmailTemplate {
  return {
    subject: "Welcome to ContractReady, here is how to start",
    html: wrap(
      "Welcome to ContractReady",
      `<p>Hi${name ? ` ${name}` : ""},</p>
<p>Your account is ready. Here is the fastest path to value:</p>
<ol>
<li>Open your dashboard and start the first lesson.</li>
<li>Complete your opportunity profile so your SAM.gov search pack matches what you sell.</li>
<li>Browse the opportunities directory for live federal solicitations.</li>
</ol>
<p><a href="${process.env.APP_URL ?? ""}/dashboard">Go to your dashboard</a></p>
<p>SAM.gov itself is free to use. ContractReady teaches you how to use it well.</p>`
    ),
  };
}

export function purchaseConfirmationEmail(opts: {
  tierName: string;
  amount: string;
  expires: string;
}): EmailTemplate {
  return {
    subject: `Your ContractReady ${opts.tierName} plan is active`,
    html: wrap(
      "Payment confirmed",
      `<p>Thanks, your <strong>${opts.tierName}</strong> plan is now active.</p>
<ul>
<li>Amount paid: ${opts.amount}</li>
<li>Access through: ${opts.expires}</li>
</ul>
<p>This is a one-time purchase for 12 months of access. It does not auto-renew.</p>
<p><a href="${process.env.APP_URL ?? ""}/dashboard">Start learning</a></p>`
    ),
  };
}

export function checklistDeliveryEmail(): EmailTemplate {
  return {
    subject: "Your SAM.gov registration prep checklist",
    html: wrap(
      "Your checklist is attached to your download",
      `<p>Here is the SAM.gov registration prep checklist you requested.</p>
<p><a href="${process.env.APP_URL ?? ""}/free-checklist">Download the PDF again any time</a></p>
<p>When you are ready for the full walkthrough, the Starter plan covers registration end to end.</p>`
    ),
  };
}

export function bidKitReceivedEmail(title: string, promisedBy: string): EmailTemplate {
  return {
    subject: "We received your bid kit request",
    html: wrap(
      "Bid kit request received",
      `<p>We received your request for a bid kit on <strong>${title}</strong>.</p>
<p>Our team prepares every kit by hand: compliance checklist, templates, and a bid/no-bid worksheet, delivered to your dashboard by <strong>${promisedBy}</strong> (within 5 business days). If the solicitation changes before its due date, you get one revision.</p>
<p>ContractReady does not submit bids, set pricing, or make certifications on your behalf.</p>`
    ),
  };
}

export function bidKitStatusEmail(title: string, status: string): EmailTemplate {
  const label = status === "in_progress" ? "is now being prepared" : status;
  return {
    subject: `Your bid kit ${label}`,
    html: wrap(
      "Bid kit update",
      `<p>Your bid kit for <strong>${title}</strong> ${label}.</p>
<p><a href="${process.env.APP_URL ?? ""}/dashboard/bid-kits">View your bid kits</a></p>`
    ),
  };
}

export function bidKitDeliveredEmail(title: string): EmailTemplate {
  return {
    subject: "Your bid kit is ready",
    html: wrap(
      "Your bid kit is ready",
      `<p>Your bid kit for <strong>${title}</strong> is ready in your dashboard.</p>
<p>It includes your compliance checklist, filled templates, and the bid/no-bid worksheet. If the solicitation changes before its due date, reply and we will revise it once.</p>
<p><a href="${process.env.APP_URL ?? ""}/dashboard/bid-kits">Open your bid kit</a></p>`
    ),
  };
}

/** Looks up the member's email from the users table, if we have one. */
export async function getUserEmail(userId: string): Promise<string | null> {
  try {
    const db = getDb();
    const rows = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return rows[0]?.email ?? null;
  } catch {
    return null;
  }
}

export type NotificationType =
  | "welcome"
  | "purchase_confirmation"
  | "checklist_delivery"
  | "bidkit_received"
  | "bidkit_status"
  | "bidkit_delivered";

interface SendArgs {
  to: string;
  userId?: string | null;
  type: NotificationType;
  template: EmailTemplate;
}

/**
 * Sends a transactional email via Resend, or logs it as skipped when no
 * provider is configured. Every attempt is written to notification_log so
 * the admin can see exactly what went out and what is waiting on the
 * provider setup. Never throws: email must not break the request that
 * triggered it.
 */
export async function sendEmail({ to, userId, type, template }: SendArgs): Promise<void> {
  const db = getDb();
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  async function log(status: "sent" | "skipped" | "failed", error?: string) {
    try {
      await db.insert(notificationLog).values({
        userId: userId ?? null,
        email: to,
        type,
        subject: template.subject,
        status,
        error: error ?? null,
      });
    } catch (err) {
      console.error("notification log write failed", err);
    }
  }

  if (!apiKey || !from) {
    await log("skipped", "RESEND_API_KEY or EMAIL_FROM not configured");
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject: template.subject, html: template.html }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      await log("failed", `Resend ${res.status}: ${text.slice(0, 300)}`);
      return;
    }
    await log("sent");
  } catch (err) {
    await log("failed", err instanceof Error ? err.message : "send error");
  }
}
