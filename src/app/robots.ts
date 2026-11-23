import type { MetadataRoute } from "next";
import { site } from "@/config";
import { demoNoindex } from "@/config/security";

export default function robots(): MetadataRoute.Robots {
  // Demo/preview deployments (DEMO_NOINDEX=true) block all crawling and list no sitemaps.
  if (demoNoindex) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
