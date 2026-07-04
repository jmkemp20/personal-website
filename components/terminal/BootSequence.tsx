"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BOOT_KEY = "jk.booted";

const LINES = [
  "joshua_kemp // terminal v4.0.4",
  "",
  "[ ok ] mounting /home/joshua",
  "[ ok ] loading color themes (7)",
  "[ ok ] initializing keyboard nav",
  "[ ok ] starting interactive shell",
  "",
  "welcome — press ? anytime for keys.",
];

type Phase = "idle" | "running" | "closing" | "done";

export function BootSequence() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      // ignore
    }
    setPhase("closing");
  }, []);

  // Decide whether to play the boot animation at all.
  useEffect(() => {
    let alreadyBooted = false;
    try {
      alreadyBooted = sessionStorage.getItem(BOOT_KEY) === "1";
    } catch {
      // ignore
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (alreadyBooted || reduceMotion) {
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        // ignore
      }
      // Stay in the "idle" phase, which renders nothing.
      return;
    }

    // Kick off on the next frame so the state change happens outside the
    // effect body (avoids a synchronous cascading render on mount).
    const raf = requestAnimationFrame(() => setPhase("running"));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal lines one at a time, then finish.
  useEffect(() => {
    if (phase !== "running") return;
    if (count >= LINES.length) {
      const timer = setTimeout(finish, 520);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? 140 : 150);
    return () => clearTimeout(timer);
  }, [phase, count, finish]);

  // Fade out, then unmount.
  useEffect(() => {
    if (phase !== "closing") return;
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
        {LINES.slice(0, count).map((line, index) => (
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
        {count < LINES.length ? <span className="term-cursor" aria-hidden /> : null}
      </pre>
    </div>
  );
}
