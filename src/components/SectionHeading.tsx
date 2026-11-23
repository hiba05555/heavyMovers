interface Props {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

export default function SectionHeading({ id, eyebrow, title, lead }: Props) {
  return (
    <div className="reveal max-w-2xl">
      <p className="flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-safety uppercase">
        <span aria-hidden className="h-0.5 w-8 bg-safety" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-white/70">{lead}</p>}
    </div>
  );
}
