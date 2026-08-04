"use client";

import { useEffect, useState } from "react";

/** Media query helper for breakpoint-aware interactions */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1280px)");
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}
