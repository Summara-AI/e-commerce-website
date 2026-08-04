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
  DEFAULT_ADDRESSES,
  DEFAULT_PROFILE,
  getScaffoldOrders,
} from "@/lib/account-seed";
import type {
  CustomerAddress,
  CustomerOrder,
  CustomerProfile,
} from "@/lib/account-types";

type AccountContextValue = {
  isHydrated: boolean;
  profile: CustomerProfile;
  updateProfile: (patch: Partial<CustomerProfile>) => void;
  addresses: CustomerAddress[];
  addAddress: (address: Omit<CustomerAddress, "id">) => void;
  updateAddress: (id: string, patch: Partial<CustomerAddress>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  wishlistHandles: string[];
  wishlistCount: number;
  isWishlisted: (handle: string) => boolean;
  toggleWishlist: (handle: string) => void;
  addWishlist: (handle: string) => void;
  removeWishlist: (handle: string) => void;
  orders: CustomerOrder[];
  getOrder: (id: string) => CustomerOrder | undefined;
  /** Local session reset until Shopify Customer Accounts logout connects */
  signOut: () => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

const PROFILE_KEY = "ksl-account-profile-v1";
const ADDRESS_KEY = "ksl-account-addresses-v1";
const WISHLIST_KEY = "ksl-wishlist-v1";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [profile, setProfile] = useState<CustomerProfile>(DEFAULT_PROFILE);
  const [addresses, setAddresses] = useState<CustomerAddress[]>(DEFAULT_ADDRESSES);
  const [wishlistHandles, setWishlistHandles] = useState<string[]>([]);
  const [orders] = useState<CustomerOrder[]>(() => getScaffoldOrders());

  useEffect(() => {
    setProfile(readJson(PROFILE_KEY, DEFAULT_PROFILE));
    setAddresses(readJson(ADDRESS_KEY, DEFAULT_ADDRESSES));
    setWishlistHandles(readJson(WISHLIST_KEY, [] as string[]));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  }, [profile, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(ADDRESS_KEY, JSON.stringify(addresses));
    } catch {
      /* ignore */
    }
  }, [addresses, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistHandles));
    } catch {
      /* ignore */
    }
  }, [wishlistHandles, isHydrated]);

  const updateProfile = useCallback((patch: Partial<CustomerProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const addAddress = useCallback((address: Omit<CustomerAddress, "id">) => {
    const id = `addr-${Date.now()}`;
    setAddresses((prev) => {
      const next = address.isDefault
        ? prev.map((a) => ({ ...a, isDefault: false }))
        : prev;
      return [...next, { ...address, id }];
    });
  }, []);

  const updateAddress = useCallback((id: string, patch: Partial<CustomerAddress>) => {
    setAddresses((prev) => {
      const withDefault =
        patch.isDefault === true
          ? prev.map((a) => ({ ...a, isDefault: a.id === id }))
          : prev;
      return withDefault.map((a) => (a.id === id ? { ...a, ...patch } : a));
    });
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length && !next.some((a) => a.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }, []);

  const isWishlisted = useCallback(
    (handle: string) => wishlistHandles.includes(handle),
    [wishlistHandles],
  );

  const toggleWishlist = useCallback((handle: string) => {
    setWishlistHandles((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [handle, ...prev],
    );
  }, []);

  const addWishlist = useCallback((handle: string) => {
    setWishlistHandles((prev) =>
      prev.includes(handle) ? prev : [handle, ...prev],
    );
  }, []);

  const removeWishlist = useCallback((handle: string) => {
    setWishlistHandles((prev) => prev.filter((h) => h !== handle));
  }, []);

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders],
  );

  const signOut = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    setAddresses(DEFAULT_ADDRESSES);
    setWishlistHandles([]);
    try {
      window.localStorage.removeItem(PROFILE_KEY);
      window.localStorage.removeItem(ADDRESS_KEY);
      window.localStorage.removeItem(WISHLIST_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AccountContextValue>(
    () => ({
      isHydrated,
      profile,
      updateProfile,
      addresses,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultAddress,
      wishlistHandles,
      wishlistCount: wishlistHandles.length,
      isWishlisted,
      toggleWishlist,
      addWishlist,
      removeWishlist,
      orders,
      getOrder,
      signOut,
    }),
    [
      isHydrated,
      profile,
      updateProfile,
      addresses,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultAddress,
      wishlistHandles,
      isWishlisted,
      toggleWishlist,
      addWishlist,
      removeWishlist,
      orders,
      getOrder,
      signOut,
    ],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}

export function useAccountOptional() {
  return useContext(AccountContext);
}
