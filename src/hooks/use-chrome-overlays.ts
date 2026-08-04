"use client";

import { useEffect, useState } from "react";

export type ChromeOverlayDetail = {
  search?: boolean;
  nav?: boolean;
};

const EVENT = "ksl:chrome-overlay";

/** Header / chrome emits this so floating UI can hide or yield. */
export function emitChromeOverlay(detail: ChromeOverlayDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail }));
}

/**
 * Subscribe to search drawer / mobile nav open state for floating widgets.
 */
export function useChromeOverlays() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onOverlay = (event: Event) => {
      const detail = (event as CustomEvent<ChromeOverlayDetail>).detail;
      if (typeof detail?.search === "boolean") setSearchOpen(detail.search);
      if (typeof detail?.nav === "boolean") setNavOpen(detail.nav);
    };
    window.addEventListener(EVENT, onOverlay);
    return () => window.removeEventListener(EVENT, onOverlay);
  }, []);

  return { searchOpen, navOpen, chromeBlocking: searchOpen || navOpen };
}
