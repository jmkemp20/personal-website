import type { Metadata } from "next";
import { Prompt } from "@/components/terminal/Prompt";
import { PostList } from "@/components/blog/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "blog",
  description: "Guides, references, and tutorials by Joshua Kemp.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Prompt path="~/blog" cursor>
          ls -t posts/
        </Prompt>
        <h1 className="text-2xl font-bold tracking-tight text-fg">
          <span className="text-accent">#</span> blog
        </h1>
        <p className="max-w-2xl leading-7 text-dim">
          Guides, references, and tutorials — plus the occasional note to self.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-panel p-6 text-muted">
          No posts yet. Drop an{" "}
          <span className="text-fg">.mdx</span> file in{" "}
          <span className="text-fg">content/blog/</span> and it&apos;ll show up
          here.
        </p>
      ) : (
        <PostList
          posts={posts.map((post) => ({
            slug: post.slug,
            title: post.title,
            date: post.date,
            dateLabel: post.dateLabel,
            description: post.description,
            tags: post.tags,
          }))}
        />
      )}
    </div>
  );
}
