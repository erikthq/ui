import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "modal", label: "Modal" },
  { id: "with-header-footer", label: "With header & footer" },
  { id: "closedby", label: "closedby" },
  { id: "scroll-lock", label: "scroll-lock" },
];

export async function DialogPage(path: string) {
  return Layout({
    title: "Dialog",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Dialog</h1>
          <p>
            A native <code>&lt;dialog&gt;</code> element for popovers and modal
            overlays. Use an <code>&lt;article&gt;</code> inside for the card
            styling.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Use <code>.show()</code> for non-modal dialogs that don't block
          interaction with the rest of the page. Close with
          <code>&lt;form method="dialog"&gt;</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button onclick="document.getElementById('dialog-demo').show()">
            Open dialog
          </button>
          <dialog id="dialog-demo" closedby="any">
            <article>
              <p style="margin-bottom: 1rem;">This is a non-modal dialog.</p>
              <form method="dialog">
                <button class="outlined">Close</button>
              </form>
            </article>
          </dialog>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button onclick="document.getElementById('my-dialog').show()">
  Open dialog
</button>

<dialog id="my-dialog" closedby="any">
  <article>
    <p style="margin-bottom: 1rem;">This is a non-modal dialog.</p>
    <form method="dialog">
      <button class="outlined">Close</button>
    </form>
  </article>
</dialog>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="modal">Modal</h2>
        <p>
          Call <code>.showModal()</code> to open as a modal. It blocks
          interaction with the page and renders a backdrop.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button onclick="document.getElementById('modal-demo').showModal()">
            Open modal
          </button>
          <dialog id="modal-demo" closedby="any">
            <article>
              <p style="margin-bottom: 1rem">
                This is a modal dialog. It blocks the page behind it.
              </p>
              <form method="dialog" style="display:flex;gap:0.5rem">
                <button>Confirm</button>
                <button class="outlined">Cancel</button>
              </form>
            </article>
          </dialog>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button onclick="document.getElementById('my-modal').showModal()">
  Open modal
</button>

<dialog id="my-modal" closedby="any">
  <article>
    <p>This is a modal dialog.</p>
    <form method="dialog">
      <button>Confirm</button>
      <button class="outlined">Cancel</button>
    </form>
  </article>
</dialog>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-header-footer">With header &amp; footer</h2>
        <p>
          Use the card's <code>&lt;header&gt;</code> and
          <code>&lt;footer&gt;</code> for a structured layout with dividers.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button
            onclick="document.getElementById('modal-header-footer').showModal()"
          >
            Open modal
          </button>
          <dialog id="modal-header-footer" closedby="any">
            <article>
              <header>
                <strong>Confirm action</strong>
              </header>
              <p>Are you sure you want to continue? This cannot be undone.</p>
              <footer>
                <form method="dialog" style="display:flex;gap:0.5rem">
                  <button class="destructive">Delete</button>
                  <button class="outlined">Cancel</button>
                </form>
              </footer>
            </article>
          </dialog>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<dialog id="my-modal" closedby="any">
  <article>
    <header>
      <strong>Confirm action</strong>
    </header>
    <p>Are you sure you want to continue?</p>
    <footer>
      <form method="dialog">
        <button class="destructive">Delete</button>
        <button class="outlined">Cancel</button>
      </form>
    </footer>
  </article>
</dialog>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="closedby">closedby</h2>
        <p>
          The <code>closedby</code> attribute controls how a dialog can be
          dismissed.
        </p>
        <ul>
          <li>
            <code>closedby="any"</code> closes on outside click or
            <kbd>Escape</kbd>
          </li>
          <li>
            <code>closedby="closerequest"</code> closes on <kbd>Escape</kbd>
            only (default for modal)
          </li>
          <li>
            <code>closedby="none"</code> only closes via
            <code>&lt;form method="dialog"&gt;</code>
          </li>
        </ul>
      </div>
      <div class="example">
        <div class="preview">
          <button
            onclick="document.getElementById('closedby-none').showModal()"
          >
            closedby="none"
          </button>
          <dialog id="closedby-none" closedby="none">
            <article>
              <p style="margin-bottom:1rem">
                This dialog can only be closed via the button.
              </p>
              <form method="dialog">
                <button class="outlined">Close</button>
              </form>
            </article>
          </dialog>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<dialog closedby="none">...</dialog>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="scroll-lock">scroll-lock</h2>
        <p>
          Add the <code>scroll-lock</code> attribute to prevent the page from
          scrolling while the dialog is open.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button
            onclick="document.getElementById('scroll-lock-demo').showModal()"
          >
            Open modal
          </button>
          <dialog id="scroll-lock-demo" scroll-lock closedby="any">
            <article>
              <p style="margin-bottom:1rem">
                Page scrolling is locked while this dialog is open.
              </p>
              <form method="dialog">
                <button class="outlined">Close</button>
              </form>
            </article>
          </dialog>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<dialog scroll-lock closedby="any">...</dialog>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}
