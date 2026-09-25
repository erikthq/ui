import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-label", label: "With label" },
  { id: "variants", label: "Variants" },
];

export async function DateInputPage(path: string) {
  return Layout({
    title: "Date Input",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Date Input</h1>
          <p>
            Styled native date and time inputs. Supports
            <code>date</code>, <code>time</code>, <code>datetime-local</code>,
            <code>month</code>, and <code>week</code> types.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <input type="date" />
        </div>
        <div class="code-block">
          ${raw(await highlight(`<input type="date" />`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-label">With label</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="field">
            <span>Date of birth</span>
            <input type="date" />
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Date of birth</span>
  <input type="date" />
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="variants">Variants</h2>
        <p>All date-related input types share the same styling.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <input type="time" />
          <input type="datetime-local" />
          <input type="month" />
          <input type="week" />
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<input type="time" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />`),
          )}
        </div>
      </div>
    `,
  });
}
