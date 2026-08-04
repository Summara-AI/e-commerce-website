/**
 * Shopify CDN image helpers — no network.
 * @see https://shopify.dev/docs/api/liquid/filters/image_url
 */

export type ShopifyImageTransform = {
  width?: number;
  height?: number;
  crop?: "center" | "top" | "bottom" | "left" | "right" | "region";
  format?: "webp" | "pjpg" | "jpg" | "png";
};

/**
 * Appends transform query params to a Shopify CDN URL when possible.
 * Non-Shopify URLs are returned unchanged.
 */
export function shopifyImageUrl(
  url: string | null | undefined,
  transform: ShopifyImageTransform = {},
): string | undefined {
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    const isShopifyCdn =
      parsed.hostname.includes("cdn.shopify.com") ||
      parsed.hostname.includes("shopify.com");

    if (!isShopifyCdn) return url;

    if (transform.width) parsed.searchParams.set("width", String(transform.width));
    if (transform.height) parsed.searchParams.set("height", String(transform.height));
    if (transform.crop) parsed.searchParams.set("crop", transform.crop);
    if (transform.format) parsed.searchParams.set("format", transform.format);

    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Suggested sizes string patterns for MediaImage / next/image.
 */
export function shopifyImageSrcSetHints(role: "hero" | "card" | "gallery" | "thumb") {
  switch (role) {
    case "hero":
      return "100vw";
    case "card":
      return "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw";
    case "gallery":
      return "(max-width: 1024px) 100vw, 50vw";
    case "thumb":
      return "96px";
    default:
      return "(max-width: 768px) 100vw, 50vw";
  }
}
