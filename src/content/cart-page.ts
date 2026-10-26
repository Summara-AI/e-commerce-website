/**
 * Full Cart Page copy, image specs, and Shopify-ready shipping settings.
 * Thresholds stay null until theme / Shopify shipping settings provide them.
 */

import { PDP_PURCHASE } from "@/content/pdp";
import { FOOTER_CONTACT } from "@/lib/site-content";

/** Theme / Shopify shipping progress — never hardcode a free-shipping amount here. */
export type ShippingProgressSettings = {
  /** When false, show informational shipping note instead of a threshold bar */
  enabled: boolean;
  /**
   * Order subtotal (minor units in PKR) that unlocks free shipping.
   * Set from Shopify Shipping / theme settings only when verified.
   */
  freeShippingThreshold: number | null;
  currencyCode: "PKR";
  /** Optional label from theme settings */
  progressLabel?: string;
  unlockedMessage?: string;
};

/**
 * Inactive until Shopify / theme settings supply a verified threshold.
 * Example when live:
 * { enabled: true, freeShippingThreshold: 15000, currencyCode: "PKR", ... }
 */
export const CART_SHIPPING_PROGRESS_SETTINGS: ShippingProgressSettings = {
  enabled: false,
  freeShippingThreshold: null,
  currencyCode: "PKR",
  progressLabel: "Shipping progress",
  unlockedMessage: "You’ve reached free shipping eligibility for this order.",
};

export const CART_PAGE_IMAGE_SPECS = [
  {
    name: "cart-page-line-thumb",
    purpose: "Full cart page line-item packshot",
    aspect: "4:5",
    desktop: "240×300 (display ~120–140 CSS px)",
    tablet: "200×250",
    mobile: "160×200",
    format: "AVIF/WebP",
    compression: "q 75–85; same crop as PDP primary; lazy except first two lines",
  },
  {
    name: "cart-page-recommend-card",
    purpose: "Cart complementary products carousel/grid card media",
    aspect: "4:5",
    desktop: "480×600",
    tablet: "360×450",
    mobile: "320×400",
    format: "AVIF/WebP",
    compression: "q 70–80; lazy; reuse PLP card assets",
  },
  {
    name: "cart-page-empty-illustration",
    purpose: "Empty cart page editorial illustration",
    aspect: "1:1",
    desktop: "320×320",
    tablet: "280×280",
    mobile: "200×200",
    format: "SVG preferred / WebP",
    compression: "SVG stroked celadon; avoid photos",
  },
] as const;

export const CART_PAGE_COPY = {
  metaTitle: "Your bag",
  metaDescription:
    "Review your SCYN bag — adjust quantities, apply a code at checkout, and continue when you’re ready.",
  eyebrow: "Bag",
  title: "Your bag",
  itemSingular: "item",
  itemPlural: "items",
  continueShopping: "Continue shopping",
  checkout: "Continue to Checkout",
  emptyTitle: "Your bag is empty",
  emptyDescription:
    "Authentic Korean skincare is waiting — start with best sellers or browse curated collections.",
  emptyContinue: "Continue shopping",
  emptyFeatured: "Shop best sellers",
  emptyBrowse: "Browse collections",
  subtotal: "Subtotal",
  shipping: "Estimated shipping",
  shippingValue: "Calculated at checkout",
  tax: "Estimated tax",
  taxValue: "Calculated at checkout",
  discount: "Discount",
  discountPending: "Applied at checkout",
  total: "Total",
  savings: "You’re saving",
  remove: "Remove",
  saveForLater: "Save for later",
  saveForLaterHint: "Wishlist connects next",
  inStock: "In stock",
  soldOut: "Sold out",
  recommendEyebrow: "Complete the edit",
  recommendTitle: "You may also like",
  recommendDescription:
    "Thoughtful companions to what’s already in your bag — ready for Shopify Recommendations.",
  shippingNoteTitle: "Shipping",
  shippingNoteBody: PDP_PURCHASE.shippingSummary,
  shippingNoteCta: PDP_PURCHASE.shippingCta,
  shippingNoteHref: PDP_PURCHASE.shippingHref,
  returnsNote: PDP_PURCHASE.returnsSummary,
  returnsHref: PDP_PURCHASE.returnsHref,
  returnsCta: PDP_PURCHASE.returnsCta,
  discountLabel: "Discount code",
  discountPlaceholder: "Enter code",
  discountApply: "Apply",
  discountRemove: "Remove",
  discountLoading: "Checking…",
  discountEmptyError: "Enter a discount code to apply.",
  discountUnavailableError:
    "Codes validate at checkout. You’ll enter yours before payment.",
  discountSuccess:
    "Code saved for checkout — eligibility is confirmed when you pay.",
  progressInactiveTitle: "Shipping at checkout",
  progressInactiveBody:
    "Free-shipping thresholds connect through Shopify shipping settings. We won’t invent a target amount here.",
  progressRemaining: (formatted: string) =>
    `${formatted} away from free shipping eligibility`,
  progressUnlocked: "Free shipping eligibility reached for this order",
  supportLine: `Need help? WhatsApp or email ${FOOTER_CONTACT.email}`,
} as const;

export const CART_PAGE_TRUST = [
  {
    id: "secure",
    title: "Secure checkout",
    description: "Protected payments through Shopify",
    icon: "lock" as const,
  },
  {
    id: "authentic",
    title: "Authentic Korean skincare",
    description: "Verified products, sourced with care",
    icon: "shield" as const,
  },
  {
    id: "support",
    title: "Customer support",
    description: "WhatsApp & email when you need guidance",
    icon: "headphones" as const,
  },
  {
    id: "shipping",
    title: "Verified shipping information",
    description: "Ships from Lahore — full details on our Shipping page",
    icon: "package" as const,
  },
] as const;
