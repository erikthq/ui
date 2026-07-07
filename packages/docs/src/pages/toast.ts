import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "placement", label: "Placement" },
  { id: "multiple", label: "Multiple" },
  { id: "dismissible", label: "Dismissible" },
];

export async function ToastPage(path: string) {
  return Layout({
    title: "Toast",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Toast</h1>
          <p>
            A <code>[popover]</code> promoted to the top layer, so it always
            renders above everything else on the page, no
            <code>z-index</code> needed. Open and close it declaratively with
            <code>popovertarget</code>, no JavaScript involved. Put an
            <a href="/components/alert">Alert</a> inside for the actual
            message.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Add the <code>toast</code> class to a <code>[popover]</code>
          element and trigger it with a <code>popovertarget</code> button.
          Left as the default <code>"auto"</code> popover mode, it
          light-dismisses on outside click or Escape, same as any other
          popover.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button popovertarget="toast-default">Show toast</button>
          <div id="toast-default" popover class="toast">
            <article role="status">
              ${raw(icon("info-circle"))}
              <strong>New features available</strong>
              <p>Check out our latest updates including dark mode support.</p>
            </article>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="my-toast">Show toast</button>

<div id="my-toast" popover class="toast">
  <article role="status">
    <svg><!-- icon --></svg>
    <strong>New features available</strong>
    <p>Check out our latest updates including dark mode support.</p>
  </article>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="placement">Placement</h2>
        <p>
          Use <code>data-placement</code> the same way as
          <a href="/components/popover">Popover</a>: a
          <code>"&lt;side&gt; &lt;side&gt;"</code> tuple like
          <code>"bottom right"</code>. Bare <code>"top"</code>,
          <code>"bottom"</code>, <code>"left"</code>, or
          <code>"right"</code> center the toast along that edge, and
          <code>"center"</code> centers it in the viewport. It defaults to
          <code>"bottom right"</code> when omitted.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem;flex-wrap:wrap">
          <button popovertarget="toast-top-left">Top left</button>
          <div id="toast-top-left" popover class="toast" data-placement="top left">
            <article role="status">
              ${raw(icon("info-circle"))}
              <strong>Top left</strong>
              <p>Anchored to the top left corner.</p>
            </article>
          </div>

          <button popovertarget="toast-top">Top</button>
          <div id="toast-top" popover class="toast" data-placement="top">
            <article role="status">
              ${raw(icon("info-circle"))}
              <strong>Top center</strong>
              <p>Centered along the top edge.</p>
            </article>
          </div>

          <button popovertarget="toast-center">Center</button>
          <div id="toast-center" popover class="toast" data-placement="center">
            <article role="status">
              ${raw(icon("info-circle"))}
              <strong>Center</strong>
              <p>Fades and scales in, dead center of the viewport.</p>
            </article>
          </div>

          <button popovertarget="toast-bottom-right">Bottom right</button>
          <div id="toast-bottom-right" popover class="toast" data-placement="bottom right">
            <article role="status">
              ${raw(icon("info-circle"))}
              <strong>Bottom right</strong>
              <p>The default placement.</p>
            </article>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div popover class="toast" data-placement="top left">...</div>
<div popover class="toast" data-placement="top">...</div>
<div popover class="toast" data-placement="center">...</div>
<div popover class="toast" data-placement="bottom right">...</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="multiple">Multiple</h2>
        <p>
          Use <code>popover="manual"</code> instead of the bare
          <code>popover</code> (which defaults to <code>"auto"</code>) so
          opening one toast doesn't close another. Toasts sharing the same
          <code>data-placement</code> automatically fan out behind each
          other as more of them open, up to 6 deep, purely with CSS
          <code>:has()</code> counting how many later same-placement toasts
          are currently open, no manual offsets and no JavaScript.
        </p>
        <p>
          This only works between toasts that are DOM siblings (unrelated
          content is fine in between, they don't need to be adjacent), since
          CSS has no way to compare document position across different
          parents. In practice that means keeping toasts together under one
          shared container, commonly placed once near the end of
          <code>&lt;body&gt;</code>, the same way most toast libraries work.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem;flex-wrap:wrap">
          <button popovertarget="toast-stack-1">Show toast 1</button>
          <button popovertarget="toast-stack-2">Show toast 2</button>
          <button popovertarget="toast-stack-3">Show toast 3</button>
          <button popovertarget="toast-stack-4">Show toast 4</button>
          <button popovertarget="toast-stack-5">Show toast 5</button>

          <div id="toast-stack-container">
            ${[1, 2, 3, 4, 5].map(
              (n) => html`
                <div
                  id="toast-stack-${n}"
                  popover="manual"
                  class="toast"
                  data-placement="bottom right"
                >
                  <article role="status">
                    ${raw(icon("info-circle"))}
                    <strong>Toast ${n}</strong>
                    <p>Fans out behind newer toasts automatically.</p>
                    <button
                      class="ghost square round"
                      aria-label="Remove"
                      popovertarget="toast-stack-${n}"
                      popovertargetaction="hide"
                    >
                      ${raw(icon("x"))}
                    </button>
                  </article>
                </div>
              `,
            )}
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="toast-1">Show toast 1</button>
<button popovertarget="toast-2">Show toast 2</button>
<!-- ...up to as many toasts as you need, up to 6 deep -->

<div id="toast-stack">
  <div id="toast-1" popover="manual" class="toast" data-placement="bottom right">
    <article role="status">
      <svg><!-- icon --></svg>
      <strong>Toast 1</strong>
      <p>Fans out behind newer toasts automatically.</p>
      <button
        class="ghost square round"
        aria-label="Remove"
        popovertarget="toast-1"
        popovertargetaction="hide"
      >
        <svg><!-- x icon --></svg>
      </button>
    </article>
  </div>
  <div id="toast-2" popover="manual" class="toast" data-placement="bottom right">
    ...
  </div>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="dismissible">Dismissible</h2>
        <p>
          Pair a <code>ghost square round</code> button with
          <code>popovertarget</code> and
          <code>popovertargetaction="hide"</code> to close it, fully
          declarative.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button popovertarget="toast-dismissible">Show toast</button>
          <div id="toast-dismissible" popover="manual" class="toast" data-placement="bottom">
            <article role="status" class="constructive">
              ${raw(icon("circle-check"))}
              <strong>Profile updated successfully</strong>
              <button
                class="ghost square round"
                aria-label="Remove"
                popovertarget="toast-dismissible"
                popovertargetaction="hide"
              >
                ${raw(icon("x"))}
              </button>
            </article>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div id="my-toast" popover="manual" class="toast" data-placement="bottom">
  <article role="status" class="constructive">
    <svg><!-- icon --></svg>
    <strong>Profile updated successfully</strong>
    <button
      class="ghost square round"
      aria-label="Remove"
      popovertarget="my-toast"
      popovertargetaction="hide"
    >
      <svg><!-- x icon --></svg>
    </button>
  </article>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
