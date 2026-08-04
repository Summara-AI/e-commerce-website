"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FEATURED_BUNDLES,
  formatPkr,
  type CatalogProduct,
  type Money,
} from "@/lib/catalog";
import { ALL_PRODUCTS } from "@/lib/collections";
export type CartLine = {
  /** Shopify cart line id later */
  id: string;
  merchandiseId: string;
  handle: string;
  title: string;
  variantTitle: string;
  href: string;
  imageAlt: string;
  quantity: number;
  price: Money;
  compareAtPrice?: Money;
  availableForSale: boolean;
};

type AddItemInput = {
  handle: string;
  title: string;
  href: string;
  imageAlt: string;
  price: Money;
  compareAtPrice?: Money;
  availableForSale?: boolean;
  variantTitle?: string;
  quantity?: number;
  merchandiseId?: string;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: Money;
  compareAtSubtotal: Money | null;
  savings: Money | null;
  isOpen: boolean;
  isHydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: AddItemInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ksl-cart-v1";

function lineIdFor(handle: string, variantTitle: string) {
  return `${handle}::${variantTitle}`;
}

function readStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Mini-cart state — local until Shopify Cart API connects.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setLines(readStored());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, isHydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback((item: AddItemInput) => {
    const variantTitle = item.variantTitle ?? "Default";
    const id = lineIdFor(item.handle, variantTitle);
    const qty = Math.max(1, item.quantity ?? 1);

    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) =>
          l.id === id ? { ...l, quantity: Math.min(10, l.quantity + qty) } : l,
        );
      }
      const next: CartLine = {
        id,
        merchandiseId: item.merchandiseId ?? id,
        handle: item.handle,
        title: item.title,
        variantTitle,
        href: item.href,
        imageAlt: item.imageAlt,
        quantity: Math.min(10, qty),
        price: item.price,
        compareAtPrice: item.compareAtPrice,
        availableForSale: item.availableForSale ?? true,
      };
      return [...prev, next];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.id !== lineId));
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.id === lineId ? { ...l, quantity: Math.min(10, quantity) } : l,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotalAmount = useMemo(
    () => lines.reduce((sum, l) => sum + l.price.amount * l.quantity, 0),
    [lines],
  );

  const compareAtAmount = useMemo(
    () =>
      lines.reduce(
        (sum, l) =>
          sum + (l.compareAtPrice?.amount ?? l.price.amount) * l.quantity,
        0,
      ),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      subtotal: formatPkr(subtotalAmount),
      compareAtSubtotal:
        compareAtAmount > subtotalAmount ? formatPkr(compareAtAmount) : null,
      savings:
        compareAtAmount > subtotalAmount
          ? formatPkr(compareAtAmount - subtotalAmount)
          : null,
      isOpen,
      isHydrated,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      lines,
      itemCount,
      subtotalAmount,
      compareAtAmount,
      isOpen,
      isHydrated,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

/** Safe optional hook for components that may render outside provider during tests */
export function useCartOptional() {
  return useContext(CartContext);
}

export function resolveCatalogProduct(handle: string): CatalogProduct | undefined {
  return ALL_PRODUCTS.find((p) => p.handle === handle);
}

export function getCartUpsellProducts(cartHandles: string[], limit = 3): CatalogProduct[] {
  return ALL_PRODUCTS.filter(
    (p) => p.availableForSale && !cartHandles.includes(p.handle),
  ).slice(0, limit);
}

export function getCartUpsellBundles(limit = 1) {
  return FEATURED_BUNDLES.slice(0, limit);
}
