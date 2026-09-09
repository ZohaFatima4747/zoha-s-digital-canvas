import { Reveal, SectionHeading } from "@/components/site/Reveal";

const quotes = [
  {
    quote:
      "Zoha built our storefront exactly the way we envisioned it — refined, fast, and true to the brand.",
    source: "Client, Celestraa",
  },
  {
    quote:
      "Our restaurant runs on the system Zoha built — POS, orders, inventory, all of it. She's been available anytime we've needed a change or hit a small issue.",
    source: "Client, Jalandhar Broast",
  },
  {
    quote:
      "Working with Zoha felt effortless — she understood the vision immediately and delivered a portfolio that felt premium from day one.",
    source: "Client, Personal Portfolio Project",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeading index="Testimonials" title="Words from clients." />

        <div className="mt-16 border-t border-border">
          {quotes.map((t, i) => (
            <Reveal key={t.source} delay={i * 0.08}>
              <figure className="grid gap-6 border-b border-border py-12 md:grid-cols-12 md:py-16">
                <div className="md:col-span-1">
                  <span className="label-mono text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <blockquote className="md:col-span-8">
                  <p className="font-serif text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.3]">
                    “{t.quote}”
                  </p>
                </blockquote>
                <figcaption className="label-mono text-olive md:col-span-3 md:text-right">
                  {t.source}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
