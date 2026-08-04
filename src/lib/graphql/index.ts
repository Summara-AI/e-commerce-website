/**
 * GraphQL document organization — architecture only.
 * Strings are placeholders; do not execute against Shopify in Phase 11B.
 */

export * as productQueries from "./queries/products";
export * as collectionQueries from "./queries/collections";
export * as menuQueries from "./queries/menus";
export * as pageQueries from "./queries/pages";
export * as searchQueries from "./queries/search";
export * as customerQueries from "./queries/customers";
export * as cartQueries from "./queries/cart";
export * as metaobjectQueries from "./queries/metaobjects";
export * as metafieldQueries from "./queries/metafields";

export * as cartMutations from "./mutations/cart";
export * as customerMutations from "./mutations/customer";

export * as productFragments from "./fragments/product";
export * as collectionFragments from "./fragments/collection";
export * as cartFragments from "./fragments/cart";
export * as menuFragments from "./fragments/menu";
