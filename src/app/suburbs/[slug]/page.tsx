import { notFound } from "next/navigation";
import Landing from "@/components/Landing";
import { loadCopy } from "@/lib/copy";
import { suburbJsonLd, suburbMetadata } from "@/lib/seo";
import { getPrioritySlugs, getSuburb } from "@/lib/suburbs";

// ~50 priority suburbs are built ahead of time; the rest render on first request (ISR).
export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return getPrioritySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/suburbs/[slug]">) {
  const suburb = getSuburb((await params).slug);
  if (!suburb) notFound();
  return suburbMetadata(suburb);
}

export default async function SuburbPage({ params }: PageProps<"/suburbs/[slug]">) {
  const suburb = getSuburb((await params).slug);
  if (!suburb) notFound();
  const { copy, source } = await loadCopy(suburb);
  return (
    <Landing suburb={suburb} copy={copy} copySource={source} jsonLd={suburbJsonLd(suburb, copy)} local />
  );
}
