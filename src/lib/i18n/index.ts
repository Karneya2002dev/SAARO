import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { ta } from "./dictionaries/ta";

/**
 * Statically imported rather than lazily `import()`-ed.
 *
 * The lazy form is what the Next guide shows, and its purpose is to keep
 * translation files out of the *client* bundle. That is already guaranteed
 * here: these modules are only ever reached through `getDictionary`, which
 * reads a root param and therefore cannot run in a Client Component. The one
 * client-side reference — the navbar's `Dictionary` type — is `import type`,
 * so it is erased at compile time.
 *
 * The lazy form did cost something, though: a dynamically imported module sits
 * behind an indirection the dev server does not reliably invalidate, so edits
 * to a dictionary kept serving the previously compiled copy until a restart.
 * A static edge is tracked properly.
 */
const dictionaries: Record<Locale, Dictionary> = { en, ta };

/**
 * Resolves the locale from the `[lang]` root segment, so Server Components
 * deep in the tree can read copy without it being threaded through props.
 * Server-only — Client Components must receive their slice as a prop.
 */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!locale || !hasLocale(locale)) notFound();
  return locale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}

export type { Dictionary };
