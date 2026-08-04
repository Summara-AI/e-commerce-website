/**
 * Site FAQ — verified brand / support / policy pointers only.
 * No invented delivery windows or return SLAs.
 */

import { FOOTER_CONTACT } from "@/lib/site-content";
import { PDP_PURCHASE } from "@/content/pdp";

export type FaqCategoryId =
  | "orders"
  | "shipping"
  | "returns"
  | "products"
  | "account"
  | "authenticity"
  | "payments"
  | "led";

export type FaqItem = {
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string;
};

export const FAQ_CATEGORIES: { id: FaqCategoryId; label: string }[] = [
  { id: "authenticity", label: "Authenticity" },
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "payments", label: "Payments" },
  { id: "led", label: "LED Devices" },
  { id: "account", label: "Account" },
];

export const FAQ_PAGE = {
  eyebrow: "Help centre",
  title: "Frequently asked questions",
  description:
    "Search by topic or keyword. Answers stay within Korean Skin Lab’s published brand and support information.",
  searchPlaceholder: "Search questions…",
  emptyTitle: "No matching questions",
  emptyDescription:
    "Try another keyword, clear filters, or contact support — we’re happy to help.",
  contactCta: {
    label: "Contact support",
    href: "/pages/contact",
  },
} as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "authentic",
    category: "authenticity",
    question: "Are Korean Skin Lab products authentic?",
    answer:
      "Yes. At Korean Skin Lab we bring you 100% authentic Korean skincare from trusted brands — verified and original, founded to fight counterfeit K-beauty in Pakistan.",
  },
  {
    id: "sourcing",
    category: "authenticity",
    question: "Where are products sourced from?",
    answer:
      "Our team personally sources products from Korea to help guarantee premium quality. We curate trusted brands rather than endless catalogue noise.",
  },
  {
    id: "choose",
    category: "products",
    question: "How do I choose the right products?",
    answer:
      "Start with your skin concern or a simple routine path in Shop. You can also email or WhatsApp us for calm, customer-first guidance — no pressure.",
  },
  {
    id: "routines",
    category: "products",
    question: "Do you offer routines or kits?",
    answer:
      "Yes. Explore Bundles & Kits and concern-led collections for thoughtfully curated starting points.",
  },
  {
    id: "track",
    category: "orders",
    question: "How do I track my order?",
    answer:
      "Use our Track Order page with your order number and email once your shipment is confirmed. Shopify order tracking connects when your customer account and fulfilment are live.",
  },
  {
    id: "order-help",
    category: "orders",
    question: "What if I have a question about an existing order?",
    answer: `Email ${FOOTER_CONTACT.email} or WhatsApp ${FOOTER_CONTACT.phone} with your order number. Support hours: ${FOOTER_CONTACT.hours}.`,
  },
  {
    id: "shipping-where",
    category: "shipping",
    question: "Where can I find shipping details?",
    answer: `${PDP_PURCHASE.shippingSummary} Full guidance lives on our Shipping page.`,
  },
  {
    id: "ship-from",
    category: "shipping",
    question: "Where do you ship from?",
    answer: `Orders ship from Lahore. Our office location is ${FOOTER_CONTACT.address}.`,
  },
  {
    id: "returns-where",
    category: "returns",
    question: "Where can I read about returns?",
    answer: `${PDP_PURCHASE.returnsSummary} The Returns & Refund Policy page holds the official guidance.`,
  },
  {
    id: "support-hours",
    category: "account",
    question: "What are your support hours?",
    answer: FOOTER_CONTACT.hours,
  },
  {
    id: "location",
    category: "account",
    question: "Where does Korean Skin Lab operate from?",
    answer: FOOTER_CONTACT.address,
  },
  {
    id: "contact-channels",
    category: "account",
    question: "How can I contact you?",
    answer: `Email ${FOOTER_CONTACT.email}, call or WhatsApp ${FOOTER_CONTACT.phone}, or use the Contact form. Prefer WhatsApp for faster product guidance during support hours.`,
  },
  {
    id: "secure-checkout",
    category: "payments",
    question: "Is checkout secure?",
    answer:
      "Yes. Payments are protected through Shopify’s secure checkout and configured payment providers.",
  },
  {
    id: "payment-methods",
    category: "payments",
    question: "Which payment methods do you accept?",
    answer:
      "Accepted methods appear at checkout once Shopify payments are connected. Icons in the footer will list live options.",
  },
  {
    id: "led-available",
    category: "led",
    question: "Do you sell LED therapy devices?",
    answer:
      "LED and device listings appear in Shop when curated into the catalogue. Check product pages for authenticity and usage guidance, or ask support before you buy.",
  },
  {
    id: "led-advice",
    category: "led",
    question: "How should I use an LED device with skincare?",
    answer:
      "Follow the device maker’s instructions and introduce one change at a time. For product pairings, WhatsApp or email us during support hours — we won’t invent medical claims.",
  },
];
