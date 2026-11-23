import { site } from "@/config";
import { OG_SIZE, renderOgCard } from "@/lib/og";

// Site-wide card: used by "/" and inherited by "/suburbs" (suburb pages have their own).
export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    headline: "Australia-wide",
    subline: site.h1Suffix,
    place: site.sectors.map((s) => s.title).join(" · "),
  });
}
