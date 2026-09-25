import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { icon } from "../../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "multiple", label: "Multiple groups" },
];

export async function ToggleGroupPage(path: string) {
  return Layout({
    title: "Toggle Group",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Toggle Group</h1>
          <p>
            A group of mutually exclusive or independent toggle buttons, built
            with
            <code>&lt;label class="toggle"&gt;</code> inside a
            <code>&lt;fieldset role="group"&gt;</code>.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>Use radio inputs for mutually exclusive options.</p>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <label class="toggle square" aria-label="Align left" data-tooltip>
              <input type="radio" name="align-default" />
              ${raw(icon("align-left"))}
            </label>
            <label class="toggle square" aria-label="Align center" data-tooltip>
              <input type="radio" name="align-default" checked />
              ${raw(icon("align-center"))}
            </label>
            <label class="toggle square" aria-label="Align right" data-tooltip>
              <input type="radio" name="align-default" />
              ${raw(icon("align-right"))}
            </label>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset role="group">
  <label class="toggle square" aria-label="Align left" data-tooltip>
    <input type="radio" name="align" />
    <svg>...</svg>
  </label>
  <label class="toggle square" aria-label="Align center" data-tooltip>
    <input type="radio" name="align" checked />
    <svg>...</svg>
  </label>
  <label class="toggle square" aria-label="Align right" data-tooltip>
    <input type="radio" name="align" />
    <svg>...</svg>
  </label>
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="multiple">Multiple groups</h2>
        <p>
          Place groups next to each other to build toolbar-style layouts. Use
          checkboxes for independent toggles.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="display:flex;gap:0.5rem">
            <fieldset role="group">
              <label class="toggle square" aria-label="Align left" data-tooltip>
                <input type="radio" name="align-multi" />
                ${raw(icon("align-left"))}
              </label>
              <label class="toggle square" aria-label="Align center" data-tooltip>
                <input type="radio" name="align-multi" checked />
                ${raw(icon("align-center"))}
              </label>
              <label class="toggle square" aria-label="Align right" data-tooltip>
                <input type="radio" name="align-multi" />
                ${raw(icon("align-right"))}
              </label>
            </fieldset>
            <fieldset role="group">
              <label class="toggle square" aria-label="Bold" data-tooltip>
                <input type="checkbox" />
                ${raw(icon("bold"))}
              </label>
              <label class="toggle square" aria-label="Italic" data-tooltip>
                <input type="checkbox" checked />
                ${raw(icon("italic"))}
              </label>
              <label class="toggle square" aria-label="Underline" data-tooltip>
                <input type="checkbox" />
                ${raw(icon("underline"))}
              </label>
            </fieldset>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div style="display:flex;gap:0.5rem">
  <fieldset role="group">
    <label class="toggle square" aria-label="Align left" data-tooltip>
      <input type="radio" name="align" />
      <svg>...</svg>
    </label>
    <label class="toggle square" aria-label="Align center" data-tooltip>
      <input type="radio" name="align" checked />
      <svg>...</svg>
    </label>
    <label class="toggle square" aria-label="Align right" data-tooltip>
      <input type="radio" name="align" />
      <svg>...</svg>
    </label>
  </fieldset>
  <fieldset role="group">
    <label class="toggle square" aria-label="Bold" data-tooltip>
      <input type="checkbox" />
      <svg>...</svg>
    </label>
    <label class="toggle square" aria-label="Italic" data-tooltip>
      <input type="checkbox" checked />
      <svg>...</svg>
    </label>
    <label class="toggle square" aria-label="Underline" data-tooltip>
      <input type="checkbox" />
      <svg>...</svg>
    </label>
  </fieldset>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
