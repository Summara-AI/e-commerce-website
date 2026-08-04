import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type HeaderIconButtonProps = {
  label: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-haspopup"?: boolean | "dialog" | "menu";
  type?: "button" | "submit";
};

/**
 * Touch-friendly header control — button or link.
 * Min 44×44 for WCAG target size.
 */
export const HeaderIconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  HeaderIconButtonProps
>(function HeaderIconButton(
  {
    label,
    className,
    href,
    onClick,
    children,
    type = "button",
    ...aria
  },
  ref,
) {
  const classes = cn(
    "relative inline-flex h-11 w-11 items-center justify-center rounded-badge",
    "text-ink transition-[color,background-color,transform] duration-200 ease-out",
    "hover:bg-pink-mist hover:text-power-pink hover:scale-105 active:scale-100",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
    "motion-reduce:transform-none motion-reduce:hover:scale-100",
    "[&_svg]:transition-colors [&_svg]:duration-200",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={label}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      aria-label={label}
      onClick={onClick}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...aria}
    >
      {children}
    </button>
  );
});
