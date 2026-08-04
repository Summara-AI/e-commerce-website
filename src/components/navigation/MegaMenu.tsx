"use client";

import Link from "next/link";
import type { MegaPanel } from "@/lib/navigation";
import { MegaMenuPromo } from "@/components/navigation/MegaMenuPromo";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  panel: MegaPanel;
  id: string;
  navItemId?: string;
  open: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onNavigate?: () => void;
};

export function MegaMenu({
  panel,
  id,
  navItemId,
  open,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: MegaMenuProps) {
  const columnCount = panel.columns.length + (panel.promo ? 1 : 0);
  const isShopPanel = navItemId === "shop";

  return (
    <div
      id={id}
      role="region"
      aria-label="Submenu"
      hidden={!open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute inset-x-0 top-full z-header border-b border-border-subtle bg-surface shadow-elev2",
        "origin-top transition-[opacity,transform,visibility] duration-320 ease-emphasis",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none -translate-y-1 opacity-0",
      )}
    >
      <Container width="max" className="py-9 desktop:py-12">
        <div
          className={cn(
            "grid gap-10 desktop:gap-12",
            isShopPanel
              ? "items-start laptop:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(320px,1.25fr)]"
              : columnCount >= 4
                ? "laptop:grid-cols-4"
                : columnCount === 3
                  ? "laptop:grid-cols-3"
                  : "laptop:grid-cols-2",
          )}
        >
          {panel.columns.map((column) => (
            <div key={column.id} className={cn("min-w-0", isShopPanel && "laptop:mx-auto laptop:w-full laptop:max-w-[17rem]")}>
              <p className="mb-4 text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
                {column.title}
              </p>
              <ul className={cn("space-y-1.5", isShopPanel && "space-y-2")}>
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className={cn(
                        "block rounded-sm px-2 py-2 -mx-2 text-sm font-medium text-foreground-secondary",
                        "transition-[color,background-color,transform] duration-250 hover:bg-surface-soft hover:text-foreground",
                        isShopPanel && "text-[0.95rem] tracking-[0.01em] hover:translate-x-0.5",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                      )}
                    >
                      {link.label}
                      {link.description ? (
                        <span className="mt-0.5 block text-caption font-normal text-foreground-muted">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {panel.promo ? (
            <MegaMenuPromo promo={panel.promo} onNavigate={onNavigate} premium={isShopPanel} />
          ) : null}
        </div>

        {panel.educational?.length ? (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border-subtle pt-6">
            <span className="text-overline font-medium uppercase tracking-[0.14em] text-foreground-muted">
              Learn
            </span>
            {panel.educational.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={onNavigate}
                className="text-sm font-medium text-power-pink underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
