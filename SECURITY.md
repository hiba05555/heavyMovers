# Security

This is a demo build. It applies sensible defaults; it has not been penetration-tested or audited.

## Hardened in this codebase
- **Security headers** (`src/config/security.ts`, all routes): Content-Security-Policy, HSTS
  (2 years, includeSubDomains, no preload), X-Content-Type-Options, X-Frame-Options DENY,
  Referrer-Policy, Permissions-Policy (camera, mic, geolocation, payment off), CORP. COOP is omitted:
  it breaks Lighthouse/PageSpeed trace recording and the site opens no cross-origin windows.
- **CSP:** `default-src 'self'`, no third-party origins, `object-src 'none'`, `frame-ancestors 'none'`,
  `base-uri`/`form-action 'self'`. Next's experimental SRI adds integrity hashes to the build's
  script tags (6 of 9 on a typical page; chunks Next loads at runtime are not covered).
  **Known gap:** `script-src` and `style-src` allow `'unsafe-inline'`. Next.js needs per-request
  nonces to remove it, and nonces force dynamic rendering of every page (no static/ISR suburb pages).
  We tested the strict policy: it blocks Next's inline bootstrap scripts and breaks the page.
- **`/api/quote`:** zod schema with `.strict()` (unknown keys rejected); options must match the
  form's own lists; every string length-capped; 8 KB body limit; JSON only; same-origin check;
  honeypot field (bots get a fake success); 5 requests / 10 min per IP; errors return field names
  only, never submitted values or stack traces; logs contain no name, phone, email or notes.
- **`/api/suburbs`:** query length capped; returns public suburb names only.
- **Demo noindex:** `DEMO_NOINDEX=true` adds a noindex meta tag, `X-Robots-Tag` and `Disallow: /`.
- **Secrets:** none in the repo; `.env*` is git-ignored; see `.env.example`. The Anthropic key is
  only used by the local copy script, never by the website.
- **Dependencies:** `npm audit` reported 0 known vulnerabilities at the time of writing.

## The client must still configure
- **Lead delivery:** a real email/CRM provider (e.g. via an API key held in the host's secret
  store), with the provider's own spam filtering. The endpoint currently only logs.
- **Rate limiting at scale:** the limiter is in-memory per server instance. On Vercel/serverless use
  a shared store (Redis/Upstash) or the platform firewall's rate-limit rules.
- **WAF/CDN and bot protection:** e.g. Vercel Firewall or Cloudflare, plus a CAPTCHA-style
  challenge (Turnstile/hCaptcha) on the quote form if spam appears. The honeypot only stops naive bots.
- **Monitoring:** error tracking, uptime checks and alerting on quote-endpoint failures/429 spikes.
- **Privacy:** a privacy policy and data-retention rule for leads (Australian Privacy Principles).
- **HSTS preload:** only after confirming every subdomain serves HTTPS.
- **Stricter CSP (optional):** switch to nonces if the performance cost of dynamic rendering is acceptable.

## Reporting a vulnerability
Email the site owner (address to be confirmed by the client). Please do not open public issues.
