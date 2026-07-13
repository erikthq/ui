import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const coreCssPath = fileURLToPath(new URL("../core/dist/ui.css", import.meta.url));
const coreElementsPath = fileURLToPath(new URL("../core/dist/elements.js", import.meta.url));
const miniSearchPath = fileURLToPath(new URL("./node_modules/minisearch/dist/es/index.js", import.meta.url));

export default defineConfig({
  publicDir: resolve(import.meta.dirname, "src/public"),
  define: {
    __TABLER_ICONS_DIR__: JSON.stringify(
      resolve(import.meta.dirname, "node_modules/@tabler/icons/icons"),
    ),
  },
  plugins: [
    {
      name: "serve-and-watch-core-css",
      configureServer(server) {
        server.watcher.add(coreCssPath);
        server.watcher.add(coreElementsPath);
        server.watcher.add(resolve(import.meta.dirname, "src/public/**/*.css"));
        server.middlewares.use("/ui.css", (_req, res) => {
          res.setHeader("Content-Type", "text/css");
          res.end(readFileSync(coreCssPath, "utf-8"));
        });
        server.middlewares.use("/ui.css.map", (_req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.end(readFileSync(coreCssPath + ".map", "utf-8"));
        });
        server.middlewares.use("/elements.js", (_req, res) => {
          res.setHeader("Content-Type", "application/javascript");
          res.end(readFileSync(coreElementsPath, "utf-8"));
        });
        server.middlewares.use("/minisearch.js", (_req, res) => {
          res.setHeader("Content-Type", "application/javascript");
          res.end(readFileSync(miniSearchPath, "utf-8"));
        });
      },
      handleHotUpdate({ file, server }) {
        const publicCssDir = resolve(import.meta.dirname, "src/public");
        if (
          file !== coreCssPath &&
          file !== coreElementsPath &&
          !file.startsWith(publicCssDir)
        )
          return;
        server.ws.send({ type: "full-reload" });
        return [];
      },
    },
    devServer({
      entry: "src/index.ts",
    }),
  ],
});
