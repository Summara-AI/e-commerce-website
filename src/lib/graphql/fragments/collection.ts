export const COLLECTION_CARD_FIELDS = /* GraphQL */ `
  # fragment CollectionCardFields on Collection {
  #   id handle title description
  #   image { id url altText width height }
  # }
`;

export const COLLECTION_DETAIL_FIELDS = /* GraphQL */ `
  # fragment CollectionDetailFields on Collection {
  #   ...CollectionCardFields
  #   seo { title description }
  #   products(first: $first, after: $after, sortKey: $sortKey) {
  #     pageInfo { hasNextPage endCursor }
  #     nodes { ...ProductCardFields }
  #   }
  # }
`;
