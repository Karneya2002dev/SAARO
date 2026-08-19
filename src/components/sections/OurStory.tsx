import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageImages, milestones } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function OurStory() {
  const dict = await getDictionary();
  const image = pageImages.aboutStory;

  // The "Today" entry quotes the same figures as the In Numbers strip, so it
  // reads them from there instead of restating them.
  const stats = dict.inNumbers.items;
  const fill = (text: string) =>
    text
      .replace("{drivers}", stats.drivers.value)
      .replace("{ratings}", stats.ratings.value)
      .replace("{documents}", stats.documents.value);

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.ourStory.eyebrow}
            title={dict.ourStory.title}
          />
        </Reveal>

        <Reveal
          stagger={0.1}
          className="mx-auto mt-12 flex max-w-[1120px] flex-col gap-5 sm:mt-14"
        >
          <p className="text-[15px] leading-[1.7] text-muted sm:text-[16px]">
            {dict.ourStory.bodyOne}
          </p>
          <p className="text-[15px] leading-[1.7] text-muted sm:text-[16px]">
            {dict.ourStory.bodyTwo}
          </p>
          <p className="text-[15px] leading-[1.7] text-muted sm:text-[16px]">
            {dict.ourStory.bodyThree}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImageSlot
              src={image.src}
              width={image.width}
              height={image.height}
              alt={dict.ourStory.imageAlt}
              ratio="aspect-4/3"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </Reveal>

          <Reveal as="ol" stagger={0.12} className="flex flex-col gap-8">
            {milestones.map((milestone) => {
              const copy = dict.ourStory.milestones[milestone.id];

              return (
                <li key={milestone.id} className="group relative pl-7">
                  {/* The rule is per entry rather than one continuous spine,
                      so the gaps between milestones stay visible.

                      Every entry reads the same at rest; the accent is purely
                      the hover response, so it only ever marks the one being
                      read rather than singling out a milestone. */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1 rounded-full bg-line transition-colors duration-200 group-hover:bg-accent"
                  />

                  <p className="text-[15px] font-semibold tracking-[-0.01em] text-heading sm:text-[16px]">
                    {copy.date}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-muted sm:text-[14px]">
                    {fill(copy.description)}
                  </p>
                </li>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
