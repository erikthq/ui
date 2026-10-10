import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { icon } from "../../icon";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "mixed", label: "Mixed" },
  { id: "with-input", label: "With input" },
  { id: "quantity", label: "Quantity" },
];

export async function ButtonGroupPage(path: string) {
  return Layout({
    title: "Button Group",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Button Group</h1>
            ${raw(titleActions(path, "button-group"))}
          </div>
          <p>
            Group related actions using <code>&lt;button&gt;</code>s inside a
            <code>&lt;fieldset role="group"&gt;</code>.
          </p>
        </hgroup>

        <h3>Composed of</h3>
        <dl class="composition">
          <dt><a href="${url("/components/button")}"><code>Button</code></a></dt>
          <dd>The actions in the group</dd>
        </dl>

        <h3>Works with</h3>
        <dl class="composition">
          <dt><a href="${url("/components/text-field")}"><code>Text Field</code></a></dt>
          <dd>Input that fills the remaining space</dd>
        </dl>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("button-group"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <button class="ghost">Archive</button>
            <button class="ghost">Report</button>
            <button class="ghost">Snooze</button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <button class="ghost">Archive</button>
  <button class="ghost">Report</button>
  <button class="ghost">Snooze</button>
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="mixed">Mixed</h2>
        <p>Combine icon buttons and labeled buttons in the same group.</p>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <button
              class="ghost square"
              aria-label="Go back"
              data-tooltip
            >
              ${raw(icon("chevron-left"))}
            </button>
            <button class="ghost">Archive</button>
            <button class="ghost">Report</button>
            <button class="ghost">Snooze</button>
            <button
              class="ghost square"
              aria-label="More"
              data-tooltip
              popovertarget="mixed-more-menu"
            >
              ${raw(icon("dots"))}
            </button>
          </fieldset>
          <div id="mixed-more-menu" popover>
            <menu>
              <li><button class="ghost">Move to folder</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Export</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <button class="ghost square" aria-label="Go back" data-tooltip>←</button>
  <button class="ghost">Archive</button>
  <button class="ghost">Report</button>
  <button class="ghost">Snooze</button>
  <button
    class="ghost square"
    aria-label="More"
    data-tooltip
    popovertarget="more-menu"
  >···</button>
</fieldset>

<div id="more-menu" popover>
  <menu>
    <li><button class="ghost">Move to folder</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><button class="ghost">Export</button></li>
    <li><hr></li>
    <li><button class="ghost destructive">Delete</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-input">With input</h2>
        <p>Inputs stretch to fill the available space.</p>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group" style="width:320px">
            <input type="text" placeholder="Search..." />
            <button class="ghost square" aria-label="Search" data-tooltip>
              ${raw(icon("search"))}
            </button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <input type="text" placeholder="Search..." />
  <button class="ghost square" aria-label="Search" data-tooltip>
    …
  </button>
</fieldset>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="quantity">Quantity</h2>
        <p>A number input paired with increment and decrement buttons.</p>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <input type="number" value="8" min="0" style="width:4rem" />
            <button
              class="ghost square"
              aria-label="Decrement"
              data-tooltip
              onclick="this.closest('fieldset').firstElementChild.stepDown()"
            >
              ${raw(icon("minus"))}
            </button>
            <button
              class="ghost square"
              aria-label="Increment"
              data-tooltip
              onclick="this.closest('fieldset').firstElementChild.stepUp()"
            >
              ${raw(icon("plus"))}
            </button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <input type="number" value="8" min="0" style="width:4rem" />
  <button class="ghost square" aria-label="Decrement" data-tooltip
    onclick="this.closest('fieldset').firstElementChild.stepDown()">
    −
  </button>
  <button class="ghost square" aria-label="Increment" data-tooltip
    onclick="this.closest('fieldset').firstElementChild.stepUp()">
    +
  </button>
</fieldset>`),
          )}
        </div>
      </div>
    `,
  });
}
