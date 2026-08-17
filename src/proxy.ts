import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Every route lives under `/[lang]`, so a request without a locale prefix is
 * redirected to the visitor's best match. Tamil is only chosen when the browser
 * actually asks for it; everything else falls through to English.
 */
function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.toLowerCase(),
        q: q ? Number.parseFloat(q.split("=")[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  const match = ranked.find((entry) =>
    locales.some((locale) => entry.tag === locale || entry.tag.startsWith(`${locale}-`)),
  );

  return locales.find((locale) => match?.tag.startsWith(locale)) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip internals and anything with a file extension (assets in /public).
  matcher: ["/((?!_next|.*\\.).*)"],
};
