"use client";

/**
 * AnalyticsProvider — install points only.
 * Renders nothing; does not load third-party scripts until a later phase
 * explicitly enables loaders after consent.
 */

type AnalyticsProviderProps = {
  children: React.ReactNode;
};

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return <>{children}</>;
}
