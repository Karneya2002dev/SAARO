/**
 * Geometry for the serpentine road in the "How It Works" section.
 *
 * Every number below is measured from the alpha channel of
 * `public/assets/road.png` (1092x1927) rather than estimated, so the steps
 * pin exactly to their bend in the road.
 *
 * The desktop container is locked to the artwork's aspect ratio and all
 * placement is expressed in percentages of it, so the road and the content
 * on top scale together at any width — no JS measurement required.
 */
export const ROAD = {
  width: 1092,
  height: 1927,
  /** Painted width of the tarmac. */
  thickness: 30,
  /** Top edge of each horizontal segment the steps hang off. */
  rowTops: [0, 451, 902, 1352],
} as const;

/**
 * Centre-line lane markings. The supplied artwork is plain tarmac, so these
 * are drawn on top.
 *
 * Each entry is one straight run, measured from the artwork's alpha channel
 * and inset ~55px at every end so the dashes stop short of the bends —
 * matching the design, where the corners are unmarked.
 */
export const MARKINGS: { x1: number; y1: number; x2: number; y2: number }[] = [
  // Horizontal runs, top to bottom.
  { x1: 660, y1: 15, x2: 1020, y2: 15 },
  { x1: 72, y1: 466, x2: 1018, y2: 466 },
  { x1: 73, y1: 917, x2: 1020, y2: 917 },
  { x1: 80, y1: 1367, x2: 1018, y2: 1367 },
  { x1: 82, y1: 1818, x2: 495, y2: 1818 },
  // Vertical runs. The lower-left one sits 9px right of the upper-left one —
  // that offset is in the source artwork, not a mistake here.
  { x1: 1077, y1: 73, x2: 1077, y2: 407 },
  { x1: 15, y1: 523, x2: 15, y2: 859 },
  { x1: 1077, y1: 975, x2: 1077, y2: 1308 },
  { x1: 24, y1: 1436, x2: 24, y2: 1748 },
];

/** Dash length and gap, in artwork units. */
export const MARKING_DASH = { width: 5, dash: 55, gap: 142 } as const;

/**
 * Corners of the road's centre line, start to finish, measured from the same
 * alpha channel as everything else above.
 *
 * The tarmac itself is cut flat at x=649 and runs to y=1925; both ends here are
 * pulled in by half a car length so a car sitting at either end of the run is
 * still wholly on the road rather than overhanging the cut.
 */
const CENTRELINE: readonly (readonly [number, number])[] = [
  [670, 15],
  [1077, 15],
  [1077, 466],
  [15, 466],
  [15, 917],
  [1077, 917],
  [1077, 1367],
  [24, 1367],
  [24, 1818],
  [536, 1818],
  [536, 1900],
];

/**
 * The artwork's outer corners are rounded to 48; inset by half the tarmac's
 * width, the centre line's own corners come out at 33.
 */
const CORNER_RADIUS = 33;

/**
 * The centre line as an SVG path in artwork coordinates — a driving line for
 * the car to follow, not something that gets painted.
 *
 * Every bend is a right angle, so each corner is an exact quarter-circle arc
 * rather than an approximation. Computed once at module load: the result is a
 * pure function of the constants above, so server and client agree.
 */
export const CENTRELINE_PATH = (() => {
  const trim = (n: number) => Number(n.toFixed(2));
  const [start] = CENTRELINE;
  let d = `M ${start[0]} ${start[1]}`;

  for (let i = 1; i < CENTRELINE.length - 1; i += 1) {
    const [px, py] = CENTRELINE[i - 1];
    const [cx, cy] = CENTRELINE[i];
    const [nx, ny] = CENTRELINE[i + 1];

    const inX = cx - px;
    const inY = cy - py;
    const outX = nx - cx;
    const outY = ny - cy;
    const inLen = Math.hypot(inX, inY);
    const outLen = Math.hypot(outX, outY);
    // Never eat more than half of either leg, so neighbouring corners on a
    // short run can't overlap and fold the path back on itself.
    const r = Math.min(CORNER_RADIUS, inLen / 2, outLen / 2);

    // With y pointing down, a positive cross product is a clockwise turn,
    // which is SVG's positive sweep direction.
    const clockwise = inX * outY - inY * outX > 0 ? 1 : 0;

    d += ` L ${trim(cx - (inX / inLen) * r)} ${trim(cy - (inY / inLen) * r)}`;
    d += ` A ${r} ${r} 0 0 ${clockwise} ${trim(cx + (outX / outLen) * r)} ${trim(cy + (outY / outLen) * r)}`;
  }

  const end = CENTRELINE[CENTRELINE.length - 1];
  return `${d} L ${end[0]} ${end[1]}`;
})();

const LAYOUT = {
  /** Photo sits this far below its road segment. */
  imageTopOffset: 95,
  imageWidth: 466,
  imageHeight: 263,
  imageLeftX: 59,
  imageRightX: 560,

  textWidth: 340,
  textLeftX: 127,
  textRightX: 654,

  /** The tag hangs above the road, its base flush with the tarmac's underside. */
  badgeWidth: 77,
  badgeHeight: 50,
  badgeLeftX: 213,
  badgeRightX: 606,
} as const;

const pctX = (v: number) => `${(v / ROAD.width) * 100}%`;
const pctY = (v: number) => `${(v / ROAD.height) * 100}%`;

export type Box = { left: string; top: string; width: string; height: string };

export type StepFrame = {
  /** Even rows put the photo on the left, odd rows mirror it. */
  imageFirst: boolean;
  image: Box;
  text: Box;
  badge: Box;
};

/** Absolute placement for one step, as percentages of the road container. */
export function stepFrame(index: number): StepFrame {
  const imageFirst = index % 2 === 0;
  const rowTop = ROAD.rowTops[index] ?? 0;
  const imageTop = rowTop + LAYOUT.imageTopOffset;

  return {
    imageFirst,
    image: {
      left: pctX(imageFirst ? LAYOUT.imageLeftX : LAYOUT.imageRightX),
      top: pctY(imageTop),
      width: pctX(LAYOUT.imageWidth),
      height: pctY(LAYOUT.imageHeight),
    },
    text: {
      left: pctX(imageFirst ? LAYOUT.textRightX : LAYOUT.textLeftX),
      top: pctY(imageTop),
      width: pctX(LAYOUT.textWidth),
      // Matching the photo's height lets the copy centre against it.
      height: pctY(LAYOUT.imageHeight),
    },
    badge: {
      left: pctX(imageFirst ? LAYOUT.badgeRightX : LAYOUT.badgeLeftX),
      top: pctY(rowTop + ROAD.thickness - LAYOUT.badgeHeight),
      width: pctX(LAYOUT.badgeWidth),
      height: pctY(LAYOUT.badgeHeight),
    },
  };
}
