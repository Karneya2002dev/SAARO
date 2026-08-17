import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Renders artwork once it exists, and a neutral frame until then.
 *
 * Several About sections are designed around images that have not been
 * supplied yet. Pointing `next/image` at a missing file would 404 at runtime,
 * so those slots pass `src={null}` and get a placeholder of the right shape.
 * Supplying the path and intrinsic size is all that is needed to swap it in.
 */
export function ImageSlot({
  src,
  alt,
  width,
  height,
  ratio,
  sizes,
  className,
}: {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  /** Aspect ratio the placeholder holds, e.g. "aspect-4/3". */
  ratio: string;
  sizes?: string;
  className?: string;
}) {
  if (!src || !width || !height) {
    return (
      <div
        aria-hidden
        className={cn("w-full rounded-2xl border border-line bg-surface", ratio, className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={cn("h-auto w-full rounded-2xl", className)}
    />
  );
}
