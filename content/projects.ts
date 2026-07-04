export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  year: string;
  description: string;
  links: ProjectLink[];
};

/** Stub project data — swap these out for the real thing. */
export const PROJECTS: Project[] = [
  {
    name: "[stub: terminal-portfolio]",
    year: "2026",
    description: "This very website — a personal site disguised as a TUI.",
    links: [
      { label: "source", href: "https://github.com/joshuakemp" },
      { label: "demo", href: "https://joshkemp.dev" },
    ],
  },
  {
    name: "[stub: cli-tool]",
    year: "2025",
    description: "A small command-line utility that scratches a daily itch.",
    links: [
      { label: "article", href: "/blog/hello-terminal" },
      { label: "source", href: "https://github.com/joshuakemp" },
    ],
  },
  {
    name: "[stub: side-project]",
    year: "2024",
    description: "An experiment that taught me more than it shipped.",
    links: [
      { label: "source", href: "https://github.com/joshuakemp" },
    ],
  },
  {
    name: "[stub: open-source-lib]",
    year: "2023",
    description: "A tiny library other people actually use. Wild.",
    links: [
      { label: "demo", href: "https://joshkemp.dev" },
      { label: "source", href: "https://github.com/joshuakemp" },
    ],
  },
];
