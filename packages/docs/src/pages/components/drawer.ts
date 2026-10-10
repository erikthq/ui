import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "position", label: "Position" },
  { id: "with-header-footer", label: "With header & footer" },
];

export async function DrawerPage(path: string) {
  return Layout({
    title: "Drawer",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Drawer</h1>
            ${raw(titleActions(path, "drawer"))}
          </div>
          <p>
            A <code>&lt;dialog&gt;</code> variant that slides in from the edge
            of the screen instead of appearing centered. It's built entirely on
            top of the <a href="${url("/components/dialog")}">Dialog</a> component, just
            add the <code>drawer</code> class.
          </p>
        </hgroup>

        <h3>Composed of</h3>
        <dl class="composition">
          <dt><a href="${url("/components/dialog")}"><code>Dialog</code></a></dt>
          <dd>The modal it is built on</dd>
          <dt><a href="${url("/components/card")}"><code>Card</code></a></dt>
          <dd>The surface inside the drawer</dd>
        </dl>

        <h3>Works with</h3>
        <dl class="composition">
          <dt><a href="${url("/components/button")}"><code>Button</code></a></dt>
          <dd>Actions, like apply or close</dd>
        </dl>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("drawer"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
        <p>
          Add the <code>drawer</code> class to a <code>&lt;dialog&gt;</code>. By
          default it slides in from the right. Everything else, including
          <code>.showModal()</code>, <code>closedby</code>, and
          <code>scroll-lock</code>, works exactly like a regular dialog.
        </p>
        <p>
          The Drawer doesn't have a background color, so place an
          <a href="${url("/components/card")}">Card</a> as the first child.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button onclick="document.getElementById('drawer-demo').showModal()">
            Open drawer
          </button>
          <dialog id="drawer-demo" class="drawer" closedby="any">
            <article>
              <p style="margin-bottom: 1rem;">
                This is a drawer. It slides in from the right edge.
              </p>
              <form method="dialog">
                <button class="outlined">Close</button>
              </form>
            </article>
          </dialog>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button onclick="document.getElementById('my-drawer').showModal()">
  Open drawer
</button>

<dialog id="my-drawer" class="drawer" closedby="any">
  <article>
    <p style="margin-bottom: 1rem;">This is a drawer.</p>
    <form method="dialog">
      <button class="outlined">Close</button>
    </form>
  </article>
</dialog>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="position">Position</h2>
        <p>
          Use <code>data-position</code> to slide the drawer in from
          <code>left</code>, <code>right</code>, <code>top</code>, or
          <code>bottom</code>. It defaults to <code>right</code> when omitted.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap: 0.5rem; flex-wrap: wrap;">
          <button onclick="document.getElementById('drawer-left').showModal()">
            Left
          </button>
          <dialog
            id="drawer-left"
            class="drawer"
            data-position="left"
            closedby="any"
          >
            <article>
              <p style="margin-bottom: 1rem;">Slides in from the left.</p>
              <form method="dialog">
                <button class="outlined">Close</button>
              </form>
            </article>
          </dialog>

          <button onclick="document.getElementById('drawer-right').showModal()">
            Right
          </button>
          <dialog
            id="drawer-right"
            class="drawer"
            data-position="right"
            closedby="any"
          >
            <article>
              <p style="margin-bottom: 1rem;">Slides in from the right.</p>
              <form method="dialog">
                <button class="outlined">Close</button>
              </form>
            </article>
          </dialog>

          <button onclick="document.getElementById('drawer-top').showModal()">
            Top
          </button>
          <dialog
            id="drawer-top"
            class="drawer"
            data-position="top"
            closedby="any"
          >
            <article>
              <p style="margin-bottom: 1rem;">Slides in from the top.</p>
              <form method="dialog">
                <button class="outlined">Close</button>
              </form>
            </article>
          </dialog>

          <button
            onclick="document.getElementById('drawer-bottom').showModal()"
          >
            Bottom
          </button>
          <dialog
            id="drawer-bottom"
            class="drawer"
            data-position="bottom"
            closedby="any"
          >
            <article>
              <p style="margin-bottom: 1rem;">Slides in from the bottom.</p>
              <form method="dialog">
                <button class="outlined">Close</button>
              </form>
            </article>
          </dialog>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<dialog class="drawer" data-position="left">...</dialog>
<dialog class="drawer" data-position="right">...</dialog>
<dialog class="drawer" data-position="top">...</dialog>
<dialog class="drawer" data-position="bottom">...</dialog>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-header-footer">With header &amp; footer</h2>
        <p>
          Use the card's <code>&lt;header&gt;</code> and
          <code>&lt;footer&gt;</code> to pin controls to the top and bottom of
          the drawer, same as inside a regular dialog.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button
            onclick="document.getElementById('drawer-header-footer').showModal()"
          >
            Open drawer
          </button>
          <dialog id="drawer-header-footer" class="drawer" closedby="any">
            <article>
              <header>
                <strong>Filters</strong>
              </header>
              <p>Drawer content goes here.</p>
              <footer>
                <form method="dialog" style="display:flex;gap:0.5rem">
                  <button>Apply</button>
                  <button class="outlined">Cancel</button>
                </form>
              </footer>
            </article>
          </dialog>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<dialog class="drawer" closedby="any">
  <article>
    <header>
      <strong>Filters</strong>
    </header>
    <p>Drawer content goes here.</p>
    <footer>
      <form method="dialog">
        <button>Apply</button>
        <button class="outlined">Cancel</button>
      </form>
    </footer>
  </article>
</dialog>`),
          )}
        </div>
      </div>
    `,
  });
}
