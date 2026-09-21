interface Props {
  videoUrl?: string;
  videoLabel?: string;
  lessonTitle: string;
}

export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "youtu.be") {
      const id =
        host === "youtu.be"
          ? u.pathname.slice(1)
          : (u.searchParams.get("v") ?? u.pathname.split("/embed/")[1] ?? "");
      if (!id) return null;
      return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (!id) return null;
      return `https://player.vimeo.com/video/${id}`;
    }
    if (/\.(mp4|webm)(\?|$)/i.test(u.pathname)) return url;
    return null;
  } catch {
    return null;
  }
}

/**
 * Lesson video walkthrough slot. Renders an embedded player when the lesson
 * has a recording; otherwise an honest placeholder noting walkthroughs are
 * planned, with the written lesson below as the complete reference.
 */
export default function LessonVideo({ videoUrl, videoLabel, lessonTitle }: Props) {
  if (!videoUrl) {
    return (
      <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-2xl" aria-hidden="true">
          🎬
        </p>
        <h2 className="mt-2 text-lg font-bold text-slate-900">Video walkthrough</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          We plan to add a recorded walkthrough for this lesson. Until then,
          the written lesson below is the complete reference and covers
          everything step by step.
        </p>
      </div>
    );
  }

  const embed = toEmbedUrl(videoUrl);
  if (!embed) return null;

  const isFile = /\.(mp4|webm)(\?|$)/i.test(videoUrl);
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-slate-900">
        {videoLabel ?? "Video walkthrough"}
      </h2>
      <div className="mt-3 overflow-hidden rounded-2xl bg-black ring-1 ring-slate-200">
        {isFile ? (
          <video controls preload="metadata" className="aspect-video w-full" title={lessonTitle}>
            <source src={videoUrl} />
            Your browser does not support embedded video.
          </video>
        ) : (
          <iframe
            src={embed}
            title={videoLabel ?? `Video walkthrough: ${lessonTitle}`}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
