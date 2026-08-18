import Link from "next/link";
import type { ReactNode } from "react";
import { Mail, MapPin, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import {
  contactChannels,
  siteConfig,
  type ContactChannelIcon,
  type TravelPlanTone,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<ContactChannelIcon, ReactNode> = {
  mail: <Mail className="size-6" />,
  whatsapp: <WhatsApp className="size-6" />,
  pin: <MapPin className="size-6" />,
};

/** Pale disc, coloured rim and icon — matching the stat badges elsewhere. */
const toneStyles: Record<TravelPlanTone, string> = {
  amber: "bg-[#fdf3e2] border-[#f5a623] text-[#f5a623]",
  blue: "bg-[#e7f1fc] border-[#2f80ed] text-[#2f80ed]",
  green: "bg-[#e8f5ea] border-[#1e9e4a] text-[#1e9e4a]",
  purple: "bg-[#f0ebfa] border-[#7c4ddb] text-[#7c4ddb]",
};

export async function ContactChannels() {
  const dict = await getDictionary();
  const digits = siteConfig.phone.replace(/\D/g, "");

  /** Email and WhatsApp each resolve to a value and a link; the address has
   *  neither and renders its dictionary lines instead. */
  const linked: Record<"email" | "whatsapp", { value: string; href: string }> = {
    email: { value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    whatsapp: { value: siteConfig.phone, href: `https://wa.me/${digits}` },
  };

  return (
    <section className="bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* Three cards, so two-up would strand the last one on its own row at
            half width — it goes straight from one column to three.
            Top padding on the list, not the cards: the badges sit half outside
            the card's top edge and would otherwise be clipped. */}
        <Reveal
          as="ul"
          stagger={0.1}
          className="mx-auto grid max-w-[420px] grid-cols-1 items-stretch gap-x-5 gap-y-12 pt-7 sm:max-w-none sm:grid-cols-3 sm:gap-y-16 lg:gap-x-6"
        >
          {contactChannels.map(({ id, icon, tone }) => (
            <li
              key={id}
              className="relative flex flex-col rounded-2xl bg-white px-4 pb-8 pt-11 text-center shadow-card sm:px-5 sm:pb-10 sm:pt-12"
            >
              <span
                className={`absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full border-2 ${toneStyles[tone]}`}
              >
                {iconFor[icon]}
              </span>

              <h2 className="text-h4 font-bold tracking-[-0.01em] text-heading">
                {dict.contactChannels[id].title}
              </h2>

              {id === "address" ? (
                <address className="mt-4 text-[13px] not-italic leading-[1.7] text-muted sm:text-[12.5px] lg:text-[14px]">
                  {dict.contactChannels.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              ) : (
                <>
                  <Link
                    href={linked[id].href}
                    {...(id === "whatsapp"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    /* The email runs to 31 characters and the card is ~145px
                       wide at the three-up breakpoint, so it steps down a size
                       there and breaks rather than pushing the card open. */
                    className="mt-4 break-words text-[13px] font-semibold text-heading transition-colors hover:text-brand sm:text-[12px] lg:text-[14px]"
                  >
                    {linked[id].value}
                  </Link>

                  <p className="mt-2.5 text-[13px] leading-[1.5] text-muted sm:text-[12.5px] lg:text-[14px]">
                    {dict.contactChannels[id].hint}
                  </p>
                </>
              )}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
