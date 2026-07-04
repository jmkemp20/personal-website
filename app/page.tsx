import { AsciiBanner } from "@/components/terminal/AsciiBanner";
import { Prompt } from "@/components/terminal/Prompt";
import { NavList } from "@/components/ui/NavList";
import { SECTIONS, SITE, SOCIALS } from "@/lib/site";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <AsciiBanner />
        <div className="space-y-3">
          <Prompt path="~" cursor>
            whoami
          </Prompt>
          <p className="max-w-2xl leading-7 text-dim">
            Hey — I&apos;m <span className="text-fg">Joshua Kemp</span>, a{" "}
            <span className="text-accent">{SITE.role}</span>. {SITE.tagline}{" "}
            Everything here is written by me, not a language model. Poke around
            with your keyboard or your mouse — press{" "}
            <kbd className="rounded border border-border bg-panel px-1.5 py-0.5 text-xs text-accent">
              ?
            </kbd>{" "}
            for the keys.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <Prompt path="~">ls sections/</Prompt>
        <NavList ariaLabel="Site sections" items={SECTIONS} />
      </section>

      <section className="space-y-4">
        <Prompt path="~">cat ./links</Prompt>
        <NavList ariaLabel="Elsewhere on the web" items={SOCIALS} />
      </section>
    </div>
  );
}

