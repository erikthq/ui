import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { html, raw } from "hono/html";
import { icon } from "../icon";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tablerDir = join(__dirname, "../../node_modules/@tabler/icons/icons");
const b = (process.env.BASE_URL ?? "/").replace(/\/$/, "");

export function IconsSearchDialog() {
  const outlineTotal = readdirSync(join(tablerDir, "outline")).filter((f) =>
    f.endsWith(".svg"),
  ).length;
  const filledTotal = readdirSync(join(tablerDir, "filled")).filter((f) =>
    f.endsWith(".svg"),
  ).length;
  const dataUrl = `${b}/icons.json`;
  const filledDataUrl = `${b}/icons-filled.json`;
  const metaUrl = `${b}/icons-meta.json`;
  const minisearchUrl = `${b}/minisearch.js`;

  return html`<dialog id="icons-dialog" class="icons-dialog" scroll-lock>
    <article>
      <header>
        <label>
          ${raw(icon("search", { size: 14, attrs: "data-prefix" }))}
          <input
            type="search"
            id="icon-search"
            placeholder="Search ${outlineTotal} icons..."
            autocomplete="off"
            autofocus
          />
          <span data-suffix id="icon-count" aria-live="polite">
            ${outlineTotal}
          </span>
        </label>
        <label
          style="display:flex;align-items:center;gap:0.5rem;white-space:nowrap"
        >
          <input type="checkbox" class="switch" id="icon-style-switch" />
          Filled
        </label>
      </header>
      <div class="icons-dialog-content">
        <div id="icons-hint" class="empty" style="margin: 25% 0;">
          ${raw(icon("search", { size: 24 }))}
          <h3>Search ${outlineTotal} icons</h3>
          <p>Type a name to find icons from the Tabler icon set.</p>
        </div>

        <div id="icons-empty" style="display:none" class="empty">
          ${raw(icon("search-off", { size: 24 }))}
          <h3>No icons found</h3>
          <p>Try a different search term.</p>
        </div>

        <ul class="icons-grid" id="icons-grid"></ul>
      </div>
    </article>
    <script type="module">
      import MiniSearch from "${minisearchUrl}";

      const URLS = { outline: "${dataUrl}", filled: "${filledDataUrl}" };
      const META_URL = "${metaUrl}";
      const TOTALS = { outline: ${outlineTotal}, filled: ${filledTotal} };
      const SVG_ATTRS = {
        outline:
          'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"',
        filled: 'fill="currentColor"',
      };

      const dialog = document.getElementById("icons-dialog");
      const search = document.getElementById("icon-search");
      const grid = document.getElementById("icons-grid");
      const count = document.getElementById("icon-count");
      const hint = document.getElementById("icons-hint");
      const empty = document.getElementById("icons-empty");
      const styleSwitch = document.getElementById("icon-style-switch");

      const cache = {},
        indexes = {},
        promises = {};
      let metaPromise;

      const tokenize = (s) => s.split(/[-\\s]+/).filter(Boolean);

      function fetchMeta() {
        if (!metaPromise) {
          metaPromise = fetch(META_URL)
            .then((r) => r.json())
            .catch(() => ({}));
        }
        return metaPromise;
      }

      function fetchData(style) {
        if (promises[style]) return promises[style];
        promises[style] = Promise.all([
          fetch(URLS[style]).then((r) => r.json()),
          fetchMeta(),
        ]).then(([json, meta]) => {
          cache[style] = json;
          const ms = new MiniSearch({
            fields: ["name", "tags", "category"],
            storeFields: ["name"],
            tokenize,
          });
          ms.addAll(
            Object.keys(json).map((name) => ({
              id: name,
              name,
              tags: meta[name]?.t ?? "",
              category: meta[name]?.c ?? "",
            })),
          );
          indexes[style] = ms;
        });
        return promises[style];
      }

      function currentStyle() {
        return styleSwitch.checked ? "filled" : "outline";
      }

      function render(q) {
        const style = currentStyle();
        const data = cache[style];
        const ms = indexes[style];
        if (!data || !ms) return;

        hint.style.display = q ? "none" : "";
        if (!q) {
          grid.innerHTML = "";
          empty.style.display = "none";
          count.textContent = TOTALS[style];
          return;
        }

        const results = ms.search(q, {
          prefix: true,
          fuzzy: 0.2,
          boost: { name: 6, tags: 2, category: 1 },
        });
        const attrs = SVG_ATTRS[style];
        empty.style.display = results.length === 0 ? "" : "none";
        count.textContent = results.length + " / " + TOTALS[style];
        grid.innerHTML = results
          .map(
            ({ id: name }) =>
              '<li class="icon-item" data-tooltip aria-label="' +
              name +
              '">' +
              '<button class="icon-copy-btn ghost square" data-icon="' +
              name +
              '" data-style="' +
              style +
              '">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" ' +
              attrs +
              ">" +
              data[name] +
              "</svg></button></li>",
          )
          .join("");
      }

      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
      });
      dialog.addEventListener("toggle", (e) => {
        if (e.newState !== "open") return;
        search.focus();
        fetchData(currentStyle());
      });

      search.addEventListener("input", function () {
        render(this.value.trim().toLowerCase());
      });

      styleSwitch.addEventListener("change", function () {
        const style = currentStyle();
        count.textContent = TOTALS[style];
        fetchData(style).then(() => render(search.value.trim().toLowerCase()));
      });

      grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".icon-copy-btn");
        if (!btn) return;
        const name = btn.dataset.icon;
        const style = btn.dataset.style;
        const paths = cache[style]?.[name];
        if (!paths) return;
        const attrs = SVG_ATTRS[style];
        const svg =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ' +
          attrs +
          ">" +
          paths +
          "</svg>";
        navigator.clipboard.writeText(svg).then(() => {
          btn.setAttribute("data-copied", "");
          setTimeout(() => btn.removeAttribute("data-copied"), 1500);
        });
      });
    </script>
  </dialog>`;
}
