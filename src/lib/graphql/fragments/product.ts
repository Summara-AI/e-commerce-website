/**
 * Shared product selection sets — expand in 11C with codegen.
 * Intentionally incomplete (architecture scaffold).
 */

export const MONEY_FIELDS = /* GraphQL */ `
  # fragment MoneyFields on MoneyV2 { amount currencyCode }
`;

export const IMAGE_FIELDS = /* GraphQL */ `
  # fragment ImageFields on Image { id url altText width height }
`;

export const PRODUCT_CARD_FIELDS = /* GraphQL */ `
  # fragment ProductCardFields on Product {
  #   id handle title vendor productType tags
  #   featuredImage { ...ImageFields }
  #   priceRange { minVariantPrice { ...MoneyFields } }
  #   compareAtPriceRange { minVariantPrice { ...MoneyFields } }
  #   availableForSale
  # }
`;

export const PRODUCT_DETAIL_FIELDS = /* GraphQL */ `
  # fragment ProductDetailFields on Product {
  #   ...ProductCardFields
  #   description descriptionHtml
  #   options { id name values }
  #   variants(first: 100) { nodes { id title sku availableForSale quantityAvailable
  #     price { ...MoneyFields } compareAtPrice { ...MoneyFields }
  #     selectedOptions { name value } image { ...ImageFields } } }
  #   media(first: 20) { nodes { ... on MediaImage { image { ...ImageFields } } } }
  #   # metafields via aliases for ksl.* keys
  # }
`;
