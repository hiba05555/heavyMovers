"use client";

import { Search } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

/**
 * Filters the server-rendered suburb list in place (all links stay in the HTML for crawlers).
 * Rows carry `data-search`; state groups carry `data-group`.
 */
export default function SuburbFilter({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState<number | null>(null);

  const filter = (value: string) => {
    setQuery(value);
    const el = root.current;
    if (!el) return;
    const q = value.trim().toLowerCase();
    let count = 0;
    for (const group of el.querySelectorAll<HTMLElement>("[data-group]")) {
      let visible = 0;
      for (const row of group.querySelectorAll<HTMLElement>("[data-search]")) {
        const match = !q || (row.dataset.search ?? "").includes(q);
        row.hidden = !match;
        if (match) visible++;
      }
      group.hidden = visible === 0;
      count += visible;
    }
    setShown(q ? count : null);
  };

  return (
    <div className="mt-10">
      <div className="relative max-w-md">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/50" />
        <input
          type="search"
          aria-label="Filter suburbs"
          placeholder="Filter by suburb, state or postcode…"
          value={query}
          onChange={(e) => filter(e.target.value)}
          className="w-full rounded-full border border-white/15 bg-charcoal-800 py-3.5 pr-4 pl-12 text-white placeholder:text-white/45 focus:border-safety focus:outline-none"
        />
      </div>
      <p aria-live="polite" className="mt-3 h-5 text-sm text-white/60">
        {shown !== null && `${shown} matching suburb${shown === 1 ? "" : "s"}`}
      </p>
      <div ref={root} className="mt-6 space-y-12">
        {children}
      </div>
    </div>
  );
}
