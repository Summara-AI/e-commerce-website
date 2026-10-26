import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-input border bg-canvas px-5 text-base font-light text-foreground",
          "placeholder:text-foreground-nav placeholder:font-light",
          "transition-[border-color,box-shadow,background-color] duration-200 ease-out",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
          "focus-visible:shadow-[0_0_0_4px_rgba(228,19,111,0.12)]",
          "disabled:cursor-not-allowed disabled:opacity-40",
          error
            ? "border-destructive text-destructive focus-visible:shadow-[0_0_0_4px_rgba(139,0,64,0.12)]"
            : "border-border-subtle focus-visible:border-border-focus",
          className,
        )}
        aria-invalid={error || undefined}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
