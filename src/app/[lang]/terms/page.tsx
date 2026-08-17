import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.terms.metaTitle,
    description: dict.terms.metaDescription,
  };
}

export default function TermsPage() {
  return <LegalDoc doc="terms" />;
}
