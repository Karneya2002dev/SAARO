import type { Metadata } from "next";
import { BookCta } from "@/components/sections/BookCta";
import { Faq } from "@/components/sections/Faq";
import { HowItWorksRow } from "@/components/sections/HowItWorksRow";
import { Services } from "@/components/sections/Services";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { TravelPlans } from "@/components/sections/TravelPlans";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.servicesPage.metaTitle,
    description: dict.servicesPage.metaDescription,
  };
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Services />
      <HowItWorksRow />
      <TravelPlans />
      <WhyChoose />
      <Faq />
      <BookCta />
    </>
  );
}
