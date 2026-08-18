import { CheckCircle } from "@/components/icons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { pageImages, commitments } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function OurCommitment() {
  const dict = await getDictionary();
  const image = pageImages.aboutCommitment;

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal stagger={0.12}>
            {/* Left-aligned and set in two weights, so this does not use the
                shared centred SectionHeading. */}
            <p className="text-[15px] text-brand sm:text-[16px]">
              {dict.commitment.eyebrowLead}{" "}
              <span className="font-semibold">{dict.commitment.eyebrowStrong}</span>
            </p>

            <h2 className="mt-3 text-h2 font-bold leading-[1.2] tracking-[-0.02em] text-heading">
              <span className="block">{dict.commitment.titleTop}</span>
              <span className="block">{dict.commitment.titleBottom}</span>
            </h2>

            <ul className="mt-8 flex flex-col gap-5">
              {commitments.map((commitment) => (
                <li key={commitment.id} className="flex items-start gap-3.5">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-[14px] leading-[1.5] text-heading sm:text-[15px]">
                    {dict.commitment.items[commitment.id]}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ImageSlot
              src={image.src}
              width={image.width}
              height={image.height}
              alt={dict.commitment.imageAlt}
              ratio="aspect-square"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
