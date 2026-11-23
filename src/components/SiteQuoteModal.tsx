import { site } from "@/config";
import QuoteModal from "./QuoteModal";

/** Server wrapper: passes only the serialisable site config the client modal needs. */
export default function SiteQuoteModal({ defaultSuburb = "" }: { defaultSuburb?: string }) {
  return (
    <QuoteModal
      config={site.quote}
      sectors={site.sectors.map((s) => ({ id: s.id, title: s.title }))}
      defaultSuburb={defaultSuburb}
      phone={site.phone}
      nextSteps={site.steps.slice(1).map((st) => st.title)}
    />
  );
}
