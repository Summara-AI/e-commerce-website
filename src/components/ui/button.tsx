import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Primary — soft lift + richer shadow, never theatrical */
const primaryMotion =
  "transition-[color,background-color,border-color,box-shadow,transform,filter,opacity] duration-280 ease-out will-change-transform hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-elev2 hover:brightness-[1.03] active:translate-y-0 active:scale-[0.99] active:shadow-elev1 motion-reduce:transform-none motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none motion-reduce:hover:brightness-100";

const surfaceMotion =
  "transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-280 ease-out hover:-translate-y-px hover:shadow-elev1 active:translate-y-0 active:shadow-none motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button font-sans text-sm font-medium tracking-[0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:translate-y-0 disabled:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: cn(
          "bg-power-pink text-foreground-on-primary hover:bg-power-pink-hover",
          primaryMotion,
        ),
        secondary: cn("bg-pearl text-ink hover:bg-blush", surfaceMotion),
        outline: cn(
          "border-[1.5px] border-border-outline bg-transparent text-ink hover:bg-blush",
          surfaceMotion,
        ),
        ghost:
          "bg-transparent text-ink transition-colors duration-200 ease-out hover:bg-pink-mist hover:text-power-pink",
        text: cn(
          "bg-transparent px-0 text-power-pink",
          "link-underline underline-offset-[5px]",
          "hover:text-power-pink-hover",
        ),
        soft: cn(
          "bg-soft-pink text-soft-pink-text hover:brightness-[1.03]",
          surfaceMotion,
        ),
        pearl: cn("bg-pearl text-ink hover:bg-blush", surfaceMotion),
        destructive: cn(
          "bg-soft-pink text-soft-pink-text hover:brightness-[1.03]",
          surfaceMotion,
        ),
      },
      size: {
        sm: "h-11 min-h-[44px] px-5",
        md: "h-12 min-h-[48px] px-7",
        lg: "h-14 min-h-[56px] px-9",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
              aria-hidden="true"
            />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
