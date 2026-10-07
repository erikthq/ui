import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function ClaimableBalance() {
  return html`
    <style>
      .showcase-claimable-balance {
        > div {
          justify-items: start;
        }

        article {
          justify-self: stretch;
          margin-top: var(--ui-spacing-3);
        }

        dd {
          text-align: end;
        }

        /* Total row under a line */
        dl > div:last-child {
          border-top: 1px solid var(--ui-neutral-300);
          padding-top: var(--ui-spacing-3);
          margin-top: var(--ui-spacing-2);
        }

        > footer {
          border-top: 1px solid var(--ui-neutral-200);
          color: var(--ui-neutral-600);
        }
      }
    </style>

    <article class="secondary showcase-claimable-balance">
      <div class="grid gap-3">
        <small>Claimable balance</small>
        <strong class="text-6xl">$0.00</strong>
        <span class="badge color2">
          ${raw(icon("circle", { filled: true }))} Pending setup
        </span>

        <article class="tertiary">
          <dl>
            <div>
              <dt>Net royalties</dt>
              <dd>$0.00</dd>
            </div>
            <div>
              <dt>Processing fee</dt>
              <dd>-$0.00</dd>
            </div>
            <div>
              <dt>Total ready to claim</dt>
              <dd><strong>$0.00 USD</strong></dd>
            </div>
          </dl>
        </article>
      </div>

      <footer>
        <p>
          Once your bank is connected, balances over $10.00 are automatically
          eligible for monthly distribution on the 15th of each month.
        </p>
      </footer>
    </article>
  `;
}
