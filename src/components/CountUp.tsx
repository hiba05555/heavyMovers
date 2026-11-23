import type { CSSProperties } from "react";
import type { Stat } from "@/config/types";

/** CSS-only count-up (registered @property counter). Screen readers get the static value. */
export default function CountUp({ value, suffix = "" }: Pick<Stat, "value" | "suffix">) {
  return (
    <>
      <span aria-hidden className="count-up tabular-nums" style={{ "--to": value } as CSSProperties}>
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </>
  );
}
