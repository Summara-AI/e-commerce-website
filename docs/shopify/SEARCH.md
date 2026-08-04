# Search architecture

## Storefront responsibility

| Capability | Current | Future Shopify |
|------------|---------|----------------|
| Full results page | `SEARCH_INDEX` / `searchCatalog` | Storefront search / Predictive Search |
| Instant suggestions | search UI | Predictive Search API |
| Products | seed products | Product resources |
| Collections | seed collections | Collection resources |
| Articles | journal stubs | Blog articles |
| Pages | content pages | Online Store pages |
| Empty state | designed empty UI | keep UX; empty query messaging |
| Trending / popular | local constants | Metaobjects or shop metafield lists |
| Recent searches | client localStorage | keep client-side (no Shopify resource) |

## Types

`SearchQuery`, `SearchResponse`, `SearchResult`, `SearchSuggestion` in `src/types/search.ts`.

## Façade

`src/data/search.ts` — maps seed index → typed `SearchResponse`.

## Adapter notes (11B)

- Map Shopify result types → `product | collection | article | page`
- Preserve empty / trending / recent UX without requiring Admin content
- Do not send PII in search analytics without consent tooling
