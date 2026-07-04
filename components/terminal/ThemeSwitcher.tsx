"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { THEMES } from "@/lib/themes";
import { useRovingFocus } from "@/lib/keyboard";
import { WindowFrame } from "./WindowFrame";

export function ThemeSwitcher({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const roving = useRovingFocus(THEMES.length);

  useEffect(() => {
    if (!open) return;
    const index = THEMES.findIndex((t) => t.id === theme);
    const id = requestAnimationFrame(() => roving.focusIndex(index < 0 ? 0 : index));
    return () => cancelAnimationFrame(id);
    // Only re-run when the overlay opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="term-enter mt-16 w-full max-w-md sm:mt-0"
        onClick={(event) => event.stopPropagation()}
      >
        <WindowFrame title="~/themes — pick a palette" bodyClassName="p-3">
          <ul
            aria-label="Color themes"
            role="listbox"
            aria-activedescendant={`theme-${THEMES[roving.active]?.id}`}
            className="flex flex-col gap-1"
          >
            {THEMES.map((item, index) => {
              const current = item.id === theme;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    id={`theme-${item.id}`}
                    ref={roving.registerItem(index)}
                    tabIndex={roving.active === index ? 0 : -1}
                    role="option"
                    aria-selected={current}
                    onKeyDown={(event) => roving.onKeyDown(event, index)}
                    onFocus={() => {
                      roving.setActive(index);
                      setTheme(item.id);
                    }}
                    onMouseEnter={() => {
                      roving.setActive(index);
                      setTheme(item.id);
                    }}
                    onClick={onClose}
                    className="group flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-2 text-left outline-none transition-colors hover:border-border hover:bg-panel focus-visible:border-accent focus-visible:bg-accent-soft"
                  >
                    <span
                      aria-hidden
                      className="flex shrink-0 overflow-hidden rounded border border-border"
                    >
                      <span
                        className="h-5 w-2.5"
                        style={{ background: item.swatch.bg }}
                      />
                      <span
                        className="h-5 w-2.5"
                        style={{ background: item.swatch.fg }}
                      />
                      <span
                        className="h-5 w-2.5"
                        style={{ background: item.swatch.accent }}
                      />
                    </span>
                    <span className="shrink-0 font-semibold text-fg">
                      {item.label}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs text-muted">
                      {item.blurb}
                    </span>
                    <span
                      className={`shrink-0 text-accent ${current ? "opacity-100" : "opacity-0"}`}
                      aria-hidden
                    >
                      ✓
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 px-3 text-[0.7rem] text-muted">
            preview applies as you move · <kbd>esc</kbd> to close
          </p>
        </WindowFrame>
      </div>
    </div>
  );
}
