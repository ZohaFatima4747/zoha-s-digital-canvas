import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getNextProject, getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const project = getProject(params.slug);
    const title = project ? `${project.title} — Zoha Fatima` : "Project — Zoha Fatima";
    const description = project?.summary ?? "Selected work by full-stack developer Zoha Fatima.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div>
          <p className="label-mono text-olive">Project unavailable</p>
          <Link to="/" hash="work" className="mt-6 inline-flex items-center gap-2 text-foreground">
            <ArrowLeft className="size-4" /> Back to selected work
          </Link>
        </div>
      </main>
    );
  }

  const next = getNextProject(project.slug);

  return (
    <div className="grain min-h-screen overflow-x-hidden bg-background">
      <header className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Link
          to="/"
          hash="work"
          className="label-mono inline-flex items-center gap-2 transition-colors hover:text-olive"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} /> Back to home
        </Link>
        <span className="label-mono text-muted-foreground">ZF / Selected work</span>
      </header>

      <main>
        <section className="border-t border-border py-12 md:py-24">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="label-mono text-olive">{project.index} — {project.kind}</span>
              <h1 className="display-xl mt-5 text-[clamp(2.6rem,7vw,7rem)]">{project.title}</h1>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.summary}
              </p>
              <p className="label-mono mt-8 text-champagne">{project.note}</p>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label-mono mt-7 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 transition-colors hover:border-olive hover:text-olive"
                >
                  View live site <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </a>
              ) : null}
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-[16/10] overflow-hidden bg-muted shadow-[var(--shadow-editorial)]">
                <img
                  src={project.image}
                  alt={`${project.title} interface presentation`}
                  width={1600}
                  height={1000}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: project.portrait ? "center 45%" : "center" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-12 md:py-24">
          <div className="mx-auto grid max-w-[1500px] gap-10 px-6 md:px-10 lg:grid-cols-12">
            <h2 className="font-display text-3xl font-bold uppercase lg:col-span-4 md:text-5xl">Project details</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
              <div>
                <h3 className="label-mono text-olive">Technologies</h3>
                <ul className="mt-5 border-t border-border">
                  {project.tech.map((item) => (
                    <li key={item} className="border-b border-border py-3 text-sm text-foreground">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="label-mono text-olive">Features</h3>
                <ul className="mt-5 border-t border-border">
                  {(project.modules ?? [project.kind, "Responsive experience", "Interaction design"]).map((item) => (
                    <li key={item} className="border-b border-border py-3 text-sm text-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <nav className="border-y border-border" aria-label="More projects">
          <div className="mx-auto grid max-w-[1500px] md:grid-cols-2">
            <Link
              to="/work/$slug"
              params={{ slug: next?.slug ?? projects[0]?.slug ?? "celestra" }}
              className="group px-6 py-12 transition-colors hover:bg-muted md:border-r md:border-border md:px-10 md:py-16"
            >
              <span className="label-mono text-olive">Next project</span>
              <span className="font-display mt-3 flex items-center justify-between gap-5 text-2xl font-bold uppercase md:text-4xl">
                {next?.title ?? projects[0]?.title} <span className="transition-transform group-hover:translate-x-2">→</span>
              </span>
            </Link>
            <Link
              to="/"
              hash="work"
              className="group border-t border-border px-6 py-12 transition-colors hover:bg-muted md:border-t-0 md:px-10 md:py-16"
            >
              <span className="label-mono text-olive">More projects</span>
              <span className="font-display mt-3 flex items-center justify-between text-2xl font-bold uppercase md:text-4xl">
                Selected work <span className="transition-transform group-hover:-translate-x-2">←</span>
              </span>
            </Link>
          </div>
        </nav>
      </main>
    </div>
  );
}