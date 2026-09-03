import { html, raw } from "hono/html";
import { Layout, url } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-card", label: "With card" },
  { id: "with-menu", label: "With menu" },
  { id: "placement", label: "Placement" },
];

export async function PopoverPage(path: string) {
  return Layout({
    title: "Popover",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Popover</h1>
          <p>
            A floating panel anchored to a trigger using the native
            <code>popover</code> API and CSS anchor positioning.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Connect a <code>popovertarget</code> button to a
          <code>[popover]</code> element by matching IDs. The button acts as the
          CSS anchor. No extra markup.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" popovertarget="popover-demo">Open</button>
          <div id="popover-demo" popover style="padding: 1rem">
            <p>This is a popover.</p>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-popover">Open</button>

<div id="my-popover" popover>
  Content
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-card">With card</h2>
        <p>
          Use an <code>&lt;article&gt;</code> inside for structured content with
          header and footer sections.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" popovertarget="popover-card">Options</button>
          <div id="popover-card" popover>
            <article>
              <header>Settings</header>
              <div style="display:grid;gap:0.5rem">
                <label> <input type="checkbox" checked /> Notifications </label>
                <label> <input type="checkbox" /> Dark mode </label>
              </div>
              <footer>
                <button popovertarget="popover-card" popovertargetaction="hide">
                  Close
                </button>
              </footer>
            </article>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-popover">Options</button>

<div id="my-popover" popover>
  <article>
    <header>Settings</header>
    <div style="display:grid;gap:0.5rem">
      <label> <input type="checkbox" checked /> Notifications </label>
      <label> <input type="checkbox" /> Dark mode </label>
    </div>
    <footer>
      <button popovertarget="my-popover"
              popovertargetaction="hide">Close</button>
    </footer>
  </article>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-menu">With menu</h2>
        <p>
          Place a <code>&lt;menu&gt;</code> inside a <code>[popover]</code> to
          create a dropdown menu anchored to its trigger button. See the
          <a href="${url("/components/menu")}">Menu</a> page for more available
          variants.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button class="outlined" popovertarget="popover-menu">Options</button>
          <div id="popover-menu" popover>
            <menu>
              <li><button class="ghost">Edit</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-popover">Options</button>

<div id="my-popover" popover>
  <menu>
    <li><button class="ghost">Edit</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><button class="ghost">Share</button></li>
    <li><hr /></li>
    <li><button class="ghost destructive">Delete</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="placement">Placement</h2>
        <p>
          Use <code>data-placement</code> on the <code>[popover]</code> element
          to control which side it appears on and which edges align. The value
          is two space-separated words: side and alignment. Without
          <code>data-placement</code>, the popover appears below the trigger
          with automatic viewport fallbacks.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div
            style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center"
          >
            <button class="outlined" popovertarget="pop-bl">bottom left</button>
            <div
              id="pop-bl"
              popover
              data-placement="bottom left"
              style="padding:1rem;width:14rem"
            >
              <strong>bottom left</strong>
              <p
                style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--ui-neutral-500)"
              >
                Appears below the trigger, left edges aligned.
              </p>
            </div>

            <button class="outlined" popovertarget="pop-br">
              bottom right
            </button>
            <div
              id="pop-br"
              popover
              data-placement="bottom right"
              style="padding:1rem;width:14rem"
            >
              <strong>bottom right</strong>
              <p
                style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--ui-neutral-500)"
              >
                Appears below the trigger, right edges aligned.
              </p>
            </div>

            <button class="outlined" popovertarget="pop-tl">top left</button>
            <div
              id="pop-tl"
              popover
              data-placement="top left"
              style="padding:1rem;width:14rem"
            >
              <strong>top left</strong>
              <p
                style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--ui-neutral-500)"
              >
                Appears above the trigger, left edges aligned.
              </p>
            </div>

            <button class="outlined" popovertarget="pop-tr">top right</button>
            <div
              id="pop-tr"
              popover
              data-placement="top right"
              style="padding:1rem;width:14rem"
            >
              <strong>top right</strong>
              <p
                style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--ui-neutral-500)"
              >
                Appears above the trigger, right edges aligned.
              </p>
            </div>

            <button class="outlined" popovertarget="pop-lt">left top</button>
            <div
              id="pop-lt"
              popover
              data-placement="left top"
              style="padding:1rem;width:14rem"
            >
              <strong>left top</strong>
              <p
                style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--ui-neutral-500)"
              >
                Appears left of the trigger, top edges aligned.
              </p>
            </div>

            <button class="outlined" popovertarget="pop-lb">left bottom</button>
            <div
              id="pop-lb"
              popover
              data-placement="left bottom"
              style="padding:1rem;width:14rem"
            >
              <strong>left bottom</strong>
              <p
                style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--ui-neutral-500)"
              >
                Appears left of the trigger, bottom edges aligned.
              </p>
            </div>

            <button class="outlined" popovertarget="pop-rt">right top</button>
            <div
              id="pop-rt"
              popover
              data-placement="right top"
              style="padding:1rem;width:14rem"
            >
              <strong>right top</strong>
              <p
                style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--ui-neutral-500)"
              >
                Appears right of the trigger, top edges aligned.
              </p>
            </div>

            <button class="outlined" popovertarget="pop-rb">
              right bottom
            </button>
            <div
              id="pop-rb"
              popover
              data-placement="right bottom"
              style="padding:1rem;width:14rem"
            >
              <strong>right bottom</strong>
              <p
                style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--ui-neutral-500)"
              >
                Appears right of the trigger, bottom edges aligned.
              </p>
            </div>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-popover">Open</button>

<div id="my-popover" popover data-placement="right top">
  Content
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
