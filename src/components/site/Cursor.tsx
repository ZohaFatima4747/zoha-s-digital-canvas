import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const hit = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setActive(!!hit);
      const c = hit?.dataset["cursor"];
      setLabel(c && c !== "true" ? c : null);

    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
    >
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-foreground"
      />
      <div
        ref={ring}
        className="absolute flex items-center justify-center rounded-full border border-olive/40 transition-[width,height,margin,background-color] duration-300"
        style={{
          width: active ? 76 : 30,
          height: active ? 76 : 30,
          marginLeft: active ? -38 : -15,
          marginTop: active ? -38 : -15,
          backgroundColor: active ? "var(--champagne-soft)" : "transparent",
        }}
      >
        {label ? (
          <span className="label-mono text-[9px] text-olive">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
