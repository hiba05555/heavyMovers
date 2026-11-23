import type { ReactNode } from "react";
import type { ArtName } from "@/config/types";
import { StairClimberScene } from "./HeroArt";

/** Custom orange line-art (stroke = currentColor). Drawn on a 120×90 grid. */
const ART: Record<ArtName, ReactNode> = {
  "stair-climber": (
    <g transform="scale(.3)" strokeWidth="8">
      <StairClimberScene />
    </g>
  ),
  gantry: (
    <>
      <path d="M12 16h96" strokeWidth="5" />
      <path d="M22 16 12 78M22 16l10 62M98 16l-10 62M98 16l10 62M8 78h28M84 78h28" />
      <circle cx="12" cy="82" r="3" />
      <circle cx="32" cy="82" r="3" />
      <circle cx="88" cy="82" r="3" />
      <circle cx="108" cy="82" r="3" />
      <rect x="52" y="11" width="16" height="9" rx="2" />
      <path d="M60 20v18" strokeDasharray="3 3" />
      <rect x="54" y="38" width="12" height="9" rx="2" />
      <path d="M60 47v4a3 3 0 1 1-3 3" />
      <rect x="42" y="58" width="36" height="20" rx="2" />
      <path d="M42 58l36 20M78 58 42 78" opacity=".4" />
    </>
  ),
  skates: (
    <>
      <path d="M2 82h116" opacity=".45" />
      <rect x="26" y="16" width="68" height="46" rx="3" />
      <rect x="36" y="26" width="22" height="14" rx="2" opacity=".6" />
      <circle cx="78" cy="33" r="6" opacity=".6" />
      <rect x="20" y="64" width="30" height="8" rx="3" />
      <rect x="70" y="64" width="30" height="8" rx="3" />
      <circle cx="27" cy="77" r="3.5" />
      <circle cx="43" cy="77" r="3.5" />
      <circle cx="77" cy="77" r="3.5" />
      <circle cx="93" cy="77" r="3.5" />
      <path d="M4 40h12M8 50h10M2 60h12" opacity=".5" />
    </>
  ),
  tailgate: (
    <>
      <path d="M2 82h116" opacity=".45" />
      <rect x="32" y="14" width="62" height="50" rx="3" />
      <path d="M32 30H16L8 46v18h24" />
      <path d="M16 34h12v10H12" opacity=".6" />
      <circle cx="24" cy="70" r="8" />
      <circle cx="78" cy="70" r="8" />
      <path d="M40 68l4-4 4 4 4-4 4 4" opacity=".6" />
      <path d="M94 44v30M94 74h22" strokeWidth="4" />
      <rect x="99" y="56" width="14" height="16" rx="2" />
    </>
  ),
  padding: (
    <>
      <rect x="22" y="12" width="76" height="58" rx="10" />
      <path d="M22 32 42 12M22 52l40-40M30 70l52-52M50 70l40-40M70 70l28-28" opacity=".35" />
      <path d="M22 70c8 10 16 10 24 0s16-10 24 0 16 10 28 0" />
      <rect x="50" y="30" width="20" height="20" rx="3" fill="var(--color-charcoal-800)" />
      <path d="M60 34v12M54 40h12" strokeWidth="3.5" />
    </>
  ),
  crane: (
    <>
      <path d="M2 84h116" opacity=".45" />
      <path d="M26 84V14M38 84V14M26 84h12" />
      <path d="M26 24l12-10M26 40l12-12M26 56l12-12M26 72l12-12" opacity=".5" />
      <path d="M8 14h108M8 22h108" />
      <path d="M38 22l8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8" opacity=".5" />
      <rect x="6" y="24" width="16" height="12" rx="2" />
      <path d="M32 14 30 4" />
      <path d="M100 22v28" strokeDasharray="3 3" />
      <path d="M100 50v4a3 3 0 1 1-3 3" />
      <rect x="86" y="62" width="28" height="18" rx="2" />
    </>
  ),
};

export default function EquipmentArt({ name, className }: { name: ArtName; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 90"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ART[name]}
    </svg>
  );
}
