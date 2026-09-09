import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Testimonials } from "@/components/sections/Testimonials";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Cursor } from "@/components/site/Cursor";

const title = "Zoha Fatima — Full-Stack Developer, AI & Automation";
const description =
  "Portfolio of Zoha Fatima, a full-stack developer building web products, AI-powered features and automated workflows with Next.js, TypeScript, Node and n8n.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Zoha Fatima",
          jobTitle: "Full-Stack Developer",
          email: "mailto:zoha83577@gmail.com",
          knowsAbout: ["Web Development", "Artificial Intelligence", "Workflow Automation"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain relative overflow-x-hidden">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
