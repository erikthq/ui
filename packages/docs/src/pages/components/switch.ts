import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { apiReference } from "../../components/api-reference";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "checked", label: "Checked" },
  { id: "with-label", label: "With label" },
  { id: "disabled", label: "Disabled" },
  { id: "api-reference", label: "API reference" },
];

export async function SwitchPage(path: string) {
  return Layout({
    title: "Switch",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Switch</h1>
            ${raw(titleActions(path, "switch"))}
          </div>
          <p>
            A toggle switch using
            <code>&lt;input type="checkbox" class="switch"&gt;</code>.
          </p>
        </hgroup>

        <h3>Composed of</h3>
        <dl class="composition">
          <dt><a href="${url("/components/checkbox")}"><code>Checkbox</code></a></dt>
          <dd>The native checkbox it restyles</dd>
        </dl>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("switch"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <input type="checkbox" class="switch" />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="checkbox" class="switch" />`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="checked">Checked</h2>
      </div>
      <div class="example">
        <div class="preview">
          <input type="checkbox" class="switch" checked />
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<input type="checkbox" class="switch" checked />`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-label">With label</h2>
      </div>
      <div class="example">
        <div
          class="preview"
          style="flex-direction:column;align-items:flex-start;gap:0.5rem"
        >
          <label
            style="display:flex;align-items:center;gap:0.5rem;cursor:pointer"
          >
            <input type="checkbox" class="switch" checked />
            Notifications
          </label>
          <label
            style="display:flex;align-items:center;gap:0.5rem;cursor:pointer"
          >
            <input type="checkbox" class="switch" />
            Dark mode
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <input type="checkbox" class="switch" checked />
  Notifications
</label>
<label>
  <input type="checkbox" class="switch" />
  Dark mode
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.75rem">
          <input type="checkbox" class="switch" disabled />
          <input type="checkbox" class="switch" disabled checked />
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<input type="checkbox" class="switch" disabled />
<input type="checkbox" class="switch" disabled checked />`),
          )}
        </div>
      </div>

      ${apiReference([
        { type: "Disabled", values: ["[disabled]"], description: "Fades the switch and blocks input" },
      ])}
    `,
  });
}
