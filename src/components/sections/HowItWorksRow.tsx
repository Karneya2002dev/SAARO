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
    <section className="bg-white pb-10 sm:pb-12 lg:pb-16">
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
          className="mx-auto mt-12 grid max-w-[1110px] grid-cols-1 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0"
        >
          {steps.map((step, index) => {
            const copy = dict.howItWorks.steps[step.id];

            return (
              <li
                key={step.id}
                className="relative flex flex-col items-center px-3 text-center"
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

                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-heading sm:text-[19px]">
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
