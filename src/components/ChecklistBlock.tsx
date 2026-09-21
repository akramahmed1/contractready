"use client";

import { useState } from "react";

/** Interactive checklist: members can check items off as they complete them. */
export default function ChecklistBlock({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  function toggle(j: number) {
    setChecked((prev) => prev.map((v, k) => (k === j ? !v : v)));
  }

  return (
    <ul className="space-y-2">
      {items.map((item, j) => (
        <li
          key={j}
          className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
        >
          <input
            type="checkbox"
            checked={checked[j] ?? false}
            onChange={() => toggle(j)}
            className="mt-1 h-4 w-4 shrink-0 accent-green-700"
            aria-label={item}
          />
          <span className="leading-6">{item}</span>
        </li>
      ))}
    </ul>
  );
}
