"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { CENTRELINE_PATH, ROAD } from "@/lib/road";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The car, drawn with its nose along +X and its centre at the origin, so a
 * single `translate(...) rotate(...) scale(...)` puts it on the road facing the
 * right way.
 *
 * Drawn at a comfortable size and scaled down onto the road rather than
 * authored at final size, so the numbers below stay readable.
 */
const CAR = {
  length: 42,
  width: 21,
  /** Distance between the axles, used to derive a steering angle. */
  wheelbase: 22,
  /** Front axle centre — the pivot the steered wheels turn about. */
  frontAxleX: 11,
  /**
   * Size on the road, as a fraction of the drawing above.
   *
   * How big the car can be is decided at the bends. The driving line turns on a
   * 33-unit radius inside 30 units of tarmac, and a rigid body off-tracks
   * through a corner that tight — its outer rear corner sweeps wider than the
   * line it follows. Whatever sticks out furthest sets the limit, so the wheels
   * are drawn inside the body rather than proud of it: that leaves the rounded
   * body outline as the only thing that can reach a kerb, and buys about a
   * third more car for the same clearance.
   *
   * Past that the limit is the body's own width, not its length: on a bend the
   * outer flank swings wider than the line it follows, and shortening the car
   * barely helps below about 40 units. So growing the car trades directly
   * against how far it leans over a kerb at the four apexes:
   *
   *     0.95  40x20u  66% of the tarmac's width   2.4u over  (8%)
   *     1.05  44x22u  74%                         4.2u over  (14%)
   *     1.10  46x23u  77%                         5.2u over  (17%)
   *     1.15  48x24u  81%                         6.3u over  (21%)
   *
   * 1.1 is the size asked for; the lean is a few pixels at four points of the
   * drive and nowhere else. Measured by tracing the body outline along the
   * driving line against the artwork's own alpha channel.
   */
  roadScale: 1.1,
} as const;

/** Padded past the ground shadow, which is the outermost thing drawn. */
const CAR_VIEWBOX = "-25 -14 50 28";

/**
 * The car, as an SVG fragment. Callers supply the `<svg>` so the same drawing
 * serves the desktop road (positioned in artwork units) and the phone layout
 * (a standalone icon).
 *
 * `steeringRef` receives the front axle so the caller can turn the wheels into
 * corners; it is optional, and the wheels simply sit straight without it.
 */
function CarShapes({
  steeringRef,
}: {
  steeringRef?: React.Ref<SVGGElement>;
}) {
  const shadowId = `road-car-shadow-${useId()}`;

  return (
    <>
      <defs>
        <radialGradient id={shadowId}>
          <stop offset="0.35" stopColor="#000000" stopOpacity={0.55} />
          <stop offset="1" stopColor="#000000" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Kept radially symmetric: the whole car rotates, and a directional
          shadow would rotate with it and betray a moving light source. The
          scene is a daylit map, so there are no headlight beams to draw — the
          lamps below are detail on the body, not light sources. */}
      <ellipse cx={0} cy={0} rx={24} ry={13} fill={`url(#${shadowId})`} />

      {/* A dark hairline keeps the silhouette readable where the car crosses
          the white lane markings. */}
      <rect
        x={-CAR.length / 2}
        y={-CAR.width / 2}
        width={CAR.length}
        height={CAR.width}
        rx={6.5}
        fill="var(--color-accent)"
        stroke="#101418"
        strokeOpacity={0.45}
        strokeWidth={1.2}
      />

      <rect x={-7} y={-8} width={13} height={16} rx={3.5} fill="#16212e" />
      <path d="M6 -7.4 L13 -4.4 L13 4.4 L6 7.4 Z" fill="#2c4257" />
      <path d="M-7 -7.4 L-13.4 -4.4 L-13.4 4.4 L-7 7.4 Z" fill="#2c4257" />

      {/* Drawn over the body, tucked just inside its outline, rather than proud
          of it — see `CAR.roadScale`. The rear pair is fixed; the front pair is
          the caller's to steer. */}
      <g fill="#14181c">
        <rect x={-15} y={-10.4} width={8} height={3.6} rx={1.4} />
        <rect x={-15} y={6.8} width={8} height={3.6} rx={1.4} />
      </g>
      <g ref={steeringRef} fill="#14181c">
        <rect x={7} y={-10.4} width={8} height={3.6} rx={1.4} />
        <rect x={7} y={6.8} width={8} height={3.6} rx={1.4} />
      </g>

      <g fill="#fff6dd">
        <rect x={15.8} y={-8.2} width={3.4} height={3.4} rx={1.2} />
        <rect x={15.8} y={4.8} width={3.4} height={3.4} rx={1.2} />
      </g>
      <g fill="#d1462f">
        <rect x={-19.2} y={-8.2} width={3} height={3.4} rx={1.1} />
        <rect x={-19.2} y={4.8} width={3} height={3.4} rx={1.1} />
      </g>
    </>
  );
}

