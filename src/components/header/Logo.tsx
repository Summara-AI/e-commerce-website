import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Kept for API compatibility. */
  inverse?: boolean;
  compact?: boolean;
  /** Chrome lockup: SCYN wordmark. Complete lockup for splash / footer moments. */
  variant?: "wordmark" | "complete";
  priority?: boolean;
};

const COMPLETE = {
  src: "/media/brand/scyn-complete.png",
  width: 336,
  height: 226,
} as const;

/**
 * Official SCYN logo lockup.
 * Chrome usage: transparent, magenta, slightly oversized for readability.
 */
export function Logo({
  className,
  compact = false,
  variant = "wordmark",
  priority = false,
}: LogoProps) {
  const isComplete = variant === "complete";

  if (isComplete) {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex min-h-[44px] min-w-0 items-center",
          className,
        )}
        aria-label="SCYN — Skincare You Need, home"
      >
        <span className="inline-flex items-center justify-center rounded-sm bg-scyn-magenta p-4 shadow-elev1">
          <Image
            src={COMPLETE.src}
            alt=""
            width={COMPLETE.width}
            height={COMPLETE.height}
            priority={priority}
            sizes="200px"
            className="block h-auto w-[11.5rem] select-none tablet:w-[12.5rem]"
          />
        </span>
      </Link>
    );
  }

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
        aria-hidden="true"
        className={cn(
          "select-none bg-scyn-magenta",
          "[mask-image:url('/media/brand/scyn-wordmark.png')] [-webkit-mask-image:url('/media/brand/scyn-wordmark.png')]",
          "[mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]",
          "[-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]",
          compact
            ? "aspect-[336/93] h-[1.375rem]"
            : "aspect-[336/93] h-[1.875rem] tablet:h-[2.125rem] desktop:h-[2.375rem]",
        )}
      />
    </Link>
  );
}
