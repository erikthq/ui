import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-separator", label: "With separator" },
  { id: "with-labels", label: "With section labels" },
  { id: "with-radios", label: "With radios" },
  { id: "with-checkboxes", label: "With checkboxes" },
  { id: "custom-select", label: "Custom select" },
  { id: "in-form", label: "In a form" },
];

export async function DropdownPage(path: string) {
  return Layout({
    title: "Dropdown",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Dropdown</h1>
          <p>
            A menu of actions anchored to a trigger, built with the native
            <code>popover</code> API and a <code>&lt;menu&gt;</code>.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" popovertarget="dropdown-default">
            Actions
          </button>
          <div id="dropdown-default" popover>
            <menu>
              <li><button class="ghost">Edit</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Share</button></li>
              <li><button class="ghost">Archive</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-dropdown">Actions</button>

<div id="my-dropdown" popover>
  <menu>
    <li><button class="ghost">Edit</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><button class="ghost">Share</button></li>
    <li><button class="ghost">Archive</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-separator">With separator</h2>
        <p>
          Use an <code>&lt;hr&gt;</code> inside a <code>&lt;li&gt;</code> to
          visually group actions.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" popovertarget="dropdown-separator">
            Actions
          </button>
          <div id="dropdown-separator" popover>
            <menu>
              <li><button class="ghost">Edit</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-dropdown">Actions</button>

<div id="my-dropdown" popover>
  <menu>
    <li><button class="ghost">Edit</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><button class="ghost">Share</button></li>
    <li><hr /></li>
    <li><button class="ghost destructive">Delete</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-labels">With section labels</h2>
        <p>
          A <code>&lt;li&gt;</code> whose only child is a text-only
          <code>&lt;small&gt;</code> is automatically styled as a section label.
          No extra class needed.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" popovertarget="dropdown-labels">
            File
          </button>
          <div id="dropdown-labels" popover>
            <menu>
              <li><small>Actions</small></li>
              <li><button class="ghost">New File</button></li>
              <li><button class="ghost">New Folder</button></li>
              <li><hr /></li>
              <li><small>Danger zone</small></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div id="my-dropdown" popover>
  <menu>
    <li><small>Actions</small></li>
    <li><button class="ghost">New File</button></li>
    <li><button class="ghost">New Folder</button></li>
    <li><hr /></li>
    <li><small>Danger zone</small></li>
    <li><button class="ghost destructive">Delete</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-radios">With radios</h2>
        <p>
          Radio inputs work inside a dropdown as they do anywhere. The checked
          state survives between opens, and CSS draws the checkmark. The popover
          stays open after a pick so the choice is visible before dismissing.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" popovertarget="dropdown-radios">
            Sort by
          </button>
          <div id="dropdown-radios" popover>
            <menu>
              <li>
                <label
                  ><input type="radio" name="sort" value="newest" checked />
                  Newest</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="sort" value="oldest" />
                  Oldest</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="sort" value="name" /> Name</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="sort" value="size" /> Size</label
                >
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-dropdown">Sort by</button>

<div id="my-dropdown" popover>
  <menu>
    <li><label>
      <input type="radio" name="sort" value="newest" checked /> Newest
    </label></li>
    <li><label>
      <input type="radio" name="sort" value="oldest" /> Oldest
    </label></li>
    <li><label>
      <input type="radio" name="sort" value="name" /> Name
    </label></li>
    <li><label>
      <input type="radio" name="sort" value="size" /> Size
    </label></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-checkboxes">With checkboxes</h2>
        <p>
          Checkboxes let more than one item be picked. Each shows an empty
          square until it's selected, then a filled one with a checkmark.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" popovertarget="dropdown-checkboxes">
            Columns
          </button>
          <div id="dropdown-checkboxes" popover>
            <menu>
              <li>
                <label><input type="checkbox" name="col" value="name" checked /> Name</label>
              </li>
              <li>
                <label><input type="checkbox" name="col" value="size" checked /> Size</label>
              </li>
              <li>
                <label><input type="checkbox" name="col" value="type" /> Type</label>
              </li>
              <li>
                <label><input type="checkbox" name="col" value="modified" /> Modified</label>
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-dropdown">Columns</button>

<div id="my-dropdown" popover>
  <menu>
    <li><label>
      <input type="checkbox" name="col" value="name" checked /> Name
    </label></li>
    <li><label>
      <input type="checkbox" name="col" value="size" checked /> Size
    </label></li>
    <li><label>
      <input type="checkbox" name="col" value="type" /> Type
    </label></li>
    <li><label>
      <input type="checkbox" name="col" value="modified" /> Modified
    </label></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="custom-select">Custom select</h2>
        <p>
          Use radio inputs inside <code>&lt;label&gt;</code>s to build a styled
          select. A checkmark appears on the chosen option via CSS. A small
          script updates the trigger text and closes the dropdown on pick.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button
            class="outlined"
            id="select-trigger"
            popovertarget="select-dropdown"
            style="min-width: 10rem; justify-content: space-between"
          >
            <span>Choose a fruit</span>
            ${raw(icon("chevron-down", { size: 14 }))}
          </button>
          <div
            id="select-dropdown"
            popover
            onchange="document.querySelector('[popovertarget='+this.id+'] span').textContent=event.target.closest('label').textContent;this.hidePopover()"
          >
            <menu>
              <li>
                <label
                  ><input type="radio" name="fruit" value="apple" />
                  Apple</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="fruit" value="banana" />
                  Banana</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="fruit" value="cherry" />
                  Cherry</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="fruit" value="mango" />
                  Mango</label
                >
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button
  popovertarget="my-select"
  style="min-width: 10rem; justify-content: space-between"
>
  <span>Choose a fruit</span>
  <svg><!-- chevron --></svg>
</button>

<div id="my-select" popover
  onchange="document.querySelector(\`[popovertarget=\${this.id}] span\`).textContent=event.target.closest('label').textContent;this.hidePopover()">
  <menu>
    <li><label>
      <input type="radio" name="fruit" /> Apple
    </label></li>
    <li><label>
      <input type="radio" name="fruit" /> Banana
    </label></li>
    <li><label>
      <input type="radio" name="fruit" /> Cherry
    </label></li>
  </menu>
</div>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="in-form">In a form</h2>
        <p>
          Wrap the trigger and popover in a <code>&lt;form&gt;</code> to
          participate in form submission. The <code>change</code> event bubbles
          up so you can handle it on the form.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <form onchange="alert('Selected: ' + event.target.value)">
            <button
              type="button"
              class="outlined"
              popovertarget="form-select-dropdown"
              style="min-width: 10rem; justify-content: space-between"
            >
              <span>Choose a color</span>
              ${raw(icon("chevron-down", { size: 14 }))}
            </button>
            <div
              id="form-select-dropdown"
              popover
              onchange="document.querySelector('[popovertarget='+this.id+'] span').textContent=event.target.closest('label').textContent;this.hidePopover()"
            >
              <menu>
                <li>
                  <label
                    ><input type="radio" name="color" value="red" /> Red</label
                  >
                </li>
                <li>
                  <label
                    ><input type="radio" name="color" value="green" />
                    Green</label
                  >
                </li>
                <li>
                  <label
                    ><input type="radio" name="color" value="blue" />
                    Blue</label
                  >
                </li>
              </menu>
            </div>
          </form>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<form onchange="alert('Selected: ' + event.target.value)">
  <button type="button" popovertarget="my-select"
    style="min-width: 10rem; justify-content: space-between">
    <span>Choose a color</span>
    <svg><!-- chevron --></svg>
  </button>
  <div id="my-select" popover
    onchange="document.querySelector(\`[popovertarget=\${this.id}] span\`).textContent=event.target.closest('label').textContent;this.hidePopover()">
    <menu>
      <li><label>
        <input type="radio" name="color" value="red" /> Red
      </label></li>
      <li><label>
        <input type="radio" name="color" value="green" /> Green
      </label></li>
      <li><label>
        <input type="radio" name="color" value="blue" /> Blue
      </label></li>
    </menu>
  </div>
</form>`),
          )}
        </div>
      </div>
    `,
  });
}
