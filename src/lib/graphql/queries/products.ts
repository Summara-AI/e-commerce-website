/** Product query module — architecture placeholders */

export const PRODUCT_BY_HANDLE = /* GraphQL */ `
  # query ProductByHandle($handle: String!) {
  #   product(handle: $handle) { ...ProductDetailFields }
  # }
`;

export const PRODUCTS_BY_HANDLES = /* GraphQL */ `
  # query ProductsByHandles($query: String!) {
  #   products(first: 20, query: $query) { nodes { ...ProductCardFields } }
  # }
`;

export const PRODUCT_RECOMMENDATIONS = /* GraphQL */ `
  # query ProductRecommendations($productId: ID!) {
  #   productRecommendations(productId: $productId) { ...ProductCardFields }
  # }
`;
