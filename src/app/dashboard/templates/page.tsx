import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getUserTier } from "@/lib/access";
import { PAID_TIERS, TIERS, tierUnlocks } from "@/lib/tiers";
import { TEMPLATES, getTemplate, templatesForTier } from "@/content/templates";
import TemplateViewer from "@/components/dashboard/TemplateViewer";
import { logEvent } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Template library | ContractReady",
  description: "Reusable bidding templates: checklists, matrices, and worksheets.",
};

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Please sign in</h1>
        <p className="mt-2 text-slate-600">The template library lives behind your account.</p>
        <Link
          href="/sign-in"
          className="mt-6 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const tier = await getUserTier(userId);
  const params = await searchParams;
  const active = params.template ? getTemplate(params.template) : undefined;

  if (active) {
    const unlocked = tierUnlocks(tier, active.tier);
    if (unlocked) {
      logEvent("template_view", `/dashboard/templates?template=${active.id}`, userId, {
        tier: active.tier,
      });
    }
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/dashboard/templates" className="text-sm font-semibold text-emerald-800 underline">
          Back to template library
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Template library</h1>
        {!unlocked ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
            <p className="font-semibold text-slate-900">This template needs {TIERS[active.tier].name}</p>
            <p className="mt-1 text-sm text-slate-700">
              Your current plan is {TIERS[tier].name}. Upgrade to unlock this template and
              everything below it.
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-block rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-white"
            >
              See plans
            </Link>
          </div>
        ) : (
          <div className="mt-6">
            <TemplateViewer templateId={active.id} title={active.title} filename={active.filename} markdown={active.markdown} />
          </div>
        )}
      </div>
    );
  }

  const unlockedTemplates = templatesForTier(tier);
  const lockedTemplates = TEMPLATES.filter((t) => !tierUnlocks(tier, t.tier));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/dashboard" className="text-sm font-semibold text-emerald-800 underline">
        Back to dashboard
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Template library</h1>
      <p className="mt-1 text-slate-600">
        Reusable checklists, matrices, and worksheets. Copy them into your own docs or
        download them as Markdown files.
      </p>

      {unlockedTemplates.length === 0 ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="font-semibold text-slate-900">No templates on the free plan</p>
          <p className="mt-1 text-sm text-slate-600">
            Templates unlock with the Bid Kit plan and above.{" "}
            <Link href="/pricing" className="font-semibold text-emerald-800 underline">
              See plans
            </Link>
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {unlockedTemplates.map((t) => (
            <Link
              key={t.id}
              href={`/dashboard/templates?template=${t.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-800 hover:shadow"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                {TIERS[t.tier].name} and above
              </p>
              <p className="mt-1 font-semibold text-slate-900">{t.title}</p>
              <p className="mt-1 text-sm text-slate-600">{t.summary}</p>
            </Link>
          ))}
        </div>
      )}

      {lockedTemplates.length > 0 && (
        <>
          <h2 className="mt-10 text-xl font-bold text-slate-900">Locked templates</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {lockedTemplates.map((t) => {
              const needed = PAID_TIERS.find((p) => tierUnlocks(p.id, t.tier));
              return (
                <div key={t.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Requires {TIERS[t.tier].name}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">{t.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{t.summary}</p>
                  {needed && (
                    <Link
                      href="/pricing"
                      className="mt-3 inline-block rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Upgrade to {needed.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
