"use client";

import { Check } from "lucide-react";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type LoginFloatingFieldProps = {
  id?: string;
  name: string;
  label: string;
  type?: "email" | "password" | "text" | "tel";
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  required?: boolean;
  describedBy?: string;
  className?: string;
};

/**
 * Premium floating-label field — large touch target, pink focus glow, shake on error.
 */
export function LoginFloatingField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  inputMode,
  disabled,
  error,
  success,
  required = true,
  describedBy,
  className,
}: LoginFloatingFieldProps) {
  const uid = useId();
  const fieldId = id ?? `${name}-${uid}`;
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotion();
  const floated = focused || value.length > 0;

  return (
    <motion.div
      className={cn("relative", className)}
      animate={
        error && !reduceMotion
          ? { x: [0, -6, 6, -4, 4, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "relative rounded-input border bg-blush/35 transition-[border-color,box-shadow,background-color] duration-300 ease-out",
          error
            ? "border-destructive shadow-[0_0_0_4px_rgba(139,0,64,0.1)]"
            : focused
              ? "border-power-pink bg-canvas shadow-[0_0_0_4px_rgba(228,19,111,0.12)]"
              : success
                ? "border-border-subtle bg-canvas"
                : "border-border-subtle hover:border-border-default hover:bg-canvas/70",
        )}
      >
        <label
          htmlFor={fieldId}
          className={cn(
            "pointer-events-none absolute left-5 z-[1] origin-left font-sans font-light text-foreground-nav",
            "transition-[transform,font-size,color,top] duration-280 ease-out",
            floated
              ? "top-2.5 text-[0.68rem] tracking-[0.06em] text-power-pink"
              : "top-1/2 -translate-y-1/2 text-base",
          )}
        >
          {label}
        </label>
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={error || undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "peer h-16 w-full rounded-input bg-transparent px-5 pb-2.5 pt-6 text-base font-light text-foreground",
            "outline-none transition-opacity duration-200",
            "disabled:cursor-not-allowed disabled:opacity-60",
            success && "pr-12",
          )}
        />
        {success ? (
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-emerald-700"
            aria-hidden="true"
          >
            <Check className="h-5 w-5" strokeWidth={1.75} />
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
