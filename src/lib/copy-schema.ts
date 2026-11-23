import type { Faq, SuburbCopy } from "@/config/types";

/** JSON Schema for generated suburb copy (used for Claude structured output). */
export const COPY_JSON_SCHEMA = {
  type: "object",
  properties: {
    intro: { type: "string" },
    localContext: { type: "string" },
    faqs: {
      type: "array",
      items: {
        type: "object",
        properties: { q: { type: "string" }, a: { type: "string" } },
        required: ["q", "a"],
        additionalProperties: false,
      },
    },
  },
  required: ["intro", "localContext", "faqs"],
  additionalProperties: false,
} as const;

function isFaq(v: unknown): v is Faq {
  return typeof v === "object" && v !== null && typeof (v as Faq).q === "string" && typeof (v as Faq).a === "string";
}

/** Runtime check shared by the page loader and the batch script. */
export function isSuburbCopy(v: unknown): v is SuburbCopy {
  if (typeof v !== "object" || v === null) return false;
  const c = v as SuburbCopy;
  return (
    typeof c.intro === "string" &&
    typeof c.localContext === "string" &&
    Array.isArray(c.faqs) &&
    c.faqs.length >= 3 &&
    c.faqs.length <= 4 &&
    c.faqs.every(isFaq)
  );
}
