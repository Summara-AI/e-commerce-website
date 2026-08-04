"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Check,
  Gift,
  Heart,
  MapPin,
  Package,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AccountShell } from "@/components/account/AccountShell";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { useAccount } from "@/components/account/account-context";
import { MediaImage } from "@/components/common/MediaImage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ACCOUNT_COPY, ACCOUNT_QUICK_ACTIONS } from "@/content/account";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (target === 0) {
      setValue(0);
      return;
    }
    let frame = 0;
    const steps = 18;
    const id = window.setInterval(() => {
      frame += 1;
      setValue(Math.round((target * frame) / steps));
      if (frame >= steps) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [target, active]);
  return value;
}

/**
 * Premium customer dashboard — Shopify Customer Accounts membership portal.
 */
export function DashboardHome() {
  const reduceMotion = useReducedMotion();
  const { isHydrated, profile, orders, addresses, wishlistCount } = useAccount();
  const recentOrders = orders.slice(0, 3);
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim();

  const ordersCount = useCountUp(orders.length, isHydrated && !reduceMotion);
  const wishCount = useCountUp(wishlistCount, isHydrated && !reduceMotion);
  const addressCount = useCountUp(addresses.length, isHydrated && !reduceMotion);

  if (!isHydrated) {
    return (
      <AccountShell showPageHeader={false} breadcrumbLabel="Dashboard">
        <div className="space-y-6" aria-busy="true" aria-label="Loading account">
          <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
            <Skeleton className="h-32 rounded-card" />
            <Skeleton className="h-32 rounded-card" />
            <Skeleton className="h-32 rounded-card" />
            <Skeleton className="h-32 rounded-card" />
          </div>
          <Skeleton className="h-48 w-full rounded-card" />
        </div>
      </AccountShell>
    );
  }

  return (
    <AccountShell showPageHeader={false} breadcrumbLabel="Dashboard">
      <div className="space-y-14">
        {/* Overview cards */}
        <section aria-labelledby="dashboard-overview-heading">
          <h2 id="dashboard-overview-heading" className="visually-hidden">
            {ACCOUNT_COPY.overviewTitle}
          </h2>
          <ul className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-5">
            <OverviewCard
              href="/account/orders"
              icon={Package}
              label="Recent Orders"
              value={reduceMotion ? orders.length : ordersCount}
              hint={orders.length ? "View history" : "None yet"}
              index={0}
            />
            <OverviewCard
              href="/wishlist"
              icon={Heart}
              label="Wishlist Items"
              value={reduceMotion ? wishlistCount : wishCount}
              hint={wishlistCount ? "Saved pieces" : "Save favourites"}
              index={1}
            />
            <OverviewCard
              href="/account/addresses"
              icon={MapPin}
              label="Saved Addresses"
              value={reduceMotion ? addresses.length : addressCount}
              hint={defaultAddress ? defaultAddress.city : "Add one"}
              index={2}
            />
            <OverviewCard
              href="/account/profile"
              icon={Gift}
              label={ACCOUNT_COPY.rewardsTitle}
              value={ACCOUNT_COPY.rewardsPlaceholder}
              hint={ACCOUNT_COPY.rewardsHint}
              index={3}
              isTextValue
            />
            <OverviewCard
              href="/account/profile#newsletter"
              icon={Sparkles}
              label="Newsletter"
              value={profile.acceptsMarketing ? "On" : "Off"}
              hint={
                profile.acceptsMarketing
                  ? ACCOUNT_COPY.newsletterSubscribed
                  : ACCOUNT_COPY.newsletterUnsubscribed
              }
              index={4}
              isTextValue
              className="tablet:col-span-2 laptop:col-span-1 desktop:col-span-1"
            />
          </ul>
        </section>

        {/* Recent orders */}
        <motion.section
          aria-labelledby="recent-orders-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease }}
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                id="recent-orders-heading"
                className="font-display text-2xl font-light italic text-foreground"
              >
                {ACCOUNT_COPY.ordersPreviewTitle}
              </h2>
              <p className="mt-1 text-sm font-light text-foreground-secondary">
                Latest activity in your member space.
              </p>
            </div>
            <Button asChild variant="text">
              <Link href="/account/orders">All orders</Link>
            </Button>
          </div>

          {recentOrders.length ? (
            <ul className="mt-6 space-y-3">
              {recentOrders.map((order, index) => (
                <motion.li
                  key={order.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.06, ease }}
                >
                  <article
                    className={cn(
                      "flex flex-col gap-4 rounded-card border border-border-subtle bg-canvas/80 p-5",
                      "shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)] transition-[transform,box-shadow] duration-320",
                      "hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(17,17,17,0.35)]",
                      "tablet:flex-row tablet:items-center tablet:justify-between",
                      "motion-reduce:transform-none",
                    )}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{order.number}</p>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <p className="mt-2 text-sm font-light text-foreground-secondary">
                        {formatDate(order.processedAt)}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {order.total.formatted}
                      </p>
                    </div>
                    <Button asChild variant="secondary" className="self-start rounded-full">
                      <Link href={`/account/orders/${order.id}`}>
                        {ACCOUNT_COPY.orderDetails}
                      </Link>
                    </Button>
                  </article>
                </motion.li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title={ACCOUNT_COPY.ordersEmptyTitle}
              description={ACCOUNT_COPY.ordersEmptyDescription}
              ctaLabel={ACCOUNT_COPY.ordersEmptyCta}
              ctaHref={ACCOUNT_COPY.continueHref}
            />
          )}
        </motion.section>

        {/* Account information + Newsletter */}
        <div className="grid gap-6 laptop:grid-cols-2">
          <motion.section
            aria-labelledby="account-info-heading"
            className="rounded-card border border-border-subtle bg-canvas/80 p-6 shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)] tablet:p-7"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="flex items-start justify-between gap-3">
              <h2
                id="account-info-heading"
                className="font-display text-xl font-light italic text-foreground"
              >
                {ACCOUNT_COPY.accountInfoTitle}
              </h2>
              <Button asChild variant="text" size="sm">
                <Link href="/account/profile">{ACCOUNT_COPY.editProfile}</Link>
              </Button>
            </div>
            <dl className="mt-5 space-y-4 text-sm">
              <InfoRow label="Full name" value={fullName || "—"} />
              <InfoRow label="Email" value={profile.email || "—"} />
              <InfoRow label="Phone" value={profile.phone || "—"} />
              <div>
                <dt className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
                  Default shipping
                </dt>
                <dd className="mt-1 font-light leading-relaxed text-foreground-secondary">
                  {defaultAddress ? (
                    <>
                      {defaultAddress.address1}
                      {defaultAddress.address2 ? `, ${defaultAddress.address2}` : ""}
                      <br />
                      {defaultAddress.city}, {defaultAddress.province} {defaultAddress.zip}
                    </>
                  ) : (
                    ACCOUNT_COPY.addressesEmptyDescription
                  )}
                </dd>
                {!defaultAddress ? (
                  <Button asChild variant="text" size="sm" className="mt-2 px-0">
                    <Link href="/account/addresses">{ACCOUNT_COPY.addressesEmptyCta}</Link>
                  </Button>
                ) : (
                  <Button asChild variant="text" size="sm" className="mt-2 px-0">
                    <Link href="/account/addresses">{ACCOUNT_COPY.editAddress}</Link>
                  </Button>
                )}
              </div>
            </dl>
          </motion.section>

          <motion.section
            aria-labelledby="newsletter-card-heading"
            className="rounded-card border border-border-subtle bg-canvas/80 p-6 shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)] tablet:p-7"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.06, ease }}
          >
            <h2
              id="newsletter-card-heading"
              className="font-display text-xl font-light italic text-foreground"
            >
              {ACCOUNT_COPY.newsletterCardTitle}
            </h2>
            <p
              className={cn(
                "mt-4 inline-flex items-center gap-2 text-sm font-medium",
                profile.acceptsMarketing ? "text-emerald-700" : "text-foreground-secondary",
              )}
            >
              {profile.acceptsMarketing ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  {ACCOUNT_COPY.newsletterSubscribed}
                </>
              ) : (
                ACCOUNT_COPY.newsletterUnsubscribed
              )}
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-foreground-secondary">
              {ACCOUNT_COPY.newsletterBody}
            </p>
            <Button asChild variant="outline" size="sm" className="mt-6 rounded-full">
              <Link href="/account/profile#newsletter">{ACCOUNT_COPY.newsletterManage}</Link>
            </Button>
          </motion.section>
        </div>

        {/* Wishlist empty nudge when empty */}
        {!wishlistCount ? (
          <EmptyState
            title={ACCOUNT_COPY.wishlistEmptyTitle}
            description={ACCOUNT_COPY.wishlistEmptyDescription}
            ctaLabel={ACCOUNT_COPY.wishlistEmptyCta}
            ctaHref="/collections/all"
          />
        ) : null}

        {/* Quick actions */}
        <motion.section
          aria-labelledby="quick-actions-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease }}
        >
          <h2
            id="quick-actions-heading"
            className="font-display text-2xl font-light italic text-foreground"
          >
            {ACCOUNT_COPY.quickActionsTitle}
          </h2>
          <ul className="mt-6 grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
            {ACCOUNT_QUICK_ACTIONS.map((action, index) => (
              <motion.li
                key={action.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.05, ease }}
              >
                <Link
                  href={action.href}
                  className={cn(
                    "group relative flex min-h-[14rem] overflow-hidden rounded-card border border-border-subtle",
                    "shadow-[0_12px_32px_-24px_rgba(17,17,17,0.3)] transition-[transform,box-shadow] duration-320",
                    "hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-24px_rgba(17,17,17,0.4)]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                    "motion-reduce:transform-none",
                  )}
                >
                  <MediaImage
                    alt={action.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 25vw"
                    spec={action.imageSpec}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="relative z-[1] mt-auto p-5 font-display text-xl font-light italic text-canvas">
                    {action.title}
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>
    </AccountShell>
  );
}

function OverviewCard({
  href,
  icon: Icon,
  label,
  value,
  hint,
  index,
  isTextValue,
  className,
}: {
  href: string;
  icon: typeof Package;
  label: string;
  value: string | number;
  hint: string;
  index: number;
  isTextValue?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.li
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.05, ease }}
    >
      <Link
        href={href}
        className={cn(
          "group block h-full rounded-card border border-border-subtle bg-canvas/85 p-5",
          "shadow-[0_12px_32px_-24px_rgba(17,17,17,0.28)] transition-[transform,box-shadow,background-color] duration-320",
          "hover:-translate-y-1 hover:bg-canvas hover:shadow-[0_20px_40px_-24px_rgba(17,17,17,0.36)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
          "motion-reduce:transform-none",
        )}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blush text-power-pink transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <p className="mt-4 text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
          {label}
        </p>
        <p
          className={cn(
            "mt-1 font-display font-light text-foreground",
            isTextValue ? "text-2xl" : "text-3xl",
          )}
        >
          {value}
        </p>
        <p className="mt-1 text-sm font-light text-foreground-secondary">{hint}</p>
      </Link>
    </motion.li>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
        {label}
      </dt>
      <dd className="mt-1 font-light text-foreground">{value}</dd>
    </div>
  );
}

function EmptyState({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="rounded-card border border-dashed border-border-subtle bg-blush/40 px-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-canvas text-power-pink shadow-inner">
        <Sparkles className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <p className="mt-5 font-display text-2xl font-light italic text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm font-light leading-relaxed text-foreground-secondary">
        {description}
      </p>
      <Button asChild className="mt-6 rounded-full">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
