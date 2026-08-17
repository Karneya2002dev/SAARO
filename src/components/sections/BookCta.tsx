import Image from "next/image";
import Link from "next/link";
import { Phone } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function BookCta() {
  const dict = await getDictionary();
  const locale = await getLocale();

  return (
    <section id="book" className="scroll-mt-24 bg-white pb-10 sm:pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* Left padding at lg reserves the driver's column so the copy never
            runs under him; below that he is hidden and the bar stacks. */}
        <Reveal className="relative isolate mx-auto flex max-w-[1110px] flex-col gap-7 h-[220px] overflow-hidden rounded-2xl bg-[#131a33] px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-7 lg:pl-[210px] lg:pr-10">
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
            <h2 className="text-[20px] font-bold leading-[1.25] tracking-[-0.01em] text-white sm:text-[23px]">
              {dict.bookCta.title}
            </h2>
            <p className="mt-2 text-[13px] leading-[1.55] text-white/70 sm:text-[14px]">
              {dict.bookCta.body}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-2.5 text-center text-[14px] font-semibold text-heading transition-colors hover:bg-accent/90 sm:text-[15px]"
            >
              <Phone className="size-4 shrink-0" />
              {dict.bookCta.call.replace("{phone}", siteConfig.phone)}
            </Link>

            <Link
              // The enquiry form is the only place a booking can actually be
              // made, so the button leaves for it rather than scrolling here.
              href={`/${locale}/contact#enquiry`}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/45 px-6 py-2.5 text-center text-[14px] font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
            >
              {dict.bookCta.book}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
