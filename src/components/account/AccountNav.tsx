"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  Headphones,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Package,
  User,
} from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { useAccount } from "@/components/account/account-context";
import { ACCOUNT_COPY, ACCOUNT_NAV } from "@/content/account";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const ICONS = {
  layout: LayoutDashboard,
  package: Package,
  heart: Heart,
  map: MapPin,
  user: User,
  mail: Mail,
  support: Headphones,
} as const;

type AccountNavProps = {
  className?: string;
  orientation?: "sidebar" | "drawer";
  onNavigate?: () => void;
  showLogout?: boolean;
};

function isActive(pathname: string, href: string, match: "exact" | "prefix") {
  const pathOnly = href.split("#")[0] ?? href;
  if (match === "exact") {
    if (href.includes("#")) {
      return pathname === pathOnly;
    }
    return pathname === href;
  }
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

/**
 * Premium dashboard navigation — sticky sidebar + mobile drawer.
 */
export function AccountNav({
  className,
  orientation = "sidebar",
  onNavigate,
  showLogout = true,
}: AccountNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAccount();

  const handleLogout = async () => {
    onNavigate?.();
    signOut();
    await logoutAction();
    toast.success("Signed out", "Come back anytime for your skincare ritual.");
    router.push("/account/login");
    router.refresh();
  };

  return (
    <nav
      aria-label="Account"
      className={cn("flex h-full flex-col", className)}
      data-shopify-block={orientation === "drawer" ? "account-nav-mobile" : "account-nav"}
    >
      <ul className="space-y-1">
        {ACCOUNT_NAV.map((item) => {
          const Icon = ICONS[item.icon];
          const active = isActive(pathname, item.href, item.match);
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex min-h-11 items-center gap-3 rounded-lg px-3.5 text-sm font-medium tracking-[0.01em]",
                  "transition-[color,background-color,transform] duration-280 ease-out",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  active
                    ? "bg-blush text-power-pink shadow-sm"
                    : "text-foreground-secondary hover:translate-x-0.5 hover:bg-surface-soft hover:text-foreground",
                  "motion-reduce:transform-none",
                )}
              >
                {active ? (
                  <span
                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-power-pink"
                    aria-hidden="true"
                  />
                ) : null}
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {showLogout ? (
        <div className="mt-auto border-t border-border-subtle pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "flex w-full min-h-11 items-center gap-3 rounded-lg px-3.5 text-sm font-medium text-foreground-secondary",
              "transition-colors duration-280 hover:bg-soft-pink/50 hover:text-foreground",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            {ACCOUNT_COPY.logoutLabel}
          </button>
        </div>
      ) : null}
    </nav>
  );
}
