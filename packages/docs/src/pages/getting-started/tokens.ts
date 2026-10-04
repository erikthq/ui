import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [{ id: "border-radius", label: "Border radius" }];

export async function TokensPage(path: string) {
  return Layout({
    title: "Tokens",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Tokens</h1>
          <p>
            The custom properties every component reads. Set one on
            <code>:root</code> and the whole library follows.
          </p>
        </hgroup>

        <h2 id="border-radius">Border radius</h2>
        <p>
          Eight steps of corner rounding. <code>--ui-rounded</code> is the
          seed. Each step adds one spacing step on top of it, then multiplies
          the result by <code>--ui-rounded-scale</code>. Change the scale to
          make everything rounder or sharper.
        </p>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Used by</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--ui-rounded</code></td>
              <td><code>2px</code></td>
              <td>The seed. Every step below starts from it.</td>
            </tr>
            <tr>
              <td><code>--ui-rounded-scale</code></td>
              <td><code>1</code></td>
              <td>
                Multiplies every step. <code>0</code> gives square corners,
                <code>2</code> doubles the rounding.
              </td>
            </tr>
            <tr>
              <td><code>--ui-rounded-1</code></td>
              <td><code>calc(var(--ui-rounded) * var(--ui-rounded-scale))</code></td>
              <td></td>
            </tr>
            <tr>
              <td><code>--ui-rounded-2</code></td>
              <td><code>calc((var(--ui-rounded) + var(--ui-spacing-1)) * var(--ui-rounded-scale))</code></td>
              <td>Small elements, like checkboxes, code, kbd and skeletons.</td>
            </tr>
            <tr>
              <td><code>--ui-rounded-3</code></td>
              <td><code>calc((var(--ui-rounded) + var(--ui-spacing-2)) * var(--ui-rounded-scale))</code></td>
              <td>Most components, like buttons, inputs and menus.</td>
            </tr>
            <tr>
              <td><code>--ui-rounded-4</code></td>
              <td><code>calc((var(--ui-rounded) + var(--ui-spacing-3)) * var(--ui-rounded-scale))</code></td>
              <td></td>
            </tr>
            <tr>
              <td><code>--ui-rounded-5</code></td>
              <td><code>calc((var(--ui-rounded) + var(--ui-spacing-4)) * var(--ui-rounded-scale))</code></td>
              <td>Surfaces, like cards, dialogs, drawers and popovers.</td>
            </tr>
            <tr>
              <td><code>--ui-rounded-6</code></td>
              <td><code>calc((var(--ui-rounded) + var(--ui-spacing-5)) * var(--ui-rounded-scale))</code></td>
              <td></td>
            </tr>
            <tr>
              <td><code>--ui-rounded-7</code></td>
              <td><code>calc((var(--ui-rounded) + var(--ui-spacing-6)) * var(--ui-rounded-scale))</code></td>
              <td></td>
            </tr>
            <tr>
              <td><code>--ui-rounded-8</code></td>
              <td><code>calc((var(--ui-rounded) + var(--ui-spacing-7)) * var(--ui-rounded-scale))</code></td>
              <td></td>
            </tr>
            <tr>
              <td><code>--ui-rounded-full</code></td>
              <td><code>calc((infinity * 1px) * var(--ui-rounded-scale))</code></td>
              <td>
                Pill and circle shapes, like badges, avatars, switches, radios,
                sliders and progress bars.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <code>--ui-rounded-full</code> sits outside the steps. It rounds any
          element into a pill, or a circle when width and height match. The
          scale still applies, so <code>--ui-rounded-scale: 0</code> squares
          it too.
        </p>
        <p>
          At the default scale, two neighbouring steps differ by exactly
          <code>--ui-spacing-1</code>. Pad an element by
          <code>--ui-spacing-1</code> and give it the next step up, and its
          corners run parallel to the corners inside it.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div
            style="border-radius:var(--ui-rounded-8);padding: var(--ui-spacing-1);background:var(--ui-neutral-700)"
          >
            <div
              style="border-radius:var(--ui-rounded-7);padding: var(--ui-spacing-1);background:var(--ui-neutral-600)"
            >
              <div
                style="border-radius:var(--ui-rounded-6);padding: var(--ui-spacing-1);background:var(--ui-neutral-500)"
              >
                <div
                  style="border-radius:var(--ui-rounded-5);padding: var(--ui-spacing-1);background:var(--ui-neutral-400)"
                >
                  <div
                    style="border-radius:var(--ui-rounded-4);padding: var(--ui-spacing-1);background:var(--ui-neutral-300)"
                  >
                    <div
                      style="border-radius:var(--ui-rounded-3);padding: var(--ui-spacing-1);background:var(--ui-neutral-200)"
                    >
                      <div
                        style="border-radius:var(--ui-rounded-2);padding:var(--ui-spacing-1);background:var(--ui-neutral-100)"
                      >
                        <div
                          style="border-radius:var(--ui-rounded-1);padding:var(--ui-spacing-1);background:var(--ui-neutral-0); width: 100px; height: 50px;"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.outer {
  border-radius: var(--ui-rounded-3);
  padding: var(--ui-spacing-1);
}

.inner {
  border-radius: var(--ui-rounded-2);
}

/* any gap works, as long as the steps match */
.wide-outer {
  border-radius: var(--ui-rounded-5);
  padding: var(--ui-spacing-3);
}

.wide-inner {
  border-radius: var(--ui-rounded-2);
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>
      <div class="prose">
        <p>
          Set <code>--ui-rounded-scale</code> on <code>:root</code> to change
          the roundness of the whole library. The steps are computed on
          <code>:root</code>, so setting the scale or the seed on a smaller
          element does nothing. To change one area, set the steps themselves.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `/* the whole page */
:root {
  --ui-rounded-scale: 1.5; /* rounder */
}

/* square corners everywhere */
:root {
  --ui-rounded-scale: 0;
}

/* one region */
.sidebar {
  --ui-rounded-3: 0;
  --ui-rounded-5: 0;
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>
    `,
  });
}
