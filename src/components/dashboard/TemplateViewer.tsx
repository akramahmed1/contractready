"use client";

import { useState } from "react";

export default function TemplateViewer({
  templateId,
  title,
  filename,
  markdown,
}: {
  templateId: string;
  title: string;
  filename: string;
  markdown: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleDownload() {
    // Record the download server-side (evidence for refund policy), then
    // generate the file in the browser. A failed log call never blocks the download.
    fetch("/api/templates/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId }),
    }).catch(() => {});
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          {copied ? "Copied" : "Copy to clipboard"}
        </button>
        <button
          onClick={handleDownload}
          className="rounded-lg border border-emerald-900 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50"
        >
          Download .md
        </button>
      </div>
      <h2 className="mt-6 text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">
        Fill in the blanks, then save or print your completed copy.
      </p>
      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-6 font-mono text-sm leading-relaxed text-slate-800 shadow-sm">
        {markdown}
      </pre>
    </div>
  );
}
