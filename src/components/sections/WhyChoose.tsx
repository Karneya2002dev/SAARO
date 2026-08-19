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
import { cn } from "@/lib/cn";
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
          /* Nine row tracks at two columns, six once three fit — three per
             row of reasons, so each can span its own set. */
          className="mx-auto -mb-8 mt-12 grid max-w-[1155px] ta-stack grid-cols-2 grid-rows-[repeat(9,auto)] gap-x-4 sm:-mb-12 sm:mt-14 sm:gap-x-8 md:grid-cols-3 md:grid-rows-[repeat(6,auto)] lg:grid-cols-4"
        >
          {reasons.map((reason, index) => {
            const copy = dict.whyChoose.items[reason.id];

            return (
              <li
                key={reason.id}
                /* Icon, title and copy each take a row track shared with every
                   other reason, so a one-line title no longer starts its
                   description higher than the two-line ones beside it. Subgrid
                   rather than a min-height on the title, which would have to be
                   guessed per locale and would go wrong the moment the copy
                   changed.

                   Boxed below `lg` only, where a reason is narrow and has
                   nothing to read against. At `lg` it has the width to stand on
                   its own, which is how this section is drawn.

                   The gap between rows rides on this item's margin rather than
                   the grid's `gap-y`: a subgrid inherits its parent's row gap,
                   which would open the same space inside every reason too, and
                   a margin here also keeps it outside the box. Every item
                   carries the same margin and padding, so a row stays aligned
                   across it, and the container's negative margin takes the
                   amount back off the last row. */
                className={cn(
                  "row-span-3 mb-8 grid grid-rows-subgrid justify-items-center rounded-2xl bg-surface px-4 py-6 text-center sm:mb-12 sm:px-5 sm:py-7 lg:rounded-none lg:bg-transparent lg:p-0",
                  // Four across leaves two on the second row; nudging the fifth
                  // to column two centres that pair under the grid.
                  index === 4 && "lg:col-start-2",
                )}
              >
                <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-heading shadow-icon">
                  {iconFor[reason.icon]}
                </span>

                <h3 className="mt-5 text-h4 font-semibold tracking-[-0.01em] text-heading">
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
