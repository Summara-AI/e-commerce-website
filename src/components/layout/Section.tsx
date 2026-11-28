import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  as?: "section" | "div" | "aside";
  children: React.ReactNode;
  className?: string;
  /** Simpler rhythm — bottom padding is shared across every variant. */
  spacing?: "tight" | "default" | "lux";
  /**
   * default → 64/80/96px top; compact → 24/32px directly under a sticky header;
   * none → no top padding (adjacent sections share the previous section's bottom).
   */
  topSpacing?: "default" | "compact" | "none";
  id?: string;
  "aria-labelledby"?: string;
  /** Once-only scroll reveal (default on for default/lux spacing) */
  reveal?: boolean;
};

const bottomPadding = {
  tight: "pb-16 tablet:pb-20 desktop:pb-24",
  default: "pb-16 tablet:pb-20 desktop:pb-24",
  lux: "pb-16 tablet:pb-20 desktop:pb-24",
} as const;

const topPadding = {
  default: "pt-16 tablet:pt-20 desktop:pt-24",
  compact: "pt-6 tablet:pt-8",
  none: "",
} as const;

/**
 * Page section wrapper — one vertical rhythm for the whole site.
 */
export function Section({
  as: Tag = "section",
  children,
  className,
  spacing = "default",
  topSpacing = "default",
  id,
  "aria-labelledby": ariaLabelledby,
  reveal,
}: SectionProps) {
  const shouldReveal = reveal ?? spacing !== "tight";

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(bottomPadding[spacing], topPadding[topSpacing], className)}
    >
      {shouldReveal ? <Reveal>{children}</Reveal> : children}
    </Tag>
  );
}
