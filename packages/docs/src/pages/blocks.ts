import { html } from "hono/html";
import { Layout, blocks, url } from "../layout";

export async function BlocksPage(path: string) {
  return Layout({
    title: "Blocks",
    path,
    wide: true,
    content: html`
      <div
        class="prose"
        style="text-align:center;padding:var(--ui-spacing-8) 0 var(--ui-spacing-8);max-width:640px;margin:0 auto"
      >
        <p class="badge">Ready-made UI patterns for @erikt/ui</p>

        <hgroup>
          <h1>Copy-paste blocks for real interfaces</h1>
          <p style="">
            Whole screens assembled from @erikt/ui components, with a few lines
            of extra CSS at most. Nothing else to install. Copy one and edit it.
          </p>
        </hgroup>

        <div
          style="display:flex;gap:var(--ui-spacing-3);justify-content:center"
        >
          <a href="${url(blocks[0].path)}" class="button">Browse blocks</a>
          <a href="${url("/components/button")}" class="button ghost">
            View components
          </a>
        </div>
      </div>
    `,
  });
}
