# HeavyMovers — programmatic SEO lead-gen engine

A Next.js 16 (App Router) + TypeScript + Tailwind 4 site that turns one row of suburb data into a
complete, indexable landing page — `/suburbs/sydney-nsw`, `/suburbs/hobart-tas`, … — with unique
metadata, JSON-LD, Open Graph image and local copy. Site 1 is **heavymovers.com.au**; Site 2
(**patientmovers.com.au**) is the same code with a different config file.

## Run locally

Requires Node 20+.

```powershell
npm install
npm run dev          # http://localhost:3000
npm run build        # lint + type-check + production build (must pass)
npm start            # serve the production build
```

Useful URLs: `/`, `/suburbs`, `/suburbs/sydney-nsw`, `/suburbs/sydney-nsw/opengraph-image`,
`/sitemap/0.xml`, `/robots.txt`.

## Deploy to Vercel

1. Push the repo to GitHub and "Import Project" in Vercel — it is zero-config (framework: Next.js).
2. Env vars (see `.env.example`): `SITE` (`heavymovers` default, or `patientmovers`) and
   `DEMO_NOINDEX=true` on demo/preview deployments (noindex meta, `X-Robots-Tag`, `Disallow: /`).
   Both are build-time: redeploy after changing them. Security notes: `SECURITY.md`.
3. Point the domain at the project. `site.url` in the config is used for canonicals, sitemap and JSON-LD.

## How it works

| Piece | File |
| --- | --- |
| Brand, nav, sectors, equipment, steps, quote options, schema defaults, copy templates | `src/config/site.ts` |
| Site 2 config | `src/config/site.patientmovers.ts` |
| Config picker (`SITE` env) | `src/config/index.ts` |
| Suburb loader, nearby suburbs, slug rule | `src/lib/suburbs.ts` |
| Metadata + JSON-LD (`LocalBusiness` · `Service` · `BreadcrumbList`) | `src/lib/seo.ts` |
| Generated copy loader (falls back to template) | `src/lib/copy.ts` |
| Suburb page (SSG + ISR) | `src/app/suburbs/[slug]/page.tsx` |
| Per-suburb OG image | `src/app/suburbs/[slug]/opengraph-image.tsx` |
| Split sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Quote API stub (validates + logs, no email) | `src/app/api/quote/route.ts` |
| Suburb search for the switcher | `src/app/api/suburbs/route.ts` |

Design tokens (`charcoal`, `charcoal-800`, `safety`, `safety-600`, radii) live once in the `@theme`
block of `src/app/globals.css`; `src/config/tokens.ts` mirrors them for the OG image only.

## Scaling to 15,353 suburb pages

- **Data:** replace `data/australian-suburbs.json` with the full list (same schema). Order rows by
  priority — the first `PRIORITY_COUNT` (50) are pre-rendered at build.
- **Rendering:** `generateStaticParams` builds the priority pages; `dynamicParams = true` renders any
  other suburb on its first request and caches it (ISR, `revalidate = 86400`). Builds stay fast no
  matter how many rows exist.
- **Sitemaps:** `generateSitemaps` splits URLs into files of 5,000 (`/sitemap/0.xml` … `/sitemap/3.xml`
  for 15,353 rows); `robots.txt` lists every file.
- **Client weight:** the suburb switcher queries `/api/suburbs?q=` (top 8 matches) instead of shipping
  the full list to the browser.
- **Duplicate content:** every page uses its own council, hospital, school and access note, links to
  4–6 nearby suburbs, and can carry LLM-written copy (below). With the full dataset, consider splitting
  `/suburbs` into per-state index pages.

## Generating unique local copy

```powershell
npm run gen:copy -- --dry-run --limit 5
```

`scripts/generate-suburb-copy.ts` reads `data/suburbs-full.csv`, makes one Claude call per row and
writes `data/generated-copy/<slug>.json` (`{ intro, localContext, faqs[3–4] }`). Options:
`--limit N`, `--concurrency N` (default 4), `--force` (overwrite), `--csv path`. Existing files are
skipped. Without `ANTHROPIC_API_KEY` it always runs as a dry run and prints the prompts. Set
`CLAUDE_MODEL` to choose the model (default `claude-opus-5-5`). Output uses structured JSON output and is
validated before writing; invalid responses are retried. The prompt injects each row's facts and forbids
boilerplate and invented facts. Pages without a generated file use the template in the site config.

## Clone for Site 2 (patientmovers.com.au)

1. Copy `src/config/site.ts` to a new file (see `site.patientmovers.ts`) and change brand, sectors,
   equipment, steps, quote options and copy templates. TypeScript enforces the full `SiteConfig` shape.
2. Register it in `src/config/index.ts`.
3. Deploy the same repo as a second Vercel project with `SITE=patientmovers`.
4. Generate copy: `SITE=patientmovers npm run gen:copy` (writes to `data/generated-copy/patientmovers/`).

No component changes are needed.

## Honesty / placeholders

The phone number, review score and project stats are placeholders, tagged `// DEMO PLACEHOLDER` in
config and labelled "Demo" on screen. Ratings are deliberately left out of JSON-LD. Suburb facts to
verify are listed in `DATA_TODO.md`.
