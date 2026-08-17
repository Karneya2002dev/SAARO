"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger);

/* useLayoutEffect is the one that runs before paint, which is what keeps the
   start state from flashing — but React warns about it during SSR, so fall
   back to useEffect on the server where it never actually runs. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealProps = {
  children: ReactNode;
  /** Element to render. Pass the real tag so the markup stays semantic. */
  as?: ElementType;
  className?: string;
  /** Seconds to wait after the element scrolls into view. */
  delay?: number;
  /** Distance in px travelled up into place. */
  y?: number;
  /** Set to sequence the direct children instead of moving the box as one. */
  stagger?: number;
};

/**
 * Fades its content up as it scrolls into view.
 *
 * This is a Client Component, but the children are still rendered on the
 * server — a Server Component can wrap markup in it without becoming a client
 * component itself.
 *
 * Deliberately uses `gsap.from`: the element is rendered in its final state,
 * so without JavaScript the content is simply visible rather than stuck at
 * opacity 0. GSAP applies the start state before first paint instead.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 24,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Leave the markup untouched for anyone who asked for less motion; the
    // stylesheet's reduced-motion block cannot reach GSAP's inline styles.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(stagger ? Array.from(el.children) : el, {
        opacity: 0,
        y,
        duration: 0.7,
        ease: "power2.out",
        delay,
        stagger,
        scrollTrigger: {
          trigger: el,
          // Slightly inside the fold, so the motion reads as a response to
          // scrolling rather than something already finished on arrival.
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
