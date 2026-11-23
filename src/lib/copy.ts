import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/config";
import type { SuburbCopy } from "@/config/types";
import { isSuburbCopy } from "./copy-schema";
import type { Suburb } from "./suburbs";

export type CopySource = "generated" | "template";

/** LLM copy from `<copyDir>/<slug>.json`; falls back to the config template if missing/invalid. */
export async function loadCopy(s: Suburb): Promise<{ copy: SuburbCopy; source: CopySource }> {
  const file = path.join(process.cwd(), site.copyDir, `${s.slug}.json`);
  try {
    const parsed: unknown = JSON.parse(await readFile(file, "utf8"));
    if (isSuburbCopy(parsed)) return { copy: parsed, source: "generated" };
  } catch {
    // Missing file is the normal case for most suburbs.
  }
  return { copy: site.copy.fallback(s), source: "template" };
}
