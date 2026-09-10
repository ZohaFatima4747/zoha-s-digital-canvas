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

        <div className="relative mt-16 grid gap-5 md:grid-cols-12 md:gap-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-14 right-0 font-serif text-[9rem] leading-none text-champagne/35 md:-top-24 md:text-[14rem]"
          >
            “
          </span>
          {quotes.map((t, i) => (
            <Reveal
              key={t.source}
              delay={i * 0.08}
              className={
                i === 0
                  ? "md:col-span-7"
                  : i === 1
                    ? "md:col-span-5 md:mt-16"
                    : "md:col-span-7 md:col-start-4"
              }
            >
              <figure
                className={`group relative flex h-full min-h-64 flex-col justify-between overflow-hidden border border-border bg-background p-7 transition-colors duration-500 hover:border-olive/60 md:p-9 ${
                  i === 2 ? "md:min-h-72" : "md:min-h-80"
                }`}
              >
                <div>
                  <span className="font-serif text-6xl leading-none text-champagne transition-colors duration-500 group-hover:text-olive">
                    “
                  </span>
                  <blockquote className="mt-3">
                    <p className="font-serif text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.35]">
                      {t.quote}
                    </p>
                  </blockquote>
                </div>
                <figcaption className="mt-10 flex items-center justify-between gap-5 border-t border-border pt-5">
                  <span className="label-mono text-olive">{t.source}</span>
                  <span className="label-mono text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
