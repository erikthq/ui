import { html, raw } from "hono/html";
import { icon } from "../../icon";

const links = [
  {
    icon: "gauge",
    title: "Change transfer limit",
    text: "Adjust how much you can send from your balance.",
  },
  {
    icon: "calendar",
    title: "Scheduled transfers",
    text: "Set up a transfer to send at a later date.",
  },
  {
    icon: "arrows-exchange",
    title: "Direct debits",
    text: "Set up and manage regular payments.",
  },
  {
    icon: "refresh",
    title: "Recurring card payments",
    text: "Manage your repeated card transactions.",
  },
];

export function Payments() {
  return html`
    <style>
      .showcase-payments {
        a:has(> article) {
          text-decoration: none;

          article {
            transition: background-color 200ms var(--ease-glide);
          }

          &:hover > article {
            background-color: var(--ui-neutral-300);
          }
        }

        /* Chevron on the right, centered */
        [role="status"] > svg:last-child {
          grid-column: 3;
          grid-row: 1 / 3;
          align-self: center;
        }
      }
    </style>

    <article class="secondary showcase-payments grid gap-4">
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="#">Home</a></li>
          <li>
            <button
              class="ghost square"
              aria-label="Show path"
              data-tooltip
              popovertarget="showcase-payments-path"
            >
              ${raw(icon("dots"))}
            </button>
            <div id="showcase-payments-path" popover>
              <menu>
                <li><a href="#" class="button ghost">Account</a></li>
                <li><a href="#" class="button ghost">Settings</a></li>
              </menu>
            </div>
          </li>
          <li aria-current="page">Payments</li>
        </ol>
      </nav>

      <ul class="grid gap-3">
        ${links.map(
          (link) => html`
            <li>
              <a href="#">
                <article role="status" class="tertiary">
                  ${raw(icon(link.icon))}
                  <strong>${link.title}</strong>
                  <p>${link.text}</p>
                  ${raw(icon("chevron-right"))}
                </article>
              </a>
            </li>
          `,
        )}
      </ul>
    </article>
  `;
}
