import { html, raw } from "hono/html";
import { HomeLayout, url } from "../layout";
import { ColorSwatches } from "../components/color-swatches";
import { highlight } from "../highlight";
import { icon } from "../icon";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";
import homeShowcase from "../components/home-showcase";

const cdnUrl = `https://esm.sh/@erikt/ui`;

function getMainCssSize() {
  try {
    const cssPath = resolve(import.meta.dirname, "../../../../ui.css");
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
        <hgroup>
          <h1>One stylesheet.<br />That's it.</h1>
          <p>
            Modern CSS has closed most of the gap that large UI libraries were
            built to fill. erikt/ui covers the rest.
            ${cssSize ? html`<code>${cssSize} kB</code> gzipped.` : ""}
          </p>
        </hgroup>
        <div>
          <a href="${url("/getting-started/introduction")}" class="button">
            Get started
          </a>
          <a
            href="${url("/components/button")}"
            class="button outlined"
            style="background-color: var(--ui-background-color)"
          >
            Components
          </a>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<link rel="stylesheet" href="${cdnUrl}" />`))}
        </div>
      </section>

      <hr style="margin: 0 0 -1px 0" />

      <section class="home-theme-section tabs">
        <div class="header">
          <header role="tablist" aria-label="Components">
            <label>
              <input
                type="radio"
                name="tabs"
                id="tab-1"
                checked
                aria-controls="panel-1"
              />
              Components
            </label>
            <label>
              <input
                type="radio"
                name="tabs"
                id="tab-2"
                aria-controls="panel-2"
              />
              Themes
            </label>
          </header>

          ${ColorSwatches()}
        </div>

        <div class="tabpanels">
          <div
            role="tabpanel"
            id="panel-1"
            aria-labelledby="tab-1"
            tabindex="0"
          >
            ${homeShowcase()}
          </div>
          <div
            role="tabpanel"
            id="panel-2"
            aria-labelledby="tab-2"
            tabindex="0"
          >
            <div class="home-themes-showcase">
              <ul>
                ${[
                  "primary",
                  "neutral",
                  "constructive",
                  "destructive",
                  "color1",
                  "color2",
                  "color3",
                  "color4",
                  "color5",
                  "color6",
                ].map(
                  (name) => html`
                    <li>
                      <ul>
                        ${[
                          50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
                        ].map(
                          (step) => html`
                            <li
                              class="home-themes-swatch"
                              style="background:var(--ui-${name}-${step})"
                              title="${name}-${step}"
                            ></li>
                          `,
                        )}
                      </ul>
                    </li>
                  `,
                )}
              </ul>

              <div class="home-themes-modes">
                <div class="home-themes-mode" style="color-scheme:light">
                  <article>
                    <header>Light mode</header>
                    <div>
                      <p>
                        erikt/ui responds to
                        <code>prefers-color-scheme</code> automatically.
                      </p>
                    </div>
                    <footer>
                      <button class="ghost">Cancel</button>
                      <button>Save</button>
                    </footer>
                  </article>
                </div>
                <div class="home-themes-mode" style="color-scheme:dark">
                  <article>
                    <header>Dark mode</header>
                    <div>
                      <p>
                        Force a mode with
                        <code>style="color-scheme: dark"</code>.
                      </p>
                    </div>
                    <footer>
                      <button class="ghost">Cancel</button>
                      <button>Save</button>
                    </footer>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style="margin: -1px 0 0 0" />

      <section class="home-code">
        <div class="code-block">
          ${raw(
            await highlight(
              `<button>Save changes</button>\n` +
                `<button class="outlined">Cancel</button>\n` +
                `<button class="ghost">Reset</button>\n` +
                `\n` +
                `<label>\n` +
                `  <svg data-prefix><!-- icon --></svg>\n` +
                `  <input type="search" placeholder="Search..." />\n` +
                `</label>\n` +
                `\n` +
                `<fieldset role="group">\n` +
                `  <button class="ghost">Week</button>\n` +
                `  <button class="ghost">Month</button>\n` +
                `  <button class="ghost">Year</button>\n` +
                `</fieldset>\n` +
                `\n` +
                `<article>\n` +
                `  <header>Card title</header>\n` +
                `  <p>Some content inside a card.</p>\n` +
                `  <footer>\n` +
                `    <button class="ghost">Cancel</button>\n` +
                `    <button>Save</button>\n` +
                `  </footer>\n` +
                `</article>`,
            ),
          )}
        </div>
      </section>

      <hr style="margin: -1px 0 0 0" />

      <section class="home-features">
        <div class="home-feature-card prose">
          <p><small>Reset + UI in one import</small></p>
          <h2>Batteries included</h2>
          <p>
            @erikt/ui normalizes browser defaults and builds on top of them. You
            get a consistent baseline and a full component library from a single
            stylesheet.
          </p>
        </div>

        <div class="home-feature-card prose">
          <p><small>No class soup</small></p>
          <h2>Just write HTML</h2>
          <p>
            Components map to native elements. A
            <code>&lt;button&gt;</code> is a button, a
            <code>&lt;dialog&gt;</code> is a dialog — no wrappers or utility
            classes needed.
          </p>
        </div>

        <div class="home-feature-card prose">
          <p><small>Works out of the box</small></p>
          <h2>Dark mode included</h2>
          <p>
            Responds to <code>prefers-color-scheme</code> automatically. Force a
            mode on any element with<br />
            <code>style="color-scheme: light"</code> or
            <code>style="color-scheme: dark"</code>.
          </p>
        </div>
      </section>

      <hr style="margin: -1px 0 0 0" />

      <footer class="home-footer">
        <div class="home-footer-inner">
          <span>@erikt/ui</span>
          <span>MIT License</span>
          <a href="https://github.com/erikthq/ui" target="_blank" rel="noopener"
            >GitHub</a
          >
        </div>
      </footer>
    `,
  });
}
