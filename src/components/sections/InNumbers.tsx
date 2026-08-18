import type { ReactNode } from "react";
import { CalendarCheck, IdCard, StarOutline, User } from "@/components/icons";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { stats, type StatIcon } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<StatIcon, ReactNode> = {
  user: <User className="size-6" />,
  star: <StarOutline className="size-6" />,
  idCard: <IdCard className="size-6" />,
  calendar: <CalendarCheck className="size-6" />,
};

export async function InNumbers() {
  const dict = await getDictionary();

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <h2 className="text-center text-h3 font-bold tracking-[-0.01em] text-brand">
          {dict.inNumbers.title}
        </h2>

        {/* Hairline rules sit between columns rather than around them, so the
            first item in each row never carries a stray left edge. */}
        <Reveal
          as="ul"
          stagger={0.1}
          className="mt-10 grid grid-cols-2 gap-y-12 sm:mt-12 lg:grid-cols-4 lg:gap-y-0"
        >
          {stats.map((stat) => {
            const copy = dict.inNumbers.items[stat.id];

            return (
              <li
                key={stat.id}
                className="flex flex-col items-center px-4 text-center lg:border-l lg:border-line lg:first:border-l-0"
              >
                <span className="grid size-13 place-items-center rounded-full bg-accent text-white">
                  {iconFor[stat.icon]}
                </span>

                <CountUp
                  value={copy.value}
                  className="mt-6 text-[38px] font-bold leading-none tracking-[-0.03em] text-heading sm:text-[44px]"
                />

                <p className="mt-3 text-[13px] leading-[1.5] text-muted sm:text-[14px]">
                  {copy.label}
                </p>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
