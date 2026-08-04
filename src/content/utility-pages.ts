/**
 * Utility / system pages — 404, maintenance, coming soon, generic errors.
 */

import { FOOTER_CONTACT } from "@/lib/site-content";

export const NOT_FOUND_PAGE = {
  eyebrow: "404",
  title: "This page isn’t here",
  description:
    "The link may be outdated, or the page may have moved. Let’s get you back to calm discovery.",
  primaryLabel: "Continue shopping",
  primaryHref: "/collections/all",
  secondaryLabel: "Return home",
  secondaryHref: "/",
} as const;

export const MAINTENANCE_PAGE = {
  eyebrow: "Korean Skin Lab",
  title: "We’ll be right back",
  description:
    "We’re refreshing the storefront to serve you better. Authentic Korean skincare will return shortly.",
  hoursNote: `Support remains available: ${FOOTER_CONTACT.hours}`,
  email: FOOTER_CONTACT.email,
  whatsappHref: FOOTER_CONTACT.whatsappHref,
  whatsappLabel: "Message on WhatsApp",
} as const;

export const COMING_SOON_PAGE = {
  eyebrow: "Korean Skin Lab",
  title: "Coming soon",
  description:
    "A calmer way to shop 100% authentic Korean skincare in Pakistan. Be first to know when we open the doors.",
  newsletterHeading: "Get launch updates",
  newsletterDescription:
    "Occasional notes on authenticity, routines, and opening day — never noisy.",
} as const;

export const ERROR_403_PAGE = {
  eyebrow: "403",
  title: "Access restricted",
  description:
    "You don’t have permission to view this page. If you believe this is a mistake, contact support.",
  primaryLabel: "Return home",
  primaryHref: "/",
  secondaryLabel: "Contact support",
  secondaryHref: "/pages/contact",
} as const;

export const ERROR_500_PAGE = {
  eyebrow: "500",
  title: "Something went wrong on our side",
  description:
    "We’re working on it. Please try again in a moment — your bag and wishlist are safe.",
  primaryLabel: "Try again",
  secondaryLabel: "Return home",
  secondaryHref: "/",
} as const;

export const OFFLINE_PAGE = {
  eyebrow: "Offline",
  title: "You’re offline",
  description:
    "Check your connection, then reload. You can still browse once you’re back online.",
  primaryLabel: "Try again",
} as const;

export const NETWORK_ERROR_PAGE = {
  eyebrow: "Connection",
  title: "Connection issue",
  description:
    "We couldn’t reach the server. Please check your network and try again.",
  primaryLabel: "Try again",
  secondaryLabel: "Return home",
  secondaryHref: "/",
} as const;
