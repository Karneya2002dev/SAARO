import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { driverStories, testimonials } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

/**
 * Both quote sets share this shape — `city` is only present on the driver
 * stories, so it is optional and the line is dropped when absent.
 */
type QuoteBlock = {
  eyebrow: string;
  title: string;
  items: Record<string, { name: string; quote: string; city?: string }>;
};

export async function Testimonials({
  variant = "customers",
}: {
  variant?: "customers" | "drivers";
}) {
  const dict = await getDictionary();
  const isDrivers = variant === "drivers";

  const block: QuoteBlock = isDrivers ? dict.driverStories : dict.testimonials;
  const people = isDrivers ? driverStories : testimonials;

  return (
    <section className="bg-cream pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading eyebrow={block.eyebrow} title={block.title} />
        </Reveal>

        {/* Grid rows stretch, so every card matches the longest quote. */}
        <Reveal
          stagger={0.12}
          className="mx-auto mt-12 grid max-w-[1110px] grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {people.map((person) => {
            const copy = block.items[person.id];

            return (
              <figure
                key={person.id}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-card"
              >
                <figcaption className="flex items-center gap-4">
                  <span className="relative size-13 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={person.image}
                      alt=""
                      fill
                      sizes="52px"
                      className="object-cover"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-heading sm:text-[15px]">
                      {copy.name}
                    </span>
                    {copy.city ? (
                      <span className="mt-0.5 block text-[12px] text-muted sm:text-[13px]">
                        {copy.city}
                      </span>
                    ) : null}
                  </span>
                </figcaption>

                <blockquote className="mt-7 text-[14px] leading-[1.65] text-body sm:text-[15px]">
                  &ldquo;{copy.quote}&rdquo;
                </blockquote>
              </figure>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
