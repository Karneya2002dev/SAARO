"use client";

import Image from "next/image";
import { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";
import type { galleryPhotos } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const PER_PAGE = 4;

/**
 * Where each tile sits within one page of the mosaic: a tall one on the left,
 * two small ones stacked to its right, and a wide one closing the row. Class
 * strings are written out because Tailwind cannot resolve computed names.
 */
const PLACEMENT = [
  "sm:col-start-1 sm:row-start-1 sm:row-span-2",
  "sm:col-start-2 sm:row-start-1",
  "sm:col-start-3 sm:row-start-1",
  "sm:col-start-2 sm:col-span-2 sm:row-start-2",
];

export function PhotoMosaic({
  photos,
  alt,
  dict,
}: {
  photos: typeof galleryPhotos;
  alt: Dictionary["gallery"]["photos"]["alt"];
  dict: Dictionary["gallery"]["pagination"];
}) {
  const [page, setPage] = useState(1);

  const total = Math.max(1, Math.ceil(photos.length / PER_PAGE));
  const visible = photos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-4 sm:h-[clamp(320px,42vw,470px)] sm:grid-cols-[1.05fr_0.5fr_0.5fr] sm:grid-rows-2">
        {visible.map((photo, index) => {
          const label = alt[photo.id as keyof typeof alt] ?? "";
          const { src, width, height } = photo.image;

          return (
            <div
              key={photo.id}
              className={`relative aspect-4/3 overflow-hidden rounded-xl bg-surface sm:aspect-auto sm:h-full ${PLACEMENT[index]}`}
            >
              {src && width && height ? (
                <Image
                  src={src}
                  alt={label}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                // Neutral frame until the photograph is supplied.
                <div aria-hidden className="size-full border border-line" />
              )}
            </div>
          );
        })}
      </div>

      <Pagination total={total} current={page} onChange={setPage} dict={dict} />
    </>
  );
}
