"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

/** Orange marquee. Pausable (WCAG 2.2.2); reduced-motion users get a static row via CSS. */
export default function Ticker({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);
  // Each half repeats the list so it always outruns wide screens; the loop shifts by exactly one half.
  const half = [...items, ...items];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {half.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-8 pr-8 text-base font-extrabold whitespace-nowrap sm:text-lg">
          {item}
          <span aria-hidden className="size-1.5 rounded-full bg-charcoal/50" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="What we move" className="relative flex items-center overflow-hidden bg-safety py-4 text-charcoal">
      <div
        className="flex w-max animate-marquee"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute right-3 flex items-center gap-1.5 rounded-full border border-charcoal/30 bg-safety px-3 py-1.5 text-xs font-bold shadow-[-24px_0_24px_var(--color-safety)] hover:bg-safety-600 sm:right-6"
      >
        {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
        {paused ? "Play" : "Pause"} motion
      </button>
    </section>
  );
}
