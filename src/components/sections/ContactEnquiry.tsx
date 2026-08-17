import Image from "next/image";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { pageImages, siteConfig } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function ContactEnquiry() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const map = pageImages.contactMap;

  return (
    <section id="enquiry" className="scroll-mt-24 bg-cream pb-10 sm:pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        {/* Map and form share one card, so the map stretches to whatever
            height the form ends up at rather than leaving a ragged edge. */}
        <Reveal className="grid items-stretch gap-6 rounded-2xl bg-white p-5 shadow-card sm:p-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-8 lg:p-8">
          <Image
            src={map.src!}
            alt={dict.enquiry.mapAlt}
            width={map.width!}
            height={map.height!}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="h-full max-h-[560px] w-full rounded-xl object-cover lg:max-h-none"
          />

          <EnquiryForm
            dict={dict.enquiry}
            phone={siteConfig.phone}
            privacyHref={`/${locale}/privacy`}
          />
        </Reveal>
      </div>
    </section>
  );
}
