import { html, raw } from "hono/html";
import { icon } from "../../icon";

const ranges = ["1D", "7D", "1M", "1Y", "All"];

export function Tabs() {
  return html`
    <div style="display:grid;gap:var(--ui-spacing-6)">
      <div style="display:flex">
        <section class="tabs">
          <header role="tablist" aria-label="Time range">
            ${ranges.map(
              (range) => html`
                <label>
                  <input
                    type="radio"
                    name="showcase-range"
                    ${range === "1M" ? "checked" : ""}
                  />
                  ${range}
                </label>
              `,
            )}
          </header>
        </section>

        <fieldset role="group">
          <label class="toggle square" aria-label="Align left" data-tooltip>
            <input type="radio" name="align" />
            ${raw(icon("align-left"))}
          </label>
          <label class="toggle square" aria-label="Align center" data-tooltip>
            <input type="radio" name="align" checked />
            ${raw(icon("align-center"))}
          </label>
          <label class="toggle square" aria-label="Align right" data-tooltip>
            <input type="radio" name="align" />
            ${raw(icon("align-right"))}
          </label>
        </fieldset>
      </div>

      <section class="tabs">
        <header role="tablist" aria-label="Inbox" style="width:100%">
          <label style="flex:1;justify-content:center">
            <input type="radio" name="showcase-inbox" checked />
            ${raw(icon("message-circle"))} Chats
          </label>
          <label style="flex:1;justify-content:center">
            <input type="radio" name="showcase-inbox" />
            ${raw(icon("mail"))} Emails
          </label>
        </header>
      </section>
    </div>
  `;
}
