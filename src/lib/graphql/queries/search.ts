export const PREDICTIVE_SEARCH = /* GraphQL */ `
  # query PredictiveSearch($query: String!, $limit: Int!) {
  #   predictiveSearch(query: $query, limit: $limit) {
  #     products { ...ProductCardFields }
  #     collections { ...CollectionCardFields }
  #     pages { id handle title }
  #     articles { id handle title }
  #     queries { text styledText }
  #   }
  # }
`;

export const SEARCH_PRODUCTS = /* GraphQL */ `
  # query SearchProducts($query: String!, $first: Int!, $after: String) {
  #   search(query: $query, first: $first, after: $after, types: [PRODUCT]) {
  #     totalCount
  #     edges { node { ... on Product { ...ProductCardFields } } }
  #     pageInfo { hasNextPage endCursor }
  #   }
  # }
`;
