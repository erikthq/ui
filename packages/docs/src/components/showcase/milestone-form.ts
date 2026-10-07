import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function MilestoneForm() {
  return html`
    <style>
      .showcase-milestone-form {
        form {
          > div {
            /* Half the width each, stacked when half is under 10rem */
            &:has(> .field) {
              grid-template-columns: repeat(
                auto-fit,
                minmax(max(10rem, calc(50% - var(--ui-spacing-4) / 2)), 1fr)
              );
            }
          }
        }
      }
    </style>

    <article class="tertiary showcase-milestone-form">
      <form onsubmit="event.preventDefault()" class="grid gap-8">
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

        <div class="grid gap-4">
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

        <div class="grid gap-4">
          <button>Create goal</button>
          <button type="button" class="outlined">Cancel</button>
        </div>
      </form>
    </article>
  `;
}
