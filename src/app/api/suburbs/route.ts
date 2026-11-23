import { NextResponse } from "next/server";
import { getSuburbsLite } from "@/lib/suburbs";

const LIMIT = 8;
const INDEX = getSuburbsLite().map((s) => ({ ...s, key: `${s.suburb} ${s.state} ${s.postcode}`.toLowerCase() }));

/** Suburb search for the switcher. Keeps the 15k-row list off the client. */
export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 60);
  if (!q) return NextResponse.json([]);
  const starts = INDEX.filter((s) => s.key.startsWith(q));
  const contains = INDEX.filter((s) => !s.key.startsWith(q) && s.key.includes(q));
  const results = [...starts, ...contains].slice(0, LIMIT).map(({ slug, suburb, state, postcode }) => ({
    slug,
    suburb,
    state,
    postcode,
  }));
  return NextResponse.json(results, { headers: { "Cache-Control": "public, max-age=3600" } });
}
