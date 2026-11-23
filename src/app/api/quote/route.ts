import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote-schema";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

/**
 * Quote endpoint (stub: validates and logs, sends no email).
 * Responses never echo user input or stack traces; logs contain no personal data.
 */
const MAX_BODY_BYTES = 8 * 1024;
const limiter = createRateLimiter(5, 10 * 60 * 1000); // 5 requests / 10 min / IP

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin fetches may omit it; cross-site browser POSTs never do
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false; // e.g. "null" origin from sandboxed frames
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json(403, { ok: false, error: "Forbidden" });

  const rate = limiter(clientIp(request.headers));
  if (!rate.ok) {
    return json(429, { ok: false, error: "Too many requests" }, { "Retry-After": String(rate.retryAfterSec) });
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return json(415, { ok: false, error: "Unsupported content type" });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: "Request too large" });
  }
  const raw = await request.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return json(413, { ok: false, error: "Request too large" });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "Invalid request" });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    // Field names only — never the submitted values or zod's internal messages.
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? "body")))];
    return json(422, { ok: false, error: "Invalid fields", fields });
  }

  const lead = parsed.data;
  const id = randomUUID();
  if (lead.website) {
    // Honeypot tripped: pretend success so bots learn nothing; record only the fact.
    console.info("[quote] honeypot", { id });
    return json(200, { ok: true });
  }

  // No name, phone, email, organisation or notes in logs.
  console.info("[quote] lead received", {
    id,
    sector: lead.sector,
    itemType: lead.itemType,
    weight: lead.weight,
    accessCount: lead.access.length,
    receivedAt: new Date().toISOString(),
  });
  return json(200, { ok: true, id });
}
