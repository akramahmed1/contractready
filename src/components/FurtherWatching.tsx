import { toEmbedUrl } from "./LessonVideo";
import type { FurtherWatchingLink } from "@/content/types";

/**
 * Third-party "further watching" section. Renders official government videos
 * (GSA, SBA, APEX Accelerators) with clear source attribution. These are
 * never presented as ContractReady walkthroughs; our own walkthrough slot
 * (LessonVideo) stays separate and honest about what is recorded.
 */
export default function FurtherWatching({ items }: { items: FurtherWatchingLink[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10 border-t border-slate-200 pt-8" aria-label="Further watching">
      <h2 className="text-lg font-bold text-slate-900">Further watching</h2>
      <p className="mt-1 text-sm text-slate-600">
        Official videos from U.S. government sources, shared as a supplement to this lesson.
        These are third-party recordings, not ContractReady walkthroughs.
      </p>
      <div className="mt-4 space-y-8">
        {items.map((item) => {
          const embed = toEmbedUrl(item.url);
          if (!embed) return null;
          return (
            <div key={item.url}>
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500">Source: {item.source} (third-party video)</p>
              <div className="mt-3 overflow-hidden rounded-2xl bg-black ring-1 ring-slate-200">
                <iframe
                  src={embed}
                  title={`${item.title} (${item.source})`}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
