import type { MetadataRoute } from "next";
import { site } from "@/config";
import { getAllSuburbs, SITEMAP_CHUNK, sitemapCount } from "@/lib/suburbs";

export async function generateSitemaps() {
  return Array.from({ length: sitemapCount() }, (_, id) => ({ id }));
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  const start = id * SITEMAP_CHUNK;
  const suburbs = getAllSuburbs().slice(start, start + SITEMAP_CHUNK);
  const pages: MetadataRoute.Sitemap = suburbs.map((s) => ({
    url: `${site.url}/suburbs/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  if (id !== 0) return pages;
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/suburbs`, changeFrequency: "weekly", priority: 0.8 },
    ...pages,
  ];
}
