import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import {
  privacySections,
  refundsSections,
  shippingSections,
  siteConfig,
  termsSections,
} from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";

export type LegalDocId = "terms" | "shipping" | "refunds" | "privacy";

/**
 * The shape every legal document shares. Each dictionary block is assignable
 * to it, which is what lets one layout serve all of them — `lastUpdated`, the
 * closing `note`, and a section's `pending` chip or `callout` are optional and
 * simply drop out when absent.
 */
type LegalDocContent = {
  breadcrumb: string;
  breadcrumbHome: string;
  eyebrow: string;
  title: string;
  contents: string;
  note?: string;
  lastUpdated?: string;
  sections: Record<
    string,
    { title: string; body: string[]; pending?: string; callout?: string }
  >;
};

const sectionsFor: Record<
  LegalDocId,
  { id: string; layout: "prose" | "list"; chip?: "heading" }[]
> = {
  terms: termsSections,
  shipping: shippingSections,
  refunds: refundsSections,
  privacy: privacySections,
};

/**
 * Splits a clause on the {email} and {phone} tokens and renders each as a
 * live link, so the address and number stay in `siteConfig` rather than being
 * spelled out in the legal copy of every locale.
 */
function withContacts(text: string, email: string, phone: string): ReactNode[] {
  return text.split(/(\{email\}|\{phone\})/).map((part, index) => {
    if (part === "{email}") {
      return (
        <Link key={index} href={`mailto:${email}`} className="text-brand underline">
          {email}
        </Link>
      );
    }
    if (part === "{phone}") {
      return (
        <Link
          key={index}
          href={`tel:+${phone.replace(/\D/g, "")}`}
          className="text-brand underline"
        >
          {phone}
        </Link>
      );
    }
    return part;
  });
}

/** Amber marker for a clause still waiting on a confirmed detail. */
function Chip({ children }: { children: string }) {
  return (
    <span className="inline-block rounded bg-accent/18 px-2.5 py-1 text-[11px] font-semibold leading-[1.4] text-[#8a6212]">
      {children}
    </span>
  );
}

export async function LegalDoc({ doc }: { doc: LegalDocId }) {
  const dict = await getDictionary();
  const locale = await getLocale();
  const content: LegalDocContent = dict[doc];
  const sections = sectionsFor[doc];

  return (
    <>
      <header className="border-b border-line bg-cream py-10 sm:py-12 lg:py-16 text-center">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
          <nav
            aria-label={content.breadcrumb}
            className="text-[13px] leading-[1.5] text-muted"
          >
            <Link href={`/${locale}`} className="transition-colors hover:text-heading">
              {content.breadcrumbHome}
            </Link>
            <span className="px-2" aria-hidden>
              /
            </span>
            <span className="text-heading">{content.title}</span>
          </nav>

          <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.14em] text-brand">
            {content.eyebrow}
          </p>

          <h1 className="mt-1 text-hero font-bold leading-[1.15] tracking-[-0.025em] text-heading">
            {content.title}
          </h1>
        </div>
      </header>

      <section className="bg-white py-10 sm:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-16">
            {/* Follows the reader down the page on desktop; above the text on
                mobile, where sticky would eat the viewport. */}
            <nav
              aria-label={content.contents}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted lg:sr-only">
                {content.contents}
              </h2>

              <ol className="mt-4 flex flex-col gap-3.5 lg:mt-0">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      // Prefixed: a `contact` section id would otherwise
                      // collide with the footer's own anchor.
                      href={`#${doc}-${section.id}`}
                      className="text-[14px] leading-[1.4] text-muted transition-colors hover:text-brand"
                    >
                      {index + 1}. {content.sections[section.id].title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <Reveal as="div" stagger={0.04} className="min-w-0">
              {content.lastUpdated ? (
                <p className="mb-8 text-[13px] text-muted">{content.lastUpdated}</p>
              ) : null}

              {sections.map((section, index) => {
                const copy = content.sections[section.id];

                return (
                  <section
                    key={section.id}
                    id={`${doc}-${section.id}`}
                    className="scroll-mt-24 pb-8 last:pb-0"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h2 className="text-h4 font-bold tracking-[-0.01em] text-heading">
                        {index + 1}. {copy.title}
                      </h2>

                      {copy.pending && section.chip === "heading" ? (
                        <Chip>{copy.pending}</Chip>
                      ) : null}
                    </div>

                    {section.layout === "list" ? (
                      <ul className="mt-3 flex flex-col gap-2.5 pl-4">
                        {copy.body.map((clause) => (
                          <li
                            key={clause}
                            className="text-[14px] leading-[1.65] text-body sm:text-[15px]"
                          >
                            {withContacts(clause, siteConfig.email, siteConfig.phone)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-3 flex flex-col gap-2">
                        {copy.body.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-[14px] leading-[1.65] text-body sm:text-[15px]"
                          >
                            {withContacts(
                              paragraph,
                              siteConfig.email,
                              siteConfig.phone,
                            )}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* A clause the owner still has to settle, called out in
                        full rather than reduced to a chip. */}
                    {copy.callout ? (
                      <p className="mt-5 border-l-[3px] border-accent bg-accent/10 px-5 py-4 text-[14px] font-medium leading-[1.65] text-heading">
                        {withContacts(
                          copy.callout,
                          siteConfig.email,
                          siteConfig.phone,
                        )}
                      </p>
                    ) : null}

                    {copy.pending && section.chip !== "heading" ? (
                      <p className="mt-3">
                        <Chip>{copy.pending}</Chip>
                      </p>
                    ) : null}
                  </section>
                );
              })}

              {content.note ? (
                <p className="mt-6 border-l-[3px] border-accent bg-accent/10 px-5 py-4 text-[13px] leading-[1.6] text-[#8a6212]">
                  {content.note}
                </p>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
