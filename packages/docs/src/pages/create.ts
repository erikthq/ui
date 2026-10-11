import { html, raw } from "hono/html";
import { icon } from "../icon";
import { Layout } from "../layout";
import { Showcase } from "../components/showcase";
import { Configurator } from "../components/configurator";

export async function CreatePage(path: string) {
  return Layout({
    title: "Create",
    path,
    wide: true,
    // One form for both sizes: in the sidebar on desktop, in a drawer on mobile
    sidebar: html`
      <dialog
        id="configurator-drawer"
        class="drawer configurator-drawer"
        data-position="bottom"
        closedby="any"
        scroll-lock
      >
        <article>
          <header>
            <h2>Theme</h2>
            <form method="dialog">
              <button class="ghost square" aria-label="Close">${raw(icon("x"))}</button>
            </form>
          </header>
          ${Configurator()}
        </article>
      </dialog>
    `,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Create a theme</h1>
          <p>
            Start from a preset, or pick your own colors, radius and font in
            the sidebar. Every component below updates as you go.
          </p>
        </hgroup>
        <p>
          Set the primary and neutral colors once for light mode and once for
          dark mode. Each color scale is built from them, so one value changes
          every shade. Colors that are too light, too dark or too strong to
          work as a base are moved back into range.
        </p>
        <p>
          When it looks right, copy the CSS and paste it after the stylesheet.
          It sets the same variables on <code>:root</code>, so your whole site
          follows.
        </p>
      </div>

      ${Showcase({ scopedTheme: true })}

      <button
        class="configurator-open"
        onclick="document.getElementById('configurator-drawer').showModal()"
      >
        ${raw(icon("palette"))} Edit theme
      </button>
    `,
  });
}
