import type { ReactNode } from "react";
import { Calendar, MapPin, StarOutline, Users } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import {
  aboutStats,
  type AboutStatIcon,
  type TravelPlanTone,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<AboutStatIcon, ReactNode> = {
  users: <Users className="size-6" />,
  star: <StarOutline className="size-6" />,
  calendar: <Calendar className="size-6" />,
  pin: <MapPin className="size-6" />,
};

/** Pale disc, coloured rim and icon — one set per stat. */
const toneStyles: Record<TravelPlanTone, string> = {
  amber: "bg-[#fdf3e2] border-[#f5a623] text-[#f5a623]",
  blue: "bg-[#e7f1fc] border-[#2f80ed] text-[#2f80ed]",
  green: "bg-[#e8f5ea] border-[#1e9e4a] text-[#1e9e4a]",
  purple: "bg-[#f0ebfa] border-[#7c4ddb] text-[#7c4ddb]",
};

export async function AboutStats() {
  const dict = await getDictionary();

  return (
    <section className="bg-cream pb-10 pt-4 sm:pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* Top padding on the list, not the cards: the badges sit half outside
            the card's top edge and would otherwise be clipped by the section. */}
        <Reveal
          as="ul"
          stagger={0.1}
          className="mx-auto grid max-w-[1210px] grid-cols-1 gap-x-6 gap-y-16 pt-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {aboutStats.map((stat) => {
            const copy = dict.aboutStats[stat.id];

            return (
              <li
                key={stat.id}
                className="relative rounded-2xl bg-white px-5 pb-8 pt-12 text-center shadow-card"
              >
                <span
                  className={`absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full border-2 ${toneStyles[stat.tone]}`}
                >
                  {iconFor[stat.icon]}
                </span>

                <p className="text-[26px] font-bold leading-none tracking-[-0.02em] text-heading sm:text-[29px]">
                  {copy.prefix ? (
                    <span className="mr-2 text-[0.72em] font-semibold">
                      {copy.prefix}
                    </span>
                  ) : null}
                  {copy.value}
                </p>

                <p className="mt-3 text-[13px] font-semibold text-heading sm:text-[14px]">
                  {copy.label}
                </p>

                <p className="mt-2 text-[13px] leading-[1.5] text-muted sm:text-[14px]">
                  {copy.description}
                </p>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
