import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.shipping.metaTitle,
    description: dict.shipping.metaDescription,
  };
}

export default function ShippingPage() {
  return <LegalDoc doc="shipping" />;
}
