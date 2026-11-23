"use client";

import Link from "next/link";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useRef, type MouseEvent } from "react";

interface Props {
  nav: { label: string; href: string }[];
  phone: { display: string; href: string };
  cta: string;
}

/**
 * Mobile nav using the native popover API (Esc + outside-click close, top layer).
 * JS only closes it after a link is followed, so in-page anchors don't leave it open.
 */
export default function MobileMenu({ nav, phone, cta }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const closeOnLink = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("a")) panel.current?.hidePopover();
  };
  return (
    <>
      <button
        type="button"
        popoverTarget="mobile-menu"
        data-mobile-menu-toggle
        aria-label="Open menu"
        className="grid size-11 place-items-center rounded-btn border border-white/15 text-white lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </button>
      <div
        ref={panel}
        id="mobile-menu"
        popover="auto"
        onClick={closeOnLink}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-charcoal p-0 text-white backdrop:bg-black/60 open:flex open:flex-col"
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <span className="text-sm font-bold tracking-[0.2em] text-white/60 uppercase">Menu</span>
          <button
            type="button"
            popoverTarget="mobile-menu"
            popoverTargetAction="hide"
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-btn border border-white/15"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="divide-y divide-white/10">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="flex items-center justify-between py-5 text-2xl font-extrabold tracking-tight">
                  {item.label}
                  <ArrowRight aria-hidden className="size-5 text-safety" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-3 border-t border-white/10 p-4">
          <a href={phone.href} className="flex items-center justify-center gap-2 rounded-btn border border-white/25 py-4 font-bold">
            <Phone aria-hidden className="size-5 text-safety" />
            {phone.display}
          </a>
          <a href="#quote" data-open-quote className="flex items-center justify-center rounded-btn bg-safety py-4 font-bold text-charcoal">
            {cta}
          </a>
        </div>
      </div>
    </>
  );
}
