import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/stripe";

export default function robots(): MetadataRoute.Robots {
  const base = APP_URL.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Member and admin areas require sign-in; keep crawlers out.
        disallow: ["/dashboard/", "/admin", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
