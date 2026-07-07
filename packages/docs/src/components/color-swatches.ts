import { html } from "hono/html";

export const colors = [
  { color: "dodgerblue", name: "Blue" },
  { color: "#7c3aed", name: "Violet" },
  { color: "#db2777", name: "Pink" },
  { color: "#dc2626", name: "Red" },
  { color: "#ea580c", name: "Orange" },
  { color: "#16a34a", name: "Green" },
  { color: "#0891b2", name: "Cyan" },
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
