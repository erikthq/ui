import { createRequire } from "node:module";
import { watch, writeFile, copyFile, mkdir, readdir, readFile } from "node:fs/promises";
import { resolve, dirname, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";
import browserslist from "browserslist";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcFile = resolve(__dirname, "src/main.css");
const distDir = resolve(__dirname, "dist");
const dest = resolve(distDir, "ui.css");
const componentsSrc = resolve(__dirname, "src/components");
const componentsDist = resolve(distDir, "components");
const elementsSrc = resolve(__dirname, "src/elements.js");
const elementsDest = resolve(distDir, "elements.js");
const watchMode = process.argv.includes("--watch");

// Load lightningcss from Vite's own dependencies — no extra install needed
const req = createRequire(import.meta.resolve("vite"));
const { bundle: lcBundle, bundleAsync, browserslistToTargets } = req("lightningcss");

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

// Bundles a virtual entry, so each file declares the same layers as ui.css
async function buildStandalone(name, source, dest) {
  const entry = resolve(__dirname, "src", name + ".entry.css");
  const { code } = await bundleAsync({
    filename: entry,
    minify: false,
    targets,
    resolver: {
      read: (path) => (path === entry ? `@layer ui-reset, ui;\n${source}` : readFile(path, "utf8")),
    },
  });

  await writeFile(dest, code);
}

// Each component on its own, with the components it imports
const buildComponent = (file) =>
  buildStandalone(basename(file), `@import "./components/${basename(file)}" layer(ui);`, resolve(componentsDist, basename(file)));

// The tokens every standalone component needs
const buildTokens = () =>
  buildStandalone(
    "tokens",
    ["easings", "colors", "tokens"].map((f) => `@import "./${f}.css" layer(ui);`).join("\n"),
    resolve(distDir, "tokens.css"),
  );

async function buildComponents() {
  await mkdir(componentsDist, { recursive: true });
  const files = (await readdir(componentsSrc)).filter((f) => f.endsWith(".css"));
  await Promise.all([...files.map(buildComponent), buildTokens()]);

  // The reset ships on its own too, for use next to single components
  const { code } = lcBundle({ filename: resolve(__dirname, "src/reset.css"), minify: true, targets });
  await writeFile(resolve(distDir, "reset.css"), `@layer ui-reset,ui;@layer ui-reset{${code}}`);
  console.log(`  dist/tokens.css, dist/reset.css and dist/components/*.css written (${files.length})`);

  await writeExports(files);
}

// esm.sh only resolves exact export paths, not wildcards, so every component gets its own entry
async function writeExports(files) {
  const pkgPath = resolve(__dirname, "package.json");
  const before = await readFile(pkgPath, "utf8");
  const pkg = JSON.parse(before);
  const components = Object.fromEntries(files.sort().map((f) => [`./components/${f}`, `./dist/components/${f}`]));

  pkg.exports = {
    ".": "./dist/ui.css",
    "./reset.css": "./dist/reset.css",
    "./tokens.css": "./dist/tokens.css",
    ...components,
    "./elements": "./dist/elements.js",
  };

  const after = JSON.stringify(pkg, null, 2) + "\n";
  if (after !== before) await writeFile(pkgPath, after);
}

async function buildElements() {
  await copyFile(elementsSrc, elementsDest);
  console.log("  dist/elements.js written");
}

await mkdir(distDir, { recursive: true });
await buildCss();
await buildComponents();
await buildElements();

if (watchMode) {
  const srcDir = resolve(__dirname, "src");
  const watcher = watch(srcDir, { recursive: true });
  console.log("  Watching src/ for changes...");
  for await (const event of watcher) {
    if (event.filename?.endsWith(".css")) {
      await buildCss();
      await buildComponents();
    } else if (event.filename === "elements.js") {
      await buildElements();
    }
  }
}
