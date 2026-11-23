import { Star } from "lucide-react";
import { site } from "@/config";

/** Review pill. Figures are DEMO PLACEHOLDERS (see config) and labelled as such on the page. */
export default function TrustPill() {
  const { rating, count, label } = site.trust;
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full bg-white py-2 pr-2 pl-3.5 text-[13px] whitespace-nowrap text-charcoal sm:gap-3 sm:pl-4 sm:text-sm shadow-xl shadow-black/30">
      <span className="flex items-center gap-0.5 text-safety" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-3.5 fill-current sm:size-4" />
        ))}
      </span>
      <span>
        <strong className="font-extrabold">{rating.toFixed(1)}</strong>
        <span className="text-charcoal/65"> · {count.toLocaleString("en-AU")}+ {label}</span>
      </span>
      <span className="rounded-full bg-charcoal px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
        Demo
      </span>
    </p>
  );
}
