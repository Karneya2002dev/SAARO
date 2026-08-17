"use client";

import Link from "next/link";
import { useId } from "react";
import { FIELD, LABEL } from "@/components/ui/field";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/** Red asterisk, as the design marks its required fields. */
function Req() {
  return <span className="text-[#e2574c]"> *</span>;
}

export function EnquiryForm({
  dict,
  phone,
  privacyHref,
}: {
  dict: Dictionary["enquiry"];
  phone: string;
  privacyHref: string;
}) {
  const id = useId();

  return (
    <form
      // No endpoint yet, so the browser's own validation runs and the submit
      // is stopped here rather than navigating to a dead URL.
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col"
    >
      <h2 className="text-[21px] font-bold tracking-[-0.015em] text-heading sm:text-[23px]">
        {dict.title}
      </h2>
      <p className="mt-1.5 text-[13px] leading-[1.5] text-muted">{dict.blurb}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={LABEL}>
            {dict.name}
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
            {dict.phone}
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
            placeholder={dict.phonePlaceholder}
            className={`mt-1.5 ${FIELD}`}
          />
        </div>

        <div>
          <label htmlFor={`${id}-service`} className={LABEL}>
            {dict.service}
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
              {dict.select}
            </option>
            {Object.entries(dict.serviceOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-vehicle`} className={LABEL}>
            {dict.vehicle}
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
              {dict.select}
            </option>
            {Object.entries(dict.vehicleOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-pickup`} className={LABEL}>
            {dict.pickup}
          </label>
          <input
            id={`${id}-pickup`}
            name="pickup"
            autoComplete="address-level2"
            className={`mt-1.5 ${FIELD}`}
          />
        </div>

        {/* One label over both halves: the date and the time are one answer. */}
        <fieldset className="sm:col-span-2">
          <legend className={LABEL}>{dict.when}</legend>
          <div className="mt-1.5 grid gap-4 sm:grid-cols-2">
            <input
              name="date"
              type="date"
              aria-label={dict.when}
              className={FIELD}
            />
            <input
              name="time"
              type="time"
              aria-label={dict.when}
              className={FIELD}
            />
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={LABEL}>
            {dict.message}
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            className={`mt-1.5 ${FIELD} h-auto resize-y py-2.5`}
          />
        </div>
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
          {dict.consentLead}{" "}
          <Link href={privacyHref} className="text-brand underline">
            {dict.privacy}
          </Link>
          {dict.consentTail}
          <Req />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-7 py-2.5 text-center text-[14px] font-medium text-white transition-colors hover:bg-brand-dark sm:text-[15px]"
      >
        {dict.submit}
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
  );
}
