import Link from "next/link";
import { ArrowRight, Tag } from "@/components/icons";
import { RupeeText } from "@/components/ui/Money";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function PricingBanner() {
  const dict = await getDictionary();
  const locale = await getLocale();

  return (
    <section className="bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal className="mx-auto flex max-w-[1110px] flex-col gap-7 rounded-2xl bg-accent/12 px-6 py-7 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex items-center gap-5 sm:gap-6">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-accent">
              <Tag className="size-7" />
            </span>

            <div className="min-w-0">
              {/* The two rates are deliberately one block of copy, so the
                  break stays put instead of reflowing mid-sentence. */}
              <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.01em] text-heading sm:text-[20px]">
                <RupeeText text={dict.pricingBanner.lineOne} />
                <br />
                <RupeeText text={dict.pricingBanner.lineTwo} />
              </p>
              <p className="mt-2 text-[12px] leading-[1.5] text-muted sm:text-[13px]">
                {dict.pricingBanner.note}
              </p>
            </div>
          </div>

          {/* A hard offset shadow rather than a blurred one, to match the
              stamped look of the design. */}
          <Link
            href={`/${locale}/pricing`}
            className="inline-flex min-h-14 w-fit shrink-0 items-center gap-2.5 rounded-full border-2 border-heading bg-accent px-6 text-[14px] font-semibold text-heading shadow-[3px_4px_0_0_var(--color-heading)] transition-transform hover:-translate-y-0.5 sm:text-[15px]"
          >
            {dict.pricingBanner.cta}
            <ArrowRight className="size-4.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
