import { html } from "hono/html";

export function SyncingAccounts() {
  return html`
    <style>
      .showcase-syncing-accounts {
        [aria-busy] {
          place-items: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: var(--ui-rounded-3);
          background: var(--ui-neutral-200);
          color: var(--ui-neutral-800);
        }
      }
    </style>

    <article class="secondary showcase-syncing-accounts">
      <section class="empty">
        <span class="grid" aria-busy="true" aria-label="Syncing"></span>

        <h4>Syncing your accounts</h4>
        <p>
          We're pulling in your latest transactions. This usually takes a few
          seconds.
        </p>

        <button class="outlined">Cancel</button>
      </section>
    </article>
  `;
}
