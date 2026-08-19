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
    <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-card">
      {/* The code and the name share a row; the badges take the card's whole
          width beneath them.

          They used to sit inside this text column, which cost them the 60px the
          code occupies and left the space under the code empty. Across the card
          they clear the 216px two of them need from a 360px phone up, instead of
          only from 412px — so the pair sits on one line on most phones and the
          card loses a row. */}
      <div className="flex items-start gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-md border border-black/10 p-0.75">
          <QrCode seed={name} className="size-full" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-tight text-heading">
            {name}
          </p>
          <p className="mt-1 text-[11px] leading-[1.35] text-muted">{blurb}</p>
        </div>
      </div>

      {/* `mt-auto` holds this to the card's base, so the badges of every card
          line up however far a blurb wraps. The query container is here rather
          than on the card, because this is the width the badges actually have. */}
      <div className="@container mt-auto pt-3">
        <StoreBadges app={app} dict={dict} />
      </div>
    </div>
  );
}
