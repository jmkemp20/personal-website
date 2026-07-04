import type { Metadata } from "next";
import { Prompt } from "@/components/terminal/Prompt";

export const metadata: Metadata = {
  title: "uses",
  description: "The hardware, editor, and tools Joshua Kemp uses every day.",
};

type UsesGroup = {
  title: string;
  glyph: string;
  items: { name: string; note: string }[];
};

const GROUPS: UsesGroup[] = [
  {
    title: "editor & terminal",
    glyph: "⌨️",
    items: [
      { name: "[stub: editor]", note: "where the code happens" },
      { name: "[stub: terminal]", note: "with a minimal, fast prompt" },
      { name: "[stub: shell]", note: "plugins kept intentionally light" },
      { name: "[stub: font]", note: "a crisp monospace with ligatures" },
    ],
  },
  {
    title: "hardware",
    glyph: "🖥️",
    items: [
      { name: "[stub: laptop]", note: "daily driver" },
      { name: "[stub: display]", note: "for the extra pixels" },
      { name: "[stub: keyboard]", note: "clacky and mechanical" },
      { name: "[stub: audio]", note: "focus mode essentials" },
    ],
  },
  {
    title: "stack & services",
    glyph: "🧰",
    items: [
      { name: "[stub: framework]", note: "for building the web" },
      { name: "[stub: hosting]", note: "deploy on push" },
      { name: "[stub: notes]", note: "second brain" },
    ],
  },
];

export default function UsesPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <Prompt path="~/uses" cursor>
          cat uses.md
        </Prompt>
        <h1 className="text-2xl font-bold tracking-tight text-fg">
          <span className="text-accent">#</span> uses
        </h1>
        <p className="max-w-2xl leading-7 text-dim">
          A living list of the tools I reach for. Inspired by{" "}
          <span className="text-fg">uses.tech</span> — stubbed for now, real
          picks coming soon.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {GROUPS.map((group) => (
          <section
            key={group.title}
            className="rounded-lg border border-border bg-panel p-5"
          >
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted">
              <span aria-hidden>{group.glyph}</span>
              {group.title}
            </h2>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={item.name} className="space-y-0.5">
                  <p className="font-semibold text-fg">{item.name}</p>
                  <p className="text-sm text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
