"use client";

import dynamic from "next/dynamic";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CookieConsent } from "@/components/common/CookieConsent";
import { useChrome } from "@/components/providers/ChromeContext";
import { cn } from "@/lib/utils";

/** Non-critical — deferred so Framer/Radix/video stay out of the initial bundle */
const FloatingUgcWidget = dynamic(
  () =>
    import("@/components/ugc/FloatingUgcWidget").then((m) => m.FloatingUgcWidget),
  { ssr: false, loading: () => null },
);

type SiteShellProps = {
  children: React.ReactNode;
  transparentHeader?: boolean;
  wishlistCount?: number;
  className?: string;
};

/**
 * Global storefront chrome shared by every page.
 * Utility routes can hide chrome via ChromeProvider / useChromeConfig.
 */
export function SiteShell({
  children,
  transparentHeader = false,
  wishlistCount = 0,
  className,
}: SiteShellProps) {
  const { chrome } = useChrome();

  return (
    <div
      className={cn(
        "flex min-h-screen min-h-[100dvh] flex-col scroll-smooth",
        className,
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {chrome.showAnnouncement ? <AnnouncementBar /> : null}

      {chrome.showHeader ? (
        <Header
          transparentAtTop={transparentHeader}
          wishlistCount={wishlistCount}
        />
      ) : null}

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 outline-none"
      >
        {children}
      </main>

      {chrome.showFooter ? <Footer /> : null}
      {chrome.showCookie ? <CookieConsent /> : null}
      {chrome.showHeader ? <FloatingUgcWidget /> : null}
    </div>
  );
}
