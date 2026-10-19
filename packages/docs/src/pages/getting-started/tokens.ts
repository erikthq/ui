import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "border-radius", label: "Border radius" },
  { id: "font-size", label: "Font size" },
  { id: "shadow", label: "Shadow" },
];

// Token, what to use it for
const radii = [
  ["1", "The smallest rounding, for tiny marks and inner details."],
  ["2", "Small elements, like checkboxes, code, kbd and skeletons."],
  ["3", "Most controls, like buttons, inputs and menus."],
  ["4", "Small surfaces, like a group of controls."],
  ["5", "Surfaces, like cards, dialogs, drawers and popovers."],
  ["6", "Large surfaces."],
  ["7", "Large surfaces with a lot of padding."],
  ["8", "The largest rounding, for hero blocks and big panels."],
  ["full", "Pills and circles, like badges, avatars and switches."],
];

const fontSizes = [
  ["xs", "0.75rem", "1rem"],
  ["sm", "0.875rem", "1.25rem"],
  ["base", "1rem", "1.5rem"],
  ["lg", "1.125rem", "1.75rem"],
  ["xl", "1.25rem", "1.75rem"],
  ["2xl", "1.5rem", "2rem"],
  ["3xl", "1.875rem", "2.25rem"],
  ["4xl", "2.25rem", "2.5rem"],
  ["5xl", "3rem", "3rem"],
  ["6xl", "3.75rem", "3.75rem"],
  ["7xl", "4.5rem", "4.5rem"],
  ["8xl", "6rem", "6rem"],
  ["9xl", "8rem", "8rem"],
];

// Token, what to use it for
const shadows = [
  ["0", "No shadow. Start from it when a shadow animates in."],
  ["1", "Elements that sit just above the page, like a raised button."],
  ["2", "Small floating elements, like tooltips."],
  ["3", "Cards and menus."],
  ["4", "Popovers and drawers."],
  ["5", "Dialogs and anything else on top of everything."],
  ["inset-0", "No inset shadow. Start from it when a press animates in."],
  ["inset-1", "A light dent, like an input or a track."],
  ["inset-2", "A pressed button, or a well that holds content."],
  ["inset-3", "A deep well."],
];

