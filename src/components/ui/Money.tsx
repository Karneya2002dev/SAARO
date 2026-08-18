import { Fragment } from "react";
import { Rupee } from "@/components/icons";
import { cn } from "@/lib/cn";

const RUPEE = "₹";

/** The drawn sign plus the character behind it, for assistive tech and copy. */
function Sign({ className }: { className?: string }) {
  return (
    <>
      <Rupee className={cn("h-[0.78em] w-auto", className)} />
      {/* The drawn sign is aria-hidden, so without this a screen reader would
          read "300" with no currency. It also puts the character back into a
          text selection, so copying a price still yields "₹300". */}
      <span className="sr-only">{RUPEE}</span>
    </>
  );
}

/**
 * Whole rupees bare, anything else to the paisa — so ₹2 and ₹0.70 both read as
 * deliberate rather than truncated.
 *
 * Separate from the component because a few callers need the digits on their
 * own, without a currency mark in front of them.
 */
export function formatAmount(amount: number) {
  return Number.isInteger(amount)
    ? amount.toLocaleString("en-IN")
    : amount.toFixed(2);
}

/**
 * An amount with the rupee sign drawn as {@link Rupee} rather than set as the
 * ₹ character.
 *
 * Poppins carries no rupee glyph, so the character falls through to whatever
 * the OS supplies — which arrives at a different weight and on a different
 * baseline from the numerals beside it, and differs by platform. Drawing it
 * keeps one mark everywhere.
 *
 * Sized in `em` and centred against the digits, so it tracks the type at every
 * size and weight without the caller doing anything. `whitespace-nowrap` keeps
 * the mark from being left at the end of a line on its own.
 */
export function Money({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.08em] whitespace-nowrap",
        className,
      )}
    >
      <Sign className="shrink-0" />
      {formatAmount(amount)}
    </span>
  );
}

/**
 * The same drawn sign, for copy that carries an amount inside a translated
 * string — "City trips from ₹300." — where the number cannot be passed to
 * {@link Money} without splitting the sentence in the dictionary.
 *
 * Sits on the text baseline rather than being centred, since here it runs in
 * type rather than in its own box. Strings with no rupee in them pass straight
 * through, so callers can apply it to a whole set of labels blindly.
 */
export function RupeeText({ text }: { text: string }) {
  if (!text.includes(RUPEE)) return <>{text}</>;

  return (
    <>
      {text.split(RUPEE).map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <Sign className="inline align-baseline" />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
