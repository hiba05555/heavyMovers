import type { Metadata } from "next";
import { site } from "@/config";
import type { SuburbCopy } from "@/config/types";
import type { Suburb } from "./suburbs";
import { stateName } from "./text";

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

export function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function suburbPath(s: Suburb): string {
  return `/suburbs/${s.slug}`;
}

export function suburbH1(s: Suburb): string {
  return `${s.suburb} ${site.h1Suffix}`;
}

export function suburbMetadata(s: Suburb): Metadata {
  const title = clamp(site.copy.metaTitle(s), TITLE_MAX);
  const description = clamp(site.copy.metaDescription(s), DESCRIPTION_MAX);
  const url = suburbPath(s);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export type JsonLd = Record<string, unknown>;

const BUSINESS_ID = `${site.url}/#business`;

/** Business node. No aggregateRating: review data is a demo placeholder. */
function business(areaServed: JsonLd): JsonLd {
  return {
    "@type": site.schema.businessType,
    "@id": BUSINESS_ID,
    name: site.name,
    url: site.url,
    telephone: site.phone.display,
    email: site.email,
    slogan: site.tagline,
    priceRange: site.schema.priceRange,
    areaServed,
  };
}

function service(id: string, name: string, description: string, areaServed: JsonLd): JsonLd {
  return {
    "@type": "Service",
    "@id": id,
    name,
    serviceType: site.schema.serviceType,
    description,
    provider: { "@id": BUSINESS_ID },
    areaServed,
    audience: site.sectors.map((sec) => ({ "@type": "Audience", audienceType: sec.title })),
  };
}

/** LocalBusiness + Service + BreadcrumbList for one suburb page. */
export function suburbJsonLd(s: Suburb, copy: SuburbCopy): JsonLd {
  const pageUrl = `${site.url}${suburbPath(s)}`;
  const area: JsonLd = {
    "@type": "Place",
    name: `${s.suburb} ${s.state} ${s.postcode}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: s.suburb,
      addressRegion: s.state,
      postalCode: s.postcode,
      addressCountry: "AU",
    },
  };
  const crumbs = [
    ["Home", site.url],
    ["Areas We Cover", `${site.url}/suburbs`],
    [stateName(s.state), `${site.url}/suburbs#${s.state.toLowerCase()}`],
    [suburbH1(s), pageUrl],
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      business(area),
      service(`${pageUrl}#service`, suburbH1(s), copy.intro, area),
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
      },
    ],
  };
}

/** Home page graph: the business and its national service. */
export function homeJsonLd(): JsonLd {
  const australia: JsonLd = { "@type": "Country", name: "Australia" };
  return {
    "@context": "https://schema.org",
    "@graph": [business(australia), service(`${site.url}/#service`, site.name, site.description, australia)],
  };
}
