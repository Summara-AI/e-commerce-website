/**
 * Contact page copy — business details from live FOOTER_CONTACT only.
 */

import { FOOTER_CONTACT } from "@/lib/site-content";

export const CONTACT_PAGE = {
  eyebrow: "Contact",
  title: "We’re here to help",
  description:
    "Questions about products, authenticity, or an order — reach us by form, email, or WhatsApp during support hours.",
  form: {
    heading: "Send a message",
    description:
      "Share a few details and we’ll respond as soon as we can. Fields marked required.",
    successTitle: "Message sent",
    successBody:
      "Thank you — we’ve received your note. Our team will follow up using the email you provided.",
    errorGeneric: "Something went wrong. Please try again or reach us on WhatsApp.",
    submitLabel: "Send message",
  },
  business: {
    eyebrow: "Business information",
    title: "SCYN",
    email: FOOTER_CONTACT.email,
    phone: FOOTER_CONTACT.phone,
    phoneHref: FOOTER_CONTACT.phoneHref,
    whatsappHref: FOOTER_CONTACT.whatsappHref,
    address: FOOTER_CONTACT.address,
    hours: FOOTER_CONTACT.hours,
  },
  faqShortcut: {
    title: "Looking for quick answers?",
    description: "Shipping, authenticity, and support questions live on our FAQ.",
    label: "Visit FAQ",
    href: "/pages/faq",
  },
  supportCta: {
    title: "Prefer WhatsApp?",
    description: "Message us for product guidance during support hours.",
    label: "Chat on WhatsApp",
    href: FOOTER_CONTACT.whatsappHref,
  },
} as const;

export const CONTACT_TOPICS = [
  { value: "general", label: "General enquiry" },
  { value: "order", label: "Order support" },
  { value: "product", label: "Product guidance" },
  { value: "authenticity", label: "Authenticity" },
  { value: "other", label: "Other" },
] as const;
