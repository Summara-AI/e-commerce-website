/**
 * Theme / shop settings — Shopify theme settings.json / metaobjects mapping.
 * Today powered by `SITE_SETTINGS` in `@/data/settings`.
 */

import type { ImageResource } from "./product";
import type { AnnouncementModel } from "./navigation";

export type ThemeColorTokens = {
  powerPink: string;
  canvas: string;
  blush: string;
  pearl: string;
  pinkMist: string;
  softPink: string;
  ink: string;
};

export type ThemeTypographyTokens = {
  displayFont: string;
  bodyFont: string;
};

export type HomepageSectionSettings = {
  heroCollectionHandle?: string;
  bestSellersCollectionHandle: string;
  featuredCollectionsHandles: string[];
  featuredBundlesHandles: string[];
  journalBlogHandle?: string;
  showRoutinePath: boolean;
  showTestimonials: boolean;
  showCommunity: boolean;
  showNewsletter: boolean;
};

export type CartThemeSettings = {
  freeShippingThresholdAmount: number;
  freeShippingCurrency: string;
  upsellCollectionHandle?: string;
  enableNotes: boolean;
  enableDiscountField: boolean;
};

export type ThemeSettings = {
  storeName: string;
  legalName: string;
  storeUrl: string;
  locale: string;
  currency: string;
  country: string;
  description: string;
  defaultOgImage: string | ImageResource;
  email: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    formatted: string;
  };
  hours: string;
  sameAs: string[];
  colors?: ThemeColorTokens;
  typography?: ThemeTypographyTokens;
  homepage: HomepageSectionSettings;
  cart: CartThemeSettings;
  announcements: AnnouncementModel[];
};
