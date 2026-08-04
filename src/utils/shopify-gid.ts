/**
 * Shopify GID helpers — Storefront IDs are opaque GIDs.
 */

const GID_PREFIX = "gid://shopify/";

export function toShopifyGid(resource: string, id: string | number): string {
  if (typeof id === "string" && id.startsWith(GID_PREFIX)) return id;
  return `${GID_PREFIX}${resource}/${id}`;
}

export function parseShopifyGid(gid: string): { resource: string; id: string } | null {
  if (!gid.startsWith(GID_PREFIX)) return null;
  const rest = gid.slice(GID_PREFIX.length);
  const slash = rest.indexOf("/");
  if (slash < 0) return null;
  return { resource: rest.slice(0, slash), id: rest.slice(slash + 1) };
}

export function isShopifyGid(value: string): boolean {
  return value.startsWith(GID_PREFIX);
}
