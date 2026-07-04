"use client";

import { SITE } from "@/lib/site";

const HINTS: { keys: string; label: string }[] = [
  { keys: "↑↓ / j k", label: "move" },
  { keys: "← → / h l", label: "section" },
  { keys: "↵", label: "open" },
  { keys: "t", label: "theme" },
  { keys: "?", label: "help" },
  { keys: "esc", label: "home" },
];

export function KeyHintBar() {
  return (
    <footer className="sticky bottom-0 z-30 hidden border-t border-border bg-bg/85 backdrop-blur sm:block supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-4 gap-y-1 px-6 py-1.5 text-xs text-muted">
        {HINTS.map((hint) => (
          <span key={hint.label} className="flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-panel px-1.5 py-0.5 text-[0.65rem] text-dim">
              {hint.keys}
            </kbd>
            <span>{hint.label}</span>
          </span>
        ))}
        <span className="ml-auto text-muted">
          {SITE.user}@{SITE.host}
        </span>
      </div>
    </footer>
  );
}
