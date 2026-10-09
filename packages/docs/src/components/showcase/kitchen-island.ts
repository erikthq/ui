import { html, raw } from "hono/html";
import { icon } from "../../icon";

const scenes = ["Cooking", "Dining", "Nightlight", "Focus"];

const sliders = [
  { icon: "sun", label: "Brightness", value: 52 },
  { icon: "temperature", label: "Color temp", value: 68 },
  { icon: "volume", label: "Volume", value: 32 },
  { icon: "stopwatch", label: "Fade", value: 0 },
];

export function KitchenIsland() {
  return html`
    <style>
      .showcase-kitchen-island {
        > div:first-child {
          justify-content: space-between;
          align-items: start;
        }

        [role="radiogroup"] {
          flex-wrap: wrap;
        }

        /* One row per slider: icon, name, range */
        label:has([type="range"]) {
          grid-template-columns: auto 1fr minmax(6rem, 50%);
          align-items: center;
          padding: var(--ui-spacing-3) var(--ui-spacing-4);
          border-radius: var(--ui-rounded-4);
          box-shadow: 0 0 0 1px var(--border-color, var(--ui-neutral-200)) inset;

          > svg {
            color: var(--ui-neutral-600);
          }
        }
      }
    </style>

    <article class="secondary showcase-kitchen-island grid gap-4">
      <div class="flex gap-4">
        <hgroup>
          <h3>Kitchen island</h3>
          <p>Hue color ambient</p>
        </hgroup>
        <input type="checkbox" class="switch" checked aria-label="Power" />
      </div>

      <div role="radiogroup" aria-label="Scene" class="flex gap-2">
        ${scenes.map(
          (scene, i) => html`
            <label class="toggle">
              <input type="radio" name="kitchen-scene" ${i === 0 ? "checked" : ""} />
              ${scene}
            </label>
          `,
        )}
      </div>

      ${sliders.map(
        (slider) => html`
          <label class="grid gap-3">
            ${raw(icon(slider.icon))}
            <strong>${slider.label}</strong>
            <input
              type="range"
              value="${slider.value}"
              style="--pct:${slider.value / 100}"
              oninput="this.style.setProperty('--pct', this.value / 100)"
            />
          </label>
        `,
      )}
    </article>
  `;
}
