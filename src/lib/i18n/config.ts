export const locales = ["en", "ta"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Label shown on each side of the navbar toggle. */
export const localeLabels: Record<Locale, string> = {
  ta: "தமிழ்",
  en: "EN",
};
