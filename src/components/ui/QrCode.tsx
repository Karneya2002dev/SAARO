import { cn } from "@/lib/cn";

/**
 * Decorative QR block — a deterministic module grid with the three finder
 * patterns and a proper quiet zone, so it reads as a QR at a glance.
 *
 * NOT scannable. Swap in real exports before launch; the seed only keeps the
 * pattern stable between renders so it does not shift on hydration.
 */
const SIZE = 25;
/** Real QR codes carry a white margin; without it this reads as grey mush. */
const QUIET = 2;
const FINDER = 7;

function modules(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;

  const inner = SIZE - QUIET * 2;
  const grid: boolean[][] = [];
  for (let y = 0; y < inner; y++) {
    grid[y] = [];
    for (let x = 0; x < inner; x++) {
      h = (h * 1103515245 + 12345) >>> 0;
      grid[y][x] = ((h >>> 16) & 1) === 1;
    }
  }

  // Clear the finder patterns and their separators.
  const clear = (ox: number, oy: number) => {
    for (let y = 0; y < FINDER + 1; y++) {
      for (let x = 0; x < FINDER + 1; x++) {
        const gy = oy + y;
        const gx = ox + x;
        if (grid[gy]?.[gx] !== undefined) grid[gy][gx] = false;
      }
    }
  };
  clear(0, 0);
  clear(inner - FINDER - 1, 0);
  clear(0, inner - FINDER - 1);

  return grid;
}

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </>
  );
}

export function QrCode({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const grid = modules(seed);
  const inner = SIZE - QUIET * 2;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      shapeRendering="crispEdges"
      aria-hidden
      className={cn("text-black", className)}
    >
      <rect width={SIZE} height={SIZE} fill="#fff" />
      {grid.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x + QUIET}
              y={y + QUIET}
              width="1"
              height="1"
              fill="currentColor"
            />
          ) : null,
        ),
      )}
      <Finder x={QUIET} y={QUIET} />
      <Finder x={QUIET + inner - FINDER} y={QUIET} />
      <Finder x={QUIET} y={QUIET + inner - FINDER} />
    </svg>
  );
}
