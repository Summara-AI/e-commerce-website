export const COLLECTION_BY_HANDLE = /* GraphQL */ `
  # query CollectionByHandle($handle: String!, $first: Int!, $after: String, $sortKey: ProductCollectionSortKeys) {
  #   collection(handle: $handle) { ...CollectionDetailFields }
  # }
`;

export const COLLECTIONS_LIST = /* GraphQL */ `
  # query CollectionsList($first: Int!) {
  #   collections(first: $first) { nodes { ...CollectionCardFields } }
  # }
`;
