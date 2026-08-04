"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { PRIMARY_NAV, type MegaPanel } from "@/lib/navigation";
import { itemMatchesPath } from "@/lib/nav-utils";
import { cn } from "@/lib/utils";

type DesktopNavProps = {
  className?: string;
};

export function DesktopNav({ className }: DesktopNavProps) {
  const pathname = usePathname();
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setPortalTarget(document.querySelector<HTMLElement>("[data-site-header]"));
  }, []);

  const clearTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = useCallback((id: string) => {
    clearTimer();
    setOpenId(id);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => setOpenId(null), 140);
  }, []);

  const close = useCallback(() => {
    clearTimer();
    setOpenId(null);
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  const openItem = PRIMARY_NAV.find((item) => item.id === openId);
  const openPanel: MegaPanel | undefined = openItem?.mega;
  const panelId = openId ? `${baseId}-${openId}-panel` : undefined;

  return (
    <>
      <nav className={cn("hidden laptop:block", className)} aria-label="Primary">
        <ul className="flex items-center gap-0.5 desktop:gap-1">
          {PRIMARY_NAV.map((item) => {
            const hasMega = Boolean(item.mega);
            const active = itemMatchesPath(
              pathname,
              item.href,
              item.mega?.columns.flatMap((c) => c.links.map((l) => l.href)) ?? [],
            );
            const expanded = openId === item.id;
            const controlsId = `${baseId}-${item.id}-panel`;

            return (
              <li
                key={item.id}
                onMouseEnter={() => (hasMega ? open(item.id) : close())}
                onMouseLeave={scheduleClose}
              >
                {hasMega ? (
                  <button
                    type="button"
                    className={cn(
                      "relative inline-flex min-h-11 items-center gap-1 rounded-sm px-3 text-sm font-medium tracking-[0.02em]",
                      "text-foreground transition-colors duration-200 ease-soft desktop:px-4",
                      "hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                      (active || expanded) && "text-power-pink",
                      active &&
                        "after:absolute after:bottom-2.5 after:left-3 after:right-3 after:h-px after:bg-power-pink/85 desktop:after:left-4 desktop:after:right-4",
                    )}
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    aria-controls={controlsId}
                    onClick={() => (expanded ? close() : open(item.id))}
                    onFocus={() => open(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        open(item.id);
                      }
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                        expanded && "rotate-180",
                      )}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium tracking-[0.02em]",
                      "text-foreground transition-colors duration-200 ease-soft desktop:px-4",
                      "hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                      active &&
                        "text-power-pink after:absolute after:bottom-2.5 after:left-3 after:right-3 after:h-px after:bg-power-pink/85",
                    )}
                    onMouseEnter={close}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {portalTarget && openPanel && openItem && panelId
        ? createPortal(
            <MegaMenu
              id={panelId}
              panel={openPanel}
              navItemId={openItem.id}
              open
              onMouseEnter={clearTimer}
              onMouseLeave={scheduleClose}
              onNavigate={close}
            />,
            portalTarget,
          )
        : null}
    </>
  );
}
