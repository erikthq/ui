import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "colors", label: "Colors" },
  { id: "outlined", label: "Outlined" },
  { id: "with-icon", label: "With icon" },
  { id: "sup", label: "Sup" },
  { id: "loading", label: "Loading" },
];

export async function BadgePage(path: string) {
  return Layout({
    title: "Badge",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Badge</h1>
          <p>
            Small status labels using <code>&lt;span class="badge"&gt;</code>.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <span class="badge">Badge</span>
          <span class="badge secondary">Secondary</span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span class="badge">Badge</span>\n
<span class="badge secondary">Secondary</span>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="colors">Colors</h2>
        <p>
          One modifier class per @erikt/ui color seed: <code>primary</code>,
          <code>constructive</code>, <code>destructive</code>, and
          <code>color1</code> through <code>color6</code>.
        </p>
      </div>
      <div class="example">
        <div
          class="preview"
          style="gap:0.5rem;flex-wrap:wrap;flex-direction:column;"
        >
          <span class="badge primary">Primary</span>
          <span class="badge constructive">Constructive</span>
          <span class="badge destructive">Destructive</span>
          <span class="badge color1">Color 1</span>
          <span class="badge color2">Color 2</span>
          <span class="badge color3">Color 3</span>
          <span class="badge color4">Color 4</span>
          <span class="badge color5">Color 5</span>
          <span class="badge color6">Color 6</span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span class="badge primary">Primary</span>
<span class="badge constructive">Constructive</span>
<span class="badge destructive">Destructive</span>
<span class="badge color1">Color 1</span>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="outlined">Outlined</h2>
      </div>
      <div class="example">
        <div class="preview">
          <span class="badge outlined">Outlined</span>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<span class="badge outlined">Outlined</span>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-icon">With icon</h2>
        <p>Drop an <code>&lt;svg&gt;</code> inside — it sizes automatically.</p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <span class="badge constructive">
            ${raw(icon("check"))} Verified
          </span>
          <span class="badge destructive">
            ${raw(icon("alert-circle"))} Failed
          </span>
          <span class="badge outlined"> ${raw(icon("info-circle"))} Info </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span class="badge constructive">
  <svg><!-- icon --></svg>
  Verified
</span>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="sup">Sup</h2>
        <p>
          Make a badge of a <code>&lt;sup&gt;</code> and it automatically aligns
          to the top.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="flex-direction:column;gap:0.5rem">
          <h1>Bob <sup class="badge color6">Admin</sup></h1>
          <h1>Alice <sup class="badge color4">User</sup></h1>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<h1>Bob <sup class="badge">Admin</sup></h1>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="loading">Loading</h2>
        <p>
          Add <code>aria-busy</code> to inject a spinner. Works on any
          variant.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <span class="badge" aria-busy>Syncing</span>
          <span class="badge secondary" aria-busy>Uploading</span>
          <span class="badge outlined" aria-busy>Processing</span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="badge" aria-busy>Syncing</span>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}
