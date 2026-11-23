import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/config";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import EquipmentArt from "@/components/icons/EquipmentArt";
import MobileBar from "@/components/MobileBar";
import SiteQuoteModal from "@/components/SiteQuoteModal";
import { suburbPath } from "@/lib/seo";
import { getAllSuburbs } from "@/lib/suburbs";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  robots: { index: false },
};

const SUGGESTED = 6;

export default function NotFound() {
  const suggestions = getAllSuburbs().slice(0, SUGGESTED);
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_75%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-28">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-safety uppercase">
              <span aria-hidden className="h-0.5 w-8 bg-safety" />
              Error 404
            </p>
            <h1 className="text-hero mt-4 font-extrabold">
              <span className="block text-safety">Wrong address.</span> Load not found.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              The page you&apos;re after has moved or never existed. Pick your area below, or send us the job and
              we&apos;ll take it from there.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/suburbs"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-btn bg-safety px-6 py-4 font-bold text-charcoal transition-colors hover:bg-safety-600 sm:w-auto"
              >
                Find your suburb <ArrowRight aria-hidden className="size-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-btn border border-white/25 px-6 py-4 font-bold transition-colors hover:border-white/60 sm:w-auto"
              >
                Back to home
              </Link>
            </div>
            <h2 className="mt-12 text-xs font-bold tracking-[0.2em] text-white/50 uppercase">Popular areas</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {suggestions.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={suburbPath(s)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition-colors hover:border-safety hover:text-safety"
                  >
                    <MapPin aria-hidden className="size-4 text-safety" />
                    {s.suburb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative hidden rounded-card border border-white/10 bg-charcoal-800 p-10 text-safety lg:block">
            <span aria-hidden className="absolute top-6 left-8 text-[7rem] leading-none font-extrabold tracking-tighter text-white/5">
              404
            </span>
            <EquipmentArt name="skates" className="relative mx-auto mt-16 w-full max-w-sm" />
          </div>
        </div>
      </main>
      <Footer />
      <MobileBar />
      <SiteQuoteModal />
    </>
  );
}
