import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { apiReference } from "../../components/api-reference";

export async function SeparatorPage(path: string) {
  return Layout({
    title: "Separator",
    path,
    toc: [
      { id: "standalone", label: "Standalone" },
      { id: "default", label: "Default" },
      { id: "with-label", label: "With label" },
      { id: "api-reference", label: "API reference" },
    ],
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Separator</h1>
            ${raw(titleActions(path, "separator"))}
          </div>
          <p>
            A horizontal divider using the native <code>&lt;hr&gt;</code> element.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("separator"))}
        </div>
      </div>

      <div class="prose">
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

      ${apiReference([
        { type: "Label", values: ['[data-label="Text"]'], description: "Shows the text centered on the line" },
        { type: "Label background", values: ["--bg-color: var(--ui-neutral-0)"], description: "Background behind the label, to match the surface" },
      ])}
    `,
  });
}
