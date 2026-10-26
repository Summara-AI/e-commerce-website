"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type HorizontalRailNavProps = {
  onPrev: () => void;
  onNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  label?: string;
  className?: string;
};

/**
 * Floating carousel arrows — vertically centered on the rail, above scroll content.
 */
export function HorizontalRailNav({
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
  label = "carousel",
  className,
}: HorizontalRailNavProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 left-0 right-0 z-30",
        "flex items-center justify-between px-2 tablet:px-3 laptop:px-4",
        "top-0 bottom-10 tablet:bottom-12",
        className,
      )}
    >
      <RailArrow
        direction="prev"
        label={`Previous ${label}`}
        inactive={!canScrollPrev}
        onClick={onPrev}
      />
      <RailArrow
        direction="next"
        label={`Next ${label}`}
        inactive={!canScrollNext}
        onClick={onNext}
      />
    </div>
  );
}

function RailArrow({
  direction,
  label,
  inactive,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  inactive: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={inactive}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!inactive) onClick();
      }}
      className={cn(
        "pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full",
        "tablet:h-12 tablet:w-12",
        "border border-border-subtle bg-surface text-ink shadow-[0_8px_24px_-10px_rgba(17,17,17,0.45)]",
        "backdrop-blur-md backdrop-saturate-150",
        "transition-[transform,background-color,color,box-shadow,opacity,border-color] duration-280 ease-out",
        "hover:scale-105 hover:border-power-pink/50 hover:bg-power-pink hover:text-foreground-on-primary",
        "hover:shadow-[0_12px_28px_-10px_rgba(228,19,111,0.4)]",
        "active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        inactive && "cursor-default opacity-45 hover:scale-100 hover:border-border-subtle hover:bg-surface hover:text-ink hover:shadow-[0_8px_24px_-10px_rgba(17,17,17,0.45)]",
        "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
      )}
    >
      <Icon className="h-5 w-5 tablet:h-6 tablet:w-6" strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
