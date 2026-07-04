import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const className =
    "text-accent underline decoration-border underline-offset-4 transition-colors hover:decoration-accent focus-visible:decoration-accent";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {props.children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    />
  );
}

const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-10 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-fg [&>a]:no-underline"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 mb-3 scroll-mt-24 border-b border-border pb-2 text-xl font-bold tracking-tight text-fg before:mr-2 before:text-accent before:content-['##'] [&>a]:no-underline"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-2 scroll-mt-24 text-lg font-semibold text-fg before:mr-2 before:text-accent before:content-['###'] [&>a]:no-underline"
      {...props}
    />
  ),
  p: (props) => (
    <p className="my-4 leading-7 text-dim" {...props} />
  ),
  a: MdxLink,
  ul: (props) => (
    <ul className="my-4 space-y-1.5 text-dim" {...props} />
  ),
  ol: (props) => (
    <ol
      className="my-4 list-decimal space-y-1.5 pl-6 text-dim marker:text-accent"
      {...props}
    />
  ),
  li: (props) => (
    <li
      className="leading-7 [ul>&]:relative [ul>&]:pl-5 [ul>&]:before:absolute [ul>&]:before:left-0 [ul>&]:before:text-accent [ul>&]:before:content-['▸']"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-5 border-l-2 border-accent bg-panel px-4 py-2 text-muted italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded border border-border bg-panel px-1.5 py-0.5 text-[0.9em] text-accent"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-5 overflow-x-auto rounded-md border border-border bg-panel-strong p-4 text-sm leading-6 [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-fg"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-8 border-0 border-t border-dashed border-border" />
  ),
  table: (props) => (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-panel px-3 py-2 text-left font-semibold text-fg"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-border px-3 py-2 text-dim" {...props} />
  ),
  strong: (props) => <strong className="font-bold text-fg" {...props} />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      className="my-5 max-w-full rounded-md border border-border"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
