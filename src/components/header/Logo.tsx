import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Kept for API compatibility — Brand Kit stays light; never dark inverse */
  inverse?: boolean;
  compact?: boolean;
};

/**
 * Brand logo — Cormorant Garamond 300 wordmark until SVG arrives.
 */
export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-[44px] items-center min-w-0",
        className,
      )}
      aria-label="Korean Skin Lab home"
    >
      <span
        className={cn(
          "font-display font-light italic tracking-[-0.01em] truncate text-ink",
          compact ? "text-lg" : "text-lg desktop:text-[1.35rem] tablet:text-xl",
        )}
      >
        Korean Skin Lab
      </span>
    </Link>
  );
}
