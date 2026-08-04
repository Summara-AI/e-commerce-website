/**
 * Client-safe event dispatcher stub — no-ops until pixels are installed.
 * Intentionally silent in production (no console noise).
 */

import { ANALYTICS_EVENTS, type AnalyticsEventName } from "./config";

export type TrackPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(_name: AnalyticsEventName, _payload?: TrackPayload) {
  // Phase 11C+: window.dataLayer / fbq / ttq after consent — no logging here
}

export function trackPageView(path: string) {
  trackEvent(ANALYTICS_EVENTS.pageView, { path });
}

export { ANALYTICS_EVENTS };
