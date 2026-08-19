import Image from "next/image";
import { BookDriverDialog } from "@/components/ui/BookDriverDialog";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function BookCta() {
  const dict = await getDictionary();
  const locale = await getLocale();

  return (
    <section id="book" className="scroll-mt-24 bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* Left padding at lg reserves the driver's column so the copy never
            runs under him; below that he is hidden and the bar stacks.

            The design's 220px bar is a floor, not a fixed height. Both fit
            inside it today, but the panel also clips, so a fixed height means
            any future copy edit — or a Tamil string growing a line — is cut off
            silently instead of pushing the bar taller. The driver is anchored
            to the bottom edge, so he stays seated either way. */}
        <Reveal className="relative isolate mx-auto flex max-w-[1110px] flex-col gap-7 overflow-hidden rounded-2xl bg-[#131a33] px-6 py-8 sm:px-8 lg:min-h-[220px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-7 lg:pl-[210px] lg:pr-10">
          {/* Cropped at the shins in the artwork, so he stands on the bar's
              bottom edge. h-auto keeps his aspect ratio intact. */}
          <Image
            src="/assets/man2.png"
            alt={dict.bookCta.driverAlt}
            width={150}
            height={210}
            sizes="150px"
            className="pointer-events-none absolute bottom-0 left-8 hidden h-auto w-[150px] select-none lg:block"
          />

          <div className="min-w-0">
            <h2 className="text-h3 font-bold leading-[1.25] tracking-[-0.01em] text-white">
              {dict.bookCta.title}
            </h2>
            <p className="mt-2 text-[13px] leading-[1.55] text-white/70 sm:text-[14px]">
              {dict.bookCta.body}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/* Opens the booking form here instead of sending the reader to the
                contact page for it. Now the bar's only action, so it carries the
                accent fill the removed call button had. */}
            <BookDriverDialog
              label={dict.bookCta.book}
              dict={dict.nav.dialog}
              fields={dict.enquiry}
              phone={siteConfig.phone}
              privacyHref={`/${locale}/privacy`}
              triggerClassName="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-center text-[14px] font-semibold text-heading transition-colors hover:bg-accent/90 sm:text-[15px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