const DEG = 180 / Math.PI;
/** Arc length either side of the car used to read the road's heading. */
const HEADING_SAMPLE = 4;
/**
 * Steering is read over a longer span than the heading. Curvature is the same
 * either way on a circular corner, but the wider window spreads the entry and
 * exit of a bend over ~28 units instead of 8, so the wheels ease round rather
 * than snap.
 */
const STEER_SAMPLE = 14;
/** Front wheels never crank further than this. */
const MAX_STEER = 34;

/**
 * Warm wash laid along the road just travelled. Three stacked strokes stand in
 * for a gradient along the path — which a single stroke cannot do, because SVG
 * gradients run across the bounding box, not the curve: shorter and brighter
 * towards the car, so the tail fades out behind it.
 *
 * The widest is 18 against 30 of tarmac. Through a bend that puts it between 24
 * and 42 from the corner's centre, inside the kerbs at 18 and 48, so the wash
 * never bleeds onto the page.
 */
const TRAIL = [
  { length: 250, width: 18, opacity: 0.1 },
  { length: 130, width: 12, opacity: 0.14 },
  { length: 54, width: 7, opacity: 0.22 },
] as const;

/**
 * Extra cost charged per unit of vertical descent when turning scroll progress
 * into a position along the driving line.
 *
 * Plain arc length does not work. The horizontal runs are two thirds of the
 * line but cover no vertical distance, so while the car crosses a row the page
 * scrolls on beneath it and the car drifts up the viewport — mapped by arc
 * length alone it reaches the top edge before the last row on a short screen.
 * Charging for descent spends more of the scroll on the bends and holds the car
 * between roughly a quarter and three quarters of the viewport at every desktop
 * size. It flatters the motion too: the car cruises the straights and eases
 * down into each turn.
 */
const DESCENT_WEIGHT = 2.5;

/**
 * Arc length the car travels past a row before that row's step appears, so the
 * content lands just behind it rather than racing it.
 */
const REVEAL_LEAD = 90;

/**
 * Distance the phone car runs past a step's badge before that step appears,
 * measured in px of its vertical travel. The straight road's answer to
 * {@link REVEAL_LEAD}.
 */
const REVEAL_LEAD_Y = 32;

/**
 * The paused timeline that hands one step in.
 *
 * Built from `from` tweens, which matters twice over: the steps render in their
 * final state, so they survive with JavaScript off, and reversing hides them
 * again when the car backs up the road.
 *
 * Content enters from behind the car, so the drive appears to carry it in
 * rather than the two just happening at once. Which way that is depends on the
 * road, so `drift` is the caller's to set.
 */
function buildStepReveal(step: Element, drift: { x?: number; y?: number }) {
  const part = (name: string) =>
    step.querySelector<HTMLElement>(`[data-road-part="${name}"]`);

  const badge = part("badge");
  const photo = part("photo");
  const copy = part("copy");
  const reveal = gsap.timeline({ paused: true });

  if (badge) {
    reveal.from(
      badge,
      {
        opacity: 0,
        scaleY: 0.4,
        y: -10,
        // The tag reads as dropping onto the road, so it grows from the edge it
        // hangs off rather than from its middle.
        transformOrigin: "50% 100%",
        duration: 0.45,
        ease: "back.out(2.2)",
      },
      0,
    );
  }
  if (photo) {
    reveal.from(
      photo,
      { opacity: 0, ...drift, scale: 0.96, duration: 0.8, ease: "power3.out" },
      0.05,
    );
  }
  if (copy) {
    reveal.from(
      Array.from(copy.children),
      {
        opacity: 0,
        x: (drift.x ?? 0) * 0.6,
        y: (drift.y ?? 0) * 0.6,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
      },
      0.18,
    );
  }

  return reveal;
}

