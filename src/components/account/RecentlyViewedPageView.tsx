"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { AccountShell } from "@/components/account/AccountShell";
import { ProductCard } from "@/components/commerce/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { ACCOUNT_COPY } from "@/content/account";
import {
  productsFromHandles,
  readRecentlyViewedHandles,
} from "@/lib/product-recommendations";
import type { CatalogProduct } from "@/lib/catalog";

export function RecentlyViewedPageView() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handles = readRecentlyViewedHandles();
    setProducts(productsFromHandles(handles));
    setReady(true);
  }, []);

  return (
    <AccountShell
      title={ACCOUNT_COPY.recentlyTitle}
      description="A quiet trail of products you’ve explored — prepared for Shopify customer data."
      breadcrumbLabel="Recently viewed"
    >
      {!ready ? (
        <div
          className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4"
          aria-busy="true"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] w-full rounded-md" />
          ))}
        </div>
      ) : !products.length ? (
        <EmptyState
          icon={<Clock className="h-10 w-10" strokeWidth={1.25} />}
          title={ACCOUNT_COPY.recentlyEmptyTitle}
          description={ACCOUNT_COPY.recentlyEmptyDescription}
          actionLabel={ACCOUNT_COPY.continueShopping}
          actionHref={ACCOUNT_COPY.continueHref}
        />
      ) : (
        <ul
          className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 tablet:grid-cols-3 tablet:gap-6 laptop:grid-cols-4"
          data-shopify-block="recently-viewed"
        >
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} density="compact" />
            </li>
          ))}
        </ul>
      )}
    </AccountShell>
  );
}
