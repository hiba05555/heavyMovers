/**
 * Security headers, shared by next.config.ts. Build-time values: change env vars, then redeploy.
 *
 * CSP trade-off: Next.js can only drop 'unsafe-inline' for scripts with per-request nonces, which
 * forces dynamic rendering of every page (no SSG/ISR for 15k suburb pages). We keep static pages,
 * add SRI hashes to build script tags, and lock down everything else (see SECURITY.md).
 */
const isDev = process.env.NODE_ENV === "development";

export const demoNoindex = process.env.DEMO_NOINDEX === "true";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

export const securityHeaders: { key: string; value: string }[] = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  ...(demoNoindex ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
];
