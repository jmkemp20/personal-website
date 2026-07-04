import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prompt } from "@/components/terminal/Prompt";
import {
  formatDate,
  getAllPosts,
  getPost,
  getPostSlugs,
} from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.meta.title) notFound();

  const { Content, meta } = post;

  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older =
    index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <article className="mx-auto max-w-2xl">
      <header className="mb-8 space-y-4 border-b border-border pb-6">
        <Prompt path={`~/blog/${slug}`} />
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-fg sm:text-3xl">
          {meta.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          {meta.date ? (
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          ) : null}
          {meta.tags && meta.tags.length > 0 ? (
            <span className="flex flex-wrap gap-1.5">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border px-1.5 py-0.5 text-[0.7rem]"
                >
                  #{tag}
                </span>
              ))}
            </span>
          ) : null}
        </div>
      </header>

      <div className="text-[0.95rem]">
        <Content />
      </div>

      <nav className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
        {older ? (
          <Link
            href={`/blog/${older.slug}`}
            className="group rounded-lg border border-border bg-panel p-4 transition-colors hover:border-accent/60"
          >
            <span className="text-xs text-muted">← older</span>
            <p className="mt-1 font-semibold text-fg transition-colors group-hover:text-accent">
              {older.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link
            href={`/blog/${newer.slug}`}
            className="group rounded-lg border border-border bg-panel p-4 text-right transition-colors hover:border-accent/60"
          >
            <span className="text-xs text-muted">newer →</span>
            <p className="mt-1 font-semibold text-fg transition-colors group-hover:text-accent">
              {newer.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <div className="mt-8">
        <Link
          href="/blog"
          className="text-sm text-accent underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          ← back to all posts
        </Link>
      </div>
    </article>
  );
}
