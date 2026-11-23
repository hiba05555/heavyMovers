import { ClipboardList, Phone } from "lucide-react";
import { site } from "@/config";

/** Sticky bottom action bar on small screens. */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-charcoal p-3 md:hidden">
      <a
        href={site.phone.href}
        className="flex items-center justify-center gap-2 rounded-btn border border-white/25 py-3.5 font-bold"
      >
        <Phone aria-hidden className="size-5 text-safety" />
        Call
      </a>
      <a
        href="#quote"
        data-open-quote
        className="flex items-center justify-center gap-2 rounded-btn bg-safety py-3.5 font-bold text-charcoal"
      >
        <ClipboardList aria-hidden className="size-5" />
        Get Quote
      </a>
    </div>
  );
}
