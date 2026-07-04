import type { Metadata } from "next";
import Link from "next/link";
import { Prompt } from "@/components/terminal/Prompt";

export const metadata: Metadata = {
  title: "now",
  description: "What Joshua Kemp is focused on at the moment.",
};

const link =
  "text-accent underline decoration-border underline-offset-4 transition-colors hover:decoration-accent";

const FOCUS = [
  { glyph: "🚧", text: "[stub: the main project I'm building right now]" },
  { glyph: "📚", text: "[stub: something I'm learning or reading]" },
  { glyph: "✍️", text: "[stub: writing I'm working on for the blog]" },
  { glyph: "🌱", text: "[stub: a habit or side-quest I'm nurturing]" },
];

export default function NowPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Prompt path="~/now" cursor>
          cat now.md
        </Prompt>
        <h1 className="text-2xl font-bold tracking-tight text-fg">
          <span className="text-accent">#</span> now
        </h1>
        <p className="max-w-2xl leading-7 text-dim">
          A snapshot of what has my attention. This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            /now page
          </a>
          .
        </p>
        <p className="text-xs text-muted">last updated: [stub: month year]</p>
      </header>

      <ul className="max-w-2xl space-y-4">
        {FOCUS.map((item) => (
          <li
            key={item.text}
            className="flex items-start gap-3 rounded-lg border border-border bg-panel p-4"
          >
            <span aria-hidden className="text-lg leading-none">
              {item.glyph}
            </span>
            <span className="leading-7 text-dim">{item.text}</span>
          </li>
        ))}
      </ul>

      <p className="text-dim">
        Curious what led here? Read a bit{" "}
        <Link href="/about" className={link}>
          about me
        </Link>
        .
      </p>
    </article>
  );
}
