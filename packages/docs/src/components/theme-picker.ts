import { html, raw } from "hono/html";
import { icon } from "../icon";

export function ThemePicker() {
  return html`
    <script>
      localStorage.removeItem("ui-primary-dark");
      const storedColor = localStorage.getItem("ui-primary");
      if (storedColor) {
        document.documentElement.style.setProperty("--ui-primary", storedColor);
      }
      function syncSwatch() {
        var stored = localStorage.getItem("ui-primary");
        document.querySelectorAll(".color-swatch-btn").forEach(function (b) {
          b.classList.toggle("secondary", b.dataset.primary === stored);
          b.classList.toggle("ghost", b.dataset.primary !== stored);
        });
        document.querySelectorAll('input[name="color"]').forEach(function (b) {
          b.checked = b.value === stored;
        });
      }
      document.addEventListener("DOMContentLoaded", function () {
        syncSwatch();
      });
    </script>

    <button
      class="secondary"
      popovertarget="color-picker"
      style="anchor-name:--color-picker"
    >
      ${raw(icon("palette"))} <small>Theme</small>
    </button>

    <div id="color-picker" popover>
      <menu class="color-picker-popover">
        ${(
          [
            { color: "dodgerblue", name: "Blue" },
            { color: "#7c3aed", name: "Violet" },
            { color: "#db2777", name: "Pink" },
            { color: "#dc2626", name: "Red" },
            { color: "#ea580c", name: "Orange" },
            { color: "#16a34a", name: "Green" },
            { color: "#0891b2", name: "Cyan" },
          ] as const
        ).map(
          ({ color, name }) => html`
            <li>
              <button
                class="color-swatch-btn ghost"
                style="--swatch-color:${color}"
                aria-label="${name}"
                data-primary="light-dark(${color}, color-mix(in oklab, ${color}, white 20%))"
                onclick="
                const val = 'light-dark(${color}, color-mix(in oklab, ${color}, white 20%))';
                document.documentElement.style.setProperty('--ui-primary', val);
                localStorage.setItem('ui-primary', val);
                document.getElementById('color-picker').hidePopover();
                syncSwatch();
              "
              >
                <span class="circle"></span>
                <span class="name">${name}</span>
              </button>
            </li>
          `,
        )}
        <li>
          <button
            class="color-swatch-btn ghost"
            style="--swatch-color:linear-gradient(135deg, #111 50%, #fff 50%)"
            aria-label="Mono"
            data-primary="light-dark(#111111, #ffffff)"
            onclick="
              const val = 'light-dark(#111111, #ffffff)';
              document.documentElement.style.setProperty('--ui-primary', val);
              localStorage.setItem('ui-primary', val);
              document.getElementById('color-picker').hidePopover();
              syncSwatch();
            "
          >
            <span
              class="circle"
              style="box-shadow:0 0 0 1px var(--ui-neutral-300) inset"
            ></span>
            <span class="name">Mono</span>
          </button>
        </li>
        <li class="color-picker-custom">
          <label class="field">
            <span>Custom</span>
            <input
              type="color"
              value="#6366f1"
              oninput="
              document.documentElement.style.setProperty('--ui-primary', this.value);
              localStorage.setItem('ui-primary', this.value);
            "
            />
          </label>
        </li>
      </menu>
    </div>

    <style>
      .color-picker-popover {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.25rem;
      }

      .color-swatch-btn {
        flex-direction: column;

        .circle {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: var(--swatch-color);
          transition: scale 100ms;

          .color-swatch-btn:hover & {
            scale: 1.08;
          }
        }

        .name {
          font-size: 0.6875rem;
          color: var(--ui-neutral-600);
          white-space: nowrap;
        }
      }

      .color-picker-custom {
        grid-column: 1 / -1;
        border-top: 1px solid var(--ui-neutral-200);
        margin-top: 0.25rem;

        input[type="color"] {
          width: 100%;
        }
      }
    </style>
  `;
}
