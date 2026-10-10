import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { icon } from "../../icon";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
];

export async function FocusGroupPage(path: string) {
  return Layout({
    title: "Focus Group",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Focus Group</h1>
            ${raw(titleActions(path, "focus-group"))}
          </div>
          <p class="lead">
            A container that draws one focus ring when a child inside it takes
            focus.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("focus-group"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
        <p>
          Add <code>data-focus-within</code> to the container and
          <code>data-focus</code> to the focusable elements inside it. The
          parent shows the outline; the children suppress their own.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article data-focus-within style="width:100%">
            <header>
              ${raw(icon("brand-javascript", { size: 18 }))}
              <span style="margin-right:auto">script.js</span>
              <button class="ghost square" aria-label="Reload" data-tooltip>
                ${raw(icon("reload", { size: 16 }))}
              </button>
              <button class="ghost square" aria-label="Copy" data-tooltip>
                ${raw(icon("copy", { size: 16 }))}
              </button>
            </header>
            <textarea
              data-focus
              style="box-shadow:none;resize:none;font-family:monospace"
              rows="6"
              placeholder="console.log('Hello, world!');"
            ></textarea>
            <footer style="justify-content:space-between">
              <span style="color:var(--ui-neutral-500)"
                >Line 1, Column 1</span
              >
              <button>
                Run&nbsp;${raw(icon("corner-down-left", { size: 14 }))}
              </button>
            </footer>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<style>
  article {
    & header span {
      margin-right: auto;
    }

    & textarea {
      box-shadow: none;
      resize: none;
      font-family: monospace;
    }

    & footer {
      justify-content: space-between;

      & span { color: var(--ui-neutral-500); }
    }
  }
</style>

<article data-focus-within>
  <header>
    <svg>...</svg>
    <span>script.js</span>
    <button class="ghost square" aria-label="Reload" data-tooltip><svg>...</svg></button>
    <button class="ghost square" aria-label="Copy" data-tooltip><svg>...</svg></button>
  </header>
  <textarea data-focus rows="6" placeholder="console.log('Hello, world!');"></textarea>
  <footer>
    <span>Line 1, Column 1</span>
    <button>Run <svg>...</svg></button>
  </footer>
</article>`),
          )}
        </div>
      </div>
    `,
  });
}
