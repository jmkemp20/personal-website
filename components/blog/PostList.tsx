"use client";

import Link from "next/link";

export type PostCard = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  description?: string;
  tags?: string[];
};

export function PostList({ posts }: { posts: PostCard[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            data-key-nav=""
            className="group block rounded-lg border border-border bg-panel p-5 outline-none transition-colors hover:border-accent/60 focus-visible:border-accent focus-visible:bg-accent-soft"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h2 className="font-semibold text-fg transition-colors group-hover:text-accent group-focus-visible:text-accent">
                <span aria-hidden className="mr-2 text-accent">
                  ›
                </span>
                {post.title}
              </h2>
              <time
                dateTime={post.date}
                className="shrink-0 text-xs text-muted tabular-nums"
              >
                {post.dateLabel}
              </time>
            </div>
            {post.description ? (
              <p className="mt-2 text-sm leading-6 text-dim">
                {post.description}
              </p>
            ) : null}
            {post.tags && post.tags.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border px-1.5 py-0.5 text-[0.7rem] text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
