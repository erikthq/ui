import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { apiReference } from "../../components/api-reference";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "circle", label: "Circle" },
  { id: "preserve-content", label: "Preserve content size" },
  { id: "composite", label: "Composite" },
  { id: "api-reference", label: "API reference" },
];

export async function SkeletonPage(path: string) {
  return Layout({
    title: "Skeleton",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Skeleton</h1>
            ${raw(titleActions(path, "skeleton"))}
          </div>
          <p>
            A shimmering placeholder shown while content is loading, using
            <code>class="skeleton"</code>.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("skeleton"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
        <p>
          Defaults to a height of <code>1lh</code>, matching a line of text.
          Set a <code>width</code> to control how long the placeholder is, and
          override <code>height</code> to shape it differently.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="flex-direction:column;gap:0.5rem">
          <div class="skeleton" style="width:12rem"></div>
          <div class="skeleton" style="width:8rem"></div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div class="skeleton" style="width: 12rem"></div>
<div class="skeleton" style="width: 8rem"></div>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="circle">Circle</h2>
        <p>Add <code>circle</code> to shape it like an avatar placeholder.</p>
      </div>
      <div class="example">
        <div class="preview">
          <div class="skeleton circle" style="width:3rem"></div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div class="skeleton circle" style="width: 3rem"></div>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="preserve-content">Preserve content size</h2>
        <p>
          Apply <code>class="skeleton"</code> directly to an element with
          content. The text is hidden but its size still reserves the layout, so
          nothing shifts once the real content loads.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <p class="skeleton">This sentence sets the placeholder's size.</p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<p class="skeleton">This sentence sets the placeholder's size.</p>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="composite">Composite</h2>
        <p>Combine a circle and a few lines to placeholder a user row.</p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div class="skeleton circle" style="width:2.5rem"></div>
            <div style="display:flex;flex-direction:column;gap:0.4rem">
              <div class="skeleton" style="width:8rem"></div>
              <small class="skeleton" style="width:5rem"></small>
            </div>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div style="display: flex; align-items: center; gap: 0.75rem">
  <div class="skeleton circle" style="width: 2.5rem"></div>
  <div style="display: flex; flex-direction: column; gap: 0.4rem">
    <div class="skeleton" style="width: 8rem"></div>
    <small class="skeleton" style="width: 5rem"></small>
  </div>
</div>`),
          )}
        </div>
      </div>

      ${apiReference([
        { type: "Shape", values: [".circle"], description: "Round placeholder with equal width and height" },
      ])}
    `,
  });
}
