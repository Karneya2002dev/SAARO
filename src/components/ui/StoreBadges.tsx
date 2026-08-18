import { AppleLogo, GooglePlay } from "@/components/icons";
import { appStoreLinks, type AppDownloadId } from "@/lib/content";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n";

/**
 * The two app-store badges for one app, laid out in the familiar dark pill:
 * store mark, a small line of lead-in, then the store's name.
 *
 * The two are deliberately identical boxes. Laying them out as grid tracks
 * rather than flex items is what guarantees it — grid tracks are sized from the
 * container, so neither badge can be pulled wider by its own label, and cells in
 * a row share one height. They also share a single lead-in line for the same
 * reason: the stores' own wordings ("Get it on" against "Download on the") are
 * different lengths, and in Tamil different enough to wrap one badge and not the
 * other.
 *
 * Both stores read their URL from {@link appStoreLinks}, and a store set to
 * `null` there is simply not rendered — so an Android-only app shows one badge
 * without the caller knowing anything about it.
 *
 * Sizes come in two steps because the badges appear both inside the narrow
 * download cards and on their own under a form.
 */
export function StoreBadges({
  app,
  dict,
  size = "sm",
  className,
}: {
  app: AppDownloadId;
  dict: Dictionary["downloads"];
  size?: "sm" | "md";
  className?: string;
}) {
  const links = appStoreLinks[app];

  const iconSize = size === "sm" ? "size-4" : "size-5";

  const stores = [
    {
      key: "playStore" as const,
      href: links.playStore,
      name: dict.googlePlay,
      icon: <GooglePlay className={iconSize} />,
    },
    {
      key: "appStore" as const,
      href: links.appStore,
      name: dict.appStore,
      icon: <AppleLogo className={iconSize} />,
    },
  ].filter((store) => store.href);

  if (!stores.length) return null;

  return (
    <div
      className={cn(
        // Equal tracks, and one row height shared by both cells.
        "grid gap-2",
        stores.length > 1 &&
          (size === "sm"
            /* Side by side as soon as the card can hold two, stacked when it
               cannot. A container query rather than a breakpoint because these
               cards appear in six different columns — full width on a phone,
               a 265px footer column, a 217px xl column — and the page width
               says nothing about which. */
            ? "@min-[216px]:grid-cols-2"
            : "grid-cols-2"),
        className,
      )}
    >
      {stores.map((store) => (
        <a
          key={store.key}
          href={store.href as string}
          // Leaving the site, so both are required: `noopener` denies the new
          // page a handle on this one, `noreferrer` keeps the path in.
          target="_blank"
          rel="noopener noreferrer"
          /* Height is a floor, not a fixed size, so a label is free to wrap. */
          className={cn(
            "flex items-center gap-2 rounded-lg bg-heading text-white transition-colors hover:bg-black",
            size === "sm" ? "min-h-8 px-2 py-1" : "min-h-11 px-3.5 py-2",
          )}
        >
          <span className={cn("grid shrink-0 place-items-center", iconSize)}>
            {store.icon}
          </span>
          <span className="flex min-w-0 flex-col items-start leading-none">
            {size === "sm" ? null : (
              <span className="text-[8px] font-medium uppercase tracking-[0.06em] text-white/70">
                {dict.getItOn}
              </span>
            )}
            <span
              className={cn(
                "font-semibold leading-tight",
                size === "sm" ? "text-[11px]" : "mt-0.5 text-[13px]",
              )}
            >
              {store.name}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
