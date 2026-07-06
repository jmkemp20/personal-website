import type { Metadata } from "next";
import Link from "next/link";
import { Prompt } from "@/components/terminal/Prompt";
import { PROJECTS, type Project } from "@/content/projects";

export const metadata: Metadata = {
  title: "projects",
  description: "Open-source projects and things Joshua Kemp has built.",
};

const linkClass =
  "inline-flex items-center  gap-1 rounded border border-border px-2 py-0.5 text-xs text-dim transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent";

function ProjectLinkTag({ href, label }: { href: string; label: string }) {
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={href} className={linkClass}>
        {label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {label}
      <span aria-hidden className="text-muted">
        ↗
      </span>
    </a>
  );
}

export default function ProjectsPage() {
  const byYear = PROJECTS.reduce<Record<string, Project[]>>((acc, project) => {
    (acc[project.year] ??= []).push(project);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Prompt path="~/projects" cursor>
          ls -la projects/
        </Prompt>
        <h1 className="text-2xl font-bold tracking-tight text-fg">
          <span className="text-accent">#</span> projects
        </h1>
        <p className="max-w-2xl leading-7 text-dim">
          Open-source projects and experiments I&apos;ve worked on over the
          years. Everything below is a stub for now.
        </p>
      </header>

      <div className="space-y-10">
        {years.map((year) => (
          <section key={year} className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              {year}
            </h2>
            <ul className="space-y-4">
              {byYear[year].map((project) => (
                <li
                  key={project.name}
                  className="rounded-lg border border-border bg-panel p-5 transition-colors hover:border-accent/60"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-accent">
                        {project.name}
                      </h3>
                      <p className="max-w-xl text-dim">{project.description}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {project.links.map((link) => (
                        <ProjectLinkTag
                          key={link.label}
                          href={link.href}
                          label={link.label}
                        />
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
