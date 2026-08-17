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

const socialIcon: Record<SocialIcon, ReactNode> = {
  facebook: <Facebook className="size-4" />,
  instagram: <Instagram className="size-4" />,
  youtube: <YouTube className="size-4" />,
  whatsapp: <WhatsApp className="size-4" />,
};

/** The navbar wordmark recoloured for a dark ground. */
function Wordmark({ home }: { home: string }) {
  return (
    <Link href={home} className="flex w-fit items-center gap-2" aria-label="Saaro home">
      <span className="text-[28px] font-extrabold leading-none tracking-[-0.03em] text-white">
        SAAR
      </span>
      <span
        aria-hidden
        className="grid size-[24px] place-items-center rounded-full border-[3px] border-accent"
      >
        <span className="size-[10px] rounded-full bg-accent" />
      </span>
    </Link>
  );
}

export async function Footer() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const home = `/${locale}`;

  return (
    <footer id="contact" className="scroll-mt-24 bg-[#141414]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* The download column is fixed; the four text columns share what is
            left, weighted so each list sits under its own heading. */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.72fr)_minmax(0,1fr)_minmax(0,1.1fr)_256px]">
          <div>
            <Wordmark home={home} />

            <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.12em] text-white">
              {dict.footer.lockup}
            </p>

            <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.6] text-white/70">
              {dict.footer.tagline}
            </p>

            <ul className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    {socialIcon[social.icon]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={dict.footer.quickLinks}>
            <h2 className="text-[16px] font-bold text-white">
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
            <h2 className="text-[16px] font-bold text-white">{dict.footer.legal}</h2>
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

          <div>
            <h2 className="text-[16px] font-bold text-white">{dict.footer.contact}</h2>

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

          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
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
