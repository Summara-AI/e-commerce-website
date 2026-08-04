/**
 * Floating UGC — premium social-proof journey.
 * Replace videoSrc when the client delivers final assets.
 */

export type UgcWidgetConfig = {
  videoSrc: string;
  videoSrcWebm?: string;
  posterSrc?: string;
  /** Delay before entrance (ms) */
  entranceDelayMs: number;
  /** Idle nudge after mount (ms) — once per session */
  nudgeAfterMs: number;
  nudgeVisibleMs: number;
  customerLabel: string;
  productName?: string;
  caption: string;
  hoverCta: string;
  nudgeLabel: string;
  ctaLabel: string;
  ctaHref: string;
  quote: string;
  customerName: string;
  rating: number;
  verifiedBadge: string;
  routineLabel: string;
  featuredProducts: { title: string; href: string }[];
  modalCtaLabel: string;
  modalCtaHref: string;
  ariaLabel: string;
};

export const HOME_UGC_WIDGET: UgcWidgetConfig = {
  videoSrc: "/media/ugc/customer-routine.mp4",
  posterSrc: undefined,
  entranceDelayMs: 2000,
  nudgeAfterMs: 15000,
  nudgeVisibleMs: 3000,
  customerLabel: "Verified Customer",
  productName: "Morning Glow Routine",
  caption: "Morning Glow Routine",
  hoverCta: "Watch 30 sec Routine →",
  nudgeLabel: "Watch a customer's routine",
  ctaLabel: "Shop this routine",
  ctaHref: "/pages/routine-builder",
  quote:
    "My skin finally feels calm and luminous — knowing every bottle is verified made me trust the ritual.",
  customerName: "Ayesha K.",
  rating: 5,
  verifiedBadge: "Verified Customer",
  routineLabel: "Morning glow routine · cleanser, toner, SPF",
  featuredProducts: [
    {
      title: "Haruharu Wonder Black Rice Hyaluronic Toner",
      href: "/products/haruharu-wonder-black-rice-hyaluronic-toner",
    },
    {
      title: "Escargot Original Facial Repair Cream",
      href: "/products/escargot-original-facial-repair-cream",
    },
  ],
  modalCtaLabel: "Shop this Routine",
  modalCtaHref: "/pages/routine-builder",
  ariaLabel: "Customer story video",
};

export const UGC_SESSION_KEYS = {
  dismissed: "ksl-ugc-dismissed",
  minimized: "ksl-ugc-minimized",
  nudgeShown: "ksl-ugc-nudge-shown",
  entered: "ksl-ugc-entered",
} as const;
