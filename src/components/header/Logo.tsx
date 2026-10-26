import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Kept for API compatibility — the SCYN plate stays legible on imagery */
  inverse?: boolean;
  compact?: boolean;
  /** Wordmark for chrome, complete lockup for splash / footer moments */
  variant?: "wordmark" | "complete";
  priority?: boolean;
};

const WORDMARK = {
  src: "/media/brand/scyn-wordmark.png",
  width: 336,
  height: 93,
} as const;

const COMPLETE = {
  src: "/media/brand/scyn-complete.png",
  width: 336,
  height: 226,
} as const;

/**
 * Official SCYN logo lockup.
 * The supplied transparent artwork is ivory, so it sits on an exact-magenta
 * brand plate to guarantee contrast on light, dark, and image-backed surfaces.
 */
export function Logo({
  className,
  compact = false,
  variant = "wordmark",
  priority = false,
}: LogoProps) {
  const isComplete = variant === "complete";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-[44px] min-w-0 items-center",
        className,
      )}
      aria-label="SCYN — Skincare You Need, home"
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-sm bg-scyn-magenta shadow-elev1",
          isComplete
            ? "p-4"
            : compact
              ? "px-2.5 py-1.5"
              : "px-3 py-1.5 tablet:px-3.5",
        )}
      >
        <Image
          src={isComplete ? COMPLETE.src : WORDMARK.src}
          alt=""
          width={isComplete ? COMPLETE.width : WORDMARK.width}
          height={isComplete ? COMPLETE.height : WORDMARK.height}
          priority={priority}
          sizes={isComplete ? "200px" : compact ? "80px" : "100px"}
          className={cn(
            "block select-none",
            isComplete
              ? "h-auto w-[11.5rem] tablet:w-[12.5rem]"
              : cn(
                  "w-auto",
                  compact
                    ? "h-[1.125rem]"
                    : "h-[1.25rem] tablet:h-[1.5rem]",
                ),
          )}
        />
      </span>
    </Link>
  );
}
