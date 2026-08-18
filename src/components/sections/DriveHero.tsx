import Link from "next/link";
import type { ReactNode } from "react";
import { Clipboard, Shield, StarOutline } from "@/components/icons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { RupeeText } from "@/components/ui/Money";
import { Reveal } from "@/components/ui/Reveal";
import {
  driveHighlights,
  pageImages,
  type DriveHighlightIcon,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<DriveHighlightIcon, ReactNode> = {
  clipboard: <Clipboard className="size-4" />,
  star: <StarOutline className="size-4" />,
  shield: <Shield className="size-4" />,
};

export async function DriveHero() {
  const dict = await getDictionary();
  const image = pageImages.driveHero;

  return (
    <section className="overflow-hidden bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <Reveal stagger={0.12}>
            <h1 className="text-hero font-bold leading-[1.25] tracking-[-0.025em]">
              <span className="block text-heading">{dict.drivePage.titleTop}</span>
              <span className="mt-2 block text-heading">
                {dict.drivePage.titleLead}{" "}
                <span className="text-brand">{dict.drivePage.titleAccent}</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.65] text-muted sm:text-[17px]">
              {dict.drivePage.body}
            </p>

            <ul className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-5">
              {driveHighlights.map((highlight) => {
                const copy = dict.drivePage.highlights[highlight.id];

                return (
                  <li key={highlight.id} className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-white">
                      {iconFor[highlight.icon]}
                    </span>

                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold leading-tight tracking-[-0.01em] text-heading sm:text-[15px]">
                        <RupeeText text={copy.title} />
                      </p>
                      <p className="mt-1.5 text-[12px] leading-[1.45] text-muted sm:text-[13px]">
                        {copy.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href="#apply"
              className="mt-10 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-3 text-center text-[15px] font-medium text-white transition-colors hover:bg-brand-dark sm:text-[16px]"
            >
              <Clipboard className="size-5 shrink-0" />
              {dict.drivePage.cta}
            </Link>
          </Reveal>

          {/* Runs to the viewport's right edge on desktop, as in the design.
              max() holds the offset at zero once the viewport is narrower than
              the container, and the section clips any scrollbar overshoot. */}
          <Reveal
            delay={0.1}
            className="lg:-mr-[max(0px,calc((100vw-1200px)/2+2rem))]"
          >
            <ImageSlot
              src={image.src}
              width={image.width}
              height={image.height}
              alt={dict.drivePage.imageAlt}
              ratio="aspect-[681/495]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="lg:rounded-r-none"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
