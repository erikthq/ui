import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "start-with-the-component", label: "Start with the component" },
  { id: "global-properties", label: "Global properties" },
  { id: "component-properties", label: "Component properties" },
  { id: "scoping", label: "Scoping overrides" },
];

export async function ThemingPage(path: string) {
  return Layout({
    title: "Theming",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Theming</h1>
          <p>
            Two ways to change how @erikt/ui looks. Write plain CSS for the
            one element you want different, or set a custom property that every
            component reads.
          </p>
        </hgroup>

        <h2 id="start-with-the-component">Start with the component</h2>
        <p>
          Try this first. Find the element, write a normal rule for it, done.
          @erikt/ui sits inside <code>@layer ui</code>, and the cascade ranks
          unlayered styles above every layer, so your rule wins. No
          <code>!important</code>, no specificity games.
          <a href="/getting-started/customization">Customization</a> explains the
          layer in detail.
        </p>
        <p>
          An accordion underlines its summary on hover. One rule turns that off
          everywhere:
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <style>
            .plain-summary summary:hover {
              text-decoration-color: transparent;
            }
          </style>
          <details>
            <summary>Default, underlines on hover</summary>
            <div>Hover the row above to see the underline.</div>
          </details>
          <details class="plain-summary">
            <summary>Overridden, stays clean</summary>
            <div>Hover the row above. Nothing happens.</div>
          </details>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `summary:hover {
  text-decoration-color: transparent;
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <p>
          Put these rules in a stylesheet loaded after @erikt/ui. Anything the
          library styles is fair game.
        </p>

        <h2 id="global-properties">Global properties</h2>
        <p>
          Once the change applies to more than one element, a custom property
          is the shorter route. @erikt/ui defines them on
          <code>:root, :host</code>. Redefine one on <code>:root</code> and it
          reaches the whole page.
        </p>

        <h3>Shape</h3>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--ui-rounded</code></td>
              <td><code>2px</code></td>
              <td>
                The seed for corner rounding. <code>--ui-rounded-1</code>
                through <code>--ui-rounded-8</code> add a spacing step on top
                of it, so this one value reshapes the whole library.
                <a href="/getting-started/tokens#border-radius">Tokens</a>
                lists every step.
              </td>
            </tr>
            <tr>
              <td><code>--ui-rounded-scale</code></td>
              <td><code>1</code></td>
              <td>
                Multiplies every rounding step. <code>0</code> gives square
                corners everywhere.
              </td>
            </tr>
            <tr>
              <td><code>--ui-rounded-full</code></td>
              <td><code>calc((infinity * 1px) * var(--ui-rounded-scale))</code></td>
              <td>
                Pill and circle shapes, like badges, avatars and switches.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Spacing</h3>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--ui-spacing</code></td>
              <td><code>0.25em</code></td>
              <td>
                The base step. <code>--ui-spacing-1</code> through
                <code>--ui-spacing-8</code> multiply it, so raising this one
                value loosens every component. It is an <code>em</code> value,
                so spacing grows with font size.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Font size</h3>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--ui-text-xs</code> through <code>--ui-text-9xl</code>
              </td>
              <td><code>0.75rem</code> to <code>8rem</code></td>
              <td>
                The sizes behind the <a href="/components/text">Text</a>
                classes. Change one value to change that class everywhere.
                <a href="/getting-started/tokens#font-size">Tokens</a> lists
                every step.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Surface</h3>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--ui-background-color</code></td>
              <td><code>var(--ui-neutral-50)</code></td>
              <td>Page background.</td>
            </tr>
            <tr>
              <td><code>--ui-text-color</code></td>
              <td><code>var(--ui-neutral-950)</code></td>
              <td>Default text color.</td>
            </tr>
          </tbody>
        </table>

        <h3>Color seeds</h3>
        <p>
          Each seed generates a full scale, <code>50</code> through
          <code>950</code>. Change the seed and all eleven steps change with it.
          <a href="/getting-started/colors">Colors</a> renders every scale.
        </p>
        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--ui-primary</code></td>
              <td>
                <code>light-dark(var(--ui-primary-light), var(--ui-primary-dark))</code>
              </td>
              <td>Accent color. Buttons, focus rings, anything interactive.</td>
            </tr>
            <tr>
              <td><code>--ui-primary-light</code></td>
              <td><code>dodgerblue</code></td>
              <td>Accent used in light mode.</td>
            </tr>
            <tr>
              <td><code>--ui-primary-dark</code></td>
              <td><code>color-mix(in oklab, dodgerblue, white 20%)</code></td>
              <td>Accent used in dark mode.</td>
            </tr>
            <tr>
              <td><code>--ui-neutral</code></td>
              <td><code>#8b8c93</code></td>
              <td>Text, borders and backgrounds. Shift it warmer or cooler.</td>
            </tr>
            <tr>
              <td><code>--ui-constructive</code></td>
              <td><code>#5dbb55</code></td>
              <td>Success and confirmation states.</td>
            </tr>
            <tr>
              <td><code>--ui-destructive</code></td>
              <td><code>#ef5655</code></td>
              <td>Errors and destructive actions.</td>
            </tr>
            <tr>
              <td>
                <code>--ui-color1</code> through <code>--ui-color6</code>
              </td>
              <td>
                <code>crimson</code>, <code>gold</code>,
                <code>forestgreen</code>, <code>royalblue</code>,
                <code>slateblue</code>, <code>plum</code>
              </td>
              <td>Six accents for charts, tags and anything else.</td>
            </tr>
          </tbody>
        </table>

        <h3>Easings</h3>
        <p>
          Every transition reads one of <code>--ease-glide</code>,
          <code>--ease-snap</code> or <code>--ease-heavy</code>. Override those
          three and every animation in the library changes.
          <a href="/getting-started/easings">Easings</a> lists them next to the
          standard cubic-bezier curves.
        </p>

        <h2 id="component-properties">Component properties</h2>
        <p>
          A few components have their own properties. Set these on the
          component, not on <code>:root</code>.
        </p>
        <table class="align-left">
          <thead>
            <tr>
              <th>Component</th>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="/components/drawer">Drawer</a></td>
              <td><code>--border-radius</code></td>
              <td><code>var(--ui-rounded-5)</code></td>
              <td>
                Rounds the two corners facing into the page. The edge against
                the viewport stays square.
              </td>
            </tr>
            <tr>
              <td><a href="/components/timeline">Timeline</a></td>
              <td><code>--ui-timeline-dot</code></td>
              <td><code>0.75rem</code></td>
              <td>Diameter of the dot on each entry.</td>
            </tr>
            <tr>
              <td><a href="/components/timeline">Timeline</a></td>
              <td><code>--ui-timeline-ring</code></td>
              <td><code>2px</code></td>
              <td>Width of the ring around the dot.</td>
            </tr>
            <tr>
              <td><a href="/components/timeline">Timeline</a></td>
              <td><code>--ui-timeline-line</code></td>
              <td><code>1px</code></td>
              <td>Thickness of the line connecting the entries.</td>
            </tr>
            <tr>
              <td><a href="/components/timeline">Timeline</a></td>
              <td><code>--ui-timeline-gap</code></td>
              <td><code>var(--ui-spacing-6)</code></td>
              <td>Vertical space between entries.</td>
            </tr>
            <tr>
              <td><a href="/components/timeline">Timeline</a></td>
              <td><code>--ui-timeline-color</code></td>
              <td><code>var(--ui-primary)</code></td>
              <td>Color of the dot and the line.</td>
            </tr>
            <tr>
              <td><a href="/components/color-swatch">Color swatch</a></td>
              <td><code>--swatch-color</code></td>
              <td><code>var(--ui-neutral-300)</code></td>
              <td>The color a swatch shows.</td>
            </tr>
          </tbody>
        </table>

        <h2 id="scoping">Scoping overrides</h2>
        <p>
          Custom properties inherit. Where you set one decides how far it
          reaches:
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `/* the whole page */
:root {
  --ui-rounded-scale: 0;
}

/* one region */
.sidebar {
  --ui-rounded-3: 0;
}

/* one element */
dialog.drawer {
  --border-radius: 0;
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>
      <div class="prose">
        <p>
          None of this needs a build step or a config file. It is plain CSS,
          loaded after the stylesheet.
        </p>
      </div>
    `,
  });
}
