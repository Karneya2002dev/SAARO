import type { ReactNode } from "react";
import {
  Banknote,
  Car,
  Clipboard,
  Globe,
  StarOutline,
  UserCheck,
} from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reasons, type ReasonIcon } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<ReasonIcon, ReactNode> = {
  userCheck: <UserCheck className="size-6" />,
  clipboard: <Clipboard className="size-6" />,
  globe: <Globe className="size-6" />,
  banknote: <Banknote className="size-6" />,
  car: <Car className="size-6" />,
  star: <StarOutline className="size-6" />,
};

export async function WhyChoose() {
  const dict = await getDictionary();

  return (
    <section id="about" className="scroll-mt-24 bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.whyChoose.eyebrow}
            title={dict.whyChoose.title}
          />
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.08}
          className="mx-auto mt-12 grid max-w-[1155px] grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:mt-14 md:grid-cols-3 lg:grid-cols-4"
        >
          {reasons.map((reason, index) => {
            const copy = dict.whyChoose.items[reason.id];

            return (
              <li
                key={reason.id}
                className={
                  // Four across leaves two on the second row; nudging the fifth
                  // to column two centres that pair under the grid.
                  index === 4
                    ? "flex flex-col items-center text-center lg:col-start-2"
                    : "flex flex-col items-center text-center"
                }
              >
                <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-heading shadow-icon">
                  {iconFor[reason.icon]}
                </span>

                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-heading sm:text-[19px]">
                  {copy.title}
                </h3>

                <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.5] text-muted sm:text-[15px]">
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
