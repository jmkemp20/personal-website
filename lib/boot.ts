import { THEMES } from "./themes";

/**
 * sessionStorage key recording that the boot animation has already played
 * this session. Shared by the pre-hydration script in `app/layout.tsx` and
 * the `BootSequence` component so they agree on when to skip the animation.
 */
export const BOOT_STORAGE_KEY = "jk.booted";

/**
 * Lines shown in the boot animation. The theme count is derived from the
 * `THEMES` registry so it can never drift out of sync with the real list.
 */
export const BOOT_LINES = [
  "joshua_kemp // terminal v4.0.4",
  "",
  "[ ok ] mounting /home/joshua",
  `[ ok ] loading color themes (${THEMES.length})`,
  "[ ok ] initializing keyboard nav",
  "[ ok ] starting interactive shell",
  "",
  "welcome — press ? anytime for keys.",
] as const;
