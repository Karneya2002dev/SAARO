import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { PricingBanner } from "@/components/sections/PricingBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { GetTheApp } from "@/components/sections/GetTheApp";
import { InNumbers } from "@/components/sections/InNumbers";
import { EarnWithSaaro } from "@/components/sections/EarnWithSaaro";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <WhyChoose />
      <PricingBanner />
      <Testimonials />
      <GetTheApp />
      <InNumbers />
      <EarnWithSaaro />
    </>
  );
}
