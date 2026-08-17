"use client";

import { ChevronLeft, ChevronRight } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

/**
 * Page numbers to draw: a sliding window of four, then an ellipsis and the
 * last page once there are more than five. Matches the design's "1 2 3 4 … 8".
 */
function pageList(total: number, current: number): (number | "gap")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const start = Math.min(Math.max(1, current - 1), total - 4);
  const window: (number | "gap")[] = [start, start + 1, start + 2, start + 3];

  if (start > 1) window.unshift(1, "gap");
  if (start + 3 < total) window.push("gap", total);

  return window;
}

const STEP =
  "grid size-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-heading disabled:pointer-events-none disabled:opacity-35";

export function Pagination({
  total,
  current,
  onChange,
  dict,
}: {
  total: number;
  current: number;
  onChange: (page: number) => void;
  dict: Dictionary["gallery"]["pagination"];
}) {
  // A single page needs no control at all.
  if (total < 2) return null;

  return (
    <nav aria-label={dict.label} className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        aria-label={dict.previous}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className={STEP}
      >
        <ChevronLeft className="size-4" />
      </button>

      {pageList(total, current).map((page, index) =>
        page === "gap" ? (
          <span
            key={`gap-${index}`}
            aria-hidden
            className="grid size-8 place-items-center text-[13px] text-muted"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-label={dict.page.replace("{n}", String(page))}
            aria-current={page === current ? "page" : undefined}
            onClick={() => onChange(page)}
            className={`grid size-8 shrink-0 place-items-center rounded-full text-[13px] transition-colors ${
              page === current
                ? "bg-accent font-semibold text-heading"
                : "text-muted hover:text-heading"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label={dict.next}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className={STEP}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
