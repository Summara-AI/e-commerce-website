/**
 * PDP image galleries — sourced from the client-supplied packshots in
 * `src/data/client-products.ts`. Each supplied product currently has one image.
 */

import { CLIENT_PRODUCTS } from "@/data/client-products";

/** handle → ordered gallery paths (hero first) */
export const PRODUCT_GALLERY_BY_HANDLE: Record<string, readonly string[]> =
  Object.fromEntries(
    Object.values(CLIENT_PRODUCTS).map((product) => [
      product.handle,
      [product.image],
    ]),
  );

export function getProductGallery(handle: string): readonly string[] {
  return PRODUCT_GALLERY_BY_HANDLE[handle] ?? [];
}
