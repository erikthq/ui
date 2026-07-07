import { html, raw } from "hono/html";
import { icon } from "../icon";
import { colors } from "./color-swatches";

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

        document.querySelectorAll('input[name="color"]').forEach(function (b) {
          b.checked = b.value === stored;
        });
      }

      document.addEventListener("DOMContentLoaded", function () {
        syncSwatch();
      });

      window.updateColor = (form) => {
        const color = new FormData(form).get("color");

        document.documentElement.style.setProperty("--ui-primary", color);
        localStorage.setItem("ui-primary", color);
        syncSwatch();
      };
    </script>

    <button
      class="ghost"
      popovertarget="color-picker"
      style="anchor-name:--color-picker"
    >
      ${raw(icon("palette"))} <small>Theme</small>
    </button>

    <div id="color-picker" popover>
      <form onchange="updateColor(this)">
        <menu class="grid">
          ${colors.map(
            (c) => html`
              <li>
                <fieldset role="group" class="color-swatch">
                  <label>
                    <input
                      type="radio"
                      name="color"
                      value="${"display" in c
                        ? c.color
                        : `light-dark(${c.color}, color-mix(in oklab, ${c.color}, white 20%))`}"
                      style="--swatch-color: ${"display" in c
                        ? c.display
                        : c.color}"
                      aria-label="${c.name}"
                    />

                    <small>${c.name}</small>
                  </label>
                </fieldset>
              </li>
            `,
          )}
        </menu>
      </form>

      <form oninput="updateColor(this)">
        <menu>
          <li><hr /></li>
          <li class="color-picker-custom">
            <label class="field">
              <span>Custom</span>
              <input type="color" name="color" value="#6366f1" />
            </label>
          </li>
        </menu>
      </form>
    </div>

    <style>
      #color-picker {
        menu.grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.25rem;
        }

        li:not(.color-picker-custom),
        label {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        label {
          transition: background-color 200ms;
          padding: var(--ui-spacing-2);
          border-radius: 8px;

          &:has(*:hover) {
            background-color: var(--ui-neutral-100);
          }
        }

        input:not([type="color"]) {
          width: 2.5rem;
        }

        small {
          color: var(--ui-neutral-500);
        }
      }

      input[type="color"] {
        width: 100%;
      }
    </style>
  `;
}
