"use client";

import dynamic from "next/dynamic";
import { AccountProvider } from "@/components/account/account-context";
import { CartProvider } from "@/components/cart/cart-context";
import { ChromeProvider } from "@/components/providers/ChromeContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const Toaster = dynamic(
  () => import("sonner").then((m) => m.Toaster),
  { ssr: false },
);

/**
 * Client providers for storefront chrome.
 * Analytics pixels load post-consent in a future island — not on critical path.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      <ChromeProvider>
        <CartProvider>
          <AccountProvider>
            {children}
            <Toaster
              position="top-center"
              closeButton
              richColors={false}
              toastOptions={{
                className: "font-sans text-sm",
                style: {
                  background: "var(--bg-surface)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-card)",
                },
              }}
            />
          </AccountProvider>
        </CartProvider>
      </ChromeProvider>
    </TooltipProvider>
  );
}
