import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "secondary", label: "Secondary" },
  { id: "tertiary", label: "Tertiary" },
  { id: "transparent", label: "Transparent" },
  { id: "with-header-footer", label: "With header & footer" },
];

export async function CardPage(path: string) {
  return Layout({
    title: "Card",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Card</h1>
          <p>
            A surface for grouping related content using the native
            <code>&lt;article&gt;</code> element.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article style="width:100%">
            <p>This is a simple card with some content inside.</p>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article>
  <p>This is a simple card with some content inside.</p>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="secondary">Secondary</h2>
        <p>
          Add <code>secondary</code> for a slightly recessed panel, useful
          for nesting a card inside another card.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article class="secondary" style="width:100%">
            <p>This is a secondary card variant.</p>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article class="secondary">
  <p>This is a secondary card variant.</p>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="tertiary">Tertiary</h2>
        <p>Add <code>tertiary</code> for even more contrast against the page.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article class="tertiary" style="width:100%">
            <p>This is a tertiary card variant.</p>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article class="tertiary">
  <p>This is a tertiary card variant.</p>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="transparent">Transparent</h2>
        <p>
          Add <code>transparent</code> for no background, suitable for
          overlays and cards with a custom background.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article class="transparent" style="width:100%">
            <p>This is a transparent card variant.</p>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article class="transparent">
  <p>This is a transparent card variant.</p>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-header-footer">With header &amp; footer</h2>
        <p>
          Add a <code>&lt;header&gt;</code> and/or <code>&lt;footer&gt;</code> for
          a structured layout with dividers.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <article style="width:100%">
            <header>Header</header>
            <div>Body</div>
            <footer>Footer</footer>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article>
  <header>Header</header>
  Body
  <footer>Footer</footer>
</article>`),
          )}
        </div>
      </div>
    `,
  });
}
