/**
 * Projectors — canonical Shopify models → existing UI view models.
 * Keep ProductPageData / CollectionPageData / CatalogProduct shapes stable so UI never changes.
 */

import type { CatalogProduct } from "@/lib/catalog";
import type { CollectionPageData } from "@/lib/collections";
import type { ProductPageData } from "@/lib/products";
import type { ShopifyCollection, ShopifyProduct } from "@/types";

/**
 * ShopifyProduct → ProductPageData (PDP).
 * Map media roles, variants, metafield-driven FAQ/ingredients via education helpers.
 */
export function projectProductPage(_product: ShopifyProduct): ProductPageData {
  void _product;
  throw new Error(
    "[projectors/product-page] Implement when Storefront products are connected.",
  );
}

/** ShopifyProduct → CatalogProduct (cards, grids, wishlist). */
export function projectCatalogProduct(_product: ShopifyProduct): CatalogProduct {
  void _product;
  throw new Error(
    "[projectors/catalog-product] Implement when Storefront products are connected.",
  );
}

/** ShopifyCollection + products connection → CollectionPageData. */
export function projectCollectionPage(
  _collection: ShopifyCollection,
  _products: CatalogProduct[],
): CollectionPageData {
  void _collection;
  void _products;
  throw new Error(
    "[projectors/collection-page] Implement when Storefront collections are connected.",
  );
}
