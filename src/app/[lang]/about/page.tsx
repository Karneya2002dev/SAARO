import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { AboutStats } from "@/components/sections/AboutStats";
import { OurCommitment } from "@/components/sections/OurCommitment";
import { OurStory } from "@/components/sections/OurStory";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.aboutPage.metaTitle,
    description: dict.aboutPage.metaDescription,
  };
}

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <AboutStats />
      <OurStory />
      <WhyChoose />
      <OurCommitment />
    </>
  );
}
