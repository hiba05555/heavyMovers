import { ArrowRight, ClipboardList } from "lucide-react";
import { site } from "@/config";
import type { Suburb } from "@/lib/suburbs";
import ProofCard from "./ProofCard";
import TrustPill from "./TrustPill";

interface Props {
  suburb: Suburb;
  /** Suburb-specific lead paragraph (suburb pages only). */
  intro?: string;
}

export default function Hero({ suburb, intro }: Props) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_75%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(40rem_28rem_at_85%_0%,color-mix(in_oklab,var(--color-safety)_16%,transparent),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8 lg:py-16">
        <div className="order-2 lg:order-1">
          <ProofCard />
        </div>
        <div className="order-1 lg:order-2">
          <div className="animate-rise">
            <TrustPill />
          </div>
          <p className="mt-7 flex animate-rise items-center gap-3 text-xs font-bold tracking-[0.22em] text-white/70 uppercase [animation-delay:80ms]">
            <span aria-hidden className="h-0.5 w-8 bg-safety" />
            {site.hero.eyebrow} · {suburb.state}
          </p>
          <h1 id="hero-title" className="text-hero mt-4 font-extrabold">
            <span className="block text-safety">{suburb.suburb}</span>{" "}
            <span className="relative inline-block">
              {site.h1Suffix}
              <span aria-hidden className="absolute -bottom-2 left-0 h-1.5 w-2/5 rounded-full bg-safety" />
            </span>
          </h1>
          <p className="mt-9 text-xl font-bold">{site.tagline}</p>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/75">
            {intro ?? site.hero.sub}
          </p>
          <div className="mt-8 flex animate-rise flex-wrap gap-3 [animation-delay:300ms]">
            <a
              href="#quote"
              data-open-quote
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-btn bg-safety px-6 py-4 font-bold text-charcoal shadow-xl sm:w-auto shadow-safety/25 transition-all hover:-translate-y-0.5 hover:bg-safety-600"
            >
              <ClipboardList aria-hidden className="size-5" />
              {site.hero.primaryCta}
            </a>
            <a
              href={site.hero.secondaryCta.href}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-btn border sm:w-auto border-white/25 px-6 py-4 font-bold transition-colors hover:border-white/60"
            >
              {site.hero.secondaryCta.label}
              <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/70">
            {site.hero.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-safety" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
