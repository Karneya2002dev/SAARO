/**
 * Structural, locale-independent data: icons, images, prices, hrefs.
 * All user-visible strings live in `lib/i18n/dictionaries/*` and are joined to
 * these entries by `id`, so a new locale never has to restate the structure.
 */

export const siteConfig = {
  name: "Saaro",
  phone: "+91 98941 42387",
  email: "Saaractingcalldrivers@gmail.com",
};

/**
 * Where each app's store badges point.
 *
 * The only place these URLs live — every badge on the site reads from here, so
 * a published listing is a one-line change.
 *
 * !! These are store *searches*, not listings. They resolve to a real page
 * rather than a dead link, but they are placeholders: replace each with the
 * listing URL once the app is published, e.g.
 *   playStore: "https://play.google.com/store/apps/details?id=com.saaro.rider"
 *   appStore:  "https://apps.apple.com/in/app/saaro-rider/id1234567890"
 *
 * Set a field to `null` for a store the app is not on and its badge is dropped
 * — worth doing for `appStore` while the apps ship as Android APKs, which is
 * what the shipping policy currently tells customers.
 */
export const appStoreLinks: Record<
  AppDownloadId,
  { playStore: string | null; appStore: string | null }
> = {
  rider: {
    playStore: "https://play.google.com/store/search?q=Saaro%20Rider&c=apps",
    appStore: "https://apps.apple.com/in/search?term=Saaro%20Rider",
  },
  driver: {
    playStore: "https://play.google.com/store/search?q=Saaro%20Driver&c=apps",
    appStore: "https://apps.apple.com/in/search?term=Saaro%20Driver",
  },
};

export type ServiceIcon = "building" | "road" | "truck";

export type Service = {
  id: "cityLimit" | "outstation" | "loadVehicles";
  icon: ServiceIcon;
  /** Rupee amount the "From" price starts at. */
  fromPrice: number;
  image: string;
  /** Focal point for the crop into the card's narrow image column. */
  imagePosition?: string;
};

export const services: Service[] = [
  { id: "cityLimit", icon: "building", fromPrice: 300, image: "/assets/img1.png" },
  { id: "outstation", icon: "road", fromPrice: 900, image: "/assets/img2.png" },
  {
    id: "loadVehicles",
    icon: "truck",
    fromPrice: 400,
    image: "/assets/img3.png",
    // This one is a full landscape photo, so centre the crop on the cab.
    imagePosition: "46% center",
  },
];

export type TravelPlanId =
  | "cityLimit"
  | "outstationReturn"
  | "outstationDrop"
  | "outstationHalt";

/** Each plan owns a colour family and a decorative glyph. */
export type TravelPlanTone = "amber" | "blue" | "green" | "purple";
export type TravelPlanArt = "bars" | "mountains" | "route" | "peaks";

export const travelPlans: {
  id: TravelPlanId;
  tone: TravelPlanTone;
  art: TravelPlanArt;
  fromPrice: number;
}[] = [
  { id: "cityLimit", tone: "amber", art: "bars", fromPrice: 300 },
  { id: "outstationReturn", tone: "blue", art: "mountains", fromPrice: 900 },
  { id: "outstationDrop", tone: "green", art: "route", fromPrice: 900 },
  { id: "outstationHalt", tone: "purple", art: "peaks", fromPrice: 900 },
];

export type FareVehicleId = "normal" | "load4" | "load6";

/**
 * Small vehicle photos for the fare tables. Their intrinsic sizes differ, so
 * each carries its own — a single shared box would stretch two of the three.
 */
export const fareVehicles: Record<
  FareVehicleId,
  { image: string; width: number; height: number }
> = {
  normal: { image: "/assets/vehicle-normal.png", width: 73, height: 32 },
  load4: { image: "/assets/vehicle-load4.png", width: 62, height: 30 },
  load6: { image: "/assets/vehicle-load6.png", width: 64, height: 30 },
};

export type FareRow = {
  vehicle: FareVehicleId;
  baseFare: number;
  perKm: number;
  perMinute: number;
  /** null means the minimum does not currently apply to this plan. */
  minDistanceKm: number | null;
};

