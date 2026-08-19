import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  WhatsApp,
  YouTube,
} from "@/components/icons";
import { DownloadCard } from "@/components/ui/DownloadCard";
import {
  appDownloads,
  footerQuickLinks,
  legalLinks,
  siteConfig,
  socialLinks,
  type SocialIcon,
} from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";
/* Same trimmed export the navbar uses, so both marks are the one asset. */
import LOGO from "@/public/assets/logo-trimmed.jpg";

const socialIcon: Record<SocialIcon, ReactNode> = {
  facebook: <Facebook className="size-4" />,
  instagram: <Instagram className="size-4" />,
  youtube: <YouTube className="size-4" />,
  whatsapp: <WhatsApp className="size-4" />,
};

/**
 * The real logo, which replaces the drawn "SAAR" + ring this used to
 * approximate.
 *
 * It has to sit on a light chip: the lockup's own background is white and its
 * wordmark is near-black, so keying the white out would leave the letters
 * invisible against this footer's #141414. The chip is white rather than the
 * site's cream so it blends into the artwork's own ground and reads as one
 * rounded mark rather than a sticker on a panel.
 */
function Wordmark({ home }: { home: string }) {
  return (
    <Link href={home} className="flex w-fit items-center" aria-label="Saaro home">
      <span className="inline-flex rounded-xl bg-white p-2">
        <Image
          src={LOGO}
          alt=""
          sizes="80px"
          className="h-12 w-auto select-none sm:h-14"
        />
      </span>
    </Link>
  );
}

export async function Footer() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const home = `/${locale}`;

  return (
    <footer id="contact" className="scroll-mt-24 bg-[#141414]">
      {/* Gutters match every page container and the copyright bar below, so the
          footer's columns line up with the content above it. The vertical
          padding stays heavier than a section band on purpose — this closes the
          page rather than sitting between two others. */}
      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-5 sm:py-20 lg:px-6 lg:py-24">
        {/* Four steps. Phones put the two short link lists side by side rather
            than stacking everything, which halves the footer's height. The
            five-column layout waits for xl: at 1024px it left the Quick Links
            column ~107px and the address ~164px, so Tamil labels and the
            "Cancellation & Refund Policy" link wrapped badly. lg gets four even
            columns instead, with the downloads on their own row. */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:grid-cols-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.72fr)_minmax(0,1fr)_minmax(0,1.1fr)_256px]">
          <div className="col-span-2 sm:col-span-1">
            <Wordmark home={home} />

            <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.12em] text-white">
              {dict.footer.lockup}
            </p>

            <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.6] text-white/70">
              {dict.footer.tagline}
            </p>

            {/* Every destination is off-site, so these are plain anchors
                opening in a new tab — routing them through `next/link` would
                buy nothing, and taking someone off the site mid-booking to
                reach a social page is worse than leaving it behind them.

                A channel with a `null` href is one the business does not run;
                it drops rather than rendering an icon that goes nowhere. */}
            <ul className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) =>
                social.href ? (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      {socialIcon[social.icon]}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </div>

          <nav aria-label={dict.footer.quickLinks}>
            <h2 className="text-h5 font-bold text-white">
              {dict.footer.quickLinks}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {footerQuickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`${home}${link.href}`}
                    className="text-[14px] leading-[1.4] text-white/70 transition-colors hover:text-white"
                  >
                    {dict.nav.links[link.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.legal}>
            <h2 className="text-h5 font-bold text-white">{dict.footer.legal}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`${home}${link.href}`}
                    className="text-[14px] leading-[1.4] text-white/70 transition-colors hover:text-white"
                  >
                    {dict.footer.legalLinks[link.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-h5 font-bold text-white">{dict.footer.contact}</h2>

            <address className="mt-5 text-[14px] leading-[1.6] text-white/70 not-italic">
              {dict.footer.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <ul className="mt-6 flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-[14px] leading-[1.4] text-white/70 transition-colors hover:text-white"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-[14px] leading-[1.4] text-white/70 transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Stacked while the column is narrow, side by side once the pair has
              a full row to itself, and stacked again in the xl sidebar. The
              child rules let two cards share that row evenly. */}
          <div className="col-span-2 flex flex-col gap-6 sm:flex-row lg:col-span-4 lg:mx-auto lg:w-full lg:max-w-[680px] xl:col-span-1 xl:mx-0 xl:max-w-none xl:flex-col [&>*]:min-w-0 sm:[&>*]:flex-1">
            {appDownloads.map((app) => (
              <DownloadCard key={app.id} app={app.id} dict={dict.downloads} />
            ))}
          </div>
        </div>
      </div>

      {/* Slightly lifted off the footer ground rather than ruled off it. */}
      <div className="bg-[#1c1c1c]">
        <p className="mx-auto w-full max-w-[1200px] px-4 py-4 text-center text-[13px] text-white/60 sm:px-5 lg:px-6">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
