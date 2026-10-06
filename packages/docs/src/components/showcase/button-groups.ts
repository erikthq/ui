import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function ButtonGroups() {
  return html`
    <div style="display:grid;gap:var(--ui-spacing-4)">
      <div style="display:flex;flex-wrap:wrap;gap:var(--ui-spacing-2)">
        <fieldset role="group">
          <button class="ghost square" aria-label="Go back" data-tooltip>
            ${raw(icon("arrow-left"))}
          </button>
        </fieldset>
        <fieldset role="group">
          <button class="ghost">Archive</button>
          <button class="ghost">Report</button>
        </fieldset>
        <fieldset role="group">
          <button class="ghost">Snooze</button>
          <button
            class="ghost square"
            aria-label="More"
            data-tooltip
            popovertarget="showcase-more-menu"
          >
            ${raw(icon("dots"))}
          </button>
        </fieldset>
        <div id="showcase-more-menu" popover>
          <menu>
            <li><button class="ghost">Mark as unread</button></li>
            <li><button class="ghost">Add label</button></li>
            <li><hr /></li>
            <li><button class="ghost destructive">Delete</button></li>
          </menu>
        </div>
      </div>

      <article role="status" class="constructive">
        ${raw(icon("info-circle"))}
        <strong>Profile updated successfully</strong>
        <button class="ghost square round" aria-label="Dismiss">
          ${raw(icon("x"))}
        </button>
      </article>

      <div
        style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--ui-spacing-2)"
      >
        <div style="display:flex;gap:var(--ui-spacing-2)">
          <fieldset role="group" aria-label="Pages">
            <button class="ghost square">1</button>
            <button class="ghost square">2</button>
            <button class="ghost square">3</button>
          </fieldset>
          <fieldset role="group" aria-label="Previous and next">
            <button class="ghost square" aria-label="Previous" data-tooltip>
              ${raw(icon("arrow-left"))}
            </button>
            <button class="ghost square" aria-label="Next" data-tooltip>
              ${raw(icon("arrow-right"))}
            </button>
          </fieldset>
        </div>

        <fieldset role="group">
          <button class="ghost">${raw(icon("robot"))} Copilot</button>
          <button
            class="ghost square"
            aria-label="Copilot options"
            data-tooltip
            popovertarget="showcase-copilot-menu"
          >
            ${raw(icon("chevron-down"))}
          </button>
        </fieldset>
        <div id="showcase-copilot-menu" popover>
          <menu>
            <li><button class="ghost">Explain code</button></li>
            <li><button class="ghost">Write tests</button></li>
            <li><button class="ghost">Fix bug</button></li>
          </menu>
        </div>
      </div>
    </div>
  `;
}
