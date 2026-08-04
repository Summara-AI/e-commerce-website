export const METAOBJECTS_BY_TYPE = /* GraphQL */ `
  # query MetaobjectsByType($type: String!, $first: Int!) {
  #   metaobjects(type: $type, first: $first) {
  #     nodes { id handle type fields { key value reference { ... } } }
  #   }
  # }
`;

export const METAOBJECT_BY_HANDLE = /* GraphQL */ `
  # query MetaobjectByHandle($handle: String!, $type: String!) {
  #   metaobject(handle: { handle: $handle, type: $type }) {
  #     id handle type fields { key value }
  #   }
  # }
`;
