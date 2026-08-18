import Image from "next/image";
import Link from "next/link";
import { WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { pageImages, siteConfig } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

export async function ContactHero() {
  const dict = await getDictionary();
  const image = pageImages.contactHero;
  const digits = siteConfig.phone.replace(/\D/g, "");

  return (
    <section className="overflow-hidden bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal stagger={0.12}>
            <h1 className="text-hero font-bold leading-[1.15] tracking-[-0.025em]">
              <span className="block text-heading">{dict.contactPage.titleTop}</span>
              <span className="mt-1 block text-brand">
                {dict.contactPage.titleBottom}
              </span>
            </h1>

            <p className="mt-7 max-w-[44ch] text-[14px] leading-[1.7] text-muted sm:text-[15px]">
              {dict.contactPage.bodyOne}
            </p>
            <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.7] text-muted sm:text-[15px]">
              {dict.contactPage.bodyTwo}
            </p>

            {/* WhatsApp is the only CTA here now, so it takes the solid
                treatment the call button used to have. */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                // wa.me needs the number bare — country code, no plus, no spaces.
                href={`https://wa.me/${digits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-2.5 text-center text-[14px] font-medium text-white transition-colors hover:bg-brand-dark sm:text-[15px]"
              >
                <WhatsApp className="size-4 shrink-0" />
                {dict.contactPage.whatsapp}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Image
              src={image.src!}
              alt={dict.contactPage.imageAlt}
              width={image.width!}
              height={image.height!}
              priority
              sizes="(min-width: 1024px) 680px, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
