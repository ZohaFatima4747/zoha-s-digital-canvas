import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Magnetic } from "@/components/site/Magnetic";
import { Reveal, RevealWords } from "@/components/site/Reveal";

const EMAIL = "zoha83577@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <span className="label-mono text-olive">Contact</span>

        <h2 className="display-xl mt-6 text-[clamp(2.5rem,10vw,8.5rem)]">
          <RevealWords text="Let's build" />
          <br />
          <RevealWords text="something." delay={0.12} />
        </h2>

        <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                Have a product, an automation, or an AI idea that needs building? Drop me a line — I
                reply to every serious enquiry.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <Magnetic strength={0.18} className="inline-block">
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="email"
                    className="inline-flex items-center gap-3 border-b border-foreground/30 pb-2 font-display text-[clamp(1.1rem,2.6vw,1.9rem)] uppercase tracking-tight transition-colors hover:border-olive hover:text-olive"
                  >
                    {EMAIL}
                    <span aria-hidden>→</span>
                  </a>
                </Magnetic>

                <button
                  type="button"
                  onClick={copyEmail}
                  data-cursor="copy"
                  aria-label={copied ? "Email copied" : "Copy email to clipboard"}
                  className="label-mono mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 transition-colors hover:border-olive hover:text-olive"
                >
                  {copied ? (
                    <>
                      <Check size={15} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> Copy email
                    </>
                  )}
                </button>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <div className="flex h-full flex-col justify-end">
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  Prefer email? Reach out directly at{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-foreground underline-offset-4 hover:text-olive hover:underline"
                  >
                    {EMAIL}
                  </a>{" "}
                  — or tap the copy button to grab it instantly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
