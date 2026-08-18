import Image from "next/image";
import type { ReactNode } from "react";
import { Banknote, CheckCircle, Clock, Headset, Shield, TrendUp } from "@/components/icons";
import { DriveSignupForm } from "@/components/ui/DriveSignupForm";
import { Reveal } from "@/components/ui/Reveal";
import { pageImages, siteConfig } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";

const perkIcon: Record<string, ReactNode> = {
  earn: <TrendUp className="size-4" />,
  schedule: <Clock className="size-4" />,
  verified: <CheckCircle className="size-4" />,
  payouts: <Banknote className="size-4" />,
};

export async function DriveSignup() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const image = pageImages.driverBenefits;
  const panel = dict.driveSignup.panel;

  return (
    <section id="apply" className="scroll-mt-24 bg-cream py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* The two panels are one card: no gap between them, and the rounding
            plus clipping live on the wrapper so their inner corners stay
            square where they meet. */}
        <Reveal className="mx-auto grid max-w-[1110px] overflow-hidden rounded-2xl shadow-card lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          {/* ---- Pitch panel ---- */}
          <div className="flex flex-col bg-[#f7f2e8] p-6 sm:p-8">
            <h2 className="text-h3 font-bold leading-[1.2] tracking-[-0.02em]">
              <span className="block text-heading">{panel.titleTop}</span>
              <span className="block text-brand">{panel.titleBottom}</span>
            </h2>

            <p className="mt-4 text-[13px] leading-[1.6] text-muted sm:text-[14px]">
              {panel.bodyOne}
              <br />
              {panel.bodyTwo}
            </p>

            <ul className="mt-6 grid grid-cols-4 gap-3">
              {(
                ["earn", "schedule", "verified", "payouts"] as const
              ).map((key) => (
                <li key={key} className="flex flex-col items-center text-center">
                  <span className="grid size-8 place-items-center rounded-full bg-brand/10 text-brand">
                    {perkIcon[key]}
                  </span>
                  <span className="mt-2 text-[11px] font-medium leading-[1.3] text-heading">
                    {panel.perks[key]}
                  </span>
                </li>
              ))}
            </ul>

            <Image
              src={image.src!}
              alt={dict.driverBenefits.imageAlt}
              width={image.width!}
              height={image.height!}
              sizes="(min-width: 1024px) 460px, 90vw"
              className="mt-6 h-auto w-full"
            />

            {/* Reassurance strip closing the panel. */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-brand px-4 py-3.5 text-white">
              <p className="flex items-center gap-2.5 text-[11px] font-medium leading-[1.35]">
                <Shield className="size-5 shrink-0 text-accent" />
                {panel.safety}
              </p>
              <p className="flex items-center gap-2.5 text-[11px] font-medium leading-[1.35]">
                <Headset className="size-5 shrink-0 text-accent" />
                {panel.support}
              </p>
            </div>

            <p className="mt-auto pt-6 text-[15px] font-bold leading-[1.35] text-heading sm:text-[16px]">
              {panel.ownBossTop}
              <br />
              {panel.ownBossBottom}
            </p>
          </div>

          {/* ---- Application form ---- */}
          <div className="bg-white p-6 sm:p-8">
            <DriveSignupForm
              dict={dict.driveSignup.form}
              downloads={dict.downloads}
              phone={siteConfig.phone}
              privacyHref={`/${locale}/privacy`}
              termsHref={`/${locale}/terms`}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
