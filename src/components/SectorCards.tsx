import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/config";
import SectorIcon from "./icons/SectorIcon";
import SectionHeading from "./SectionHeading";

export default function SectorCards() {
  return (
    <section id="sectors" aria-labelledby="sectors-title" className="cv-auto scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="sectors-title"
          eyebrow="Who we work with"
          title="Built for organisations, not just households."
          lead="Each sector gets crews who know its rules, its hours and its paperwork."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {site.sectors.map((sector) => (
            <li
              key={sector.id}
              className="reveal group relative flex flex-col rounded-card border border-white/10 bg-charcoal-800 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-safety/60 hover:shadow-2xl hover:shadow-safety/10"
            >
              <span className="grid size-14 place-items-center rounded-card bg-safety/10 text-safety transition-colors group-hover:bg-safety group-hover:text-charcoal">
                <SectorIcon name={sector.icon} className="size-7" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight">{sector.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{sector.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {sector.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-safety" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                data-open-quote
                data-sector={sector.id}
                className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-bold text-safety after:absolute after:inset-0 after:rounded-card"
              >
                Quote for {sector.title.toLowerCase()}
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
