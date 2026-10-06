import { html, raw } from "hono/html";
import { icon } from "../../icon";

// Each menu is its own card, so each one is a separate item in the masonry grid
export function Menus() {
  return html`
    <article class="secondary" style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;align-items:start">
      <menu style="background: var(--ui-background-color);border: 1px solid var(--ui-neutral-200);border-radius: var(--ui-rounded-4);padding: var(--ui-spacing-1);">
        <li><small>Planning</small></li>
        <li>
          <button class="ghost">${raw(icon("file-text"))} Documents</button>
        </li>
        <li><button class="ghost">${raw(icon("wallet"))} Budget</button></li>
        <li>
          <button class="ghost">${raw(icon("chart-dots"))} Reports</button>
        </li>
        <li><button class="ghost">${raw(icon("target"))} Goals</button></li>
        <li>
          <button class="ghost">${raw(icon("calendar"))} Calendar</button>
        </li>
      </menu>

      <menu style="background: var(--ui-background-color);border: 1px solid var(--ui-neutral-200);border-radius: var(--ui-rounded-4);padding: var(--ui-spacing-1);">
        <li><small>Account</small></li>
        <li><button class="ghost">${raw(icon("user"))} Profile</button></li>
        <li>
          <button class="secondary" aria-current="page">
            ${raw(icon("credit-card"))} Billing
          </button>
        </li>
        <li>
          <button class="ghost">${raw(icon("bell"))} Notifications</button>
        </li>
        <li>
          <button class="ghost">${raw(icon("shield"))} Security</button>
        </li>
        <li><hr /></li>
        <li>
          <button class="ghost destructive">
            ${raw(icon("logout"))} Log out
          </button>
        </li>
      </menu>

      <menu style="background: var(--ui-background-color);border: 1px solid var(--ui-neutral-200);border-radius: var(--ui-rounded-4);padding: var(--ui-spacing-1);">
        <li>
          <button class="ghost">
            ${raw(icon("pencil"))} Edit <kbd>⌘E</kbd>
          </button>
        </li>
        <li>
          <button class="ghost">
            ${raw(icon("copy"))} Duplicate <kbd>⌘D</kbd>
          </button>
        </li>
        <li>
          <button class="ghost">
            ${raw(icon("share"))} Share <kbd>⌘S</kbd>
          </button>
        </li>
        <li><hr /></li>
        <li><small>Danger zone</small></li>
        <li>
          <button class="ghost destructive">
            ${raw(icon("trash"))} Delete <kbd>⌫</kbd>
          </button>
        </li>
      </menu>

      <menu style="background: var(--ui-background-color);border: 1px solid var(--ui-neutral-200);border-radius: var(--ui-rounded-4);padding: var(--ui-spacing-1);">
        <li><small>Sort by</small></li>
        <li>
          <label><input type="radio" name="menu-sort" checked /> Newest</label>
        </li>
        <li>
          <label><input type="radio" name="menu-sort" /> Oldest</label>
        </li>
        <li>
          <label><input type="radio" name="menu-sort" /> Name</label>
        </li>
        <li><hr /></li>
        <li><small>Columns</small></li>
        <li>
          <label><input type="checkbox" checked /> Name</label>
        </li>
        <li>
          <label><input type="checkbox" checked /> Size</label>
        </li>
        <li>
          <label><input type="checkbox" /> Modified</label>
        </li>
      </menu>
    </article>
  `;
}
