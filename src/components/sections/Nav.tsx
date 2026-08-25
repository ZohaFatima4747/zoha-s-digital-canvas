import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Magnetic } from "@/components/site/Magnetic";
import { easeEditorial } from "@/lib/motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setCondensed(v > 80));

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: easeEditorial }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className="transition-all duration-500"
        style={{
          backgroundColor: condensed ? "color-mix(in oklab, var(--ivory) 82%, transparent)" : "transparent",
          backdropFilter: condensed ? "blur(14px)" : "none",
          borderBottom: condensed ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-10">
          <a href="#top" data-cursor="top" className="label-mono leading-none">
            ZF
            <span className="ml-2 hidden text-muted-foreground sm:inline">/ Full-Stack Developer</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor
                className="label-mono text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <Magnetic strength={0.2}>
            <a
              href="#contact"
              data-cursor="hire"
              className="label-mono inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 transition-colors hover:border-olive hover:text-olive"
            >
              Contact <span aria-hidden>→</span>
            </a>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
  );
}
