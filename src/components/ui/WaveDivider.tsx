import Image from "next/image";
import WAVE_IMAGE from "@/public/assets/Wave.png";
import { cn } from "@/lib/cn";

/**
 * The wave that closes the hero, taken straight from the design asset
 * (1600x270, transparent above the curve, cream #FAF8F5 below).
 *
 * Rendered at its natural aspect ratio rather than stretched, so the curve
 * keeps its exact silhouette at every breakpoint. Whatever follows the hero
 * should sit on `bg-cream` so the seam is invisible.
 */
export function WaveDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-20 leading-none",
        className,
      )}
    >
      <Image
        src={WAVE_IMAGE}
        alt=""
        priority
        sizes="100vw"
        className="block h-auto w-full select-none"
      />
    </div>
  );
}
