export type ThemeId =
  | "tokyo-night"
  | "dracula"
  | "gruvbox"
  | "nord"
  | "catppuccin"
  | "matrix"
  | "solarized"
  | "rose-pine"
  | "everforest"
  | "one-dark"
  | "kanagawa"
  | "synthwave";

export type Theme = {
  id: ThemeId;
  /** Human label shown in the switcher */
  label: string;
  /** Short flavor line */
  blurb: string;
  /** The three colors (bg / fg / accent) used for preview swatches */
  swatch: { bg: string; fg: string; accent: string };
};

export const THEMES: Theme[] = [
  {
    id: "tokyo-night",
    label: "Tokyo Night",
    blurb: "midnight blue, the default",
    swatch: { bg: "#1a1b26", fg: "#c0caf5", accent: "#7aa2f7" },
  },
  {
    id: "dracula",
    label: "Dracula",
    blurb: "purple & pastel",
    swatch: { bg: "#282a36", fg: "#f8f8f2", accent: "#bd93f9" },
  },
  {
    id: "gruvbox",
    label: "Gruvbox",
    blurb: "warm retro amber",
    swatch: { bg: "#282828", fg: "#ebdbb2", accent: "#fabd2f" },
  },
  {
    id: "nord",
    label: "Nord",
    blurb: "arctic frost",
    swatch: { bg: "#2e3440", fg: "#d8dee9", accent: "#88c0d0" },
  },
  {
    id: "catppuccin",
    label: "Catppuccin",
    blurb: "soft mocha mauve",
    swatch: { bg: "#1e1e2e", fg: "#cdd6f4", accent: "#cba6f7" },
  },
  {
    id: "matrix",
    label: "Matrix",
    blurb: "green phosphor on black",
    swatch: { bg: "#050805", fg: "#2ee66b", accent: "#8affab" },
  },
  {
    id: "solarized",
    label: "Solarized Light",
    blurb: "the one light theme",
    swatch: { bg: "#fdf6e3", fg: "#586e75", accent: "#268bd2" },
  },
  {
    id: "rose-pine",
    label: "Rosé Pine",
    blurb: "soho vibes, dusty rose",
    swatch: { bg: "#191724", fg: "#e0def4", accent: "#ebbcba" },
  },
  {
    id: "everforest",
    label: "Everforest",
    blurb: "mossy green comfort",
    swatch: { bg: "#2d353b", fg: "#d3c6aa", accent: "#a7c080" },
  },
  {
    id: "one-dark",
    label: "One Dark",
    blurb: "the atom classic",
    swatch: { bg: "#282c34", fg: "#abb2bf", accent: "#61afef" },
  },
  {
    id: "kanagawa",
    label: "Kanagawa",
    blurb: "ink-wash wave blue",
    swatch: { bg: "#1f1f28", fg: "#dcd7ba", accent: "#7e9cd8" },
  },
  {
    id: "synthwave",
    label: "Synthwave '84",
    blurb: "neon retrowave pink",
    swatch: { bg: "#241b2f", fg: "#f8f8f2", accent: "#ff7edb" },
  },
];

export const DEFAULT_THEME: ThemeId = "tokyo-night";
export const THEME_STORAGE_KEY = "jk.theme";

export function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" && THEMES.some((theme) => theme.id === value)
  );
}
