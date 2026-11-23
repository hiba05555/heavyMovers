import type { SiteConfig } from "./types";
import { heavyMovers } from "./site";
import { patientMovers } from "./site.patientmovers";

const SITES: Record<string, SiteConfig> = {
  heavymovers: heavyMovers,
  patientmovers: patientMovers,
};

const selected = SITES[process.env.SITE ?? "heavymovers"] ?? heavyMovers;

/**
 * Public base URL for canonicals, sitemaps, JSON-LD and OG images.
 * SITE_URL wins; on Vercel the project's production URL (custom domain once attached) is used;
 * otherwise the config's domain. Keeps demo deployments' links pointing at themselves.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const deployedUrl = process.env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : undefined);

/** `SITE` env var selects the brand at build time. Default: heavymovers. */
export const site: SiteConfig = deployedUrl ? { ...selected, url: deployedUrl.replace(/\/$/, "") } : selected;
