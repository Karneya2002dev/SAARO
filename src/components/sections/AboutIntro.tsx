import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { pageImages } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function AboutIntro() {
  const dict = await getDictionary();
  const image = pageImages.aboutIntro;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImageSlot
              src={image.src}
              width={image.width}
              height={image.height}
              alt={dict.aboutPage.imageAlt}
              ratio="aspect-3/2"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </Reveal>

          <Reveal stagger={0.12}>
            <h1 className="text-[28px] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[34px] lg:text-[38px]">
              <span className="block text-heading">{dict.aboutPage.titleTop}</span>
              <span className="block text-brand">{dict.aboutPage.titleBottom}</span>
            </h1>

            <p className="mt-6 max-w-[52ch] text-[14px] leading-[1.7] text-muted sm:text-[15px]">
              {dict.aboutPage.bodyOne}
            </p>

            <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.7] text-muted sm:text-[15px]">
              {dict.aboutPage.bodyTwo}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
