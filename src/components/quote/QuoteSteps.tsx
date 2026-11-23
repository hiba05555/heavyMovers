import type { QuoteModalProps } from "../QuoteModal";
import { LIMITS, type QuoteData, type QuoteErrors } from "@/lib/quote";
import { ChipGroup, SelectField, TextField } from "./fields";

interface Props extends Pick<QuoteModalProps, "config" | "sectors"> {
  step: 1 | 2;
  data: QuoteData;
  errors: QuoteErrors;
  update: (patch: Partial<QuoteData>) => void;
}

export default function QuoteSteps({ step, data, errors, config, sectors, update }: Props) {
  if (step === 1) {
    const toggleAccess = (v: string) =>
      update({ access: data.access.includes(v) ? data.access.filter((a) => a !== v) : [...data.access, v] });
    return (
      <>
        <ChipGroup
          legend="Sector"
          name="sector"
          options={sectors.map((s) => ({ value: s.id, label: s.title }))}
          selected={[data.sector]}
          error={errors.sector}
          onToggle={(sector) => update({ sector })}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField id="q-item" label="Item type" value={data.itemType} options={config.itemTypes} error={errors.itemType} onChange={(itemType) => update({ itemType })} />
          <SelectField id="q-weight" label="Approx. weight" value={data.weight} options={config.weights} error={errors.weight} onChange={(weight) => update({ weight })} />
        </div>
        <ChipGroup
          legend="Stairs & access obstacles"
          name="access"
          multiple
          options={config.access.map((a) => ({ value: a, label: a }))}
          selected={data.access}
          onToggle={toggleAccess}
        />
        <TextField id="q-suburb" maxLength={LIMITS.suburb} label="Pickup suburb" value={data.suburb} error={errors.suburb} autoComplete="address-level2" onChange={(suburb) => update({ suburb })} />
      </>
    );
  }
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="q-name" maxLength={LIMITS.name} label="Your name" value={data.name} error={errors.name} autoComplete="name" onChange={(name) => update({ name })} />
        <TextField id="q-org" maxLength={LIMITS.organisation} label="Organisation" hint="(optional)" value={data.organisation} autoComplete="organization" onChange={(organisation) => update({ organisation })} />
        <TextField id="q-phone" maxLength={LIMITS.phone} label="Phone" type="tel" value={data.phone} error={errors.phone} autoComplete="tel" onChange={(phone) => update({ phone })} />
        <TextField id="q-email" maxLength={LIMITS.email} label="Email" type="email" value={data.email} error={errors.email} autoComplete="email" onChange={(email) => update({ email })} />
      </div>
      {/* Honeypot: off-screen, skipped by keyboard and screen readers; real people never fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => update({ website: e.target.value })} />
      </div>
      <TextField id="q-notes" maxLength={LIMITS.notes} label="Anything else?" hint="(optional)" value={data.notes} onChange={(notes) => update({ notes })} />
    </>
  );
}
