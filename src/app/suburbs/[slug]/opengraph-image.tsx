import { site } from "@/config";
import { OG_SIZE, renderOgCard } from "@/lib/og";
import { getSuburb } from "@/lib/suburbs";

export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSuburb((await params).slug);
  return renderOgCard({
    headline: s?.suburb ?? site.name,
    subline: site.h1Suffix,
    place: s ? `${s.suburb}, ${s.state} ${s.postcode}` : "Australia-wide",
  });
}
