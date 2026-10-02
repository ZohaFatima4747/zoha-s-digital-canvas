import celestra from "@/assets/celestra-preview.jpg";
import broast from "@/assets/broast-preview.jpg";
import portfolio from "@/assets/portfolio-preview.jpg";
import mapsProject from "@/assets/maps-project.jpg";

export type Project = {
  index: string;
  slug: string;
  title: string;
  kind: string;
  note: string;
  href?: string;
  image: string;
  portrait?: boolean;
  summary: string;
  modules?: string[];
  tech: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "celestra",
    title: "Celestra",
    kind: "Luxury E-commerce",
    note: "Real client project",
    href: "https://www.celestraa.com/",
    image: celestra,
    portrait: true,
    summary:
      "A refined storefront built for a luxury brand — considered typography, slow deliberate motion and a product experience that carries the weight of the label.",
    tech: ["Storefront", "Product Experience", "Shopify API", "Performance"],
  },
  {
    index: "02",
    slug: "jalandhar-broast",
    title: "Jalandhar Broast",
    kind: "Restaurant Management System",
    note: "Real client project",
    image: broast,
    summary:
      "A complete operating system for a restaurant: customers order from the storefront, staff run service through the POS, and owners see the whole business in real time — down to the thermal printer on the counter.",
    modules: [
      "Customer Storefront",
      "POS",
      "Owner Dashboard",
      "Inventory",
      "Analytics",
      "Orders",
      "Tables",
      "Thermal Printing",
      "Electron Desktop App",
    ],
    tech: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Electron"],
  },
  {
    index: "03",
    slug: "personal-portfolio",
    title: "Personal Portfolio Website",
    kind: "UI/UX Design · Interaction Design · Visual Direction",
    note: "Real client project",
    image: portfolio,
    summary:
      "A premium, highly animated UI/UX Designer portfolio focused on immersive storytelling, clean visual hierarchy, and seamless user interactions. Designed with an editorial-inspired aesthetic, combining thoughtful layouts, refined typography, smooth transitions, and interactive project presentation to create an engaging personal brand experience.",
    tech: ["Lovable"],
  },
  {
    index: "04",
    slug: "business-discovery-map",
    title: "Interactive Business Discovery Map",
    kind: "Interactive Map / Business Discovery",
    note: "Real client project",
    image: mapsProject,
    summary:
      "An interactive map experience for discovering local businesses — custom marker overlays, clustered pins, dynamic info windows rendered from live data and geo-location integration.",
    tech: ["Google Maps API", "JavaScript", "HTML/CSS", "Bubble API"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return projects[0];
  return projects[(index + 1) % projects.length];
}