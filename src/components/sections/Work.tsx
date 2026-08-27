import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealWords, SectionHeading } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";
import celestra from "@/assets/celestra-preview.jpg";
import broast from "@/assets/broast-preview.jpg";

type Project = {
  index: string;
  title: string;
  kind: string;
  note: string;
  href?: string;
  image: string;
  summary: string;
  modules?: string[];
  tech?: string[];
};

const projects: Project[] = [
  {
    index: "01",
    title: "Celestra",
    kind: "Luxury E-commerce",
    note: "Real client project",
    href: "https://www.celestraa.com/",
    image: celestra,
    summary:
      "A refined storefront built for a luxury brand — considered typography, slow deliberate motion and a product experience that carries the weight of the label.",
    tech: ["Storefront", "Product Experience", "Shopify API", "Performance"],
  },
  {
    index: "02",
    title: "Jalandhar Broast",
    kind: "Restaurant Management System",
    note: "Real client project",
    image: broast,
    summary:
      "A complete operating system for a restaurant: customers order from the storefront, staff run service through the POS, and owners see the whole business in real time — down to the thermal printer on the counter.",
    modules: [
      "Customer Storefront",
      "POS",
      "Owner Dashboard",
      "Inventory",
      "Analytics",
      "Orders",
      "Tables",
      "Thermal Printing",
      "Electron Desktop App",
    ],
    tech: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Electron"],
  },
];

function ProjectPanel({ project }: { project: Project }) {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={wrap} className="relative border-t border-border py-20 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <span className="label-mono text-olive">
            {project.index} — {project.kind}
          </span>
          <h3 className="display-xl mt-5 text-[clamp(2.4rem,6.5vw,5.5rem)]">
            <RevealWords text={project.title} />
          </h3>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </Reveal>

          {project.modules ? (
            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                {project.modules.map((m) => (
                  <li key={m} className="label-mono text-foreground/70">
                    <span className="mr-2 text-champagne">·</span>
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {project.tech ? (
            <Reveal delay={0.25}>
              <div className="mt-8 hairline" />
              <p className="label-mono mt-4 text-muted-foreground">{project.tech.join("  /  ")}</p>
            </Reveal>
          ) : null}

          <Reveal delay={0.3}>
            <div className="mt-8 flex items-center gap-6">
              <span className="label-mono text-champagne">{project.note}</span>
              {project.href ? (
                <Magnetic strength={0.2}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="visit"
                    className="label-mono group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 transition-colors hover:border-olive hover:text-olive"
                  >
                    View live site
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </a>
                </Magnetic>
              ) : null}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal y={28}>
          <div
            className="group relative aspect-[16/10] w-full overflow-hidden bg-muted shadow-[0_50px_100px_-60px_oklch(0.19_0.008_60/0.45)]"
            data-cursor={project.href ? "view" : "case study"}
          >
            <motion.img
              src={project.image}
              alt={`${project.title} — ${project.kind} interface preview`}
              width={1600}
              height={1000}
              loading="lazy"
              style={{ y: imageY, willChange: "transform" }}
              className="absolute inset-0 h-[112%] w-full -top-[6%] object-cover transition-[filter] duration-700 group-hover:saturate-125"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div className="absolute inset-4 border border-champagne/60" />
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="relative pt-28">
      <div className="mx-auto max-w-[1500px] px-6 pb-10 md:px-10">
        <SectionHeading index="Selected Work" title="Built for real businesses." />
      </div>
      {projects.map((p) => (
        <ProjectPanel key={p.index} project={p} />
      ))}
    </section>
  );
}
