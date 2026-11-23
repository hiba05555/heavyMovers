/**
 * Batch LLM copy generator: data/suburbs-full.csv → <copyDir>/<slug>.json ({ intro, localContext, faqs }).
 *
 *   npm run gen:copy -- [--limit N] [--concurrency N] [--force] [--dry-run] [--csv path]
 *
 * Dry-run is the default when ANTHROPIC_API_KEY is unset. Model: CLAUDE_MODEL (default claude-opus-5-5).
 */
import Anthropic from "@anthropic-ai/sdk";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { site } from "../src/config";
import { isSuburbCopy, COPY_JSON_SCHEMA } from "../src/lib/copy-schema";
import { makeSlug, STATES, type Suburb } from "../src/lib/suburbs";
import { stateName } from "../src/lib/text";
import { parseCsv } from "./csv";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const opt = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const CSV = opt("csv", "data/suburbs-full.csv");
const LIMIT = Number(opt("limit", "0")) || Infinity;
const CONCURRENCY = Math.max(1, Number(opt("concurrency", "4")));
const FORCE = flag("force");
const DRY_RUN = flag("dry-run") || !process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CLAUDE_MODEL ?? "claude-opus-5-5";
const ATTEMPTS = 3;
const OUT_DIR = path.join(process.cwd(), site.copyDir);

function toSuburbs(rows: Record<string, string>[]): Suburb[] {
  const taken = new Set<string>();
  return rows.flatMap((r) => {
    const state = STATES.find((s) => s === r.state?.toUpperCase());
    if (!state || !r.suburb || !r.postcode) {
      console.warn(`skip: invalid row ${JSON.stringify(r)}`);
      return [];
    }
    const slug = makeSlug(r.suburb, state, r.postcode, taken);
    taken.add(slug);
    return [{ slug, suburb: r.suburb, state, postcode: r.postcode, council: r.council, nearbyHospital: r.nearbyHospital, nearbySchool: r.nearbySchool || undefined, localAccessNote: r.localAccessNote }];
  });
}

const SYSTEM = `You write local landing-page copy for ${site.name} (${site.description}).
Tagline: "${site.tagline}". Sectors: ${site.sectors.map((s) => s.title).join(", ")}.
Rules:
- Australian English. Plain, confident, specific. No hype words ("premier", "leading", "best", "top-rated").
- Use ONLY the facts supplied for the suburb. Never invent distances, prices, years, statistics, licences, reviews or named staff.
- Every paragraph must contain details that only fit this suburb (its council, hospital, school, access note, state). A reader must not be able to swap in another suburb name and reuse the text.
- Vary sentence structure and openings; avoid boilerplate phrases like "look no further" or "we've got you covered".
- intro: 1–2 sentences (max 45 words). localContext: 2–4 sentences (max 110 words) built around the access note.
- faqs: 3 or 4 items; questions a facilities manager, school business manager, removalist or procurement officer in this suburb would really ask; answers 1–3 sentences, no promises of specific times or prices.`;

function prompt(s: Suburb): string {
  return [
    `Suburb: ${s.suburb}, ${stateName(s.state)} (${s.state}) ${s.postcode}`,
    `Local council: ${s.council}`,
    `Nearby hospital: ${s.nearbyHospital}`,
    s.nearbySchool ? `Nearby school: ${s.nearbySchool}` : "Nearby school: (none supplied — do not name one)",
    `Access note: ${s.localAccessNote}`,
    "",
    "Write the JSON copy for this suburb's page.",
  ].join("\n");
}

async function generate(client: Anthropic, s: Suburb): Promise<unknown> {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: SYSTEM,
      output_config: { effort: "medium", format: { type: "json_schema", schema: COPY_JSON_SCHEMA } },
      messages: [{ role: "user", content: prompt(s) }],
    });
    if (res.stop_reason === "refusal") throw new Error(`refused (${res.stop_details?.category ?? "unknown"})`);
    const text = res.content.find((b) => b.type === "text")?.text ?? "";
    try {
      const parsed: unknown = JSON.parse(text);
      if (isSuburbCopy(parsed)) return parsed;
    } catch {
      // fall through to retry
    }
    console.warn(`  ${s.slug}: invalid output (attempt ${attempt}/${ATTEMPTS})`);
  }
  throw new Error("no valid output after retries");
}

async function main() {
  const suburbs = toSuburbs(parseCsv(await readFile(CSV, "utf8")));
  const todo = suburbs.filter((s) => FORCE || !existsSync(path.join(OUT_DIR, `${s.slug}.json`))).slice(0, LIMIT);
  console.log(`${suburbs.length} rows · ${todo.length} to generate · model ${MODEL} · concurrency ${CONCURRENCY}${DRY_RUN ? " · DRY RUN" : ""}`);
  console.log(`output → ${path.relative(process.cwd(), OUT_DIR)}`);

  if (DRY_RUN) {
    for (const s of todo) console.log(`  would write ${s.slug}.json`);
    if (todo[0]) console.log(`\n--- system prompt ---\n${SYSTEM}\n\n--- sample user prompt (${todo[0].slug}) ---\n${prompt(todo[0])}`);
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const client = new Anthropic({ maxRetries: 4 }); // SDK retries 429/5xx/network with backoff
  const queue = [...todo];
  let ok = 0;
  const failed: string[] = [];
  const worker = async () => {
    for (let s = queue.shift(); s; s = queue.shift()) {
      try {
        const copy = await generate(client, s);
        await writeFile(path.join(OUT_DIR, `${s.slug}.json`), `${JSON.stringify(copy, null, 2)}\n`);
        ok++;
        console.log(`  ✓ ${s.slug}`);
      } catch (err) {
        failed.push(s.slug);
        console.error(`  ✗ ${s.slug}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`done: ${ok} written, ${failed.length} failed${failed.length ? ` (${failed.join(", ")})` : ""}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
