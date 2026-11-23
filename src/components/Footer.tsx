import Link from "next/link";
import { site } from "@/config";
import { getAllSuburbs } from "@/lib/suburbs";
import { suburbPath } from "@/lib/seo";
import Logo from "./Logo";

const FOOTER_AREAS = 8;

export default function Footer() {
  const areas = getAllSuburbs().slice(0, FOOTER_AREAS);
  const columns = [
    { title: "Sectors", links: site.sectors.map((s) => ({ label: s.title, href: "/#sectors" })) },
    { title: "Areas", links: areas.map((s) => ({ label: s.suburb, href: suburbPath(s) })) },
    { title: "Company", links: site.nav },
  ];
  return (
    <footer className="cv-auto border-t border-white/10 pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-3 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="sm:col-span-3 lg:col-span-1">
          <Logo />
          <p className="mt-4 text-lg font-bold">{site.tagline}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">{site.description}</p>
          <a href={site.phone.href} className="mt-6 inline-block text-2xl font-extrabold text-safety tabular-nums hover:underline">
            {site.phone.display}
          </a>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/80 transition-colors hover:text-safety">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-6 text-xs text-white/50 sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}
          </p>
          <p>Demo build: phone, reviews, project figures and compliance items are placeholders.</p>
        </div>
      </div>
    </footer>
  );
}