export const fareTables: {
  plan: TravelPlanId;
  tone: TravelPlanTone;
  rows: FareRow[];
}[] = [
  {
    plan: "cityLimit",
    tone: "amber",
    rows: [
      { vehicle: "normal", baseFare: 300, perKm: 2, perMinute: 0.83, minDistanceKm: 50 },
      { vehicle: "load4", baseFare: 400, perKm: 2, perMinute: 0.83, minDistanceKm: 50 },
      { vehicle: "load6", baseFare: 600, perKm: 3, perMinute: 0.83, minDistanceKm: 50 },
    ],
  },
  {
    plan: "outstationReturn",
    tone: "blue",
    rows: [
      { vehicle: "normal", baseFare: 900, perKm: 0.7, perMinute: 0.83, minDistanceKm: 100 },
      { vehicle: "load4", baseFare: 1000, perKm: 2.5, perMinute: 1.16, minDistanceKm: 100 },
      { vehicle: "load6", baseFare: 1100, perKm: 2.5, perMinute: 1.66, minDistanceKm: 100 },
    ],
  },
  {
    plan: "outstationDrop",
    tone: "green",
    rows: [
      { vehicle: "normal", baseFare: 900, perKm: 0.7, perMinute: 0.83, minDistanceKm: 100 },
      { vehicle: "load4", baseFare: 1000, perKm: 2.5, perMinute: 1.16, minDistanceKm: 100 },
      { vehicle: "load6", baseFare: 1100, perKm: 2.5, perMinute: 1.66, minDistanceKm: 100 },
    ],
  },
  {
    plan: "outstationHalt",
    tone: "purple",
    rows: [
      { vehicle: "normal", baseFare: 900, perKm: 0.7, perMinute: 0.83, minDistanceKm: null },
      { vehicle: "load4", baseFare: 1000, perKm: 2.5, perMinute: 1.16, minDistanceKm: null },
      { vehicle: "load6", baseFare: 1100, perKm: 2.5, perMinute: 1.66, minDistanceKm: null },
    ],
  },
];

export type Step = {
  id: "book" | "arrive" | "drive" | "pay";
  number: number;
  /** Photograph, used by the winding-road layout on the home page. */
  image: string;
  /** Circular illustration with the step number drawn in, used by the row
   *  layout on the services page. */
  art: string;
};

/** Four stops along the road graphic in the "How It Works" section. */
export const steps: Step[] = [
  { id: "book", number: 1, image: "/assets/image1.png", art: "/assets/step-01.png" },
  { id: "arrive", number: 2, image: "/assets/image2.png", art: "/assets/step-02.png" },
  { id: "drive", number: 3, image: "/assets/image3.png", art: "/assets/step-03.png" },
  { id: "pay", number: 4, image: "/assets/image4.png", art: "/assets/step-04.png" },
];

export type ReasonIcon =
  | "userCheck"
  | "clipboard"
  | "globe"
  | "banknote"
  | "car"
  | "star";

export type Reason = {
  id: "verified" | "prices" | "language" | "cash" | "vehicles" | "rated";
  icon: ReasonIcon;
};

export const reasons: Reason[] = [
  { id: "verified", icon: "userCheck" },
  { id: "prices", icon: "clipboard" },
  { id: "language", icon: "globe" },
  { id: "cash", icon: "banknote" },
  { id: "vehicles", icon: "car" },
  { id: "rated", icon: "star" },
];

/**
 * The three reasons the services page leads with, in the order the design
 * shows them. Derived from `reasons` so the icons and copy keys stay in one
 * place — the two surfaces can never drift apart.
 */
export const serviceHighlights: Reason[] = (
  ["prices", "cash", "verified"] as const
).map((id) => reasons.find((reason) => reason.id === id)!);

/**
 * The pricing page leads with the same three promises, but the design gives
 * them their own glyphs — a shield and a star rather than the person and
 * banknote used elsewhere — so the icons are declared here while the copy is
 * still shared with `whyChoose`.
 */
export type PricingHighlightIcon = "shield" | "clipboard" | "star";

