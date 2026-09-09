import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { Code2, MessageCircle, Rocket, ScrollText } from "lucide-react";

const steps = [
  {
    title: "Quick Intro Call or Message",
    copy: "Tell me about your project — what you need, your timeline, and your budget range.",
    icon: MessageCircle,
  },
  {
    title: "Scope & Quote",
    copy: "I'll confirm the details and send a clear quote and timeline, no surprises later.",
    icon: ScrollText,
  },
  {
    title: "Build",
    copy: "I build, and share progress updates along the way so you're never left wondering.",
    icon: Code2,
  },
  {
    title: "Launch & Ongoing Support",
    copy: "You get a live, working product — and I stay available after handoff for anything you need: menu/content updates, new setup, small fixes, or any issue that comes up. You're never left on your own after launch.",
    icon: Rocket,
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionHeading index="How It Works" title="A simple, transparent process." />

        <div className="relative mt-16 md:ml-8">
          <div className="absolute bottom-10 left-6 top-10 w-px bg-border md:left-8" aria-hidden />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="group relative grid grid-cols-[3rem_1fr] gap-x-5 py-7 md:grid-cols-[4rem_5fr_6fr] md:gap-x-10 md:py-10">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-border bg-background text-olive transition-colors duration-500 group-hover:border-olive group-hover:bg-olive group-hover:text-background md:h-16 md:w-16">
                  <step.icon aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 pt-1 md:pt-2">
                  <span className="label-mono text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5 md:text-3xl">
                    {step.title}
                  </h3>
                </div>
                <p className="col-start-2 mt-4 text-sm leading-relaxed text-muted-foreground md:col-start-auto md:mt-0 md:pt-7 md:text-base">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
