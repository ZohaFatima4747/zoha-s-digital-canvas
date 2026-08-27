import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { easeEditorial } from "@/lib/motion";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const orbits = [
  { label: "WEB", className: "left-[6%] top-[26%]", delay: 1.1 },
  { label: "AI", className: "right-[9%] top-[22%]", delay: 1.25 },
  { label: "AUTOMATION", className: "left-[8%] bottom-[24%]", delay: 1.4 },
  { label: "SYSTEMS", className: "right-[7%] bottom-[28%]", delay: 1.55 },
];

export function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.25]);

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden">
      <motion.div
        style={{ scale: sceneScale, willChange: "transform" }}
        className="absolute inset-0 md:translate-x-[18%] md:scale-90"
      >
        <ClientOnly
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-64 rounded-full border border-border" />
            </div>
          }
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ClientOnly>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, var(--ivory) 88%, transparent) 0%, color-mix(in oklab, var(--ivory) 30%, transparent) 55%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">

        {orbits.map((o) => (
          <motion.span
            key={o.label}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: o.delay, ease: easeEditorial }}
            className={`label-mono absolute text-olive ${o.className}`}
          >
            <span className="mr-2 inline-block size-1 rounded-full bg-champagne align-middle" />
            {o.label}
          </motion.span>
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex h-full flex-col justify-center px-6 md:px-10"
      >
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.5, delay: 0.25, ease: easeEditorial }}
              className="display-xl text-[clamp(3rem,12.5vw,11.5rem)]"
            >
              Zoha Fatima
            </motion.h1>
          </div>

          <div className="mt-1 overflow-hidden md:mt-3">
            <motion.p
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.5, delay: 0.42, ease: easeEditorial }}
              className="display-xl text-[clamp(1rem,3.3vw,2.9rem)] text-olive"
              style={{ fontWeight: 400, letterSpacing: "0.02em" }}
            >
              Full-Stack Developer
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.85, ease: easeEditorial }}
            className="mt-8 max-w-md text-balance text-base leading-relaxed text-muted-foreground md:mt-12 md:text-lg"
          >
            I build digital products, intelligent systems and automated workflows.
          </motion.p>
        </div>
      </motion.div>

      <motion.a
        href="#work"
        data-cursor="scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.7 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex flex-col items-center gap-3">
          <span className="label-mono text-muted-foreground">Scroll to explore</span>
          <span className="relative block h-14 w-px overflow-hidden bg-border">
            <motion.span
              className="absolute inset-x-0 top-0 block h-5 bg-olive"
              animate={{ y: [-20, 56] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </span>
      </motion.a>
    </section>
  );
}
