#!/usr/bin/env node
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const docsDir = fileURLToPath(new URL("../dist/docs", import.meta.url));
const port = Number(process.env.PORT) || 3456;
const { version } = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const ansi = (open, close) => (text) => (useColor ? `\x1b[${open}m${text}\x1b[${close}m` : text);
const bold = ansi(1, 22);
const dim = ansi(2, 22);
const blue = ansi(34, 39);
const cyan = ansi(36, 39);
const green = ansi(32, 39);
const red = ansi(31, 39);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
};

const usage = `Usage: npx @erikt/ui <command>

Commands:
  docs    Serve the erikt/ui docs on http://localhost:${port}`;

async function resolveFile(urlPath) {
  const path = normalize(join(docsDir, decodeURIComponent(urlPath)));
  if (path !== docsDir && !path.startsWith(docsDir + sep)) return null;
  for (const candidate of [path, join(path, "index.html")]) {
    const info = await stat(candidate).catch(() => null);
    if (info?.isFile()) return candidate;
  }
  return null;
}

function serveDocs() {
  const server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, "http://localhost");
    const file = await resolveFile(pathname).catch(() => null);
    if (!file) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });

  server.on("error", (err) => {
    console.error(red(err.code === "EADDRINUSE" ? `Port ${port} is already in use. Try PORT=${port + 1} npx @erikt/ui docs` : err.message));
    process.exit(1);
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}/`;
    console.log(`
  ${bold(blue("erikt/ui"))} ${dim("docs")} ${dim(`v${version}`)}

  ${green("➜")}  ${bold("Local:")}  ${cyan(url)}
  ${dim("➜")}  ${dim("Press Ctrl+C to stop")}
`);
  });

  // Exit cleanly on Ctrl+C, so package runners like pnpm don't report the stop as a failure
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => {
      server.closeAllConnections();
      server.close(() => process.exit(0));
    });
  }
}

const [command] = process.argv.slice(2);

if (command === "docs") {
  const info = await stat(docsDir).catch(() => null);
  if (!info?.isDirectory()) {
    console.error(red("Docs not found. Build them with `pnpm build` from the repo root."));
    process.exit(1);
  }
  serveDocs();
} else {
  console.log(usage);
  process.exit(command && command !== "--help" && command !== "-h" ? 1 : 0);
}
