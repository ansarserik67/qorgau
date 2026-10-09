import Link from "next/link";

/**
 * QORGAU brand mark.
 *
 * Icon concept: a protective shield outline containing two converging road
 * lines with a small amber warning point where the road narrows — the moment
 * a hazard is detected ahead. Recognisable at 16 px, works on dark and light
 * backgrounds. Pure inline SVG, no emoji, no image assets.
 */

interface LogoProps {
  /** "dark" = dark ink for light backgrounds, "light" = white for navy. */
  variant?: "dark" | "light";
  /** Hide the wordmark (used where space is tight). */
  iconOnly?: boolean;
  className?: string;
  /** Wrap in a link to the home page (default true). */
  linkHome?: boolean;
}

export function LogoMark({
  variant = "dark",
  size = 30,
}: {
  variant?: "dark" | "light";
  size?: number;
}) {
  const stroke = variant === "light" ? "#FFFFFF" : "#101C2C";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Shield — protection geometry */}
      <path
        d="M16 2.6 L27.4 6.3 V15.4 C27.4 22.4 22.4 27.4 16 29.4 C9.6 27.4 4.6 22.4 4.6 15.4 V6.3 Z"
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {/* Converging road lines */}
      <path
        d="M11.8 25.2 L14.5 10.4"
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M20.2 25.2 L17.5 10.4"
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* Amber warning point at the detection focus */}
      <circle cx="16" cy="15.2" r="2.5" fill="#F5A623" />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  iconOnly = false,
  className = "",
  linkHome = true,
}: LogoProps) {
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} size={30} />
      {!iconOnly && (
        <span
          className={`font-display text-[19px] font-extrabold tracking-[0.16em] ${
            variant === "light" ? "text-white" : "text-navy"
          }`}
        >
          QORGAU
        </span>
      )}
    </span>
  );

  if (!linkHome) return mark;

  return (
    <Link
      href="/"
      aria-label="QORGAU — home"
      className="inline-flex items-center rounded-md transition-opacity hover:opacity-85"
    >
      {mark}
    </Link>
  );
}
