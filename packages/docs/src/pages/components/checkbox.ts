import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "checked", label: "Checked" },
  { id: "with-label", label: "With label" },
  { id: "disabled", label: "Disabled" },
  { id: "indeterminate", label: "Indeterminate" },
];

export async function CheckboxPage(path: string) {
  return Layout({
    title: "Checkbox",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Checkbox</h1>
            ${raw(titleActions(path, "checkbox"))}
          </div>
          <p>
            A native <code>&lt;input type="checkbox"&gt;</code> for toggling
            options.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("checkbox"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <input type="checkbox" />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="checkbox" />`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="checked">Checked</h2>
      </div>
      <div class="example">
        <div class="preview">
          <input type="checkbox" checked />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="checkbox" checked />`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-label">With label</h2>
        <p>Wrap in a <code>&lt;label&gt;</code> to make the text clickable.</p>
      </div>
      <div class="example">
        <div class="preview" style="flex-direction:column;align-items:flex-start;gap:0.5rem">
          <label>
            <input type="checkbox" checked />
            Accept terms and conditions
          </label>
          <label>
            <input type="checkbox" />
            Subscribe to newsletter
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <input type="checkbox" checked />
  Accept terms and conditions
</label>
<label>
  <input type="checkbox" />
  Subscribe to newsletter
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
      <div class="example">
        <div class="preview" style="flex-direction:column;align-items:flex-start;gap:0.5rem">
          <label>
            <input type="checkbox" disabled />
            Disabled
          </label>
          <label>
            <input type="checkbox" disabled checked />
            Disabled checked
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <input type="checkbox" disabled />
  Disabled
</label>
<label>
  <input type="checkbox" disabled checked />
  Disabled checked
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="indeterminate">Indeterminate</h2>
        <p>
          A third state shown when only some child options are selected. Must be
          set via JavaScript: <code>checkbox.indeterminate = true</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <label>
            <input type="checkbox" id="cb-indeterminate" />
            Select all
          </label>
          <script>document.getElementById('cb-indeterminate').indeterminate = true</script>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<label>
  <input type="checkbox" id="select-all" />
  Select all
</label>

<script>
  document.getElementById('select-all').indeterminate = true
</script>`))}
        </div>
      </div>
    `,
  });
}
