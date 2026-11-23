import type { SiteConfig } from "./types";
import { lowerFirst, stateName } from "@/lib/text";

/** Site 2 — same engine, different brand. Select with SITE=patientmovers. */
export const patientMovers: SiteConfig = {
  id: "patientmovers",
  name: "PatientMovers",
  domain: "patientmovers.com.au",
  url: "https://patientmovers.com.au",
  h1Suffix: "Patient Movers",
  tagline: "Care-first moves, done gently.",
  description:
    "Relocations for NDIS participants, aged-care and DVA clients, hospitals, schools and government — medical equipment included.",
  defaultSuburbSlug: "sydney-nsw",
  copyDir: "data/generated-copy/patientmovers",
  phone: { display: "1300 000 000", href: "tel:1300000000" }, // DEMO PLACEHOLDER
  email: "hello@patientmovers.com.au", // DEMO PLACEHOLDER
  nav: [
    { label: "Services", href: "/#sectors" },
    { label: "Equipment", href: "/#equipment" },
    { label: "Funding", href: "/#sectors" },
    { label: "Areas We Cover", href: "/suburbs" },
  ],
  hero: {
    eyebrow: "Care-led relocations",
    sub: "Hospital beds, hoists, lift chairs and whole households moved with patience, clear communication and set-up on arrival.",
    primaryCta: "Plan a Care Move",
    secondaryCta: { label: "How it works", href: "#process" },
    bullets: ["NDIS & aged care", "DVA clients", "Hospital discharge"],
  },
  trust: { rating: 4.9, count: 128, label: "Google reviews" }, // DEMO PLACEHOLDER
  proof: {
    // DEMO PLACEHOLDER
    caption: "Move snapshot",
    title: "Aged-care room set up same day",
    stats: [
      { value: 6, suffix: " hrs", label: "Door to set-up" },
      { value: 3, label: "Medical items moved" },
      { value: 100, suffix: "%", label: "Items re-assembled" },
    ],
  },
  ticker: ["NDIS Participant Moves", "MyAgedCare Relocations", "DVA Clients", "Hospital Bed & Hoist Transport", "School & Government Sites"],
  // DEMO PLACEHOLDER — confirm each assurance with the client before launch.
  compliance: [
    { title: "Care-aware crews", body: "Trained to work calmly around clients and carers.", icon: "badge" },
    { title: "Insured & documented", body: "Certificate of currency available on request.", icon: "shield" },
    { title: "Clear written plan", body: "Route, timing and set-up agreed in writing.", icon: "clipboard" },
    { title: "Flexible timing", body: "Moves scheduled around routines and appointments.", icon: "clock" },
  ],
  sectors: [
    { id: "ndis", title: "NDIS", blurb: "Moves planned around participants' routines and supports.", icon: "accessibility", points: ["Support-coordinator liaison", "Quiet, unhurried crews", "Equipment re-set-up"] },
    { id: "aged-care", title: "MyAgedCare", blurb: "Downsizing and residential-care moves with family updates.", icon: "home", points: ["Room-ready set-up", "Family communication", "Gentle pacing"] },
    { id: "dva", title: "DVA", blurb: "Respectful relocations for veterans and their families.", icon: "medal", points: ["Clear paperwork", "Flexible timing", "Careful handling"] },
    { id: "hospitals", title: "Hospitals", blurb: "Beds, hoists and clinical items between wards and homes.", icon: "hospital", points: ["Discharge-day moves", "Wipe-clean padding", "After-hours options"] },
    { id: "schools", title: "Schools", blurb: "Specialist and accessibility equipment moved between terms.", icon: "school", points: ["Holiday scheduling", "Sensory-room fit-outs", "Multi-site moves"] },
    { id: "government", title: "Government", blurb: "Inducted crews for public-sector care facilities.", icon: "landmark", points: ["Site inductions", "Safe work methods", "Tender support"] },
  ],
  equipment: [
    { title: "Stair-climbing chairs & trolleys", spec: "Heavy medical items up and down stairs safely.", art: "stair-climber" },
    { title: "Hoist & bed transport", spec: "Electric beds and hoists moved and re-assembled.", art: "gantry" },
    { title: "Low-profile dollies", spec: "Gentle rolling for lift chairs and cabinets.", art: "skates" },
    { title: "Tail-lift vehicles", spec: "No-lift loading for fragile equipment.", art: "tailgate" },
    { title: "Clinical-grade covers", spec: "Clean, wipe-down protection for medical gear.", art: "padding" },
    { title: "Access planning", spec: "Ramps, lifts and narrow halls mapped in advance.", art: "crane" },
  ],
  steps: [
    { title: "Tell us about the person & the move", body: "Routines, equipment, access needs and who we should keep informed." },
    { title: "Care & access plan", body: "We map the route, the equipment and a timeline that suits the client." },
    { title: "Gentle crew & set-up", body: "A patient crew moves everything and sets up key equipment on arrival." },
  ],
  quote: {
    title: "Plan a care move",
    itemTypes: ["Hospital bed", "Patient hoist", "Lift / recliner chair", "Mobility equipment", "Whole household", "Other"],
    weights: ["Single item", "A few items", "Room", "Whole home", "Not sure"],
    access: ["Ground level", "Stairs", "Lift / elevator", "Ramp", "Narrow hallways", "Care facility rules"],
    successMessage: "Thank you — a care-move coordinator will call you within one business day.",
  },
  ctaBand: { title: "A calmer move starts with one call.", body: "Tell us what matters to the person moving — we'll plan around it." },
  schema: { businessType: "MovingCompany", serviceType: "Care-focused relocation services", priceRange: "$$" },
  copy: {
    metaTitle: (s) => `${s.suburb} Patient Movers | ${s.state} Care Relocations`,
    metaDescription: (s) =>
      `Care-led moves in ${s.suburb} ${s.postcode} for NDIS, aged-care and DVA clients: beds, hoists and households moved gently across ${s.council}.`,
    fallback: (s) => ({
      intro: `Moving in ${s.suburb} when health or mobility matters? Our crews take the time to do it gently and set up what's needed on arrival.`,
      localContext: `We coordinate with families and care teams, including discharge moves from ${s.nearbyHospital}. In ${s.suburb}, ${lowerFirst(s.localAccessNote)}`,
      faqs: [
        { q: `Do you move hospital beds in ${s.suburb}?`, a: "Yes — electric beds and hoists are dismantled, transported and re-assembled by trained crews." },
        { q: `Can NDIS participants in ${stateName(s.state)} use your service?`, a: "Yes. We can quote and communicate with support coordinators; funding eligibility is confirmed by the participant's plan." },
        { q: "Can family members be kept updated?", a: "Yes. Tell us who to contact and we'll keep them informed from booking to set-up." },
      ],
    }),
  },
};
