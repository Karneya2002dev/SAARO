import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Building, Road, Truck } from "@/components/icons";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type Service, type ServiceIcon } from "@/lib/content";
import { getDictionary, type Dictionary } from "@/lib/i18n";

const iconFor: Record<ServiceIcon, ReactNode> = {
  building: <Building className="size-5" />,
  road: <Road className="size-5" />,
  truck: <Truck className="size-5" />,
};

function ServiceCard({
  service,
  dict,
}: {
  service: Service;
  dict: Dictionary["services"];
}) {
  const copy = dict.items[service.id];

  return (
    <article className="flex overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-accent text-white">
          {iconFor[service.icon]}
        </span>

        <h3 className="mt-8 text-[19px] font-semibold tracking-[-0.01em] text-heading sm:text-[20px]">
          {copy.title}
        </h3>

        <p className="mt-4 text-[14px] leading-[1.5] text-muted sm:text-[15px]">
          {copy.description}
        </p>

        {/* Pushed down so the price and button line up across all three
            cards regardless of how many lines the description takes. */}
        <p className="mt-auto pt-8 text-[14px] leading-none text-body sm:text-[15px]">
          {dict.from}
        </p>
        <p className="mt-2.5 text-[26px] font-semibold leading-none tracking-[-0.02em] text-heading sm:text-[29px]">
          ₹{service.fromPrice}
        </p>

        {/* This column is narrow — around 67px of label width at the 2-up and
            3-up breakpoints — so the height is a floor rather than a fixed
            size. A label that outgrows one line then makes the pill taller
            instead of spilling through its own border, which is what a fixed
            `h-11` did to the Tamil label. English still lands on exactly 44px.

            The leading is explicit for the same reason: Tamil stacks vowel
            signs above and below the base character, and the inherited
            `normal` leaves them crowding the border. */}
        <Link
          href="#book"
          className="mt-6 inline-flex min-h-11 w-fit items-center justify-between gap-2 rounded-full border-[1.5px] border-accent px-5 py-2 text-[13px] font-medium leading-[1.45] text-heading transition-colors hover:bg-accent/10 sm:text-[14px]"
        >
          <span>{dict.viewDetails}</span>
          <ArrowRight className="size-4 shrink-0" />
        </Link>
      </div>

      {/* The card clips, and scale-110 leaves the photo room to drift inside
          its column without pulling an edge in. */}
      <div className="relative w-[38%] shrink-0 sm:w-[40%]">
        <Parallax to={-7} className="absolute inset-0 scale-110">
          <Image
            src={service.image}
            alt={copy.imageAlt}
            fill
            sizes="(min-width: 1024px) 150px, 40vw"
            className="object-cover"
            style={{ objectPosition: service.imagePosition ?? "center" }}
          />
        </Parallax>
      </div>
    </article>
  );
}

export async function Services() {
  const dict = await getDictionary();

  return (
    <section id="services" className="scroll-mt-24 bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading eyebrow={dict.services.eyebrow} title={dict.services.title} />
        </Reveal>

        {/* Grid rows stretch, so every card matches the tallest one. */}
        <Reveal
          stagger={0.12}
          className="mx-auto mt-12 grid max-w-[1110px] grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-11"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} dict={dict.services} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
