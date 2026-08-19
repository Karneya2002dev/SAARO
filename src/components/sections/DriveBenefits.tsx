import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { driveBenefits } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function DriveBenefits() {
  const dict = await getDictionary();

  return (
    <section className="bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.driveBenefits.eyebrow}
            title={dict.driveBenefits.title}
          />
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.1}
          className="mx-auto mt-12 grid max-w-[1110px] ta-stack grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4"
        >
          {driveBenefits.map((benefit) => {
            const copy = dict.driveBenefits.items[benefit.id];

            return (
              <li key={benefit.id} className="flex flex-col items-center text-center">
                {/* Only the artwork sits in the card; the caption is below it,
                    as in the design. */}
                <div className="w-full max-w-[200px] rounded-2xl bg-white p-4 shadow-card">
                  <ImageSlot
                    src={benefit.image.src}
                    width={benefit.image.width}
                    height={benefit.image.height}
                    alt={copy.imageAlt}
                    ratio="aspect-square"
                    sizes="200px"
                    className="rounded-xl"
                  />
                </div>

                <h3 className="mt-5 text-h4 font-semibold tracking-[-0.01em] text-heading">
                  {copy.title}
                </h3>

                <p className="mt-2 max-w-[26ch] text-[13px] leading-[1.5] text-muted sm:text-[14px]">
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
