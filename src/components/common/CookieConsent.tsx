"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ksl-cookie-consent";

type CookieConsentProps = {
  className?: string;
  privacyHref?: string;
};

export function CookieConsent({
  className,
  privacyHref = "/policies/privacy-policy",
}: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  useFocusTrap(visible, panelRef);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        /* Escape keeps essential-only path — user can revisit via policy */
        try {
          localStorage.setItem(STORAGE_KEY, "essential");
        } catch {
          /* ignore */
        }
        setVisible(false);
        window.dispatchEvent(new CustomEvent("ksl:cookie-consent-change"));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent("ksl:cookie-consent-change"));
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "essential");
    } catch {
      /* ignore */
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent("ksl:cookie-consent-change"));
  };

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "fixed bottom-4 left-4 z-toast max-w-[min(24rem,calc(100vw-8.5rem-env(safe-area-inset-right)))] rounded-card border border-border-subtle bg-surface p-5 shadow-elev3",
        "tablet:bottom-6 tablet:left-6 tablet:max-w-xl",
        "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
        "pr-[max(1.25rem,env(safe-area-inset-right))]",
        className,
      )}
    >
      <p
        id={titleId}
        className="font-display text-lg font-light italic text-foreground"
      >
        Cookies
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
        We use essential cookies to run the store and optional cookies to improve
        your experience. See our{" "}
        <Link
          href={privacyHref}
          className="font-medium text-power-pink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 tablet:flex-row">
        <Button onClick={accept} className="tablet:flex-1">
          Accept
        </Button>
        <Button variant="secondary" onClick={decline} className="tablet:flex-1">
          Essential only
        </Button>
      </div>
    </div>
  );
}
