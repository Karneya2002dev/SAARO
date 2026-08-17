import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" fill="url(#logo-grad)" />
      <path
        d="M10.5 20.2c1.2 1.1 2.9 1.7 4.6 1.7 2.6 0 4.3-1.2 4.3-3 0-4.2-8.5-1.9-8.5-6.3 0-1.9 1.8-3.2 4.4-3.2 1.6 0 3.1.5 4.2 1.4"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13 4.5 11l5.6-2z" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const CheckCircle = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="m8.2 12.2 2.6 2.6 5-5.4" />
  </svg>
);

export const Plus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Star = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9z" />
  </svg>
);

export const Bolt = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13.5 2.5 4.8 13.2c-.4.5 0 1.3.6 1.3h5l-.9 7 8.7-10.7c.4-.5 0-1.3-.6-1.3h-5z" />
  </svg>
);

export const Shield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 4.5 6v6c0 4.6 3.2 7.9 7.5 9.2 4.3-1.3 7.5-4.6 7.5-9.2V6z" />
    <path d="m9 12 2.2 2.2L15.4 10" />
  </svg>
);

export const Chart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 20h16" />
    <path d="M7 20v-6M12 20V7M17 20v-9" />
  </svg>
);

export const TrendUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3.6 16.6 9.4 10.8l3.4 3.4 6.6-6.6" />
    <path d="M15.2 7.6h4.2v4.2" />
  </svg>
);

/** Solid — the peaks and valleys of a stroked crown turn to mush at 24px. */
export const Crown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path
      d="M2.8 8.1 6.6 11.2 12 4.8l5.4 6.4 3.8-3.1-1.8 9.6a1 1 0 0 1-1 .8H5.6a1 1 0 0 1-1-.8z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const Layers = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6z" />
    <path d="m3.5 12.4 8.5 4.6 8.5-4.6" />
    <path d="m3.5 16.9 8.5 4.6 8.5-4.6" />
  </svg>
);

export const Workflow = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="7" height="6" rx="2" />
    <rect x="14" y="15" width="7" height="6" rx="2" />
    <path d="M6.5 9v5a4 4 0 0 0 4 4H14" />
  </svg>
);

export const Globe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
    <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
  </svg>
);

export const Play = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M8.5 6.4a1 1 0 0 1 1.52-.85l7.2 4.4a1 1 0 0 1 0 1.7l-7.2 4.4a1 1 0 0 1-1.52-.85z" />
  </svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m14.5 5.5-6 6.5 6 6.5" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m9.5 5.5 6 6.5-6 6.5" />
  </svg>
);

export const Building = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5.5 21V5.6a2 2 0 0 1 1.4-1.9l5-1.5a1 1 0 0 1 1.3 1V21" />
    <path d="M13.2 8.5h4.3a2 2 0 0 1 2 2V21" />
    <path d="M3.2 21h17.6" />
    <path d="M8.6 8.2h1.4M8.6 12.1h1.4M8.6 16h1.4M15.6 12.4h1.2M15.6 16.2h1.2" />
  </svg>
);

export const Download = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5.6 15.4A3.9 3.9 0 0 1 6.9 7.8a5.2 5.2 0 0 1 10 1 3.6 3.6 0 0 1 1.6 6.6" />
    <path d="M12 10.6v8.2M8.9 15.9 12 19l3.1-3.1" />
  </svg>
);

export const User = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8.4" r="3.4" />
    <path d="M5.6 19.6a6.4 6.4 0 0 1 12.8 0" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9.6" cy="8.4" r="3.2" />
    <path d="M3.8 19.4a5.9 5.9 0 0 1 11.6 0" />
    <path d="M16.2 5.6a3.1 3.1 0 0 1 0 5.9" />
    <path d="M17.4 13.6a5.4 5.4 0 0 1 3 4.6" />
  </svg>
);

export const Upload = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 15.6V3.8" />
    <path d="m7.6 8.2 4.4-4.4 4.4 4.4" />
    <path d="M4.2 15.2v3a2 2 0 0 0 2 2h11.6a2 2 0 0 0 2-2v-3" />
  </svg>
);

export const Headset = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4.4 14.4v-2.2a7.6 7.6 0 0 1 15.2 0v2.2" />
    <rect x="2.8" y="13.4" width="4" height="6" rx="1.8" />
    <rect x="17.2" y="13.4" width="4" height="6" rx="1.8" />
    <path d="M19.6 19.4v.4a2.4 2.4 0 0 1-2.4 2.4h-2.6" />
  </svg>
);

export const UserCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="7.6" r="3.2" />
    <path d="M6.2 16.6a6.2 6.2 0 0 1 11.6 0" />
    <path d="M5.4 20.2h13.2" />
  </svg>
);

export const Clipboard = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4.6" y="4.4" width="14.8" height="16.4" rx="2.6" />
    <path d="M9 4.4a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 15 4.4v1.2H9z" />
    <path d="m9.4 12.8 1.9 1.9 3.6-3.9" />
  </svg>
);

export const IdCard = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.6" y="5" width="18.8" height="14" rx="2.6" />
    <circle cx="8.4" cy="10.5" r="1.9" />
    <path d="M5.3 15.8a3.3 3.3 0 0 1 6.2 0" />
    <path d="M14.4 10.2h4.4M14.4 13.6h4.4" />
  </svg>
);

/** Solid, unlike the rest — it reads as a price label at large sizes. The
 *  eyelet is a second subpath so even-odd punches it through to whatever
 *  sits behind, rather than painting it white. */
