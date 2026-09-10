import { Reveal, SectionHeading } from "@/components/site/Reveal";

const facts = [
  { k: "Focus", v: "Web · AI · Automation" },
  { k: "Stack", v: "Next.js · TypeScript · Node · Laravel" },
  { k: "Availability", v: "Freelance & contract" },
  { k: "Based in", v: "Remote / Pakistan" },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-16 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeading index="About" title="Engineering with intent." />

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-serif text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.25]">
                I&apos;m Zoha Fatima — a full-stack developer building digital products, intelligent
                systems and automated workflows that quietly remove friction.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  My work sits where interface craft meets systems thinking: typed, well-structured
                  applications on the front end, dependable APIs and data models behind them, and
                  automation connecting the parts so teams stop repeating themselves.
                </p>
                <p>
                  I&apos;ve shipped e-commerce platforms, restaurant operations systems, learning
                  platforms and internal tools — often under confidentiality — and I care about the
                  small things: motion that feels intentional, states that never surprise, and
                  performance that holds up on real devices.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.15}>
              <dl className="border-t border-border">
                {facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border py-5"
                  >
                    <dt className="label-mono text-olive">{f.k}</dt>
                    <dd className="text-sm text-muted-foreground">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
