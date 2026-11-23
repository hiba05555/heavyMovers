import { site } from "@/config";
import EquipmentArt from "./icons/EquipmentArt";
import SectionHeading from "./SectionHeading";

export default function EquipmentGrid() {
  return (
    <section
      id="equipment"
      aria-labelledby="equipment-title"
      className="cv-auto scroll-mt-24 border-y border-white/5 bg-charcoal-800/50 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="equipment-title"
          eyebrow="Equipment"
          title="The right gear, so nobody takes the strain."
          lead="Every job is matched to equipment before the crew leaves the depot."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.equipment.map((item, i) => (
            <li
              key={item.title}
              className="reveal group overflow-hidden rounded-card border border-white/10 bg-charcoal transition-all duration-300 hover:-translate-y-1.5 hover:border-safety/50"
            >
              <div className="bg-grid relative flex h-44 items-center justify-center border-b border-white/10 text-safety">
                <span className="absolute top-4 left-4 text-xs font-bold text-white/40 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <EquipmentArt
                  name={item.art}
                  className="h-28 w-auto transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-extrabold tracking-tight">{item.title}</h3>
                <p className="mt-1.5 text-white/70">{item.spec}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
