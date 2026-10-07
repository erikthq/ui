import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "column", label: "Column" },
  { id: "grid", label: "Grid" },
  { id: "classes", label: "Classes" },
];

export async function FlowPage(path: string) {
  return Layout({
    title: "Flow",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Flow</h1>
          <p>
            A few helper classes to put elements in a row, a column or a grid.
            Add <code>.gap-1</code> to <code>.gap-8</code> to space them out.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p><code>.flex</code> puts the children in a row.</p>
      </div>
      <div class="example">
        <div class="preview">
          <div class="flex gap-2">
            <button>Cancel</button>
            <button class="primary">Save</button>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="flex gap-2">
  <button>Cancel</button>
  <button class="primary">Save</button>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="column">Column</h2>
        <p><code>.flex-col</code> puts the children in a column.</p>
      </div>
      <div class="example">
        <div class="preview">
          <div class="flex-col gap-4">
            <label class="field">
              <span>Name</span>
              <input type="text" />
            </label>
            <label class="field">
              <span>Email</span>
              <input type="email" />
            </label>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="flex-col gap-4">
  <label class="field">
    <span>Name</span>
    <input type="text" />
  </label>
  <label class="field">
    <span>Email</span>
    <input type="email" />
  </label>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="grid">Grid</h2>
        <p>
          <code>.grid</code> sets <code>display: grid</code>. Set the columns
          with your own CSS.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div class="grid gap-2" style="grid-template-columns: repeat(3, 1fr)">
            <span class="badge">One</span>
            <span class="badge">Two</span>
            <span class="badge">Three</span>
            <span class="badge">Four</span>
            <span class="badge">Five</span>
            <span class="badge">Six</span>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="grid gap-2" style="grid-template-columns: repeat(3, 1fr)">
  <span class="badge">One</span>
  <span class="badge">Two</span>
  <span class="badge">Three</span>
  <span class="badge">Four</span>
  <span class="badge">Five</span>
  <span class="badge">Six</span>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="classes">Classes</h2>
        <table class="align-left">
          <thead>
            <tr>
              <th>Class</th>
              <th>CSS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>.flex</code></td>
              <td><code>display: flex</code></td>
            </tr>
            <tr>
              <td><code>.flex-col</code></td>
              <td><code>display: flex; flex-direction: column</code></td>
            </tr>
            <tr>
              <td><code>.grid</code></td>
              <td><code>display: grid</code></td>
            </tr>
            <tr>
              <td><code>.gap-1</code> to <code>.gap-8</code></td>
              <td>
                <code>gap: var(--ui-spacing-1)</code> to
                <code>gap: var(--ui-spacing-8)</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  });
}
