import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";
import { FareFormula } from "@/components/sections/FareFormula";
import { FareTables } from "@/components/sections/FareTables";
import { PricingHero } from "@/components/sections/PricingHero";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pricingPage.metaTitle,
    description: dict.pricingPage.metaDescription,
  };
}

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <FareTables />
      <FareFormula />
      <Faq variant="pricing" />
    </>
  );
}
