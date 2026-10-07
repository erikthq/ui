import { html, raw } from "hono/html";
import { icon } from "../icon";

export const radii = [
  { name: "None", scale: "0" },
  { name: "Small", scale: "0.5" },
  { name: "Default", scale: "1" },
  { name: "Medium", scale: "1.5" },
  { name: "Large", scale: "2" },
] as const;

export function RadiusPicker() {
  return html`
    <script>
      window.updateRadius = (select) => {
        const scale = select.value;

        if (scale === "1") {
          document.documentElement.style.removeProperty("--ui-rounded-scale");
          localStorage.removeItem("ui-rounded-scale");
        } else {
          document.documentElement.style.setProperty(
            "--ui-rounded-scale",
            scale,
          );
          localStorage.setItem("ui-rounded-scale", scale);
        }
      };

      document.addEventListener("DOMContentLoaded", () => {
        const select = document.querySelector("select[name='rounded-scale']");
        if (select)
          select.value = localStorage.getItem("ui-rounded-scale") ?? "1";
      });
    </script>

    <select
      name="rounded-scale"
      aria-label="Border radius"
      onchange="updateRadius(this)"
    >
      <button>
        <selectedcontent></selectedcontent>
        ${raw(icon("chevron-down"))}
      </button>
      ${radii.map(
        (r) => html`
          <option value="${r.scale}" ${r.scale === "1" ? "selected" : ""}>
            ${r.name}
          </option>
        `,
      )}
    </select>
  `;
}
