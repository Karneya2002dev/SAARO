"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight, Download, Upload } from "@/components/icons";
import { FIELD, LABEL } from "@/components/ui/field";
import { StoreBadges } from "@/components/ui/StoreBadges";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/** Numbered step marker beside each fieldset legend. */
function StepMark({ n, children }: { n: number; children: string }) {
  return (
    <legend className="mb-4 flex items-center gap-2.5">
      <span className="grid size-5 place-items-center rounded-full bg-brand text-[10px] font-semibold text-white">
        {n}
      </span>
      <span className="text-[14px] font-semibold text-heading">{children}</span>
    </legend>
  );
}

function UploadBox({ label, hint }: { label: string; hint: string }) {
  const id = useId();
  const [name, setName] = useState<string | null>(null);

  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-dashed border-line bg-surface px-3 py-3 text-center transition-colors hover:border-accent"
    >
      <Upload className="size-4 text-muted" />
      <span className="text-[11px] font-medium text-heading">{label}</span>
      {/* The chosen filename replaces the hint, so the control reports its
          own state without needing a separate confirmation line. */}
      <span className="line-clamp-1 text-[10px] text-muted">{name ?? hint}</span>
      <input
        id={id}
        type="file"
        accept="image/png,image/jpeg"
        className="sr-only"
        onChange={(event) => setName(event.target.files?.[0]?.name ?? null)}
      />
    </label>
  );
}

export function DriveSignupForm({
  dict,
  downloads,
  phone,
  privacyHref,
  termsHref,
}: {
  dict: Dictionary["driveSignup"]["form"];
  /** Passed through to the store badges under the form. */
  downloads: Dictionary["downloads"];
  phone: string;
  privacyHref: string;
  termsHref: string;
}) {
  const id = useId();

  return (
    <form
      // No endpoint yet, so the browser's own validation runs and the submit
      // is stopped here rather than navigating to a dead URL.
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col"
    >
      <h3 className="text-h3 font-semibold tracking-[-0.01em] text-heading">
        {dict.title}
      </h3>
      <p className="mt-1.5 text-[13px] text-muted">{dict.blurb}</p>

      <fieldset className="mt-7 rounded-xl border border-line p-5">
        <StepMark n={1}>{dict.personal}</StepMark>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor={`${id}-name`} className={LABEL}>
              {dict.fullName} *
            </label>
            <input
              id={`${id}-name`}
              name="fullName"
              required
              autoComplete="name"
              placeholder={dict.fullNamePlaceholder}
              className={`mt-1.5 ${FIELD}`}
            />
          </div>

          <div>
            <label htmlFor={`${id}-phone`} className={LABEL}>
              {dict.phone} *
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
            <label htmlFor={`${id}-city`} className={LABEL}>
              {dict.city} *
            </label>
            <input
              id={`${id}-city`}
              name="city"
              required
              autoComplete="address-level2"
              placeholder={dict.cityPlaceholder}
              className={`mt-1.5 ${FIELD}`}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-5 rounded-xl border border-line p-5">
        <StepMark n={2}>{dict.professional}</StepMark>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor={`${id}-licence`} className={LABEL}>
              {dict.licence} *
            </label>
            <input
              id={`${id}-licence`}
              name="licence"
              required
              placeholder={dict.licencePlaceholder}
              className={`mt-1.5 ${FIELD}`}
            />
          </div>

          <div>
            <p className={LABEL}>{dict.licenceUpload} *</p>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              <UploadBox label={dict.front} hint={dict.uploadHint} />
              <UploadBox label={dict.back} hint={dict.uploadHint} />
            </div>
          </div>

          <div>
            <label htmlFor={`${id}-aadhaar`} className={LABEL}>
              {dict.aadhaar} *
            </label>
            <input
              id={`${id}-aadhaar`}
              name="aadhaar"
              required
              inputMode="numeric"
              pattern="[0-9\s]{12,14}"
              placeholder={dict.aadhaarPlaceholder}
              className={`mt-1.5 ${FIELD}`}
            />
          </div>

          <div>
            <p className={LABEL}>{dict.aadhaarUpload} *</p>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              <UploadBox label={dict.front} hint={dict.uploadHint} />
              <UploadBox label={dict.back} hint={dict.uploadHint} />
            </div>
          </div>

          <div>
            <label htmlFor={`${id}-experience`} className={LABEL}>
              {dict.experience} *
            </label>
            <select
              id={`${id}-experience`}
              name="experience"
              required
              defaultValue=""
              className={`mt-1.5 ${FIELD}`}
            >
              <option value="" disabled>
                {dict.experiencePlaceholder}
              </option>
              {Object.entries(dict.experienceOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${id}-vehicles`} className={LABEL}>
              {dict.vehicles} *
            </label>
            <select
              id={`${id}-vehicles`}
              name="vehicles"
              required
              defaultValue=""
              className={`mt-1.5 ${FIELD}`}
            >
              <option value="" disabled>
                {dict.vehiclesPlaceholder}
              </option>
              {Object.entries(dict.vehicleOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <div className="mt-5 flex items-start gap-2.5">
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 size-4 shrink-0 accent-brand"
        />
        <label htmlFor={`${id}-consent`} className="text-[12px] leading-[1.5] text-muted">
          {dict.consentLead}{" "}
          <Link href={privacyHref} className="text-brand underline">
            {dict.privacy}
          </Link>{" "}
          {dict.consentAnd}{" "}
          <Link href={termsHref} className="text-brand underline">
            {dict.terms}
          </Link>
          .
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-dark"
      >
        {dict.submit}
        <ArrowRight className="size-4 shrink-0" />
      </button>

      <p className="mt-4 text-center text-[12px] text-muted">
        {dict.trouble.replace("{phone}", phone)}
      </p>

      {/* The label was a button to nowhere; it now captions the real store
          links instead of pretending to be one. */}
      <div className="mt-5 flex flex-col items-center gap-2 border-t border-line pt-5">
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-heading">
          <Download className="size-4 shrink-0" />
          {dict.downloadApp}
        </p>
        {/* Capped rather than left to fill the panel, so the two equal columns
            stay badge-sized instead of stretching half the form each. */}
        <StoreBadges
          app="driver"
          dict={downloads}
          size="md"
          className="mx-auto w-full max-w-[330px]"
        />
      </div>
    </form>
  );
}
