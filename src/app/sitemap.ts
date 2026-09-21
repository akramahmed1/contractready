import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/stripe";

// Public marketing pages only. Member-area pages (/dashboard/*, /admin)
// require sign-in and are intentionally excluded.
const PUBLIC_ROUTES = [
  "/",
  "/pricing",
  "/how-it-works",
  "/faq",
  "/free-checklist",
  "/legal/terms",
  "/legal/privacy",
  "/legal/refunds",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = APP_URL.replace(/\/$/, "");
  return PUBLIC_ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
