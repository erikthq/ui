import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "filled", label: "Filled" },
  { id: "step", label: "Step" },
  { id: "disabled", label: "Disabled" },
];

export async function SliderPage(path: string) {
  return Layout({
    title: "Slider",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Slider</h1>
          <p>
            A range input using <code>&lt;input type="range"&gt;</code>.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <input type="range" style="width:100%;" />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="range" />`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="filled">Filled</h2>
        <p>
          Set <code>--pct</code> on the element to show a filled track. Update it
          on <code>input</code> events to keep it in sync with the value.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <input
            type="range"
            id="slider-filled"
            style="width:100%;--pct:0.5"
            oninput="this.style.setProperty('--pct', (this.value - this.min) / (this.max - this.min || 100))"
          />
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<input type="range" style="--pct: 0.5"
  oninput="this.style.setProperty(
    '--pct',
    (this.value-this.min)/(this.max-this.min)
  )"
/>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="step">Step</h2>
        <p>Use <code>step</code> to snap the thumb to discrete intervals.</p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <input
            type="range"
            step="25"
            style="width:100%;--pct:0.5"
            oninput="this.style.setProperty('--pct', (this.value - this.min) / (this.max - this.min || 100))"
          />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="range" step="25" />`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <input type="range" style="width:100%;--pct:0" disabled />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="range" disabled />`))}
        </div>
      </div>
    `,
  });
}
