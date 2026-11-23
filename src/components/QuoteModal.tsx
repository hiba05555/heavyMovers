"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { SiteConfig } from "@/config/types";
import { EMPTY_QUOTE, validateStep, type QuoteData, type QuoteErrors } from "@/lib/quote";
import QuoteSteps from "./quote/QuoteSteps";

export interface QuoteModalProps {
  config: SiteConfig["quote"];
  sectors: { id: string; title: string }[];
  defaultSuburb: string;
  phone: { display: string; href: string };
  /** Shown on the success screen as "what happens next". */
  nextSteps: string[];
}

type Status = "editing" | "sending" | "done" | "error" | "limited";

/** 2-step quote dialog. Opened by any element with `data-open-quote` (optional `data-sector`). */
export default function QuoteModal({ config, sectors, defaultSuburb, phone, nextSteps }: QuoteModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<QuoteData>({ ...EMPTY_QUOTE, suburb: defaultSuburb });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("editing");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest<HTMLElement>("[data-open-quote]");
      if (!trigger) return;
      e.preventDefault();
      const sector = trigger.dataset.sector;
      if (sector) setData((d) => ({ ...d, sector }));
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const update = (patch: Partial<QuoteData>) => {
    setData((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      for (const k of Object.keys(patch) as (keyof QuoteData)[]) delete next[k];
      return next;
    });
  };

  const close = () => dialog.current?.close();

  const onClosed = () => {
    if (status === "done") {
      setData({ ...EMPTY_QUOTE, suburb: defaultSuburb });
      setStep(1);
      setStatus("editing");
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateStep(step, data);
    setErrors(found);
    if (Object.keys(found).length) {
      // Wait for the error state to render, then focus the first invalid control.
      requestAnimationFrame(() =>
        dialog.current?.querySelector<HTMLElement>("fieldset[aria-describedby] input, [aria-invalid=true]")?.focus(),
      );
      return;
    }
    if (step === 1) return setStep(2);
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : res.status === 429 ? "limited" : "error");
    } catch {
      setStatus("error");
    }
  };

  const progress = status === "done" ? 100 : step === 1 ? 50 : 85;

  return (
    <dialog
      ref={dialog}
      aria-labelledby="quote-title"
      onClose={onClosed}
      onClick={(e) => e.target === dialog.current && close()}
      className="m-auto w-[min(40rem,calc(100%-2rem))] overflow-visible rounded-card bg-transparent p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-fade-up"
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-card border border-white/10 bg-charcoal-800 shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-white/10 bg-charcoal-800 px-6 pt-5 pb-4 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-safety uppercase">
                {status === "done" ? "Sent" : `Step ${step} of 2`}
              </p>
              <h2 id="quote-title" className="mt-1 text-2xl font-extrabold tracking-tight">
                {config.title}
              </h2>
            </div>
            <button type="button" onClick={close} aria-label="Close quote form" className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white">
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <div role="progressbar" aria-label="Quote progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-safety transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
          <ol className="mt-2 flex justify-between text-xs font-semibold text-white/45">
            <li className={step === 1 && status !== "done" ? "text-white" : ""}>1 · The load</li>
            <li className={step === 2 && status !== "done" ? "text-white" : ""}>2 · Your details</li>
          </ol>
        </div>

        {status === "done" ? (
          <div className="px-6 py-10 sm:px-8" role="status">
            <CheckCircle2 aria-hidden className="size-14 text-safety" />
            <p className="mt-4 text-2xl font-extrabold">Request received</p>
            <p className="mt-2 max-w-md text-white/75">{config.successMessage}</p>
            <p className="mt-7 text-xs font-bold tracking-[0.2em] text-white/50 uppercase">What happens next</p>
            <ol className="mt-3 space-y-3">
              {nextSteps.map((title, i) => (
                <li key={title} className="flex items-center gap-3 font-semibold">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-safety text-xs text-safety tabular-nums">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  {title}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={close} className="rounded-btn bg-safety px-6 py-3 font-bold text-charcoal hover:bg-safety-600">
                Done
              </button>
              <a href={phone.href} className="inline-flex items-center gap-2 rounded-btn border border-white/20 px-5 py-3 font-semibold hover:border-white/50">
                <Phone aria-hidden className="size-4 text-safety" /> Urgent? {phone.display}
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-6 px-6 pt-6 sm:px-8">
            <QuoteSteps step={step} data={data} errors={errors} config={config} sectors={sectors} update={update} />
            {(status === "error" || status === "limited") && (
              <p role="alert" className="rounded-btn border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">
                {status === "limited"
                  ? `Too many requests from this connection. Please try again later or call ${phone.display}.`
                  : `Something went wrong sending your request. Please try again or call ${phone.display}.`}
              </p>
            )}
            <div className="sticky bottom-0 -mx-6 flex items-center justify-between gap-3 border-t border-white/10 bg-charcoal-800 px-6 py-4 sm:-mx-8 sm:px-8">
              {step === 2 ? (
                <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-btn px-3 py-3 font-semibold text-white/80 hover:text-white">
                  <ArrowLeft aria-hidden className="size-4" /> Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-btn bg-safety px-6 py-3 font-bold text-charcoal transition-colors hover:bg-safety-600 disabled:opacity-60"
              >
                {status === "sending" && <Loader2 aria-hidden className="size-4 animate-spin" />}
                {step === 1 ? "Next: your details" : "Send request"}
                {step === 1 && <ArrowRight aria-hidden className="size-4" />}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
