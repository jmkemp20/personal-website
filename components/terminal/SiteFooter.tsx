import { SITE, SOCIALS } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {SOCIALS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-key-nav=""
                className="group inline-flex items-center gap-1.5 text-dim transition-colors hover:text-accent focus-visible:text-accent"
              >
                <span aria-hidden>{link.glyph}</span>
                <span>{link.label}</span>
                <span
                  aria-hidden
                  className="text-muted transition-colors group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted">
          made with <span className="text-accent">♥</span> in a terminal · ©{" "}
          {year} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
