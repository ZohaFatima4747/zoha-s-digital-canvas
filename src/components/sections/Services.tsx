import { Reveal, SectionHeading } from "@/components/site/Reveal";

const services = [
  {
    index: "01",
    title: "Web Development",
    body: "Production web apps and marketing sites built with Next.js, React and TypeScript — typed end to end, fast, accessible and maintainable.",
    items: ["Next.js / React", "TypeScript", "Design systems", "Performance"],
  },
  {
    index: "02",
    title: "AI Integration",
    body: "Practical AI features inside real products: assistants, extraction, semantic search and content pipelines wired into your existing data.",
    items: ["OpenAI APIs", "RAG & embeddings", "Chat interfaces", "Prompt design"],
  },
  {
    index: "03",
    title: "Workflow Automation",
    body: "Manual operations turned into reliable automated systems with n8n, webhooks and custom integrations across the tools a business already runs on.",
    items: ["n8n flows", "API integrations", "Webhooks", "Ops tooling"],
  },
  {
    index: "04",
    title: "Backend & Data",
    body: "APIs, authentication, schema design and dashboards on Node, Laravel, PostgreSQL, Supabase and MongoDB — secure by default.",
    items: ["REST APIs", "Auth & roles", "PostgreSQL", "Supabase"],
  },
];

const aiTools = ["Claude", "OpenAI Codex", "Lovable", "Kiro"];

export function Services() {
  return (
    <section id="services" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeading index="Services" title="What I build." />

        <div className="mt-14 grid gap-px border-t border-border sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={0.05 * i}>
              <article
                data-cursor
                className="group h-full border-b border-border px-0 py-10 sm:px-8 sm:odd:border-r"
              >
                <div className="flex items-baseline gap-4">
                  <span className="label-mono text-champagne">{s.index}</span>
                  <h3 className="font-display text-2xl uppercase tracking-tight md:text-3xl">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="label-mono text-muted-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col gap-6 border-l border-olive/40 pl-6 md:flex-row md:items-start md:justify-between md:gap-12 md:pl-8">
            <div className="max-w-xl">
              <span className="label-mono text-olive">AI-Powered Development</span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                I pair my own engineering with AI-assisted workflows to move faster — rapid
                prototyping, code review, debugging and UI implementation. The tools accelerate the
                work; the architecture, judgement and quality stay mine.
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
              {aiTools.map((t) => (
                <li
                  key={t}
                  className="label-mono rounded-full border border-border px-4 py-2 text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
