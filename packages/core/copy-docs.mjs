import { cp, rm } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The docs package exposes its built site; ship it in dist/docs so `npx @erikt/ui docs` can serve it
const __dirname = dirname(fileURLToPath(import.meta.url));
const docsSrc = dirname(fileURLToPath(import.meta.resolve("docs/dist/index.html")));
const docsDest = resolve(__dirname, "dist/docs");

await rm(docsDest, { recursive: true, force: true });
await cp(docsSrc, docsDest, {
  recursive: true,
  filter: (src) => ![".server", ".DS_Store"].includes(basename(src)),
});
console.log("  dist/docs written");
