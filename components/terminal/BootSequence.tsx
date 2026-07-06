"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BOOT_LINES, BOOT_STORAGE_KEY } from "@/lib/boot";

type Phase = "idle" | "running" | "closing" | "done";

export function BootSequence() {
  // Always start "idle" so the server and first client render agree (no
  // hydration mismatch). The pre-hydration script in `app/layout.tsx` paints
  // a full-screen backdrop via `<html data-booting>` CSS, so nothing flashes
  // during the brief moment before the effect below promotes us to "running".
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setPhase("closing");
  }, []);

  // Decide, right after hydration, whether to play the animation. The source
  // of truth is the `data-booting` attribute the pre-hydration script already
  // set (it accounts for sessionStorage + reduced-motion). If present, run the
  // animation; otherwise stay idle and render nothing.
  useEffect(() => {
    const shouldBoot =
      document.documentElement.getAttribute("data-booting") === "1";
    if (!shouldBoot) return;

    // We now own the boot screen. Persist the flag so a mid-animation reload
    // does not replay it, but keep the attribute (and thus the CSS backdrop)
    // until the very end to avoid any gap between backdrop and overlay.
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {
      // ignore
    }

    // Promote on the next frame rather than synchronously in the effect body
    // (avoids a cascading render). The CSS backdrop stays up during this frame,
    // so there is still no flash of content.
    const raf = requestAnimationFrame(() => setPhase("running"));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal lines one at a time, then finish.
  useEffect(() => {
    if (phase !== "running") return;
    if (count >= BOOT_LINES.length) {
      const timer = setTimeout(finish, 520);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setCount((c) => c + 1),
      count === 0 ? 140 : 150,
    );
    return () => clearTimeout(timer);
  }, [phase, count, finish]);

  // Fade out, drop the pre-hydration backdrop, then unmount.
  useEffect(() => {
    if (phase !== "closing") return;
    document.documentElement.removeAttribute("data-booting");
    const timer = setTimeout(() => setPhase("done"), 320);
    return () => clearTimeout(timer);
  }, [phase]);

  // Let the visitor skip.
  useEffect(() => {
    if (phase !== "running") return;
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    return () => {
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, [phase, finish]);

  if (phase === "idle" || phase === "done") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-300 ${
        phase === "closing" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <pre className="w-full max-w-md px-6 text-sm leading-6">
        {BOOT_LINES.slice(0, count).map((line, index) => (
          <div key={index}>
            {line.startsWith("[ ok ]") ? (
              <>
                <span className="text-accent">[ ok ]</span>
                <span className="text-dim">{line.slice(6)}</span>
              </>
            ) : (
              <span className="text-fg">{line || "\u00a0"}</span>
            )}
          </div>
        ))}
        {count < BOOT_LINES.length ? (
          <span className="term-cursor" aria-hidden />
        ) : null}
      </pre>
    </div>
  );
}
