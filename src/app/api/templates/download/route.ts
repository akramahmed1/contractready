import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserTier } from "@/lib/access";
import { tierUnlocks } from "@/lib/tiers";
import { getTemplate } from "@/content/templates";
import { logEventWait } from "@/lib/analytics";

/**
 * Records a template download. Called from the client before the file
 * is generated in the browser. Re-verifies tier access server-side so
 * the download log is trustworthy evidence (it backs the refund policy's
 * "no refund after any template download" rule).
 */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  let body: { templateId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const template = body.templateId ? getTemplate(body.templateId) : undefined;
  if (!template) {
    return NextResponse.json({ error: "Unknown template." }, { status: 404 });
  }
  const tier = await getUserTier(userId);
  if (!tierUnlocks(tier, template.tier)) {
    return NextResponse.json({ error: "Upgrade to download this template." }, { status: 403 });
  }
  await logEventWait("template_download", `/dashboard/templates?template=${template.id}`, userId, {
    tier: template.tier,
  });
  return NextResponse.json({ ok: true });
}
