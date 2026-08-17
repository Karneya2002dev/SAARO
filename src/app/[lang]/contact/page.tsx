import type { Metadata } from "next";
import { BookCta } from "@/components/sections/BookCta";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { ContactEnquiry } from "@/components/sections/ContactEnquiry";
import { ContactHero } from "@/components/sections/ContactHero";
import { PricingBanner } from "@/components/sections/PricingBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.contactPage.metaTitle,
    description: dict.contactPage.metaDescription,
  };
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactChannels />
      <ContactEnquiry />
      <PricingBanner />
      <Testimonials />
      <BookCta />
    </>
  );
}
