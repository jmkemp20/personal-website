"use client";

import { useEffect, useRef } from "react";
import { WindowFrame } from "./WindowFrame";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["↑", "↓", "j", "k"], label: "move through items on the page" },
  { keys: ["←", "→", "h", "l"], label: "switch between sections" },
  { keys: ["↵"], label: "open the focused item" },
  { keys: ["tab"], label: "move between links & controls" },
  { keys: ["t"], label: "open the theme switcher" },
  { keys: ["?"], label: "toggle this help" },
  { keys: ["esc"], label: "close an overlay — or jump home" },
];

export function HelpOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-bg/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="term-enter mt-16 w-full max-w-lg sm:mt-0"
        onClick={(event) => event.stopPropagation()}
      >
        <WindowFrame title="~/help — keyboard & navigation">
          <div role="dialog" aria-label="Help" aria-modal="true">
            <p className="mb-4 text-sm text-dim">
              This site is a terminal. Navigate it with your mouse or entirely
              from the keyboard — no commands to type.
            </p>
            <dl className="flex flex-col gap-2.5">
              {SHORTCUTS.map((shortcut) => (
                <div
                  key={shortcut.label}
                  className="flex items-center gap-3 text-sm"
                >
                  <dt className="flex w-32 shrink-0 flex-wrap gap-1">
                    {shortcut.keys.map((key) => (
                      <kbd
                        key={key}
                        className="rounded border border-border bg-panel px-1.5 py-0.5 text-xs text-accent"
                      >
                        {key}
                      </kbd>
                    ))}
                  </dt>
                  <dd className="text-dim">{shortcut.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex justify-end">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-dim transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
              >
                got it
              </button>
            </div>
          </div>
        </WindowFrame>
      </div>
    </div>
  );
}
