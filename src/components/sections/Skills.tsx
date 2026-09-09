import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { SKILLS } from "@/components/three/SkillsScene";

const SkillsScene = lazy(() => import("@/components/three/SkillsScene"));

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeading index="Skills" title="A technology constellation." />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Drag your cursor across the constellation — every node is something I build with in
            production.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-6 h-[52svh] min-h-[340px] max-h-[500px] w-full touch-none overflow-hidden sm:h-[60svh] sm:min-h-[420px] sm:max-h-[620px] md:mt-8 md:h-[76svh] md:max-h-none">
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <SkillsScene />
          </Suspense>
        </ClientOnly>
      </div>

      <ul className="mx-auto flex max-w-[1500px] flex-wrap gap-x-5 gap-y-2 px-6 md:hidden">
        {SKILLS.map((s) => (
          <li key={s} className="label-mono text-muted-foreground">
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
