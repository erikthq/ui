import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "checkbox", label: "Checkbox (multi-select)" },
  { id: "non-selectable", label: "Non-selectable" },
  { id: "disabled", label: "Disabled" },
];

export async function ColorSwatchPage(path: string) {
  return Layout({
    title: "Color Swatch",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Color Swatch</h1>
          <p>
            A circular color picker built on a native
            <code>&lt;input type="radio"&gt;</code> or
            <code>&lt;input type="checkbox"&gt;</code>. Color alone never
            conveys meaning to screen reader users, so every swatch needs an
            <code>aria-label</code> naming the color.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Set the color with the <code>--swatch-color</code> custom property
          on each <code>&lt;input&gt;</code>, nested inside a
          <code>&lt;fieldset role="group" class="color-swatch"&gt;</code>.
          Pass the color name via <code>aria-label</code> on each input since
          there's no visible text.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group" class="color-swatch">
            <input
              type="radio"
              name="swatch-demo"
              style="--swatch-color: var(--ui-color4-500)"
              aria-label="Blue"
            />
            <input
              type="radio"
              name="swatch-demo"
              style="--swatch-color: var(--ui-color1-500)"
              aria-label="Red"
              checked
            />
            <input
              type="radio"
              name="swatch-demo"
              style="--swatch-color: var(--ui-color2-500)"
              aria-label="Orange"
            />
            <input
              type="radio"
              name="swatch-demo"
              style="--swatch-color: var(--ui-color3-500)"
              aria-label="Green"
            />
            <input
              type="radio"
              name="swatch-demo"
              style="--swatch-color: var(--ui-color6-500)"
              aria-label="Purple"
            />
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group" class="color-swatch">
  <input
    type="radio"
    name="color"
    style="--swatch-color: royalblue"
    aria-label="Blue"
  />
  <input
    type="radio"
    name="color"
    style="--swatch-color: crimson"
    aria-label="Red"
    checked
  />
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="checkbox">Checkbox (multi-select)</h2>
        <p>
          Use <code>type="checkbox"</code> instead of <code>radio</code> to
          let multiple swatches be selected at once.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group" class="color-swatch">
            <input
              type="checkbox"
              style="--swatch-color: var(--ui-color4-500)"
              aria-label="Blue"
              checked
            />
            <input
              type="checkbox"
              style="--swatch-color: var(--ui-color3-500)"
              aria-label="Green"
              checked
            />
            <input
              type="checkbox"
              style="--swatch-color: var(--ui-color6-500)"
              aria-label="Purple"
            />
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group" class="color-swatch">
  <input
    type="checkbox"
    style="--swatch-color: royalblue"
    aria-label="Blue"
    checked
  />
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="non-selectable">Non-selectable</h2>
        <p>
          When a swatch is just showing a color, not selecting one, use a
          plain <code>&lt;span&gt;</code> instead of an input. It's marked
          <code>role="img"</code> with an <code>aria-label</code> so it still
          announces the color name, without implying it's interactive.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <span
            class="color-swatch"
            role="img"
            aria-label="Blue"
            style="--swatch-color: var(--ui-color4-500)"
          ></span>
          <span
            class="color-swatch"
            role="img"
            aria-label="Red"
            style="--swatch-color: var(--ui-color1-500)"
          ></span>
          <span
            class="color-swatch"
            role="img"
            aria-label="Orange"
            style="--swatch-color: var(--ui-color2-500)"
          ></span>
          <span
            class="color-swatch"
            role="img"
            aria-label="Green"
            style="--swatch-color: var(--ui-color3-500)"
          ></span>
          <span
            class="color-swatch"
            role="img"
            aria-label="Purple"
            style="--swatch-color: var(--ui-color6-500)"
          ></span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span
  class="color-swatch"
  role="img"
  aria-label="Blue"
  style="--swatch-color: royalblue"
></span>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group" class="color-swatch">
            <input
              type="radio"
              name="swatch-disabled"
              style="--swatch-color: var(--ui-color4-500)"
              aria-label="Blue"
              disabled
            />
            <input
              type="radio"
              name="swatch-disabled"
              style="--swatch-color: var(--ui-color1-500)"
              aria-label="Red"
              disabled
              checked
            />
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group" class="color-swatch" disabled>
  <input
    type="radio"
    name="color"
    style="--swatch-color: royalblue"
    aria-label="Blue"
  />
</fieldset>`),
          )}
        </div>
      </div>
    `,
  });
}
