/**
 * Footer & trust content — Shopify-ready (menus / theme settings later).
 * Trust claims stay within live-site authenticity positioning; no invented guarantees.
 */

import { SITE_SETTINGS } from "@/data/settings";

export type FooterLink = { id: string; label: string; href: string };


export const FOOTER_SHOP_LINKS: FooterLink[] = [
  { id: "all", label: "Shop All", href: "/collections/all" },
  { id: "best", label: "Best Sellers", href: "/collections/best-sellers" },
  { id: "new", label: "New Arrivals", href: "/collections/new-arrivals" },
  { id: "bundles", label: "Bundles & Kits", href: "/collections/bundles" },
];

export const FOOTER_SUPPORT_LINKS: FooterLink[] = [
  { id: "faq", label: "FAQ", href: "/pages/faq" },
  { id: "shipping", label: "Shipping", href: "/pages/shipping" },
  { id: "returns", label: "Returns", href: "/pages/returns" },
  { id: "track", label: "Track Order", href: "/pages/track-order" },
  { id: "contact", label: "Contact", href: "/pages/contact" },
];

export const FOOTER_BRAND_LINKS: FooterLink[] = [
  { id: "story", label: "Our Story", href: "/pages/our-story" },
  { id: "auth", label: "Authenticity", href: "/pages/authenticity" },
  { id: "ingredients", label: "Ingredients", href: "/pages/ingredients" },
  { id: "guides", label: "Guides", href: "/pages/guides" },
  { id: "concerns", label: "Skin Concerns", href: "/pages/skin-concerns" },
  { id: "routine", label: "Routine Builder", href: "/pages/routine-builder" },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { id: "privacy", label: "Privacy Policy", href: "/policies/privacy-policy" },
  { id: "terms", label: "Terms of Service", href: "/policies/terms-of-service" },
];

export const FOOTER_CONTACT = {
  email: SITE_SETTINGS.email,
  phone: SITE_SETTINGS.phone,
  phoneHref: SITE_SETTINGS.phoneHref,
  whatsappHref: SITE_SETTINGS.whatsappHref,
  address: SITE_SETTINGS.address.formatted,
  hours: SITE_SETTINGS.hours,
} as const;

export const FOOTER_SOCIAL = SITE_SETTINGS.sameAs.map((href, index) => ({
  id: index === 0 ? "instagram" : "facebook",
  label: index === 0 ? "Instagram" : "Facebook",
  href,
})) as readonly { id: string; label: string; href: string }[];

export type TrustItem = {
  id: string;
  title: string;
  description: string;
  icon: "shield" | "package" | "headphones" | "lock";
};

/** Only claims supported by live brand positioning — no unverified free-shipping / money-back */
export const TRUST_ITEMS: TrustItem[] = [
  {
    id: "authentic",
    title: "100% Authentic",
    description: "Verified Korean skincare, sourced with care",
    icon: "shield",
  },
  {
    id: "support",
    title: "Skincare Support",
    description: "WhatsApp & email guidance when you need it",
    icon: "headphones",
  },
  {
    id: "secure",
    title: "Secure Checkout",
    description: "Protected payments through Shopify",
    icon: "lock",
  },
  {
    id: "curated",
    title: "Thoughtfully Curated",
    description: "Routines and kits for clearer discovery",
    icon: "package",
  },
];
