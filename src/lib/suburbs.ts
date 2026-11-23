import rows from "../../data/australian-suburbs.json";

export const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;
export type StateCode = (typeof STATES)[number];

export interface Suburb {
  slug: string;
  suburb: string;
  state: StateCode;
  postcode: string;
  council: string;
  nearbyHospital: string;
  nearbySchool?: string;
  localAccessNote: string;
}

/** Lightweight row shipped to the client switcher/index (no long text). */
export type SuburbLite = Pick<Suburb, "slug" | "suburb" | "state" | "postcode">;

/** Number of suburbs pre-rendered at build. Data file is ordered by priority. */
export const PRIORITY_COUNT = 50;

function isState(value: string): value is StateCode {
  return (STATES as readonly string[]).includes(value);
}

function load(): Map<string, Suburb> {
  const map = new Map<string, Suburb>();
  for (const row of rows) {
    if (!isState(row.state)) throw new Error(`Invalid state "${row.state}" for ${row.slug}`);
    if (map.has(row.slug)) throw new Error(`Duplicate suburb slug: ${row.slug}`);
    map.set(row.slug, { ...row, state: row.state });
  }
  return map;
}

const BY_SLUG = load();
const ALL = [...BY_SLUG.values()];

export function getSuburb(slug: string): Suburb | undefined {
  return BY_SLUG.get(slug);
}

export function getAllSuburbs(): Suburb[] {
  return ALL;
}

export function getSuburbsLite(): SuburbLite[] {
  return ALL.map(({ slug, suburb, state, postcode }) => ({ slug, suburb, state, postcode }));
}

export function getPrioritySlugs(): string[] {
  return ALL.slice(0, PRIORITY_COUNT).map((s) => s.slug);
}

/** 4–6 nearby suburbs: same state first, then closest postcode overall. */
export function getNearby(s: Suburb, max = 6): Suburb[] {
  const pc = Number(s.postcode);
  const dist = (o: Suburb) => Math.abs(Number(o.postcode) - pc);
  const others = ALL.filter((o) => o.slug !== s.slug);
  const sameState = others.filter((o) => o.state === s.state).sort((a, b) => dist(a) - dist(b));
  const rest = others.filter((o) => o.state !== s.state).sort((a, b) => dist(a) - dist(b));
  return [...sameState, ...rest].slice(0, max);
}

/** Slug rule: lowercase `suburb-state`, postcode appended on collision. */
export function makeSlug(suburb: string, state: string, postcode: string, taken: Set<string>): string {
  const base = `${suburb}-${state}`
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return taken.has(base) ? `${base}-${postcode}` : base;
}

/** URLs per sitemap file (Google allows 50k; smaller files regenerate faster). */
export const SITEMAP_CHUNK = 5000;

export function sitemapCount(): number {
  return Math.max(1, Math.ceil(ALL.length / SITEMAP_CHUNK));
}
