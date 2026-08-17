import Image from "next/image";
import { MARKING_DASH, MARKINGS, ROAD } from "@/lib/road";
import { cn } from "@/lib/cn";

/**
 * The serpentine road behind the "How It Works" steps: the supplied artwork
 * plus the centre-line markings drawn over it.
 *
 * The artwork is the road's bounding box only (transparent elsewhere) and
 * fills this container. The markings SVG shares the artwork's coordinate
 * space, so both — and the step content positioned in percentages of the
 * same box — stay in register at every width.
 */
export function RoadPath({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/assets/road.png"
        alt=""
        aria-hidden
        width={ROAD.width}
        height={ROAD.height}
        sizes="(min-width: 1024px) 1092px, 100vw"
        className="h-full w-full select-none object-fill"
      />

      <svg
        aria-hidden
        viewBox={`0 0 ${ROAD.width} ${ROAD.height}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {MARKINGS.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#ffffff"
            strokeWidth={MARKING_DASH.width}
            strokeDasharray={`${MARKING_DASH.dash} ${MARKING_DASH.gap}`}
          />
        ))}
      </svg>
    </div>
  );
}
