<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Styling: Tailwind CSS v4 (CSS-first, no config file)

This project uses **Tailwind CSS v4** with the **CSS-first** configuration model. There is **no `tailwind.config.js`** — do not create one.

- Entry: `app/globals.css` is the single global stylesheet. Tailwind is pulled in with `@import "tailwindcss";` (v4 style — not the old `@tailwind base/components/utilities` directives).
- Config lives in CSS: design tokens are declared in the `@theme inline { ... }` block in `app/globals.css`, which bridges CSS custom properties to Tailwind color/font utilities (e.g. `--color-accent` → `bg-accent`/`text-accent`). Add or change theme tokens there, not in a JS config.
- PostCSS: the only plugin is `@tailwindcss/postcss` (see `postcss.config.mjs`).
- Theming model: each `[data-theme=...]` block defines only `--bg`, `--fg`, `--accent`; all other tones (`--dim`, `--muted`, `--border`, `--panel`, `--panel-strong`, `--accent-soft`) are **derived via `color-mix()`** under `:root`. The active theme is set by a `data-theme` attribute on `<html>`. Preserve the "3 colors per theme" rule.
- Layers / specificity: Tailwind v4 puts its utilities inside CSS `@layer`s. A few global rules in `globals.css` (e.g. `a.link:hover`, `a.external-link`) are **intentionally left unlayered** so they win over layered Tailwind utilities. Do NOT wrap these in `@layer` — doing so silently breaks the intended specificity. Read the surrounding comments before editing that file.

# ALWAYS clear the Next.js cache after modifying CSS

**Turbopack aggressively caches CSS.** Any time you modify a stylesheet (`app/globals.css` or any `.css` file) or Tailwind theme tokens, the dev server may serve stale styles. After changing CSS you MUST clear the cache:

```pwsh
Remove-Item -Recurse -Force .next
```

Notes:
- The `next dev` server must be restarted afterward for a clean CSS rebuild (a running server will regenerate `.next` and can re-cache stale output).
- On Windows, deleting `.next` can fail with file locks while `next dev` is running; stop the dev server first if the delete errors.
