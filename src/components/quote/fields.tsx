import type { ReactNode } from "react";

const INPUT =
  "mt-1.5 w-full rounded-btn border bg-charcoal px-3.5 py-3 text-white placeholder:text-white/40 focus:border-safety focus:outline-none aria-[invalid=true]:border-red-400";

interface Base {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

function Wrap({ id, label, error, hint, children }: Base & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-white/90">
        {label}
        {hint && <span className="font-normal text-white/50"> {hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextProps extends Base {
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  maxLength?: number;
}

export function TextField({ value, onChange, type = "text", autoComplete, maxLength, ...base }: TextProps) {
  return (
    <Wrap {...base}>
      <input
        id={base.id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!base.error}
        aria-describedby={base.error ? `${base.id}-err` : undefined}
        className={`${INPUT} border-white/15`}
      />
    </Wrap>
  );
}

interface SelectProps extends Base {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

export function SelectField({ value, options, onChange, ...base }: SelectProps) {
  return (
    <Wrap {...base}>
      <select
        id={base.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!base.error}
        aria-describedby={base.error ? `${base.id}-err` : undefined}
        className={`${INPUT} border-white/15`}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </Wrap>
  );
}

interface ChipProps {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  selected: string[];
  multiple?: boolean;
  error?: string;
  onToggle: (value: string) => void;
}

/** Radio (single) or checkbox (multiple) group styled as chips. */
export function ChipGroup({ legend, name, options, selected, multiple, error, onToggle }: ChipProps) {
  return (
    <fieldset aria-describedby={error ? `${name}-err` : undefined}>
      <legend className="text-sm font-semibold text-white/90">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = selected.includes(o.value);
          return (
            <label
              key={o.value}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-safety ${
                checked ? "border-safety bg-safety text-charcoal" : "border-white/15 text-white/80 hover:border-white/40"
              }`}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onToggle(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-err`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </fieldset>
  );
}
