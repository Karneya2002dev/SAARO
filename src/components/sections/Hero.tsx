import Image from "next/image";
import { Calendar, Clock, MapPin } from "@/components/icons";
import { BookDriverDialog } from "@/components/ui/BookDriverDialog";
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
        // Desktop height follows the photo's own 1628x917 ratio (56.4% of the
        // viewport width), so from ~1206px up the section and the artwork are
        // the same shape. The 680px floor below that is what the copy needs;
        // keeping the photo uncropped through that band is the photo's job now,
        // not the section's — see the ratio box below.
        "relative isolate w-full overflow-hidden bg-white",
        tall
          ? "lg:min-h-[clamp(680px,56.4vw,920px)]"
          : "lg:h-[clamp(680px,56.4vw,920px)]",
      )}
    >
      {/* ---- Photo -----------------------------------------------------
          The artwork already fades to white on its left edge, so on desktop
          it sits full-bleed behind the copy with only a light safety scrim.
          On mobile it moves below the copy so text never lands on the car.

          Held to the artwork's own 1628x917 ratio rather than stretched to the
          section. The section's height has a 680px floor, so between `lg` and
          1206px it is taller than the photo naturally is — filling it there
          scaled the photo up and cropped 183px off the sides at `lg`, taking
          the faded left edge the copy sits on with it. At its own ratio the
          photo is never cropped sideways; where the section is taller, the
          wave already covers the difference at every width. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden aspect-[1628/917] lg:block">
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

      <div className="mx-auto w-full max-w-[1456px] px-4 sm:px-5 lg:h-full lg:px-6">
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

          {/* The measure cap starts at `sm`. On a phone the column is already
              a good line length on its own — 37 characters at 360px — so the
              30ch cap only pulled the copy in short of the button beneath it.
              From `sm` the column runs to 600px and wide, and the cap is what
              keeps the line readable. */}
          <p className="animate-rise mt-7 text-pretty text-[16px] leading-[1.6] text-body sm:max-w-[30ch] sm:text-[18px] lg:mt-9 lg:text-[19px]">
            {dict.hero.body}
          </p>

          {/* flex-wrap so a longer localised label drops the second button to
              its own row instead of overflowing the column. */}
          <div className="animate-rise mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-10">
            {/* Opens the booking form in place rather than scrolling away to
                an anchor — `triggerClassName` replaces the dialog's own pill so
                this keeps the hero's button shape. */}
            <BookDriverDialog
              label={dict.hero.book}
              dict={dict.nav.dialog}
              fields={dict.enquiry}
              phone={siteConfig.phone}
              privacyHref={`/${locale}/privacy`}
              icon={<Calendar className="size-5 shrink-0" />}
              // min-h rather than h: a label that wraps grows the pill instead
              // of spilling out of it.
              triggerClassName="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-3 text-center text-[16px] font-medium text-white shadow-[0_10px_28px_-10px_rgba(21,96,58,0.6)] transition-colors hover:bg-brand-dark sm:min-h-[58px] sm:px-8 sm:text-[17px] lg:min-h-[60px] lg:text-[18px]"
            />
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
      <div className="relative aspect-4/3 w-full sm:aspect-video md:aspect-auto md:h-[420px] lg:hidden">
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
