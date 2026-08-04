/**
 * PDP above-the-fold copy — only verified trust / commerce framing.
 * Product-specific text comes from lib/products (catalog / live site seed).
 */

export const PDP_PURCHASE = {
  addToCart: "Add to bag",
  notifyMe: "Notify me",
  buyNow: "Buy now",
  buyNowHint: "Express checkout connects with Shopify next.",
  wishlistAdd: "Save",
  wishlistSaved: "Saved",
  quantityLabel: "Quantity",
  variantLabel: "Options",
  inStock: "In stock",
  soldOut: "Sold out",
  shippingSummary:
    "Ships from Lahore. Review shipping details for timelines and coverage.",
  shippingCta: "Shipping information",
  shippingHref: "/pages/shipping",
  returnsSummary: "Read our returns guidance before you buy.",
  returnsCta: "Returns",
  returnsHref: "/pages/returns",
} as const;

export const PDP_TRUST = [
  {
    id: "authentic",
    title: "100% authentic",
    description: "Verified Korean skincare, sourced with care",
  },
  {
    id: "secure",
    title: "Secure checkout",
    description: "Protected payments through Shopify",
  },
  {
    id: "support",
    title: "Customer support",
    description: "WhatsApp & email when you need guidance",
  },
] as const;
