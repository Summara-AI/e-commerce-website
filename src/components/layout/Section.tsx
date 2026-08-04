import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  as?: "section" | "div" | "aside";
  children: React.ReactNode;
  className?: string;
  /** tight | default | lux — vertical rhythm tokens (on-scale only) */
  spacing?: "tight" | "default" | "lux";
  id?: string;
  "aria-labelledby"?: string;
  /** Once-only scroll reveal (default on for default/lux spacing) */
  reveal?: boolean;
};

const spacingClass = {
  tight: "py-10 tablet:py-12",
  default: "py-16 tablet:py-20 desktop:py-28",
  lux: "py-24 tablet:py-30 desktop:py-40",
} as const;

/**
 * Page section wrapper — intentional vertical rhythm + subtle scroll polish.
 */
export function Section({
  as: Tag = "section",
  children,
  className,
  spacing = "default",
  id,
  "aria-labelledby": ariaLabelledby,
  reveal,
}: SectionProps) {
  const shouldReveal = reveal ?? spacing !== "tight";

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(spacingClass[spacing], className)}
    >
      {shouldReveal ? <Reveal>{children}</Reveal> : children}
    </Tag>
  );
}
