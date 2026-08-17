"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Play } from "@/components/icons";
import { Pagination } from "@/components/ui/Pagination";
import type { galleryVideos } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const PER_PAGE = 6;

export function VideoGrid({
  videos,
  dict,
  pagination,
}: {
  videos: typeof galleryVideos;
  dict: Dictionary["gallery"]["videos"];
  pagination: Dictionary["gallery"]["pagination"];
}) {
  const [page, setPage] = useState(1);

  const total = Math.max(1, Math.ceil(videos.length / PER_PAGE));
  const visible = videos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <ul className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((video) => {
          const copy = dict.items[video.id as keyof typeof dict.items];
          const { src, width, height } = video.thumbnail;

          return (
            <li
              key={video.id}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-card"
            >
              <div className="relative aspect-16/9 bg-surface">
                {src && width && height ? (
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div aria-hidden className="size-full border-b border-line" />
                )}

                {/* Until a clip has somewhere to play, the control is a static
                    marker rather than a link that goes nowhere. */}
                {video.href ? (
                  <Link
                    href={video.href}
                    aria-label={`${dict.play}: ${copy.title}`}
                    className="absolute inset-0 grid place-items-center"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-accent text-heading transition-transform hover:scale-105">
                      <Play className="ml-0.5 size-4" />
                    </span>
                  </Link>
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-accent text-heading">
                      <Play className="ml-0.5 size-4" />
                    </span>
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-heading">
                  {copy.title}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.55] text-muted">
                  &ldquo;{copy.quote}&rdquo;
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <Pagination
        total={total}
        current={page}
        onChange={setPage}
        dict={pagination}
      />
    </>
  );
}
