import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FareEstimator,
  type EstimatorPlan,
} from "@/components/ui/FareEstimator";
import { fareTables } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

/** Whole rupees bare, anything else to the paisa — as in the fare tables. */
function money(amount: number) {
  return Number.isInteger(amount)
    ? `₹${amount.toLocaleString("en-IN")}`
    : `₹${amount.toFixed(2)}`;
}

/** The worked example is computed from the published rates rather than typed
 *  out, so it can never contradict the tables above it. */
const EXAMPLE = { plan: "cityLimit", vehicle: "normal", km: 60, minutes: 90 } as const;

export async function FareFormula() {
  const dict = await getDictionary();

  const exampleRow = fareTables
    .find((table) => table.plan === EXAMPLE.plan)!
    .rows.find((row) => row.vehicle === EXAMPLE.vehicle)!;

  const exampleDistance = EXAMPLE.km * exampleRow.perKm;
  const exampleTime = EXAMPLE.minutes * exampleRow.perMinute;
  const exampleTotal = exampleRow.baseFare + exampleDistance + exampleTime;

  const plans: EstimatorPlan[] = fareTables.map((table) => ({
    id: table.plan,
    label: dict.travelPlans.items[table.plan].title,
    vehicles: table.rows.map((row) => ({
      id: row.vehicle,
      label: dict.fareTable.vehicles[row.vehicle],
      baseFare: row.baseFare,
      perKm: row.perKm,
      perMinute: row.perMinute,
      minDistanceKm: row.minDistanceKm,
    })),
  }));

  const heading = dict.fareFormula.example.heading
    .replace("{plan}", dict.travelPlans.items[EXAMPLE.plan].title)
    .replace("{vehicle}", dict.fareTable.vehicles[EXAMPLE.vehicle])
    .replace("{km}", String(EXAMPLE.km))
    .replace("{minutes}", String(EXAMPLE.minutes));

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.fareFormula.eyebrow}
            title={dict.fareFormula.title}
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-[1010px] sm:mt-14">
          <p className="text-[15px] leading-[1.7] text-muted sm:text-[16px]">
            {dict.fareFormula.intro}
          </p>

          {/* Flagged in the design as not yet signed off — kept visually
              distinct so it is obvious this is provisional, and easy to find
              and delete once confirmed. */}
          <p className="mt-4 w-fit bg-[#fdf6e3] px-1 py-0.5 text-[15px] font-medium text-[#b23a1a] sm:text-[16px]">
            {dict.fareFormula.pendingNote}
          </p>

          <p className="mt-10 text-center text-[16px] font-semibold leading-[1.5] text-brand sm:text-[18px]">
            {dict.fareFormula.formula}
          </p>

          <div className="mt-6 rounded-2xl bg-surface p-6 font-mono text-[13px] leading-[1.9] text-heading sm:p-8 sm:text-[14px]">
            <p>{heading}</p>

            <p className="mt-4">
              {dict.fareFormula.example.baseFare}{" "}
              <span className="text-brand">{money(exampleRow.baseFare)}</span>
            </p>
            <p>
              {dict.fareFormula.example.distance} {EXAMPLE.km} km ×{" "}
              {money(exampleRow.perKm)} ={" "}
              <span className="text-brand">{money(exampleDistance)}</span>
            </p>
            <p>
              {dict.fareFormula.example.time} {EXAMPLE.minutes}{" "}
              {dict.fareFormula.example.minutesShort} ×{" "}
              {money(exampleRow.perMinute)} ={" "}
              <span className="text-brand">
                {money(Math.round(exampleTime))}
              </span>
            </p>
            <p className="mt-4">
              ={" "}
              <span className="font-bold text-brand">
                {money(Math.round(exampleTotal))} {dict.fareFormula.example.total}
              </span>{" "}
              <span className="text-muted">
                {dict.fareFormula.example.totalNote}
              </span>
            </p>
          </div>

          <FareEstimator plans={plans} dict={dict.fareFormula.estimator} />
        </Reveal>
      </div>
    </section>
  );
}
