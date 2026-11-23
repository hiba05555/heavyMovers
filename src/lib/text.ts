import type { StateCode } from "./suburbs";

const STATE_NAMES: Record<StateCode, string> = {
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  WA: "Western Australia",
  SA: "South Australia",
  TAS: "Tasmania",
  ACT: "the Australian Capital Territory",
  NT: "the Northern Territory",
};

export function stateName(code: StateCode): string {
  return STATE_NAMES[code];
}

/** Stable per-key choice so template copy varies between suburbs but never between builds. */
export function pick<T>(options: readonly T[], key: string): T {
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return options[hash % options.length];
}

/** Lower-cases the first letter unless the first word is an acronym (e.g. "CBD"). */
export function lowerFirst(text: string): string {
  return /^[A-Z][a-z]/.test(text) ? text[0].toLowerCase() + text.slice(1) : text;
}
