"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_THEME,
  isThemeId,
  THEME_STORAGE_KEY,
  THEMES,
  type ThemeId,
} from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  cycleTheme: (direction?: 1 | -1) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_EVENT = "jk:themechange";

// The <html data-theme> attribute is the single source of truth; the
// pre-hydration inline script sets it before first paint. React reads it
// through useSyncExternalStore so there is no effect-driven flash.
function getSnapshot(): ThemeId {
  const current = document.documentElement.getAttribute("data-theme");
  return isThemeId(current) ? current : DEFAULT_THEME;
}

function getServerSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function writeTheme(next: ThemeId) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Ignore storage failures (private mode, disabled, etc.)
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setTheme = useCallback((next: ThemeId) => writeTheme(next), []);

  const cycleTheme = useCallback((direction: 1 | -1 = 1) => {
    const index = THEMES.findIndex((t) => t.id === getSnapshot());
    const nextIndex = (index + direction + THEMES.length) % THEMES.length;
    writeTheme(THEMES[nextIndex].id);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, cycleTheme }),
    [theme, setTheme, cycleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
