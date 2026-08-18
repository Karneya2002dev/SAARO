import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Building, Road, Truck } from "@/components/icons";
import { Money } from "@/components/ui/Money";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type Service, type ServiceIcon } from "@/lib/content";
import { getDictionary, getLocale, type Dictionary } from "@/lib/i18n";

const iconFor: Record<ServiceIcon, ReactNode> = {
  building: <Building className="size-5" />,
  road: <Road className="size-5" />,
  truck: <Truck className="size-5" />,
};

function ServiceCard({
  service,
  dict,
  pricingHref,
}: {
  service: Service;
  dict: Dictionary["services"];
  pricingHref: string;
}) {
  const copy = dict.items[service.id];

  return (
    <article className="flex flex-col-reverse overflow-hidden rounded-2xl bg-white shadow-card sm:flex-row">
      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-5">
        <span className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-accent text-white sm:size-[38px]">
          {iconFor[service.icon]}
        </span>

        <h3 className="mt-3 text-[15px] font-semibold leading-[1.25] tracking-[-0.01em] text-heading sm:mt-8 sm:text-h4">
          {copy.title}
        </h3>

        <p className="mt-1.5 text-[12px] leading-[1.45] text-muted sm:mt-4 sm:text-[15px] sm:leading-[1.5]">
          {copy.description}
        </p>

        {/* Pushed down so the price and button line up across all three
            cards regardless of how many lines the description takes. */}
        <p className="mt-auto pt-3.5 text-[12px] leading-none text-body sm:pt-8 sm:text-[15px]">
          {dict.from}
        </p>
        <p className="mt-1.5 text-[19px] font-semibold leading-none tracking-[-0.02em] text-heading sm:mt-2.5 sm:text-[26px] lg:text-[29px]">
          <Money amount={service.fromPrice} />
        </p>

        {/* Two-up on a 320px phone leaves roughly 100px of content width —
            less than this label needs — so the pill fills the column there and
            only shrinks to its content once there is room. `min-h` rather than
            a fixed height: a label that outgrows one line makes the pill taller
            instead of spilling through its own border, which is what `h-11` did
            to the Tamil label. English still lands on exactly 44px.

            The leading is explicit for the same reason: Tamil stacks vowel
            signs above and below the base character, and the inherited
            `normal` leaves them crowding the border. */}
        <Link
          href={pricingHref}
          className="mt-3.5 inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-full border-[1.5px] border-accent px-2.5 py-1.5 text-center text-[12px] font-medium leading-[1.45] text-heading transition-colors hover:bg-accent/10 sm:mt-6 sm:min-h-11 sm:w-fit sm:justify-between sm:gap-2 sm:px-5 sm:py-2 sm:text-[14px]"
        >
          <span className="min-w-0">{dict.viewDetails}</span>
          <ArrowRight className="size-3.5 shrink-0 sm:size-4" />
        </Link>
      </div>

      {/* The card clips, and scale-110 leaves the photo room to drift inside
          its column without pulling an edge in. */}
      <div className="relative h-20 w-full shrink-0 sm:h-auto sm:w-[38%] md:w-[40%]">
        <Parallax to={-7} className="absolute inset-0 scale-110">
          <Image
            src={service.image}
            alt={copy.imageAlt}
            fill
            /* Two-up below lg and three-up above it, with the image taking
               ~40% of the card once it moves alongside the copy. */
            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 20vw, 50vw"
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

        {/* Grid rows stretch, so every card matches the tallest one. */}
        <Reveal
          stagger={0.12}
          className="mx-auto mt-12 grid max-w-[1110px] grid-cols-2 gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-3 lg:gap-11"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              dict={dict.services}
              pricingHref={`/${locale}/pricing`}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
