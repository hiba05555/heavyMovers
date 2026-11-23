import { Building2, GraduationCap, Hospital, Route } from "lucide-react";
import type { SuburbCopy } from "@/config/types";
import type { CopySource } from "@/lib/copy";
import type { Suburb } from "@/lib/suburbs";
import { stateName } from "@/lib/text";
import SectionHeading from "./SectionHeading";

interface Props {
  suburb: Suburb;
  copy: SuburbCopy;
  source: CopySource;
}

/** Suburb-specific body: local facts, context copy and FAQs. */
export default function LocalInfo({ suburb: s, copy, source }: Props) {
  const facts = [
    { icon: Building2, label: "Council", value: s.council },
    { icon: Hospital, label: "Nearby hospital", value: s.nearbyHospital },
    ...(s.nearbySchool ? [{ icon: GraduationCap, label: "Nearby school", value: s.nearbySchool }] : []),
    { icon: Route, label: "Access", value: s.localAccessNote },
  ];
  return (
    <section
      aria-labelledby="local-title"
      data-copy-source={source}
      className="cv-auto border-t border-white/5 bg-charcoal-800/50 py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            id="local-title"
            eyebrow={`${s.suburb} ${s.postcode} · ${stateName(s.state)}`}
            title={`Heavy lifting in ${s.suburb}`}
          />
          <p className="reveal mt-6 text-lg leading-relaxed text-white/80">{copy.localContext}</p>
          <dl className="reveal mt-8 grid gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 sm:grid-cols-2">
            {facts.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                // Full-width when it is the access note, or an odd one out before it (no empty cell).
                className={`bg-charcoal p-5 ${label === "Access" || (i === facts.length - 2 && i % 2 === 0) ? "sm:col-span-2" : ""}`}
              >
                <dt className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase">
                  <Icon aria-hidden className="size-4 text-safety" />
                  {label}
                </dt>
                <dd className="mt-2 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:pt-24">
          <h3 className="text-2xl font-extrabold tracking-tight">{s.suburb} questions, answered</h3>
          <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {copy.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="mt-0.5 text-xl leading-none text-safety transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-white/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
