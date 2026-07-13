import { createRequire } from "node:module";
import { watch, writeFile, copyFile, mkdir } from "node:fs/promises";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import browserslist from "browserslist";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcFile = resolve(__dirname, "src/main.css");
const distDir = resolve(__dirname, "dist");
const dest = resolve(distDir, "ui.css");
const elementsSrc = resolve(__dirname, "src/elements.js");
const elementsDest = resolve(distDir, "elements.js");
const watchMode = process.argv.includes("--watch");

// Load lightningcss from Vite's own dependencies — no extra install needed
const req = createRequire(import.meta.resolve("vite"));
const { bundle: lcBundle, browserslistToTargets } = req("lightningcss");

const targets = browserslistToTargets(browserslist("chrome >= 123, firefox >= 120, safari >= 17.5"));

async function buildCss() {
  const { code, map } = lcBundle({
    filename: srcFile,
    minify: true,
    targets,
    sourceMap: true,
  });

  const mapJson = JSON.parse(map.toString());
  mapJson.sources = mapJson.sources.map(s => relative(distDir, "/" + s));

  await writeFile(dest, code + "\n/*# sourceMappingURL=ui.css.map */");
  await writeFile(dest + ".map", JSON.stringify(mapJson));
  console.log("  dist/ui.css written");
}

async function buildElements() {
  await copyFile(elementsSrc, elementsDest);
  console.log("  dist/elements.js written");
}

await mkdir(distDir, { recursive: true });
await buildCss();
await buildElements();

if (watchMode) {
  const srcDir = resolve(__dirname, "src");
  const watcher = watch(srcDir, { recursive: true });
  console.log("  Watching src/ for changes...");
  for await (const event of watcher) {
    if (event.filename?.endsWith(".css")) {
      await buildCss();
    } else if (event.filename === "elements.js") {
      await buildElements();
    }
  }
}