export const pricingHighlights: {
  id: "verified" | "prices" | "cash";
  icon: PricingHighlightIcon;
}[] = [
  { id: "verified", icon: "shield" },
  { id: "prices", icon: "clipboard" },
  { id: "cash", icon: "star" },
];

export type AppFeatureIcon = "clipboard" | "pin" | "star";

export const appFeatures: {
  id: "booking" | "tracking" | "rated";
  icon: AppFeatureIcon;
}[] = [
  { id: "booking", icon: "clipboard" },
  { id: "tracking", icon: "pin" },
  { id: "rated", icon: "star" },
];

export type AppDownloadId = "rider" | "driver";

export const appDownloads: { id: AppDownloadId }[] = [
  { id: "rider" },
  { id: "driver" },
];

/**
 * Artwork that is designed for but not yet delivered. Set an entry to its
 * asset path and intrinsic size and `ImageSlot` swaps the placeholder out —
 * no component change needed.
 */
export const pageImages: Record<
  | "aboutIntro"
  | "aboutStory"
  | "aboutCommitment"
  | "driveHero"
  | "driveSteps"
  | "driverBenefits"
  | "contactHero"
  | "contactMap",
  { src: string | null; width?: number; height?: number }
> = {
  aboutIntro: { src: null },
  aboutStory: { src: null },
  aboutCommitment: { src: "/assets/commitment.png", width: 631, height: 631 },
  contactHero: { src: "/assets/contact.png", width: 812, height: 613 },
  contactMap: { src: "/assets/map.png", width: 596, height: 855 },
  driveHero: { src: "/assets/drive-hero.png", width: 681, height: 495 },
  driveSteps: { src: "/assets/drive-steps.png", width: 478, height: 507 },
  driverBenefits: {
    src: "/assets/driver-benefits.png",
    width: 514,
    height: 563,
  },
};

export const driverRequirements: {
  id: "licence" | "age" | "id" | "record" | "smartphone" | "behaviour";
  /** All six are supplied, so these are required rather than nullable. */
  image: { src: string; width: number; height: number };
}[] = [
  { id: "licence", image: { src: "/assets/req-licence.png", width: 145, height: 148 } },
  { id: "age", image: { src: "/assets/req-age.png", width: 142, height: 152 } },
  { id: "id", image: { src: "/assets/req-id.png", width: 162, height: 153 } },
  { id: "record", image: { src: "/assets/req-record.png", width: 172, height: 153 } },
  {
    id: "smartphone",
    image: { src: "/assets/req-smartphone.png", width: 159, height: 153 },
  },
  {
    id: "behaviour",
    image: { src: "/assets/req-behaviour.png", width: 156, height: 153 },
  },
];

export const driverBenefitPoints: {
  id: "earnings" | "deductions" | "schedule" | "support" | "environment";
}[] = [
  { id: "earnings" },
  { id: "deductions" },
  { id: "schedule" },
  { id: "support" },
  { id: "environment" },
];

export const driveSteps: {
  id: "apply" | "verify" | "training" | "start";
}[] = [
  { id: "apply" },
  { id: "verify" },
  { id: "training" },
  { id: "start" },
];

export const driveBenefits: {
  id: "hours" | "payments" | "customers" | "coverage";
  image: { src: string | null; width?: number; height?: number };
}[] = [
  { id: "hours", image: { src: "/assets/benefit-hours.png", width: 192, height: 192 } },
  {
    id: "payments",
    image: { src: "/assets/benefit-payments.png", width: 192, height: 192 },
  },
  {
    id: "customers",
    image: { src: "/assets/benefit-customers.png", width: 192, height: 192 },
  },
  {
    id: "coverage",
    image: { src: "/assets/benefit-coverage.png", width: 192, height: 192 },
  },
];

export type DriveHighlightIcon = "clipboard" | "star" | "shield";

export const driveHighlights: {
  id: "earnings" | "hours" | "payouts";
  icon: DriveHighlightIcon;
}[] = [
  { id: "earnings", icon: "clipboard" },
  { id: "hours", icon: "star" },
  { id: "payouts", icon: "shield" },
];