/** Signed angle difference, wrapped to (-PI, PI]. */
function wrapAngle(a: number) {
  return Math.atan2(Math.sin(a), Math.cos(a));
}

/**
 * Turns scroll progress into an arc length along the driving line, weighting
 * descent by {@link DESCENT_WEIGHT}.
 *
 * Builds a cumulative cost table once, then inverts it by binary search. The
 * table is uniform in arc length, so a linear interpolation between two
 * neighbouring entries is smooth enough to scrub against.
 */
function buildPacing(path: SVGPathElement, total: number) {
  const SAMPLES = 480;
  const step = total / SAMPLES;
  const cost = [0];
  let prev = path.getPointAtLength(0);

  for (let i = 1; i <= SAMPLES; i += 1) {
    const point = path.getPointAtLength(i * step);
    cost.push(cost[i - 1] + step + DESCENT_WEIGHT * Math.abs(point.y - prev.y));
    prev = point;
  }

  const totalCost = cost[SAMPLES];

  return (progress: number) => {
    const target = gsap.utils.clamp(0, 1, progress) * totalCost;
    let lo = 1;
    let hi = SAMPLES;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cost[mid] < target) lo = mid + 1;
      else hi = mid;
    }

    const span = cost[lo] - cost[lo - 1];
    const within = span ? (target - cost[lo - 1]) / span : 0;
    return (lo - 1 + within) * step;
  };
}

/**
 * Where along the drive the car reaches each row of steps, and which way it is
 * heading when it gets there.
 *
 * Both are read off the driving line rather than hard-coded, so the cues stay
 * correct if the road's geometry is ever re-measured. The road only ever
 * descends, so the first sample to reach a row's centre line is the corner the
 * car turns onto it at.
 */
function rowCues(path: SVGPathElement, total: number) {
  const SAMPLES = 256;
  const points = Array.from({ length: SAMPLES + 1 }, (_, i) =>
    path.getPointAtLength((i / SAMPLES) * total),
  );

  return ROAD.rowTops.map((top) => {
    const centre = top + ROAD.thickness / 2;
    const index = points.findIndex((p) => p.y >= centre - 1);
    const arrival = index < 0 ? total : (index / SAMPLES) * total;

    // Sampled clear of the corner, where the run has settled onto its heading.
    const from = path.getPointAtLength(Math.min(total, arrival + 10));
    const settled = path.getPointAtLength(Math.min(total, arrival + 40));

    return {
      /** Arc length, not progress — pacing sits between the two. */
      at: Math.min(total, arrival + REVEAL_LEAD),
      /** +1 driving east, -1 driving west. */
      heading: settled.x >= from.x ? 1 : -1,
    };
  });
}

/**
 * Drives a car along the centre line of the serpentine road, scrubbed to the
 * page's scroll position, and hands the steps in as it passes them.
 *
 * The driving line lives in the same coordinate space as the road artwork and
 * is never painted; `getPointAtLength` reads positions off it in artwork units,
 * so the car scales and stays in register with the road at any container width
 * without measuring anything in JS.
 *
 * Scroll progress maps to a position along that line through
 * {@link buildPacing}, which is what keeps the car in view for the whole pass:
 * it cruises each row past the steps, then eases down the bend to the next.
 */
