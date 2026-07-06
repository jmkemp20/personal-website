import type { Metadata } from "next";
import Link from "next/link";
import { Prompt } from "@/components/terminal/Prompt";
import { externalLink, link } from "@/lib/styles";

export const metadata: Metadata = {
  title: "now",
  description: "What Joshua Kemp is focused on at the moment.",
};

const FOCUS = [
  {
    glyph: "🛳️",
    text: "Engineering project lead on Odyssey Mission at HII Unmanned Systems — a command and control interface for ROMULUS USVs and REMUS UUVs. Spring Boot backend, React frontend.",
  },
  {
    glyph: "📱",
    text: "Building SnapStitch on the side — a React Native puzzle game where you reassemble photos from your camera roll. Rebuild your memories.",
  },
  {
    glyph: "💼",
    text: "Expanding freelance work: AI evaluation and picking up small business web clients.",
  },
  {
    glyph: "📖",
    text: "Studying for the PMP and working through algorithm and data structure problems on LeetCode.",
  },
  {
    glyph: "🏠",
    text: "Building out a home server. Moved off Google Photos, self-hosting media, and getting into Home Assistant.",
  },
  {
    glyph: "👟",
    text: "Navigating the newborn stage and still getting runs in. Have two 5Ks on the calendar for August.",
  },
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
          A snapshot of what has my attention right now, and for the foreseeable future. Welcome to my{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLink}
          >
            /now page
          </a>
          .
        </p>
        <p className="text-xs text-muted">last updated: July 2026</p>
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
