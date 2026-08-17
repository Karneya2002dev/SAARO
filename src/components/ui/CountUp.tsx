"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Splits "345+" into 345 and "+", so the suffix survives the count. */
function parse(value: string) {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return {
    target: Number(match[1].replace(/,/g, "")),
    suffix: match[2],
  };
}

/**
 * Counts from zero to the figure as it scrolls into view.
 *
 * The final value is what renders on the server, so the real number is in the
 * HTML for search engines and for anyone without JavaScript; the count only
 * replaces it once the effect runs.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parsed = parse(value);
    // Anything that is not a plain number (a locale that spells it out, say)
    // is left exactly as rendered.
    if (!parsed) return;

    const { target, suffix } = parsed;
    const counter = { n: 0 };
    el.textContent = `0${suffix}`;

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
        onComplete: () => {
          el.textContent = value;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  return (
    <p ref={ref} className={className}>
      {value}
    </p>
  );
}
