import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "disabled", label: "Disabled" },
  { id: "with-separator", label: "With separator" },
  { id: "with-groups", label: "With groups" },
];

const chevron = icon("chevron-down", { size: 14 });

export async function SelectPage(path: string) {
  return Layout({
    title: "Select",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Select</h1>
          <p class="lead">
            A styled native <code>&lt;select&gt;</code> with a fully custom
            picker in supporting browsers.
          </p>
        </hgroup>

        <p>
          In browsers that support <code>appearance: base-select</code> (Chrome
          135+), the picker opens as a styled popover matching the rest of the
          UI. Older browsers get the original styled native select -- no extra
          code needed.
        </p>

        <p>
          The <code>&lt;button&gt;</code> and
          <code>&lt;selectedcontent&gt;</code> children are only used by
          supporting browsers; others ignore them and render the native control.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <select>
            <button>
              <selectedcontent></selectedcontent>
              ${raw(chevron)}
            </button>
            <option>Apple</option>
            <option>Banana</option>
            <option>Cherry</option>
            <option>Mango</option>
          </select>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<select>
  <button>
    <selectedcontent></selectedcontent>
    <svg><!-- chevron-down --></svg>
  </button>
  <option>Apple</option>
  <option>Banana</option>
  <option>Cherry</option>
  <option>Mango</option>
</select>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
      <div class="example">
        <div class="preview">
          <select disabled>
            <button>
              <selectedcontent></selectedcontent>
              ${raw(chevron)}
            </button>
            <option>Apple</option>
            <option>Banana</option>
          </select>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<select disabled>...</select>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-separator">With separator</h2>
        <p>
          Use an <code>&lt;hr&gt;</code> between options to visually group
          choices.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <select>
            <button>
              <selectedcontent></selectedcontent>
              ${raw(chevron)}
            </button>
            <option>Apple</option>
            <option>Banana</option>
            <option>Cherry</option>
            <hr />
            <option>Other</option>
          </select>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<select>
  <button>
    <selectedcontent></selectedcontent>
    <svg><!-- chevron-down --></svg>
  </button>
  <option>Apple</option>
  <option>Banana</option>
  <option>Cherry</option>
  <hr />
  <option>Other</option>
</select>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-groups">With groups</h2>
        <p>
          Use <code>&lt;optgroup&gt;</code> to group related options under a
          section label.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <select>
            <button>
              <selectedcontent></selectedcontent>
              ${raw(chevron)}
            </button>
            <optgroup label="Tropical">
              <option>Mango</option>
              <option>Papaya</option>
              <option>Pineapple</option>
            </optgroup>
            <optgroup label="Stone fruit">
              <option>Cherry</option>
              <option>Peach</option>
              <option>Plum</option>
            </optgroup>
          </select>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<select>
  <button>
    <selectedcontent></selectedcontent>
    <svg><!-- chevron-down --></svg>
  </button>
  <optgroup label="Tropical">
    <option>Mango</option>
    <option>Papaya</option>
    <option>Pineapple</option>
  </optgroup>
  <optgroup label="Stone fruit">
    <option>Cherry</option>
    <option>Peach</option>
    <option>Plum</option>
  </optgroup>
</select>`),
          )}
        </div>
      </div>
    `,
  });
}
