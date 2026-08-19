import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

/**
 * The same four steps as `HowItWorks`, laid out as a straight row of circular
 * illustrations rather than the home page's winding road. Both read from the
 * same `steps` data and the same dictionary keys — only the presentation
 * differs, so the copy can never disagree between the two pages.
 */

/** Rendered width of each circular illustration on the four-across row. */
const ART = 184;

/**
 * The tarmac joining one stop to the next. It runs from this step's circle to
 * the next one's, so its length is the column width minus one whole circle —
 * which only holds while the row has no column gap. Hence the spacing comes
 * from the items' own padding rather than `gap-x` on the grid.
 */
function RoadLink() {
  return (
    <span
      aria-hidden
      className="absolute hidden h-4 rounded-xs bg-road lg:block"
      style={{
        top: ART / 2 - 8,
        left: `calc(50% + ${ART / 2}px)`,
        width: `calc(100% - ${ART}px)`,
      }}
    >
      <span
        className="absolute inset-x-0 top-1/2 h-0.75 -translate-y-1/2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #fff 0 18px, transparent 18px 42px)",
        }}
      />
    </span>
  );
}

export async function HowItWorksRow() {
  const dict = await getDictionary();

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.howItWorks.eyebrow}
            title={dict.howItWorks.title}
          />
        </Reveal>

        <Reveal
          as="ol"
          stagger={0.12}
          className="mx-auto -mb-10 mt-12 grid max-w-[1110px] ta-stack grid-cols-2 grid-rows-[repeat(6,auto)] gap-x-4 sm:-mb-12 sm:mt-14 lg:mb-0 lg:grid-cols-4 lg:grid-rows-[repeat(3,auto)]"
        >
          {steps.map((step, index) => {
            const copy = dict.howItWorks.steps[step.id];

            return (
              /* Illustration, title and copy each take a row track shared with
                 every other step, so a title running to two lines in English or
                 four in Tamil no longer starts this step's description lower
                 than its neighbours'. Subgrid rather than a min-height on the
                 title, which would have to be guessed per locale and would go
                 wrong the moment any of this copy changed.

                 Where subgrid is unsupported the declaration is dropped and the
                 steps lay out as they did before — misaligned, but intact. */
              <li
                key={step.id}
                /* Boxed below `lg`, where nothing else groups a step: the four
                   are otherwise loose on white and the shared row tracks have
                   no edge to read against. At `lg` the box comes off — the road
                   between the circles is what joins the steps there, and it
                   runs from one column into the next, straight across where a
                   box's background would be.

                   The gap between the two rows of steps rides on this item's
                   margin, not on the grid's `gap-y` and no longer on the
                   description's: a subgrid inherits its parent's row gap, so a
                   gap set there would open up inside every step as well, and a
                   margin on the copy would land inside the box instead of
                   between boxes. Every item carries the same margin and padding,
                   so the two in a row stay aligned with each other. The
                   container's negative margin takes the same amount back off the
                   bottom row, which has nothing below it to be separated from. */
                className="relative row-span-3 mb-10 grid grid-rows-subgrid justify-items-center rounded-2xl bg-surface px-4 py-6 text-center sm:mb-12 lg:mb-0 lg:rounded-none lg:bg-transparent lg:px-3 lg:py-0"
              >
                {index < steps.length - 1 ? <RoadLink /> : null}

                <Image
                  src={step.art}
                  alt={copy.imageAlt}
                  width={192}
                  height={198}
                  sizes="184px"
                  className="h-auto w-[184px] max-w-full"
                />

                <h3 className="mt-5 text-h4 font-semibold tracking-[-0.01em] text-heading">
                  {copy.title}
                </h3>

                <p className="mt-2 max-w-[34ch] text-[13px] leading-normal text-muted sm:text-[14px]">
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
