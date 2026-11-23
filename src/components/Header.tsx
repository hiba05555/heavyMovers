import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/config";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="header-bar sticky top-0 z-40 border-b border-white/10 bg-charcoal/90 backdrop-blur-md">
      <div className="header-row mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-7 text-[15px] font-semibold text-white/85">
            {site.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-safety after:transition-transform hover:text-white hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <a
            href={site.phone.href}
            className="hidden items-center gap-3 rounded-full bg-white py-1.5 pr-5 pl-1.5 text-charcoal transition-transform hover:-translate-y-0.5 sm:flex"
          >
            <span className="grid size-9 place-items-center rounded-full bg-safety text-white">
              <Phone aria-hidden className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-medium text-charcoal/60">Call us</span>
              <span className="block text-sm font-bold tabular-nums">{site.phone.display}</span>
            </span>
          </a>
          <a
            href="#quote"
            data-open-quote
            className="hidden rounded-btn bg-safety px-4 py-2.5 text-sm font-bold text-charcoal shadow-lg sm:block shadow-safety/20 transition-colors hover:bg-safety-600 lg:px-5 lg:py-3"
          >
            {site.hero.primaryCta}
          </a>
          <MobileMenu nav={site.nav} phone={site.phone} cta={site.hero.primaryCta} />
        </div>
      </div>
    </header>
  );
}
