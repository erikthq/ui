import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "inline", label: "Inline" },
];

export async function CodePage(path: string) {
  return Layout({
    title: "Code",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Code</h1>
          <p>
            Inline code, using the native <code>&lt;code&gt;</code>
            element.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <code>console.log("hello")</code>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<code>console.log("hello")</code>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="inline">Inline</h2>
        <p>
          When nested inside a paragraph, <code>&lt;code&gt;</code> is styled
          automatically without any class names.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <p>
            Use <code>border-radius</code> to round the corners of an element.
          </p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<p>Use <code>border-radius</code> to round the corners of an element.</p>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}
