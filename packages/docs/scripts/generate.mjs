import { mkdir, writeFile, copyFile, cp } from "node:fs/promises";
import { join } from "node:path";

const { default: app } = await import("../dist/.server/index.js");

const routes = [
  "/",
  "/getting-started/introduction",
  "/getting-started/themes",
  "/components/prose",
  "/components/accordion",
  "/components/avatar",
  "/components/button",
  "/components/button-group",
  "/components/card",
  "/components/checkbox",
  "/components/color-input",
  "/components/combobox",
  "/components/datalist",
  "/components/date-input",
  "/components/dialog",
  "/components/text-field",
  "/components/textarea",
  "/components/empty",
  "/components/skeleton",
  "/components/marquee",
  "/components/tree-view",
  "/components/pagination",
  "/components/tag-group",
  "/components/input-otp",
  "/components/menu",
  "/components/number-field",
  "/components/expander",
  "/components/file-drop",
  "/components/code",
  "/components/kbd",
  "/components/loading",
  "/components/popover",
  "/components/progress",
  "/components/radio",
  "/components/separator",
  "/components/slider",
  "/components/switch",
  "/components/table",
  "/components/toggle",
  "/components/toggle-group",
  "/components/tooltip",
  "/getting-started/icons",
  "/icons.json",
  "/icons-filled.json",
  "/getting-started/customization",
  "/components/badge",
  "/components/dropdown",
  "/components/select",
  "/components/submenu",
  "/components/field",
  "/components/focus-group",
  "/components/radio-group",
  "/components/tabs",
  "/blocks",
  "/blocks/richtext-editor",
  "/blocks/signup-form",
  "/blocks/sidebar",
  "/blocks/complex-menu",
  "/blocks/admin-dashboard",
  "/getting-started/easings",
  "/typography",
  "/getting-started/skills",
  "/llms.txt",
];

const outDir = new URL("../dist", import.meta.url).pathname;

for (const route of routes) {
  const response = await app.fetch(new Request(`http://localhost${route}`));
  const content = await response.text();

  if (route.includes('.')) {
    await writeFile(join(outDir, route), content);
  } else {
    const dir = route === "/" ? outDir : join(outDir, route);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), content);
  }
  console.log(`  ${route}`);
}

// Copy ui.css to dist
const rootCss = new URL("../../../ui.css", import.meta.url).pathname;
await copyFile(rootCss, join(outDir, "ui.css"));

// Regenerate SKILL.md at repo root so it stays in sync with the build
const skillResponse = await app.fetch(new Request("http://localhost/skill.md"));
const skillContent = await skillResponse.text();
const repoRoot = new URL("../../..", import.meta.url).pathname;
await writeFile(join(repoRoot, "SKILL.md"), skillContent);
console.log("  SKILL.md → repo root");

// Copy minisearch ESM bundle
const miniSearchSrc = new URL("../node_modules/minisearch/dist/es/index.js", import.meta.url).pathname;
await copyFile(miniSearchSrc, join(outDir, "minisearch.js"));

// Copy public directory to dist
const publicDir = new URL("../src/public", import.meta.url).pathname;
await cp(publicDir, outDir, { recursive: true });

// GitHub Pages needs this to disable Jekyll processing
await writeFile(join(outDir, ".nojekyll"), "");

// Generate sitemap.xml
const siteOrigin = (process.env.SITE_URL ?? "https://ui.erikt.me").replace(/\/$/, "");
const baseUrl = process.env.BASE_URL ? siteOrigin + process.env.BASE_URL.replace(/\/$/, "") : siteOrigin;
const htmlRoutes = routes.filter(r => !r.includes("."));
const today = new Date().toISOString().split("T")[0];
const priorities = { "/": "1.0", default: "0.8" };
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${htmlRoutes.map(r => `  <url>
    <loc>${baseUrl}${r === "/" ? "" : r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priorities[r] ?? priorities.default}</priority>
  </url>`).join("\n")}
</urlset>`;
await writeFile(join(outDir, "sitemap.xml"), sitemap);
console.log("  sitemap.xml");

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
await writeFile(join(outDir, "robots.txt"), robotsTxt);
console.log("  robots.txt");

console.log(`\nGenerated ${routes.length} pages → dist/`);
