import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

export async function SeparatorPage(path: string) {
  return Layout({
    title: "Separator",
    path,
    toc: [
      { id: "default", label: "Default" },
      { id: "with-label", label: "With label" },
    ],
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Separator</h1>
          <p>
            A horizontal divider using the native <code>&lt;hr&gt;</code> element.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          style="flex-direction:column;gap:1rem;width:100%"
        >
          <p>Above the separator</p>
          <hr />
          <p>Below the separator</p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<p>Above the separator</p>
<hr />
<p>Below the separator</p>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-label">With label</h2>
        <p>
          Add a <code>data-label</code> attribute to show text centered over the
          line.
        </p>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          style="flex-direction:column;gap:1rem;width:100%"
        >
          <hr data-label="Appearance Settings" style="--bg-color: var(--ui-neutral-0)" />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<hr data-label="Appearance Settings" style="--bg-color: var(--ui-neutral-0)" />`))}
        </div>
      </div>
    `,
  });
}
