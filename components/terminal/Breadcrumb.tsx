"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => ({
    label: segment,
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 items-center gap-1.5 text-xs sm:text-sm"
    >
      <Link
        href="/"
        className="shrink-0 text-dim transition-colors hover:text-accent"
      >
        ~
      </Link>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <Fragment key={crumb.href}>
            <span aria-hidden className="shrink-0 text-muted">
              /
            </span>
            {isLast ? (
              <span className="truncate text-accent" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="truncate text-dim transition-colors hover:text-accent"
              >
                {crumb.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
