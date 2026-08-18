import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { driveSteps, pageImages } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function DriveSteps() {
  const dict = await getDictionary();
  const image = pageImages.driveSteps;

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.driveSteps.eyebrow}
            title={dict.driveSteps.title}
          />
        </Reveal>

        <div className="mt-12 grid items-center gap-12 sm:mt-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImageSlot
              src={image.src}
              width={image.width}
              height={image.height}
              alt={dict.driveSteps.imageAlt}
              ratio="aspect-[478/507]"
              sizes="(min-width: 1024px) 520px, 100vw"
              className="mx-auto max-w-[520px] rounded-none"
            />
          </Reveal>

          <Reveal as="ol" stagger={0.12} className="flex flex-col gap-8">
            {driveSteps.map((step, index) => {
              const copy = dict.driveSteps.items[step.id];

              return (
                <li
                  key={step.id}
                  className="group relative flex items-start gap-5 pl-6"
                >
                  {/* Per-entry rule rather than one continuous spine, so the
                      gaps between steps stay visible.

                      Every step reads the same at rest; the accent is purely
                      the hover response, so it only ever marks the one being
                      read rather than singling out a step. */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1 rounded-full bg-line transition-colors duration-200 group-hover:bg-accent"
                  />

                  {/* The border stays put and only changes colour, so filling
                      the badge on hover cannot nudge the number. */}
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line bg-white text-[15px] font-semibold text-heading transition-colors duration-200 group-hover:border-accent group-hover:bg-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 pt-1.5">
                    <h3 className="text-h5 font-semibold tracking-[-0.01em] text-heading">
                      {copy.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.55] text-muted sm:text-[14px]">
                      {copy.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
