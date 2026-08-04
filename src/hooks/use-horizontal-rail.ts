"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefCallback,
} from "react";

type UseHorizontalRailOptions = {
  /** Convert vertical wheel into horizontal scroll when the rail can move. */
  mapVerticalWheel?: boolean;
  /** Smooth scroll duration for arrow / keyboard navigation (ms). */
  scrollDuration?: number;
  /** Selector for snap items inside the rail. */
  itemSelector?: string;
};

export type HorizontalRailApi = {
  ref: RefCallback<HTMLUListElement>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getGap(el: HTMLElement) {
  const style = getComputedStyle(el);
  return parseFloat(style.columnGap || style.gap) || 0;
}

function getItems(el: HTMLElement, itemSelector: string) {
  return Array.from(el.querySelectorAll<HTMLElement>(itemSelector));
}

function getMaxScroll(el: HTMLElement) {
  return Math.max(0, el.scrollWidth - el.clientWidth);
}

function clampScroll(el: HTMLElement, left: number) {
  return Math.max(0, Math.min(getMaxScroll(el), left));
}

function readEdges(el: HTMLElement) {
  const max = getMaxScroll(el);
  if (max < 1) {
    return { prev: false, next: false };
  }
  return {
    prev: el.scrollLeft > 1,
    next: el.scrollLeft < max - 1,
  };
}

function getActiveIndex(el: HTMLElement, items: HTMLElement[]) {
  if (!items.length) return 0;

  const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
  const target = el.scrollLeft + pad + 2;
  let index = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].offsetLeft <= target) {
      index = i;
    }
  }

  return index;
}

function scrollItemIntoView(
  el: HTMLElement,
  item: HTMLElement,
  behavior: ScrollBehavior,
) {
  const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
  const target = clampScroll(el, item.offsetLeft - pad);

  if (behavior === "auto" || prefersReducedMotion()) {
    el.scrollLeft = target;
    return;
  }

  el.scrollTo({ left: target, behavior: "smooth" });
}

/**
 * Premium horizontal product / collection rail.
 * Native CSS scroll-snap + mouse drag + trackpad + keyboard + arrow API.
 */
