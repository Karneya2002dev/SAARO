import type { Metadata, Viewport } from "next";
import { Poppins, Noto_Sans_Tamil } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* Poppins has no Tamil glyphs, so Tamil copy would fall back to whatever the
   OS provides and break the type system visually. This sits after Poppins in
   the stack, so Latin text is unaffected in both locales. */
const notoTamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary();

  return (
    // globals.css sets scroll-behavior: smooth; this tells the router the
    // choice is deliberate, so it stops warning and suppresses the smooth
    // scroll during route transitions.
    <html lang={lang} data-scroll-behavior="smooth">
      <body className={`${poppins.variable} ${notoTamil.variable} antialiased`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          {dict.nav.skipToContent}
        </a>

        {/* The chrome lives here rather than in the page, so every route under
            /[lang] gets the same header and footer. */}
        <Navbar dict={dict.nav} enquiry={dict.enquiry} locale={lang} />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
