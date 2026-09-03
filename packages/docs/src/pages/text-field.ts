import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "text", label: "Text" },
  { id: "with-icon", label: "With icon" },
  { id: "loading", label: "Loading" },
];

export async function TextFieldPage(path: string) {
  return Layout({
    title: "Text Field",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Text Field</h1>
          <p class="lead">Styled native form inputs. No classes needed.</p>
        </hgroup>

        <h2 id="text">Text</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <input type="text" placeholder="First name" style="width:100%" />
        </div>
        <div class="code-block">
          ${raw(
            await highlight('<input type="text" placeholder="First name" />'),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-icon">With icon</h2>
        <p>
          Wrap an input and adornments in a <code>&lt;label&gt;</code>. Add
          <code>data-prefix</code> for leading adornments and
          <code>data-suffix</code> for trailing ones.
        </p>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          style="display:flex;flex-direction:column;gap:1rem"
        >
          <label style="width:100%">
            ${raw(icon("search", { attrs: "data-prefix" }))}
            <input type="search" placeholder="Search..." />
          </label>
          <label style="width:100%">
            ${raw(icon("mail", { attrs: "data-prefix" }))}
            <input type="email" placeholder="Enter your email" />
          </label>
          <label style="width:100%">
            ${raw(icon("credit-card", { attrs: "data-prefix" }))}
            <input type="text" placeholder="Card number" />
            ${raw(icon("check", { attrs: "data-suffix" }))}
          </label>
          <label style="width:100%">
            <input type="text" placeholder="Card number" />
            ${raw(icon("star", { attrs: "data-suffix" }))}
            ${raw(icon("info-circle", { attrs: "data-suffix" }))}
          </label>
          <label style="width:100%">
            <input type="text" placeholder="Search..." />
            <kbd data-suffix>⌘K</kbd>
          </label>
          <label style="width:100%">
            <input type="number" placeholder="0.00" />
            <small data-suffix>USD</small>
          </label>
          <label style="width:100%">
            <input type="text" placeholder="Enter invite code" />
            <button data-suffix class="secondary">Apply</button>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<!-- leading icon -->
<label>
  <svg data-prefix>...</svg>
  <input type="search" placeholder="Search..." />
</label>

<!-- leading + trailing -->
<label>
  <svg data-prefix>...</svg>
  <input type="text" placeholder="Card number" />
  <svg data-suffix>...</svg>
</label>

<!-- multiple trailing -->
<label>
  <input type="text" placeholder="Card number" />
  <svg data-suffix>...</svg>
  <svg data-suffix>...</svg>
</label>

<!-- kbd shortcut hint -->
<label>
  <input type="text" placeholder="Search..." />
  <kbd data-suffix>⌘K</kbd>
</label>

<!-- text suffix -->
<label>
  <input type="number" placeholder="0.00" />
  <small data-suffix>USD</small>
</label>

<!-- button suffix -->
<label>
  <input type="text" placeholder="Enter invite code" />
  <button data-suffix>Apply</button>
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="loading">Loading</h2>
        <p>
          Add <code>aria-busy</code> to the input to show a spinner. It
          works with or without adornments.
        </p>
      </div>
      <p class="callout">
        The input has to be wrapped in a <code>&lt;label&gt;</code>. The spinner
        is drawn on the label's <code>::before</code>.
      </p>
      <div class="example">
        <div
          class="preview preview-padded"
          style="display:flex;flex-direction:column;gap:1rem"
        >
          <label style="width:100%">
            <input style="width:100%" id="tf-loading-1" type="text" placeholder="Loading..." aria-busy />
          </label>
          <label style="width:100%">
            ${raw(icon("search", { attrs: "data-prefix" }))}
            <input style="width:100%" id="tf-loading-2" type="search" placeholder="Searching..." aria-busy />
          </label>
          <label style="display:flex;align-items:center;gap:0.5rem">
            <input
              type="checkbox"
              checked
              onchange="['tf-loading-1','tf-loading-2'].forEach(id => this.checked ? document.getElementById(id).setAttribute('aria-busy','true') : document.getElementById(id).removeAttribute('aria-busy'))"
            />
            Loading
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<!-- standalone input -->
<label>
  <input type="text" placeholder="Loading..." aria-busy />
</label>

<!-- with adornment -->
<label>
  <svg data-prefix>...</svg>
  <input type="search" placeholder="Searching..." aria-busy />
</label>`),
          )}
        </div>
      </div>
    `,
  });
}
