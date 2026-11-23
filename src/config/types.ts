import type { Suburb } from "@/lib/suburbs";

/** Lucide icons a config may reference (mapped in components/icons/SectorIcon). */
export type IconName =
  | "hospital"
  | "school"
  | "truck"
  | "landmark"
  | "heart-handshake"
  | "home"
  | "medal"
  | "accessibility"
  | "clipboard"
  | "shield"
  | "badge"
  | "clock";

/** Custom inline-SVG line art (components/icons/EquipmentArt). */
export type ArtName = "stair-climber" | "gantry" | "skates" | "tailgate" | "padding" | "crane";

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface SuburbCopy {
  intro: string;
  localContext: string;
  faqs: Faq[];
}

export interface SiteConfig {
  id: string;
  name: string;
  domain: string;
  url: string;
  /** H1 is always `${suburb} ${h1Suffix}`. */
  h1Suffix: string;
  tagline: string;
  description: string;
  defaultSuburbSlug: string;
  /** Folder (from project root) holding LLM copy as <slug>.json. */
  copyDir: string;
  phone: { display: string; href: string };
  email: string;
  nav: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    sub: string;
    primaryCta: string;
    secondaryCta: { label: string; href: string };
    bullets: string[];
  };
  trust: { rating: number; count: number; label: string };
  proof: { caption: string; title: string; stats: Stat[] };
  ticker: string[];
  /** Procurement / safety assurances shown to institutional buyers. */
  compliance: { title: string; body: string; icon: IconName }[];
  sectors: { id: string; title: string; blurb: string; icon: IconName; points: string[] }[];
  equipment: { title: string; spec: string; art: ArtName }[];
  steps: { title: string; body: string }[];
  quote: {
    title: string;
    itemTypes: string[];
    weights: string[];
    access: string[];
    successMessage: string;
  };
  ctaBand: { title: string; body: string };
  schema: { businessType: string; serviceType: string; priceRange: string };
  /** Template copy used when no generated copy exists for a suburb. */
  copy: {
    metaTitle: (s: Suburb) => string;
    metaDescription: (s: Suburb) => string;
    fallback: (s: Suburb) => SuburbCopy;
  };
}
