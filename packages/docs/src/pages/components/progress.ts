import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "indeterminate", label: "Indeterminate" },
  { id: "round", label: "Round" },
  { id: "labeled", label: "Labeled" },
];

export async function ProgressPage(path: string) {
  return Layout({
    title: "Progress",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Progress</h1>
            ${raw(titleActions(path, "progress"))}
          </div>
          <p>
            How far along something is, using the native
            <code>&lt;progress&gt;</code> element.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("progress"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <progress value="40" max="100" style="width:100%"></progress>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<progress value="40" max="100"></progress>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="indeterminate">Indeterminate</h2>
        <p>
          Omit the <code>value</code> attribute to show an indeterminate state.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <progress style="width:100%"></progress>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<progress></progress>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="round">Round</h2>
        <p>
          Add <code>.round</code> for a ring that fills clockwise from the
          top. It is <code>2em</code> wide, so it follows the font size. Set
          <code>width</code> to make it bigger, and <code>--thickness</code>
          for a thicker ring.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <progress class="round" value="25" max="100" style="--value: 0.25"></progress>
          <progress class="round" value="65" max="100" style="--value: 0.65"></progress>
          <progress class="round" style="width: 3em; --thickness: 0.375em"></progress>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<progress class="round" value="25" max="100"></progress>
<progress class="round" value="65" max="100"></progress>

<!-- indeterminate, bigger and thicker -->
<progress class="round" style="width: 3em; --thickness: 0.375em"></progress>`),
          )}
        </div>
      </div>
      <div class="prose">
        <p>
          The ring reads <code>value</code> and <code>max</code> with typed
          <code>attr()</code>. Browsers without it need the fill as
          <code>--value</code>, from <code>0</code> to <code>1</code>.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `<progress class="round" value="65" max="100" style="--value: 0.65"></progress>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="labeled">Labeled</h2>
        <p>Wrap in a <code>&lt;label class="field"&gt;</code> to pair with a text label.</p>
      </div>
      <div class="example">
        <div class="preview">
          <label class="field" style="width:100%">
            <span>Uploading…</span>
            <progress value="65" max="100"></progress>
            <small>65%</small>
          </label>
          <label class="field" style="width:100%">
            <span>Processing</span>
            <progress></progress>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Uploading…</span>
  <progress value="65" max="100"></progress>
  <small>65%</small>
</label>

<label class="field">
  <span>Processing</span>
  <progress></progress>
</label>`),
          )}
        </div>
      </div>
    `,
  });
}
