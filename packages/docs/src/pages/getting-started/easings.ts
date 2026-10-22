import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "ease-glide", label: "Glide" },
  { id: "ease-snap", label: "Snap" },
  { id: "ease-heavy", label: "Heavy" },
  { id: "standard", label: "Standard Curves" },
];

const durations: Record<string, string[]> = {
  glide: ["100ms", "150ms", "200ms", "300ms", "400ms"],
  snap: ["400ms", "550ms", "750ms", "1000ms", "1300ms"],
  heavy: ["600ms", "700ms", "850ms", "1000ms", "1200ms"],
};

const families = [
  "sine",
  "quad",
  "cubic",
  "quart",
  "quint",
  "expo",
  "circ",
  "back",
];

const animateToggle = html`
  <label class="easing-animate-toggle">
    <input type="checkbox" class="switch" />
    Animate
  </label>
`;

async function curveSection(name: string, title: string, description: string) {
  return html`
    <div class="prose">
      <h2 id="ease-${name}">${title}</h2>
      <p>${description}</p>
      <p>
        The <code>--ease-${name}-*</code> variables pair ${name} with a set
        duration. Put the property in front.
      </p>
      <table class="align-left">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${durations[name].map(
            (duration, i) => html`
              <tr>
                <td><code>--ease-${name}-${i + 1}</code></td>
                <td><code>${duration} var(--ease-${name})</code></td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    </div>
    <div class="example">
      <div
        class="preview preview-padded easing-preview"
        style="display:flex;flex-direction:column;gap:var(--ui-spacing-4)"
      >
        ${animateToggle}
        ${durations[name].map(
          (_, i) => html`
            <div style="width:100%">
              <div class="easing-demo">
                <div class="easing-track" style="container-type:inline-size">
                  <div
                    class="easing-dot"
                    style="transition:translate var(--ease-${name}-${i + 1})"
                  ></div>
                </div>
              </div>
              <p
                style="color:var(--ui-neutral-400);font-size:0.8em;margin-top:var(--ui-spacing-1);text-align:center"
              >
                ${name}-${i + 1}
              </p>
            </div>
          `,
        )}
      </div>
      <div class="code-block">
        ${raw(
          await highlight(
            `.element {\n  transition: opacity var(--ease-${name}-3);\n}\n\n/* several properties */\n.element {\n  transition:\n    opacity var(--ease-${name}-3),\n    translate var(--ease-${name}-4);\n}\n\n/* your own duration */\n.element {\n  transition: transform 300ms var(--ease-${name});\n}`,
            80,
            "css",
          ),
        )}
      </div>
    </div>
  `;
}

export async function EasingsPage(path: string) {
  return Layout({
    title: "Easings",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Easings</h1>
          <p>
            Easing curves that don't look like the browser defaults.
          </p>
        </hgroup>
      </div>

      ${await curveSection(
        "glide",
        "Glide",
        "Slows down gently and lands soft. The default choice for drawers, modals, and anything that expands.",
      )}
      ${await curveSection(
        "snap",
        "Snap",
        "Leaves fast, overshoots a little, settles. Good for toggles and selections, where the response should feel immediate.",
      )}
      ${await curveSection(
        "heavy",
        "Heavy",
        "A big elastic overshoot. It draws the eye, which is exactly why one per screen is plenty.",
      )}

      <div class="prose">
        <h2 id="standard">Standard Curves</h2>
        <p>
          The classic curves, from gentle (sine) to strong (expo), in three
          directions. <em>In</em> starts slow and speeds up. <em>Out</em>
          starts fast and slows down. <em>In out</em> is slow at both ends.
        </p>
        <table class="align-left">
          <thead>
            <tr>
              <th>In</th>
              <th>Out</th>
              <th>In out</th>
            </tr>
          </thead>
          <tbody>
            ${families.map(
              (f) => html`
                <tr>
                  <td><code>--ease-in-${f}</code></td>
                  <td><code>--ease-out-${f}</code></td>
                  <td><code>--ease-in-out-${f}</code></td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
    `,
  });
}
