import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

/**
 * A shell prompt line. The cursor is decorative (this site is navigated by
 * clicks and keys, not by typing commands).
 */
export function Prompt({
  path = "~",
  children,
  cursor = false,
}: {
  path?: string;
  children?: ReactNode;
  cursor?: boolean;
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm">
      <span className="text-accent">
        {SITE.user}@{SITE.host}
      </span>
      <span className="text-muted">:</span>
      <span className="text-dim">{path}</span>
      <span className="text-accent">$</span>
      {children ? <span className="text-fg">{children}</span> : null}
      {cursor ? <span className="term-cursor" aria-hidden /> : null}
    </p>
  );
}
