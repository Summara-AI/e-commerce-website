"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { AnnouncementItem } from "@/components/header/AnnouncementItem";
import { Container } from "@/components/layout/Container";
import { DEFAULT_ANNOUNCEMENTS, type Announcement } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ksl-announcement-dismissed";

type AnnouncementBarProps = {
  announcements?: Announcement[];
  rotate?: boolean;
  rotateIntervalMs?: number;
  dismissible?: boolean;
};

export function AnnouncementBar({
  announcements = DEFAULT_ANNOUNCEMENTS,
  rotate = true,
  rotateIntervalMs = 6000,
  dismissible = true,
}: AnnouncementBarProps) {
  const labelId = useId();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setDismissed(true);
    } catch {
      /* private mode */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!rotate || announcements.length < 2 || dismissed) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcements.length);
    }, rotateIntervalMs);
    return () => window.clearInterval(id);
  }, [announcements.length, dismissed, rotate, rotateIntervalMs]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  if (!ready || dismissed || announcements.length === 0) return null;

  const current = announcements[index];

  return (
    <div
      role="region"
      aria-labelledby={labelId}
      data-announcement-bar
      className="relative z-[1021] bg-pink-mist text-foreground-inverse"
    >
      <p id={labelId} className="visually-hidden">
        Site announcements
      </p>

      <Container
        width="max"
        className="grid min-h-9 grid-cols-[1fr_auto] items-center gap-2 py-2 tablet:min-h-9"
      >
        <div
          className="flex min-w-0 justify-center px-8 text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnnouncementItem item={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        {dismissible ? (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-sm",
              "text-foreground-inverse/75 transition-opacity hover:text-foreground-inverse",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-pink",
            )}
          >
            <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        ) : null}
      </Container>

      {announcements.length > 1 ? (
        <div
          className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 gap-1 tablet:flex laptop:right-20 desktop:right-24"
          aria-hidden="true"
        >
          {announcements.map((item, i) => (
            <span
              key={item.id}
              className={cn(
                "h-1 w-1 rounded-full bg-foreground-inverse/35",
                i === index && "bg-foreground-inverse",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
