import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, RevealWords } from "@/components/site/Reveal";

const EMAIL = "zoha83577@gmail.com";
const ACCESS_KEY = "96bf4b15-661f-481a-b0a9-11f5ec52072a";

const projectTypes = [
  "Website",
  "Web App",
  "E-commerce",
  "Automation/AI",
  "Ongoing Support/Maintenance",
  "Other",
];

const budgets = ["Under $500", "$500–$1,500", "$1,500–$5,000", "Not sure yet"];

const fieldClass =
  "mt-3 w-full min-w-0 border-b border-foreground/25 bg-transparent pb-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-olive";

const selectClass = `${fieldClass} cursor-pointer appearance-none pr-10 text-foreground`;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New enquiry from portfolio",
          ...data,
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative border-t border-border py-16 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <span className="label-mono text-olive">Contact</span>

        <h2 className="display-xl mt-6 text-[clamp(2.5rem,10vw,8.5rem)]">
          <RevealWords text="Let's build" />
          <br />
          <RevealWords text="something." delay={0.12} />
        </h2>

        <Reveal>
          <p className="label-mono mt-8 text-champagne">
            Currently taking on 1–2 new projects this month.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                Have a product, an automation, or an AI idea that needs building? Drop me a line — I
                reply to every serious enquiry.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Prefer email? Reach out directly at{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-foreground underline-offset-4 hover:text-olive hover:underline"
                >
                  {EMAIL}
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <form onSubmit={onSubmit} className="grid min-w-0 gap-8 md:grid-cols-2">
                <div className="md:col-span-1">
                  <label htmlFor="name" className="label-mono text-olive">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="email" className="label-mono text-olive">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="project_type" className="label-mono text-olive">
                    Project type
                  </label>
                  <div className="relative">
                    <select id="project_type" name="project_type" defaultValue="" className={selectClass}>
                      <option value="" disabled>
                        Select one
                      </option>
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute bottom-3 right-1 h-4 w-4 text-olive" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="budget" className="label-mono text-olive">
                    Budget range
                  </label>
                  <div className="relative">
                    <select id="budget" name="budget" defaultValue="" className={selectClass}>
                      <option value="" disabled>
                        Select one
                      </option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute bottom-3 right-1 h-4 w-4 text-olive" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="label-mono text-olive">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="Tell me about your project, timeline and goals."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <div className="md:col-span-2 flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor="send"
                    className="label-mono inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3 transition-colors hover:border-olive hover:text-olive disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <span aria-hidden>→</span>
                  </button>

                  <p aria-live="polite" className="label-mono">
                    {status === "success" ? (
                      <span className="text-olive">
                        Thanks — I&apos;ll get back to you within 24 hours.
                      </span>
                    ) : status === "error" ? (
                      <span className="text-destructive">
                        Something went wrong. Please email me directly.
                      </span>
                    ) : null}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
