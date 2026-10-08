import { html, raw } from "hono/html";
import { icon } from "../icon";
import { sections, url } from "../layout";
import { SidebarNav } from "./sidebar-nav";

const slug = (p: string) => "/" + p.split("/").pop();

export function MobileMenu(path: string) {
  return html`
    <style>
      .docs-mobile-menu {
        flex-shrink: 0;

        @media (min-width: 769px) {
          display: none;
        }
      }

      #mobile-menu {
        height: stretch;
        margin: 0;
        max-width: none;

        .docs-mobile-menu-close {
          position: absolute;
          top: var(--ui-spacing-3);
          right: var(--ui-spacing-3);
          z-index: 1;
        }

        menu {
          padding-top: 2rem;

          menu {
            padding: var(--ui-spacing-4);

            + menu {
              padding-top: 0;
            }
          }
        }
      }
    </style>

    <button
      class="ghost square docs-mobile-menu"
      onclick="document.getElementById('mobile-menu').showModal()"
      aria-label="Open menu"
    >
      ${raw(icon("dots-vertical"))}
    </button>

    <dialog id="mobile-menu" closedby="any">
      <form method="dialog" class="docs-mobile-menu-close">
        <button class="ghost square" aria-label="Close menu">
          ${raw(icon("x"))}
        </button>
      </form>

      <article>
        <menu>
          <li>
            <a
              href="${url("/getting-started/introduction")}"
              class="button secondary text-xl"
              ${sections.some((s) => slug(s.path) === slug(path))
                ? html`aria-current="page"`
                : ""}
            >
              ${raw(icon("book"))} Getting started
            </a>
            ${SidebarNav(path, "getting-started")}
          </li>
          <li>
            <a
              href="${url("/components/button")}"
              class="button secondary text-xl"
              ${path.startsWith("/components/")
                ? html`aria-current="page"`
                : ""}
            >
              ${raw(icon("components"))} Components
            </a>
            ${SidebarNav(path, "components")}
          </li>
          <li>
            <a
              href="${url("/blocks")}"
              class="button secondary text-xl"
              ${path === "/blocks" || path.startsWith("/blocks/")
                ? html`aria-current="page"`
                : ""}
            >
              ${raw(icon("layout"))} Blocks
            </a>
            ${SidebarNav(path, "blocks")}
          </li>
          <li>
            <button
              class="secondary text-xl"
              onclick="document.getElementById('mobile-menu').close(); document.getElementById('icons-dialog').showModal()"
            >
              ${raw(icon("icons"))} Icons
            </button>
          </li>
        </menu>
      </article>
    </dialog>
  `;
}
