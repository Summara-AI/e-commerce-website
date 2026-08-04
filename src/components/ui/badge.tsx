import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-badge px-2.5 py-1 font-sans text-caption font-medium uppercase tracking-[0.1em] shadow-[0_1px_0_rgba(42,26,34,0.03)]",
  {
    variants: {
      variant: {
        default: "bg-pearl text-ink",
        sale: "bg-pink-mist text-foreground-sale",
        new: "bg-pink-mist text-power-pink",
        outline: "border border-border-subtle bg-canvas/95 text-foreground-nav shadow-none",
        celadon: "bg-pink-mist text-power-pink",
        authentic: "bg-canvas/95 text-power-pink border border-border-subtle",
        soft: "bg-soft-pink text-soft-pink-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
