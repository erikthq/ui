import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function ComponentSampler() {
  return html`
    <style>
      .showcase-component-sampler {
        > div {
          flex-wrap: wrap;

          &:not(:first-child) {
            align-items: center;
            justify-content: space-between;
          }

          > div:has(input) {
            align-items: center;
          }
        }
      }
    </style>

    <article class="secondary showcase-component-sampler grid gap-5">
      <div class="flex gap-2">
        <button>Button ${raw(icon("arrow-right"))}</button>
        <button class="secondary">Secondary</button>
        <button class="outlined">Outline</button>
      </div>

      <label>
        <input placeholder="Name" aria-label="Name" />
        ${raw(icon("search", { attrs: "data-suffix" }))}
      </label>

      <textarea placeholder="Message" aria-label="Message" rows="4"></textarea>

      <div class="flex gap-2">
        <div class="flex gap-2">
          <span class="badge">Badge</span>
          <span class="badge secondary">Secondary</span>
        </div>
        <div class="flex gap-3">
          <input type="radio" name="sampler" checked aria-label="Option 1" />
          <input type="radio" name="sampler" aria-label="Option 2" />
          <input type="checkbox" checked aria-label="Checkbox" />
          <input type="checkbox" class="switch" checked aria-label="Switch" />
        </div>
      </div>

      <div class="flex gap-2">
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
