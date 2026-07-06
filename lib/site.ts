import type { NavItem } from "@/components/ui/NavList";

export const SITE = {
  name: "joshua kemp",
  user: "joshua",
  host: "kemp",
  role: "software engineer",
  tagline: "building things for the web, one commit at a time.",
  url: "https://joshuakemp.com",
};

/** Primary sections, in the order they appear on the home hub and top nav. */
export const SECTIONS: NavItem[] = [
  {
    href: "/about",
    label: "about",
    glyph: "🧑",
    hint: "whoami — the short version",
  },
  {
    href: "/blog",
    label: "blog",
    glyph: "📝",
    hint: "guides, references & tutorials",
  },
  {
    href: "/projects",
    label: "projects",
    glyph: "🚀",
    hint: "things i've built & shipped",
  },
  {
    href: "/uses",
    label: "uses",
    glyph: "🛠️",
    hint: "hardware, editor & daily drivers",
  },
  {
    href: "/now",
    label: "now",
    glyph: "📌",
    hint: "what i'm focused on lately",
  },
];

/** External links surfaced in the footer / whoami. */
export const SOCIALS: NavItem[] = [
  {
    href: "https://github.com/joshuakemp",
    label: "github",
    glyph: "🐙",
    hint: "code & open source",
    external: true,
  },
  {
    href: "mailto:jkemp952@gmail.com", // "mailto:hello@joshuakemp.com",
    label: "email",
    glyph: "✉️",
    hint: "say hello",
    external: true,
  },
  {
    href: "https://joshuakemp.com/rss.xml",
    label: "rss",
    glyph: "📡",
    hint: "subscribe to the feed",
    external: true,
  },
];

/** Compact top-navigation entries (path-style). */
export const TOP_NAV = [
  { href: "/", label: "~" },
  ...SECTIONS.map((section) => ({
    href: section.href,
    label: section.label,
  })),
];
