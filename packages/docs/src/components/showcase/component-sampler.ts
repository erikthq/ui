import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function ComponentSampler() {
  return html`
    <article
      class="secondary"
      style="display:grid;gap:var(--ui-spacing-5)"
    >
      <div style="display:flex;flex-wrap:wrap;gap:var(--ui-spacing-2)">
        <button>Button ${raw(icon("arrow-right"))}</button>
        <button class="secondary">Secondary</button>
        <button class="outlined">Outline</button>
      </div>

      <label>
        <input placeholder="Name" aria-label="Name" />
        ${raw(icon("search", { attrs: "data-suffix" }))}
      </label>

      <textarea placeholder="Message" aria-label="Message" rows="4"></textarea>

      <div
        style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--ui-spacing-2)"
      >
        <div style="display:flex;gap:var(--ui-spacing-2)">
          <span class="badge">Badge</span>
          <span class="badge secondary">Secondary</span>
        </div>
        <div
          style="display:flex;align-items:center;gap:var(--ui-spacing-3)"
        >
          <input type="radio" name="sampler" checked aria-label="Option 1" />
          <input type="radio" name="sampler" aria-label="Option 2" />
          <input type="checkbox" checked aria-label="Checkbox" />
          <input type="checkbox" class="switch" checked aria-label="Switch" />
        </div>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--ui-spacing-2)"
      >
        <button
          class="outlined"
          onclick="document.getElementById('sampler-dialog').showModal()"
        >
          Alert dialog
        </button>
        <dialog id="sampler-dialog" role="alertdialog">
          <article>
            <header><strong>Discard changes?</strong></header>
            <p>Your unsaved changes will be lost.</p>
            <footer>
              <form method="dialog">
                <button class="destructive">Discard</button>
                <button class="outlined">Cancel</button>
              </form>
            </footer>
          </article>
        </dialog>

        <fieldset role="group">
          <button class="ghost">Button group</button>
          <button
            class="ghost square"
            aria-label="More options"
            data-tooltip
            popovertarget="sampler-menu"
          >
            ${raw(icon("chevron-up"))}
          </button>
        </fieldset>
        <div id="sampler-menu" popover data-placement="top right">
          <menu>
            <li><button class="ghost">Duplicate</button></li>
            <li><button class="ghost">Share</button></li>
          </menu>
        </div>
      </div>
    </article>
  `;
}