export async function TokensPage(path: string) {
  return Layout({
    title: "Tokens",
    path,
    toc,
    content: html`
      <style>
        .tokens-radius,
        .tokens-shadow {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
          gap: var(--ui-spacing-6);
          width: 100%;
          padding: var(--ui-spacing-4);

          div {
            display: grid;
            place-items: center;
            aspect-ratio: 1;
            font-size: var(--ui-text-sm);
            color: var(--ui-neutral-500);
            background-color: var(--ui-neutral-0);
          }
        }

        .tokens-radius div {
          box-shadow: 0 0 0 1px inset var(--ui-neutral-300);
        }

        .tokens-shadow {
          div {
            border-radius: var(--ui-rounded-5);
          }

          .inset {
            background-color: var(--ui-neutral-100);
          }
        }

        /* A gray background, so a shadow also shows in dark mode */
        .tokens-shadow-preview {
          background-color: var(--ui-neutral-100);
        }
      </style>

      <div class="prose">
        <hgroup>
          <h1>Tokens</h1>
          <p>
            The custom properties the components use for corners, text and
            shadows. Use them in your own CSS, and your elements
            match the components next to them.
          </p>
        </hgroup>
        <p>
          This page shows which token to use for what. To change the values,
          see <a href="/getting-started/customization">Customization</a>.
        </p>

        <h2 id="border-radius">Border radius</h2>
        <p>
          Eight steps of corner rounding, and <code>--ui-rounded-full</code>
          for pills and circles. Use the step that the components of the same
          size use.
        </p>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Use for</th>
            </tr>
          </thead>
          <tbody>
            ${radii.map(
              ([name, use]) => html`
                <tr>
                  <td><code>--ui-rounded-${name}</code></td>
                  <td>${use}</td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
      <div class="example">
        <div class="preview">
          <div class="tokens-radius">
            ${radii.map(
              ([name]) => html`
                <div style="border-radius: var(--ui-rounded-${name})">
                  ${name}
                </div>
              `,
            )}
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.panel {
  border-radius: var(--ui-rounded-5);
}

.tag {
  border-radius: var(--ui-rounded-full);
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>
      <div class="prose">
        <p>
          When you put one rounded element inside another, the corners must
          match. Two steps next to each other are about <code>0.5em</code>
          apart. So pad the outer element by <code>0.5em</code> and give it one
          step more than the inner element. To use more padding, go up more
          steps. For <code>1em</code>, go up two steps.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div
            style="border-radius:var(--ui-rounded-8);padding: var(--ui-spacing-2);background:var(--ui-neutral-700)"
          >
            <div
              style="border-radius:var(--ui-rounded-7);padding: var(--ui-spacing-2);background:var(--ui-neutral-600)"
            >
              <div
                style="border-radius:var(--ui-rounded-6);padding: var(--ui-spacing-2);background:var(--ui-neutral-500)"
              >
                <div
                  style="border-radius:var(--ui-rounded-5);padding: var(--ui-spacing-2);background:var(--ui-neutral-400)"
                >
                  <div
                    style="border-radius:var(--ui-rounded-4);padding: var(--ui-spacing-2);background:var(--ui-neutral-300)"
                  >
                    <div
                      style="border-radius:var(--ui-rounded-3);padding: var(--ui-spacing-2);background:var(--ui-neutral-200)"
                    >
                      <div
                        style="border-radius:var(--ui-rounded-2);padding:var(--ui-spacing-2);background:var(--ui-neutral-100)"
                      >
                        <div
                          style="border-radius:var(--ui-rounded-1);padding:var(--ui-spacing-2);background:var(--ui-neutral-0); width: 100px; height: 50px;"
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
              `/* one step apart, padded by 0.5em */
.outer {
  border-radius: var(--ui-rounded-5);
  padding: 0.5em;
}

.inner {
  border-radius: var(--ui-rounded-4);
}

/* two steps apart, padded by 1em */
.wide-outer {
  border-radius: var(--ui-rounded-5);
  padding: 1em;
}

.wide-inner {
  border-radius: var(--ui-rounded-3);
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="font-size">Font size</h2>
        <p>
          Thirteen font sizes. In HTML, use the
          <a href="/components/text">Text</a> classes. They set the font size
          and a line height that fits it. In CSS, use the token and set the
          line height from the table yourself.
        </p>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Size</th>
              <th>Line height</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            ${fontSizes.map(
              ([size, value, leading]) => html`
                <tr>
                  <td><code>--ui-text-${size}</code></td>
                  <td><code>${value}</code></td>
                  <td><code>${leading}</code></td>
                  <td><code>.text-${size}</code></td>
                </tr>
              `,
            )}
          </tbody>
        </table>
        <p>
          The sizes use <code>rem</code>. So a size is always the same,
          wherever the element is on the page.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <p class="text-2xl">A heading in 2xl</p>
          <p class="text-sm">A caption in sm</p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<p class="text-2xl">A heading in 2xl</p>
<p class="text-sm">A caption in sm</p>

<style>
  .caption {
    font-size: var(--ui-text-sm);
    line-height: 1.25rem;
  }
</style>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="shadow">Shadow</h2>
        <p>
          Five shadows that lift an element off the page, and three inset
          shadows that press it in. The higher the element sits, the higher
          the step. The
          <a href="/getting-started/shadows">Shadows</a> page shows how to
          animate and stack them.
        </p>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Use for</th>
            </tr>
          </thead>
          <tbody>
            ${shadows.map(
              ([name, use]) => html`
                <tr>
                  <td><code>--ui-shadow-${name}</code></td>
                  <td>${use}</td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
      <div class="example">
        <div class="preview tokens-shadow-preview">
          <div class="tokens-shadow">
            ${shadows
              .filter(([name]) => name !== "0" && name !== "inset-0")
              .map(
                ([name]) => html`
                  <div
                    class="${name.startsWith("inset") ? "inset" : ""}"
                    style="box-shadow: var(--ui-shadow-${name})"
                  >
                    ${name}
                  </div>
                `,
              )}
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.card {
  box-shadow: var(--ui-shadow-3);
  transition: box-shadow 400ms var(--ease-glide);

  &:hover {
    box-shadow: var(--ui-shadow-4);
  }
}

.well {
  box-shadow: var(--ui-shadow-inset-2);
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
