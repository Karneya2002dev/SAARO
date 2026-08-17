import Image from "next/image";
import type { ReactNode } from "react";
import { Clipboard, MapPin, StarOutline } from "@/components/icons";
import { DownloadCard } from "@/components/ui/DownloadCard";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { appDownloads, appFeatures, type AppFeatureIcon } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";

const featureIcon: Record<AppFeatureIcon, ReactNode> = {
  clipboard: <Clipboard className="size-5" />,
  pin: <MapPin className="size-5" />,
  star: <StarOutline className="size-5" />,
};

export async function GetTheApp() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <div className="relative isolate mx-auto max-w-[1110px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#f5f7fa] to-[#eceff4] px-6 pt-12 sm:px-10 sm:pt-14 lg:pt-24">
          {/* Skyline watermark, anchored to the panel's bottom edge.
              It drifts downward rather than up: sinking only sends the
              buildings' bases past the panel edge, where they are already
              clipped, whereas lifting would open a gap under the skyline. */}
          <Parallax
            from={0}
            to={8}
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
          >
            <Image
              src="/assets/bg.png"
              alt=""
              aria-hidden
              width={1092}
              height={392}
              sizes="1110px"
              className="w-full select-none"
            />
          </Parallax>

          <Reveal
            stagger={0.14}
            className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_230px_265px] lg:gap-8 xl:gap-10"
          >
            {/* ---- Copy + download cards ---- */}
            <div className="lg:pb-20">
              <p className="text-[14px] font-bold uppercase tracking-[0.08em] text-brand sm:text-[15px]">
                {dict.getTheApp.eyebrow}
              </p>

              {/* `ch` is measured from the "0" advance, so the same cap that
                  gives English three tidy lines stacks the longer Tamil words
                  into a narrow column. */}
              <h2
                className={cn(
                  "mt-4 text-balance text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-heading sm:text-[38px] lg:text-[41px]",
                  locale === "ta" ? "max-w-[24ch]" : "max-w-[16ch]",
                )}
              >
                {dict.getTheApp.title}
              </h2>

              <p className="mt-4 text-[15px] leading-[1.6] text-muted sm:text-[16px]">
                {dict.getTheApp.body}
              </p>

              {/* Two-up wherever the column is wide enough; at lg the copy
                  column is too narrow for that, so the cards stack. */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-1 xl:grid-cols-2">
                {appDownloads.map((app) => (
                  <DownloadCard
                    key={app.id}
                    name={dict.downloads.items[app.id].name}
                    blurb={dict.downloads.items[app.id].blurb}
                    cta={dict.downloads.downloadNow}
                  />
                ))}
              </div>
            </div>

            {/* ---- Phone -------------------------------------------------
                The artwork is already cropped at the trip card, so on desktop
                its base is pinned flush to the panel's bottom edge. */}
            <div className="relative mx-auto w-[280px] max-w-full lg:mx-0 lg:w-auto">
              <Image
                src="/assets/mobile.png"
                alt={dict.getTheApp.phoneAlt}
                width={303}
                height={481}
                sizes="280px"
                className="w-full lg:absolute lg:inset-x-0 lg:bottom-0"
              />
            </div>

            {/* ---- Feature list ---- */}
            <div className="relative lg:pb-20">
              <ul className="flex flex-col gap-8 lg:gap-16">
                {appFeatures.map((feature, index) => {
                  const copy = dict.getTheApp.features[feature.id];

                  return (
                    <li key={feature.id} className="relative flex items-center gap-4">
                      {/* Dotted connector dropping into this step, with a node
                          where it lands. Drawn only in the gaps between steps
                          so it never runs through a title, while sitting at the
                          design's x offset rather than over the icons. */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-[124px] hidden w-px border-l border-dashed border-black/30 lg:block",
                          // The lead-in is kept shorter than the panel's top
                          // padding so it never runs off the panel's edge.
                          index === 0 ? "-top-20 h-16" : "-top-16 h-[3.25rem]",
                        )}
                      >
                        <span className="absolute -bottom-0.75 left-[-3.5px] size-1.75 rounded-full bg-black/40" />
                      </span>

                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-accent shadow-card">
                        {featureIcon[feature.icon]}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[16px] font-semibold leading-tight text-heading sm:text-[17px]">
                          {copy.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-snug text-muted sm:text-[14px]">
                          {copy.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
