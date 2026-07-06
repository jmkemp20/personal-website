import type { Metadata } from "next";
import Link from "next/link";
import { Prompt } from "@/components/terminal/Prompt";
import { SITE } from "@/lib/site";
import { link } from "@/lib/styles";

export const metadata: Metadata = {
  title: "about",
  description: "whoami — a short introduction to Joshua Kemp.",
};

export default function AboutPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Prompt path="~/about" cursor>
          cat about.md
        </Prompt>
        <h1 className="text-2xl font-bold tracking-tight text-fg">
          <span className="text-accent">#</span> whoami
        </h1>
      </header>

      <div className="max-w-2xl space-y-5 leading-7 text-dim">
        <p>
          I&apos;m Joshua — a {SITE.role} who likes small tools, sharp typography,
          and the calm of a good terminal. This site is a playground where I
          write things down so I don&apos;t forget them.
        </p>
        <p>
          Most of my time goes into building for the web: thoughtful interfaces,
          fast back-ends, and the glue in between. When I&apos;m away from the
          keyboard you&apos;ll usually find me{" "}
          <span className="text-fg">[stub: hobby]</span> or{" "}
          <span className="text-fg">[stub: another hobby]</span>.
        </p>
        <p>
          You can read what I&apos;ve been publishing on the{" "}
          <Link href="/blog" className={link}>
            blog
          </Link>
          , see what I&apos;ve built under{" "}
          <Link href="/projects" className={link}>
            projects
          </Link>
          , or check what I&apos;m focused on right{" "}
          <Link href="/now" className={link}>
            now
          </Link>
          .
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          things I care about
        </h2>
        <ul className="max-w-2xl space-y-2 text-dim">
          {[
            "shipping small, finishing things",
            "developer experience & tooling",
            "accessible, keyboard-friendly interfaces",
            "writing to think more clearly",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-accent">
                ▸
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
