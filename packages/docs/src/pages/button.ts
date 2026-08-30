import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-icon", label: "With icon" },
  { id: "with-kbd", label: "With kbd" },
  { id: "outlined", label: "Outlined" },
  { id: "secondary", label: "Secondary" },
  { id: "ghost", label: "Ghost" },
  { id: "destructive", label: "Destructive" },
  { id: "link", label: "Link" },
  { id: "round", label: "Round" },
  { id: "square", label: "Square" },
  { id: "loading", label: "Loading" },
];

export async function ButtonPage(path: string) {
  return Layout({
    title: "Button",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Button</h1>
          <p>
            Trigger an action using a native <code>&lt;button&gt;</code> element.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button>Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight("<button>Click me</button>"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-icon">With icon</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button>
            ${raw(icon("download"))}
            Download
          </button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<button>\n  <svg><!-- icon --></svg>\n  Download\n</button>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-kbd">With kbd or Badge</h2>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <button style="min-width:10rem">${raw(icon("device-floppy"))} Save <kbd>⌘S</kbd></button>
          <button class="outlined" style="min-width:10rem">Find <kbd>⌘K</kbd></button>
          <button class="outlined" style="min-width:10rem">Chat <span class="badge color3">6</span></button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<style>\n  button {\n    min-width: 10rem;\n  }\n</style>\n\n<button>\n  <svg><!-- save --></svg>\n  Save\n<kbd>⌘S</kbd>\n</button>\n\n<button class="outlined">Find\n<kbd>⌘K</kbd>\n</button>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="outlined">Outlined</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined">Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="outlined">Click me</button>'))}
        </div>
      </div>

      <div class="prose">
        <h2 id="secondary">Secondary</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button class="secondary">Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="secondary">Click me</button>'))}
        </div>
      </div>

      <div class="prose">
        <h2 id="ghost">Ghost</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button class="ghost">Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="ghost">Click me</button>'))}
        </div>
      </div>

      <div class="prose">
        <h2 id="destructive">Destructive</h2>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem;">
          <button class="destructive">Delete</button>
          <button class="ghost destructive">Delete</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="destructive">Delete</button>\n<button class="ghost destructive">Delete</button>'))}
        </div>
      </div>

      <div class="prose">
        <h2 id="link">Link</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button class="link">Click me</button>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button class="link">Click me</button>'))}
        </div>
      </div>

      <div class="prose">
        <h2 id="round">Round</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button class="round">
            ${raw(icon("user"))}
          </button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              '<button class="round"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg></button>',
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="square">Square</h2>
        <p>
          Add <code>.square</code> for equal padding — useful for icon buttons.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button class="square">
            ${raw(icon("upload"))}
          </button>
          <button class="square" style="margin-left: 0.5rem;">
            ${raw(icon("settings"))}
          </button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              '<button class="square"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg></button>',
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="loading">Loading</h2>
        <p>
          Set <code>aria-busy</code> to show an animated spinner before the
          label.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="flex-direction:column;align-items:center;justify-contents:center;flex-start;gap:1rem">
          <button id="btn-loading-demo" aria-busy>Please wait…</button>
          <label style="display:flex;align-items:center;gap:0.5rem">
            <input type="checkbox" checked onchange="this.checked ? document.getElementById('btn-loading-demo').setAttribute('aria-busy', 'true') : document.getElementById('btn-loading-demo').removeAttribute('aria-busy')" />
            Loading
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight('<button aria-busy>Please wait…</button>'),
          )}
        </div>
      </div>
    `,
  });
}
