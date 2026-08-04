/**
 * Shared path helpers for navigation active states.
 */

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function itemMatchesPath(
  pathname: string,
  href: string,
  childHrefs: string[] = [],
) {
  if (isActivePath(pathname, href)) return true;
  return childHrefs.some((child) => isActivePath(pathname, child));
}
