import type { ReactNode } from "react";
import { Calendar, MapPin, StarOutline, Users } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import {
  aboutStats,
  type AboutStatIcon,
  type TravelPlanTone,
} from "@/lib/content";
import { cn } from "@/lib/cn";
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
    <section className="bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* Top padding on the list, not the cards: the badges sit half outside
            the card's top edge and would otherwise be clipped by the section. */}
        <Reveal
          as="ul"
          stagger={0.1}
          className="mx-auto grid max-w-[1210px] ta-stack grid-cols-2 gap-x-4 gap-y-10 pt-7 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-4"
        >
          {aboutStats.map((stat) => {
            const copy = dict.aboutStats[stat.id];
            /* The big size is tuned for a figure of three to five glyphs. One
               stat is a phrase instead — "Across Region", and half again as
               wide in Tamil — which at that size wrapped to two lines set solid
               and dwarfed the cards beside it. */
            const isFigure = /\d/.test(copy.value);

            return (
              <li
                key={stat.id}
                className="relative rounded-2xl bg-white px-4 pb-8 pt-12 text-center shadow-card sm:px-5"
              >
                <span
                  className={`absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full border-2 ${toneStyles[stat.tone]}`}
                >
                  {iconFor[stat.icon]}
                </span>

                <p
                  className={cn(
                    "text-balance font-bold tracking-[-0.02em] text-heading",
                    isFigure
                      ? "text-[26px] leading-none sm:text-[29px]"
                      : "text-[18px] leading-[1.3] sm:text-[20px]",
                  )}
                >
                  {copy.prefix ? (
                    <span className="mr-2 text-[0.72em] font-semibold">
                      {copy.prefix}
                    </span>
                  ) : null}
                  {copy.value}
                </p>

                <p className="mt-3 break-words text-[13px] font-semibold text-heading sm:text-[14px]">
                  {copy.label}
                </p>

                <p className="mt-2 break-words text-[13px] leading-[1.5] text-muted sm:text-[14px]">
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
