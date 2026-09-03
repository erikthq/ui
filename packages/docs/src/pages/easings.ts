import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "ease-glide", label: "Glide" },
  { id: "ease-snap", label: "Snap" },
  { id: "ease-heavy", label: "Heavy" },
  { id: "ease-in", label: "In" },
  { id: "ease-out", label: "Out" },
  { id: "ease-in-out", label: "In Out" },
];

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

function easingDemo(variable: string, label: string) {
  return html`
    <div style="width:100%">
      <div class="easing-demo">
        <div class="easing-track" style="container-type:inline-size">
          <div
            class="easing-dot"
            style="transition-timing-function:${variable}"
          ></div>
        </div>
      </div>
      <p
        style="color:var(--ui-neutral-400);font-size:0.8em;margin-top:var(--ui-spacing-1)"
      >
        ${label}
      </p>
    </div>
  `;
}

async function directionGroup(direction: string) {
  const varName = (family: string) => `--ease-${direction}-${family}`;
  const codeLines = families
    .map((f) => `  transition: transform 300ms var(${varName(f)});`)
    .join("\n");
  return html`
    <div class="example">
      <div
        class="preview preview-padded"
        style="display:flex;flex-direction:column;gap:var(--ui-spacing-4)"
      >
        ${families.map(
          (f) =>
            html`<div style="width:100%">
              ${easingDemo(`var(${varName(f)})`, f)}
            </div>`,
        )}
      </div>
      <div class="code-block">
        ${raw(await highlight(`.element {\n${codeLines}\n}`, 80, "css"))}
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
      <label class="easings-animate-toggle">
        <input type="checkbox" class="switch" />
        Animate
      </label>

      <div class="prose">
        <h2 id="ease-glide">Glide</h2>
        <p>
          Slows down gently and lands soft. The default choice for drawers,
          modals, and anything that expands.
        </p>
      </div>
      <div class="example">
        <div class="preview">${easingDemo("var(--ease-glide)", "glide")}</div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.element {\n  transition: transform 300ms var(--ease-glide);\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="ease-snap">Snap</h2>
        <p>
          Leaves fast, overshoots a little, settles. Good for toggles and
          selections, where the response should feel immediate.
        </p>
      </div>
      <div class="example">
        <div class="preview">${easingDemo("var(--ease-snap)", "snap")}</div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.element {\n  transition: transform 300ms var(--ease-snap);\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="ease-heavy">Heavy</h2>
        <p>
          A big elastic overshoot. It draws the eye, which is exactly why one
          per screen is plenty.
        </p>
      </div>
      <div class="example">
        <div class="preview">${easingDemo("var(--ease-heavy)", "heavy")}</div>
        <div class="code-block">
          ${raw(
            await highlight(
              `.element {\n  transition: transform 300ms var(--ease-heavy);\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="ease-in">In</h2>
        <p>Starts slow, accelerates toward the end.</p>
      </div>
      ${await directionGroup("in")}

      <div class="prose">
        <h2 id="ease-out">Out</h2>
        <p>Starts fast, decelerates toward the end.</p>
      </div>
      ${await directionGroup("out")}

      <div class="prose">
        <h2 id="ease-in-out">In Out</h2>
        <p>Slow at both ends, fast in the middle.</p>
      </div>
      ${await directionGroup("in-out")}
    `,
  });
}
