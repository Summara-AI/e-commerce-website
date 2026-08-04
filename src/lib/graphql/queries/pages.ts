export const PAGE_BY_HANDLE = /* GraphQL */ `
  # query PageByHandle($handle: String!) {
  #   page(handle: $handle) {
  #     id handle title body bodySummary seo { title description }
  #   }
  # }
`;

export const ARTICLE_BY_HANDLE = /* GraphQL */ `
  # query ArticleByHandle($blogHandle: String!, $articleHandle: String!) {
  #   blog(handle: $blogHandle) {
  #     articleByHandle(handle: $articleHandle) {
  #       id handle title content excerpt image { url altText } publishedAt
  #       seo { title description }
  #     }
  #   }
  # }
`;
