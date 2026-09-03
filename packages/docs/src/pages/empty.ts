import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-action", label: "With action" },
  { id: "with-link", label: "With link" },
  { id: "with-footer", label: "With footer" },
];

export async function EmptyPage(path: string) {
  return Layout({
    title: "Empty State",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Empty State</h1>
          <p class="lead">
            A placeholder for when there is nothing to show, using the
            <code>.empty</code> class.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="empty">
            ${raw(icon("shield", { size: 24 }))}
            <h3>No items yet</h3>
            <p>There's nothing here. Add something to get started.</p>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="empty">
  <svg><!-- icon --></svg>
  <h3>No items yet</h3>
  <p>There's nothing here. Add something to get started.</p>
</section>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-action">With action</h2>
        <p>Add a button or link to give the user a clear next step.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="empty">
            ${raw(icon("file-off", { size: 24 }))}
            <h3>No documents</h3>
            <p>Create your first document to get started.</p>
            <button>New document</button>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="empty">
  <svg><!-- icon --></svg>
  <h3>No documents</h3>
  <p>Create your first document to get started.</p>
  <button>New document</button>
</section>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-link">With link</h2>
        <p>Use an <code>&lt;a&gt;</code> when the action navigates somewhere.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="empty">
            ${raw(icon("photo-off", { size: 24 }))}
            <h3>No images uploaded</h3>
            <p>Visit the media library to upload and manage your images.</p>
            <a href="#" class="button">Go to media library</a>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="empty">
  <svg><!-- icon --></svg>
  <h3>No images uploaded</h3>
  <p>Visit the media library to upload and manage your images.</p>
  <a href="/media" class="button">Go to media library</a>
</section>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-footer">With footer</h2>
        <p>
          Use a <code>&lt;footer&gt;</code> when you need multiple actions.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="empty">
            ${raw(icon("search-off", { size: 24 }))}
            <h3>No results found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <footer>
              <button class="outlined">Clear filters</button>
              <button>New item</button>
            </footer>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="empty">
  <svg><!-- icon --></svg>
  <h3>No results found</h3>
  <p>Try adjusting your search or filters to find what you're looking for.</p>
  <footer>
    <button class="outlined">Clear filters</button>
    <button>New item</button>
  </footer>
</section>`),
          )}
        </div>
      </div>
    `,
  });
}
