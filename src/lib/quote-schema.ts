import { z } from "zod";
import { site } from "@/config";
import { EMAIL, LIMITS, PHONE } from "./quote";

/** Builds a zod enum from config options (only values the form actually offers are accepted). */
const oneOf = (values: readonly string[]) => z.enum(values as [string, ...string[]]);
const text = (min: number, max: number) => z.string().trim().min(min).max(max);

/** Server-side quote schema. `.strict()` rejects unknown keys; every string is length-capped. */
export const quoteSchema = z
  .object({
    sector: oneOf(site.sectors.map((s) => s.id)),
    itemType: oneOf(site.quote.itemTypes),
    weight: oneOf(site.quote.weights),
    access: z.array(oneOf(site.quote.access)).max(site.quote.access.length),
    suburb: text(2, LIMITS.suburb),
    name: text(2, LIMITS.name),
    organisation: text(0, LIMITS.organisation),
    phone: text(8, LIMITS.phone).regex(PHONE),
    email: text(5, LIMITS.email).regex(EMAIL),
    notes: text(0, LIMITS.notes),
    website: z.string().max(200),
  })
  .strict();

export type QuotePayload = z.infer<typeof quoteSchema>;
