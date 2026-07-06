/**
 * Shared className constants.
 *
 * `link` is the standard inline prose link style used across pages and MDX
 * content. It carries a bare `link` marker class that globals.css hooks into
 * to add the dotted-underline-on-hover treatment (see the `a.link:hover` rule
 * there), so any internal prose link using this constant gets that behavior.
 * No underline is applied by default — it only appears (dotted, accent) on
 * hover.
 */
export const link =
  "link text-accent no-underline underline-offset-4 transition-colors";

/**
 * External inline prose link. Unlike internal `.link` prose links (which get a
 * dotted underline on hover), external links match the footer/nav pattern:
 * the text takes on the accent color on hover. No underline.
 *
 * Carries a bare `external-link` marker class that globals.css hooks into for
 * the base/hover/focus colors. This is required because Tailwind's color
 * utilities live in `@layer utilities`, while the global `a { color: inherit }`
 * reset is unlayered — and unlayered rules always beat layered ones in the
 * cascade. So `hover:text-accent/80` alone silently loses to that reset. The
 * unlayered `a.external-link` rule wins the same way `a.link:hover` does.
 */
export const externalLink =
  "external-link no-underline transition-colors";
