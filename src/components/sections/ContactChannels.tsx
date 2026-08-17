import Link from "next/link";
import type { ReactNode } from "react";
import { Mail, MapPin, Phone, WhatsApp } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import {
  contactChannels,
  siteConfig,
  type ContactChannelIcon,
  type TravelPlanTone,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

const iconFor: Record<ContactChannelIcon, ReactNode> = {
  phone: <Phone className="size-6" />,
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

  /** Phone, email and WhatsApp each resolve to a value and a link; the
   *  address has neither and renders its dictionary lines instead. */
  const linked: Record<
    "phone" | "email" | "whatsapp",
    { value: string; href: string }
  > = {
    phone: { value: siteConfig.phone, href: `tel:+${digits}` },
    email: { value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    whatsapp: { value: siteConfig.phone, href: `https://wa.me/${digits}` },
  };

  return (
    <section className="bg-cream pb-10 pt-4 sm:pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* Top padding on the list, not the cards: the badges sit half outside
            the card's top edge and would otherwise be clipped. */}
        <Reveal
          as="ul"
          stagger={0.1}
          className="grid grid-cols-1 items-stretch gap-x-6 gap-y-16 pt-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactChannels.map(({ id, icon, tone }) => (
            <li
              key={id}
              className="relative flex flex-col rounded-2xl bg-white px-5 pb-10 pt-12 text-center shadow-card"
            >
              <span
                className={`absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full border-2 ${toneStyles[tone]}`}
              >
                {iconFor[icon]}
              </span>

              <h2 className="text-[17px] font-bold tracking-[-0.01em] text-heading sm:text-[18px]">
                {dict.contactChannels[id].title}
              </h2>

              {id === "address" ? (
                <address className="mt-4 text-[13px] not-italic leading-[1.7] text-muted sm:text-[14px]">
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
                    className="mt-4 break-words text-[13px] font-semibold text-heading transition-colors hover:text-brand sm:text-[14px]"
                  >
                    {linked[id].value}
                  </Link>

                  <p className="mt-2.5 text-[13px] leading-[1.5] text-muted sm:text-[14px]">
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
