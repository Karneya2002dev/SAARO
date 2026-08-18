import Image from "next/image";
import type { ReactNode } from "react";
import {
  Banknote,
  Car,
  Clipboard,
  Globe,
  StarOutline,
  UserCheck,
} from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { serviceHighlights, type ReasonIcon } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<ReasonIcon, ReactNode> = {
  userCheck: <UserCheck className="size-5" />,
  clipboard: <Clipboard className="size-5" />,
  globe: <Globe className="size-5" />,
  banknote: <Banknote className="size-5" />,
  car: <Car className="size-5" />,
  star: <StarOutline className="size-5" />,
};

export async function ServicesHero() {
  const dict = await getDictionary();

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal stagger={0.12}>
            <h1 className="text-hero font-bold leading-[1.15] tracking-[-0.025em]">
              <span className="block text-heading">{dict.servicesPage.titleTop}</span>
              <span className="block text-brand">{dict.servicesPage.titleBottom}</span>
            </h1>

            <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.65] text-muted sm:text-[16px]">
              {dict.servicesPage.body}
            </p>

            {/* The same three promises as the home page's "Why Choose" grid,
                pulled from one source so the wording cannot drift. */}
            <ul className="mt-8 flex flex-col gap-6">
              {serviceHighlights.map((highlight) => {
                const copy = dict.whyChoose.items[highlight.id];

                return (
                  <li key={highlight.id} className="flex items-start gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-heading">
                      {iconFor[highlight.icon]}
                    </span>

                    <div className="min-w-0">
                      <h2 className="text-h5 font-semibold tracking-[-0.01em] text-heading">
                        {copy.title}
                      </h2>
                      <p className="mt-1 max-w-[38ch] text-[13px] leading-[1.5] text-muted sm:text-[14px]">
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
              src="/assets/service-page.png"
              alt={dict.servicesPage.imageAlt}
              width={842}
              height={676}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