export function useHorizontalRail({
  mapVerticalWheel = true,
  scrollDuration = 450,
  itemSelector = "[data-rail-item]",
}: UseHorizontalRailOptions = {}): HorizontalRailApi {
  const elRef = useRef<HTMLUListElement | null>(null);
  const [scrollEl, setScrollEl] = useState<HTMLUListElement | null>(null);
  const drag = useRef({
    active: false,
    moved: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const setRef = useCallback<RefCallback<HTMLUListElement>>((node) => {
    elRef.current = node;
    setScrollEl(node);
  }, []);

  const applyEdges = useCallback((el: HTMLElement) => {
    const { prev, next } = readEdges(el);
    setCanScrollPrev(prev);
    setCanScrollNext(next);
  }, []);

  const updateEdges = useCallback(() => {
    const el = elRef.current;
    if (!el) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }
    applyEdges(el);
  }, [applyEdges]);

  const scrollToIndex = useCallback(
    (direction: 1 | -1) => {
      const el = elRef.current;
      if (!el) return;

      const items = getItems(el, itemSelector);
      if (!items.length) {
        const step = Math.max(el.clientWidth * 0.85, 280);
        const behavior: ScrollBehavior =
          scrollDuration <= 0 || prefersReducedMotion() ? "auto" : "smooth";
        el.scrollTo({
          left: clampScroll(el, el.scrollLeft + direction * step),
          behavior,
        });
        return;
      }

      const current = getActiveIndex(el, items);
      const next = Math.max(0, Math.min(items.length - 1, current + direction));
      const behavior: ScrollBehavior =
        scrollDuration <= 0 || prefersReducedMotion() ? "auto" : "smooth";
      scrollItemIntoView(el, items[next], behavior);
    },
    [itemSelector, scrollDuration],
  );

  const scrollPrev = useCallback(() => scrollToIndex(-1), [scrollToIndex]);
  const scrollNext = useCallback(() => scrollToIndex(1), [scrollToIndex]);

  const snapToNearest = useCallback(() => {
    const el = elRef.current;
    if (!el) return;

    const items = getItems(el, itemSelector);
    if (!items.length) return;

    const index = getActiveIndex(el, items);
    scrollItemIntoView(el, items[index], "auto");
  }, [itemSelector]);

  const onWheel = useCallback(
    (event: WheelEvent) => {
      const el = elRef.current;
      if (!el) return;

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      const maxScroll = getMaxScroll(el);
      if (maxScroll <= 0) return;

      if (absX > absY || event.shiftKey) return;

      if (!mapVerticalWheel || absY === 0) return;

      const canMove =
        (event.deltaY > 0 && el.scrollLeft < maxScroll - 0.5) ||
        (event.deltaY < 0 && el.scrollLeft > 0.5);

      if (!canMove) return;

      event.preventDefault();
      el.scrollLeft = clampScroll(el, el.scrollLeft + event.deltaY);
      applyEdges(el);
    },
    [applyEdges, mapVerticalWheel],
  );

  const onPointerDown = useCallback((event: PointerEvent) => {
    const el = elRef.current;
    if (!el || event.button !== 0) return;
    if (event.pointerType !== "mouse") return;

    drag.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: el.scrollLeft,
    };
    el.dataset.dragging = "false";
  }, []);

  const onPointerMove = useCallback((event: PointerEvent) => {
    const el = elRef.current;
    const state = drag.current;
    if (!el || !state.active || event.pointerId !== state.pointerId) return;

    const dx = event.clientX - state.startX;
    if (!state.moved && Math.abs(dx) > 4) {
      state.moved = true;
      el.dataset.dragging = "true";
    }
    if (!state.moved) return;

    event.preventDefault();
    el.scrollLeft = state.startScroll - dx;
  }, []);

  const endDrag = useCallback(
    (event: PointerEvent) => {
      const el = elRef.current;
      const state = drag.current;
      if (!el || event.pointerId !== state.pointerId) return;

      const wasDragging = state.moved;
      state.active = false;
      state.moved = false;
      state.pointerId = -1;
      el.dataset.dragging = "false";

      if (wasDragging) {
        snapToNearest();
        const suppress = (clickEvent: MouseEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
          el.removeEventListener("click", suppress, true);
        };
        el.addEventListener("click", suppress, true);
        window.setTimeout(
          () => el.removeEventListener("click", suppress, true),
          0,
        );
      }

      applyEdges(el);
    },
    [applyEdges, snapToNearest],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      } else if (event.key === "Home") {
        event.preventDefault();
        const el = elRef.current;
        if (!el) return;
        el.scrollTo({ left: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      } else if (event.key === "End") {
        const el = elRef.current;
        if (!el) return;
        event.preventDefault();
        el.scrollTo({
          left: getMaxScroll(el),
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
    },
    [scrollNext, scrollPrev],
  );

  const onScroll = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    applyEdges(el);
  }, [applyEdges]);

  useEffect(() => {
    const el = scrollEl;
    if (!el) return;

    applyEdges(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("keydown", onKeyDown);

    const ro = new ResizeObserver(() => updateEdges());
    ro.observe(el);

    const mo = new MutationObserver(() => updateEdges());
    mo.observe(el, { childList: true, subtree: true });

    const onLoad = () => updateEdges();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onLoad);

    const t1 = window.setTimeout(updateEdges, 120);
    const t2 = window.setTimeout(updateEdges, 480);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onLoad);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
      mo.disconnect();
    };
  }, [
    applyEdges,
    endDrag,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onScroll,
    onWheel,
    scrollEl,
    updateEdges,
  ]);

  return {
    ref: setRef,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
  };
}
