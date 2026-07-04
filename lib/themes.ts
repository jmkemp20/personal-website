export type ThemeId =
  | "tokyo-night"
  | "dracula"
  | "gruvbox"
  | "nord"
  | "catppuccin"
  | "matrix"
  | "solarized";

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
];

export const DEFAULT_THEME: ThemeId = "tokyo-night";
export const THEME_STORAGE_KEY = "jk.theme";

export function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" && THEMES.some((theme) => theme.id === value)
  );
}
