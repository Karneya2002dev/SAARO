import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Banknote, Clock, Crown, TrendUp } from "@/components/icons";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { driverPerks, type DriverPerkIcon } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<DriverPerkIcon, ReactNode> = {
  clock: <Clock className="size-6" />,
  banknote: <Banknote className="size-6" />,
  crown: <Crown className="size-6" />,
  trendUp: <TrendUp className="size-6" />,
};

export async function EarnWithSaaro() {
  const dict = await getDictionary();

  return (
    <section id="drive" className="scroll-mt-24 bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* Locked to the design's 1110 × 377 panel from lg up — the ratio
            rather than a pixel height, so it holds at any width in that
            range and lands on exactly 377px at the full 1110. */}
        {/* Cool near-black at the top warming into brown at the base — that
            vertical shift is what gives the road strip its tone once the
            artwork is laid over it. A flat fill reads grey instead. */}
        <Reveal className="relative isolate mx-auto max-w-[1110px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#0f0f11] via-[#141212] via-62% to-[#241a13] px-6 py-10 sm:px-10 lg:flex lg:aspect-[1110/377] lg:items-center lg:px-12 lg:py-0">
          {/* The artwork is a pale line drawing, so it is dropped to a low
              opacity over the near-black panel rather than darkened.
              scale-115 buys the parallax room to drift without pulling an edge
              into the panel. */}
          <Parallax
            to={-10}
            className="pointer-events-none absolute inset-0 -z-10 scale-115"
          >
            <Image
              src="/assets/bg2.png"
              alt=""
              aria-hidden
              fill
              sizes="1110px"
              className="select-none object-cover object-center opacity-[0.4]"
            />
          </Parallax>

          {/* Right padding at lg reserves the column the driver stands in,
              so the perks never run underneath him. */}
          <div className="flex flex-col gap-10 lg:w-full lg:flex-row lg:items-center lg:gap-14 lg:pr-[210px]">
            <div className="lg:max-w-[330px] lg:shrink-0">
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-accent sm:text-[14px]">
                {dict.earn.eyebrow}
              </p>

              <h2 className="mt-2 text-h2 font-bold leading-[1.15] tracking-[-0.02em] text-white">
                {dict.earn.title}
              </h2>

              <p className="mt-4 text-[13px] leading-[1.55] text-white/75 sm:text-[14px]">
                {dict.earn.bodyTop}
                <br />
                {dict.earn.bodyBottom}
              </p>

              <Link
                href="#book"
                className="mt-7 inline-flex min-h-12 w-fit items-center gap-2.5 rounded-full bg-accent px-6 text-[14px] font-semibold text-heading transition-colors hover:bg-accent/90 sm:text-[15px]"
              >
                {dict.earn.cta}
                <ArrowRight className="size-4.5" />
              </Link>
            </div>


          {/* Four across at every width — at three the fourth dropped to a row
              of its own. A phone panel leaves about 240px for the row at 320px,
              so the disc and the label both come down to fit four columns into
              it; both return to full size from `sm`. */}
          <div className="flex justify-center">
            <ul className="grid grid-cols-4 gap-2 sm:gap-8 lg:gap-10">
              {driverPerks.map((perk) => (
                <li
                  key={perk.id}
                  className="flex flex-col items-center text-center"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-white/10 text-accent ring-1 ring-white/30 sm:size-13">
                    {iconFor[perk.icon]}
                  </span>
                  <p className="mt-2 text-[11px] font-medium leading-[1.35] text-white sm:mt-3 sm:text-[14px]">
                    {dict.earn.perks[perk.id]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          </div>

          {/* Cut off at the shoulders, so he stands on the panel's bottom edge. */}
          <Image
            src="/assets/man.png"
            alt={dict.earn.driverAlt}
            width={186}
            height={230}
            sizes="186px"
            // h-auto keeps the aspect ratio derived from the intrinsic size;
            // constraining width alone makes next/image warn about a stretch.
            className="pointer-events-none absolute right-6 bottom-0 hidden h-auto w-[186px] select-none lg:block"
          />
        </Reveal>
      </div>
    </section>
  );
} 