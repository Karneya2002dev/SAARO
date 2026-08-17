"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Drifts its content against the scroll, scrubbed to scroll position rather
 * than played on a trigger.
 *
 * The caller is responsible for giving the content room to move — typically by
 * scaling it past its container inside an `overflow-hidden` parent. Without
 * that headroom the drift exposes an edge.
 */
export function Parallax({
  children,
  className,
  /** yPercent at the moment the container enters the viewport. */
  from = 0,
  /** yPercent by the time it leaves. Negative drifts upward. */
  to = -8,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The element usually fills its parent absolutely, so the parent is the
    // stable thing to measure the scroll pass against.
    const trigger = el.parentElement ?? el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: from },
        {
          yPercent: to,
          // Linear: any easing would make the drift lag the scroll unevenly.
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [from, to]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
