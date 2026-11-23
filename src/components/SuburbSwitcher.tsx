"use client";

import { Code2, Loader2, MapPin, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { SuburbLite } from "@/lib/suburbs";

interface Props {
  current: Pick<SuburbLite, "slug" | "suburb" | "state">;
  /** Server-built JSON-LD for the "view schema" demo toggle. */
  schemaJson: string;
}

/** Service-area bar: shows the current suburb, searches any suburb, and reveals the page's JSON-LD. */
export default function SuburbSwitcher({ current, schemaJson }: Props) {
  const router = useRouter();
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SuburbLite[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSchema, setShowSchema] = useState(false);
  const open = query.trim().length > 0 && results.length > 0;

  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/suburbs?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });
        setResults((await res.json()) as SuburbLite[]);
        setActive(0);
      } catch {
        // Aborted by a newer keystroke.
      } finally {
        setLoading(false);
      }
    }, 150);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query]);

  const go = (s: SuburbLite) => {
    setQuery("");
    setResults([]);
    setSearchOpen(false);
    router.push(`/suburbs/${s.slug}`);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
    else if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
    else if (e.key === "Enter" && results[active]) go(results[active]);
    else if (e.key === "Escape") {
      setQuery("");
      setSearchOpen(false);
    } else return;
    e.preventDefault();
  };

  const toggleSearch = () => {
    setSearchOpen((v) => !v);
    requestAnimationFrame(() => input.current?.focus());
  };

  return (
    <div className="relative z-50 border-b border-white/5 bg-black/30 text-[13px]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-1.5 sm:px-6 lg:px-8">
        <p className="flex items-center gap-1.5 text-white/60">
          <MapPin aria-hidden className="size-3.5 text-safety" />
          <span className="hidden sm:inline">Service area:</span>
          <strong className="font-semibold text-white">
            {current.suburb}, {current.state}
          </strong>
        </p>
        <button
          type="button"
          onClick={toggleSearch}
          aria-expanded={searchOpen}
          className="rounded-full px-2 py-1 font-semibold text-safety underline-offset-4 hover:underline sm:hidden"
        >
          {searchOpen ? "Cancel" : "Change area"}
        </button>
        <div className={`relative order-3 w-full sm:order-none sm:block sm:w-64 ${searchOpen ? "block" : "hidden"}`}>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/45" />
          <input
            ref={input}
            type="search"
            role="combobox"
            aria-label="Switch suburb"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={open ? `${listId}-${active}` : undefined}
            placeholder="Find your suburb or postcode"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 pr-8 pl-8 text-white transition-colors outline-none placeholder:text-white/40 hover:border-white/25 focus:border-safety focus:bg-charcoal-800"
          />
          {loading && <Loader2 aria-hidden className="absolute top-1/2 right-3 size-3.5 -translate-y-1/2 animate-spin text-white/50" />}
          <ul
            id={listId}
            role="listbox"
            aria-label="Suburbs"
            hidden={!open}
            className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-card border border-white/10 bg-charcoal-800 py-1 text-sm shadow-2xl shadow-black/50"
          >
            {results.map((s, i) => (
              <li
                key={s.slug}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(s)}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 ${
                  i === active ? "bg-white/10 text-white" : "text-white/80"
                }`}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <MapPin aria-hidden className={`size-3.5 ${i === active ? "text-safety" : "text-white/30"}`} />
                  {s.suburb}
                </span>
                <span className="text-xs text-white/50 tabular-nums">
                  {s.state} {s.postcode}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setShowSchema((v) => !v)}
          aria-expanded={showSchema}
          aria-controls="schema-panel"
          aria-label={showSchema ? "Hide SEO schema" : "View SEO schema"}
          className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-white/50 transition-colors hover:bg-white/5 hover:text-white"
        >
          {showSchema ? <X aria-hidden className="size-3.5" /> : <Code2 aria-hidden className="size-3.5" />}
          <span className="hidden sm:inline">SEO demo</span>
        </button>
      </div>
      {showSchema && (
        <div id="schema-panel" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs text-white/60">
            Structured data rendered in this page&apos;s HTML: LocalBusiness · Service · BreadcrumbList
          </p>
          <pre className="max-h-80 overflow-auto rounded-card border border-white/10 bg-charcoal-800 p-4 text-xs leading-relaxed text-white/80">
            {JSON.stringify(JSON.parse(schemaJson), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