export const commitments: {
  id: "safety" | "care" | "value" | "satisfaction";
}[] = [
  { id: "safety" },
  { id: "care" },
  { id: "value" },
  { id: "satisfaction" },
];

export const milestones: { id: "launch" | "chennai" | "statewide" | "today" }[] = [
  { id: "launch" },
  { id: "chennai" },
  { id: "statewide" },
  { id: "today" },
];

export type AboutStatIcon = "users" | "star" | "calendar" | "pin";

export const aboutStats: {
  id: "drivers" | "rating" | "since" | "coverage";
  icon: AboutStatIcon;
  tone: TravelPlanTone;
}[] = [
  { id: "drivers", icon: "users", tone: "amber" },
  { id: "rating", icon: "star", tone: "blue" },
  { id: "since", icon: "calendar", tone: "green" },
  { id: "coverage", icon: "pin", tone: "purple" },
];

export type ContactChannelIcon = "mail" | "whatsapp" | "pin";

/**
 * The ways to reach Saaro. `email` and `whatsapp` read their value from
 * `siteConfig`; `address` has no single value, so its lines live in the
 * dictionary and it renders without a link.
 */
export const contactChannels: {
  id: "email" | "whatsapp" | "address";
  icon: ContactChannelIcon;
  tone: TravelPlanTone;
}[] = [
  { id: "email", icon: "mail", tone: "blue" },
  { id: "whatsapp", icon: "whatsapp", tone: "green" },
  { id: "address", icon: "pin", tone: "purple" },
];

export type StatIcon = "user" | "star" | "idCard" | "calendar";

export const stats: {
  id: "drivers" | "ratings" | "documents" | "years";
  icon: StatIcon;
}[] = [
  { id: "drivers", icon: "user" },
  { id: "ratings", icon: "star" },
  { id: "documents", icon: "idCard" },
  { id: "years", icon: "calendar" },
];

export type DriverPerkIcon = "clock" | "banknote" | "crown" | "trendUp";

export const driverPerks: {
  id: "hours" | "payouts" | "rewards" | "growth";
  icon: DriverPerkIcon;
}[] = [
  { id: "hours", icon: "clock" },
  { id: "payouts", icon: "banknote" },
  { id: "rewards", icon: "crown" },
  { id: "growth", icon: "trendUp" },
];

export const testimonials: {
  id: "kumaran" | "thomas" | "meenakshi";
  /** Square headshot in public/assets, cropped to a circle by the card. */
  image: string;
}[] = [
  { id: "kumaran", image: "/assets/t1.png" },
  { id: "thomas", image: "/assets/t2.png" },
  { id: "meenakshi", image: "/assets/t3.png" },
];

/** Driver voices on the Drive page; reuses the same headshots as above. */
export const driverStories: { id: string; image: string }[] = [
  { id: "preethi", image: "/assets/t1.png" },
  { id: "prakash", image: "/assets/t2.png" },
  { id: "mani", image: "/assets/t3.png" },
];

export type NavLinkId =
  | "home"
  | "services"
  | "pricing"
  | "about"
  | "drive"
  | "contact"
  | "gallery";

/**
 * Appended to `/{locale}`. A leading slash marks a real route — those drive
 * the navbar's active state; the rest are in-page anchors on the home page.
 */
export const navLinks: { id: NavLinkId; href: string }[] = [
  { id: "home", href: "" },
  { id: "services", href: "/services" },
  { id: "pricing", href: "/pricing" },
  { id: "about", href: "/about" },
  { id: "drive", href: "/drive" },
  { id: "contact", href: "/contact" },
];

/** The footer repeats the header links and adds Gallery. */
export const footerQuickLinks: { id: NavLinkId; href: string }[] = [
  ...navLinks,
  { id: "gallery", href: "/gallery" },
];

export type TermsSectionId =
  | "who"
  | "provide"
  | "booking"
  | "fares"
  | "cancellations"
  | "customers"
  | "drivers"
  | "liability"
  | "changes"
  | "contact";

/**
 * Order and shape of the Terms page. `list` sections render their body as
 * bullet clauses; `prose` sections render one paragraph per entry. Numbering
 * comes from this order, so it is never restated in the copy.
 */
