import type { Metadata } from "next";
import { DriveBenefits } from "@/components/sections/DriveBenefits";
import { DriveHero } from "@/components/sections/DriveHero";
import { DriveSignup } from "@/components/sections/DriveSignup";
import { DriveSteps } from "@/components/sections/DriveSteps";
import { DriverBenefits } from "@/components/sections/DriverBenefits";
import { DriverRequirements } from "@/components/sections/DriverRequirements";
import { GoldenDriver } from "@/components/sections/GoldenDriver";
import { Testimonials } from "@/components/sections/Testimonials";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.drivePage.metaTitle,
    description: dict.drivePage.metaDescription,
  };
}

export default function DrivePage() {
  return (
    <>
      <DriveHero />
      <DriveBenefits />
      <DriveSteps />
      <DriverBenefits />
      <DriverRequirements />
      <GoldenDriver />
      <Testimonials variant="drivers" />
      <DriveSignup />
    </>
  );
}
