"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Maximize,
  Minimize2,
  Pause,
  PictureInPicture2,
  Play,
  Star,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";
import { useChromeOverlays } from "@/hooks/use-chrome-overlays";
import {
  HOME_UGC_WIDGET,
  UGC_SESSION_KEYS,
  type UgcWidgetConfig,
} from "@/content/ugc-widget";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

type FloatingUgcWidgetProps = {
  config?: Partial<UgcWidgetConfig>;
  className?: string;
};

function readFlag(key: string) {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeFlag(key: string, on: boolean) {
  try {
    if (on) sessionStorage.setItem(key, "1");
    else sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function cookieUp() {
  try {
    return !localStorage.getItem("ksl-cookie-consent");
  } catch {
    return true;
  }
}

/**
 * Premium floating UGC journey — entrance, nudge, hover reveal, two-tap mobile, editorial modal.
 */
export function FloatingUgcWidget({
  config: override,
  className,
}: FloatingUgcWidgetProps) {
  const config: UgcWidgetConfig = { ...HOME_UGC_WIDGET, ...override };
  const reduceMotion = useReducedMotion();
  const { isOpen: cartOpen } = useCart();
  const { chromeBlocking } = useChromeOverlays();
  const titleId = useId();
  const floatControls = useAnimationControls();

  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [entered, setEntered] = useState(false);
  const [cookieLift, setCookieLift] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  /** Desktop hover expansion */
  const [hovered, setHovered] = useState(false);
  /** Idle nudge strip */
  const [nudgeOpen, setNudgeOpen] = useState(false);
  /** Mobile: first tap expands caption; second opens modal */
  const [mobilePrimed, setMobilePrimed] = useState(false);
  const [badgeShimmer, setBadgeShimmer] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const interacted = useRef(false);

  const hidden = chromeBlocking;
  const pauseFloat = cartOpen || chromeBlocking || modalOpen;

  const openModal = useCallback(() => {
    interacted.current = true;
    setNudgeOpen(false);
    setMobilePrimed(false);
    setShouldLoadVideo(true);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    setDismissed(readFlag(UGC_SESSION_KEYS.dismissed));
    setMinimized(readFlag(UGC_SESSION_KEYS.minimized));
    setCookieLift(cookieUp());
    setHydrated(true);
    const onCookie = () => setCookieLift(cookieUp());
    window.addEventListener("ksl:cookie-consent-change", onCookie);
    return () => window.removeEventListener("ksl:cookie-consent-change", onCookie);
  }, []);

  /** Entrance — 2s delay, once */
  useEffect(() => {
    if (!hydrated || dismissed) return;
    if (readFlag(UGC_SESSION_KEYS.entered)) {
      setEntered(true);
      return;
    }
    const t = window.setTimeout(() => {
      setEntered(true);
      writeFlag(UGC_SESSION_KEYS.entered, true);
    }, config.entranceDelayMs);
    return () => window.clearTimeout(t);
  }, [hydrated, dismissed, config.entranceDelayMs]);

  /** Idle nudge at 15s — once per session */
  useEffect(() => {
    if (!entered || dismissed || minimized || reduceMotion) return;
    if (readFlag(UGC_SESSION_KEYS.nudgeShown)) return;
    const show = window.setTimeout(() => {
      if (interacted.current || modalOpen) return;
      setNudgeOpen(true);
      writeFlag(UGC_SESSION_KEYS.nudgeShown, true);
      window.setTimeout(() => setNudgeOpen(false), config.nudgeVisibleMs);
    }, config.nudgeAfterMs);
    return () => window.clearTimeout(show);
  }, [
    entered,
    dismissed,
    minimized,
    reduceMotion,
    modalOpen,
    config.nudgeAfterMs,
    config.nudgeVisibleMs,
  ]);

  /** Discrete float every 6s — pause when cart / overlays open */
  useEffect(() => {
    if (!entered || dismissed || minimized || reduceMotion || pauseFloat) {
      return;
    }
    const id = window.setInterval(() => {
      void floatControls.start({
        y: [0, -4, 0],
        transition: { duration: 2.2, ease: easeOut },
      });
    }, 6000);
    return () => window.clearInterval(id);
  }, [
    entered,
    dismissed,
    minimized,
    reduceMotion,
    pauseFloat,
    floatControls,
  ]);

  /** Badge shimmer every 20s */
  useEffect(() => {
    if (!entered || reduceMotion) return;
    const id = window.setInterval(() => {
      setBadgeShimmer(true);
      window.setTimeout(() => setBadgeShimmer(false), 1300);
    }, 20000);
    return () => window.clearInterval(id);
  }, [entered, reduceMotion]);

  /** Prefetch when visible */
  useEffect(() => {
    if (!entered || minimized || dismissed) return;
    const node = cardRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setShouldLoadVideo(true);
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [entered, minimized, dismissed]);

  const dismiss = () => {
    setModalOpen(false);
    setDismissed(true);
    writeFlag(UGC_SESSION_KEYS.dismissed, true);
  };

  const minimize = () => {
    setModalOpen(false);
    setMinimized(true);
    writeFlag(UGC_SESSION_KEYS.minimized, true);
  };

  const restore = () => {
    setMinimized(false);
    writeFlag(UGC_SESSION_KEYS.minimized, false);
  };

  const onCardActivate = () => {
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (isCoarse) {
      if (!mobilePrimed) {
        setMobilePrimed(true);
        interacted.current = true;
        return;
      }
      openModal();
      return;
    }
    openModal();
  };

  if (!hydrated || dismissed) return null;

  const showCard = entered && !minimized;
  const showBubble = entered && minimized;

  return (
    <>
      <AnimatePresence>
        {showBubble ? (
          <motion.button
            key="bubble"
            type="button"
            aria-label="Restore customer story"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: hidden ? 0 : 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.4, ease: easeOut }}
            onClick={restore}
            className={cn(
              "fixed z-float flex h-[60px] w-[60px] items-center justify-center rounded-full",
              "border-2 border-power-pink bg-canvas/90 text-power-pink backdrop-blur-md",
              "shadow-[0_16px_36px_-16px_rgba(232,0,111,0.45)]",
              "right-4 bottom-4 tablet:right-5 tablet:bottom-5 laptop:right-6 laptop:bottom-6",
              cookieLift && "bottom-[min(42vh,18rem)] tablet:bottom-5",
              hidden && "pointer-events-none",
              className,
            )}
            style={{
              right: "max(1rem, env(safe-area-inset-right))",
              bottom: cookieLift
                ? undefined
                : "max(1rem, env(safe-area-inset-bottom))",
            }}
          >
            <Play className="h-5 w-5 fill-current" strokeWidth={1.5} />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showCard ? (
          <motion.div
            key="card"
            ref={cardRef}
            role="complementary"
            aria-labelledby={titleId}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 28, scale: 0.92 }
            }
            animate={{
              opacity: hidden ? 0 : 1,
              y: 0,
              scale: 1,
            }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className={cn(
              "fixed z-float",
              "right-4 bottom-4 tablet:right-5 tablet:bottom-5 laptop:right-6 laptop:bottom-6",
              cartOpen && "bottom-[min(38vh,16rem)] tablet:bottom-24",
              /* Lift above sticky ATC when PDP purchase bar is visible */
              "[html[data-sticky-purchase=true]_&]:bottom-[calc(5.5rem+env(safe-area-inset-bottom))] laptop:[html[data-sticky-purchase=true]_&]:bottom-6",
              hidden && "pointer-events-none",
              className,
            )}
            style={{
              right: "max(1rem, env(safe-area-inset-right))",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <motion.div animate={floatControls} className="relative">
              {/* Idle nudge */}
              <AnimatePresence>
                {nudgeOpen ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 6, height: 0 }}
                    transition={{ duration: 0.45, ease: easeOut }}
                    className="mb-2 overflow-hidden rounded-full border border-border-subtle/80 bg-canvas/90 px-3 py-1.5 text-center text-[0.68rem] font-light text-foreground shadow-elev1 backdrop-blur-md"
                  >
                    {config.nudgeLabel}
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <motion.button
                type="button"
                onClick={onCardActivate}
                onMouseEnter={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.matchMedia("(hover: hover) and (pointer: fine)").matches
                  ) {
                    setHovered(true);
                  }
                }}
                onMouseLeave={() => setHovered(false)}
                aria-label={`Open ${config.ariaLabel}`}
                className={cn(
                  "group relative block cursor-pointer overflow-hidden text-left",
                  "border border-white/45 bg-blush/85 backdrop-blur-md",
                  "rounded-[30px]",
                  "transition-[width,box-shadow,border-color] duration-360 ease-out",
                  /* Default sizes */
                  "h-[220px] w-[125px]",
                  "tablet:h-[275px] tablet:w-[155px]",
                  "laptop:h-[300px] laptop:w-[170px]",
                  "desktop:h-[320px] desktop:w-[180px]",
                  /* Hover expand +40px */
                  hovered &&
                    "w-[165px] tablet:w-[195px] laptop:w-[210px] desktop:w-[220px]",
                  /* Mobile first-tap: slight expand */
                  mobilePrimed &&
                    !hovered &&
                    "w-[138px] tablet:w-[168px]",
                  "shadow-[0_22px_52px_-24px_rgba(17,17,17,0.4),0_0_0_1px_rgba(255,255,255,0.25)]",
                  "hover:border-power-pink/35",
                  "hover:shadow-[0_30px_60px_-20px_rgba(232,0,111,0.36)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  (hovered || mobilePrimed) && "z-[1]",
                )}
              >
                <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                  {shouldLoadVideo && config.videoSrc && !videoFailed ? (
                    <video
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-500",
                        "group-hover:scale-[1.03] motion-reduce:group-hover:scale-100",
                      )}
                      muted
                      playsInline
                      preload="none"
                      poster={config.posterSrc}
                      aria-hidden="true"
                      onError={() => setVideoFailed(true)}
                    >
                      {config.videoSrcWebm ? (
                        <source src={config.videoSrcWebm} type="video/webm" />
                      ) : null}
                      <source src={config.videoSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <UgcPlaceholder posterSrc={config.posterSrc} />
                  )}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.08)_0%,transparent_40%,rgba(17,17,17,0.78)_100%)]"
                    aria-hidden="true"
                  />
                </div>

                {/* Corner controls */}
                <div
                  className={cn(
                    "absolute right-1.5 top-1.5 z-[4] flex gap-1",
                  )}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <Chip
                    label="Minimize"
                    onClick={minimize}
                  >
                    <Minimize2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Chip>
                  <Chip label="Close" onClick={dismiss}>
                    <X className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Chip>
                </div>

                {/* Play */}
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-[38%] z-[3] -translate-x-1/2 -translate-y-1/2",
                    "inline-flex h-11 w-11 items-center justify-center rounded-full",
                    "border border-white/55 bg-canvas/70 text-power-pink backdrop-blur-md shadow-elev1",
                    !reduceMotion && "ugc-play-pulse",
                  )}
                  aria-hidden="true"
                >
                  <Play className="h-4 w-4 fill-current" strokeWidth={1.5} />
                </span>

                {/* Default copy */}
                <div className="absolute inset-x-0 bottom-0 z-[2] space-y-1 px-3 pb-3 pt-10">
                  <p
                    className={cn(
                      "inline-flex items-center gap-1 text-[0.58rem] font-medium uppercase tracking-[0.08em] text-canvas",
                      badgeShimmer && "ugc-badge-shimmer rounded-sm",
                    )}
                  >
                    <span aria-hidden="true">★★★★★</span>
                    <span>{config.verifiedBadge}</span>
                  </p>
                  <p
                    id={titleId}
                    className="font-display text-[0.85rem] font-light italic leading-tight text-canvas"
                  >
                    {config.customerName}
                  </p>
                  <p className="text-[0.65rem] font-light text-canvas/85">
                    {config.caption}
                  </p>

                  {/* Hover / mobile-prime reveal */}
                  <AnimatePresence>
                    {(hovered || mobilePrimed) && !reduceMotion ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.28, ease: easeOut }}
                        className="pt-1"
                      >
                        <p className="text-[0.62rem] font-medium text-canvas">
                          {config.hoverCta}
                        </p>
                      </motion.div>
                    ) : null}
                    {(hovered || mobilePrimed) && reduceMotion ? (
                      <p className="pt-1 text-[0.62rem] font-medium text-canvas">
                        {config.hoverCta}
                      </p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>

            <p className="sr-only" aria-live="polite">
              {mobilePrimed
                ? "Tap again to watch the customer story"
                : ""}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <UgcStoryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        config={config}
        shouldLoadVideo={shouldLoadVideo}
        videoFailed={videoFailed}
        onVideoError={() => setVideoFailed(true)}
      />
    </>
  );
}

