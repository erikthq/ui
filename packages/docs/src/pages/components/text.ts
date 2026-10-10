import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { apiReference } from "../../components/api-reference";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "scale", label: "Scale" },
  { id: "responsive", label: "Responsive" },
  { id: "customization", label: "Customization" },
  { id: "api-reference", label: "API reference" },
];

const sizes = [
  ["xs", "0.75rem"],
  ["sm", "0.875rem"],
  ["base", "1rem"],
  ["lg", "1.125rem"],
  ["xl", "1.25rem"],
  ["2xl", "1.5rem"],
  ["3xl", "1.875rem"],
  ["4xl", "2.25rem"],
  ["5xl", "3rem"],
  ["6xl", "3.75rem"],
  ["7xl", "4.5rem"],
  ["8xl", "6rem"],
  ["9xl", "8rem"],
];

export async function TextPage(path: string) {
  return Layout({
    title: "Text",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Text</h1>
            ${raw(titleActions(path, "text"))}
          </div>
          <p>
            Helper classes that set the font size and line height of any
            element. Pick a size from <code>.text-xs</code> to
            <code>.text-9xl</code>.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("text"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <p class="text-2xl">The quick brown fox jumps over the lazy dog.</p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<p class="text-2xl">The quick brown fox jumps over the lazy dog.</p>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="scale">Scale</h2>
        <p>
          Line height gets tighter as the text gets bigger, so large headings
          stay compact.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          ${sizes.map(
            ([size]) => html`<p class="text-${size}">text-${size}</p>`,
          )}
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              sizes
                .map(([size]) => `<p class="text-${size}">text-${size}</p>`)
                .join("\n"),
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="responsive">Responsive</h2>
        <p>
          Sizes are mobile first. A plain <code>.text-*</code> class always
          applies. Add <code>md:text-*</code> to change the size from 600px
          and up, and <code>lg:text-*</code> from 1200px and up.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <p class="text-xl md:text-3xl lg:text-5xl">Resize the window.</p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<p class="text-xl md:text-3xl lg:text-5xl">Resize the window.</p>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="customization">Customization</h2>
        <p>
          Each size reads from a custom property. Override it to change the
          scale.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `:root {
${sizes.map(([size, value]) => `  --ui-text-${size}: ${value};`).join("\n")}
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      ${apiReference([
        { type: "Size", values: [".text-xs", ".text-sm", ".text-base", ".text-lg", ".text-xl", ".text-2xl", ".text-3xl", ".text-4xl", ".text-5xl", ".text-6xl", ".text-7xl", ".text-8xl", ".text-9xl"], description: "Sets font size and line height" },
        { type: "Size from 600px", values: sizes.map(([size]) => `.md:text-${size}`), description: "Sets font size and line height when the viewport is 600px or wider" },
        { type: "Size from 1200px", values: sizes.map(([size]) => `.lg:text-${size}`), description: "Sets font size and line height when the viewport is 1200px or wider" },
      ])}
    `,
  });
}
