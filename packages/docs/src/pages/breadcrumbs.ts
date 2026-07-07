import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [{ id: "default", label: "Default" }];

export async function BreadcrumbsPage(path: string) {
  return Layout({
    title: "Breadcrumbs",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Breadcrumbs</h1>
          <p>
            A <code>&lt;nav&gt;</code> with an ordered list of links showing
            the current page's position in a hierarchy. The separators are
            drawn with <code>::after</code>, no extra markup needed.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Mark the current page with <code>aria-current="page"</code> instead
          of a link.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <nav aria-label="Breadcrumb">
            <ol>
              <li><a href="#">Home</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Electronics</a></li>
              <li aria-current="page">Laptop</li>
            </ol>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/products/electronics">Electronics</a></li>
    <li aria-current="page">Laptop</li>
  </ol>
</nav>`),
          )}
        </div>
      </div>
    `,
  });
}
