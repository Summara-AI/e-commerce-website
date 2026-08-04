/**
 * PDP image galleries — disconnected (no images). Reconnect via product data when assets return.
 * Files remain in public/media/products/ for later re-upload.
 */

/** handle → ordered gallery paths (hero first) */
export const PRODUCT_GALLERY_BY_HANDLE: Record<string, readonly string[]> = {};

export function getProductGallery(handle: string): readonly string[] {
  return PRODUCT_GALLERY_BY_HANDLE[handle] ?? [];
}
