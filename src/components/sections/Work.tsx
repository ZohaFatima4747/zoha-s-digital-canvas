import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/Reveal";
import { useReducedMotion } from "@/lib/motion";
import { projects, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { advanceMarquee, wrapMarqueePosition } from "@/lib/work-marquee";

function ProjectCard({ project, setPaused, duplicate = false }: { project: Project; setPaused: (paused: boolean) => void; duplicate?: boolean }) {
  return (
    <article
      aria-hidden={duplicate || undefined}
      className="work-marquee-card absolute left-1/2 top-8 w-[82vw] max-w-[650px] sm:w-[64vw] md:top-16 md:w-[48vw] lg:w-[42vw]"
    >
      <div className="work-marquee-image relative aspect-[16/10] overflow-hidden bg-muted shadow-[var(--shadow-editorial)]"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setPaused(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setPaused(false);
      }}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      >
        <img
          src={project.image}
          alt={`${project.title} — ${project.kind} interface preview`}
          width={1600}
          height={1000}
          loading="lazy"
          draggable={false}
          style={{ objectPosition: project.portrait ? "center 45%" : "center" }}
          className="h-full w-full object-cover transition-[filter,transform] duration-500"
        />

        <div className="work-marquee-overlay pointer-events-none absolute inset-0 hidden items-center justify-center bg-foreground/10 p-8 opacity-0 transition-opacity duration-300 md:flex">
          <div className="text-center text-primary-foreground">
            <span className="label-mono">{project.index} — {project.kind}</span>
            <h3 className="font-display mt-4 text-3xl font-bold uppercase leading-none lg:text-5xl">
              {project.title}
            </h3>
            <Button asChild variant="outline" className="label-mono mt-7 h-auto rounded-full border-primary-foreground/70 bg-transparent px-5 py-3 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link
              to="/work/$slug"
              params={{ slug: project.slug }}
              preload="intent"
              tabIndex={duplicate ? -1 : undefined}
            >
              View details <span aria-hidden>→</span>
            </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4 md:hidden">
        <span className="label-mono text-olive">{project.index} — {project.kind}</span>
        <div className="mt-2 flex items-end justify-between gap-4 border-b border-border pb-4">
          <h3 className="font-display text-xl font-bold uppercase leading-tight">{project.title}</h3>
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            tabIndex={duplicate ? -1 : undefined}
            className="label-mono shrink-0 text-olive"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const stage = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = stage.current;
      if (!container || reduced) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".work-marquee-card"));
    let progress = 0;
    let previous = performance.now();
    let frame = 0;

    const positionCards = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const viewport = container.clientWidth;
      const cardWidth = cards[0]?.offsetWidth ?? viewport * 0.82;
      const spacing = cardWidth + Math.max(20, viewport * 0.025);
      const loopWidth = spacing * cards.length;
      progress = advanceMarquee(progress, dt, viewport < 768 ? 23 : 30, loopWidth, paused.current);

      cards.forEach((card, index) => {
        const raw = index * spacing - progress;
        const x = wrapMarqueePosition(raw, loopWidth);
        const distance = Math.min(1, Math.abs(x) / Math.max(viewport * 0.72, 1));
        const y = distance * distance * (viewport < 768 ? 24 : 52);
        const z = -distance * (viewport < 768 ? 90 : 230);
        const rotation = Math.max(-25, Math.min(25, (-x / Math.max(viewport / 2, 1)) * 18));
        const scale = 1 - distance * (viewport < 768 ? 0.08 : 0.2);
        card.style.transform = `translate3d(calc(-50% + ${x}px), ${y}px, ${z}px) rotateY(${rotation}deg) scale(${scale})`;
        card.style.opacity = "1";
        card.style.zIndex = `${Math.round((1 - distance) * 20)}`;
      });
      frame = requestAnimationFrame(positionCards);
    };

    frame = requestAnimationFrame(positionCards);
    return () => {
      cancelAnimationFrame(frame);
      paused.current = false;
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.opacity = "";
        card.style.zIndex = "";
      });
    };
  }, [reduced]);

  return (
    <section id="work" className="relative overflow-hidden border-t border-border pt-16 md:pt-28">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeading index="Selected Work" title="Built for real businesses." />
        <p className="label-mono mt-5 max-w-md text-muted-foreground">
          A continuously moving selection of digital products and client systems.
        </p>
      </div>

      <div
        ref={stage}
        className={`relative mt-8 h-[350px] w-full [perspective:1100px] sm:h-[470px] md:mt-10 md:h-[620px] md:[perspective:1500px] ${reduced ? "work-marquee-reduced overflow-x-auto" : "overflow-hidden"}`}
        aria-label="Selected projects"
      >
        {(reduced ? [0] : [0, 1, 2]).flatMap((copy) => projects.map((project) => (
          <ProjectCard key={`${copy}-${project.slug}`} project={project} duplicate={copy > 0} setPaused={(value) => { paused.current = value; }} />
        )))}
      </div>
    </section>
  );
}