export const termsSections: {
  id: TermsSectionId;
  layout: "prose" | "list";
}[] = [
  { id: "who", layout: "prose" },
  { id: "provide", layout: "prose" },
  { id: "booking", layout: "list" },
  { id: "fares", layout: "list" },
  { id: "cancellations", layout: "prose" },
  { id: "customers", layout: "prose" },
  { id: "drivers", layout: "prose" },
  { id: "liability", layout: "prose" },
  { id: "changes", layout: "prose" },
  { id: "contact", layout: "prose" },
];

/**
 * Gallery photos, in display order. The mosaic shape repeats every four tiles
 * (tall, small, small, wide), so the position within a page decides the span —
 * adding photos never means restating the layout.
 */
export const galleryPhotos: {
  id: string;
  image: { src: string | null; width?: number; height?: number };
}[] = [
  { id: "coast", image: { src: "/assets/gallery-coast.png", width: 570, height: 600 } },
  { id: "wheel", image: { src: "/assets/gallery-wheel.png", width: 279, height: 294 } },
  {
    id: "highway",
    image: { src: "/assets/gallery-highway.png", width: 279, height: 294 },
  },
  { id: "falls", image: { src: "/assets/gallery-falls.png", width: 570, height: 294 } },
];

/** `href` stays null until each clip has somewhere to play. */
export const galleryVideos: {
  id: string;
  thumbnail: { src: string | null; width?: number; height?: number };
  href: string | null;
}[] = [
  { id: "places", thumbnail: { src: null }, href: null },
  { id: "training", thumbnail: { src: null }, href: null },
  { id: "office", thumbnail: { src: null }, href: null },
  { id: "safety", thumbnail: { src: null }, href: null },
  { id: "urban", thumbnail: { src: null }, href: null },
  { id: "highway", thumbnail: { src: null }, href: null },
];

export type ShippingSectionId = "goods" | "load" | "apps" | "contact";

export const shippingSections: {
  id: ShippingSectionId;
  layout: "prose" | "list";
}[] = [
  { id: "goods", layout: "prose" },
  { id: "load", layout: "prose" },
  { id: "apps", layout: "prose" },
  { id: "contact", layout: "prose" },
];

export const refundsSections: {
  id: "cancelling" | "refunds" | "noshows" | "how" | "contact";
  layout: "prose" | "list";
}[] = [
  { id: "cancelling", layout: "prose" },
  { id: "refunds", layout: "prose" },
  { id: "noshows", layout: "prose" },
  { id: "how", layout: "list" },
  { id: "contact", layout: "prose" },
];

export const privacySections: {
  id:
    | "collect"
    | "use"
    | "share"
    | "storage"
    | "choices"
    | "cookies"
    | "changes"
    | "contact";
  layout: "prose" | "list";
  /** Where a pending chip sits: beside the heading rather than under the body. */
  chip?: "heading";
}[] = [
  { id: "collect", layout: "list" },
  { id: "use", layout: "list" },
  { id: "share", layout: "prose" },
  { id: "storage", layout: "prose", chip: "heading" },
  { id: "choices", layout: "prose" },
  { id: "cookies", layout: "prose" },
  { id: "changes", layout: "prose" },
  { id: "contact", layout: "prose" },
];

export type LegalLinkId = "terms" | "privacy" | "refunds" | "shipping";

/** Appended to `/{locale}`, as the quick links are. */
export const legalLinks: { id: LegalLinkId; href: string }[] = [
  { id: "terms", href: "/terms" },
  { id: "privacy", href: "/privacy" },
  { id: "refunds", href: "/refunds" },
  { id: "shipping", href: "/shipping" },
];

export type SocialIcon = "facebook" | "instagram" | "youtube" | "whatsapp";

export const socialLinks: { icon: SocialIcon; label: string; href: string }[] = [
  { icon: "facebook", label: "Facebook", href: "#" },
  { icon: "instagram", label: "Instagram", href: "#" },
  { icon: "youtube", label: "YouTube", href: "#" },
  { icon: "whatsapp", label: "WhatsApp", href: "#" },
];
