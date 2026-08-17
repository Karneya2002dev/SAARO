import Link from "next/link";
import { Download } from "@/components/icons";
import { QrCode } from "@/components/ui/QrCode";

/** App download tile — shared by the "Get the app" panel and the footer. */
export function DownloadCard({
  name,
  blurb,
  cta,
}: {
  name: string;
  blurb: string;
  cta: string;
}) {
  return (
    <div className="flex h-full items-stretch gap-3 rounded-xl bg-white p-4 shadow-card">
      {/* The QR sits in its own bordered tile, as in the design. */}
      <div className="grid size-12 shrink-0 place-items-center self-start rounded-md border border-black/10 p-0.75">
        <QrCode seed={name} className="size-full" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[14px] font-semibold leading-tight text-heading">{name}</p>
        <p className="mt-1 text-[11px] leading-[1.35] text-muted">{blurb}</p>

        {/* Cards stretch to a shared height, so mt-auto puts both buttons on
            the same baseline however far each blurb wraps. */}
        <div className="mt-auto pt-3">
          <Link
            href="#"
            // Auto-height and wrapping rather than a fixed h-8 with nowrap:
            // the Tamil label is roughly twice as wide and would otherwise
            // spill straight out of the card.
            className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-left text-[11px] font-medium text-white transition-colors hover:bg-brand-dark"
          >
            <Download className="size-3.5 shrink-0" />
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
