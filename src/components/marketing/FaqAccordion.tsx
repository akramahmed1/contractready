"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className="divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-200">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-base font-semibold text-slate-900">{item.question}</span>
              <span
                aria-hidden="true"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-colors ${
                  open ? "bg-[#0f3d2e] text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {open ? "-" : "+"}
              </span>
            </button>
            {open && (
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-slate-700">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
