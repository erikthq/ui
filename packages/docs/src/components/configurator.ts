import { html, raw } from "hono/html";
import { icon } from "../icon";
import { fonts } from "./font-picker";

// Based on the color swatches on the homepage. Light primaries are darkened to fit their
// data-lightness range. Harbor matches the library defaults
const presets = [
  { name: "Harbor", primaryLight: "#1e90ff", primaryDark: "#5aa8ff", neutralLight: "#93949d", neutralDark: "#8b8c93", radius: "1", font: "" },
  { name: "Lagoon", primaryLight: "#41c8a0", primaryDark: "#9fffdd", neutralLight: "#8a9590", neutralDark: "#858f8b", radius: "1.5", font: '"DM Sans", system-ui' },
  { name: "Meadow", primaryLight: "#6ac76b", primaryDark: "#a8f2a7", neutralLight: "#8d958c", neutralDark: "#888e88", radius: "2", font: "Rubik, system-ui" },
  { name: "Honey", primaryLight: "#d0a900", primaryDark: "#ffe064", neutralLight: "#959288", neutralDark: "#8e8c84", radius: "1.25", font: "Manrope, system-ui" },
  { name: "Ember", primaryLight: "#f09700", primaryDark: "#ffb85c", neutralLight: "#989188", neutralDark: "#918b84", radius: "0.5", font: '"Clarity City", system-ui' },
  { name: "Reef", primaryLight: "#ff7f50", primaryDark: "#ff9b76", neutralLight: "#9b8f8b", neutralDark: "#938a87", radius: "1.75", font: '"DM Sans", system-ui' },
  { name: "Blossom", primaryLight: "#de97a2", primaryDark: "#ffc5cd", neutralLight: "#9b8f90", neutralDark: "#93898a", radius: "2", font: "Rubik, system-ui" },
  { name: "Ink", primaryLight: "#111111", primaryDark: "#ffffff", neutralLight: "#919191", neutralDark: "#8b8b8b", radius: "0", font: '"Martian Mono", ui-monospace' },
];

