import { html, raw } from "hono/html";
import { icon } from "../icon";

export const fonts = [
  { name: "System", family: "" },
  { name: "Clarity City", family: '"Clarity City", system-ui' },
  { name: "DM Sans", family: '"DM Sans", system-ui' },
  { name: "Manrope", family: "Manrope, system-ui" },
  { name: "Martian Mono", family: '"Martian Mono", ui-monospace' },
  { name: "Rubik", family: "Rubik, system-ui" },
] as const;

export function FontPicker() {
  return html`
    <script>
      window.updateFont = (select) => {
        const family = select.value;

        document.documentElement.style.fontFamily = family;

        if (family) {
          localStorage.setItem("ui-font", family);
        } else {
          localStorage.removeItem("ui-font");
        }
      };

      document.addEventListener("DOMContentLoaded", () => {
        const select = document.querySelector("select[name='font']");
        if (select) select.value = localStorage.getItem("ui-font") ?? "";
      });
    </script>

    <select name="font" aria-label="Font" onchange="updateFont(this)">
      <button>
        <selectedcontent></selectedcontent>
        ${raw(icon("chevron-down"))}
      </button>
      ${fonts.map(
        (f) => html`
          <option value="${f.family}" style="font-family: ${f.family || "system-ui"}">
            ${f.name}
          </option>
        `,
      )}
    </select>
  `;
}
