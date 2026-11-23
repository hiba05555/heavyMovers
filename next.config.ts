import type { NextConfig } from "next";
import { securityHeaders } from "./src/config/security";

// Cache Components stays off: the suburb engine uses the classic ISR model
// (generateStaticParams + dynamicParams + revalidate) so 15k pages render on demand.
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Subresource Integrity: hashes on build script tags; compatible with static pages.
  experimental: { sri: { algorithm: "sha256" } },
  // Generated copy is read with fs at request time (ISR), so ship it with the function.
  outputFileTracingIncludes: {
    "/suburbs/[slug]": ["./data/generated-copy/**/*.json"],
    "/": ["./data/generated-copy/**/*.json"],
  },
  async rewrites() {
    // One well-known URL for crawlers: the index of the split /sitemap/<id>.xml files.
    return { beforeFiles: [{ source: "/sitemap.xml", destination: "/sitemap-index.xml" }], afterFiles: [], fallback: [] };
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
