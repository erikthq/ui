import { html } from "hono/html";
import { sections, components, utilities, blocks, url } from "../layout";

const slug = (p: string) => "/" + p.split("/").pop();

export function SidebarNav(path: string) {
  const isGettingStarted = sections.some((s) => slug(s.path) === slug(path));
  const isComponents =
    path.startsWith("/components/") || path.startsWith("/utilities/");
  const isBlocks = path === "/blocks" || path.startsWith("/blocks/");

  if (isGettingStarted) {
    return html`
      <menu>
        <li><small>Sections</small></li>
        ${sections.map(
          (s) =>
            html`<li>
              <a
                class="button ghost"
                href="${url(s.path)}"
                ${slug(path) === slug(s.path) ? 'aria-current="page"' : ""}
              >
                ${s.label}
              </a>
            </li>`,
        )}
        <li>
          <a class="button ghost" href="${url("/llms.txt")}" target="_blank" rel="noopener">
            llms.txt
          </a>
        </li>
      </menu>
    `;
  }

  if (isComponents) {
    return html`
      <menu>
        <li><small>Components</small></li>
        ${components.map(
          (c) =>
            html`<li>
              <a
                class="button ghost"
                href="${url(c.path)}"
                ${path === c.path ? 'aria-current="page"' : ""}
                >${c.label}${c.badge
                  ? html` <span class="badge ${c.badgeClass ?? ""}">${c.badge}</span>`
                  : ""}</a
              >
            </li>`,
        )}
      </menu>

      <menu>
        <li><small>Utilities</small></li>
        ${utilities.map(
          (u) =>
            html`<li>
              <a
                class="button ghost"
                href="${url(u.path)}"
                ${path === u.path ? 'aria-current="page"' : ""}
                >${u.label}</a
              >
            </li>`,
        )}
      </menu>
    `;
  }

  if (isBlocks) {
    return html`
      <menu>
        <li><small>Blocks</small></li>
        ${blocks.map(
          (b) =>
            html`<li>
              <a
                class="button ghost"
                href="${url(b.path)}"
                ${path === b.path ? 'aria-current="page"' : ""}
              >
                ${b.label}
              </a>
            </li>`,
        )}
      </menu>
    `;
  }

  return html``;
}
