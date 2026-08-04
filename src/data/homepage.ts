/**
 * Homepage section data façade — seed content today; Shopify later.
 *
 * Mapping (see docs/shopify/HOMEPAGE.md):
 * - Hero / CTAs → Theme settings + metaobject `homepage_hero`
 * - Quick entry → Metaobject `homepage_card` or menu
 * - Best sellers → Collection handle (theme setting)
 * - Featured collections → Collection list metafield / theme
 * - Bundles → Collection or product tags
 * - Routine path → Metaobject `routine_guide`
 * - Trust / why → Metaobject `trust_metric` + shop metafields
 * - Brand story → Page `our-story` + metaobject blocks
 * - Science → Page `authenticity`
 * - Testimonials → Metaobject `testimonial`
 * - Journal → Blog articles
 * - Community → Theme settings + Instagram (app)
 * - Newsletter → Theme / Klaviyo / Shopify Email
 */

import { HOME_HERO, HOME_HERO_MEDIA, HOME_QUICK_ENTRIES } from "@/content/home";
import {
  HOME_COMMUNITY,
  HOME_FINAL_CTA,
  HOME_JOURNAL,
  HOME_NEWSLETTER,
  HOME_TESTIMONIALS,
} from "@/content/home-closing";
import { BRAND_STORY, SCIENCE_AUTHENTICITY, WHY_CHOOSE } from "@/content/brand";
import { ROUTINE_BUILDER_PAGE } from "@/content/routine-builder";
import { BEST_SELLERS, FEATURED_BUNDLES, FEATURED_COLLECTIONS } from "@/lib/catalog";
import { TRUST_ITEMS } from "@/lib/site-content";
import { SITE_SETTINGS } from "@/data/settings";
import type { HomepageSectionSettings } from "@/types";

/** Theme-ready homepage section config (placeholder values) */
export function getHomepageSectionSettings(): HomepageSectionSettings {
  return {
    bestSellersCollectionHandle: "best-sellers",
    featuredCollectionsHandles: FEATURED_COLLECTIONS.map((c) => c.handle),
    featuredBundlesHandles: FEATURED_BUNDLES.map((b) => b.handle),
    journalBlogHandle: "journal",
    showRoutinePath: true,
    showTestimonials: true,
    showCommunity: true,
    showNewsletter: true,
    heroCollectionHandle: undefined,
  };
}

export function getHomeHero() {
  return { copy: HOME_HERO, media: HOME_HERO_MEDIA };
}

export function getHomeQuickEntries() {
  return HOME_QUICK_ENTRIES;
}

export function getHomeBestSellers(limit = 4) {
  return BEST_SELLERS.slice(0, limit);
}

export function getHomeFeaturedCollections() {
  return {
    featured: FEATURED_COLLECTIONS.filter((c) => c.featured),
    secondary: FEATURED_COLLECTIONS.filter((c) => !c.featured),
  };
}

export function getHomeFeaturedBundles() {
  return FEATURED_BUNDLES;
}

export function getHomeBrandStory() {
  return BRAND_STORY;
}

export function getHomeWhyChoose() {
  return WHY_CHOOSE;
}

export function getHomeScienceAuthenticity() {
  return SCIENCE_AUTHENTICITY;
}

export function getHomeTrustItems() {
  return TRUST_ITEMS;
}

export function getHomeTestimonials() {
  return HOME_TESTIMONIALS;
}

export function getHomeJournal() {
  return HOME_JOURNAL;
}

export function getHomeCommunity() {
  return HOME_COMMUNITY;
}

export function getHomeNewsletter() {
  return HOME_NEWSLETTER;
}

export function getHomeFinalCta() {
  return HOME_FINAL_CTA;
}

export function getHomeRoutinePath() {
  return ROUTINE_BUILDER_PAGE;
}

export function getHomeStoreContext() {
  return {
    storeName: SITE_SETTINGS.name,
    url: SITE_SETTINGS.url,
    settings: getHomepageSectionSettings(),
  };
}