export function RoadCar({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const steeringRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPathElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    const path = pathRef.current;
    const car = carRef.current;
    if (!path || !car) return;

    /** `at` is an arc length along the driving line, not a progress fraction. */
    const place = (at: number) => {
      const total = path.getTotalLength();
      // A hidden path measures zero in some engines; nothing to place then.
      if (!total) return;

      const point = path.getPointAtLength(at);

      // Sampling both sides gives a heading that stays smooth through the
      // corners, and degrades to a one-sided read at either end of the run.
      const ahead = path.getPointAtLength(Math.min(total, at + HEADING_SAMPLE));
      const behind = path.getPointAtLength(Math.max(0, at - HEADING_SAMPLE));
      const heading =
        Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * DEG;

      car.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${heading}) scale(${CAR.roadScale})`,
      );

      if (steeringRef.current) {
        // How hard the road bends here, turned into a wheel angle by the
        // bicycle model: steer = atan(wheelbase * curvature).
        const outAt = Math.min(total, at + STEER_SAMPLE);
        const inAt = Math.max(0, at - STEER_SAMPLE);
        const span = outAt - inAt;
        const out = path.getPointAtLength(outAt);
        const back = path.getPointAtLength(inAt);
        const turn = wrapAngle(
          Math.atan2(out.y - point.y, out.x - point.x) -
            Math.atan2(point.y - back.y, point.x - back.x),
        );
        // Curvature is measured in road units, so the wheelbase has to be the
        // one the car actually has on the road, not the one it is drawn at.
        const steer = span
          ? Math.atan((CAR.wheelbase * CAR.roadScale * turn) / span) * DEG
          : 0;

        steeringRef.current.setAttribute(
          "transform",
          `rotate(${gsap.utils.clamp(-MAX_STEER, MAX_STEER, steer)} ${CAR.frontAxleX} 0)`,
        );
      }

      trailRef.current.forEach((stroke, i) => {
        const { length } = TRAIL[i];
        // A single dash of `length`, with the gap long enough that the pattern
        // never repeats; the offset slides that dash to end at the car.
        stroke.setAttribute("stroke-dasharray", `${length} ${total}`);
        stroke.setAttribute("stroke-dashoffset", `${length - at}`);
      });
    };

    place(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The road is `hidden` below lg, where a path measures zero — so only wire
    // up the scrub while it is actually laid out, and rebuild across the
    // breakpoint.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const road = car.ownerSVGElement?.parentElement;
      const trigger = road ?? car;
      const total = path.getTotalLength();
      const pace = buildPacing(path, total);
      const cues = total ? rowCues(path, total) : [];

      /* One paused timeline per step, cued to the arc length at which the car
         reaches that step's row. The content drifts in along the row, against
         the direction of travel. */
      const steps = Array.from(
        road?.querySelectorAll<HTMLElement>("[data-road-step]") ?? [],
      ).map((step, index) => {
        const cue = cues[index];

        return {
          at: cue?.at ?? 0,
          reveal: buildStepReveal(step, { x: -24 * (cue?.heading ?? 1) }),
        };
      });

      // GSAP tweens the proxy; each frame we re-read it and move the car, which
      // keeps `scrub`'s easing without animating an SVG attribute directly.
      const proxy = { progress: 0 };

      const drive = (progress: number) => {
        const at = pace(progress);
        place(at);
        for (const step of steps) {
          if (at >= step.at) step.reveal.play();
          else step.reveal.reverse();
        }
      };

      const tween = gsap.to(proxy, {
        progress: 1,
        ease: "none",
        onUpdate: () => drive(proxy.progress),
        scrollTrigger: {
          trigger,
          start: "top 65%",
          end: "bottom 35%",
          /* Seconds the car takes to reach the position the scroll asks for,
             and the one honest speed control here.

             How far the car travels per unit of scroll is not adjustable: it is
             pinned to a road that scrolls with the page, so it has to cover the
             artwork's full height in exactly the scrolling that takes the road
             past the viewport. Stretch that and the car simply falls off the top
             of the screen. Lag changes none of that — it lets the car ease
             toward its target under its own weight and keep gliding for a moment
             after scrolling stops, which is what reads as unhurried. Raise it to
             slow the car further. */
          scrub: 1.6,
        },
      });

      drive(0);

      return () => {
        tween.kill();
        place(0);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${ROAD.width} ${ROAD.height}`}
      className={cn("pointer-events-none", className)}
      fill="none"
    >
      {/* Geometry only — the driving line is measured, never painted. */}
      <path ref={pathRef} d={CENTRELINE_PATH} />

      {TRAIL.map((layer, i) => (
        <path
          key={layer.length}
          ref={(node) => {
            if (node) trailRef.current[i] = node;
          }}
          d={CENTRELINE_PATH}
          stroke="var(--color-accent)"
          strokeOpacity={layer.opacity}
          strokeWidth={layer.width}
          strokeLinecap="round"
        />
      ))}

      <g ref={carRef}>
        <CarShapes steeringRef={steeringRef} />
      </g>
    </svg>
  );
}

