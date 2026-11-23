import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileBar from "@/components/MobileBar";
import SiteQuoteModal from "@/components/SiteQuoteModal";
import SuburbFilter from "@/components/SuburbFilter";
import { clamp, DESCRIPTION_MAX, suburbPath, TITLE_MAX } from "@/lib/seo";
import { getAllSuburbs, STATES } from "@/lib/suburbs";
import { stateName } from "@/lib/text";

const title = clamp(`Areas We Cover | ${site.name} Australia-wide`, TITLE_MAX);
const description = clamp(
  `Find ${site.h1Suffix.toLowerCase()} in your suburb. ${site.name} services hospitals, schools, removalists and government in every state and territory.`,
  DESCRIPTION_MAX,
);

export const metadata: Metadata = { title, description, alternates: { canonical: "/suburbs" } };

export default function SuburbsIndex() {
  const all = getAllSuburbs();
  const groups = STATES.map((state) => ({ state, suburbs: all.filter((s) => s.state === state) })).filter(
    (g) => g.suburbs.length > 0,
  );
  return (
    <>
      <Header />
      <main id="main" className="relative">
        <div aria-hidden className="bg-grid absolute inset-x-0 top-0 h-96 [mask-image:linear-gradient(black,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-safety uppercase">
            <span aria-hidden className="h-0.5 w-8 bg-safety" />
            {all.length} suburbs · {groups.length} states & territories
          </p>
          <h1 className="text-hero mt-4 font-extrabold">Areas We Cover</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">{description}</p>
          <SuburbFilter>
            {groups.map(({ state, suburbs }) => (
              <section key={state} id={state.toLowerCase()} aria-labelledby={`st-${state}`} className="scroll-mt-28" data-group>
                <h2 id={`st-${state}`} className="flex items-baseline gap-3 border-b border-white/10 pb-3 text-xl font-extrabold">
                  {stateName(state).replace(/^the /, "").replace(/^\w/, (c) => c.toUpperCase())}
                  <span className="text-sm font-semibold text-white/50">{state}</span>
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {suburbs.map((s) => (
                    <li key={s.slug} data-search={`${s.suburb} ${s.state} ${s.postcode}`.toLowerCase()}>
                      <Link
                        href={suburbPath(s)}
                        className="flex items-center justify-between rounded-btn border border-white/10 bg-charcoal-800 px-4 py-3 font-semibold transition-colors hover:border-safety hover:text-safety"
                      >
                        {s.suburb} {site.h1Suffix}
                        <span className="text-sm text-white/50 tabular-nums">{s.postcode}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </SuburbFilter>
        </div>
      </main>
      <Footer />
      <MobileBar />
      <SiteQuoteModal />
    </>
  );
}
