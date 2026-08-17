import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Phone } from "@/components/icons";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";
import DRIVER_IMAGE from "@/public/assets/hero-section.png";

export async function Hero() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  // Tamil sets the same copy in noticeably more lines. The Latin layout pins
  // the section to the photo's ratio and centres the copy inside it, so the
  // taller block overflows and `overflow-hidden` shears the first line off the
  // top. For Tamil the height becomes a floor the section can grow past.
  const tall = locale === "ta";

  const facts = [
    { icon: <MapPin className="size-5" />, lines: dict.hero.facts.area },
    { icon: <Clock className="size-5" />, lines: dict.hero.facts.since },
  ];

  return (
    <section
      className={cn(
        // Desktop height tracks the photo's own 1629x919 ratio (56.4% of the
        // viewport width) so it is never cropped sideways — that crop is what
        // eats the artwork's white left edge and blows up the driver.
        "relative isolate w-full overflow-hidden bg-white",
        tall
          ? "lg:min-h-[clamp(680px,56.4vw,920px)]"
          : "lg:h-[clamp(680px,56.4vw,920px)]",
      )}
    >
      {/* ---- Photo -----------------------------------------------------
          The artwork already fades to white on its left edge, so on desktop
          it sits full-bleed behind the copy with only a light safety scrim.
          On mobile it moves below the copy so text never lands on the car. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Image
          src={DRIVER_IMAGE}
          alt={dict.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          /* Anchored to the top: any vertical crop is taken off the bottom
             (hidden by the wave) so the driver's head always keeps its
             clearance below the navbar. */
          className="object-cover object-top"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 0%, rgba(255,255,255,0.88) 20%, rgba(255,255,255,0) 44%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1456px] px-5 sm:px-6 lg:h-full lg:px-8">
        {/* Latin centres the copy in the fixed frame; Tamil flows with its own
            padding, since there is no fixed height left to centre against. */}
        <div
          className={cn(
            "relative z-10 flex flex-col justify-center pb-16 pt-14 sm:pb-20 sm:pt-16 lg:max-w-[600px] lg:pl-8 xl:pl-12",
            tall ? "lg:pb-24 lg:pt-20" : "lg:h-full lg:pb-[14%] lg:pt-0",
          )}
        >
          <h1 className="animate-rise text-display font-extrabold">
            <span className="block text-heading">{dict.hero.titleTop}</span>
            <span className="block text-brand">{dict.hero.titleBottom}</span>
          </h1>

          <p className="animate-rise mt-7 max-w-[30ch] text-pretty text-[16px] leading-[1.6] text-body sm:text-[18px] lg:mt-9 lg:text-[19px]">
            {dict.hero.body}
          </p>

          {/* flex-wrap so a longer localised label drops the second button to
              its own row instead of overflowing the column. */}
          <div className="animate-rise mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-10">
            <Link
              href="#book"
              // min-h rather than h: a label that wraps grows the pill instead
              // of spilling out of it.
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-3 text-center text-[16px] font-medium text-white shadow-[0_10px_28px_-10px_rgba(21,96,58,0.6)] transition-colors hover:bg-brand-dark sm:min-h-[58px] sm:px-8 sm:text-[17px] lg:min-h-[60px] lg:text-[18px]"
            >
              <Calendar className="size-5 shrink-0" />
              {dict.hero.book}
            </Link>

            <Link
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-line bg-white px-7 py-3 text-center text-[16px] font-medium text-heading shadow-[0_8px_24px_-14px_rgba(17,17,17,0.35)] transition-colors hover:bg-surface sm:min-h-[58px] sm:px-8 sm:text-[17px] lg:min-h-[60px] lg:text-[18px]"
            >
              <Phone className="size-5 shrink-0" />
              <span className="whitespace-nowrap">
                {dict.hero.call.replace("{phone}", siteConfig.phone)}
              </span>
            </Link>
          </div>

          <ul className="mt-9 flex flex-col gap-5 sm:flex-row sm:gap-10 lg:mt-12">
            {facts.map((fact) => (
              <li key={fact.lines[0]} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-accent">{fact.icon}</span>
                <span className="text-[14px] leading-[1.75] text-body sm:text-[15px]">
                  <span className="block">{fact.lines[0]}</span>
                  <span className="block">{fact.lines[1]}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile / tablet photo — full-bleed and offset so the driver, not the
          faded edge, fills the frame. */}
      <div className="relative aspect-4/3 w-full sm:aspect-video lg:hidden">
        <Image
          src={DRIVER_IMAGE}
          alt={dict.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
      </div>

      <WaveDivider />
    </section>
  );
}
