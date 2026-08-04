/**
 * CMS / content sources — Shopify pages, metaobjects, blogs later.
 */

import { DEFAULT_ANNOUNCEMENTS } from "@/lib/navigation";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "@/content/faq";
import { ABOUT_PAGE } from "@/content/about";
import { AUTHENTICITY_PAGE } from "@/content/authenticity";
import { REAL_VS_FAKE_PAGE } from "@/content/real-vs-fake";
import { CONTACT_PAGE } from "@/content/contact";
import { FAQ_PAGE } from "@/content/faq";
import { HOME_TESTIMONIALS } from "@/content/home-closing";

export type CmsPageId =
  | "about"
  | "authenticity"
  | "real-vs-fake"
  | "contact"
  | "faq";

export function getAnnouncements() {
  return DEFAULT_ANNOUNCEMENTS;
}

export function getFaqItems() {
  return FAQ_ITEMS;
}

export function getFaqCategories() {
  return FAQ_CATEGORIES;
}

export function getTestimonials() {
  return HOME_TESTIMONIALS;
}

export function getCmsPage(id: CmsPageId) {
  switch (id) {
    case "about":
      return ABOUT_PAGE;
    case "authenticity":
      return AUTHENTICITY_PAGE;
    case "real-vs-fake":
      return REAL_VS_FAKE_PAGE;
    case "contact":
      return CONTACT_PAGE;
    case "faq":
      return FAQ_PAGE;
    default:
      return null;
  }
}
