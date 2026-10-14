import dynamic from "next/dynamic";
import { HomeHero } from "@/components/sections/home";
import { createPageMetadata } from "@/lib/seo";

/** Stable-height fallbacks avoid CLS while below-fold chunks load */
function SectionFallback({ minHeight }: { minHeight: string }) {
  return (
    <div
      className="w-full bg-transparent"
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
}

const HomeBestSellers = dynamic(
  () =>
    import("@/components/sections/home/HomeBestSellers").then(
      (m) => m.HomeBestSellers,
    ),
  { loading: () => <SectionFallback minHeight="36rem" /> },
);
const HomeFeaturedCollections = dynamic(
  () =>
    import("@/components/sections/home/HomeFeaturedCollections").then(
      (m) => m.HomeFeaturedCollections,
    ),
  { loading: () => <SectionFallback minHeight="32rem" /> },
);
const HomeEditorialBanner = dynamic(
  () =>
    import("@/components/sections/home/HomeEditorialBanner").then(
      (m) => m.HomeEditorialBanner,
    ),
  { loading: () => <SectionFallback minHeight="24rem" /> },
);
const HomeStoryPreview = dynamic(
  () =>
    import("@/components/sections/home/HomeStoryPreview").then(
      (m) => m.HomeStoryPreview,
    ),
  { loading: () => <SectionFallback minHeight="28rem" /> },
);
const HomeTestimonials = dynamic(
  () =>
    import("@/components/sections/home/HomeTestimonials").then(
      (m) => m.HomeTestimonials,
    ),
  { loading: () => <SectionFallback minHeight="20rem" /> },
);
const HomeCommunity = dynamic(
  () =>
    import("@/components/sections/home/HomeCommunity").then(
      (m) => m.HomeCommunity,
    ),
  { loading: () => <SectionFallback minHeight="22rem" /> },
);
const HomeNewsletter = dynamic(
  () =>
    import("@/components/sections/home/HomeNewsletter").then(
      (m) => m.HomeNewsletter,
    ),
  { loading: () => <SectionFallback minHeight="22rem" /> },
);
const HomeTrustBadges = dynamic(
  () =>
    import("@/components/sections/home/HomeTrustBadges").then(
      (m) => m.HomeTrustBadges,
    ),
  { loading: () => <SectionFallback minHeight="12rem" /> },
);

export const metadata = createPageMetadata({
  title: "Authentic Korean Skincare",
  description:
    "100% authentic Korean skincare for Pakistan. Verified products, thoughtfully curated routines, and calm guidance you can trust.",
  path: "/",
  keywords: [
    "Korean skincare Pakistan",
    "authentic K-beauty",
    "Korean Skin Lab",
    "verified Korean skincare",
  ],
});

/**
 * Luxury homepage — hero stays eager for LCP; remaining sections code-split.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBestSellers />
      <HomeFeaturedCollections />
      <HomeEditorialBanner />
      <HomeStoryPreview />
      <HomeTestimonials />
      <HomeCommunity />
      <HomeNewsletter />
      <HomeTrustBadges />
    </>
  );
}
