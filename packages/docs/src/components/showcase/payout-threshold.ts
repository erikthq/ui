import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function PayoutThreshold() {
  return html`
    <article class="secondary" style="position:relative">
      <button
        class="secondary round"
        aria-label="Close"
        style="position:absolute;top:var(--ui-spacing-3);right:var(--ui-spacing-3)"
      >
        ${raw(icon("x"))}
      </button>

      <form
        style="display:grid;gap:var(--ui-spacing-5)"
        onsubmit="event.preventDefault()"
      >
        <hgroup style="padding-inline-end:var(--ui-spacing-8)">
          <h3>Payout threshold</h3>
          <p>Set the minimum balance required before a payout is triggered.</p>
        </hgroup>

        <label class="field">
          <span>Preferred currency</span>
          <select>
            <button>
              <selectedcontent></selectedcontent>
              ${raw(icon("chevron-down"))}
            </button>
            <option>USD, United States Dollar</option>
            <option>EUR, Euro</option>
            <option>GBP, British Pound</option>
            <option>SEK, Swedish Krona</option>
          </select>
        </label>

        <label class="field">
          <span
            style="display:flex;justify-content:space-between;align-items:baseline"
          >
            Minimum payout amount
            <output style="font-size:1.5em;font-weight:600">$2500</output>
          </span>
          <input
            type="range"
            min="50"
            max="10000"
            step="50"
            value="2500"
            style="--pct:${(2500 - 50) / (10000 - 50)}"
            oninput="this.style.setProperty('--pct', (this.value - this.min) / (this.max - this.min)); this.previousElementSibling.querySelector('output').value = '$' + this.value"
          />
          <span
            style="display:flex;justify-content:space-between;color:var(--ui-neutral-500)"
          >
            <small>$50 (min)</small>
            <small>$10,000 (max)</small>
          </span>
        </label>

        <label class="field">
          <span>Notes</span>
          <textarea
            rows="4"
            placeholder="Add any notes for this payout configuration..."
          ></textarea>
        </label>

        <button>Save threshold</button>
      </form>
    </article>
  `;
}
