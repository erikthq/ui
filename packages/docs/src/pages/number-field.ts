import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "suffix", label: "With suffix" },
  { id: "constraints", label: "Constraints" },
  { id: "in-field", label: "In a Field" },
];

export async function NumberFieldPage(path: string) {
  return Layout({
    title: "Number Field",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Number Field</h1>
          <p class="lead">
            Styled native number input. No classes needed.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <input type="number" pattern="[0-9]*" placeholder="0" style="width:100%" />
        </div>
        <div class="code-block">
          ${raw(await highlight('<input type="number" pattern="[0-9]*" placeholder="0" />'))}
        </div>
      </div>

      <div class="prose">
        <h2 id="suffix">With suffix</h2>
        <p>
          Wrap the input and a suffix in a <code>&lt;label&gt;</code> and add
          <code>data-suffix</code> to the adornment. Works with text, icons, or
          buttons.
        </p>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          style="display:flex;flex-direction:column;gap:1rem"
        >
          <label style="width:100%">
            ${raw(icon("currency-dollar", { attrs: "data-prefix" }))}
            <input type="number" pattern="[0-9]*" placeholder="0.00" />
            <small data-suffix>USD</small>
          </label>
          <label style="width:100%">
            <input type="number" pattern="[0-9]*" placeholder="0" />
            <small data-suffix>kg</small>
          </label>
          <label style="width:100%">
            <input type="number" pattern="[0-9]*" placeholder="0" />
            <small data-suffix>%</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <svg data-prefix>...</svg>
  <input type="number" pattern="[0-9]*" placeholder="0.00" />
  <small data-suffix>USD</small>
</label>

<label>
  <input type="number" pattern="[0-9]*" placeholder="0" />
  <small data-suffix>kg</small>
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="constraints">Constraints</h2>
        <p>
          Use the native <code>min</code>, <code>max</code>, and
          <code>step</code> attributes to constrain the value.
        </p>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          style="display:flex;flex-direction:column;gap:1rem"
        >
          <label style="width:100%">
            <input type="number" pattern="[0-9]*" min="0" max="100" step="1" placeholder="0-100" />
            <small data-suffix>%</small>
          </label>
          <label style="width:100%">
            <input type="number" pattern="[0-9]*" min="0" step="0.01" placeholder="0.00" />
            <small data-suffix>EUR</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<!-- integer 0-100 -->
<label>
  <input type="number" pattern="[0-9]*" min="0" max="100" step="1" placeholder="0-100" />
  <small data-suffix>%</small>
</label>

<!-- decimal with cent precision -->
<label>
  <input type="number" pattern="[0-9]*" min="0" step="0.01" placeholder="0.00" />
  <small data-suffix>EUR</small>
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="in-field">In a Field</h2>
        <p>
          Use <code>div.field</code> as the outer wrapper (instead of
          <code>label.field</code>) when the inner <code>&lt;label&gt;</code>
          handles adornments, to avoid nesting labels.
        </p>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          style="display:flex;flex-direction:column;gap:1rem"
        >
          <div class="field" style="width:100%">
            <span>Price</span>
            <label style="width:100%">
              ${raw(icon("currency-dollar", { attrs: "data-prefix" }))}
              <input type="number" pattern="[0-9]*" placeholder="0.00" min="0" step="0.01" />
              <small data-suffix>USD</small>
            </label>
            <small>Enter the total amount including tax.</small>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="field">
  <span>Price</span>
  <label style="width:100%">
    <svg data-prefix>...</svg>
    <input type="number" pattern="[0-9]*" placeholder="0.00" min="0" step="0.01" />
    <small data-suffix>USD</small>
  </label>
  <small>Enter the total amount including tax.</small>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
