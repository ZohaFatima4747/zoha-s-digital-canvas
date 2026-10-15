import { describe, test } from "node:test";
import { strict as assert } from "node:assert";

const testRuntime = "bun:test";
const { mock } = await import(testRuntime);

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
  test("supplied academy and automation thumbnails resolve independently of Vercel's origin", () => {
    for (const slug of ["hajra-zainab-quran-academy", "instagram-lead-automation"]) {
      const project = getProject(slug);
      assert.ok(project);
      const image = new URL(project.image);
      assert.equal(image.hostname, "id-preview--78e909e7-61ef-4659-963e-abb37b75e612.lovable.app");
      assert.ok(image.pathname.startsWith("/__l5e/assets-v1/"));
    }
  });
  test("new projects append in order and participate in cyclic next-project navigation", () => {
    assert.deepEqual(projects.map((project) => project.slug), ["celestra", "jalandhar-broast", "personal-portfolio", "business-discovery-map", "hajra-zainab-quran-academy", "instagram-lead-automation"]);
    assert.equal(getNextProject("business-discovery-map")?.slug, "hajra-zainab-quran-academy");
    assert.equal(getNextProject("hajra-zainab-quran-academy")?.slug, "instagram-lead-automation");
    assert.equal(getNextProject("instagram-lead-automation")?.slug, "celestra");
  });
});