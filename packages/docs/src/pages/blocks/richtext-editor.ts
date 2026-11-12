import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { icon } from "../../icon";

export async function RichtextEditorPage(path: string) {
  return Layout({
    wide: true,
    title: "Richtext Editor",
    path,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Richtext Editor</h1>
          <p>
            A document editor toolbar composed from Button Group, Select, and
            ghost icon buttons.
          </p>
        </hgroup>
      </div>

      <div class="example">
        <div class="preview">
          <section style="max-width:500px">
            <!-- Block type -->
            <button
              class="outlined"
              id="rte-format-btn"
              popovertarget="rte-format-menu"
              style="justify-content:space-between;min-width:8rem"
            >
              <span>Paragraph</span>
              ${raw(icon("chevron-down", { size: 14 }))}
            </button>
            <div
              id="rte-format-menu"
              popover
              onchange="document.getElementById('rte-format-btn').querySelector('span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()"
            >
              <menu>
                <li>
                  <label
                    ><input
                      type="radio"
                      name="rte-block"
                      value="p"
                      checked
                    />Paragraph</label
                  >
                </li>
                <li>
                  <label
                    ><input type="radio" name="rte-block" value="h1" />Heading
                    1</label
                  >
                </li>
                <li>
                  <label
                    ><input type="radio" name="rte-block" value="h2" />Heading
                    2</label
                  >
                </li>
                <li>
                  <label
                    ><input type="radio" name="rte-block" value="h3" />Heading
                    3</label
                  >
                </li>
                <li>
                  <label
                    ><input
                      type="radio"
                      name="rte-block"
                      value="blockquote"
                    />Blockquote</label
                  >
                </li>
              </menu>
            </div>

            <!-- Formatting -->
            <fieldset role="group">
              <label class="toggle square" title="Bold">
                <input type="checkbox" />${raw(icon("bold", { size: 14 }))}
              </label>
              <label class="toggle square" title="Italic">
                <input type="checkbox" />${raw(icon("italic", { size: 14 }))}
              </label>
              <label class="toggle square" title="Underline">
                <input type="checkbox" />${raw(icon("underline", { size: 14 }))}
              </label>
              <label class="toggle square" title="Strikethrough">
                <input type="checkbox" />${raw(
                  icon("strikethrough", { size: 14 }),
                )}
              </label>
            </fieldset>

            <!-- Insert -->
            <fieldset role="group">
              <button
                class="ghost square"
                title="Image"
                onclick="document.getElementById('rte-image-dialog').showModal()"
              >
                ${raw(icon("photo", { size: 14 }))}
              </button>
              <button class="ghost square" title="Blockquote">
                ${raw(icon("quote", { size: 14 }))}
              </button>
              <button class="ghost square" title="Inline code">
                ${raw(icon("code", { size: 14 }))}
              </button>
            </fieldset>

            <!-- Alignment & lists -->
            <fieldset role="group">
              <button
                class="ghost square"
                title="Text alignment"
                id="rte-align-btn"
                popovertarget="rte-align-menu"
              >
                ${raw(icon("align-left", { size: 14 }))}
              </button>
              <button class="ghost square" title="Bullet list">
                ${raw(icon("list", { size: 14, filled: true }))}
              </button>
              <button class="ghost square" title="Numbered list">
                ${raw(icon("list-numbers", { size: 14 }))}
              </button>
            </fieldset>
            <div id="rte-align-menu" popover>
              <menu>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="rte-align"
                      value="justifyLeft"
                      checked
                    />
                    <span style="display:flex;align-items:center;gap:0.5rem">
                      ${raw(icon("align-left", { size: 14 }))} Align left
                    </span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="rte-align"
                      value="justifyCenter"
                    />
                    <span style="display:flex;align-items:center;gap:0.5rem">
                      ${raw(icon("align-center", { size: 14 }))} Align center
                    </span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type="radio" name="rte-align" value="justifyRight" />
                    <span style="display:flex;align-items:center;gap:0.5rem">
                      ${raw(icon("align-right", { size: 14 }))} Align right
                    </span>
                  </label>
                </li>
              </menu>
            </div>

            <textarea style="margin-top:var(--ui-spacing-3)"></textarea>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<!-- Block type dropdown -->
<button class="outlined" id="format-btn" popovertarget="format-menu">
  <span>Paragraph</span> <svg>...</svg>
</button>
<div id="format-menu" popover onchange="document.getElementById('format-btn').querySelector('span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()">
  <menu>
    <li><label><input type="radio" name="block" value="p" checked />Paragraph</label></li>
    <li><label><input type="radio" name="block" value="h1" />Heading 1</label></li>
    <li><label><input type="radio" name="block" value="h2" />Heading 2</label></li>
    <li><label><input type="radio" name="block" value="h3" />Heading 3</label></li>
    <li><label><input type="radio" name="block" value="blockquote" />Blockquote</label></li>
  </menu>
</div>

<!-- Formatting toggles -->
<fieldset role="group">
  <label class="toggle square" title="Bold"><input type="checkbox" /><svg>...</svg></label>
  <label class="toggle square" title="Italic"><input type="checkbox" /><svg>...</svg></label>
  <label class="toggle square" title="Underline"><input type="checkbox" /><svg>...</svg></label>
  <label class="toggle square" title="Strikethrough"><input type="checkbox" /><svg>...</svg></label>
</fieldset>

<!-- Insert -->
<fieldset role="group">
  <button class="ghost square" title="Image" onclick="document.getElementById('image-dialog').showModal()"><svg>...</svg></button>
  <button class="ghost square" title="Blockquote"><svg>...</svg></button>
  <button class="ghost square" title="Inline code"><svg>...</svg></button>
</fieldset>

<!-- Alignment & lists -->
<fieldset role="group">
  <button class="ghost square" title="Text alignment" popovertarget="align-menu"><svg>...</svg></button>
  <button class="ghost square" title="Bullet list"><svg>...</svg></button>
  <button class="ghost square" title="Numbered list"><svg>...</svg></button>
</fieldset>
<div id="align-menu" popover>
  <menu>
    <li><label><input type="radio" name="align" value="justifyLeft" checked /><svg>...</svg> Align left</label></li>
    <li><label><input type="radio" name="align" value="justifyCenter" /><svg>...</svg> Align center</label></li>
    <li><label><input type="radio" name="align" value="justifyRight" /><svg>...</svg> Align right</label></li>
  </menu>
</div>

<textarea></textarea>

<!-- Insert image dialog -->
<dialog id="image-dialog" closedby="any">
  <article class="card">
    <header><h3>Insert image</h3></header>
    <form id="image-form" method="dialog">
      <label class="file-drop">
        <input type="file" accept="image/*" />
        <span>Drag image here or choose from folder</span>
      </label>
    </form>
    <footer>
      <button type="button" class="outlined">Cancel</button>
      <button type="submit" form="image-form">Insert</button>
    </footer>
  </article>
</dialog>`,
              120,
            ),
          )}
        </div>
      </div>
      <dialog id="rte-image-dialog" closedby="any">
        <article class="card">
          <header>
            <h3>Insert image</h3>
          </header>
          <form
            id="rte-image-form"
            method="dialog"
            onsubmit="const file=this.querySelector('input[type=file]').files[0];if(file){const url=URL.createObjectURL(file);document.getElementById('rte-body').focus();document.execCommand('insertImage',false,url)}"
          >
            <label class="file-drop">
              <input type="file" accept="image/*" />
              <span>Drag image here or choose from folder</span>
            </label>
          </form>
          <footer
            style="display:flex;gap:var(--ui-spacing-2);justify-content:flex-end"
          >
            <button
              type="button"
              class="outlined"
              onclick="document.getElementById('rte-image-dialog').close()"
            >
              Cancel
            </button>
            <button type="submit" form="rte-image-form">Insert</button>
          </footer>
        </article>
      </dialog>
    `,
  });
}
