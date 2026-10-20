import { html, raw } from "hono/html";
import { HomeLayout, url } from "../layout";
import { ColorSwatches } from "../components/color-swatches";
import { FontPicker } from "../components/font-picker";
import { RadiusPicker } from "../components/radius-picker";
import { Showcase } from "../components/showcase";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";
import { icon } from "../icon";

const link = '<link rel="stylesheet" href="https://esm.sh/@erikt/ui" />';

function getMainCssSize() {
  const path = "core/dist/ui.css";

  try {
    const cssPath = resolve(import.meta.dirname, "../../..", path);
    const css = readFileSync(cssPath);
    const compressed = gzipSync(css);
    return (compressed.byteLength / 1024).toFixed(1);
  } catch {
    return null;
  }
}

export async function HomePage(path: string) {
  const cssSize = getMainCssSize();

  return HomeLayout({
    title: "One stylesheet. That's it",
    path,
    content: html`
      <!-- <div class="home-background"></div> -->

      <section class="home-hero prose">
        <hgroup class="flex-col-center gap-4">
          <h1 class="text-3xl md:text-5xl lg:text-6xl">
            A UI library for building your next design system in a single CSS
            file
          </h1>
          <p class="md:text-xl">Write semantic HTML and it just looks good.</p>
        </hgroup>

        <div class="home-hero-actions flex-col-center gap-4">
          <copy-to-clipboard
            class="homepage-copy-link-button"
            value="${link}"
            x-data="{ copied: false }"
            @clipboard-copy="
              document.startViewTransition({ update: async () => { copied = true; await $nextTick() }, types: ['copy-link'] });
              setTimeout(() => document.startViewTransition({ update: async () => { copied = false; await $nextTick() }, types: ['copy-link'] }), 1500)
            "
          >
            <button
              class="secondary"
              style="background-color: var(--ui-background-color)"
              :class="copied && 'copied'"
            >
              ${raw(icon("code", { attrs: "data-prefix" }))}

              <span data-text-pre class="text-lg" :hidden="!copied" x-cloak>
                Copied to clipboard
              </span>

              <span data-text-post class="text-lg" :hidden="copied">
                <span class="hl-punct">&lt;</span
                ><span class="hl-tag">link</span>
                <span class="hl-attr">rel</span><span class="hl-punct">=</span
                ><span class="hl-string">"stylesheet"</span>
                <span class="hl-attr">href</span><span class="hl-punct">=</span
                ><span class="hl-string">"https://esm.sh/@erikt/ui"</span>
                <span class="hl-punct">/&gt;</span>
              </span>

              ${raw(icon("copy", { attrs: "data-suffix" }))}
            </button>
          </copy-to-clipboard>

          <copy-to-clipboard
            class="homepage-copy-button"
            value="${link}"
            x-data="{ copied: false }"
            @clipboard-copy="
              document.startViewTransition({ update: async () => { copied = true; await $nextTick() }, types: ['copy-skill'] });
              setTimeout(() => document.startViewTransition({ update: async () => { copied = false; await $nextTick() }, types: ['copy-skill'] }), 1500)
            "
          >
            <button
              class="secondary"
              style="background-color: var(--ui-background-color)"
              :class="copied && 'copied'"
            >
              ${raw(icon("currency-dollar", { attrs: "data-prefix" }))}

              <span data-text-pre class="text-lg" :hidden="!copied" x-cloak>
                Copied to clipboard
              </span>

              <span data-text-post class="text-lg" :hidden="copied">
                <span class="hl-tag">npx</span> skills add
                <span class="hl-string">erikthq/ui/packages/skill</span>
              </span>

              ${raw(icon("copy", { attrs: "data-suffix" }))}
            </button>
          </copy-to-clipboard>

          <style>
            /* The hero is a grid whose column grows to fit its content, so
               cap this item at the column's width to let the buttons shrink */
            .home-hero-actions {
              min-width: 0;
              max-width: 100%;
            }

            .homepage-copy-button,
            .homepage-copy-link-button {
              button {
                max-width: 100%;
                overflow: clip;
                white-space: nowrap;
              }

              svg {
                flex-shrink: 0;
              }

              [data-text-post] {
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              span {
                color: var(--ui-neutral-400);
              }

              .copied {
                span,
                svg {
                  color: var(--ui-constructive);
                }
              }

              .hl-punct {
                color: var(--ui-neutral-300);
              }

              .hl-tag {
                color: var(--ui-neutral-700);
              }

              .hl-attr {
                color: var(--ui-neutral-400);
              }

              .hl-string {
                color: var(--ui-neutral-900);
              }
            }

            /* Only name the parts of the button that started the transition,
               so the other button stays in the root snapshot. Names must be
               unique on the page, so let each element get its own and target
               them by class instead */
            :root:active-view-transition-type(copy-link)
              .homepage-copy-link-button,
            :root:active-view-transition-type(copy-skill)
              .homepage-copy-button {
              button,
              [data-prefix],
              [data-suffix],
              [data-text-pre],
              [data-text-post] {
                view-transition-name: match-element;
              }

              button {
                view-transition-class: copy-button;
                /* Nest the icon and text groups inside the button's group,
                   so the button can clip them */
                view-transition-group: contain;
              }

              [data-text-pre],
              [data-text-post] {
                view-transition-class: button-text;
              }
            }

            /* The group animates its size by default, but the snapshots
               inside it would stretch. Paint the button on the group instead */
            /* The shadow matches the hovered button, since the pointer is
               still on it after the click. The inset ring stands in for the
               button's border, so the group keeps the button's size */
            ::view-transition-group(.copy-button) {
              border-radius: var(--ui-rounded-3);
              box-shadow: var(--ui-shadow-shiny-3);
              background-color: var(--ui-background-color);
              overflow: clip;
            }

            ::view-transition-old(.copy-button),
            ::view-transition-new(.copy-button) {
              display: none;
            }

            /* Each text only exists on one side, so the outgoing one is
               always an old snapshot and the incoming one a new snapshot */
            ::view-transition-old(.button-text) {
              animation: button-text-out 250ms var(--ease-glide) both;
            }

            ::view-transition-new(.button-text) {
              animation: button-text-in 650ms var(--ease-glide) both;
            }

            @keyframes button-text-out {
              to {
                opacity: 0;
                translate: -2.5rem 0;
                filter: blur(2px);
              }
            }

            @keyframes button-text-in {
              from {
                opacity: 0;
                translate: 0rem 0;
                filter: blur(4px);
              }
            }
          </style>
        </div>
      </section>

      <section>
        <div class="home-swatches" style="display: none">
          <div class="flex-center gap-6">
            <span class="flex-center gap-3">
              <strong>Font Family:</strong> ${FontPicker()}
            </span>

            <span class="flex-center gap-3">
              <strong>Radius:</strong> ${RadiusPicker()}
            </span>
          </div>
          ${ColorSwatches()}
        </div>

        ${Showcase({ animate: true })}
      </section>

      <section class="home-cta prose">
        <hgroup>
          <h2 class="text-3xl md:text-4xl">Get started now</h2>
          <p class="md:text-lg">
            Add one stylesheet to your page and start writing HTML.
          </p>
        </hgroup>

        <a href="${url("/getting-started/introduction")}" class="button">
          Get started ${raw(icon("arrow-right"))}
        </a>
      </section>

      <footer class="home-footer prose">
        <p>
          Built by erikt. Code available on
          <a
            href="https://github.com/erikthq/ui"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>
      </footer>
    `,
  });
}
