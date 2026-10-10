import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "button", label: "Button" },
  { id: "custom", label: "Custom element" },
  { id: "card", label: "Loading card" },
];

export async function LoadingPage(path: string) {
  return Layout({
    title: "Loading",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Loading</h1>
            ${raw(titleActions(path, "loading"))}
          </div>
          <p>
            An animated SVG spinner injected via CSS whenever
            <code>aria-busy</code> is set.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("loading"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="button">Button</h2>
      </div>
      <div class="example">
        <div
          class="preview"
          style="flex-direction:column;align-items:center;justify-contents:center;gap:1rem"
        >
          <button id="loading-btn" aria-busy>Saving…</button>
          <label style="display:flex;align-items:center;gap:0.5rem">
            <input
              type="checkbox"
              checked
              onchange="this.checked ? document.getElementById('loading-btn').setAttribute('aria-busy', 'true') : document.getElementById('loading-btn').removeAttribute('aria-busy')"
            />
            Loading
          </label>
        </div>
        <div class="code-block">
          ${raw(await highlight('<button aria-busy>Saving…</button>'))}
        </div>
      </div>

      <div class="prose">
        <h2 id="custom">Custom element</h2>
        <p>
          Any element with <code>aria-busy</code> gets a spinner via
          <code>::before</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width: 1lh" aria-busy></div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight('<div style="width: 1lh" aria-busy></div>'),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="card">Loading card</h2>
        <p>
          Center a spinner in an <code>article</code> for a panel that blocks
          the view while something loads.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <article class="empty">
            <span
              aria-busy
              style="width:2.5rem;height:2.5rem;border-radius:8px;background:var(--ui-neutral-100);display:grid;place-items:center;"
            ></span>
            <h4>Processing your request</h4>
            <p>
              Please wait while we process your request. Do not refresh the
              page.
            </p>
            <button class="outlined">Cancel</button>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article class="empty">
              <span
                aria-busy
                style="width:2.5rem;height:2.5rem;border-radius:8px;background:var(--ui-neutral-100);display:grid;place-items:center;"
              ></span>
              <h4>Processing your request</h4>
              <p>
                Please wait while we process your request. Do not refresh the
                page.
              </p>
              <button class="outlined">Cancel</button>
          </article>`),
          )}
        </div>
      </div>
    `,
  });
}
