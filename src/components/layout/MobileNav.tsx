"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Heart, Search, User, ShoppingBag } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/header/Logo";
import { useBodyLock } from "@/hooks/use-body-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import {
  MOBILE_POLICY_LINKS,
  MOBILE_SUPPORT_LINKS,
  PRIMARY_NAV,
} from "@/lib/navigation";
import { isActivePath, itemMatchesPath } from "@/lib/nav-utils";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  id?: string;
  cartCount?: number;
  wishlistCount?: number;
};

export function MobileNav({
  open,
  onClose,
  onOpenSearch,
  id = "mobile-nav",
  cartCount = 0,
  wishlistCount = 0,
}: MobileNavProps) {
  const { openCart } = useCart();
  const pathname = usePathname();
  const titleId = useId();  const panelRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useBodyLock(open);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-drawer laptop:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 border-0 bg-ink/35 transition-opacity duration-280 ease-out",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "absolute inset-y-0 left-0 flex w-[min(100%,24rem)] flex-col bg-surface shadow-elev3",
          "tablet:w-[min(100%,28rem)]",
          "pt-[env(safe-area-inset-top)]",
          "transition-transform duration-280 ease-out will-change-transform",
          open ? "translate-x-0" : "-translate-x-full",
          "motion-reduce:transition-none",
        )}
        {...(!open ? { inert: true } : {})}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3">
          <p id={titleId} className="visually-hidden">
            Menu
          </p>
          <Logo compact />
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="inline-flex h-11 min-w-11 items-center gap-2 rounded-sm px-3 text-sm font-medium text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Search
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-6" aria-label="Mobile primary">
          <ul>
            {PRIMARY_NAV.map((item) => {
              const links =
                item.mega?.columns.flatMap((column) => column.links) ??
                (item.href ? [{ id: item.id, label: `Shop ${item.label}`, href: item.href }] : []);
              const hasChildren = Boolean(item.mega);
              const isOpen = expanded === item.id;
              const active = itemMatchesPath(
                pathname,
                item.href,
                links.map((l) => l.href),
              );

              return (
                <li key={item.id} className="border-b border-border-subtle">
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full min-h-[52px] items-center justify-between text-left text-[0.9375rem] font-medium tracking-[0.02em]",
                          active ? "text-power-pink" : "text-foreground",
                        )}
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.id)}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 opacity-60 transition-transform duration-200",
                            isOpen && "rotate-180",
                          )}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </button>
                      <ul
                        className={cn("grid gap-1 pb-4", !isOpen && "hidden")}
                        hidden={!isOpen}
                      >
                        <li>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex min-h-11 items-center py-2 text-sm font-medium text-power-pink"
                          >
                            View all {item.label}
                          </Link>
                        </li>
                        {links.map((link) => (
                          <li key={link.id}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                              className={cn(
                                "flex min-h-11 items-center py-2 text-sm text-foreground-secondary",
                                isActivePath(pathname, link.href) && "text-power-pink",
                              )}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        {item.mega?.educational?.map((link) => (
                          <li key={link.id}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className="flex min-h-11 items-center py-2 text-sm text-foreground-secondary"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-[52px] items-center text-[0.9375rem] font-medium tracking-[0.02em]",
                        active ? "text-power-pink" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 space-y-6">
            <section>
              <h3 className="mb-2 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                Support
              </h3>
              <ul className="space-y-1">
                {MOBILE_SUPPORT_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex min-h-11 items-center py-2 text-sm text-foreground-secondary hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                Policies
              </h3>
              <ul className="space-y-1">
                {MOBILE_POLICY_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex min-h-11 items-center py-2 text-sm text-foreground-secondary hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </nav>

        {/* Thumb-zone sticky actions */}
        <div className="grid grid-cols-3 gap-2 border-t border-border-subtle bg-surface-soft p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Link
            href="/account/login"
            onClick={onClose}
            className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-sm text-caption font-medium text-foreground-secondary hover:bg-surface hover:text-foreground"
          >
            <User className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            Account
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-sm text-caption font-medium text-foreground-secondary hover:bg-surface hover:text-foreground"
            aria-label={wishlistCount ? `Wishlist, ${wishlistCount} items` : "Wishlist"}
          >
            <Heart className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            Wishlist
          </Link>
          <button
            type="button"
            onClick={() => {
              onClose();
              openCart();
            }}
            className="inline-flex min-h-12 flex-col items-center justify-center gap-1 rounded-sm text-caption font-medium text-foreground-secondary hover:bg-surface hover:text-foreground"
            aria-label={cartCount ? `Bag, ${cartCount} items` : "Bag"}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            Bag{cartCount > 0 ? ` (${cartCount})` : ""}
          </button>        </div>
      </aside>
    </div>
  );
}
