import { html, raw } from "hono/html";
import { components, sections, blocks } from "../layout";
import { icon } from "../icon";

const b = (process.env.BASE_URL ?? "/").replace(/\/$/, "");

type SearchItem = {
  id: number;
  title: string;
  description: string;
  path: string;
  type: string;
  badgeClass: string;
};

export function SearchDialog() {
  const items: SearchItem[] = [
    ...sections.map((s, i) => ({
      id: i,
      title: s.label,
      description: s.description,
      path: b + s.path,
      type: "guide",
      badgeClass: "color2",
    })),
    ...components.map((c, i) => ({
      id: sections.length + i,
      title: c.label,
      description: c.description,
      path: b + c.path,
      type: "component",
      badgeClass: "color4",
    })),
    ...blocks.map((bl, i) => ({
      id: sections.length + components.length + i,
      title: bl.label,
      description: bl.description,
      path: b + bl.path,
      type: "block",
      badgeClass: "color5",
    })),
  ];

  // One icon per type, the same ones the header nav uses
  const icons = {
    guide: icon("book"),
    component: icon("components"),
    block: icon("layout"),
    arrow: icon("arrow-right", { attrs: 'class="search-result-arrow"' }),
  };

  return html`<dialog id="search-dialog" class="search-dialog" scroll-lock>
    <article>
      <header>
        <label>
          ${raw(icon("search", { attrs: "data-prefix" }))}
          <input
            type="search"
            id="search-input"
            role="combobox"
            aria-controls="search-list"
            aria-expanded="true"
            aria-autocomplete="list"
            placeholder="Search components, guides..."
            autocomplete="off"
            autofocus
          />
          <kbd data-suffix>Esc</kbd>
        </label>
      </header>
      <div id="search-results" class="search-results">
        <ul class="search-list" id="search-list" role="listbox" aria-label="Search results"></ul>
        <section class="empty" id="search-empty" hidden>
          ${raw(icon("search-off"))}
          <h3>No results</h3>
          <p>Try a different search term.</p>
        </section>
      </div>

      <footer class="search-hints">
        <span>
          <kbd aria-label="Up arrow">${raw(icon("arrow-up"))}</kbd>
          <kbd aria-label="Down arrow">${raw(icon("arrow-down"))}</kbd>
          Move
        </span>
        <span>
          <kbd aria-label="Enter">${raw(icon("corner-down-left"))}</kbd>
          Open
        </span>
        <span><kbd>Esc</kbd> Close</span>
      </footer>
    </article>
    <script type="application/json" id="search-data">
      ${raw(JSON.stringify({ items, icons }).replace(/</g, "\\u003c"))}
    </script>
    <script type="module" src="${b}/js/search-dialog.js"></script>
  </dialog>`;
}
