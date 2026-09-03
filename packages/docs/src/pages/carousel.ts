import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "images", label: "Images" },
  { id: "visible", label: "Multiple visible slides" },
  { id: "multiple", label: "Multiple carousels" },
];

const slideColors = [
  "var(--ui-color4-300)",
  "var(--ui-color1-300)",
  "var(--ui-color3-300)",
  "var(--ui-color6-300)",
  "var(--ui-color2-300)",
];

function slides(prefix: string) {
  return slideColors.map(
    (color, i) => html`
      <li>
        <div
          style="background:${color};aspect-ratio:16/9;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:600;color:var(--ui-neutral-950)"
        >
          ${prefix} ${i + 1}
        </div>
      </li>
    `,
  );
}

export async function CarouselPage(path: string) {
  return Layout({
    title: "Carousel",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Carousel</h1>
          <p>
            A scroll-snap carousel where the browser draws the arrows and the
            dots itself. No <code>&lt;button&gt;</code> markup, no JavaScript.
            It uses <code>::scroll-button()</code>, <code>::scroll-marker</code>
            and <code>scroll-marker-group</code>, all covered in the
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels"
              target="_blank"
              rel="noopener"
              >MDN CSS carousels guide</a
            >. They are very new and ship in Chromium only for now.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          A plain <code>&lt;ul class="carousel"&gt;</code> of
          <code>&lt;li&gt;</code> slides. The arrows and the dots below are not
          in the markup, the browser generates them. They disable themselves at
          the ends via <code>:disabled</code>, and
          <code>:target-current</code> tracks the active dot.
        </p>
        <p>
          Each <code>&lt;li&gt;</code> needs a <code>data-accname</code>
          attribute. An empty <code>::scroll-marker</code> content string leaves
          the dot with a blank accessible name, so the label comes from that
          attribute instead and <code>text-indent</code> pushes it out of
          sight.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%">
          <ul
            class="carousel"
            style="width:100%;max-width:480px;margin:auto"
          >
            ${slides("Slide")}
          </ul>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ul class="carousel">
  <li>Slide 1</li>
  <li>Slide 2</li>
  <li>Slide 3</li>
</ul>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="images">Images</h2>
        <p>
          Put an <code>&lt;img&gt;</code> directly inside each
          <code>&lt;li&gt;</code> and it's sized to fill the slide
          automatically.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%">
          <ul
            class="carousel"
            style="width:100%;max-width:480px;margin:auto"
          >
            <li data-accname="Slide 1">
              <img
                src="https://api.dicebear.com/9.x/glass/svg?seed=carousel-1"
                alt=""
              />
            </li>
            <li data-accname="Slide 2">
              <img
                src="https://api.dicebear.com/9.x/glass/svg?seed=carousel-2"
                alt=""
              />
            </li>
            <li data-accname="Slide 3">
              <img
                src="https://api.dicebear.com/9.x/glass/svg?seed=carousel-3"
                alt=""
              />
            </li>
          </ul>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ul class="carousel">
  <li data-accname="Slide 1"><img src="/slide-1.jpg" alt="" /></li>
  <li data-accname="Slide 2"><img src="/slide-2.jpg" alt="" /></li>
  <li data-accname="Slide 3"><img src="/slide-3.jpg" alt="" /></li>
</ul>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="visible">Multiple visible slides</h2>
        <p>
          Set <code>--visible</code> inline to show more than one slide at a
          time. A row of cards that still snaps a full page per swipe.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%">
          <ul
            class="carousel"
            style="width:100%;max-width:480px;margin:auto;--visible:3"
          >
            ${slides("Slide")}
          </ul>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ul class="carousel" style="--visible: 3">
  <li>Slide 1</li>
  <li>Slide 2</li>
  <li>Slide 3</li>
  <li>Slide 4</li>
  <li>Slide 5</li>
</ul>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="multiple">Multiple carousels</h2>
        <p>
          CSS anchor positioning places the buttons and dots. Each carousel
          scopes its own anchor, so putting several on one page needs no extra
          markup.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;flex-direction:column;gap:2rem">
          <ul
            class="carousel"
            style="width:100%;max-width:480px;margin:auto"
          >
            ${slides("A")}
          </ul>
          <ul
            class="carousel"
            style="width:100%;max-width:480px;margin:auto"
          >
            ${slides("B")}
          </ul>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ul class="carousel">
  <li data-accname="A1">A1</li>
  <li data-accname="A2">A2</li>
</ul>

<ul class="carousel">
  <li data-accname="B1">B1</li>
  <li data-accname="B2">B2</li>
</ul>`),
          )}
        </div>
      </div>
    `,
  });
}
