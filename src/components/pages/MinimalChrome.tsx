"use client";

import { useChromeConfig } from "@/components/providers/ChromeContext";

const MINIMAL_CHROME = {
  showAnnouncement: false,
  showHeader: false,
  showFooter: false,
  showCookie: false,
} as const;

/** Hide storefront chrome for maintenance / coming-soon / bare utility templates. */
export function MinimalChrome() {
  useChromeConfig(MINIMAL_CHROME);
  return null;
}
