import { Reveal, SectionHeading } from "@/components/site/Reveal";

const steps = [
  {
    title: "Quick Intro Call or Message",
    copy: "Tell me about your project — what you need, your timeline, and your budget range.",
  },
  {
    title: "Scope & Quote",
    copy: "I'll confirm the details and send a clear quote and timeline, no surprises later.",
  },
  {
    title: "Build",
    copy: "I build, and share progress updates along the way so you're never left wondering.",
  },
  {
    title: "Launch & Ongoing Support",
    copy: "You get a live, working product — and I stay available after handoff for anything you need: menu/content updates, new setup, small fixes, or any issue that comes up. You're never left on your own after launch.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeading index="How It Works" title="A simple, transparent process." />

        <div className="mt-16 border-t border-border">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="group relative grid gap-6 border-b border-border py-10 md:grid-cols-12 md:py-14">
                <div className="md:col-span-1">
                  <span className="label-mono text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 md:text-3xl">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6 md:text-base">
                  {step.copy}
                </p>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-olive transition-transform duration-700 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
