"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { evaluatePassword } from "@/lib/auth/password";
import { cn } from "@/lib/utils";

type PasswordStrengthProps = {
  password: string;
  className?: string;
};

/**
 * Live password guidance — animated checks as each rule is met.
 */
export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const reduceMotion = useReducedMotion();
  const { results } = evaluatePassword(password);
  const visible = password.length > 0;

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.ul
          key="rules"
          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={cn("space-y-2 overflow-hidden pt-1", className)}
          aria-live="polite"
        >
          {results.map((rule) => (
            <li
              key={rule.id}
              className={cn(
                "flex items-center gap-2 text-caption font-light transition-colors duration-280",
                rule.met ? "text-emerald-700" : "text-foreground-muted",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-4 w-4 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-280",
                  rule.met
                    ? "scale-100 border-emerald-600 bg-emerald-600 text-white"
                    : "border-border-default bg-transparent",
                )}
                aria-hidden="true"
              >
                <AnimatePresence>
                  {rule.met ? (
                    <motion.span
                      key="ok"
                      initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </span>
              <span>
                <span className="sr-only">
                  {rule.met ? "Met: " : "Not met: "}
                </span>
                {rule.label}
              </span>
            </li>
          ))}
        </motion.ul>
      ) : null}
    </AnimatePresence>
  );
}
