import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Money } from "@/components/ui/Money";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { travelPlans, type TravelPlanArt, type TravelPlanTone } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";

/**
 * Tailwind resolves class names at build time, so the per-plan colours have to
 * be written out rather than assembled from the tone at runtime.
 */
const toneStyles: Record<
  TravelPlanTone,
  { card: string; badge: string; price: string; button: string; art: string }
> = {
  amber: {
    card: "bg-[#fdf3e2]",
    badge: "bg-[#f5a623]",
    price: "text-[#e09616]",
    button: "border-[#f5a623]/45 hover:bg-[#f5a623]/10",
    art: "text-[#f2b53c]",
  },
  blue: {
    card: "bg-[#e7f1fc]",
    badge: "bg-[#2f80ed]",
    price: "text-[#2f80ed]",
    button: "border-[#2f80ed]/45 hover:bg-[#2f80ed]/10",
    art: "text-[#5b9bf0]",
  },
  green: {
    card: "bg-[#e8f5ea]",
    badge: "bg-[#1e9e4a]",
    price: "text-[#1e9e4a]",
    button: "border-[#1e9e4a]/45 hover:bg-[#1e9e4a]/10",
    art: "text-[#4bb36f]",
  },
  purple: {
    card: "bg-[#f0ebfa]",
    badge: "bg-[#7c4ddb]",
    price: "text-[#7c4ddb]",
    button: "border-[#7c4ddb]/45 hover:bg-[#7c4ddb]/10",
    art: "text-[#9a75e4]",
  },
};

/** Abstract glyphs, drawn in currentColor so each card tints its own. */
function PlanArt({ art, className }: { art: TravelPlanArt; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 80"
      aria-hidden
      fill="currentColor"
      className={className}
    >
      {art === "bars" ? (
        <>
          <rect x="22" y="36" width="17" height="32" rx="3" opacity=".55" />
          <rect x="46" y="20" width="17" height="48" rx="3" opacity=".8" />
          <rect x="70" y="27" width="17" height="41" rx="3" opacity=".65" />
          <rect x="94" y="13" width="17" height="55" rx="3" />
          <rect x="118" y="41" width="17" height="27" rx="3" opacity=".5" />
          <rect x="18" y="70" width="122" height="2.5" rx="1.25" opacity=".85" />
        </>
      ) : null}

      {art === "mountains" ? (
        <>
          <circle cx="80" cy="50" r="19" opacity=".3" />
          <path d="M38 70 60 32 82 70z" opacity=".55" />
          <path d="M70 70 96 22 122 70z" opacity=".85" />
        </>
      ) : null}

      {art === "route" ? (
        <>
          <path
            d="M16 58C40 58 44 28 66 28s26 30 46 22 26-26 32-30"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="7 8"
            strokeLinecap="round"
            opacity=".7"
          />
          <circle cx="66" cy="28" r="7.5" />
          <circle cx="112" cy="48" r="7.5" opacity=".75" />
        </>
      ) : null}

      {art === "peaks" ? (
        <>
          <path d="M32 70 58 36 84 70z" opacity=".55" />
          <path d="M56 70 84 20 112 70z" opacity=".4" />
          <path d="M84 70 108 34 132 70z" opacity=".3" />
          <path
            d="M20 60C48 60 66 34 94 44s32-16 46-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6 8"
            strokeLinecap="round"
            opacity=".65"
          />
          <circle cx="58" cy="40" r="6.5" opacity=".9" />
          <circle cx="122" cy="46" r="6.5" opacity=".7" />
        </>
      ) : null}
    </svg>
  );
}

export async function TravelPlans() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.travelPlans.eyebrow}
            title={dict.travelPlans.title}
          />
        </Reveal>

        {/* Rows stretch, so the buttons share a baseline however far a
            description wraps. */}
        <Reveal
          stagger={0.1}
          className="mx-auto mt-12 grid max-w-[1210px] ta-stack grid-cols-2 gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-4"
        >
          {travelPlans.map((plan, index) => {
            const copy = dict.travelPlans.items[plan.id];
            const tone = toneStyles[plan.tone];

            return (
              <article
                key={plan.id}
                className={`flex h-full flex-col rounded-2xl p-4 sm:p-5 ${tone.card}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white ${tone.badge}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <PlanArt art={plan.art} className={`h-12 w-16 sm:h-20 sm:w-32 ${tone.art}`} />
                </div>

                <h3 className="mt-5 text-h4 font-semibold tracking-[-0.01em] text-heading">
                  {copy.title}
                </h3>

                <p className="mt-2 text-[13px] leading-[1.55] text-muted sm:text-[14px]">
                  {copy.description}
                </p>

                {/* mt-auto drops the price block and button to the card base. */}
                <p className="mt-auto pt-6 text-[13px] leading-none text-muted sm:text-[14px]">
                  {dict.travelPlans.startsFrom}
                </p>
                <p
                  className={`mt-2 text-[28px] font-bold leading-none tracking-[-0.02em] sm:text-[30px] ${tone.price}`}
                >
                  <Money amount={plan.fromPrice} />
                </p>

                <Link
                  href={`/${locale}/pricing`}
                  className={`mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-center text-[13px] font-medium text-heading transition-colors sm:text-[14px] ${tone.button}`}
                >
                  {dict.travelPlans.cta}
                  <ArrowRight className="size-4 shrink-0" />
                </Link>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
