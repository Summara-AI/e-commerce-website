"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Skip animation (e.g. above-the-fold heroes that animate elsewhere) */
  disabled?: boolean;
  /** Directional entrance — still opacity + transform only */
  variant?: "up" | "left" | "right" | "scale";
  /** Apply staggered entrance to direct children */
  stagger?: boolean;
};

/**
 * Once-only scroll reveal — opacity + translate via GPU transforms.
 */
export function Reveal({
  children,
  className,
  disabled,
  variant = "up",
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-ready",
        variant === "left" && "reveal-from-left",
        variant === "right" && "reveal-from-right",
        variant === "scale" && "reveal-scale",
        stagger && "reveal-stagger",
        visible && "reveal-in",
        className,
      )}
    >
      {children}
    </div>
  );
}
