import Link from "next/link";
import { Plus } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary, getLocale } from "@/lib/i18n";

/**
 * Both FAQ blocks share this shape, which is what lets one component serve
 * the general list on the services page and the pricing list on the pricing
 * page. Items are read in declaration order.
 */
type FaqBlock = {
  eyebrow: string;
  title: string;
  stillHave: string;
  contact: string;
  items: Record<string, { question: string; answer: string }>;
};

export async function Faq({
  variant = "general",
}: {
  variant?: "general" | "pricing";
}) {
  const dict = await getDictionary();
  const locale = await getLocale();
  const block: FaqBlock = variant === "pricing" ? dict.pricingFaq : dict.faq;

  return (
    <section id="faq" className="scroll-mt-24 bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading eyebrow={block.eyebrow} title={block.title} />
        </Reveal>

        {/* Native <details> rather than a JS accordion: it opens without
            hydration, is keyboard operable for free, and its content is in the
            page for search engines even while collapsed. */}
        <Reveal
          stagger={0.08}
          className="mx-auto mt-12 flex max-w-[1050px] flex-col gap-4 sm:mt-14"
        >
          {Object.entries(block.items).map(([id, copy]) => (
            <details
              key={id}
              // A transparent border that only takes colour when open, so the
              // accent appears without the row shifting sideways.
              className="group overflow-hidden rounded-xl border-l-4 border-transparent bg-white shadow-card open:border-accent"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-h5 font-medium leading-snug text-heading">
                  {copy.question}
                </h3>

                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-heading/60 text-heading transition-colors group-open:border-accent group-open:text-accent">
                  <Plus className="size-3.5" />
                </span>
              </summary>

              <div className="border-t border-line bg-surface px-6 py-5">
                <p className="text-[13px] leading-[1.65] text-muted sm:text-[14px]">
                  {copy.answer}
                </p>
              </div>
            </details>
          ))}
        </Reveal>

        <Reveal className="mt-16 text-center sm:mt-20">
          <p className="text-[20px] font-bold tracking-[-0.01em] text-heading sm:text-[23px]">
            {block.stillHave}
          </p>

          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-accent bg-white px-7 py-2.5 text-center text-[14px] font-medium text-heading shadow-card transition-colors hover:bg-accent/10 sm:text-[15px]"
          >
            {block.contact}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
