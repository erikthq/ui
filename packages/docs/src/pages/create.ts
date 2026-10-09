import { html } from "hono/html";
import { Layout } from "../layout";
import { Showcase } from "../components/showcase";
import { Configurator } from "../components/configurator";

export async function CreatePage(path: string) {
  return Layout({
    title: "Create",
    path,
    wide: true,
    sidebar: Configurator(),
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
    `,
  });
}
