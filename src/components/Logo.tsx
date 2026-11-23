import { site } from "@/config";

/** Simple wordmark: stacked-load mark + brand name (second word in orange). */
export default function Logo() {
  const [first, ...rest] = site.name.split(/(?=[A-Z])/);
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 text-safety">
        <rect x="2" y="18" width="28" height="11" rx="2.5" fill="currentColor" />
        <rect x="7" y="7" width="18" height="9" rx="2" fill="currentColor" opacity="0.65" />
        <rect x="12" y="1" width="8" height="4.5" rx="1.5" fill="currentColor" opacity="0.35" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight">
        {first}
        <span className="text-safety">{rest.join("")}</span>
      </span>
    </span>
  );
}
