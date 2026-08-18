import Image from "next/image";
import { Banknote, Bolt, Clock, Road } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  fareTables,
  fareVehicles,
  travelPlans,
  type TravelPlanTone,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { Money } from "@/components/ui/Money";

/** Same colour families as the plan cards, applied to table furniture. */
const toneStyles: Record<
  TravelPlanTone,
  { frame: string; head: string; badge: string; rule: string; pill: string }
> = {
  amber: {
    frame: "border-[#f5a623]/35",
    head: "bg-[#fdf3e2]",
    badge: "bg-[#f5a623]",
    rule: "border-b-[#f5a623]",
    pill: "bg-[#fdf3e2] text-[#b97910]",
  },
  blue: {
    frame: "border-[#2f80ed]/30",
    head: "bg-[#e7f1fc]",
    badge: "bg-[#2f80ed]",
    rule: "border-b-[#2f80ed]",
    pill: "bg-[#e7f1fc] text-[#2f80ed]",
  },
  green: {
    frame: "border-[#1e9e4a]/30",
    head: "bg-[#e8f5ea]",
    badge: "bg-[#1e9e4a]",
    rule: "border-b-[#1e9e4a]",
    pill: "bg-[#e8f5ea] text-[#1e9e4a]",
  },
  purple: {
    frame: "border-[#7c4ddb]/30",
    head: "bg-[#f0ebfa]",
    badge: "bg-[#7c4ddb]",
    rule: "border-b-[#7c4ddb]",
    pill: "bg-[#f0ebfa] text-[#7c4ddb]",
  },
};


export async function FareTables() {
  const dict = await getDictionary();

  const columns = [
    { key: "baseFare", icon: <Banknote className="size-4" /> },
    { key: "perKm", icon: <Road className="size-4" /> },
    { key: "perMinute", icon: <Clock className="size-4" /> },
    { key: "minDistance", icon: <Bolt className="size-4" /> },
  ] as const;

  return (
    <section className="bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.fareTable.eyebrow}
            title={dict.fareTable.title}
          />
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-[1210px] flex-col gap-10 sm:mt-14 lg:gap-14">
          {fareTables.map((table) => {
            const plan = travelPlans.find((p) => p.id === table.plan)!;
            const index = travelPlans.indexOf(plan);
            const tone = toneStyles[table.tone];
            const planCopy = dict.travelPlans.items[table.plan];
            // The minimum only greys out when it applies to no row at all.
            const noMinimum = table.rows.every((row) => row.minDistanceKm === null);

            return (
              <Reveal
                key={table.plan}
                className={`overflow-hidden rounded-2xl border bg-white shadow-card ${tone.frame}`}
              >
                {/* Tables do not reflow, so on narrow screens this scrolls
                    sideways rather than crushing four numeric columns. */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-center">
                    <caption className="sr-only">
                      {planCopy.title} — {dict.fareTable.subtitles[table.plan]}
                    </caption>

                    <thead>
                      <tr className={`border-b-2 ${tone.rule}`}>
                        <th
                          scope="col"
                          className={`w-[38%] px-6 py-5 text-left align-middle ${tone.head}`}
                        >
                          <span className="flex items-center gap-4">
                            <span
                              className={`grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white ${tone.badge}`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[15px] font-semibold tracking-[-0.01em] text-heading">
                                {planCopy.title}
                              </span>
                              <span className="mt-0.5 block text-[12px] leading-snug text-muted">
                                {dict.fareTable.subtitles[table.plan]}
                              </span>
                            </span>
                          </span>
                        </th>

                        {columns.map((column) => (
                          <th
                            key={column.key}
                            scope="col"
                            className={`px-4 py-5 align-middle text-[14px] font-medium text-heading ${
                              column.key === "minDistance" && noMinimum
                                ? "opacity-40"
                                : ""
                            }`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <span className="text-muted">{column.icon}</span>
                              {dict.fareTable.columns[column.key]}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {table.rows.map((row) => (
                        <tr key={row.vehicle} className="border-t border-line">
                          <th
                            scope="row"
                            className="px-6 py-5 text-left align-middle text-[15px] font-normal text-heading"
                          >
                            <span className="flex items-center gap-4">
                              {/* Fixed 56px box with the photo contained
                                  inside it, so the three different intrinsic
                                  sizes still leave the labels aligned. */}
                              <span className="grid h-8 w-14 shrink-0 place-items-center">
                                <Image
                                  src={fareVehicles[row.vehicle].image}
                                  alt=""
                                  aria-hidden
                                  width={fareVehicles[row.vehicle].width}
                                  height={fareVehicles[row.vehicle].height}
                                  sizes="56px"
                                  className="h-auto max-h-8 w-auto max-w-full select-none"
                                />
                              </span>
                              {dict.fareTable.vehicles[row.vehicle]}
                            </span>
                          </th>

                          <td className="border-l border-line px-4 py-5 align-middle text-[15px] text-heading">
                            <Money amount={row.baseFare} />
                          </td>
                          <td className="border-l border-line px-4 py-5 align-middle text-[15px] text-heading">
                            <Money amount={row.perKm} />
                          </td>
                          <td className="border-l border-line px-4 py-5 align-middle text-[15px] text-heading">
                            <Money amount={row.perMinute} />
                          </td>
                          <td className="border-l border-line px-4 py-5 align-middle text-[15px] text-heading">
                            {row.minDistanceKm === null ? (
                              <span
                                className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-medium ${tone.pill}`}
                              >
                                {dict.fareTable.switchedOff}
                              </span>
                            ) : (
                              dict.fareTable.distance.replace(
                                "{km}",
                                String(row.minDistanceKm),
                              )
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
