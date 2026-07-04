"use client";

import Link from "next/link";

export type NavItem = {
  href: string;
  label: string;
  glyph?: string;
  hint?: string;
  meta?: string;
  external?: boolean;
};

const rowClass =
  "group flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 outline-none transition-colors hover:border-border hover:bg-panel focus-visible:border-accent focus-visible:bg-accent-soft";

function Row({ item }: { item: NavItem }) {
  return (
    <>
      <span
        aria-hidden
        className="w-3 shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        ›
      </span>
      {item.glyph ? (
        <span aria-hidden className="shrink-0 text-base leading-none">
          {item.glyph}
        </span>
      ) : null}
      <span className="shrink-0 font-semibold text-fg transition-colors group-hover:text-accent group-focus-visible:text-accent">
        {item.label}
      </span>
      {item.hint ? (
        <span className="min-w-0 flex-1 truncate text-sm text-muted">
          {item.hint}
        </span>
      ) : (
        <span className="flex-1" />
      )}
      {item.meta ? (
        <span className="shrink-0 text-xs text-muted tabular-nums">
          {item.meta}
        </span>
      ) : null}
      {item.external ? (
        <span aria-hidden className="shrink-0 text-xs text-muted">
          ↗
        </span>
      ) : null}
    </>
  );
}

export function NavList({
  items,
  ariaLabel,
}: {
  items: NavItem[];
  ariaLabel: string;
}) {
  return (
    <ul aria-label={ariaLabel} className="flex flex-col gap-1">
      {items.map((item) => {
        const shared = {
          className: rowClass,
        };

        return (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                data-key-nav=""
                {...shared}
              >
                <Row item={item} />
              </a>
            ) : (
              <Link href={item.href} data-key-nav="" {...shared}>
                <Row item={item} />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