/**
 * Below `lg` the road straightens into a single vertical run, so the car only
 * needs to travel top to bottom — no path to follow.
 *
 * The wrapper is inset to match the ends of the tarmac bar it drives on, which
 * lets the travel be a plain 0%–100% of that wrapper.
 *
 * It hands the steps in as it passes them, exactly as the desktop car does, so
 * a phone reader meets them one at a time instead of the whole list arriving
 * together. Same markup contract: `data-road-step` on each step, with the parts
 * inside it marked `data-road-part`.
 */
export function RoadCarVertical({ className }: { className?: string }) {
  const carRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const car = carRef.current;
    if (!car) return;

    gsap.set(car, { xPercent: -50, yPercent: -50, rotation: 90 });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 1023px)", () => {
      // The inset wrapper the car's 0%–100% is measured against, and the list
      // holding both it and the steps.
      const track = car.parentElement;
      const list = track?.parentElement;
      if (!track || !list) return;

      const steps = Array.from(
        list.querySelectorAll<HTMLElement>("[data-road-step]"),
      ).map((step) => ({
        step,
        badge: step.querySelector<HTMLElement>('[data-road-part="badge"]'),
        /** Fraction of the car's travel, filled in by `measure` below. */
        at: 0,
        // The road runs down the left of the list, so a step arrives off it.
        reveal: buildStepReveal(step, { x: -20 }),
      }));

      /* Cued off `offsetTop`, which is layout position and therefore blind to
         the transforms the reveals above put on these very elements — a
         `getBoundingClientRect` would read a badge mid-animation and shift the
         cue every time this re-ran. The badges are positioned against their
         step and the step and track against the list, so the offsets compose.

         The trade is that from `md`, where the badge is centred on its row with
         a transform, layout position cannot see that shift and the cue lands
         half a badge — 22px — late along a drive some thousands long. */
      const measure = () => {
        const height = track.offsetHeight || 1;

        for (const s of steps) {
          const badge = s.badge;
          const y =
            s.step.offsetTop +
            (badge ? badge.offsetTop + badge.offsetHeight / 2 : 0) +
            REVEAL_LEAD_Y;

          s.at = gsap.utils.clamp(0, 1, (y - track.offsetTop) / height);
        }
      };

      // Copy reflows and images settle after this first pass, so re-measure
      // whenever ScrollTrigger recalculates rather than trusting one read.
      measure();
      ScrollTrigger.addEventListener("refresh", measure);

      // GSAP tweens the proxy; each frame we re-read it, which keeps `scrub`'s
      // easing while leaving the step cues to be checked against it.
      const proxy = { progress: 0 };

      const drive = (progress: number) => {
        gsap.set(car, { top: `${progress * 100}%` });
        for (const step of steps) {
          if (progress >= step.at) step.reveal.play();
          else step.reveal.reverse();
        }
      };

      const tween = gsap.to(proxy, {
        progress: 1,
        ease: "none",
        onUpdate: () => drive(proxy.progress),
        scrollTrigger: {
          trigger: list,
          start: "top 70%",
          end: "bottom 30%",
          // Matched to the road car's lag so both read at the same weight.
          scrub: 1.6,
        },
      });

      drive(0);

      return () => {
        ScrollTrigger.removeEventListener("refresh", measure);
        tween.kill();
        gsap.set(car, { top: "0%" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <span aria-hidden className={cn("pointer-events-none block w-0", className)}>
      {/* Grown with the road car. Rotated upright the body spans 18px of the
          28px tarmac bar, the same two-thirds the road car takes. */}
      <span ref={carRef} className="absolute left-0 top-0 block w-11">
        <svg viewBox={CAR_VIEWBOX} className="block w-full" fill="none">
          <CarShapes />
        </svg>
      </span>
    </span>
  );
}
