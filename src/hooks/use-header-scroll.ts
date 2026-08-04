"use client";

import { useEffect, useState } from "react";

type HeaderScrollState = {
  scrolled: boolean;
  hidden: boolean;
};

/**
 * Sticky header scroll behavior — solidify on scroll, hide on downward scroll.
 * rAF-batched; only commits when scrolled/hidden actually change (INP-friendly).
 */
export function useHeaderScroll(options?: { locked?: boolean; hideOffset?: number }) {
  const locked = options?.locked ?? false;
  const hideOffset = options?.hideOffset ?? 96;
  const [state, setState] = useState<HeaderScrollState>({
    scrolled: false,
    hidden: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    let prevScrolled = false;
    let prevHidden = false;

    const commit = (scrolled: boolean, hidden: boolean) => {
      if (scrolled === prevScrolled && hidden === prevHidden) return;
      prevScrolled = scrolled;
      prevHidden = hidden;
      setState({ scrolled, hidden });
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const scrolled = y > 8;

        if (locked) {
          commit(scrolled, false);
          lastY = y;
          return;
        }

        const goingDown = y > lastY && y > hideOffset;
        commit(scrolled, goingDown);
        lastY = y;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [hideOffset, locked]);

  return state;
}
