/**
 * Track Order — future-ready for Shopify order lookup / Order Status page.
 */

export const TRACK_ORDER_PAGE = {
  eyebrow: "Orders",
  title: "Track your order",
  description:
    "Enter the order number and email from your confirmation. Live tracking connects when Shopify fulfilment is active.",
  form: {
    orderLabel: "Order number",
    orderPlaceholder: "e.g. #1042",
    emailLabel: "Email",
    emailPlaceholder: "Email used at checkout",
    submitLabel: "Track order",
  },
  loading: "Looking up your order…",
  success: {
    title: "Order found",
    body: "This is a storefront preview. When Shopify is connected, fulfilment status and carrier tracking will appear here.",
    statusLabel: "Status",
    statusValue: "Confirmed — fulfilment details pending Shopify connection",
  },
  error: {
    notFoundTitle: "We couldn’t find that order",
    notFoundBody:
      "Check the order number and email match your confirmation. If you still need help, contact support.",
    genericTitle: "Tracking unavailable",
    genericBody: "Something went wrong looking up your order. Please try again.",
  },
  help: {
    title: "Need help instead?",
    description: "Our team can look up your order during support hours.",
    contactLabel: "Contact support",
    contactHref: "/pages/contact",
    faqLabel: "Order FAQ",
    faqHref: "/pages/faq",
  },
} as const;
