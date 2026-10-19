import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "scale", label: "Scale" },
  { id: "inset", label: "Inset" },
  { id: "animate", label: "Animate" },
  { id: "stack", label: "Stack" },
  { id: "color", label: "Color" },
];

const levels = [0, 1, 2, 3, 4, 5];
const insetLevels = [0, 1, 2, 3];

export async function ShadowsPage(path: string) {
  return Layout({
    title: "Shadows",
    path,
    toc,
    content: html`
      <style>
        /* A gray background, so a shadow also shows in dark mode */
        .shadow-preview {
          background-color: var(--ui-neutral-100);
        }

        .shadow-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
          gap: var(--ui-spacing-8);
          width: 100%;
          padding: var(--ui-spacing-4);
        }

        .shadow-sample {
          display: grid;
          place-items: center;
          aspect-ratio: 1;
          border-radius: var(--ui-rounded-5);
          background-color: var(--ui-neutral-0);
          color: var(--ui-neutral-500);
          font-size: var(--ui-text-sm);
          box-shadow: var(--shadow);
          transition: box-shadow 400ms var(--ease-glide);
        }

        .shadow-animate {
          width: 10rem;
          box-shadow: var(--ui-shadow-1);
          cursor: pointer;

          &:hover {
            box-shadow: var(--ui-shadow-4);
          }
        }

        .shadow-stack {
          width: 10rem;
          box-shadow:
            var(--ui-shadow-1),
            0 0 0 1px var(--ui-neutral-200);

          &:hover {
            box-shadow:
              var(--ui-shadow-4),
              0 0 0 4px var(--ui-primary-200);
          }
        }

        /* A well has the color of the surface it is pressed into */
        .shadow-well {
          background-color: var(--ui-neutral-100);
        }

        .shadow-press {
          width: 10rem;
          cursor: pointer;
          user-select: none;
          box-shadow: var(--ui-shadow-1), var(--ui-shadow-inset-0);
          transition: box-shadow 400ms var(--ease-glide);

          &:hover {
            box-shadow: var(--ui-shadow-3), var(--ui-shadow-inset-0);
          }

          &:active {
            box-shadow: var(--ui-shadow-1), var(--ui-shadow-inset-1);
          }
        }

        .shadow-color {
          width: 10rem;
          --ui-shadow-color: color-mix(
            in oklch,
            var(--ui-primary) 40%,
            transparent
          );
          box-shadow: var(--ui-shadow-3);
        }
      </style>

      <div class="prose">
        <hgroup>
          <h1>Shadows</h1>
          <p>
            Soft shadows made from four stacked layers. Every shadow has the
            same layers, so you can animate from one to another.
          </p>
        </hgroup>

        <h2 id="scale">Scale</h2>
        <p>
          <code>--ui-shadow-1</code> is the smallest and
          <code>--ui-shadow-5</code> the largest.
          <code>--ui-shadow-0</code> is no shadow.
        </p>
      </div>
      <div class="example">
        <div class="preview shadow-preview">
          <div class="shadow-grid">
            ${levels.map(
              (n) =>
                html`<div
                  class="shadow-sample"
                  style="--shadow: var(--ui-shadow-${n})"
                >
                  ${n}
                </div>`,
            )}
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.card {\n  box-shadow: var(--ui-shadow-3);\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="inset">Inset</h2>
        <p>
          <code>--ui-shadow-inset-1</code> to <code>--ui-shadow-inset-3</code>
          make a surface look pressed in, like a well.
          <code>--ui-shadow-inset-0</code> is no inset shadow.
        </p>
      </div>
      <div class="example">
        <div class="preview shadow-preview">
          <div class="shadow-grid">
            ${insetLevels.map(
              (n) =>
                html`<div
                  class="shadow-sample shadow-well"
                  style="--shadow: var(--ui-shadow-inset-${n})"
                >
                  ${n}
                </div>`,
            )}
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.well {\n  box-shadow: var(--ui-shadow-inset-2);\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="animate">Animate</h2>
        <p>
          Transition <code>box-shadow</code> between two tokens. To animate a
          shadow in from nothing, start at <code>--ui-shadow-0</code>, not
          <code>none</code>. Hover the card.
        </p>
      </div>
      <div class="example">
        <div class="preview shadow-preview">
          <div class="shadow-sample shadow-animate">Hover me</div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.card {\n  box-shadow: var(--ui-shadow-1);\n  transition: box-shadow 400ms var(--ease-glide);\n\n  &:hover {\n    box-shadow: var(--ui-shadow-4);\n  }\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="stack">Stack</h2>
        <p>
          Add your own layers after the token, separated by a comma. To keep
          the animation, give both states the same number of layers. Put
          <code>inset</code> layers in the same place in both states.
        </p>
      </div>
      <div class="example">
        <div class="preview shadow-preview">
          <div class="shadow-sample shadow-stack">Hover me</div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.card {\n  box-shadow:\n    var(--ui-shadow-1),\n    0 0 0 1px var(--ui-neutral-200);\n  transition: box-shadow 400ms var(--ease-glide);\n\n  &:hover {\n    box-shadow:\n      var(--ui-shadow-4),\n      0 0 0 4px var(--ui-primary-200);\n  }\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <p>
          To animate between a raised and a pressed state, use both kinds in
          both states. Only the levels change, so each layer has a partner to
          animate to. Press the card.
        </p>
      </div>
      <div class="example">
        <div class="preview shadow-preview">
          <div class="shadow-sample shadow-press">Press me</div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.card {box-shadow: var(--ui-shadow-1), var(--ui-shadow-inset-0);
          transition: box-shadow 400ms var(--ease-glide);

          &:hover {
            box-shadow: var(--ui-shadow-3), var(--ui-shadow-inset-0);
          }

          &:active {
            box-shadow: var(--ui-shadow-0), var(--ui-shadow-inset-1);
          }}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="color">Color</h2>
        <p>
          All layers get their color from <code>--ui-shadow-color</code>. Set
          it on <code>:root</code> or on a <code>[data-ui-theme]</code>
          element. The layers use the color you set there.
        </p>
      </div>
      <div class="example">
        <div class="preview shadow-preview">
          <div class="shadow-sample shadow-color" data-ui-theme>Tinted</div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `[data-ui-theme] {\n  --ui-shadow-color: color-mix(in oklch, var(--ui-primary) 40%, transparent);\n  box-shadow: var(--ui-shadow-3);\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>
    `,
  });
}
