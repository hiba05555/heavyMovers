/**
 * Minimal fixed-window rate limiter, in memory.
 * Per server instance only: on serverless/multi-instance hosting, use a shared store
 * (e.g. Upstash/Redis or the platform's firewall rules) — see SECURITY.md.
 */
interface Window {
  count: number;
  resetAt: number;
}

const MAX_KEYS = 10_000;

export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, Window>();
  return function check(key: string, now = Date.now()): { ok: boolean; retryAfterSec: number } {
    if (hits.size > MAX_KEYS) {
      for (const [k, w] of hits) if (w.resetAt <= now) hits.delete(k);
      if (hits.size > MAX_KEYS) hits.clear(); // hard cap: never grow without bound
    }
    const w = hits.get(key);
    if (!w || w.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, retryAfterSec: 0 };
    }
    w.count++;
    return { ok: w.count <= limit, retryAfterSec: Math.ceil((w.resetAt - now) / 1000) };
  };
}

/** Best-effort client IP behind a proxy/CDN (first X-Forwarded-For hop). */
export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
