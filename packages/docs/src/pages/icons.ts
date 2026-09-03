import { html } from "hono/html";
import { Layout } from "../layout";
import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { join, basename, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tablerDir = join(__dirname, "../../node_modules/@tabler/icons/icons");

function loadIcons(
  style: "outline" | "filled",
): { name: string; paths: string }[] {
  const dir = join(tablerDir, style);
  const files = readdirSync(dir).filter((f) => f.endsWith(".svg"));
  return files.map((file) => {
    const name = basename(file, ".svg");
    const svg = readFileSync(join(dir, file), "utf-8");
    const inner = svg
      .replace(/<svg[^>]*>/s, "")
      .replace("</svg>", "")
      .replace(/<path stroke="none"[^/]*\/>/g, "")
      .trim();
    return { name, paths: inner };
  });
}

function buildData(style: "outline" | "filled"): string {
  const data: Record<string, string> = {};
  for (const { name, paths } of loadIcons(style)) {
    data[name] = paths;
  }
  return JSON.stringify(data);
}

export function IconsData(): string {
  return buildData("outline");
}
export function IconsFilledData(): string {
  return buildData("filled");
}

export function IconsPage(path: string) {
  const outlineTotal = readdirSync(join(tablerDir, "outline")).filter((f) =>
    f.endsWith(".svg"),
  ).length;

  return Layout({
    title: "Icons",
    path,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Icons</h1>
          <p>
            @erikt/ui doesn't ship icons. The examples below use
            <a href="https://tabler.io/icons" target="_blank" rel="noopener"
              >Tabler Icons</a
            >, ${outlineTotal} free SVG icons drawn on the same stroke
            grid.
          </p>
        </hgroup>
        <p>
          Inline SVGs suit @erikt/ui well. They inherit
          <code>currentColor</code> and scale with <code>font-size</code>, so an
          icon in a button matches the label without extra rules. Click any icon
          to copy its SVG.
        </p>
        <p>
          The icon search sits in the header on every page, so you can grab one
          without leaving the page you're reading.
        </p>
      </div>
      <button onclick="document.getElementById('icons-dialog').showModal()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search icons
      </button>
    `,
  });
}
