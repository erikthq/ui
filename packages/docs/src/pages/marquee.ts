import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "reverse", label: "Reverse" },
  { id: "speed", label: "Speed" },
  { id: "logos", label: "Logos" },
];

const teams = ["Design", "Engineering", "Product", "Marketing", "Support"];

export async function MarqueePage(path: string) {
  return Layout({
    title: "Marquee",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Marquee</h1>
          <p>
            An infinitely scrolling row of content using
            <code>class="marquee"</code>.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Each set of items is its own <code>&lt;ul&gt;</code>. Repeat the
          list once more with <code>aria-hidden="true"</code> so it's hidden
          from assistive tech but fills in the loop as the first list scrolls
          out.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div class="marquee">
            <ul>
              ${teams.map((team) => html`<li><span class="badge">${team}</span></li>`)}
            </ul>
            <ul aria-hidden="true">
              ${teams.map((team) => html`<li><span class="badge">${team}</span></li>`)}
            </ul>
            <ul aria-hidden="true">
              ${teams.map((team) => html`<li><span class="badge">${team}</span></li>`)}
            </ul>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="marquee">
  <ul>
    <li><span class="badge">Design</span></li>
    <li><span class="badge">Engineering</span></li>
    <li><span class="badge">Product</span></li>
  </ul>
  <!-- repeat the same list, hidden from assistive tech -->
  <ul aria-hidden="true">
    <li><span class="badge">Design</span></li>
    <li><span class="badge">Engineering</span></li>
    <li><span class="badge">Product</span></li>
  </ul>
  <ul aria-hidden="true">
    <li><span class="badge">Design</span></li>
    <li><span class="badge">Engineering</span></li>
    <li><span class="badge">Product</span></li>
  </ul>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="reverse">Reverse</h2>
        <p>Add <code>reverse</code> to scroll right to left.</p>
      </div>
      <div class="example">
        <div class="preview">
          <div class="marquee reverse">
            <ul>
              ${teams.map(
                (team) => html`<li><span class="badge secondary">${team}</span></li>`,
              )}
            </ul>
            <ul aria-hidden="true">
              ${teams.map(
                (team) => html`<li><span class="badge secondary">${team}</span></li>`,
              )}
            </ul>
            <ul aria-hidden="true">
              ${teams.map(
                (team) => html`<li><span class="badge secondary">${team}</span></li>`,
              )}
            </ul>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div class="marquee reverse">
  <ul>...</ul>
  <ul aria-hidden="true">...</ul>
  <ul aria-hidden="true">...</ul>
</div>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="speed">Speed</h2>
        <p>
          Override <code>--marquee-duration</code> to control how long one
          full loop takes. Shorter durations scroll faster.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div class="marquee" style="--marquee-duration: 6s">
            <ul>
              ${["Fast", "Faster", "Fastest"].map(
                (label) => html`<li><span class="badge outlined">${label}</span></li>`,
              )}
            </ul>
            <ul aria-hidden="true">
              ${["Fast", "Faster", "Fastest"].map(
                (label) => html`<li><span class="badge outlined">${label}</span></li>`,
              )}
            </ul>
            <ul aria-hidden="true">
              ${["Fast", "Faster", "Fastest"].map(
                (label) => html`<li><span class="badge outlined">${label}</span></li>`,
              )}
            </ul>
            <ul aria-hidden="true">
              ${["Fast", "Faster", "Fastest"].map(
                (label) => html`<li><span class="badge outlined">${label}</span></li>`,
              )}
            </ul>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<div class="marquee" style="--marquee-duration: 6s">
  <ul>...</ul>
  <ul aria-hidden="true">...</ul>
  <ul aria-hidden="true">...</ul>
  <ul aria-hidden="true">...</ul>
</div>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="logos">Logos</h2>
        <p>Any content works inside the <code>&lt;li&gt;</code> items.</p>
      </div>
      <div class="example">
        <div class="preview">
          <div class="marquee">
            <ul>
              ${["A", "B", "C", "D", "E", "F"].map(
                (letter) =>
                  html`<li
                    style="font-weight:700;font-size:1.5rem;color:var(--ui-neutral-400)"
                  >
                    ${letter}
                  </li>`,
              )}
            </ul>
            <ul aria-hidden="true">
              ${["A", "B", "C", "D", "E", "F"].map(
                (letter) =>
                  html`<li
                    style="font-weight:700;font-size:1.5rem;color:var(--ui-neutral-400)"
                  >
                    ${letter}
                  </li>`,
              )}
            </ul>
            <ul aria-hidden="true">
              ${["A", "B", "C", "D", "E", "F"].map(
                (letter) =>
                  html`<li
                    style="font-weight:700;font-size:1.5rem;color:var(--ui-neutral-400)"
                  >
                    ${letter}
                  </li>`,
              )}
            </ul>
            <ul aria-hidden="true">
              ${["A", "B", "C", "D", "E", "F"].map(
                (letter) =>
                  html`<li
                    style="font-weight:700;font-size:1.5rem;color:var(--ui-neutral-400)"
                  >
                    ${letter}
                  </li>`,
              )}
            </ul>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="marquee">
  <ul>
    <li><img src="/logo-a.svg" alt="Company A" /></li>
    <li><img src="/logo-b.svg" alt="Company B" /></li>
  </ul>
  <ul aria-hidden="true">
    <li><img src="/logo-a.svg" alt="Company A" /></li>
    <li><img src="/logo-b.svg" alt="Company B" /></li>
  </ul>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
