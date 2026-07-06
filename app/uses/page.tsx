import type { Metadata } from "next";
import { Prompt } from "@/components/terminal/Prompt";
import { externalLink } from "@/lib/styles";

export const metadata: Metadata = {
  title: "uses",
  description: "The hardware, editor, and tools Joshua Kemp uses every day.",
};

type UsesGroup = {
  title: string;
  glyph: string;
  items: { name: string; href?: string; note: string }[];
};

const GROUPS: UsesGroup[] = [
  {
    title: "editor & terminal",
    glyph: "⌨️",
    items: [
      {
        name: "VS Code",
        href: "https://code.visualstudio.com",
        note: "daily driver editor",
      },
      {
        name: "tmux",
        href: "https://github.com/tmux/tmux",
        note: "terminal multiplexer for persistent sessions",
      },
      {
        name: "zsh",
        href: "https://ohmyz.sh/",
        note: "shell of choice",
      },
      {
        name: "OpenCode",
        href: "https://opencode.ai",
        note: "AI coding agent in the terminal",
      },
      {
        name: "GitHub Copilot CLI",
        href: "https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line",
        note: "AI assistance from the command line",
      },
      {
        name: "Obsidian",
        href: "https://obsidian.md",
        note: "notes synced via personal NAS",
      },
    ],
  },
  {
    title: "hardware",
    glyph: "🖥️",
    items: [
      {
        name: "Samsung G5 Ultrawide",
        href: "https://www.samsung.com/us/monitors/gaming/34-inch-g5-odyssey-gaming-monitor-with-1000r-curved-screen-sku-lc34g55twwnxza/",
        note: "primary display",
      },
      {
        name: "NVIDIA GeForce RTX 3070 Ti",
        href: "https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3070-3070ti/",
        note: "GPU",
      },
      {
        name: "Corsair Peripherals",
        href: "https://www.corsair.com",
        note: "keyboard and mouse",
      },
      {
        name: "Beyerdynamic DT 990 Pro",
        href: "https://north-america.beyerdynamic.com/dt-990-pro.html",
        note: "open-back headphones for focus",
      },
      {
        name: "HyperX QuadCast 2",
        href: "https://hyperx.com/products/hyperx-quadcast-2-usb-microphone",
        note: "USB condenser microphone",
      },
      {
        name: "UGREEN NASync DXP2800",
        href: "https://nas.ugreen.com/products/ugreen-nasync-dxp2800-nas-storage",
        note: "personal NAS",
      },
    ],
  },
  {
    title: "stack & services",
    glyph: "🧰",
    items: [
      {
        name: "Next.js",
        href: "https://nextjs.org",
        note: "go-to for personal web projects",
      },
      {
        name: "React Native w/ Expo",
        href: "https://expo.dev",
        note: "go-to for personal mobile projects",
      },
      {
        name: "Spring Boot",
        href: "https://spring.io/projects/spring-boot",
        note: "primary backend at work",
      },
      {
        name: "React + TypeScript",
        href: "https://react.dev",
        note: "primary frontend at work",
      },
      {
        name: "Vercel",
        href: "https://vercel.com",
        note: "hosting for Next.js projects",
      },
      {
        name: "Netlify",
        href: "https://netlify.com",
        note: "hosting for static personal projects",
      },
      {
        name: "Docker",
        href: "https://www.docker.com",
        note: "containers for self-hosted services",
      },
      {
        name: "Action Items (self-built)",
        note: "personal task tracker, self-hosted",
      },
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
          <a
            href="https://uses.tech"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLink}
          >
            uses.tech
          </a>
          .
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
                  <p className="font-semibold text-fg">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={externalLink}
                      >
                        {item.name}
                      </a>
                    ) : (
                      item.name
                    )}
                  </p>
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
