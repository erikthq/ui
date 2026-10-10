import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { icon } from "../../icon";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "composition", label: "Composition" },
];

export async function TextareaPage(path: string) {
  return Layout({
    title: "Textarea",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Textarea</h1>
            ${raw(titleActions(path, "textarea"))}
          </div>
          <p>Auto-growing textarea using <code>field-sizing: content</code>.</p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("textarea"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <textarea
            placeholder="Write something..."
            style="width:100%"
          ></textarea>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<textarea placeholder="Write something..."></textarea>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="composition">Composition</h2>
        <p>
          A <code>&lt;textarea&gt;</code> sits flush inside an
          <code>&lt;article&gt;</code> card with a toolbar header and status
          footer.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article style="width:100%" data-focus-within>
            <header
              style="display:flex;align-items:center;gap:var(--ui-spacing-2)"
            >
              ${raw(icon("brand-javascript", { size: 18 }))}
              <span style="font-size:0.875rem">script.js</span>
              <span style="flex:1"></span>
              <button class="ghost square" aria-label="Reload" data-tooltip>
                ${raw(icon("reload", { size: 16 }))}
              </button>
              <button class="ghost square" aria-label="Copy" data-tooltip>
                ${raw(icon("copy", { size: 16 }))}
              </button>
            </header>
            <textarea
              style="border-radius:0;resize:none;font-family:monospace;box-shadow:none"
              rows="6"
              data-focus
            >
console.log('Hello, world!');</textarea
            >
            <footer
              style="display:flex;align-items:center;justify-content:space-between"
            >
              <small style="color:var(--ui-neutral-500)"
                >Line 1, Column 1</small
              >
              <button>
                Run&nbsp;${raw(icon("corner-down-left", { size: 14 }))}
              </button>
            </footer>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article data-focus-within>
  <header style="display:flex;align-items:center;gap:8px">
    <svg><!-- brand-javascript --></svg>
    <span>script.js</span>
    <span style="flex:1"></span>
    <button class="ghost square" aria-label="Reload" data-tooltip><svg>...</svg></button>
    <button class="ghost square" aria-label="Copy" data-tooltip><svg>...</svg></button>
  </header>
  <textarea data-focus style="border-radius:0;resize:none;box-shadow:none">
    console.log('Hello, world!');
  </textarea>
  <footer style="display:flex;align-items:center;justify-content:space-between">
    <small>Line 1, Column 1</small>
    <button>Run <svg><!-- corner-down-left --></svg></button>
  </footer>
</article>`),
          )}
        </div>
      </div>
    `,
  });
}
