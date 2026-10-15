import celestra from "@/assets/celestra-preview.jpg";
import broast from "@/assets/broast-preview.jpg";
import portfolio from "@/assets/portfolio-preview.jpg";
import mapsProject from "@/assets/maps-project.jpg";
import quranAcademy from "@/assets/quran-academy.jpg.asset.json";
import instagramAutomation from "@/assets/instagram-automation.jpg.asset.json";

// Asset paths are served by Lovable, not by external deployment hosts such as Vercel.
const projectAssetOrigin = "https://id-preview--78e909e7-61ef-4659-963e-abb37b75e612.lovable.app";

export type Project = {
  index: string;
  slug: string;
  title: string;
  kind: string;
  note: string;
  href?: string;
  liveUrlPlaceholder?: boolean;
  deployment?: string;
  containImage?: boolean;
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
    image: celestra,
    portrait: true,
    summary:
      "A refined storefront built for a luxury brand — considered typography, slow deliberate motion and a product experience that carries the weight of the label.",
    tech: ["Storefront", "Product Experience", "Performance"],
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
    tech: ["Google Maps API", "JavaScript", "HTML/CSS"],
  },
  {
    index: "05",
    slug: "hajra-zainab-quran-academy",
    title: "Hajra Zainab Quran Academy",
    kind: "Educational Website / CMS",
    note: "Real client project",
    image: new URL(quranAcademy.url, projectAssetOrigin).href,
    containImage: true,
    summary: "A modern Quran academy website with a custom CMS and admin dashboard for managing website content, alongside a bilingual English/Urdu language switcher that makes the website accessible to both English- and Urdu-speaking visitors.",
    modules: ["Custom CMS", "Admin dashboard", "Website content management", "Bilingual English/Urdu language switcher"],
    tech: ["Next.js", "Supabase", "TypeScript"],
    deployment: "Vercel",
    liveUrlPlaceholder: true,
  },
  {
    index: "06",
    slug: "instagram-lead-automation",
    title: "Instagram Lead Automation",
    kind: "AI / Workflow Automation",
    note: "Real client project",
    image: new URL(instagramAutomation.url, projectAssetOrigin).href,
    containImage: true,
    summary: "An n8n-powered Instagram lead automation workflow that streamlines lead handling and reduces manual work.",
    modules: ["Instagram lead handling", "Automated workflow"],
    tech: ["n8n", "Instagram API", "Workflow Automation"],
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