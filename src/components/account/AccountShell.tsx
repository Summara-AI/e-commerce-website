"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, Settings, User, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AccountNav } from "@/components/account/AccountNav";
import { useAccount } from "@/components/account/account-context";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useBodyLock } from "@/hooks/use-body-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { ACCOUNT_COPY } from "@/content/account";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type AccountShellProps = {
  children: React.ReactNode;
  /** When false, omit secondary page title (dashboard uses welcome header only). */
  showPageHeader?: boolean;
  title?: string;
  description?: string;
  breadcrumbLabel?: string;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
};

/**
 * Premium membership portal chrome — sticky 280px sidebar, mobile drawer.
 */
export function AccountShell({
  children,
  showPageHeader = true,
  title,
  description,
  breadcrumbLabel,
  breadcrumbs,
  className,
}: AccountShellProps) {
  const reduceMotion = useReducedMotion();
  const { profile, isHydrated } = useAccount();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const titleId = useId();

  useBodyLock(drawerOpen);
  useFocusTrap(drawerOpen, drawerRef);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const crumbs =
    breadcrumbs ??
    [
      { label: "Account", href: "/account" },
      ...(breadcrumbLabel ? [{ label: breadcrumbLabel }] : []),
    ];

  const firstName = profile.firstName.trim();
  const greeting = firstName
    ? ACCOUNT_COPY.welcomeNamed(firstName)
    : ACCOUNT_COPY.welcomeFallback;
  const initials = [profile.firstName, profile.lastName]
    .map((p) => p.trim().charAt(0))
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase() || "K";

  return (
    <Section
      spacing="tight"
      className={cn(
        "min-h-[70vh] bg-[linear-gradient(180deg,var(--color-pearl)_0%,var(--color-canvas)_40%,var(--color-blush)_100%)]",
        className,
      )}
      data-shopify-section="customer-account"
      reveal={false}
    >
      <Container width="max" className="mx-auto max-w-[1400px]">
        <Breadcrumb items={crumbs} />

        <motion.div
          className="mt-8 flex flex-col gap-6 border-b border-border-subtle pb-8 tablet:flex-row tablet:items-center tablet:justify-between"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border-subtle bg-canvas text-foreground laptop:hidden"
              aria-expanded={drawerOpen}
              aria-controls="account-drawer"
              aria-label="Open account menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <span
              className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blush text-sm font-medium tracking-[0.04em] text-power-pink shadow-inner"
              aria-hidden={!isHydrated}
            >
              {isHydrated ? (
                initials
              ) : (
                <User className="h-5 w-5" strokeWidth={1.5} />
              )}
            </span>
            <div>
              <p className="font-sans text-overline font-medium uppercase tracking-[0.14em] text-power-pink">
                {ACCOUNT_COPY.portalEyebrow}
              </p>
              <h1 className="mt-1 font-display text-2xl font-light italic tracking-[-0.02em] text-foreground tablet:text-3xl">
                {greeting}
              </h1>
              <p className="mt-1 text-sm font-light text-foreground-secondary">
                {ACCOUNT_COPY.journeySupport}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start tablet:self-auto">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/account/profile">
                <Settings className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {ACCOUNT_COPY.settingsLabel}
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-10 laptop:grid-cols-[280px_minmax(0,1fr)] laptop:gap-12 desktop:gap-16">
          <aside className="hidden laptop:block">
            <div className="sticky top-28 rounded-[1.25rem] border border-border-subtle bg-canvas/80 p-5 shadow-[0_16px_40px_-28px_rgba(17,17,17,0.28)] backdrop-blur-[2px]">
              <AccountNav orientation="sidebar" />
            </div>
          </aside>

          <div className="min-w-0">
            {showPageHeader && title ? (
              <header className="max-w-2xl">
                <h2 className="font-display text-h2 font-light tracking-[-0.01em] text-foreground">
                  {title}
                </h2>
                {description ? (
                  <p className="mt-3 text-base font-light leading-relaxed text-foreground-secondary">
                    {description}
                  </p>
                ) : null}
              </header>
            ) : null}

            <div className={cn(showPageHeader && title ? "mt-8 tablet:mt-10" : undefined)}>
              {children}
            </div>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {drawerOpen ? (
          <div className="fixed inset-0 z-drawer laptop:hidden" role="presentation">
            <motion.button
              type="button"
              className="absolute inset-0 border-0 bg-ink/35"
              aria-label="Close account menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              ref={drawerRef}
              id="account-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="absolute inset-y-0 left-0 flex h-[100dvh] w-[min(100%,20rem)] flex-col bg-canvas pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-elev3"
              initial={reduceMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <div className="flex items-center justify-between border-b border-border-subtle px-4 py-4">
                <p
                  id={titleId}
                  className="text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted"
                >
                  Menu
                </p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto p-4 pb-8">
                <AccountNav
                  orientation="drawer"
                  onNavigate={() => setDrawerOpen(false)}
                />
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
