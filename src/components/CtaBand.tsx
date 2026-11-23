import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/config";

/** `#quote` is also the no-JS fallback target for every quote link. */
export default function CtaBand() {
  return (
    <section id="quote" aria-labelledby="cta-title" className="cv-auto scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-card bg-safety px-6 py-14 text-charcoal sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:py-16">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative max-w-2xl">
          <h2 id="cta-title" className="text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
            {site.ctaBand.title}
          </h2>
          <p className="mt-4 text-lg font-medium text-charcoal/80">{site.ctaBand.body}</p>
        </div>
        <div className="relative mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
          <a
            href="#quote"
            data-open-quote
            className="group inline-flex items-center gap-2.5 rounded-btn bg-charcoal px-6 py-4 font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            {site.hero.primaryCta}
            <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-2.5 rounded-btn border-2 border-charcoal px-6 py-4 font-bold tabular-nums transition-colors hover:bg-charcoal hover:text-white"
          >
            <Phone aria-hidden className="size-5" />
            {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
