import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "primary-scale", label: "Primary scale" },
  { id: "neutral-scale", label: "Neutral scale" },
  { id: "constructive-scale", label: "Constructive scale" },
  { id: "destructive-scale", label: "Destructive scale" },
  { id: "color-scales", label: "Color scales" },
  { id: "customizing", label: "Customizing" },
  { id: "dark-mode", label: "Dark mode" },
];

const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function colorScale(name: string) {
  return html`
    <div class="color-scale">
      ${steps.map(
        (step) => html`
          <div class="preview-color-swatch">
            <div
              class="color-swatch-block"
              style="background: var(--ui-${name}-${step})"
            ></div>
            <span>${step}</span>
          </div>
        `,
      )}
    </div>
  `;
}

export async function ThemesPage(path: string) {
  return Layout({
    title: "Themes",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Themes</h1>
          <p>
            Theming is all CSS custom properties. Override the seed colors and
            every scale below is regenerated from them.
          </p>
        </hgroup>

        <h2 id="primary-scale">Primary scale</h2>
        <p>
          Buttons, focus rings, anything interactive. The whole scale comes
          from <code>--ui-primary</code>, which takes a
          <code>light-dark()</code> value if you want a different tone per
          theme.
        </p>
      </div>
      ${colorScale("primary")}

      <div class="prose">
        <h2 id="neutral-scale">Neutral scale</h2>
        <p>
          Text, borders, and backgrounds. Override <code>--ui-neutral</code> to
          shift them warmer or cooler.
        </p>
      </div>
      ${colorScale("neutral")}

      <div class="prose">
        <h2 id="constructive-scale">Constructive scale</h2>
        <p>
          Success and confirmation states. Override
          <code>--ui-constructive</code>.
        </p>
      </div>
      ${colorScale("constructive")}

      <div class="prose">
        <h2 id="destructive-scale">Destructive scale</h2>
        <p>
          Errors and destructive actions. Override
          <code>--ui-destructive</code>.
        </p>
      </div>
      ${colorScale("destructive")}

      <div class="prose">
        <h2 id="color-scales">Color scales</h2>
        <p>
          Six accents for whatever else needs a color. Override
          <code>--ui-color1</code> through <code>--ui-color6</code>.
        </p>
      </div>
      ${[1, 2, 3, 4, 5, 6].map((n) => colorScale(`color${n}`))}

      <div class="prose">
        <h2 id="customizing">Customizing</h2>
        <p>
          Override seed colors on <code>:root</code> after importing the
          stylesheet. Use <code>light-dark()</code> on
          <code>--ui-primary</code> for per-theme control:
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `:root {
  /* Same primary for both themes */
  --ui-primary: #6366f1;

  /* Or tune per-theme with light-dark() */
  --ui-primary: light-dark(#4f46e5, #818cf8);

  --ui-neutral: #6b7280;
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="dark-mode">Dark mode</h2>
        <p>
          @erikt/ui follows <code>prefers-color-scheme: dark</code> on its own.
          To pin a mode, set <code>color-scheme</code> on any element:
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `<html style="color-scheme: light">...</html>
<html style="color-scheme: dark">...</html>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}
