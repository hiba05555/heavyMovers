/** Quote form shape + client-side validation (the server re-validates with zod in quote-schema.ts). */
export interface QuoteData {
  sector: string;
  itemType: string;
  weight: string;
  access: string[];
  suburb: string;
  name: string;
  organisation: string;
  phone: string;
  email: string;
  notes: string;
  /** Honeypot: hidden from people, filled by naive bots. Must stay empty. */
  website: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteData, string>>;

export const EMPTY_QUOTE: QuoteData = {
  sector: "",
  itemType: "",
  weight: "",
  access: [],
  suburb: "",
  name: "",
  organisation: "",
  phone: "",
  email: "",
  notes: "",
  website: "",
};

/** Field limits shared by the inputs (maxLength) and the server schema. */
export const LIMITS = { suburb: 80, name: 80, organisation: 120, phone: 20, email: 254, notes: 1000 } as const;

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE = /^[0-9+()\s-]{8,20}$/;

export function validateStep(step: 1 | 2, d: QuoteData): QuoteErrors {
  const e: QuoteErrors = {};
  if (step === 1) {
    if (!d.sector) e.sector = "Choose a sector.";
    if (!d.itemType) e.itemType = "Choose the item type.";
    if (!d.weight) e.weight = "Choose an approximate weight.";
    if (!d.suburb.trim()) e.suburb = "Enter the pickup suburb.";
  } else {
    if (!d.name.trim()) e.name = "Enter your name.";
    if (!PHONE.test(d.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!EMAIL.test(d.email.trim())) e.email = "Enter a valid email address.";
  }
  return e;
}
