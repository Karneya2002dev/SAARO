import { cn } from "@/lib/cn";

/** Green eyebrow above a bold centred title — shared by every section. */
export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <header className={cn("text-center", className)}>
      <p className="text-[15px] font-semibold text-brand sm:text-[16px]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-balance text-h2 font-bold text-heading">
        {title}
      </h2>
    </header>
  );
}