function Chip({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full",
        "border border-white/45 bg-canvas/75 text-ink backdrop-blur-md",
        "transition-[transform,background-color,color] duration-200",
        "hover:scale-105 hover:bg-power-pink hover:text-foreground-on-primary",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
      )}
    >
      {children}
    </button>
  );
}

function UgcPlaceholder({ posterSrc }: { posterSrc?: string }) {
  return (
    <div className="relative h-full w-full bg-blush" data-ugc-placeholder="true">
      {posterSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- small decorative poster; Next/Image when CDN URL lands
        <img
          src={posterSrc}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(155deg,var(--color-blush),var(--color-pink-mist)_50%,var(--color-pearl))]" />
          <div className="absolute inset-[-15%] animate-[ksl-ugc-drift_16s_ease-in-out_infinite] bg-[radial-gradient(circle_at_35%_40%,rgba(232,0,111,0.2),transparent_55%)] motion-reduce:animate-none" />
        </>
      )}
    </div>
  );
}

function UgcStoryModal({
  open,
  onOpenChange,
  config,
  shouldLoadVideo,
  videoFailed,
  onVideoError,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  config: UgcWidgetConfig;
  shouldLoadVideo: boolean;
  videoFailed: boolean;
  onVideoError: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);
  const [pipOk, setPipOk] = useState(false);
  const touchY = useRef<number | null>(null);

  useEffect(() => {
    setPipOk(
      typeof document !== "undefined" && document.pictureInPictureEnabled,
    );
  }, []);

  useEffect(() => {
    if (!open) {
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
      setPlaying(false);
      setProgress(0);
      setMuted(true);
      return;
    }
    const v = videoRef.current;
    if (!v || videoFailed) return;
    v.muted = true;
    void v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [open, videoFailed]);

  useEffect(() => {
    if (!open) return;
    const onVis = () => {
      if (document.hidden) {
        videoRef.current?.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [open]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (v.ended || v.currentTime >= (v.duration || 0) - 0.05) {
        v.currentTime = 0;
      }
      void v.play().then(() => setPlaying(true));
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onTime = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
    setDuration(v.duration);
  };

  const seek = (e: ReactPointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio);
  };

  const goFullscreen = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await v.requestFullscreen();
    } catch {
      /* unsupported */
    }
  };

  const goPip = async () => {
    const v = videoRef.current;
    if (!v || !document.pictureInPictureEnabled) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await v.requestPictureInPicture();
    } catch {
      /* unsupported */
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-modal bg-ink/40 backdrop-blur-[12px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-360",
          )}
        />
        <DialogPrimitive.Content
          onTouchStart={(e) => {
            touchY.current = e.touches[0]?.clientY ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchY.current;
            const end = e.changedTouches[0]?.clientY;
            touchY.current = null;
            if (start != null && end != null && end - start > 90) onOpenChange(false);
          }}
          className={cn(
            "fixed left-1/2 top-1/2 z-modal flex max-h-[calc(100dvh-2rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-[min(95vw,460px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden",
            "rounded-[34px] border border-border-subtle/70 bg-canvas",
            "shadow-[0_36px_90px_-30px_rgba(17,17,17,0.5)]",
            "tablet:max-h-[min(85dvh,calc(100dvh-2rem))] tablet:w-[90vw] tablet:max-w-[420px]",
            "laptop:max-h-[min(82dvh,calc(100dvh-2rem))] laptop:max-w-[420px]",
            "desktop:max-w-[460px]",
            "my-[max(0.5rem,env(safe-area-inset-top))]",
            "duration-360 data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "focus:outline-none",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {config.customerName} customer story
          </DialogPrimitive.Title>

          <DialogPrimitive.Close
            className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-canvas/85 text-ink backdrop-blur-md transition-colors hover:bg-power-pink hover:text-foreground-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </DialogPrimitive.Close>

          <div className="relative mx-auto w-full shrink-0 bg-blush aspect-[9/14] max-h-[min(48vh,26rem)]">
            {open && shouldLoadVideo && config.videoSrc && !videoFailed ? (
              <video
                key="ugc-modal-video"
                ref={videoRef}
                className="h-full w-full object-cover"
                muted={muted}
                loop
                playsInline
                preload="metadata"
                poster={config.posterSrc}
                onTimeUpdate={onTime}
                onLoadedMetadata={onTime}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onError={onVideoError}
                onClick={togglePlay}
              >
                {config.videoSrcWebm ? (
                  <source src={config.videoSrcWebm} type="video/webm" />
                ) : null}
                <source src={config.videoSrc} type="video/mp4" />
              </video>
            ) : (
              <UgcPlaceholder posterSrc={config.posterSrc} />
            )}

            {/* Controls */}
            <div className="absolute inset-x-0 bottom-0 z-[2] space-y-2 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-3 pt-10">
              <div
                role="slider"
                aria-label="Video progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                tabIndex={0}
                className="relative h-11 cursor-pointer py-4"
                onPointerDown={seek}
              >
                <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/25">
                  <div
                    className="h-full rounded-full bg-power-pink transition-[width] duration-100"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={playing ? "Pause" : "Play"}
                  onClick={togglePlay}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-canvas hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                >
                  {playing ? (
                    <Pause className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <Play className="h-4 w-4 fill-current" strokeWidth={1.75} />
                  )}
                </button>
                <button
                  type="button"
                  aria-label={muted ? "Unmute" : "Mute"}
                  onClick={toggleMute}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-canvas hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <Volume2 className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Fullscreen"
                  onClick={goFullscreen}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-canvas hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                >
                  <Maximize className="h-4 w-4" strokeWidth={1.75} />
                </button>
                {pipOk ? (
                  <button
                    type="button"
                    aria-label="Picture in picture"
                    onClick={goPip}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-canvas hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                  >
                    <PictureInPicture2 className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                ) : null}
                <span className="ml-auto text-[0.65rem] text-canvas/80">
                  {duration
                    ? `${Math.floor(progress * duration)}s / ${Math.floor(duration)}s`
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 tablet:px-6">
            <header>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-light italic text-foreground tablet:text-2xl">
                  {config.customerName}
                </h2>
                <span className="rounded-full bg-pink-mist px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-power-pink">
                  {config.verifiedBadge}
                </span>
              </div>
              <div
                className="mt-2 flex gap-0.5 text-power-pink"
                aria-label={`${config.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5"
                    fill={i < config.rating ? "currentColor" : "none"}
                    strokeWidth={1.25}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">
                {config.routineLabel}
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed text-foreground-secondary">
                “{config.quote}”
              </p>
            </header>

            {config.featuredProducts.length ? (
              <div>
                <p className="text-caption font-medium uppercase tracking-[0.1em] text-foreground-muted">
                  Products featured
                </p>
                <ul className="mt-2 space-y-1.5">
                  {config.featuredProducts.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        className="text-sm font-light text-foreground hover:text-power-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <Button
              asChild
              className="group/cta relative w-full overflow-hidden rounded-full ugc-cta-ripple"
            >
              <Link
                href={config.modalCtaHref}
                className="inline-flex items-center justify-center gap-2"
              >
                {config.modalCtaLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-280 group-hover/cta:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </Link>
            </Button>

            <p className="text-center text-[0.65rem] text-foreground-muted tablet:hidden">
              Swipe down to close
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
