import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function ConnectBank() {
  return html`
    <style>

    </style>

    <article class="secondary showcase-connect-bank">
      <section class="empty">
        ${raw(icon("credit-card"))}

        <h3>Connect bank</h3>
        <p>
          Link your payout method to receive monthly royalty distributions
          automatically.
        </p>

        <button>Set up payouts</button>
      </section>
    </article>
  `;
}
