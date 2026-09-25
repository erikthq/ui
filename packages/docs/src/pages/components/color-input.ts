import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-label", label: "With label" },
];

export async function ColorInputPage(path: string) {
  return Layout({
    title: "Color Input",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Color Input</h1>
          <p>
            A styled native <code>&lt;input type="color"&gt;</code> for picking
            colors.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <input type="color" value="#6366f1" />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="color" value="#6366f1" />`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-label">With label</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="field">
            <span>Brand color</span>
            <input type="color" value="#6366f1" />
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Brand color</span>
  <input type="color" value="#6366f1" />
</label>`),
          )}
        </div>
      </div>
    `,
  });
}
