/**
 * PDP trust / reviews / FAQ — Shopify Judge.me / metafields ready.
 * Live koreanskinlab.pk review rails cited third-party Ordinary quotes — NOT used.
 * No delivery timelines or return windows invented.
 */

import { FOOTER_CONTACT, TRUST_ITEMS } from "@/lib/site-content";
import { PDP_PURCHASE } from "@/content/pdp";

export type ReviewSort =
  | "recent"
  | "highest"
  | "lowest"
  | "photos"
  | "verified"
  | "rating-5"
  | "rating-4"
  | "rating-3"
  | "rating-2"
  | "rating-1";

export type ProductReview = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  author: string;
  /** ISO date when live reviews connect */
  date?: string;
  variantTitle?: string;
  verifiedPurchase?: boolean;
  helpfulCount?: number;
  hasPhoto?: boolean;
  /** True until Shopify / Judge.me sync */
  placeholder?: boolean;
};

export type RatingBreakdown = {
  stars: 1 | 2 | 3 | 4 | 5;
  count: number;
};

export type ProductReviewSummary = {
  average: number | null;
  total: number;
  breakdown: RatingBreakdown[];
  /** No live Korean Skin Lab product reviews connected yet */
  connected: boolean;
};

export const REVIEW_SORT_OPTIONS: { value: ReviewSort; label: string }[] = [
  { value: "recent", label: "Most recent" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
  { value: "photos", label: "With photos" },
  { value: "verified", label: "Verified purchases" },
  { value: "rating-5", label: "5 stars" },
  { value: "rating-4", label: "4 stars" },
  { value: "rating-3", label: "3 stars" },
  { value: "rating-2", label: "2 stars" },
  { value: "rating-1", label: "1 star" },
];

/** Empty until review app connects — do not seed fabricated quotes */
export function getProductReviews(_handle: string): ProductReview[] {
  return [];
}

export function getReviewSummary(reviews: ProductReview[]): ProductReviewSummary {
  const live = reviews.filter((r) => !r.placeholder);
  if (!live.length) {
    return {
      average: null,
      total: 0,
      breakdown: [5, 4, 3, 2, 1].map((stars) => ({
        stars: stars as 1 | 2 | 3 | 4 | 5,
        count: 0,
      })),
      connected: false,
    };
  }

  const total = live.length;
  const average = live.reduce((sum, r) => sum + r.rating, 0) / total;
  const breakdown = ([5, 4, 3, 2, 1] as const).map((stars) => ({
    stars,
    count: live.filter((r) => r.rating === stars).length,
  }));

  return { average, total, breakdown, connected: true };
}

export function sortReviews(reviews: ProductReview[], sort: ReviewSort): ProductReview[] {
  const list = [...reviews];
  switch (sort) {
    case "highest":
      return list.sort((a, b) => b.rating - a.rating);
    case "lowest":
      return list.sort((a, b) => a.rating - b.rating);
    case "photos":
      return list.filter((r) => r.hasPhoto);
    case "verified":
      return list.filter((r) => r.verifiedPurchase);
    case "rating-5":
    case "rating-4":
    case "rating-3":
    case "rating-2":
    case "rating-1": {
      const n = Number(sort.split("-")[1]) as 1 | 2 | 3 | 4 | 5;
      return list.filter((r) => r.rating === n);
    }
    case "recent":
    default:
      return list.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  }
}

export type PdpFaqItem = {
  id: string;
  question: string;
  answer: string;
};

/** Verified brand / commerce FAQs only — no invented SLAs */
export const PDP_PRODUCT_FAQS: PdpFaqItem[] = [
  {
    id: "authentic",
    question: "Are Korean Skin Lab products authentic?",
    answer:
      "Yes. At Korean Skin Lab we bring you 100% authentic Korean skincare from trusted brands — verified and original, founded to fight counterfeit K-beauty in Pakistan.",
  },
  {
    id: "support",
    question: "How can I get help choosing a product?",
    answer: `Email ${FOOTER_CONTACT.email} or WhatsApp ${FOOTER_CONTACT.phone}. Support hours: ${FOOTER_CONTACT.hours}.`,
  },
  {
    id: "shipping",
    question: "Where can I find shipping details?",
    answer: `${PDP_PURCHASE.shippingSummary} Full guidance lives on our Shipping page.`,
  },
  {
    id: "returns",
    question: "Where can I read about returns?",
    answer: `${PDP_PURCHASE.returnsSummary} The Returns page holds the official policy.`,
  },
  {
    id: "location",
    question: "Where does Korean Skin Lab operate from?",
    answer: `${FOOTER_CONTACT.address}.`,
  },
];

export type ShippingReturnsBlock = {
  id: string;
  title: string;
  body: string;
  href?: string;
  cta?: string;
};

export const PDP_SHIPPING_RETURNS: ShippingReturnsBlock[] = [
  {
    id: "shipping",
    title: "Shipping",
    body: PDP_PURCHASE.shippingSummary,
    href: PDP_PURCHASE.shippingHref,
    cta: PDP_PURCHASE.shippingCta,
  },
  {
    id: "returns",
    title: "Returns & exchanges",
    body: PDP_PURCHASE.returnsSummary,
    href: PDP_PURCHASE.returnsHref,
    cta: PDP_PURCHASE.returnsCta,
  },
  {
    id: "support",
    title: "Customer support",
    body: `WhatsApp & email guidance · ${FOOTER_CONTACT.hours}`,
    href: FOOTER_CONTACT.whatsappHref,
    cta: "Message on WhatsApp",
  },
  {
    id: "track",
    title: "Track an order",
    body: "Follow your order status from our track-order page once your shipment is confirmed.",
    href: "/pages/track-order",
    cta: "Track order",
  },
];

export const PDP_PURCHASE_CONFIDENCE = TRUST_ITEMS.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  icon: item.icon,
}));

export const PDP_CUSTOMER_GALLERY = {
  eyebrow: "Community",
  title: "Customer photos",
  description:
    "Real customer imagery will appear here when photo reviews connect. We never fabricate UGC.",
  tileCount: 6,
} as const;