// Edits the theme tokens on .components-showcase (it has data-ui-theme, so the scales follow)
export function Configurator() {
  return html`
    <style>
      .configurator {
        display: flex;
        flex-direction: column;
        gap: var(--ui-spacing-4);
        padding: var(--ui-spacing-2);

        fieldset {
          flex-direction: row;
        }

        .configurator-dot {
          width: 0.75em;
          aspect-ratio: 1;
          border-radius: var(--ui-rounded-full);
        }

        /* Looks like the docs code blocks, with a file name on top */
        .configurator-code {
          border: 1px solid var(--border);
          border-radius: var(--ui-rounded-4);
          background: var(--ui-neutral-100);
          overflow: hidden;

          > header {
            display: flex;
            align-items: center;
            gap: var(--ui-spacing-2);
            padding: var(--ui-spacing-2) var(--ui-spacing-3);
            border-bottom: 1px solid var(--border);
            background: var(--ui-neutral-50);
            color: var(--ui-neutral-500);
            font-size: var(--ui-text-xs);
          }

          pre {
            margin: 0;
            padding: var(--ui-spacing-3);
            overflow-x: auto;
          }

          code {
            font-family: ui-monospace, "Cascadia Code", "Fira Code", monospace;
            font-size: var(--ui-text-xs);
            line-height: 1.65;
            white-space: pre;
          }
        }
      }
    </style>

    <form class="configurator" oninput="updateConfig(this)" onreset="resetConfig(this)">
      <label class="field">
        <span>Preset</span>
        <select name="preset" oninput="applyPreset(this); event.stopPropagation()">
          <button>
            <selectedcontent></selectedcontent>
            ${raw(icon("chevron-down"))}
          </button>
          ${presets.map(
            (p) => html`
              <option value="${p.name}">
                <span class="configurator-dot" style="background: ${p.primaryLight}"></span>
                ${p.name}
              </option>
            `,
          )}
          <option value="" disabled>Custom</option>
        </select>
      </label>

      <fieldset>
        <legend>Primary color</legend>
        <label class="field">
          <span>Light</span>
          <input type="color" name="primaryLight" value="#1e90ff" data-lightness="0.0 0.75" />
        </label>
        <label class="field">
          <span>Dark</span>
          <input type="color" name="primaryDark" value="#5aa8ff" data-lightness="0.2 1.0" />
        </label>
      </fieldset>

      <fieldset>
        <legend>Neutral color</legend>
        <label class="field">
          <span>Light</span>
          <input type="color" name="neutralLight" value="#93949d" data-lightness="0.0 1.0" data-chroma="0.04" />
        </label>
        <label class="field">
          <span>Dark</span>
          <input type="color" name="neutralDark" value="#8b8c93" data-lightness="0.0 1.0" data-chroma="0.04" />
        </label>
      </fieldset>

      <label class="field">
        <span>Radius</span>
        <input type="range" name="radius" min="0" max="2" step="0.25" value="1" />
      </label>

      <label class="field">
        <span>Font</span>
        <select name="font">
          <button>
            <selectedcontent></selectedcontent>
            ${raw(icon("chevron-down"))}
          </button>
          ${fonts.map(
            (f) => html`
              <option value="${f.family}" style="font-family: ${f.family || "system-ui"}">
                ${f.name}
              </option>
            `,
          )}
        </select>
      </label>

      <div class="configurator-code">
        <header>${raw(icon("file-code"))} theme.css</header>
        <div id="configurator-output"></div>
      </div>

      <div class="grid gap-2">
        <copy-to-clipboard id="configurator-copy" value="">
          <button type="button">${raw(icon("copy"))} Copy CSS</button>
        </copy-to-clipboard>
        <button type="reset" class="ghost">Reset</button>
      </div>
    </form>

    <script>
      (() => {
        const defaults = {
          // The library's seeds. The primary dark seed is dodgerblue mixed with 20% white
          primaryLight: "#1e90ff",
          primaryDark: "#5aa8ff",
          neutralLight: "#93949d",
          neutralDark: "#8b8c93",
          radius: "1",
         
          font: "",
        };

        // Each control maps to the tokens it sets
        const tokens = {
          primaryLight: (v) => ({ "--ui-primary-light": v }),
          primaryDark: (v) => ({ "--ui-primary-dark": v }),
          neutralLight: (v) => ({ "--ui-neutral-light": v }),
          neutralDark: (v) => ({ "--ui-neutral-dark": v }),
          radius: (v) => ({ "--ui-rounded-scale": v }),
          font: (v) => ({ "font-family": v }),
        };

        // sRGB hex <-> OKLab, so the limits follow how light a color looks
        const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
        const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

        const hexToOklab = (hex) => {
          const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
          const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
          const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
          const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
          return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
          ];
        };

        const oklabToHex = ([L, a, b]) => {
          const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
          const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
          const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
          return (
            "#" +
            [
              4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
              -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
              -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
            ]
              .map((c) => Math.round(Math.min(1, Math.max(0, toGamma(c))) * 255))
              .map((c) => c.toString(16).padStart(2, "0"))
              .join("")
          );
        };

        // Keeps a color input inside its data-lightness range and under its data-chroma limit
        const clampColor = (input) => {
          const [min, max] = input.dataset.lightness.split(" ").map(Number);
          const maxChroma = Number(input.dataset.chroma ?? Infinity);
          const [L, a, b] = hexToOklab(input.value);
          const chroma = Math.hypot(a, b);
          const scale = chroma > maxChroma ? maxChroma / chroma : 1;
          const clamped = Math.min(max, Math.max(min, L));

          if (clamped === L && scale === 1) return;
          input.value = oklabToHex([clamped, a * scale, b * scale]);
        };

        const presets = ${raw(JSON.stringify(presets))};

        window.applyPreset = (select) => {
          const preset = presets.find((p) => p.name === select.value);
          for (const name of Object.keys(tokens)) select.form.elements[name].value = preset[name];
          updateConfig(select.form);
        };

        // Shows the preset that matches the current values, or Custom
        const syncPreset = (form) => {
          const match = presets.find((p) =>
            Object.keys(tokens).every((name) => form.elements[name].value === p[name]),
          );
          form.elements.preset.value = match?.name ?? "";
        };

        // Sets the changed tokens on the showcase and returns them as CSS lines
        const applyTheme = (values) => {
          const target = document.querySelector(".components-showcase");
          const lines = [];

          for (const [name, toProps] of Object.entries(tokens)) {
            const value = values[name];
            const changed = value !== defaults[name];

            for (const [prop, v] of Object.entries(toProps(value))) {
              if (changed) {
                target.style.setProperty(prop, v);
                lines.push("  " + prop + ": " + v + ";");
              } else {
                target.style.removeProperty(prop);
              }
            }
          }

          return lines;
        };

        // Hovering a preset option previews it on the showcase. Leaving it restores the form's values
        const setupPresetPreview = (form) => {
          const select = form.elements.preset;
          const restore = () => applyTheme(Object.fromEntries(new FormData(form)));

          select.addEventListener("mouseover", (event) => {
            const option = event.target.closest("option");
            const preset = presets.find((p) => p.name === option?.value);
            if (preset) applyTheme(preset);
          });

          select.addEventListener("mouseout", (event) => {
            if (event.target.closest("option")) restore();
          });

          // The picker can close without a mouseout, for example with Escape
          select.addEventListener("keydown", (event) => event.key === "Escape" && restore());
          select.addEventListener("blur", restore);
        };

        window.updateConfig = (form) => {
          form.querySelectorAll("input[data-lightness]").forEach(clampColor);
          syncPreset(form);

          const lines = applyTheme(Object.fromEntries(new FormData(form)));
          const css = lines.length ? ":root {\\n" + lines.join("\\n") + "\\n}" : "";
          document.getElementById("configurator-copy").setAttribute("value", css);
          renderOutput(css || "/* No changes yet */");
        };

        // Plain text until the highlighter module has loaded
        let render = (css) => {
          const output = document.getElementById("configurator-output");
          output.innerHTML = "<pre><code></code></pre>";
          output.querySelector("code").textContent = css;
        };
        let latest = "";
        const renderOutput = (css) => render((latest = css));

        window.setConfigRenderer = (fn) => {
          render = fn;
          render(latest);
        };

        // The reset event fires before the inputs change back
        window.resetConfig = (form) => setTimeout(() => updateConfig(form));

        document.addEventListener("DOMContentLoaded", () => {
          const form = document.querySelector(".configurator");
          setupPresetPreview(form);
          updateConfig(form);
        });
      })();
    </script>

    <script type="module">
      import { format } from "https://esm.sh/prettier@3.8.1/standalone";
      import * as postcss from "https://esm.sh/prettier@3.8.1/plugins/postcss";
      import { createHighlighterCore } from "https://esm.sh/shiki@4.0.2/core";
      import { createJavaScriptRegexEngine } from "https://esm.sh/shiki@4.0.2/engine/javascript";

      const highlighter = await createHighlighterCore({
        themes: [
          import("https://esm.sh/@shikijs/themes@4.0.2/github-light"),
          import("https://esm.sh/@shikijs/themes@4.0.2/github-dark"),
        ],
        langs: [import("https://esm.sh/@shikijs/langs@4.0.2/css")],
        engine: createJavaScriptRegexEngine(),
      });

      const output = document.getElementById("configurator-output");
      let run = 0;

      window.setConfigRenderer(async (css) => {
        // Formatting is async, so drop results that a newer input has replaced
        const id = ++run;
        const formatted = await format(css, { parser: "css", plugins: [postcss] });
        if (id !== run) return;

        output.innerHTML = highlighter.codeToHtml(formatted.trimEnd(), {
          lang: "css",
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        });
      });
    </script>
  `;
}
