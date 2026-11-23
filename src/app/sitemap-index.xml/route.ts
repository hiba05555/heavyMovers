import { site } from "@/config";
import { sitemapCount } from "@/lib/suburbs";

/** Sitemap index (served at /sitemap.xml via a rewrite) listing each 5,000-URL sitemap file. */
export const dynamic = "force-static";

export function GET() {
  const entries = Array.from(
    { length: sitemapCount() },
    (_, id) => `  <sitemap><loc>${site.url}/sitemap/${id}.xml</loc></sitemap>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
