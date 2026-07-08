import { html } from "hono/html";

export const colors = [
  { color: "dodgerblue", name: "Blue" },
  { color: "aquamarine", name: "Aquamarine" },
  { color: "lightgreen", name: "Lightgreen" },
  { color: "gold", name: "Gold" },
  { color: "orange", name: "Orange" },
  { color: "coral", name: "Coral" },
  { color: "lightpink", name: "Lightpink" },
  {
    color: "light-dark(#111111, #ffffff)",
    name: "Mono",
    display: "linear-gradient(135deg, #111 50%, #fff 50%)",
  },
] as const;

export function ColorSwatches() {
  return html`
    <form onchange="updateColor(this)">
      <fieldset role="group" class="color-swatch">
        ${colors.map(
          (c) => html`
            <input
              type="radio"
              name="color"
              value="${"display" in c
                ? c.color
                : `light-dark(${c.color}, color-mix(in oklab, ${c.color}, white 20%))`}"
              style="--swatch-color: ${"display" in c ? c.display : c.color}"
              aria-label="${c.name}"
            />
          `,
        )}
      </fieldset>
    </form>
  `;
}
