import { useEffect, useRef, useState } from "react";

type KeyHandler = (event: KeyboardEvent) => void;

/** True when focus is inside a field where typing should win over shortcuts. */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function isVisible(el: HTMLElement): boolean {
  return (
    el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0
  );
}

/**
 * Every element that opts into page-level keyboard navigation
 * (via a `data-key-nav` attribute), returned in DOM order. Optionally scoped
 * to a subtree (e.g. just the <main> region).
 */
export function getPageNavItems(root?: ParentNode): HTMLElement[] {
  if (typeof document === "undefined") return [];
  const scope = root ?? document;
  return Array.from(
    scope.querySelectorAll<HTMLElement>("[data-key-nav]"),
  ).filter(isVisible);
}

/** Attach a window-level keydown listener that cleans itself up. */
export function useGlobalKeydown(handler: KeyHandler, enabled = true) {
  const handlerRef = useRef(handler);

  // Keep the ref pointing at the latest handler without touching it in render.
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;
    const listener = (event: KeyboardEvent) => handlerRef.current(event);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [enabled]);
}

/**
 * Roving-tabindex focus management for a vertical list.
 * Supports arrow keys, vim j/k, and Home/End with wrap-around.
 */
export function useRovingFocus(count: number) {
  const items = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const registerItem = (index: number) => (el: HTMLElement | null) => {
    items.current[index] = el;
  };

  const focusIndex = (index: number) => {
    if (count === 0) return;
    const next = ((index % count) + count) % count;
    setActive(next);
    items.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowDown":
      case "j":
        event.preventDefault();
        focusIndex(index + 1);
        break;
      case "ArrowUp":
      case "k":
        event.preventDefault();
        focusIndex(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusIndex(0);
        break;
      case "End":
        event.preventDefault();
        focusIndex(count - 1);
        break;
    }
  };

  return { active, setActive, registerItem, focusIndex, onKeyDown };
}
