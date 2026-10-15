import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/Reveal";
import { projects, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { advanceMarquee, dragMarquee, isMarqueeDrag, marqueeSpeed, wrapMarqueePosition } from "@/lib/work-marquee";

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
          loading="eager"
          draggable={false}
          style={{ objectPosition: project.portrait ? "center 45%" : "center" }}
          className={`h-full w-full max-md:object-contain transition-[filter,transform] duration-500 ${project.containImage ? "object-contain" : "object-cover"}`}
        />

        <div className="work-marquee-overlay pointer-events-none absolute inset-0 items-center justify-center bg-foreground/10 p-8 opacity-0 transition-opacity duration-300">
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

      <div className="work-marquee-caption min-w-0 pt-4">
        <span className="label-mono block break-words leading-relaxed text-olive">{project.index} — {project.kind}</span>
        <div className="mt-2 grid min-w-0 gap-3 border-b border-border pb-4">
          <h3 className="font-display break-words text-xl font-bold uppercase leading-tight">{project.title}</h3>
          <Button asChild variant="link" className="label-mono h-11 justify-start whitespace-normal p-0 text-olive">
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            tabIndex={duplicate ? -1 : undefined}
          >
            View details →
          </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const stage = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  // The gallery always auto-moves (even with OS "reduce motion" on) — it is slow and constant by design.
  useEffect(() => {
    const container = stage.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".work-marquee-card"));
    let progress = 0;
    let previous = performance.now();
    let frame = 0;
    let gesture: { id: number; startX: number; startY: number; lastX: number; dragging: boolean } | undefined;
    let suppressClickUntil = 0;
    let wheelPauseUntil = 0;
    const desktopPointer = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const getLoopWidth = () => {
      const viewport = container.clientWidth;
      const width = cards[0]?.offsetWidth ?? viewport * 0.82;
      return (width + Math.max(20, viewport * 0.025)) * cards.length;
    };
    const pointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      gesture = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, dragging: false };
    };
    const pointerMove = (event: PointerEvent) => {
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.startX;
      const dy = event.clientY - gesture.startY;
      if (!gesture.dragging) {
        if (!isMarqueeDrag(dx, dy)) return;
        gesture.dragging = true;
        container.setPointerCapture(event.pointerId);
        container.dataset["dragging"] = "true";
      }
      progress = dragMarquee(progress, event.clientX - gesture.lastX, getLoopWidth());
      gesture.lastX = event.clientX;
      event.preventDefault();
    };
    const pointerEnd = (event: PointerEvent) => {
      if (!gesture || gesture.id !== event.pointerId) return;
      if (gesture.dragging) suppressClickUntil = performance.now() + 400;
      gesture = undefined;
      delete container.dataset["dragging"];
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
      paused.current = desktopPointer.matches && Boolean(container.querySelector(".work-marquee-image:hover, .work-marquee-image:focus-within"));
    };
    const preventDragClick = (event: MouseEvent) => {
      if (performance.now() >= suppressClickUntil) return;
      event.preventDefault();
      event.stopPropagation();
    };
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      const delta = event.deltaX * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? container.clientWidth : 1);
      progress = dragMarquee(progress, -delta, getLoopWidth());
      wheelPauseUntil = performance.now() + 250;
      event.preventDefault();
    };
    container.addEventListener("pointerdown", pointerDown);
    container.addEventListener("pointermove", pointerMove);
    container.addEventListener("pointerup", pointerEnd);
    container.addEventListener("pointercancel", pointerEnd);
    container.addEventListener("lostpointercapture", pointerEnd);
    container.addEventListener("click", preventDragClick, true);
    container.addEventListener("wheel", wheel, { passive: false });
    const sizeStage = () => {
      if (desktopPointer.matches) {
        container.style.height = "";
        return;
      }
      const maxHeight = Math.max(...cards.map((card) => card.offsetHeight));
      const top = parseFloat(getComputedStyle(cards[0] ?? container).top) || 32;
      // Reserve the entire card, its curve offset and breathing room, not just its image.
      container.style.height = `${Math.ceil(maxHeight + top + 52 + 24)}px`;
    };
    const observer = new ResizeObserver(sizeStage);
    cards.forEach((card) => observer.observe(card));
    observer.observe(container);
    desktopPointer.addEventListener("change", sizeStage);
    sizeStage();

    const positionCards = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const viewport = container.clientWidth;
      const cardWidth = cards[0]?.offsetWidth ?? viewport * 0.82;
      const spacing = cardWidth + Math.max(20, viewport * 0.025);
      const loopWidth = spacing * cards.length;
      progress = advanceMarquee(progress, dt, marqueeSpeed(viewport), loopWidth, paused.current || Boolean(gesture) || now < wheelPauseUntil);

      cards.forEach((card, index) => {
        const raw = index * spacing - progress;
        const x = wrapMarqueePosition(raw, loopWidth);
        const distance = Math.min(1, Math.abs(x) / Math.max(viewport * 0.72, 1));
        const y = distance * distance * (viewport < 768 ? 24 : 52);
        const z = -distance * (viewport < 768 ? 90 : 230);
        const rotation = Math.max(-25, Math.min(25, (-x / Math.max(viewport / 2, 1)) * 18));
        const scale = 1 - distance * (viewport < 768 ? 0.08 : 0.2);
        card.style.transform = `translate3d(calc(-50% + ${x}px), ${y}px, ${z}px) rotateY(${rotation}deg) scale(${scale})`;
        card.style.zIndex = `${Math.round((1 - distance) * 20)}`;
      });
      frame = requestAnimationFrame(positionCards);
    };

    frame = requestAnimationFrame(positionCards);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      desktopPointer.removeEventListener("change", sizeStage);
      container.removeEventListener("pointerdown", pointerDown);
      container.removeEventListener("pointermove", pointerMove);
      container.removeEventListener("pointerup", pointerEnd);
      container.removeEventListener("pointercancel", pointerEnd);
      container.removeEventListener("lostpointercapture", pointerEnd);
      container.removeEventListener("click", preventDragClick, true);
      container.removeEventListener("wheel", wheel);
      paused.current = false;
    };
  }, []);

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
        className="relative mt-8 h-[350px] w-full overflow-hidden [perspective:1100px] sm:h-[470px] md:mt-10 md:h-[620px] md:[perspective:1500px]"
        data-lenis-prevent
        aria-label="Selected projects"
      >
        {[0, 1, 2].flatMap((copy) => projects.map((project) => (
          <ProjectCard key={`${copy}-${project.slug}`} project={project} duplicate={copy > 0} setPaused={(value) => { paused.current = value; }} />
        )))}
      </div>
    </section>
  );
}
