import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/site/Reveal";

const entries = [
  {
    title: "Learning & Membership Platform",
    copy: "Full-stack platform involving courses/content, authentication, dashboards, payments and production UI development.",
    tags: ["Full-Stack", "Payments", "Dashboards"],
  },
  {
    title: "Service Marketplace Platform",
    copy: "Role-based platform involving authentication, profiles, dashboards, search, backend workflows and secure database architecture.",
    tags: ["Role-Based Access", "Search", "Database Architecture"],
  },
  {
    title: "E-commerce Development",
    copy: "Modern responsive e-commerce interfaces and product-focused storefront functionality.",
    tags: ["Storefront", "Responsive UI"],
  },
  {
    title: "Web Scraping & Product Data",
    copy: "Automated product-data collection, processing and structured catalog workflows using web scraping.",
    tags: ["Scraping", "Data Pipelines", "Catalogs"],
  },
  {
    title: "AI Email Automation",
    copy: "n8n automation processing emails/forms, determining response requirements, classifying requests, retrieving relevant company-document information and generating context-aware AI replies.",
    tags: ["n8n", "Classification", "Retrieval", "LLM"],
  },
  {
    title: "AI & Workflow Automation",
    copy: "Multiple workflows using n8n, Slack, Bubble.io, APIs, AI services and spreadsheets, including chatbots, form automation, data processing, notifications and conditional workflows.",
    tags: ["n8n", "Slack", "Bubble.io", "APIs"],
  },
];

function Entry({ item, i }: { item: (typeof entries)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 40%"] });
  const x = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -30 : 30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className="group relative grid gap-6 border-b border-border py-10 md:grid-cols-12 md:py-14"
    >
      <div className="md:col-span-1">
        <span className="label-mono text-champagne">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="md:col-span-5">
        <h3 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 md:text-3xl">
          {item.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
          {item.tags.map((t) => (
            <span key={t} className="label-mono text-olive">
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6 md:text-base">
        {item.copy}
      </p>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-olive transition-transform duration-700 group-hover:scale-x-100" />
    </motion.div>
  );
}

export function Experience() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 70%", "end 60%"] });
  const height = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="experience" className="relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeading index="Professional Experience" title="A record of shipped systems." />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Client and company details stay confidential — the work itself speaks.
          </p>
        </Reveal>

        <div ref={track} className="relative mt-16 md:mt-24">
          <div className="absolute -left-6 top-0 hidden h-full w-px bg-border md:block">
            <motion.div
              style={{ scaleY: height }}
              className="h-full w-px origin-top bg-olive"
            />
          </div>
          <div className="border-t border-border">
            {entries.map((item, i) => (
              <Entry key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
