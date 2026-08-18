import { QrCode } from "@/components/ui/QrCode";
import { StoreBadges } from "@/components/ui/StoreBadges";
import type { AppDownloadId } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";

/** App download tile — shared by the "Get the app" panel and the footer. */
export function DownloadCard({
  app,
  dict,
}: {
  app: AppDownloadId;
  dict: Dictionary["downloads"];
}) {
  const { name, blurb } = dict.items[app];

  return (
    <div className="flex h-full items-stretch gap-3 rounded-xl bg-white p-4 shadow-card">
      {/* The QR sits in its own bordered tile, as in the design. */}
      <div className="grid size-12 shrink-0 place-items-center self-start rounded-md border border-black/10 p-0.75">
        <QrCode seed={name} className="size-full" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[14px] font-semibold leading-tight text-heading">{name}</p>
        <p className="mt-1 text-[11px] leading-[1.35] text-muted">{blurb}</p>

        {/* Cards stretch to a shared height, so mt-auto puts the badges of
            every card on the same baseline however far each blurb wraps. */}
        <div className="mt-auto pt-3">
          <StoreBadges app={app} dict={dict} />
        </div>
      </div>
    </div>
  );
}
