/**
 * Mini-cart image specifications.
 * Full cart page specs: see `cart-page.ts` → CART_PAGE_IMAGE_SPECS.
 */

export { CART_PAGE_IMAGE_SPECS } from "@/content/cart-page";

export const CART_IMAGE_SPECS = [
  {
    name: "cart-line-thumb",
    purpose: "Cart drawer line-item thumbnail",
    aspect: "4:5",
    desktop: "192×240 (display ~84–96 CSS px, 18px radius)",
    tablet: "160×200",
    mobile: "144×180",
    format: "AVIF/WebP",
    compression: "q 75–85; reuse PDP packshot crop",
  },
  {
    name: "cart-upsell-thumb",
    purpose: "Mini-cart upsell recommendation thumb",
    aspect: "4:5",
    desktop: "200×250",
    tablet: "180×225",
    mobile: "160×200",
    format: "AVIF/WebP",
    compression: "q 75–85; lazy",
  },
  {
    name: "cart-empty-illustration",
    purpose: "Empty bag illustration",
    aspect: "1:1",
    desktop: "240×240",
    tablet: "200×200",
    mobile: "160×160",
    format: "SVG preferred",
    compression: "n/a for SVG; soft celadon stroke",
  },
] as const;

export const CART_COPY = {
  title: "Your bag",
  emptyTitle: "Your bag is empty",
  emptyDescription:
    "Discover authentic Korean skincare — start with best sellers or browse curated collections.",
  continueShopping: "Continue shopping",
  viewCart: "View bag",
  checkout: "Checkout",
  shippingEstimate: "Shipping · Calculated at checkout",
  taxEstimate: "Taxes · Calculated at checkout",
  savingsLabel: "You’re saving",
  remove: "Remove",
  saveForLater: "Save",
  upsellTitle: "You might also like",
} as const;
