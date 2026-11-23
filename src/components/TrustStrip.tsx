import { site } from "@/config";
import SectorIcon from "./icons/SectorIcon";

/** Procurement-ready assurances for institutional buyers (items are config DEMO PLACEHOLDERS). */
export default function TrustStrip() {
  return (
    <section aria-labelledby="trust-title" className="border-b border-white/10 bg-charcoal-800/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 id="trust-title" className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">
          Procurement-ready on every job
        </h2>
        <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.compliance.map((item) => (
            <li key={item.title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-btn border border-safety/30 bg-safety/10 text-safety">
                <SectorIcon name={item.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-white/65">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
