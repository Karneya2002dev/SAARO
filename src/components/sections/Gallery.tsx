import Link from "next/link";
import { PhotoMosaic } from "@/components/ui/PhotoMosaic";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoGrid } from "@/components/ui/VideoGrid";
import { galleryPhotos, galleryVideos } from "@/lib/content";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function Gallery() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const doc = dict.gallery;

  return (
    <>
      <header className="bg-cream py-10 text-center sm:py-12">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
          <nav
            aria-label={doc.breadcrumb}
            className="text-[13px] leading-[1.5] text-muted"
          >
            <Link href={`/${locale}`} className="transition-colors hover:text-heading">
              {doc.breadcrumbHome}
            </Link>
            <span className="px-2" aria-hidden>
              /
            </span>
            <span className="text-heading">{doc.title}</span>
          </nav>

          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
            {doc.eyebrow}
          </p>

          <h1 className="mt-1 text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-heading sm:text-[38px] lg:text-[42px]">
            {doc.title}
          </h1>
        </div>
      </header>

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
          <Reveal>
            <SectionHeading
              eyebrow={doc.photos.eyebrow}
              title={doc.photos.title}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-12 sm:mt-14">
            <PhotoMosaic
              photos={galleryPhotos}
              alt={doc.photos.alt}
              dict={doc.pagination}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
          <Reveal>
            <SectionHeading
              eyebrow={doc.videos.eyebrow}
              title={doc.videos.title}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-12 sm:mt-14">
            <VideoGrid
              videos={galleryVideos}
              dict={doc.videos}
              pagination={doc.pagination}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
