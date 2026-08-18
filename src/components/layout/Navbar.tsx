"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Close, Menu } from "@/components/icons";
import { BookDriverDialog } from "@/components/ui/BookDriverDialog";
import { cn } from "@/lib/cn";
import { navLinks, siteConfig } from "@/lib/content";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
/*
 * The trimmed export. `logo.jpg` is the same lockup on a 600x600 square, but
 * the artwork only fills 60% of that height — so at any CSS height the logo
 * rendered 40% smaller than the box it was given, with the rest white padding.
 * Cropping to the artwork's own bounds is what makes it read at full size.
 */
import LOGO from "@/public/assets/logo-trimmed.jpg";

/**
 * Supplied logo. It is a square stacked lockup, so it can only be as wide as
 * the bar is tall — the height below is the most the 72/80px bar allows while
 * keeping clearance. `alt=""` because the link already carries the name.
 */
function Wordmark({ home }: { home: string }) {
  return (
    <Link href={home} className="flex shrink-0 items-center" aria-label="Saaro home">
      {/* Sized against the bar, which is 72px then 80px tall. The trimmed asset
          is all artwork, so these heights are what actually shows — at h-14 the
          logo filled 78% of the mobile bar and left it looking crowded, so the
          phone size steps down to a little over half. 457x385 means the width
          is ~1.19x whatever height is set. */}
      <Image
        src={LOGO}
        alt=""
        priority
        sizes="(min-width: 640px) 76px, 52px"
        className="h-11 w-auto sm:h-14 lg:h-16"
      />
    </Link>
  );
}

/**
 * Swaps the `[lang]` segment in place, so the visitor stays on the section
 * they were reading. The hash is preserved by the browser across a push.
 */
function LanguageToggle({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const hrefFor = (next: Locale) => {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  };

  return (
    <div
      className={cn(
        "inline-flex h-10 shrink-0 items-center rounded-full border border-line",
        className,
      )}
    >
      {locales.map((code, index) => (
        <div key={code} className="contents">
          {index > 0 ? <span aria-hidden className="h-4 w-px bg-line" /> : null}
          <button
            type="button"
            onClick={() => router.push(hrefFor(code))}
            aria-pressed={locale === code}
            lang={code}
            className={cn(
              "h-full px-3.5 text-[13px] transition-colors sm:px-4",
              index === 0 ? "rounded-l-full" : "rounded-r-full",
              locale === code
                ? "font-semibold text-heading"
                : "text-gray-500 hover:text-heading",
            )}
          >
            {localeLabels[code]}
          </button>
        </div>
      ))}
    </div>
  );
}

export function Navbar({
  dict,
  enquiry,
  locale,
}: {
  dict: Dictionary["nav"];
  /** Field labels the booking dialog shares with the enquiry form. */
  enquiry: Dictionary["enquiry"];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const pathname = usePathname();

  // The Tamil labels are roughly half as wide again as the English ones and
  // overflow the bar at lg, so that locale keeps the sheet one step longer.
  const wide = locale === "ta";
  const inlineNav = wide ? "xl:flex" : "lg:flex";
  const sheetOnly = wide ? "xl:hidden" : "lg:hidden";

  // Lock the page while the mobile sheet is open so only the sheet scrolls.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Growing past the lg breakpoint swaps the sheet out for the inline nav.
  // Without this the sheet stays "open" off-screen and the scroll lock above
  // keeps the page frozen on desktop.
  useEffect(() => {
    const desktop = window.matchMedia(
      locale === "ta" ? "(min-width: 80rem)" : "(min-width: 64rem)",
    );
    const close = () => desktop.matches && setOpen(false);
    close();
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, [locale]);

  const home = `/${locale}`;

  const bookProps = {
    label: dict.book,
    dict: dict.dialog,
    fields: enquiry,
    phone: siteConfig.phone,
    privacyHref: `${home}/privacy`,
  };

  // Real routes know whether they are current from the URL; anchor links have
  // no such signal, so those fall back to what was last clicked.
  const isCurrent = (link: (typeof navLinks)[number]) =>
    link.href.startsWith("/") || link.href === ""
      ? pathname === `${home}${link.href}`
      : active === link.id;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white">
      <div className="mx-auto flex h-[72px] w-full max-w-[1456px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-5 lg:px-6">
        <Wordmark home={home} />

        {/* Centred in the space left between the wordmark and the actions.
            Tight gaps at lg so all six links clear the actions; they open up
            again once there is room. */}
        <nav
          aria-label={dict.label}
          className={cn("hidden min-w-0 flex-1 justify-center", inlineNav)}
        >
          <ul className="flex items-center gap-5 xl:gap-8 2xl:gap-9">
            {navLinks.map((link) => {
              const isActive = isCurrent(link);
              return (
                <li key={link.id}>
                  <Link
                    href={`${home}${link.href}`}
                    onClick={() => setActive(link.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex whitespace-nowrap py-1 text-[14px] transition-colors xl:text-[15px]",
                      isActive
                        ? "font-medium text-brand"
                        : "text-body hover:text-heading",
                    )}
                  >
                    {dict.links[link.id]}
                    {isActive ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-1.5 h-[2px] rounded-full bg-brand"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <BookDriverDialog {...bookProps} className="hidden sm:inline-flex" />
          <LanguageToggle locale={locale} className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full border border-line text-heading",
              sheetOnly,
            )}
          >
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Capped to the space under the bar and scrollable, so the last links
          stay reachable on short or landscape screens. dvh rather than vh so
          mobile browser chrome does not cut the list off. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className={cn(
          "max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-line bg-white sm:max-h-[calc(100dvh-80px)]",
          sheetOnly,
        )}
      >
        <nav aria-label={dict.mobileLabel} className="mx-auto w-full max-w-[1456px] px-4 py-2 sm:px-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = isCurrent(link);
              return (
                <li key={link.id} className="border-b border-line last:border-0">
                  <Link
                    href={`${home}${link.href}`}
                    onClick={() => {
                      setActive(link.id);
                      setOpen(false);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center text-[16px]",
                      isActive ? "font-medium text-brand" : "text-body",
                    )}
                  >
                    {dict.links[link.id]}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-3 py-5 sm:hidden">
            <BookDriverDialog {...bookProps} className="min-h-12 w-full text-[15px]" />
            <LanguageToggle locale={locale} className="min-h-12 w-full justify-center" />
          </div>
        </nav>
      </div>
    </header>
  );
}
