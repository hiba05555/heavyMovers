/**
 * Tracked stair-climber carrying a strapped load up a flight of stairs (400×300 grid).
 * Stairs rise at 35°, so the track sits exactly on the nosing line. Shared with EquipmentArt.
 */
export function StairClimberScene() {
  return (
    <>
      <path d="M10 280h90v-28h40v-28h40v-28h40v-28h40v-28h40v-28h80" opacity=".8" />
      <g transform="translate(100 252) rotate(-35)">
        <rect x="0" y="-14" width="160" height="14" rx="7" />
        <circle cx="8" cy="-7" r="3.5" />
        <circle cx="152" cy="-7" r="3.5" />
        <path d="M6-14-8-128M-8-128h-22" />
        <rect x="22" y="-102" width="112" height="84" rx="4" />
        <path d="M50-102v84M106-102v84" opacity=".75" />
      </g>
    </>
  );
}

/** Hero version: the scene plus schematic annotations. */
export default function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <StairClimberScene />
      <path d="M100 252l200-140" strokeDasharray="2 8" opacity=".35" />
      <path d="M150 280a50 50 0 0 0-8-28" opacity=".5" strokeWidth="2" />
      <text x="158" y="270" fill="currentColor" stroke="none" fontSize="14" fontWeight="700" opacity=".7">
        35°
      </text>
      <g transform="translate(100 252) rotate(-35)" strokeWidth="2">
        <path d="M24-7h16M52-7h16M80-7h16M108-7h16" opacity=".5" />
        <path d="M-2-70h18M22-60h112" opacity=".3" />
        <circle cx="78" cy="-60" r="7" />
        <path d="M78-67v14M71-60h14" />
      </g>
      <g opacity=".7" strokeWidth="2">
        <path d="M336 40l14-18 14 18M350 22v30" />
        <path d="M318 62h64" strokeDasharray="4 4" />
      </g>
    </svg>
  );
}
