import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { driverRequirements } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function DriverRequirements() {
  const dict = await getDictionary();

  return (
    <section className="bg-white pb-10 sm:pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.driverRequirements.eyebrow}
            title={dict.driverRequirements.title}
          />
        </Reveal>

        {/* Rows stretch, so cards in a row match the tallest description. */}
        <Reveal
          as="ul"
          stagger={0.09}
          className="mx-auto mt-12 grid max-w-[1180px] grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {driverRequirements.map((requirement) => {
            const copy = dict.driverRequirements.items[requirement.id];

            return (
              <li
                key={requirement.id}
                className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-card"
              >
                {/* The artwork is roughly square but the design frames it in a
                    wide tinted panel, so the panel owns the ratio and the
                    image is contained and centred inside it. */}
                <div className="grid aspect-[32/15] w-full place-items-center overflow-hidden rounded-xl bg-cream">
                  <Image
                    src={requirement.image.src}
                    alt={copy.imageAlt}
                    width={requirement.image.width}
                    height={requirement.image.height}
                    sizes="180px"
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>

                <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-heading sm:text-[18px]">
                  {copy.title}
                </h3>

                <p className="mt-2 text-[14px] leading-[1.5] text-muted sm:text-[15px]">
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
