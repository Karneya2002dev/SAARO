import { CheckCircle } from "@/components/icons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { driverBenefitPoints, pageImages } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function DriverBenefits() {
  const dict = await getDictionary();
  const image = pageImages.driverBenefits;

  return (
    <section className="bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal stagger={0.12}>
            {/* Left-aligned, so this does not use the shared centred heading. */}
            <p className="text-[15px] font-semibold text-brand sm:text-[16px]">
              {dict.driverBenefits.eyebrow}
            </p>

            <h2 className="mt-3 text-h2 font-bold leading-[1.2] tracking-[-0.02em] text-heading">
              <span className="block">{dict.driverBenefits.titleTop}</span>
              <span className="block">{dict.driverBenefits.titleBottom}</span>
            </h2>

            <ul className="mt-8 flex flex-col gap-5">
              {driverBenefitPoints.map((point) => (
                <li key={point.id} className="flex items-start gap-3.5">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-[14px] leading-[1.5] text-heading sm:text-[15px]">
                    {dict.driverBenefits.items[point.id]}
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
              alt={dict.driverBenefits.imageAlt}
              ratio="aspect-[514/563]"
              sizes="(min-width: 1024px) 520px, 100vw"
              className="mx-auto max-w-[520px] rounded-none"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
