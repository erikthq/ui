import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { apiReference } from "../../components/api-reference";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "color", label: "Color" },
  { id: "duration", label: "Duration" },
  { id: "spread", label: "Spread" },
  { id: "angle", label: "Angle" },
  { id: "reverse", label: "Reverse" },
  { id: "once", label: "Play once" },
  { id: "api-reference", label: "API reference" },
];

// One preview + code pair for an example
async function example(code: string) {
  return html`<div class="example">
    <div class="preview">${raw(code)}</div>
    <div class="code-block">${raw(await highlight(code))}</div>
  </div>`;
}

export async function ShimmerPage(path: string) {
  return Layout({
    title: "Shimmer",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Shimmer</h1>
            ${raw(titleActions(path, "shimmer"))}
          </div>
          <p>
            A band of light that sweeps across text, using
            <code>class="shimmer"</code>. Use it to show that something is
            working, like a reply that is being written.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
      </div>
      <div class="example">
        <div class="code-block">${raw(await standaloneLink("shimmer"))}</div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
        <p>
          The text is a muted mix of its own color, and the band shows the
          full color. This works on any text and in dark mode. The animation
          stops when the user prefers reduced motion.
        </p>
      </div>
      ${await example(`<p class="shimmer" role="status">Generating response...</p>`)}

      <div class="prose">
        <h2 id="color">Color</h2>
        <p>
          Set <code>--shimmer-color</code> to change the color of the band, and
          <code>--shimmer-muted</code> to change the color of the text below
          it.
        </p>
      </div>
      ${await example(`<p class="shimmer" style="--shimmer-color: var(--ui-primary)">Generating response...</p>`)}

      <div class="prose">
        <h2 id="duration">Duration</h2>
        <p>
          Set <code>--shimmer-duration</code> to change how long one sweep
          takes. The default is <code>2s</code>.
        </p>
      </div>
      ${await example(`<p class="shimmer" style="--shimmer-duration: 1s">Generating response...</p>`)}

      <div class="prose">
        <h2 id="spread">Spread</h2>
        <p>
          Set <code>--shimmer-spread</code> to change how wide the band is. The
          default is <code>calc(3ch + 40px)</code>.
        </p>
      </div>
      ${await example(`<p class="shimmer" style="--shimmer-spread: 8rem">Generating response...</p>`)}

      <div class="prose">
        <h2 id="angle">Angle</h2>
        <p>
          Set <code>--shimmer-angle</code> to tilt the band. The default is
          <code>20deg</code>.
        </p>
      </div>
      ${await example(`<p class="shimmer" style="--shimmer-angle: 45deg">Generating response...</p>`)}

      <div class="prose">
        <h2 id="reverse">Reverse</h2>
        <p>
          The band moves in the reading direction, so it goes right to left in
          right to left text. Add <code>reverse</code> to flip it.
        </p>
      </div>
      ${await example(`<p class="shimmer reverse">Generating response...</p>`)}

      <div class="prose">
        <h2 id="once">Play once</h2>
        <p>Add <code>once</code> to sweep one time only, for example when a task is done.</p>
      </div>
      ${await example(`<p class="shimmer once" style="--shimmer-duration: 1.1s">Response generated.</p>`)}

      ${apiReference([
        { type: "Direction", values: [".reverse"], description: "Sweeps against the reading direction" },
        { type: "Repeat", values: [".once"], description: "Sweeps one time, then stops" },
        { type: "Color", values: ["--shimmer-color"], description: "Color of the band. Defaults to the text color" },
        { type: "Muted color", values: ["--shimmer-muted"], description: "Color of the text under the band" },
        { type: "Duration", values: ["--shimmer-duration"], description: "Time of one sweep" },
        { type: "Spread", values: ["--shimmer-spread"], description: "Width of the band" },
        { type: "Angle", values: ["--shimmer-angle"], description: "Tilt of the band" },
      ])}
    `,
  });
}
