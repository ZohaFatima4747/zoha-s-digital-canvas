import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: easeEditorial }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked rise, used for large editorial headlines. */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: easeEditorial }}
            style={{ willChange: "transform" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </motion.span>
  );
}

export function SectionHeading({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-6 ${className ?? ""}`}>
      <span className="label-mono text-olive">{index}</span>
      <h2 className="display-xl text-[clamp(2rem,5vw,4.25rem)]">
        <RevealWords text={title} />
      </h2>
    </div>
  );
}
