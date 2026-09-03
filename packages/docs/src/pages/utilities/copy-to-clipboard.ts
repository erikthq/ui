import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "usage", label: "Usage" },
  { id: "web-component", label: "Web Component" },
];

const CODE = `async function copyToClipboard({ selector, text } = {}) {
  function getElementText(el) {
    if (!el) return null;
    return ("value" in el ? el.value : el.textContent).trim();
  }

  const value = selector ? getElementText(document.querySelector(selector)) : text;
  if (value == null) return;
  await navigator.clipboard.writeText(value);
}

// copy an element's content
copyToClipboard({ selector: "#snippet" });

// copy a literal string
copyToClipboard({ text: "npm install @erikt/ui" });`;

const CODE_ELEMENT = `class CopyToClipboard extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", this.copy);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.copy);
  }

  copy = async () => {
    const selector = this.getAttribute("for");
    const source = selector ? document.querySelector(selector) : null;
    const text = source
      ? ("value" in source ? source.value : source.textContent).trim()
      : this.getAttribute("value");

    if (text == null) return;

    await navigator.clipboard.writeText(text);
    this.dispatchEvent(
      new CustomEvent("clipboard-copy", { bubbles: true, detail: { text } }),
    );
  };
}

if (!customElements.get("copy-to-clipboard")) {
  customElements.define("copy-to-clipboard", CopyToClipboard);
}`;

const CODE_ELEMENT_USAGE_SELECTOR = `<copy-to-clipboard for="#snippet">
  <button type="button">Copy</button>
</copy-to-clipboard>

<pre id="snippet">npm install @erikt/ui</pre>`;

const CODE_ELEMENT_USAGE_VALUE = `<copy-to-clipboard value="npm install @erikt/ui">
  <button type="button">Copy</button>
</copy-to-clipboard>`;

export async function CopyToClipboardPage(path: string) {
  return Layout({
    title: "Copy to Clipboard",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Copy to Clipboard</h1>
          <p>
            Copy text to the clipboard using the native
            <code>navigator.clipboard</code> API. Pass a CSS selector to copy an
            element's content, or pass a literal string directly.
          </p>
        </hgroup>

        <h2 id="usage">Usage</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded" style="gap:var(--ui-spacing-2)">
          <pre id="copy-source" style="margin:0">npm install @erikt/ui</pre>
          <div style="display:flex;gap:var(--ui-spacing-2)">
            <button type="button" class="outlined" id="copy-from-selector">
              Copy from selector
            </button>
            <button type="button" class="outlined" id="copy-from-text">
              Copy literal string
            </button>
          </div>
        </div>
        <div class="code-block">${raw(await highlight(CODE, 80, "js"))}</div>
      </div>

      <div class="prose">
        <h2 id="web-component">Web Component</h2>
        <p>
          Wrap the same logic in a custom element. Give it a
          <code>for</code> attribute to copy a matching element's content, or a
          <code>value</code> attribute to copy a literal string. On success it
          fires a bubbling <code>clipboard-copy</code> event, so the page decides
          what "Copied!" looks like.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded" style="gap:var(--ui-spacing-2)">
          <pre id="snippet" style="margin:0">npm install @erikt/ui</pre>
          <div style="display:flex;gap:var(--ui-spacing-2)">
            <div id="copy-element-selector-demo"></div>
            <div id="copy-element-value-demo"></div>
          </div>
        </div>
        <div class="code-block">
          ${raw(await highlight(CODE_ELEMENT_USAGE_SELECTOR, 80, "html"))}
        </div>
        <div class="code-block">
          ${raw(await highlight(CODE_ELEMENT_USAGE_VALUE, 80, "html"))}
        </div>
      </div>
      <div class="code-block">
        ${raw(await highlight(CODE_ELEMENT, 80, "js"))}
      </div>

      <script type="module">
        async function copyToClipboard({ selector, text } = {}) {
          function getElementText(el) {
            if (!el) return null;
            return ("value" in el ? el.value : el.textContent).trim();
          }

          const value = selector
            ? getElementText(document.querySelector(selector))
            : text;
          if (value == null) return;
          await navigator.clipboard.writeText(value);
        }

        document
          .getElementById("copy-from-selector")
          .addEventListener("click", async (e) => {
            await copyToClipboard({ selector: "#copy-source" });
          });

        document
          .getElementById("copy-from-text")
          .addEventListener("click", async (e) => {
            await copyToClipboard({ text: "npm install @erikt/ui" });
          });

        // <copy-to-clipboard> is already registered site-wide, see components/copy-code.ts
        const selectorDemo = document.getElementById(
          "copy-element-selector-demo",
        );
        const selectorEl = document.createElement("copy-to-clipboard");
        selectorEl.setAttribute("for", "#snippet");
        selectorEl.innerHTML =
          '<button type="button" class="outlined">Copy from selector</button>';
        selectorDemo.append(selectorEl);

        const valueDemo = document.getElementById("copy-element-value-demo");
        const valueEl = document.createElement("copy-to-clipboard");
        valueEl.setAttribute("value", "npm install @erikt/ui");
        valueEl.innerHTML =
          '<button type="button" class="outlined">Copy literal string</button>';
        valueDemo.append(valueEl);
      </script>
    `,
  });
}
