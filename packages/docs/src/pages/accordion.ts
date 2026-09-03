import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "multiple", label: "Multiple items" },
  { id: "exclusive", label: "Exclusive" },
  { id: "open", label: "Open by default" },
];

export async function AccordionPage(path: string) {
  return Layout({
    title: "Accordion",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Accordion</h1>
          <p>
            Collapsible content sections using the native
            <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details>
            <summary>What is @erikt/ui?</summary>
            <div>
              @erikt/ui is a minimal CSS design system that styles native HTML
              elements directly, with no utility classes or component
              wrappers.
            </div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<details>
  <summary>What is @erikt/ui?</summary>
  <div>
    @erikt/ui is a minimal CSS design system that styles native
    HTML elements directly.
  </div>
</details>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="multiple">Multiple items</h2>
        <p>
          Stack several <code>&lt;details&gt;</code> elements and they space
          themselves.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details>
            <summary>Getting started</summary>
            <div>
              Import <code>@erikt/ui</code> and start writing HTML.
            </div>
          </details>
          <details>
            <summary>Customization</summary>
            <div>
              Override CSS custom properties to match your brand.
            </div>
          </details>
          <details>
            <summary>Dark mode</summary>
            <div>
              @erikt/ui responds to <code>prefers-color-scheme</code> automatically.
            </div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<details>
  <summary>Getting started</summary>
  <div>...</div>
</details>
<details>
  <summary>Customization</summary>
  <div>...</div>
</details>
<details>
  <summary>Dark mode</summary>
  <div>...</div>
</details>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="exclusive">Exclusive</h2>
        <p>
          Give a group the same <code>name</code> attribute and only one item
          stays open at a time.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details name="faq">
            <summary>Getting started</summary>
            <div>Import <code>@erikt/ui</code> and start writing HTML.</div>
          </details>
          <details name="faq">
            <summary>Customization</summary>
            <div>Override CSS custom properties to match your brand.</div>
          </details>
          <details name="faq">
            <summary>Dark mode</summary>
            <div>
              @erikt/ui responds to <code>prefers-color-scheme</code> automatically.
            </div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<details name="faq">
  <summary>Getting started</summary>
  <div>...</div>
</details>
<details name="faq">
  <summary>Customization</summary>
  <div>...</div>
</details>
<details name="faq">
  <summary>Dark mode</summary>
  <div>...</div>
</details>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="open">Open by default</h2>
        <p>
          Add the <code>open</code> attribute to expand an item on load.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details open>
            <summary>This one is open</summary>
            <div>
              Use the <code>open</code> attribute to expand by default.
            </div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<details open>
  <summary>This one is open</summary>
  <div>
    Use the open attribute to expand by default.
  </div>
</details>`),
          )}
        </div>
      </div>
    `,
  });
}
