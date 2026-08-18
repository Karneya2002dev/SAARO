import Image from "next/image";
import type { ReactNode } from "react";
import { Clipboard, Shield, StarOutline } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { pricingHighlights, type PricingHighlightIcon } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<PricingHighlightIcon, ReactNode> = {
  shield: <Shield className="size-5" />,
  clipboard: <Clipboard className="size-5" />,
  star: <StarOutline className="size-5" />,
};

export async function PricingHero() {
  const dict = await getDictionary();

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-5 lg:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal stagger={0.12} className="lg:pl-6 xl:pl-12">
            <h1 className="text-hero font-bold leading-[1.15] tracking-[-0.025em]">
              <span className="block text-heading">{dict.pricingPage.titleTop}</span>
              <span className="block text-brand">{dict.pricingPage.titleBottom}</span>
            </h1>

            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.65] text-heading sm:text-[16px]">
              &ldquo;{dict.pricingPage.quote}&rdquo;
            </p>

            {/* Same three promises as "Why Choose", drawn from one copy source
                but with this page's own solid-amber glyphs. */}
            <ul className="mt-10 flex flex-col gap-7">
              {pricingHighlights.map((highlight) => {
                const copy = dict.whyChoose.items[highlight.id];

                return (
                  <li key={highlight.id} className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-white">
                      {iconFor[highlight.icon]}
                    </span>

                    <div className="min-w-0">
                      <h2 className="text-h5 font-semibold tracking-[-0.01em] text-heading">
                        {copy.title}
                      </h2>
                      <p className="mt-1 max-w-[32ch] text-[13px] leading-[1.5] text-muted sm:text-[14px]">
                        {copy.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <Image
              src="/assets/pricing-page.png"
              alt={dict.pricingPage.imageAlt}
              width={886}
              height={670}
              priority
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
