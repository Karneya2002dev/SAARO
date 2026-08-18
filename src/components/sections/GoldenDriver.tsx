import Link from "next/link";
import { Star } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/lib/i18n";

export async function GoldenDriver() {
  const dict = await getDictionary();

  return (
    <section className="bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal className="mx-auto flex max-w-[1110px] flex-col gap-6 rounded-2xl bg-[#131a33] px-6 py-7 sm:px-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex items-center gap-5 sm:gap-6">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-accent">
              <Star className="size-8" />
            </span>

            <div className="min-w-0">
              <p className="text-[17px] font-semibold tracking-[-0.01em] text-accent sm:text-[19px]">
                {dict.goldenDriver.label}
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.55] text-white/80 sm:text-[14px]">
                &ldquo;{dict.goldenDriver.quote}&rdquo;
              </p>
            </div>
          </div>

          <Link
            href="#apply"
            className="inline-flex min-h-12 w-fit shrink-0 items-center justify-center rounded-full border border-white/45 px-7 py-2.5 text-center text-[14px] font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
          >
            {dict.goldenDriver.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
