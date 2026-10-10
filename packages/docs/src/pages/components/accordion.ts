import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "multiple", label: "Multiple items" },
  { id: "exclusive", label: "Exclusive" },
  { id: "open", label: "Open by default" },
  { id: "in-a-card", label: "In a card" },
];

export async function AccordionPage(path: string) {
  return Layout({
    title: "Accordion",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Accordion</h1>
            ${raw(titleActions(path, "accordion"))}
          </div>
          <p>
            Collapsible content sections using the native
            <code>&lt;details&gt;</code> and
            <code>&lt;summary&gt;</code> elements.
          </p>
        </hgroup>

        <h3>Works with</h3>
        <dl class="composition">
          <dt><a href="${url("/components/card")}"><code>Card</code></a></dt>
          <dd>Surface to group the items on</dd>
        </dl>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("accordion"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details>
            <summary>What is @erikt/ui?</summary>
            <div class="prose">
              <p>
                @erikt/ui is a minimal CSS design system that styles native HTML
                elements directly, with no utility classes or component
                wrappers.
              </p>
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
            <div>Import <code>@erikt/ui</code> and start writing HTML.</div>
          </details>
          <details>
            <summary>Customization</summary>
            <div>Override CSS custom properties to match your brand.</div>
          </details>
          <details>
            <summary>Dark mode</summary>
            <div>
              @erikt/ui responds to
              <code>prefers-color-scheme</code> automatically.
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
              @erikt/ui responds to
              <code>prefers-color-scheme</code> automatically.
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
        <p>Add the <code>open</code> attribute to expand an item on load.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <details open>
            <summary>This one is open</summary>
            <div>Use the <code>open</code> attribute to expand by default.</div>
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

      <div class="prose">
        <h2 id="in-a-card">In a card</h2>
        <p>
          Put the items inside a <a href="${url("/components/card")}"><code>Card</code></a> to group
          them on their own surface.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article style="width:100%" class="secondary">
            <details name="card-faq">
              <summary>Getting started</summary>
              <div>Import <code>@erikt/ui</code> and start writing HTML.</div>
            </details>
            <details name="card-faq">
              <summary>Customization</summary>
              <div>Override CSS custom properties to match your brand.</div>
            </details>
            <details name="card-faq">
              <summary>Dark mode</summary>
              <div>
                @erikt/ui responds to
                <code>prefers-color-scheme</code> automatically.
              </div>
            </details>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article class="secondary">
  <details name="faq">
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
  </details>
</article>`),
          )}
        </div>
      </div>
    `,
  });
}
