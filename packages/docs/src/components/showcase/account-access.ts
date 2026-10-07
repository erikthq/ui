import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function AccountAccess() {
  return html`
    <style>
      .showcase-account-access {
        .field > span {
          justify-content: space-between;
          align-items: baseline;

          a {
            color: var(--ui-neutral-500);
          }
        }

        > footer {
          align-items: stretch;
          border-top: 1px solid var(--ui-neutral-200);

          a {
            text-decoration: none;
          }
        }
      }
    </style>

    <article class="secondary showcase-account-access">
      <form id="account-access" class="grid gap-5" onsubmit="event.preventDefault()">
        <hgroup>
          <h3>Account access</h3>
          <p>Update your credentials or re-authenticate.</p>
        </hgroup>

        <label class="field">
          <span class="flex">Email address</span>
          <input type="email" value="artist@studio.inc" />
        </label>

        <label class="field">
          <span class="flex"
            >Current password <a href="#"><small>Forgot?</small></a></span
          >
          <input type="password" value="hunter2hunter" />
        </label>
      </form>

      <footer class="flex-col gap-4">
        <button form="account-access" class="secondary">
          ${raw(icon("lock"))} Update security
        </button>

        <a href="#" aria-label="Open danger zone">
          <article role="alert" class="destructive">
            ${raw(icon("alert-circle"))}
            <strong>Danger zone</strong>
            <p>Archive account and remove catalog</p>
            <span class="button ghost square round">
              ${raw(icon("arrow-right"))}
            </span>
          </article>
        </a>
      </footer>
    </article>
  `;
}
