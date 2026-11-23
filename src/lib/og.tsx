import { ImageResponse } from "next/og";
import { site } from "@/config";
import { tokens } from "@/config/tokens";

export const OG_SIZE = { width: 1200, height: 630 };

interface OgCard {
  /** Big orange first line (suburb name, or a site-wide kicker). */
  headline: string;
  /** White second line. */
  subline: string;
  /** Bottom-left caption. */
  place: string;
}

/** Shared 1200×630 social card used by the home and suburb OG routes. */
export function renderOgCard({ headline, subline, place }: OgCard): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: tokens.charcoal,
          backgroundImage: `linear-gradient(${tokens.charcoal800} 2px, transparent 2px), linear-gradient(90deg, ${tokens.charcoal800} 2px, transparent 2px)`,
          backgroundSize: "60px 60px",
          color: tokens.white,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 800 }}>
          <div style={{ width: 44, height: 44, background: tokens.safety, borderRadius: 8 }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -5, color: tokens.safety, lineHeight: 1 }}>
            {headline}
          </div>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05 }}>{subline}</div>
          <div style={{ width: 160, height: 10, background: tokens.safety, marginTop: 28, borderRadius: 5 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: tokens.mist }}>
          <span>{place}</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
