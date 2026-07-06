"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/terminal/Breadcrumb";
import { TOP_NAV } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader({
  onOpenTheme,
  onOpenHelp,
}: {
  onOpenTheme: () => void;
  onOpenHelp: () => void;
}) {
  const pathname = usePathname();

  // Index of the currently active section (matches the tmux "window" number).
  // Falls back to the home entry (0) if nothing matches.
  const activeIndex = Math.max(
    0,
    TOP_NAV.findIndex((item) => isActive(pathname, item.href)),
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border">
      {/* Translucent, blurred backdrop as its own non-interactive layer.
          Keeping backdrop-filter off the interactive layer avoids an iOS
          Safari/Chrome bug where taps on buttons above it are swallowed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </span>
        <div className="min-w-0 flex-1">
          <Breadcrumb />
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenTheme}
            className="inline-flex min-h-9 touch-manipulation items-center rounded-md border border-border px-2.5 py-1.5 text-xs text-dim transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
            aria-label="Change color theme (shortcut: t)"
          >
            <span aria-hidden>🎨</span>
            <span className="ml-1.5 hidden sm:inline">theme</span>
          </button>
          <button
            type="button"
            onClick={onOpenHelp}
            className="hidden min-h-9 touch-manipulation items-center rounded-md border border-border px-2.5 py-1.5 text-xs text-dim transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent sm:inline-flex"
            aria-label="Keyboard shortcuts & help (shortcut: ?)"
          >
            <span aria-hidden>?</span>
            <span className="ml-1.5 hidden sm:inline">help</span>
          </button>
        </div>
      </div>

      <nav
        aria-label="Sections"
        className="relative z-10 mx-auto flex w-full max-w-5xl items-stretch gap-2 px-4 sm:px-6"
      >
        <ul className="flex flex-1 items-center gap-1 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TOP_NAV.map((item, index) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-md px-2 py-1 text-sm tabular-nums transition-colors ${
                    active
                      ? "bg-accent-soft text-accent"
                      : "text-dim hover:text-accent"
                  }`}
                >
                  <span className={active ? "text-accent" : "text-muted"}>
                    {index}
                  </span>
                  <span aria-hidden className={active ? "text-accent/70" : "text-muted"}>
                    :
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* tmux-style current-window indicator, pinned to the far right and
            never part of the scrollable window list. */}
        <span
          className="flex shrink-0 items-center self-center rounded-md bg-panel px-2 py-1 text-sm tabular-nums text-dim"
          aria-hidden
        >
          [<span className="text-accent">{activeIndex}</span>]
        </span>
      </nav>
    </header>
  );
}
