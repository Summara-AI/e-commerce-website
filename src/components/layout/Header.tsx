"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AccountButton,
  CartIndicator,
  Logo,
  MenuToggle,
  SearchButton,
  WishlistIndicator,
} from "@/components/header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/cart-context";
import { useAccountOptional } from "@/components/account/account-context";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { SearchDrawer } from "@/components/navigation/SearchDrawer";
import { TabletNav } from "@/components/navigation/TabletNav";
import { useHeaderScroll } from "@/hooks/use-header-scroll";
import { emitChromeOverlay } from "@/hooks/use-chrome-overlays";
import { useSearchShortcut } from "@/hooks/use-search-shortcut";
import { cn } from "@/lib/utils";

type HeaderProps = {
  /** Prefer account context; prop kept for isolated previews */
  wishlistCount?: number;
  /** Enable only over dark/full photography heroes for contrast */
  transparentAtTop?: boolean;
};

export function Header({
  wishlistCount,
  transparentAtTop = false,
}: HeaderProps) {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, isOpen: cartOpen, isHydrated } = useCart();
  const account = useAccountOptional();
  const cartCount = isHydrated ? itemCount : 0;
  const resolvedWishlistCount =
    account?.isHydrated
      ? account.wishlistCount
      : (wishlistCount ?? 0);
  const { scrolled, hidden } = useHeaderScroll({
    locked: navOpen || searchOpen || cartOpen,
  });

  const closeNav = useCallback(() => setNavOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openSearch = useCallback(() => {
    setNavOpen(false);
    setSearchOpen(true);
  }, []);

  useSearchShortcut(openSearch);

  useEffect(() => {
    emitChromeOverlay({ search: searchOpen, nav: navOpen });
  }, [searchOpen, navOpen]);

  const isTransparent = transparentAtTop && !scrolled && !navOpen && !searchOpen && !cartOpen;

  return (
    <>
      <header
        data-site-header
        className={cn(
          "relative sticky top-0 z-header border-b border-border-subtle",
          "bg-canvas transition-[transform,background-color,border-color,box-shadow,color] duration-280 ease-out will-change-transform",
          scrolled && "shadow-sticky",
          hidden && "-translate-y-full motion-reduce:translate-y-0",
          isTransparent &&
            "border-transparent bg-transparent shadow-none",
          "motion-reduce:transition-none",
        )}
      >
        <Container
          width="max"
          className={cn(
            "grid min-h-14 items-center gap-3",
            "grid-cols-[1fr_auto] tablet:min-h-[72px] tablet:grid-cols-[auto_1fr_auto]",
            "laptop:grid-cols-[minmax(8rem,1fr)_auto_minmax(8rem,1fr)]",
            "desktop:grid-cols-[minmax(11rem,1fr)_auto_minmax(11rem,1fr)]",
            scrolled && "desktop:min-h-16",
          )}
        >
          <div className="flex min-w-0 items-center gap-1">
            <MenuToggle
              open={navOpen}
              onToggle={() => setNavOpen((v) => !v)}
              controlsId="mobile-nav"
              className="laptop:hidden"
            />
            <Logo inverse={isTransparent} priority />
          </div>

          <TabletNav className="justify-self-center" />
          <DesktopNav className="justify-self-center" />

          <div
            className="flex items-center justify-end gap-0.5 laptop:gap-1"
            role="group"
            aria-label="Account and bag"
          >
            <SearchButton
              onClick={openSearch}
              aria-expanded={searchOpen}
              aria-controls="site-search-drawer"
            />
            <AccountButton className="hidden tablet:inline-flex" />
            <WishlistIndicator
              count={resolvedWishlistCount}
              className="hidden tablet:inline-flex"
            />
            <CartIndicator />
          </div>
        </Container>
      </header>

      <MobileNav
        open={navOpen}
        onClose={closeNav}
        onOpenSearch={openSearch}
        id="mobile-nav"
        cartCount={cartCount}
        wishlistCount={resolvedWishlistCount}
      />

      <SearchDrawer open={searchOpen} onClose={closeSearch} />
      <CartDrawer />
    </>
  );
}
