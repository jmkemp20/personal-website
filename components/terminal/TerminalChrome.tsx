"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getPageNavItems,
  isTypingTarget,
  useGlobalKeydown,
} from "@/lib/keyboard";
import { TOP_NAV } from "@/lib/site";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { KeyHintBar } from "./KeyHintBar";
import { BootSequence } from "./BootSequence";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { HelpOverlay } from "./HelpOverlay";

/** Ordered section paths, e.g. ["/", "/about", "/blog", ...]. */
const SECTION_PATHS = TOP_NAV.map((item) => item.href);

function currentSectionIndex(pathname: string): number {
  if (pathname === "/") return 0;
  let best = 0;
  for (let i = 1; i < SECTION_PATHS.length; i++) {
    const path = SECTION_PATHS[i];
    if (pathname === path || pathname.startsWith(path + "/")) best = i;
  }
  return best;
}

export function TerminalChrome({ children }: { children: React.ReactNode }) {
  const [themeOpen, setThemeOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const closeAll = useCallback(() => {
    setThemeOpen(false);
    setHelpOpen(false);
  }, []);

  useGlobalKeydown(
    useCallback(
      (event: KeyboardEvent) => {
        if (isTypingTarget(event.target)) return;
        if (event.metaKey || event.ctrlKey || event.altKey) return;

        const modalOpen = themeOpen || helpOpen;

        // Keys that work regardless of overlay state.
        switch (event.key) {
          case "Escape":
            event.preventDefault();
            if (modalOpen) {
              closeAll();
            } else if (pathname !== "/") {
              router.push("/");
            }
            return;
          case "t":
          case "T":
            event.preventDefault();
            setHelpOpen(false);
            setThemeOpen((open) => !open);
            return;
          case "/":
          case "?":
            event.preventDefault();
            setThemeOpen(false);
            setHelpOpen((open) => !open);
            return;
        }

        // Overlays own their internal navigation while open.
        if (modalOpen) return;

        // Left / right (and vim h/l) switch between top-level sections.
        const goToSection = (direction: 1 | -1) => {
          const index = currentSectionIndex(pathname);
          const next =
            (index + direction + SECTION_PATHS.length) % SECTION_PATHS.length;
          router.push(SECTION_PATHS[next]);
        };

        // Number keys jump straight to a section by its index (matching the
        // tmux-style "N:label" markers in the top nav: 0 = home, 1 = about…).
        if (event.key >= "0" && event.key <= "9") {
          const index = Number(event.key);
          if (index < SECTION_PATHS.length) {
            event.preventDefault();
            router.push(SECTION_PATHS[index]);
          }
          return;
        }

        // Up / down (and vim j/k) move through the page's nav items. Arrow
        // keys only engage once focus is already in a list (so ordinary
        // page scrolling still works); j/k engage from anywhere.
        const stepNav = (direction: 1 | -1, fromAnywhere: boolean): boolean => {
          const items = getPageNavItems();
          if (items.length === 0) return false;

          const active = document.activeElement as HTMLElement | null;
          const index = active ? items.indexOf(active) : -1;

          if (index >= 0) {
            const next = index + direction;
            if (next < 0 || next >= items.length) return false;
            items[next].focus();
            return true;
          }

          if (fromAnywhere) {
            (direction === 1 ? items[0] : items[items.length - 1]).focus();
            return true;
          }

          // Arrow key with focus outside any list: only "enter" downward,
          // and only into the main content region.
          if (direction === 1) {
            const main = document.querySelector("main");
            const mainItems = main ? getPageNavItems(main) : [];
            if (mainItems.length > 0) {
              mainItems[0].focus();
              return true;
            }
          }
          return false;
        };

        switch (event.key) {
          case "ArrowRight":
          case "l":
            event.preventDefault();
            goToSection(1);
            break;
          case "ArrowLeft":
          case "h":
            event.preventDefault();
            goToSection(-1);
            break;
          case "j":
            event.preventDefault();
            stepNav(1, true);
            break;
          case "k":
            event.preventDefault();
            stepNav(-1, true);
            break;
          case "ArrowDown":
            if (stepNav(1, false)) event.preventDefault();
            break;
          case "ArrowUp":
            if (stepNav(-1, false)) event.preventDefault();
            break;
        }
      },
      [themeOpen, helpOpen, closeAll, pathname, router],
    ),
  );

  // Lock body scroll while an overlay is open.
  useEffect(() => {
    const locked = themeOpen || helpOpen;
    const previous = document.body.style.overflow;
    if (locked) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [themeOpen, helpOpen]);

  return (
    <>
      <BootSequence />
      <SiteHeader
        onOpenTheme={() => {
          setHelpOpen(false);
          setThemeOpen(true);
        }}
        onOpenHelp={() => {
          setThemeOpen(false);
          setHelpOpen(true);
        }}
      />
      <main className="w-full flex-1">
        <div className="term-enter mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
          {children}
        </div>
      </main>
      <SiteFooter />
      <KeyHintBar />
      <ThemeSwitcher open={themeOpen} onClose={closeAll} />
      <HelpOverlay open={helpOpen} onClose={closeAll} />
    </>
  );
}
