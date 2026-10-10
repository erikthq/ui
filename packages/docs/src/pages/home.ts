import { html } from "hono/html";
import { HomeLayout, url } from "../layout";
import { ColorSwatches } from "../components/color-swatches";
import { FontPicker } from "../components/font-picker";
import { RadiusPicker } from "../components/radius-picker";
import { Showcase } from "../components/showcase";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";

const link = '<link rel="stylesheet" href="https://esm.sh/@erikt/ui" />';

function getMainCssSize() {
  const path = "core/dist/ui.css";

  try {
    const cssPath = resolve(import.meta.dirname, "../../..", path);
    const css = readFileSync(cssPath);
    const compressed = gzipSync(css);
    return (compressed.byteLength / 1024).toFixed(1);
  } catch {
    return null;
  }
}

export async function HomePage(path: string) {
  const cssSize = getMainCssSize();

  return HomeLayout({
    title: "One stylesheet. That's it",
    path,
    content: html`
      <div class="home-background"></div>

      <section class="home-hero prose">
        <hgroup class="flex-col-center gap-4">
          <h1 class="text-3xl md:text-5xl lg:text-6xl">
            A UI library for building your next design system in a single CSS
            file
          </h1>
          <p class="md:text-lg">
            Write semantic HTML and it just looks good. No JavaScript, no build
            step, and your own CSS always wins.
            ${cssSize ? html`<code>${cssSize} kB</code> gzipped.` : ""}
          </p>
        </hgroup>

        <div class="flex gap-4">
          <a href="${url("/getting-started/introduction")}" class="button">
            Get started
          </a>
          <copy-to-clipboard value="${link}">
            <button
              class="outlined home-copy-link"
              style="background-color: var(--ui-background-color)"
              data-tooltip="bottom"
            >
              Copy &lt;link&gt; tag
            </button>
          </copy-to-clipboard>

          <style>
            .home-copy-link[data-copied]::before,
            .home-copy-link[data-copied]::after {
              opacity: 1;
            }
          </style>

          <script>
            document.addEventListener("clipboard-copy", (e) => {
              const btn = e.target.querySelector(".home-copy-link");
              if (!btn) return;

              // The tooltip reads its text from aria-label, so it only exists after a copy
              btn.setAttribute("aria-label", "Copied");
              btn.setAttribute("data-copied", "");

              clearTimeout(btn.copiedTimer);
              btn.copiedTimer = setTimeout(() => {
                btn.removeAttribute("data-copied");
                // Wait for the fade out before the tooltip text goes away
                setTimeout(() => btn.removeAttribute("aria-label"), 100);
              }, 1500);
            });
          </script>
        </div>
      </section>

      <section>
        <div class="home-swatches">
          <div class="flex-center gap-6">
            <span class="flex-center gap-3">
              <strong>Font Family:</strong> ${FontPicker()}
            </span>

            <span class="flex-center gap-3">
              <strong>Radius:</strong> ${RadiusPicker()}
            </span>
          </div>
          ${ColorSwatches()}
        </div>

        ${Showcase()}
      </section>

      <footer class="home-footer prose">
        <p>
          Built by erikt. Code available on
          <a
            href="https://github.com/erikthq/ui"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>
      </footer>
    `,
  });
}