export const Tag = (p: IconProps) => (
  <svg {...base} {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6 3H5.4A2.4 2.4 0 0 0 3 5.4v6.2c0 .64.25 1.25.7 1.7l7.6 7.6a2.4 2.4 0 0 0 3.4 0l6.2-6.2a2.4 2.4 0 0 0 0-3.4L13.3 3.7A2.4 2.4 0 0 0 11.6 3ZM8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const Banknote = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.6" y="6" width="18.8" height="12" rx="2.6" />
    <circle cx="12" cy="12" r="2.9" />
    <path d="M6.1 10v4M17.9 10v4" />
  </svg>
);

export const Car = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 16.4v-3.1l1.7-4.2A2 2 0 0 1 7.6 7.9h8.8a2 2 0 0 1 1.9 1.2l1.7 4.2v3.1" />
    <path d="M4 13.3h16" />
    <circle cx="7.6" cy="16.6" r="1.7" />
    <circle cx="16.4" cy="16.6" r="1.7" />
  </svg>
);

export const StarOutline = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3.4 2.66 5.39 5.94.87-4.3 4.19 1.02 5.92L12 17.17l-5.32 2.6 1.02-5.92-4.3-4.19 5.94-.87z" />
  </svg>
);

export const Road = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8.4 3h1.2L7.8 21H4.2z" />
    <path d="M14.4 3h1.2l2.2 18h-3.6z" />
    <path d="M12 4.2v2.6M12 10.7v2.6M12 17.2v2.6" />
  </svg>
);

export const Truck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2.8 6.5a1.5 1.5 0 0 1 1.5-1.5h8.2a1.5 1.5 0 0 1 1.5 1.5v9.4H2.8z" />
    <path d="M14 9.2h3.3a2 2 0 0 1 1.7 1l2.2 3.6v2.1H14z" />
    <circle cx="7" cy="18" r="2.1" />
    <circle cx="17.4" cy="18" r="2.1" />
    <path d="M9.1 18h6.2" />
  </svg>
);

export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <path d="M3.5 9.5h17M8 3.2v3.4M16 3.2v3.4" />
  </svg>
);

export const CalendarCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <path d="M3.5 9.5h17M8 3.2v3.4M16 3.2v3.4" />
    <path d="m9.2 14.4 1.9 1.9 3.7-4" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7.2 3.5h-.9A2.9 2.9 0 0 0 3.4 6.6c0 6.6 7.4 14 14 14a2.9 2.9 0 0 0 3.1-2.9v-.9a1.3 1.3 0 0 0-.9-1.2l-3.1-1a1.3 1.3 0 0 0-1.4.4l-.9 1.1a11.6 11.6 0 0 1-5.3-5.3l1.1-.9a1.3 1.3 0 0 0 .4-1.4l-1-3.1a1.3 1.3 0 0 0-1.2-.9Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21.5c4.2-4.4 6.5-7.8 6.5-10.9a6.5 6.5 0 0 0-13 0c0 3.1 2.3 6.5 6.5 10.9Z" />
    <circle cx="12" cy="10.4" r="2.4" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 7.2V12l3.2 2" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="5" width="18.4" height="14" rx="2.6" />
    <path d="m3.6 7.2 7.2 5.3a2 2 0 0 0 2.4 0l7.2-5.3" />
  </svg>
);

/* The brand marks below are solid glyphs — stroked outlines of a logo read
   as a different logo, so they opt out of the shared stroke styling. */
export const Facebook = (p: IconProps) => (
  <svg {...base} {...p}>
    <path
      d="M13.6 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.8V3.6a21 21 0 0 0-2.4-.12c-2.38 0-4 1.45-4 4.12v2.3H7.7V13h2.7v8z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="16.9" cy="7.1" r="1.15" fill="currentColor" stroke="none" />
  </svg>
);

export const YouTube = (p: IconProps) => (
  <svg {...base} {...p}>
    <path
      d="M21.6 8.2a2.5 2.5 0 0 0-1.76-1.77C18.28 6 12 6 12 6s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 8.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.76 1.77C5.72 18 12 18 12 18s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-3.8ZM10.1 15V9l5.2 3z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path
      d="M12 2.6a9.3 9.3 0 0 0-8 14.06L2.6 21.4l4.85-1.36A9.3 9.3 0 1 0 12 2.6Zm0 1.9a7.4 7.4 0 0 1 5.9 11.87 7.4 7.4 0 0 1-9.98 1.8l-.36-.22-2.5.7.7-2.44-.24-.38A7.4 7.4 0 0 1 12 4.5Zm-3.2 3.7c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.68 2.68 4.16 3.65 2.06.8 2.48.64 2.93.6.45-.04 1.44-.58 1.64-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.74-1.8-.19-.47-.39-.4-.53-.41h-.45Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const Twitter = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.5 3h3.1l-6.8 7.7L21.8 21h-6.2l-4.9-6.3L5.1 21H2l7.3-8.3L2.5 3h6.4l4.4 5.8zm-1.1 16.1h1.7L7.7 4.8H5.9z" />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9.5h4v11H3zM9.5 9.5h3.8v1.5c.6-1 1.9-1.8 3.6-1.8 3 0 4.1 1.9 4.1 5v5.8h-4V15c0-1.5-.5-2.5-1.9-2.5-1.1 0-1.7.7-2 1.5-.1.3-.1.7-.1 1v5.5h-4z" />
  </svg>
);

export const GitHub = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2" />
  </svg>
);
