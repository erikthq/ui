import { html, raw } from "hono/html";
import { icon } from "../icon";

export default () => html`
  <section class="home-showcase">
    <div class="showcase-cell">
      <button>Primary</button>
      <button class="secondary">Secondary</button>
      <button class="outlined">Outlined</button>
      <button class="ghost">Ghost</button>
    </div>

    <div class="showcase-cell">
      <label style="width:100%">
        ${raw(icon("search", { attrs: "data-prefix" }))}
        <input type="search" placeholder="Search..." />
        <kbd data-suffix>⌘K</kbd>
      </label>
    </div>

    <div class="showcase-cell">
      <fieldset role="group">
        <button class="ghost">Week</button>
        <button class="ghost">Month</button>
        <button class="ghost">Year</button>
      </fieldset>
    </div>

    <div class="showcase-cell">
      <div style="display:flex;gap:0.5rem;">
        <fieldset role="group">
          <label class="toggle square" aria-label="Align left" data-tooltip>
            <input type="radio" name="home-align" />
            ${raw(icon("align-left"))}
          </label>
          <label class="toggle square" aria-label="Align center" data-tooltip>
            <input type="radio" name="home-align" checked />
            ${raw(icon("align-center"))}
          </label>
          <label class="toggle square" aria-label="Align right" data-tooltip>
            <input type="radio" name="home-align" />
            ${raw(icon("align-right"))}
          </label>
        </fieldset>
        <fieldset role="group">
          <label class="toggle square" aria-label="Bold" data-tooltip>
            <input type="checkbox" />
            ${raw(icon("bold"))}
          </label>
          <label class="toggle square" aria-label="Italic" data-tooltip>
            <input type="checkbox" checked />
            ${raw(icon("italic"))}
          </label>
          <label class="toggle square" aria-label="Underline" data-tooltip>
            <input type="checkbox" />
            ${raw(icon("underline"))}
          </label>
        </fieldset>
      </div>
    </div>

    <div class="showcase-cell">
      <label><input type="checkbox" checked /> Notifications</label>
      <label><input type="checkbox" /> Dark mode</label>
      <label><input type="checkbox" checked /> Auto-save</label>
    </div>

    <div class="showcase-cell">
      <input
        type="range"
        value="60"
        style="width:100%;--pct:0.6"
        oninput="this.style.setProperty('--pct', (this.value - this.min) / (this.max - this.min || 100))"
      />
    </div>

    <div class="showcase-cell">
      <label
        style="display:flex;align-items:center;gap:0.75rem;width:100%;justify-content:space-between"
      >
        Wi-Fi <input type="checkbox" class="switch" checked />
      </label>
      <label
        style="display:flex;align-items:center;gap:0.75rem;width:100%;justify-content:space-between"
      >
        Bluetooth <input type="checkbox" class="switch" />
      </label>
    </div>

    <div class="showcase-cell">
      <button class="outlined" popovertarget="showcase-dropdown">
        Options
      </button>
      <div id="showcase-dropdown" popover>
        <menu>
          <li><button class="ghost">New File</button></li>
          <li><button class="ghost">New Window</button></li>
          <li>
            <button class="ghost" popovertarget="showcase-submenu">
              Open Recent
            </button>
            <div id="showcase-submenu" popover data-placement="right top">
              <menu>
                <li><button class="ghost">project.zip</button></li>
                <li><button class="ghost">notes.md</button></li>
                <li><button class="ghost">index.html</button></li>
              </menu>
            </div>
          </li>
        </menu>
      </div>
    </div>

    <div
      class="showcase-cell showcase-cell--tall showcase-cell--wide"
      style="gap:0"
    >
      <details open>
        <summary>Account</summary>
        <p style="color:var(--ui-neutral-500);font-size:0.875rem">
          Manage your account settings and preferences.
        </p>
      </details>
      <details>
        <summary>Privacy</summary>
        <p style="color:var(--ui-neutral-500);font-size:0.875rem">
          Control who can see your data and activity.
        </p>
      </details>
      <details>
        <summary>Notifications</summary>
        <p style="color:var(--ui-neutral-500);font-size:0.875rem">
          Choose what you want to be notified about.
        </p>
      </details>
    </div>

    <div class="showcase-cell showcase-cell--wide" style="align-items:stretch">
      <section
        class="tabs"
        style="display:grid;gap:1rem;align-items:start;align-self:start;"
      >
        <header role="tablist" aria-label="Settings" style="grid-row: 1;">
          <label>
            <input
              type="radio"
              name="home-tabs"
              id="home-tab-1"
              checked
              aria-controls="home-panel-1"
            />
            Profile
          </label>
          <label>
            <input
              type="radio"
              name="home-tabs"
              id="home-tab-2"
              aria-controls="home-panel-2"
            />
            Activity
          </label>
          <label>
            <input
              type="radio"
              name="home-tabs"
              id="home-tab-3"
              aria-controls="home-panel-3"
            />
            Settings
          </label>
        </header>
        <div
          role="tabpanel"
          id="home-panel-1"
          aria-labelledby="home-tab-1"
          tabindex="0"
          style="grid-column: 1; grid-row: 2;"
        >
          <p style="font-size:0.875rem;color:var(--ui-neutral-500);margin:0">
            Manage your public profile and personal details.
          </p>
        </div>
        <div
          role="tabpanel"
          id="home-panel-2"
          aria-labelledby="home-tab-2"
          tabindex="0"
          style="grid-column: 1; grid-row: 2;"
        >
          <p style="font-size:0.875rem;color:var(--ui-neutral-500);margin:0">
            Recent actions and events will appear here.
          </p>
        </div>
        <div
          role="tabpanel"
          id="home-panel-3"
          aria-labelledby="home-tab-3"
          tabindex="0"
          style="grid-column: 1; grid-row: 2;"
        >
          <p style="font-size:0.875rem;color:var(--ui-neutral-500);margin:0">
            Configure notifications, privacy, and preferences.
          </p>
        </div>
      </section>
    </div>

    <div class="showcase-cell">
      <label> <input type="radio" name="plan" checked /> Free </label>
      <label> <input type="radio" name="plan" /> Pro </label>
      <label> <input type="radio" name="plan" /> Team </label>
    </div>

    <div class="showcase-cell">
      <progress value="72" max="100" style="width:100%"></progress>
      <progress value="40" max="100" style="width:100%"></progress>
    </div>

    <div class="showcase-cell">
      <label class="toggle fill">
        <input type="checkbox" />
        ${raw(icon("bookmark"))} Bookmark
      </label>
      <label class="toggle fill">
        <input type="checkbox" checked />
        ${raw(icon("star"))} Star
      </label>
    </div>

    <div class="showcase-cell">
      <kbd>⌘</kbd><kbd>K</kbd>
      <hr style="width:100%;margin-block:0.5rem" />
      <kbd>⌃</kbd><kbd>⇧</kbd><kbd>P</kbd>
    </div>

    <div class="showcase-cell showcase-cell--wide">
      <table style="--cols: 1fr 1fr 1fr; width:100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alice</td>
            <td>Engineer</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Bob</td>
            <td>Designer</td>
            <td>Away</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="showcase-cell">
      <article style="width:100%">
        <header>Card title</header>
        <p style="font-size:0.875rem;color:var(--ui-neutral-500)">
          Some content inside a card with a header.
        </p>
        <footer style="display:flex;justify-content:flex-end;gap:0.5rem">
          <button class="ghost">Cancel</button>
          <button>Save</button>
        </footer>
      </article>
    </div>

    <div class="showcase-cell">
      <textarea
        placeholder="Leave a comment..."
        style="width:100%;resize:vertical"
      ></textarea>
    </div>

    <div class="showcase-cell">
      <menu style="width:180px">
        <li><button class="ghost">${raw(icon("pencil"))} Edit</button></li>
        <li>
          <button class="ghost">${raw(icon("copy"))} Duplicate</button>
        </li>
        <li><button class="ghost">${raw(icon("share"))} Share</button></li>
        <li><hr /></li>
        <li>
          <button class="ghost destructive">
            ${raw(icon("trash"))} Delete
          </button>
        </li>
      </menu>
    </div>

    <div class="showcase-cell">
      <button class="destructive">Delete</button>
    </div>

    <div class="showcase-cell">
      <span class="badge">Default</span>
      <span class="badge primary">Primary</span>
      <span class="badge secondary">Secondary</span>
      <span class="badge constructive">Constructive</span>
      <span class="badge destructive">Destructive</span>
      <span class="badge color1">Color 1</span>
      <span class="badge color2">Color 2</span>
      <span class="badge color3">Color 3</span>
      <span class="badge color4">Color 4</span>
      <span class="badge color5">Color 5</span>
      <span class="badge color6">Color 6</span>
      <span class="badge outlined">Outline</span>
    </div>

    <div class="showcase-cell">
      <button onclick="document.getElementById('showcase-modal').showModal()">
        Open modal
      </button>
      <dialog id="showcase-modal" closedby="any">
        <article>
          <header><strong>Confirm action</strong></header>
          <p>Are you sure you want to continue? This cannot be undone.</p>
          <footer style="display:flex;gap:0.5rem">
            <button class="destructive">Delete</button>
            <form method="dialog">
              <button class="outlined">Cancel</button>
            </form>
          </footer>
        </article>
      </dialog>
    </div>

    <div class="showcase-cell">
      <button aria-busy>Loading</button>
      <button class="outlined" aria-busy>Saving</button>
    </div>

    <div class="showcase-cell">
      <label class="field">
        <span>Light</span>
        <input id="showcase-primary-light" type="color" />
        <small>Primary color in light mode</small>
      </label>
      <hr />
      <label class="field">
        <span>Dark</span>
        <input id="showcase-primary-dark" type="color" />
        <small>Primary color in dark mode</small>
      </label>
      <script>
        (function () {
          function resolveColor(color, scheme) {
            var prev = document.documentElement.style.colorScheme;
            document.documentElement.style.colorScheme = scheme;
            var tmp = document.createElement("div");
            tmp.style.color = color;
            document.body.appendChild(tmp);
            var rgb = getComputedStyle(tmp).color.match(/d+/g)?.map(Number);
            document.body.removeChild(tmp);
            document.documentElement.style.colorScheme = prev;
            if (!rgb) return null;
            return (
              "#" +
              rgb
                .slice(0, 3)
                .map(function (n) {
                  return n.toString(16).padStart(2, "0");
                })
                .join("")
            );
          }

          var root = document.documentElement;
          var primary = getComputedStyle(root)
            .getPropertyValue("--ui-primary")
            .trim();
          var lightInput = document.getElementById("showcase-primary-light");
          var darkInput = document.getElementById("showcase-primary-dark");

          var lightVal = resolveColor(primary, "light") || "#3b82f6";
          var darkVal = resolveColor(primary, "dark") || "#3b82f6";
          lightInput.value = lightVal;
          darkInput.value = darkVal;

          lightInput.oninput = function () {
            lightVal = this.value;
            root.style.setProperty(
              "--ui-primary",
              "light-dark(" + lightVal + ", " + darkVal + ")",
            );
          };
          darkInput.oninput = function () {
            darkVal = this.value;
            root.style.setProperty(
              "--ui-primary",
              "light-dark(" + lightVal + ", " + darkVal + ")",
            );
          };
        })();
      </script>
    </div>
  </section>
`;
