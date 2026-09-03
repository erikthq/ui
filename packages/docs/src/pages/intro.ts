import { html, raw } from "hono/html";
import { Layout, url } from "../layout";
import { highlight } from "../highlight";

const cdnUrl = `https://esm.sh/@erikt/ui`;

const toc = [
  { id: "usage", label: "Usage" },
  { id: "overview", label: "Overview" },
  { id: "ui-not-layout", label: "UI, not layout" },
  { id: "with-tailwind", label: "With Tailwind" },
  { id: "philosophy", label: "Philosophy" },
];

export async function IntroPage(path: string) {
  return Layout({
    title: "Introduction",
    path: "/introduction",
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>erikt/ui</h1>
          <p>A CSS reset and a small UI library in one stylesheet.</p>
        </hgroup>
        <p>
          erikt/ui is somewhere between a CSS reset and a classless CSS project. It
          styles native HTML elements directly, so plain semantic markup looks
          decent with no extra work. A small set of opt-in class names covers
          the things HTML can't express on its own.
        </p>
        <p>
          The core idea is borrowed from
          <a href="https://picocss.com" target="_blank" rel="noopener"
            >Pico CSS</a
          >. A stylesheet should improve the browser's defaults, not replace
          them. erikt/ui adds more components and a theming layer on top.
        </p>

        <h2 id="usage">Usage</h2>
        <p>Link the stylesheet from the CDN:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `<link rel="stylesheet" href="${cdnUrl}" />\n\n<!-- Optional: theme -->\n<style>\n  :root {\n    --ui-primary: light-dark(#111, #fefefe);\n  }\n</style>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <p>You can also download the CSS file and host it yourself:</p>
        <a href="${url("/ui.css")}" download="ui.css" class="button">
          Download ui.css
        </a>
      </div>

      <div class="prose">
        <h2 id="overview">Overview</h2>
        <p>
          erikt/ui styles native HTML elements directly, no class names required.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <fieldset role="group">
            <input type="text" placeholder="Input" style="width:180px" />
            <button>Button</button>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              '<fieldset role="group"><input type="text" placeholder="Input" />\n<button>Button</button></fieldset>',
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="ui-not-layout">UI, not layout</h2>
        <p>
          erikt/ui styles interactive elements (buttons, inputs, popovers) and
          leaves the page layout to you. <code>flex</code> and <code>grid</code>
          are already short to write and easy to read. Wrapping them in classes
          doesn't make them better.
        </p>
      </div>

      <div class="example">
        <div class="preview">
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:var(--ui-spacing-3);width:100%;max-width:400px;margin:auto"
          >
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="email" placeholder="Email" style="grid-column:1/-1" />
            <button style="grid-column:1/-1;justify-self:end">Submit</button>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem">\n  <input type="text" placeholder="First name" />\n  <input type="text" placeholder="Last name" />\n  <input type="email" placeholder="Email" style="grid-column:1/-1" />\n  <button style="grid-column:1/-1;justify-self:end">Submit</button>\n</div>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-tailwind">With Tailwind</h2>
        <p>
          erikt/ui and Tailwind get along. erikt/ui handles component styles,
          Tailwind handles layout and one-off utilities. Nothing collides,
          because erikt/ui wraps everything in <code>@layer ui {}</code> and any
          Tailwind utility beats it without the <code>!</code> prefix.
        </p>
        <p>
          Declare the layer order before importing either library. That puts
          Tailwind's reset below erikt/ui and its utilities above:
        </p>
      </div>

      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `/* main.css */\n@layer theme, base, ui-reset, ui, components, utilities;\n\n@import "https://esm.sh/@erikt/ui";\n@import "tailwindcss";`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="philosophy">Philosophy</h2>
        <p>
          erikt/ui is also where I try out new CSS. Anchor positioning,
          <code>@starting-style</code>, the Popover API and <code>:has()</code>
          all landed here first. The question I keep poking at is how far CSS
          gets before JavaScript is needed.
        </p>
        <p>
          So it leans on very new browser features and isn't meant for projects
          that need broad support. Treat it as an experiment rather than a
          production toolkit.
        </p>
      </div>
    `,
  });
}
