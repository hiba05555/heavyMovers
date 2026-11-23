import type { SiteConfig } from "./types";
import { heavyMoversCopy } from "./copy.heavymovers";

export const heavyMovers: SiteConfig = {
  id: "heavymovers",
  name: "HeavyMovers",
  domain: "heavymovers.com.au",
  url: "https://heavymovers.com.au",
  h1Suffix: "Heavy Movers",
  tagline: "Heavy loads. Moved safely.",
  description:
    "Specialist heavy-item lifting and relocation for hospitals, schools, removalists and government across Australia.",
  defaultSuburbSlug: "sydney-nsw",
  copyDir: "data/generated-copy",
  phone: { display: "1300 000 000", href: "tel:1300000000" }, // DEMO PLACEHOLDER
  email: "quotes@heavymovers.com.au", // DEMO PLACEHOLDER
  nav: [
    { label: "Services", href: "/#sectors" },
    { label: "Equipment", href: "/#equipment" },
    { label: "Sectors", href: "/#sectors" },
    { label: "Areas We Cover", href: "/suburbs" },
  ],
  hero: {
    eyebrow: "Specialist heavy lifting",
    sub: "Stair-climbers, gantries and trained crews for the items standard removalists turn down — from MRI-adjacent equipment to 400 kg lab benches.",
    primaryCta: "Get a Lifting Quote",
    secondaryCta: { label: "See our equipment", href: "#equipment" },
    bullets: ["Hospitals & clinics", "Schools & labs", "Government sites"],
  },
  trust: { rating: 4.9, count: 312, label: "Google reviews" }, // DEMO PLACEHOLDER
  proof: {
    // DEMO PLACEHOLDER — replace with the client's verified figures.
    caption: "Project snapshot",
    title: "Imaging suite relocation, after hours",
    stats: [
      { value: 1200, suffix: " kg", label: "Heaviest single lift" },
      { value: 48, label: "Items moved overnight" },
      { value: 0, label: "Damage claims" },
    ],
  },
  ticker: [
    "Powered Stair-Climbers",
    "Hospital & MRI Equipment",
    "School & Lab Relocations",
    "Government Tenders",
    "Removalist Subcontracting",
  ],
  // DEMO PLACEHOLDER — confirm each assurance with the client before launch.
  compliance: [
    { title: "Safe work method statement", body: "A written SWMS and lift plan for every job.", icon: "clipboard" },
    { title: "Insured & documented", body: "Certificate of currency available on request.", icon: "shield" },
    { title: "Inducted, checked crews", body: "Site inductions and working-with-children checks.", icon: "badge" },
    { title: "After-hours windows", body: "Moves scheduled around wards, classes and offices.", icon: "clock" },
  ],
  sectors: [
    {
      id: "hospitals",
      title: "Hospitals",
      blurb: "Clinical and imaging equipment moved around live wards, after hours.",
      icon: "hospital",
      points: ["After-hours scheduling", "Clean, padded handling", "Lift & corridor planning"],
    },
    {
      id: "schools",
      title: "Schools",
      blurb: "Science labs, pianos and gym gear relocated between terms.",
      icon: "school",
      points: ["Holiday-period moves", "Lab benches & safes", "Multi-campus logistics"],
    },
    {
      id: "removalists",
      title: "Removalists",
      blurb: "Subcontract the heavy item so your crew keeps the job.",
      icon: "truck",
      points: ["White-label crews", "Same-week availability", "Your client, your brand"],
    },
    {
      id: "government",
      title: "Government",
      blurb: "Tender-ready documentation and site-inducted crews.",
      icon: "landmark",
      points: ["Safe work method statements", "Site inductions", "Panel & tender support"],
    },
  ],
  equipment: [
    { title: "Powered stair-climbers", spec: "Tracked units for heavy loads on fixed stairs.", art: "stair-climber" },
    { title: "Hydraulic gantries", spec: "Portable lift frames for machinery and safes.", art: "gantry" },
    { title: "Machinery skates", spec: "Low-profile rollers for dense, flat-based items.", art: "skates" },
    { title: "Air-ride tailgate fleet", spec: "Smooth suspension and hydraulic tail-lifts.", art: "tailgate" },
    { title: "Hospital-grade padding", spec: "Wipe-clean covers for clinical environments.", art: "padding" },
    { title: "Crane & hoist liaison", spec: "We coordinate cranes when stairs aren't an option.", art: "crane" },
  ],
  steps: [
    { title: "Share load & access details", body: "Tell us the item, its weight and every step, lift and doorway on the route." },
    { title: "Site & route assessment", body: "We plan equipment, crew size and timing — on site or from photos." },
    { title: "Specialist crew & equipment dispatch", body: "A trained crew arrives with the right gear, insured and inducted." },
  ],
  quote: {
    title: "Get a lifting quote",
    itemTypes: ["Medical / imaging equipment", "Safe or vault", "Piano", "Lab or workshop machinery", "Gym equipment", "Other heavy item"],
    weights: ["Under 150 kg", "150–400 kg", "400–1,000 kg", "Over 1,000 kg", "Not sure"],
    access: ["Ground level", "Stairs", "Lift / elevator", "Narrow doorways", "Tight corners", "Crane may be needed"],
    successMessage: "Thanks — a lifting specialist will review your load and call you within one business day.",
  },
  ctaBand: {
    title: "Got something nobody else will lift?",
    body: "Send the details in two minutes. We'll come back with a plan and a fixed quote.",
  },
  schema: { businessType: "MovingCompany", serviceType: "Heavy item lifting and relocation", priceRange: "$$" },
  copy: heavyMoversCopy,
};
