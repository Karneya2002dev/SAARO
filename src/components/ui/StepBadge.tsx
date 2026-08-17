import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Green road-sign tag carrying the step number.
 *
 * The slab and the number are stacked with grid rather than
 * `relative`/`absolute`, so the caller stays free to position the badge
 * itself without the two `position` utilities fighting each other.
 */
export function StepBadge({
  number,
  className,
  ...rest
}: { number: number } & ComponentPropsWithoutRef<"span">) {
  return (
    <span {...rest} className={cn("grid text-white", className)}>
      <span aria-hidden className="col-start-1 row-start-1 -skew-x-12 bg-brand" />
      {/* `relative` is load-bearing: the skewed slab above is transformed, so
          it paints with positioned content and would otherwise cover this. */}
      <span className="relative col-start-1 row-start-1 grid place-items-center font-semibold leading-none">
        {number}
      </span>
    </span>
  );
}
