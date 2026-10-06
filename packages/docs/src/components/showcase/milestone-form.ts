import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function MilestoneForm() {
  return html`
    <article class="tertiary">
      <form
        style="display:grid;gap:var(--ui-spacing-8)"
        onsubmit="event.preventDefault()"
      >
        <hgroup>
          <h3>Set a new milestone</h3>
          <p>
            Define your financial target and we'll help you pace your savings.
          </p>
        </hgroup>

        <label class="field">
          <span>Goal name</span>
          <input placeholder="e.g. New car, home down payment" />
        </label>

        <div
          style="display:grid;grid-template-columns:1fr 1fr;gap:var(--ui-spacing-4)"
        >
          <div class="field">
            <span>Target amount</span>
            <label>
              
              <input type="number" placeholder="15000" min="0" />
              ${raw(icon("currency-dollar", { attrs: "data-suffix" }))}
            </label>
          </div>
          <label class="field">
            <span>Target date</span>
            <input type="month" value="2026-12" />
          </label>
        </div>

        <div style="display:grid;gap:var(--ui-spacing-4)">
          <button>Create goal</button>
          <button type="button" class="outlined">Cancel</button>
        </div>
      </form>
    </article>
  `;
}
