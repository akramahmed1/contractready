"use client";

import { useState } from "react";
import {
  DIRECTORY_SECTIONS,
  STATE_PORTALS,
  STATE_PORTALS_INTRO,
  type DirectorySection,
} from "@/content/opportunity-directory";

const TABS = [...DIRECTORY_SECTIONS.map((s) => ({ id: s.id, title: s.title })), { id: "states", title: "State portals" }];

function SectionLinks({ section }: { section: DirectorySection }) {
  if (section.links.length === 0) {
    return <p className="mt-4 text-sm text-slate-500">Links are being verified and will appear here shortly.</p>;
  }
  return (
    <ul className="mt-4 space-y-4">
      {section.links.map((link) => (
        <li key={link.url} className="rounded-xl border border-slate-200 bg-white p-5">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-900 underline"
          >
            {link.label}
          </a>
          <p className="mt-1 text-sm text-slate-600">{link.hint}</p>
          <p className="mt-1 truncate text-xs text-slate-400">{link.url}</p>
        </li>
      ))}
    </ul>
  );
}

export default function DirectoryTabs() {
  const [active, setActive] = useState("federal");
  const section = DIRECTORY_SECTIONS.find((s) => s.id === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Opportunity sources">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              active === tab.id
                ? "bg-[#0f3d2e] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        {section ? (
          <>
            <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
            <p className="mt-2 max-w-3xl text-slate-600">{section.intro}</p>
            <SectionLinks section={section} />
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-slate-900">State portals</h2>
            <p className="mt-2 max-w-3xl text-slate-600">{STATE_PORTALS_INTRO}</p>
            {STATE_PORTALS.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                The state portal directory is being verified and will appear here shortly.
              </p>
            ) : (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {STATE_PORTALS.map((s) => (
                  <li key={s.state} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="font-bold text-slate-900">
                      {s.state}
                      {s.verified === false && (
                        <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                          Unverified
                        </span>
                      )}
                    </p>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block truncate text-sm text-emerald-800 underline"
                      title={s.portalName}
                    >
                      {s.portalName}
                    </a>
                    {s.verified === false && s.note && (
                      <p className="mt-1 text-xs text-slate-500">{s.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <p className="mt-8 text-xs text-slate-500">
        These are directories of official sources, not live opportunity feeds. Listings
        change daily; always verify deadlines and requirements in the official
        solicitation. ContractReady is not affiliated with any government agency.
      </p>
    </div>
  );
}
