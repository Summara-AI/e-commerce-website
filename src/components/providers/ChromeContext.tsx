"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ChromeConfig = {
  showAnnouncement: boolean;
  showHeader: boolean;
  showFooter: boolean;
  showCookie: boolean;
};

const DEFAULT_CHROME: ChromeConfig = {
  showAnnouncement: true,
  showHeader: true,
  showFooter: true,
  showCookie: true,
};

type ChromeContextValue = {
  chrome: ChromeConfig;
  setChrome: (next: Partial<ChromeConfig>) => void;
  resetChrome: () => void;
};

const ChromeContext = createContext<ChromeContextValue | null>(null);

export function ChromeProvider({ children }: { children: React.ReactNode }) {
  const [chrome, setChromeState] = useState<ChromeConfig>(DEFAULT_CHROME);

  const setChrome = useCallback((next: Partial<ChromeConfig>) => {
    setChromeState((prev) => ({ ...prev, ...next }));
  }, []);

  const resetChrome = useCallback(() => {
    setChromeState(DEFAULT_CHROME);
  }, []);

  const value = useMemo(
    () => ({ chrome, setChrome, resetChrome }),
    [chrome, setChrome, resetChrome],
  );

  return <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>;
}

export function useChrome() {
  const ctx = useContext(ChromeContext);
  if (!ctx) {
    throw new Error("useChrome must be used within ChromeProvider");
  }
  return ctx;
}

/**
 * Apply minimal/full chrome for a route. Resets on unmount.
 */
export function useChromeConfig(config: Partial<ChromeConfig>) {
  const { setChrome, resetChrome } = useChrome();
  const {
    showAnnouncement = true,
    showHeader = true,
    showFooter = true,
    showCookie = true,
  } = config;

  useEffect(() => {
    setChrome({ showAnnouncement, showHeader, showFooter, showCookie });
    return () => resetChrome();
  }, [
    setChrome,
    resetChrome,
    showAnnouncement,
    showHeader,
    showFooter,
    showCookie,
  ]);
}
