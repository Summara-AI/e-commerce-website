/**
 * Premium pre-Shopify checkout copy & options.
 * Payment selection is preference-only — Shopify Checkout processes payment.
 */

export const CHECKOUT_COPY = {
  eyebrow: "Secure checkout",
  title: "Checkout",
  continueShopping: "Continue shopping",
  continueShoppingHref: "/collections/all",
  backToCart: "Back to bag",
  backToCartHref: "/cart",
  next: "Continue",
  back: "Back",
  placeOrderShopify: "Continue to Secure Checkout",
  handoffLoading: "Opening Shopify secure checkout…",
  handoffNote:
    "You’ll complete payment on Shopify’s encrypted checkout. Korean Skin Lab never sees your card details.",
  emptyTitle: "Your bag is empty",
  emptyDescription: "Add a few pieces before checkout.",
  emptyCta: "Explore products",
  estimatedDeliveryLabel: "Estimated delivery",
  saveAddress: "Save this address for next time",
  deliveryInstructions: "Special delivery instructions (optional)",
  reviewTitle: "Review your order",
  secureBadge: "256-bit SSL · Encrypted checkout",
  shopifyHandles:
    "Payment, taxes, and order confirmation are handled by Shopify.",
} as const;

export const CHECKOUT_STEPS = [
  { id: "shipping", label: "Shipping", short: "Ship" },
  { id: "delivery", label: "Delivery", short: "Deliver" },
  { id: "payment", label: "Payment", short: "Pay" },
  { id: "review", label: "Review", short: "Review" },
] as const;

export type CheckoutStepId = (typeof CHECKOUT_STEPS)[number]["id"];

export type DeliveryOption = {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  priceAmount: number;
  eta: string;
  badge?: string;
};

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "standard",
    title: "Standard Delivery",
    description: "Careful nationwide dispatch with calm tracking updates.",
    priceLabel: "Rs.250",
    priceAmount: 250,
    eta: "3–5 business days",
  },
  {
    id: "express",
    title: "Express Delivery",
    description: "Priority packing for major cities when available.",
    priceLabel: "Rs.550",
    priceAmount: 550,
    eta: "1–2 business days",
    badge: "Faster",
  },
  {
    id: "free_threshold",
    title: "Free Delivery",
    description: "Complimentary standard shipping when your bag qualifies.",
    priceLabel: "Free",
    priceAmount: 0,
    eta: "3–5 business days",
    badge: "Over threshold",
  },
];

export type PaymentOption = {
  id: string;
  title: string;
  description: string;
  available: boolean;
  comingSoon?: boolean;
};

/** Preference chips only — actual tender is selected inside Shopify Checkout */
export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard and more via Shopify Payments.",
    available: true,
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay the courier when your order arrives.",
    available: true,
  },
  {
    id: "bank",
    title: "Bank Transfer",
    description: "Manual transfer instructions appear in Shopify Checkout when enabled.",
    available: true,
  },
  {
    id: "easypaisa",
    title: "EasyPaisa",
    description: "Connect when your Shopify payment apps are live.",
    available: false,
    comingSoon: true,
  },
  {
    id: "jazzcash",
    title: "JazzCash",
    description: "Connect when your Shopify payment apps are live.",
    available: false,
    comingSoon: true,
  },
];

export const CHECKOUT_TRUST = [
  { id: "ssl", label: "SSL encrypted" },
  { id: "pci", label: "PCI-compliant payments" },
  { id: "shopify", label: "Powered by Shopify" },
] as const;

export const THANK_YOU_COPY = {
  eyebrow: "Order confirmed",
  title: "Thank you for your order",
  support:
    "A confirmation email is on its way. We’ll share tracking as soon as your parcel leaves our studio.",
  orderLabel: "Order number",
  etaLabel: "Estimated delivery",
  trackCta: "Track Order",
  trackHref: "/pages/track-order",
  continueCta: "Continue Shopping",
  continueHref: "/collections/all",
  invoiceCta: "Download Invoice",
  invoiceHint: "Invoice download connects with Shopify order status next.",
  recommendedTitle: "You may also love",
  shippingTitle: "Shipping to",
  paymentTitle: "Payment",
  productsTitle: "Your pieces",
  demoNote:
    "Preview mode — when Shopify Checkout is connected, customers land here after payment (or on Shopify’s thank-you page).",
} as const;
