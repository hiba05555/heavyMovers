import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config";
import Landing from "@/components/Landing";
import { loadCopy } from "@/lib/copy";
import { clamp, DESCRIPTION_MAX, homeJsonLd, TITLE_MAX } from "@/lib/seo";
import { getSuburb } from "@/lib/suburbs";

const title = clamp(`${site.name} | ${site.tagline} Australia-wide`, TITLE_MAX);
const description = clamp(site.description, DESCRIPTION_MAX);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/" },
};

export default async function Home() {
  const suburb = getSuburb(site.defaultSuburbSlug);
  if (!suburb) notFound();
  const { copy, source } = await loadCopy(suburb);
  return <Landing suburb={suburb} copy={copy} copySource={source} jsonLd={homeJsonLd()} />;
}
