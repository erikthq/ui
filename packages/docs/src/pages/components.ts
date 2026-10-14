import { html } from "hono/html";
import { Layout, components, utilities, url } from "../layout";

const toc = [
  { id: "components", label: "Components" },
  { id: "utilities", label: "Utilities" },
];

type Item = (typeof components)[number];

const list = (items: Item[]) => html`
  <ul class="docs-component-list">
    ${items.map(
      (item) => html`
        <li>
          <a href="${url(item.path)}">
            <strong class="text-lg"> ${item.label} </strong>
            ${item.badge
              ? html`<span class="badge ${item.badgeClass ?? ""}"
                  >${item.badge}</span
                >`
              : ""}
            <!-- <span>${item.description}</span> -->
          </a>
        </li>
      `,
    )}
  </ul>
`;

export async function ComponentsPage(path: string) {
  return Layout({
    title: "Components",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Components</h1>
          <p>Every component in @erikt/ui.</p>
        </hgroup>

        <div id="components"></div>
      </div>

      ${list(components)}

      <div class="prose">
        <h2 id="utilities">Utilities</h2>
      </div>

      ${list(utilities)}
    `,
  });
}
