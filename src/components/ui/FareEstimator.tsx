"use client";

import { useId, useMemo, useState } from "react";
import { Clipboard } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { Money } from "@/components/ui/Money";

export type EstimatorVehicle = {
  id: string;
  label: string;
  baseFare: number;
  perKm: number;
  perMinute: number;
  minDistanceKm: number | null;
};

export type EstimatorPlan = {
  id: string;
  label: string;
  vehicles: EstimatorVehicle[];
};


const FIELD =
  "h-12 w-full rounded-lg border border-line bg-white px-3.5 text-[14px] text-heading outline-none transition-colors focus-visible:border-accent";

export function FareEstimator({
  plans,
  dict,
}: {
  plans: EstimatorPlan[];
  dict: Dictionary["fareFormula"]["estimator"];
}) {
  const id = useId();
  const [planId, setPlanId] = useState(plans[0].id);
  const [vehicleId, setVehicleId] = useState(plans[0].vehicles[0].id);
  const [km, setKm] = useState("");
  const [hours, setHours] = useState("");
  const [result, setResult] = useState<null | {
    baseFare: number;
    distance: number;
    time: number;
    total: number;
    chargedKm: number;
    minimumApplied: boolean;
  }>(null);

  const plan = useMemo(
    () => plans.find((p) => p.id === planId) ?? plans[0],
    [plans, planId],
  );

  // Vehicles are per-plan, so switching plan has to re-anchor the vehicle or
  // the selected id could belong to a plan that is no longer chosen.
  const vehicle =
    plan.vehicles.find((v) => v.id === vehicleId) ?? plan.vehicles[0];

  const calculate = () => {
    const distanceKm = Number.parseFloat(km);
    const durationHrs = Number.parseFloat(hours);

    if (!Number.isFinite(distanceKm) || !Number.isFinite(durationHrs)) {
      setResult(null);
      return;
    }

    // The plan's minimum distance is billed even when the trip is shorter.
    const chargedKm = Math.max(distanceKm, vehicle.minDistanceKm ?? 0);
    const minutes = durationHrs * 60;

    const distance = chargedKm * vehicle.perKm;
    const time = minutes * vehicle.perMinute;

    setResult({
      baseFare: vehicle.baseFare,
      distance,
      time,
      total: vehicle.baseFare + distance + time,
      chargedKm,
      minimumApplied: chargedKm > distanceKm,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        calculate();
      }}
      className="mt-14 rounded-2xl border border-accent/45 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="flex items-center gap-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-white">
          <Clipboard className="size-5" />
        </span>
        <h3 className="text-h4 font-semibold tracking-[-0.01em] text-heading">
          {dict.title}
        </h3>
      </div>

      <p className="mt-3 text-[14px] leading-[1.6] text-muted sm:text-[15px]">
        {dict.blurb}
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor={`${id}-plan`}
            className="block text-[13px] font-medium text-heading"
          >
            {dict.plan}
          </label>
          <select
            id={`${id}-plan`}
            value={planId}
            onChange={(event) => {
              setPlanId(event.target.value);
              setResult(null);
            }}
            className={`mt-2 ${FIELD}`}
          >
            {plans.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${id}-vehicle`}
            className="block text-[13px] font-medium text-heading"
          >
            {dict.vehicle}
          </label>
          <select
            id={`${id}-vehicle`}
            value={vehicle.id}
            onChange={(event) => {
              setVehicleId(event.target.value);
              setResult(null);
            }}
            className={`mt-2 ${FIELD}`}
          >
            {plan.vehicles.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${id}-km`}
            className="block text-[13px] font-medium text-heading"
          >
            {dict.distance}
          </label>
          <input
            id={`${id}-km`}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={km}
            onChange={(event) => setKm(event.target.value)}
            placeholder={dict.distancePlaceholder}
            className={`mt-2 ${FIELD} placeholder:text-muted/70`}
          />
        </div>

        <div>
          <label
            htmlFor={`${id}-hours`}
            className="block text-[13px] font-medium text-heading"
          >
            {dict.duration}
          </label>
          <input
            id={`${id}-hours`}
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
            placeholder={dict.durationPlaceholder}
            className={`mt-2 ${FIELD} placeholder:text-muted/70`}
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-8 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-dark sm:text-[15px]"
        >
          {dict.submit}
        </button>
      </div>

      {/* aria-live so the figure is announced when it appears, since it lands
          below the button rather than replacing it. */}
      <div aria-live="polite">
        {result ? (
          <div className="mx-auto mt-8 max-w-[420px] rounded-xl bg-surface p-5">
            <p className="text-[13px] font-medium text-muted">
              {dict.resultTitle}
            </p>

            <dl className="mt-3 flex flex-col gap-2 text-[14px]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{dict.baseFare}</dt>
                <dd className="text-heading"><Money amount={result.baseFare} /></dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">
                  {dict.distanceRow} ({result.chargedKm} km)
                </dt>
                <dd className="text-heading">
                  <Money amount={Math.round(result.distance)} />
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{dict.timeRow}</dt>
                <dd className="text-heading"><Money amount={Math.round(result.time)} /></dd>
              </div>
              <div className="mt-2 flex justify-between gap-4 border-t border-line pt-3">
                <dt className="font-semibold text-heading">{dict.total}</dt>
                <dd className="text-[18px] font-bold text-brand">
                  <Money amount={Math.round(result.total)} />
                </dd>
              </div>
            </dl>

            {result.minimumApplied ? (
              <p className="mt-3 text-[12px] leading-[1.5] text-muted">
                {dict.minimumApplied.replace("{km}", String(result.chargedKm))}
              </p>
            ) : null}

            <p className="mt-2 text-[12px] leading-[1.5] text-muted">
              {dict.disclaimer}
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
