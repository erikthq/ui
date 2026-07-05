import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "ellipsis", label: "With ellipsis" },
  { id: "disabled", label: "Disabled edges" },
];

export async function PaginationPage(path: string) {
  return Layout({
    title: "Pagination",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Pagination</h1>
          <p>
            Page navigation using
            <code>&lt;nav class="pagination"&gt;</code> wrapping a
            <code>&lt;ul&gt;</code> of
            <code>&lt;a class="button ghost square"&gt;</code>s. Mark the active
            page with <code>aria-current="page"</code>.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <nav class="pagination" aria-label="Pagination">
            <ul>
              <li>
                <a
                  href="#"
                  class="button ghost"
                  aria-label="Previous page"
                >
                  ${raw(icon("chevron-left"))} Previous
                </a>
              </li>
              <li>
                <a href="#" class="button ghost square" aria-current="page">
                  1
                </a>
              </li>
              <li><a href="#" class="button ghost square">2</a></li>
              <li><a href="#" class="button ghost square">3</a></li>
              <li>
                <a href="#" class="button ghost" aria-label="Next page">
                  Next ${raw(icon("chevron-right"))}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav class="pagination" aria-label="Pagination">
  <ul>
    <li><a href="?page=0" class="button ghost" aria-label="Previous page">
    <svg><!-- chevron-left --></svg>
    Previous
    </a></li>
    <li><a href="?page=1" class="button ghost square" aria-current="page">1</a></li>
    <li><a href="?page=2" class="button ghost square">2</a></li>
    <li><a href="?page=3" class="button ghost square">3</a></li>
    <li><a href="?page=2" class="button ghost" aria-label="Next page">
    Next
    <svg><!-- chevron-right --></svg>
    </a></li>
  </ul>
</nav>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="ellipsis">With ellipsis</h2>
        <p>
          Drop a plain <code>&lt;li&gt;</code> with no
          <code>&lt;a class="button ghost square"&gt;</code> in the list to
          render a non-interactive ellipsis for truncated ranges.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <nav class="pagination" aria-label="Pagination">
            <ul>
              <li>
                <a
                  href="#"
                  class="button ghost square"
                  aria-label="Previous page"
                >
                  ${raw(icon("chevron-left"))}
                </a>
              </li>
              <li><a href="#" class="button ghost square">1</a></li>
              <li><span>&hellip;</span></li>
              <li><a href="#" class="button ghost square">4</a></li>
              <li>
                <a href="#" class="button ghost square" aria-current="page"
                  >5</a
                >
              </li>
              <li><a href="#" class="button ghost square">6</a></li>
              <li><span>&hellip;</span></li>
              <li><a href="#" class="button ghost square">10</a></li>
              <li>
                <a href="#" class="button ghost square" aria-label="Next page">
                  ${raw(icon("chevron-right"))}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav class="pagination" aria-label="Pagination">
  <ul>
    <li><a href="?page=1" class="button ghost square">1</a></li>
    <li><span>&hellip;</span></li>
    <li><a href="?page=4" class="button ghost square">4</a></li>
    <li><a href="?page=5" class="button ghost square" aria-current="page">5</a></li>
    <li><a href="?page=6" class="button ghost square">6</a></li>
    <li><span>&hellip;</span></li>
    <li><a href="?page=10" class="button ghost square">10</a></li>
  </ul>
</nav>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled edges</h2>
        <p>
          Links have no native <code>disabled</code> state, so add
          <code>aria-disabled="true"</code> when a page is at the start or end
          of the range. It blocks pointer interaction and dims the control while
          staying a real <code>&lt;a&gt;</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <nav class="pagination" aria-label="Pagination">
            <ul>
              <li>
                <a
                  href="#"
                  class="button ghost square"
                  aria-label="Previous page"
                  aria-disabled="true"
                >
                  ${raw(icon("chevron-left"))}
                </a>
              </li>
              <li>
                <a href="#" class="button ghost square" aria-current="page">
                  1
                </a>
              </li>
              <li><a href="#" class="button ghost square">2</a></li>
              <li><a href="#" class="button ghost square">3</a></li>
              <li>
                <a href="#" class="button ghost square" aria-label="Next page">
                  ${raw(icon("chevron-right"))}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<a class="button ghost square" aria-label="Previous page" aria-disabled="true">
  <svg><!-- chevron-left --></svg>
</a>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}
