import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/config";
import { suburbPath } from "@/lib/seo";
import type { Suburb } from "@/lib/suburbs";

export default function NearbySuburbs({ suburb, nearby }: { suburb: Suburb; nearby: Suburb[] }) {
  return (
    <section aria-labelledby="nearby-title" className="cv-auto py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="nearby-title" className="text-2xl font-extrabold tracking-tight">
            Also servicing near {suburb.suburb}
          </h2>
          <Link href="/suburbs" className="inline-flex items-center gap-1.5 text-sm font-bold text-safety hover:underline">
            All areas we cover <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap gap-3">
          {nearby.map((n) => (
            <li key={n.slug}>
              <Link
                href={suburbPath(n)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-safety hover:text-safety"
              >
                <MapPin aria-hidden className="size-4 text-safety" />
                {n.suburb} {site.h1Suffix}
                <span className="text-white/50">{n.state}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
