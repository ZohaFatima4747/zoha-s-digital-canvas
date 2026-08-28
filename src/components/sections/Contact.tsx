import { useState } from "react";
import { Magnetic } from "@/components/site/Magnetic";
import { Reveal, RevealWords } from "@/components/site/Reveal";

const EMAIL = "zoha83577@gmail.com";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `New Project Inquiry — ${name || "Website Visitor"}`,
  )}&body=${encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Project / Message:",
      message,
    ].join("\n"),
  )}`;

  const field =
    "w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-olive focus:outline-none";

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
                Have a product, an automation, or an AI idea that needs building? Send a few lines
                about it — I reply to every serious enquiry.
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
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = mailto;
                }}
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="label-mono text-muted-foreground">Name</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="label-mono text-muted-foreground">Email</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className={field}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="label-mono text-muted-foreground">Project</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you building?"
                    className={`${field} resize-none`}
                  />
                </label>

                <Magnetic strength={0.16} className="inline-block">
                  <button
                    type="submit"
                    data-cursor="send"
                    className="label-mono inline-flex items-center gap-3 rounded-full border border-foreground/25 px-7 py-3.5 transition-colors hover:border-olive hover:text-olive"
                  >
                    Send message <span aria-hidden>→</span>
                  </button>
                </Magnetic>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
