import { site } from "@/config";
import SectionHeading from "./SectionHeading";

export default function ProcessSteps() {
  return (
    <section id="process" aria-labelledby="process-title" className="cv-auto scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="process-title" eyebrow="How it works" title="Three steps. No surprises on the day." />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-safety via-safety/40 to-safety md:block" />
          {site.steps.map((step, i) => (
            <li key={step.title} className="reveal relative md:text-center">
              <span className="relative z-10 grid size-14 place-items-center rounded-full border-2 border-safety bg-charcoal text-lg font-extrabold text-safety tabular-nums md:mx-auto">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-extrabold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70 md:mx-auto md:max-w-xs">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
