import { site } from "@/config";
import CountUp from "./CountUp";
import HeroArt from "./icons/HeroArt";

/** Hero proof card. Stats are DEMO PLACEHOLDERS from config and badged on screen. */
export default function ProofCard() {
  const { caption, title, stats } = site.proof;
  return (
    <figure className="relative animate-fade-up overflow-hidden rounded-card border border-white/10 bg-charcoal-800 shadow-2xl shadow-black/40">
      <div className="bg-grid relative aspect-[4/3] text-safety sm:aspect-[16/10]">
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal-800 to-transparent" />
        <HeroArt className="absolute inset-x-6 top-16 bottom-2 m-auto h-[calc(100%-4.5rem)] w-[calc(100%-3rem)]" />
        <figcaption className="absolute top-5 left-5 max-w-[75%] border-l-[3px] border-safety bg-charcoal/95 px-4 py-3">
          <span className="block text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">{caption}</span>
          <span className="mt-1 block text-sm font-semibold text-white sm:text-base">{title}</span>
        </figcaption>
        <span className="absolute top-5 right-5 rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white/70 uppercase">
          Demo figures
        </span>
      </div>
      <dl className="relative grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
        {stats.map((s) => (
          <div key={s.label} className="px-3.5 py-5 sm:px-6">
            <dt className="text-xs text-white/60 sm:text-sm">{s.label}</dt>
            <dd className="mt-1 text-xl font-extrabold tracking-tight whitespace-nowrap sm:text-3xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
