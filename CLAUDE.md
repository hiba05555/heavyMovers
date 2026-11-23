# HeavyMovers — Programmatic SEO Lead-Gen Engine

## Purpose
Proof-of-concept Site 1 (`heavymovers.com.au`): heavy-item lifting & specialist moving for
Hospitals, Schools, Removalists (B2B) and Government. Reusable engine: Site 2
(`patientmovers.com.au`) must be a config + data swap, never a rewrite.
Goal: impress a first client. Must look expensive, load fast, and scale to 15,353 suburb pages.

## Stack
- Next.js (App Router) + TypeScript (strict) + Tailwind CSS. No CMS, DB or auth. Node 20+, Vercel zero-config.
- Allowed extras: `lucide-react`, `@anthropic-ai/sdk` + `tsx` (script only). Ask before adding others.

## Commands
- `npm run dev` · `npm run gen:copy` (script; dry-run without API key)
- `npm run build` — **must pass (types + lint) before any task is reported done**

## Design tokens (define ONCE in the Tailwind theme; never hardcode hex in components)
- `charcoal` #141716 (bg/header), `charcoal-800` #1E2321 (cards), `white` #FFFFFF
- `safety` #FF6B00 (CTAs, accents, ticker), `safety-600` #E65F00 (hover)
- Type: bold geometric sans via `next/font` (Inter/Poppins), tight headings, 8–12px radii.
- Feel: dark industrial, high contrast; orange only for actions and accents.

## Layout contract (match competitor LAYOUT, never their assets)
Sticky header → split hero → orange marquee ticker → 4 sector cards → equipment grid →
3-step process → quote CTA band → footer.
- Header: logo, nav (Services, Equipment, Sectors, Areas We Cover), phone pill, "Get a Lifting Quote".
- Hero: proof card left; right = Google-style trust pill, H1 `[Suburb] Heavy Movers`, tagline, dual CTAs.
- Ticker: Powered Stair-Climbers · Hospital & MRI Equipment · School & Lab Relocations ·
  Government Tenders · Removalist Subcontracting.
- Sectors: Hospitals, Schools, Removalists, Government.
- Equipment (6 cards, icon + one-line spec): Powered stair-climbers, Hydraulic gantries,
  Machinery skates, Air-ride tailgate fleet, Hospital-grade padding, Crane & hoist liaison.
- Process: 01 Share load & access details → 02 Site & route assessment → 03 Specialist crew & equipment dispatch.
- Quote = 2-step modal. Step 1: sector, item type/weight, stairs/access obstacles, suburb.
  Step 2: contact + organisation details.

## Design quality bar (this is a pitch: it must look expensive)
- Hero: oversized H1 (clamp 3rem→6rem), orange accent underline, subtle grid/noise on charcoal.
- Motion (CSS only, honour `prefers-reduced-motion`): fade-up on scroll, count-up stats, card hover lift.
- Custom inline-SVG orange line-art for equipment (stair-climber, gantry, skate); no stock photos.
- Mobile: sticky bottom bar (Call + Get Quote). Modal: progress bar, validation, success state.
- Lighthouse ≥95 Performance/SEO/Accessibility on `/` and a suburb page. Check 375/768/1440px.
- Open Graph image per suburb via `next/og`.

## File structure
```
src/config/site.ts               ALL brand values (name, domain, phone, tagline, sectors, equipment,
                                 ticker, steps, schema defaults)
src/config/site.patientmovers.ts Site 2 stub (NDIS, MyAgedCare, DVA, Hospitals, Schools, Gov)
src/app/page.tsx                 home (default suburb: Sydney)
src/app/suburbs/page.tsx         searchable suburb index
src/app/suburbs/[slug]/page.tsx  SSG/ISR + generateMetadata + JSON-LD
src/app/api/quote/route.ts       stub: validate, log, 200 (no real email)
src/app/sitemap.ts, robots.ts
src/components/                  Header, Hero, TrustPill, Ticker, SectorCards, EquipmentGrid,
                                 ProcessSteps, QuoteModal, SuburbSwitcher, NearbySuburbs, JsonLd, Footer
src/lib/suburbs.ts, seo.ts       typed loaders; metadata + JSON-LD builders
data/australian-suburbs.json     seed, 24 rows, all 8 states/territories
data/generated-copy/<slug>.json  LLM output; page falls back to template if missing
scripts/generate-suburb-copy.ts  batch LLM script (CSV → JSON)
reference/                       competitor screenshots (read-only)
```
Site selection: `SITE` env var picks the config (default `heavymovers`).

## Suburb schema
`{ slug, suburb, state: NSW|VIC|QLD|WA|SA|TAS|ACT|NT, postcode, council, nearbyHospital, nearbySchool?, localAccessNote }`
Slug = lowercase `suburb-state` (append postcode on collision). Must work unchanged with 15,353 rows.

## SEO rules
- Per page: unique `<title>` (≤60), meta description (≤155), canonical, ONE H1 `${suburb} Heavy Movers`.
- JSON-LD: `LocalBusiness` + `Service` + `BreadcrumbList`, built in `lib/seo.ts`.
- Body uses the suburb's own data (hospital, school, council, access note) + 4–6 nearby-suburb links.
  No page may be a find-and-replace clone of another.
- Scale: `generateStaticParams` pre-renders ~50 priority suburbs; `dynamicParams = true` (ISR) for the
  rest; split sitemap with `generateSitemaps`.
- SuburbSwitcher (top bar, client): search/select any suburb → `/suburbs/[slug]`; H1, hospital/council
  text and JSON-LD update. Add a "view schema" toggle for the demo.

## Honesty rules
- Unverifiable data = placeholder in config, tagged `// DEMO PLACEHOLDER`: phone (1300 000 000),
  review score/count, proof-card stats. Never present fake data as real.
- Do NOT copy competitor logo, photos, brand name, phone or wording. Tagline: "Heavy loads. Moved safely."
- No photos of real people. Simple wordmark logo.
- Suburb facts must be real. If unsure, omit and list in `DATA_TODO.md`.

## Coding rules
- Server Components by default; `"use client"` only for QuoteModal, SuburbSwitcher, Ticker pause.
- Strict TS, no `any`, no dead code, files <200 lines, mobile-first, semantic HTML.
- A11y: modal focus trap + Esc, visible focus rings, alt text, reduced-motion pauses ticker.
- Brand strings only from config; never hardcode the brand name or domain in components.
- `next/image`, `next/font`; no external runtime requests.
- Do not commit or push unless asked. Never modify `reference/`.

## Batch script
CSV (`data/suburbs-full.csv`) → one LLM call per row (model from `CLAUDE_MODEL`) →
`data/generated-copy/<slug>.json` `{ intro, localContext, faqs[3-4] }`. Concurrency limit, retries,
skip-if-exists, `--limit N`, `--dry-run` (default without `ANTHROPIC_API_KEY`). Prompt injects the
row's local facts and forbids boilerplate, to avoid duplicate-content penalties.

## Definition of done
`npm run build` passes · `/`, `/suburbs`, 3+ suburb pages render · unique title/H1/JSON-LD in
view-source · Lighthouse ≥95 · README: run, deploy, clone-for-Site-2.