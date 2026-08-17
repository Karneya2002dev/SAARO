import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.privacy.metaTitle,
    description: dict.privacy.metaDescription,
  };
}

export default function PrivacyPage() {
  return <LegalDoc doc="privacy" />;
}
