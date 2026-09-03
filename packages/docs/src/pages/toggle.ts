import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "checked", label: "Checked" },
  { id: "square", label: "Square" },
  { id: "fill", label: "Fill" },
  { id: "ghost", label: "Ghost" },
  { id: "conditional-content", label: "Conditional content" },
  { id: "disabled", label: "Disabled" },
];

export async function TogglePage(path: string) {
  return Layout({
    title: "Toggle",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Toggle</h1>
          <p>
            A pressable label wrapped around a checkbox. Looks like a button,
            behaves like a toggle.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="toggle">
            <input type="checkbox" />
            ${raw(icon("bookmark"))} Bookmark
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle">
  <input type="checkbox" />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="checked">Checked</h2>
        <p>Works with or without an icon.</p>
      </div>
      <div class="example">
        <div class="preview" style="gap: 0.5rem; flex-wrap: wrap">
          <label class="toggle">
            <input type="checkbox" checked />
            ${raw(icon("bookmark"))} Bookmark
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            ${raw(icon("star"))} Star
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            ${raw(icon("heart"))} Like
          </label>
          <label class="toggle">
            <input type="checkbox" checked />
            Follow
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle">
  <input type="checkbox" checked />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="square">Square</h2>
        <p>
          Add <code>.square</code> for an icon-only toggle with equal padding.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label class="toggle square" aria-label="Bookmark">
            <input type="checkbox" />
            ${raw(icon("bookmark"))}
          </label>
          <label class="toggle square" aria-label="Star">
            <input type="checkbox" checked />
            ${raw(icon("star"))}
          </label>
          <label class="toggle square" aria-label="Like">
            <input type="checkbox" />
            ${raw(icon("heart"))}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle square" aria-label="Bookmark">
  <input type="checkbox" />
  <svg>...</svg>
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="ghost">Ghost</h2>
        <p>Add <code>.ghost</code> to remove the outline.</p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label class="toggle ghost">
            <input type="checkbox" />
            ${raw(icon("bookmark"))} Bookmark
          </label>
          <label class="toggle ghost">
            <input type="checkbox" checked />
            ${raw(icon("star"))} Star
          </label>
          <label class="toggle ghost square" aria-label="Like">
            <input type="checkbox" />
            ${raw(icon("heart"))}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle ghost">
  <input type="checkbox" />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="fill">Fill</h2>
        <p>Add <code>.fill</code> to fill the SVG icon when checked.</p>
      </div>
      <div class="example">
        <div class="preview" style="gap: 0.5rem; flex-wrap: wrap">
          <label class="toggle fill">
            <input type="checkbox" checked />
            ${raw(icon("bookmark"))} Bookmark
          </label>
          <label class="toggle fill">
            <input type="checkbox" checked />
            ${raw(icon("star"))} Star
          </label>
          <label class="toggle fill square">
            <input type="checkbox" checked />
            ${raw(icon("heart"))}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle fill">
  <input type="checkbox" checked />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="conditional-content">Conditional content</h2>
        <p>
          Children with <code>data-checked</code> or
          <code>data-unchecked</code> are shown only in the matching state.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label class="toggle">
            <input type="checkbox" />
            <span data-unchecked>Follow</span>
            <span data-checked>Following</span>
          </label>
          <label class="toggle square" aria-label="Mute">
            <input type="checkbox" />

            ${raw(icon("volume", { attrs: "data-unchecked" }))}
            ${raw(icon("volume-3", { attrs: "data-checked" }))}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle">
  <input type="checkbox" />
  <span data-unchecked>Follow</span>
  <span data-checked>Following</span>
</label>`),
          )}
        </div>
      </div>
      <div class="prose">
        <p>
          Combine with <code>.ghost</code> for icon-only toggles like a theme
          switcher.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label class="toggle ghost square" aria-label="Toggle theme">
            <input type="checkbox" />
            ${raw(icon("sun", { attrs: "data-unchecked" }))}
            ${raw(icon("moon", { attrs: "data-checked" }))}
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle ghost square" aria-label="Toggle theme">
  <input type="checkbox" />
  <svg data-unchecked><!-- sun --></svg>
  <svg data-checked><!-- moon --></svg>
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="toggle">
            <input type="checkbox" disabled />
            ${raw(icon("bookmark"))} Bookmark
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="toggle">
  <input type="checkbox" disabled />
  <svg>...</svg>
  Bookmark
</label>`),
          )}
        </div>
      </div>
    `,
  });
}
