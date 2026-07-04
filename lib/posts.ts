import type { ComponentType } from "react";
import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
};

export type PostListItem = PostMeta & { slug: string; dateLabel: string };

export type LoadedPost = {
  Content: ComponentType;
  meta: PostMeta;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Deterministic, locale-independent date formatting (avoids SSR drift). */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

/**
 * Read the blog content directory to discover slugs. This runs on the server
 * only (it uses `node:fs`), so keep it out of client components.
 */
export function getPostSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Dynamically import a single post module (component + metadata). */
export async function getPost(slug: string): Promise<LoadedPost | null> {
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    return {
      Content: mod.default as ComponentType,
      meta: (mod.metadata ?? {}) as PostMeta,
    };
  } catch {
    return null;
  }
}

/** All published posts, newest first. */
export async function getAllPosts(): Promise<PostListItem[]> {
  const slugs = getPostSlugs();
  const loaded = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPost(slug);
      if (!post || !post.meta.title) return null;
      return { slug, dateLabel: formatDate(post.meta.date), ...post.meta };
    }),
  );

  return loaded
    .filter((post): post is PostListItem => post !== null && !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
