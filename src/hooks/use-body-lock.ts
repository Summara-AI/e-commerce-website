"use client";

import { useEffect } from "react";

/** Locks document scroll while overlays are open */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.navOpen = "true";
    return () => {
      document.body.style.overflow = previous;
      document.body.dataset.navOpen = "false";
    };
  }, [locked]);
}
