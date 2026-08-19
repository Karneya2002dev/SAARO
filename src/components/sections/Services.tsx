import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Building, Road, Truck } from "@/components/icons";
import { Money } from "@/components/ui/Money";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { services, type Service, type ServiceIcon } from "@/lib/content";
import { getDictionary, getLocale, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

const iconFor: Record<ServiceIcon, ReactNode> = {
  building: <Building className="size-5" />,
  road: <Road className="size-5" />,
  truck: <Truck className="size-5" />,
};

function ServiceCard({
  service,
  dict,
  pricingHref,
  locale,
}: {
  service: Service;
  dict: Dictionary["services"];
  pricingHref: string;
  locale: Locale;
}) {
  const copy = dict.items[service.id];

  return (
    <article className="flex overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-accent text-white">
          {iconFor[service.icon]}
        </span>

        <h3 className="mt-6 text-h4 font-semibold tracking-[-0.01em] text-heading sm:mt-8">
          {copy.title}
        </h3>

        <p className="mt-3 text-[14px] leading-[1.5] text-muted sm:mt-4 sm:text-[15px]">
          {copy.description}
        </p>

        {/* Pushed to the card's base so the price and button line up across all
            three however far a description wraps. */}
        <p className="mt-auto pt-6 text-[14px] leading-none text-body sm:pt-8 sm:text-[15px]">
          {dict.from}
        </p>
        <p className="mt-2.5 text-[24px] font-semibold leading-none tracking-[-0.02em] text-heading sm:text-[26px] lg:text-[29px]">
          <Money amount={service.fromPrice} />
        </p>

        {/* `min-h` rather than a fixed height: a label that outgrows one line
            makes the pill taller instead of spilling through its own border,
            which is what `h-11` did to the Tamil label. The leading is explicit
            for the same reason — Tamil stacks vowel signs above and below the
            base character, and the inherited `normal` crowds them against it. */}
        <Link
          href={pricingHref}
          className="mt-5 inline-flex min-h-11 w-fit items-center justify-between gap-2 rounded-full border-[1.5px] border-accent px-4 py-2 text-[13px] font-medium leading-[1.45] text-heading transition-colors hover:bg-accent/10 sm:mt-6 sm:px-5 sm:text-[14px]"
        >
          <span>{dict.viewDetails}</span>
          <ArrowRight className="size-4 shrink-0" />
        </Link>
      </div>

      {/* The photo column runs the card's full height at every width, and is
          narrower in Tamil.

          At the design's 40% the copy column is 164px at `lg`, and the longest
          Tamil title — "சரக்கு வாகனங்கள்" — needs 188px, so it took two lines
          and carried the whole grid row down with it: 419px against English's
          372px. At 32% the column reaches 192px and the title fits on one, which
          is 24px of that back. English keeps the 40% it was drawn at.

          Narrower again on phones, where at 38% the copy column came to 139px
          at 320px — less than the button needs, so its label wrapped. The card
          clips, and scale-110 leaves the photo room to drift inside its frame
          without pulling an edge in. */}
      <div
        className={cn(
          "relative shrink-0",
          locale === "ta" ? "w-[32%]" : "w-[34%] sm:w-[38%] md:w-[40%]",
        )}
      >
        <Parallax to={-7} className="absolute inset-0 scale-110">
          <Image
            src={service.image}
            alt={copy.imageAlt}
            fill
            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 20vw, 34vw"
            className="object-cover"
            style={{ objectPosition: service.imagePosition ?? "center" }}
          />
        </Parallax>
      </div>
    </article>
  );
}

export async function Services() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section id="services" className="scroll-mt-24 bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading eyebrow={dict.services.eyebrow} title={dict.services.title} />
        </Reveal>

        {/* One card per row on phones. Three cards never divide into two
            columns without stranding one, and split three ways the copy had
            about 124px to wrap into. Full width the card reads properly and
            the photo gets to be a banner. Grid rows stretch from `sm`, so every
            card matches the tallest. */}
        <Reveal
          stagger={0.12}
          className="mx-auto mt-12 grid max-w-[1110px] grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-11"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              dict={dict.services}
              pricingHref={`/${locale}/pricing`}
              locale={locale}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
