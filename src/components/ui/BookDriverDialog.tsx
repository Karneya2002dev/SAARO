"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Close } from "@/components/icons";
import { FIELD, LABEL } from "@/components/ui/field";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/** Red asterisk, matching the enquiry form's required markers. */
function Req() {
  return <span className="text-[#e2574c]"> *</span>;
}

export function BookDriverDialog({
  label,
  dict,
  fields,
  phone,
  privacyHref,
  className,
  triggerClassName,
  icon,
}: {
  label: string;
  dict: Dictionary["nav"]["dialog"];
  /** Field labels are shared with the contact page's enquiry form. */
  fields: Dictionary["enquiry"];
  phone: string;
  privacyHref: string;
  /** Added to the default header pill. */
  className?: string;
  /** Replaces the default pill outright, for callers with their own button
   *  shape — `cn` only joins, so overlapping utilities would otherwise fight. */
  triggerClassName?: string;
  icon?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const id = useId();

  // showModal() handles focus trapping, Escape and inertness, but not the
  // background scroll, so that is locked here.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    ref.current?.close();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          ref.current?.showModal();
          setOpen(true);
        }}
        className={
          triggerClassName ??
          cn(
            "inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-brand px-6",
            "text-[13px] font-medium text-white transition-colors hover:bg-brand-dark",
            className,
          )
        }
      >
        {icon}
        {label}
      </button>

      <dialog
        ref={ref}
        aria-labelledby={`${id}-title`}
        onClose={() => setOpen(false)}
        // Clicking the backdrop lands on the dialog itself, since the panel
        // inside absorbs every click within its own bounds.
        onClick={(event) => event.target === ref.current && close()}
        className="m-auto w-[min(34rem,calc(100vw-2rem))] rounded-2xl bg-white p-0 text-heading shadow-card backdrop:bg-black/50"
      >
        <div className="max-h-[min(46rem,calc(100dvh-4rem))] overflow-y-auto overscroll-contain p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 id={`${id}-title`} className="text-h3 font-bold tracking-[-0.015em] text-heading">
                {dict.title}
              </h2>
              <p className="mt-1.5 text-[13px] leading-[1.5] text-muted">
                {dict.blurb}
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label={dict.close}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-heading transition-colors hover:bg-surface"
            >
              <Close className="size-4" />
            </button>
          </div>

          <form
            // No endpoint yet, so the browser's own validation runs and the
            // submit is stopped here rather than navigating to a dead URL.
            onSubmit={(event) => event.preventDefault()}
            className="mt-6 flex flex-col"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className={LABEL}>
                  {fields.name}
                  <Req />
                </label>
                <input
                  id={`${id}-name`}
                  name="name"
                  required
                  autoComplete="name"
                  className={`mt-1.5 ${FIELD}`}
                />
              </div>

              <div>
                <label htmlFor={`${id}-phone`} className={LABEL}>
                  {fields.phone}
                  <Req />
                </label>
                <input
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  autoComplete="tel-national"
                  placeholder={fields.phonePlaceholder}
                  className={`mt-1.5 ${FIELD}`}
                />
              </div>

              <div>
                <label htmlFor={`${id}-service`} className={LABEL}>
                  {fields.service}
                  <Req />
                </label>
                <select
                  id={`${id}-service`}
                  name="service"
                  required
                  defaultValue=""
                  className={`mt-1.5 ${FIELD}`}
                >
                  <option value="" disabled>
                    {fields.select}
                  </option>
                  {Object.entries(fields.serviceOptions).map(([value, text]) => (
                    <option key={value} value={value}>
                      {text}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`${id}-vehicle`} className={LABEL}>
                  {fields.vehicle}
                  <Req />
                </label>
                <select
                  id={`${id}-vehicle`}
                  name="vehicle"
                  required
                  defaultValue=""
                  className={`mt-1.5 ${FIELD}`}
                >
                  <option value="" disabled>
                    {fields.select}
                  </option>
                  {Object.entries(fields.vehicleOptions).map(([value, text]) => (
                    <option key={value} value={value}>
                      {text}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${id}-pickup`} className={LABEL}>
                  {fields.pickup}
                  <Req />
                </label>
                <input
                  id={`${id}-pickup`}
                  name="pickup"
                  required
                  autoComplete="address-level2"
                  className={`mt-1.5 ${FIELD}`}
                />
              </div>

              {/* One label over both halves: the date and the time are one
                  answer, as on the enquiry form. */}
              <fieldset className="sm:col-span-2">
                <legend className={LABEL}>{fields.when}</legend>
                <div className="mt-1.5 grid gap-4 sm:grid-cols-2">
                  <input
                    name="date"
                    type="date"
                    aria-label={fields.when}
                    className={FIELD}
                  />
                  <input
                    name="time"
                    type="time"
                    aria-label={fields.when}
                    className={FIELD}
                  />
                </div>
              </fieldset>
            </div>

            <div className="mt-5 flex items-start gap-2.5">
              <input
                id={`${id}-consent`}
                name="consent"
                type="checkbox"
                required
                className="mt-0.5 size-4 shrink-0 accent-brand"
              />
              <label
                htmlFor={`${id}-consent`}
                className="text-[12px] leading-[1.5] text-muted"
              >
                {fields.consentLead}{" "}
                <Link href={privacyHref} className="text-brand underline">
                  {fields.privacy}
                </Link>
                {fields.consentTail}
                <Req />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-7 py-2.5 text-center text-[14px] font-medium text-white transition-colors hover:bg-brand-dark sm:text-[15px]"
            >
              {label}
            </button>

            <p className="mt-4 text-center text-[12px] text-muted">
              {dict.troubleLead}{" "}
              <Link
                href={`tel:+${phone.replace(/\D/g, "")}`}
                className="font-medium text-accent hover:underline"
              >
                {phone}
              </Link>
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}
