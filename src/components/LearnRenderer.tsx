import type { ContentBlock } from "@/content/types";

const CALLOUT_STYLES: Record<string, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  warn: "border-amber-200 bg-amber-50 text-amber-900",
  free: "border-green-200 bg-green-50 text-green-900",
};

const CALLOUT_LABELS: Record<string, string> = {
  info: "Note",
  warn: "Watch out",
  free: "Free path",
};

/** Renders structured lesson content. Server component; no client JS needed. */
export default function LearnRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="leading-7 text-slate-700">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="pt-4 text-xl font-bold text-slate-900">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-2 text-lg font-semibold text-slate-900">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2 pl-6 text-slate-700">
                {block.items.map((item, j) => (
                  <li key={j} className="leading-7">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-2 pl-6 text-slate-700">
                {block.items.map((item, j) => (
                  <li key={j} className="leading-7">
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <div key={i} className={`rounded-lg border px-4 py-3 ${CALLOUT_STYLES[block.style] ?? CALLOUT_STYLES.info}`}>
                <p className="text-sm font-semibold uppercase tracking-wide">
                  {CALLOUT_LABELS[block.style] ?? "Note"}
                </p>
                <p className="mt-1 leading-7">{block.text}</p>
              </div>
            );
          case "checklist":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
                  >
                    <input
                      type="checkbox"
                      disabled
                      className="mt-1 h-4 w-4 shrink-0 accent-green-700"
                      aria-label={item}
                    />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
