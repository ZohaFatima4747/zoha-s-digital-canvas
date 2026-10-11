import { mock } from "bun:test";
import { describe, test } from "node:test";
import { strict as assert } from "node:assert";

for (const filename of ["celestra-preview.jpg", "broast-preview.jpg", "portfolio-preview.jpg", "maps-project.jpg"]) {
  mock.module(`../assets/${filename}`, () => ({ default: filename }));
}
const { getProject, getNextProject, projects } = await import("./projects");

describe("Portfolio project requirements", () => {
  test("Celestra has no live URL or Shopify API", () => {
    const project = getProject("celestra");
    assert.ok(project);
    assert.equal(project.href, undefined);
    assert.equal(project.tech.includes("Shopify API"), false);
  });
  test("map technologies omit Bubble API", () => {
    assert.deepEqual(getProject("business-discovery-map")?.tech, ["Google Maps API", "JavaScript", "HTML/CSS"]);
  });
  test("academy includes bilingual CMS features, specified technologies and placeholder", () => {
    const project = getProject("hajra-zainab-quran-academy");
    assert.ok(project);
    assert.deepEqual(project.tech, ["Next.js", "Supabase", "TypeScript"]);
    assert.equal(project.deployment, "Vercel");
    assert.equal(project.href, undefined);
    assert.equal(project.liveUrlPlaceholder, true);
    assert.ok(project.modules?.includes("Bilingual English/Urdu language switcher"));
    assert.ok(project.modules?.includes("Custom CMS"));
    assert.ok(project.modules?.includes("Admin dashboard"));
  });
  test("Instagram automation uses requested technologies without an invented URL", () => {
    const project = getProject("instagram-lead-automation");
    assert.ok(project);
    assert.deepEqual(project.tech, ["n8n", "Instagram API", "Workflow Automation"]);
    assert.equal(project.href, undefined);
  });
  test("new projects append in order and participate in cyclic next-project navigation", () => {
    assert.deepEqual(projects.map((project) => project.slug), ["celestra", "jalandhar-broast", "personal-portfolio", "business-discovery-map", "hajra-zainab-quran-academy", "instagram-lead-automation"]);
    assert.equal(getNextProject("business-discovery-map")?.slug, "hajra-zainab-quran-academy");
    assert.equal(getNextProject("hajra-zainab-quran-academy")?.slug, "instagram-lead-automation");
    assert.equal(getNextProject("instagram-lead-automation")?.slug, "celestra");
  });
});