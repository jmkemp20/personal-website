import type { ReactNode } from "react";

/**
 * Optional terminal "window chrome" used selectively as an accent — for the
 * hero, overlays, or code panels. It is NOT an app-wide wrapper.
 */
export function WindowFrame({
  title,
  children,
  className = "",
  bodyClassName = "",
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={`overflow-hidden rounded-lg border border-border bg-panel shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <header className="flex items-center gap-2 border-b border-border bg-panel-strong px-4 py-2.5">
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </span>
        {title ? (
          <span className="ml-2 truncate text-xs text-muted">{title}</span>
        ) : null}
      </header>
      <div className={bodyClassName || "p-5 sm:p-7"}>{children}</div>
    </section>
  );
}
