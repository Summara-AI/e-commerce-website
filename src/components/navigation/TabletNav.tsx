"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TABLET_PRIMARY_LINKS } from "@/lib/navigation";
import { itemMatchesPath } from "@/lib/nav-utils";
import { cn } from "@/lib/utils";

type TabletNavProps = {
  className?: string;
};

/**
 * Tablet-only condensed primary links.
 * Full mega menus are desktop/laptop; deeper IA lives in the drawer.
 */
export function TabletNav({ className }: TabletNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("hidden tablet:block laptop:hidden", className)}
      aria-label="Primary condensed"
    >
      <ul className="flex items-center gap-1">
        {TABLET_PRIMARY_LINKS.map((item) => {
          const active = itemMatchesPath(
            pathname,
            item.href,
            item.mega?.columns.flatMap((c) => c.links.map((l) => l.href)) ?? [],
          );

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-sm px-2.5 text-sm font-medium tracking-[0.02em]",
                  "text-foreground transition-colors hover:text-power-pink",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  active && "text-power-pink",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
