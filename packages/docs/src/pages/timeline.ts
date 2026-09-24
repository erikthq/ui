import { html, raw } from "hono/html";
import { Layout, url } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "filled", label: "Filled dots" },
  { id: "progress", label: "Marking progress" },
  { id: "rich", label: "Richer items" },
  { id: "state", label: "Driven by a control" },
];

const events = [
  "Create a services site",
  "Solve initial network problems",
  "Technical testing",
  "Network problems being solved",
];

export async function TimelinePage(path: string) {
  return Layout({
    title: "Timeline",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Timeline</h1>
          <p>
            An ordered list turned into a vertical track of events. Each item
            gets a dot and a connector down to the next one, so the line stops
            at the last item on its own.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Add <code>.timeline</code> to an <code>&lt;ol&gt;</code>. The item
          holds whatever you want.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <ol class="timeline">
            ${events.map(
              (label) =>
                html`<li>
                  <time datetime="2015-09-01">2015-09-01</time> ${label}
                </li>`,
            )}
          </ol>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ol class="timeline">
  <li><time datetime="2015-09-01">2015-09-01</time> Create a services site</li>
  <li><time datetime="2015-09-01">2015-09-01</time> Solve initial network problems</li>
  <li><time datetime="2015-09-01">2015-09-01</time> Technical testing</li>
</ol>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="filled">Filled dots</h2>
        <p>
          Put <code>data-filled</code> on the list to fill every dot instead of
          leaving it as a ring.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <ol class="timeline" data-filled>
            ${events.map(
              (label) =>
                html`<li>
                  <time datetime="2015-09-01">2015-09-01</time> ${label}
                </li>`,
            )}
          </ol>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ol class="timeline" data-filled>
  <li>
  <time datetime="2015-09-01">2015-09-01</time> Create a services site
  </li>
  <li><time datetime="2015-09-01">2015-09-01</time> Solve initial network problems</li>
</ol>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="progress">Marking progress</h2>
        <p>
          The same attribute works on a single <code>&lt;li&gt;</code>. Fill the
          steps that are done and leave the rest as rings.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <ol class="timeline">
            <li data-filled>Order placed</li>
            <li data-filled>Packed</li>
            <li>In transit</li>
            <li>Delivered</li>
          </ol>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ol class="timeline">
  <li data-filled>Order placed</li>
  <li data-filled>Packed</li>
  <li>In transit</li>
  <li>Delivered</li>
</ol>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="rich">Richer items</h2>
        <p>
          An item can hold any markup. The dot stays centred on the first line,
          so a heading of any size lines up with it.
        </p>
        <p>
          Tune the track with <code>--ui-timeline-dot</code>,
          <code>--ui-timeline-ring</code>, <code>--ui-timeline-line</code>,
          <code>--ui-timeline-gap</code>, and <code>--ui-timeline-color</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <ol class="timeline" data-filled style="--ui-timeline-gap: 2rem">
            <li>
              <strong>Deployed to production</strong><br />
              <small
                ><time datetime="2026-09-11">11 September 2026</time></small
              >
              <p>Version 2.4.0 went out to all regions.</p>
            </li>
            <li>
              <strong>Staging sign off</strong><br />
              <small><time datetime="2026-09-09">9 September 2026</time></small>
              <p>Two reviewers approved the release candidate.</p>
            </li>
            <li>
              <strong>Release cut</strong><br />
              <small><time datetime="2026-09-04">4 September 2026</time></small>
              <p>Branched from main at commit b653bff.</p>
            </li>
          </ol>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ol class="timeline" data-filled style="--ui-timeline-gap: 2rem">
  <li>
    <strong>Deployed to production</strong><br />
    <time datetime="2026-09-11">11 September 2026</time>
    <p>Version 2.4.0 went out to all regions.</p>
  </li>
  <li>
    <strong>Staging sign off</strong><br />
    <time datetime="2026-09-09">9 September 2026</time>
    <p>Two reviewers approved the release candidate.</p>
  </li>
</ol>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="state">Driven by a control</h2>
        <p>
          The marker follows the item's attributes, so anything that can set an
          attribute can drive it. This toggle group switches the last item
          between four states.
        </p>
        <ul>
          <li>
            <strong>Gone.</strong> The item is taken out of the list, and the
            connector above it goes with it.
          </li>
          <li><strong>Idle.</strong> A plain ring.</li>
          <li>
            <strong>Loading.</strong> <code>aria-busy</code> on the
            <code>&lt;li&gt;</code> swaps the dot for the
            <a href="${url("/components/loading")}">Loading</a> spinner.
          </li>
          <li>
            <strong>Done.</strong> <code>data-filled</code> fills the dot.
          </li>
        </ul>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          id="timeline-state"
          style="gap: 1.5rem"
        >
          <fieldset role="group">
            <label class="toggle">
              <input type="radio" name="delivery" value="gone" />Gone
            </label>
            <label class="toggle">
              <input type="radio" name="delivery" value="idle" checked />Idle
            </label>
            <label class="toggle">
              <input type="radio" name="delivery" value="loading" />Loading
            </label>
            <label class="toggle">
              <input type="radio" name="delivery" value="done" />Done
            </label>
          </fieldset>

          <ol class="timeline">
            <li data-filled>Order placed</li>
            <li data-filled>Packed</li>
            <li data-filled>In transit</li>
            <li>Delivery</li>
          </ol>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div id="timeline-state">
  <ol class="timeline">
    <li data-filled>Order placed</li>
    <li data-filled>Packed</li>
    <li data-filled>In transit</li>
    <li>Delivery</li>
  </ol>
</div>`),
          )}
        </div>
      </div>

      <script type="module">
        const demo = document.querySelector("#timeline-state");
        const list = demo.querySelector(".timeline");
        const item = list.lastElementChild;

        const labels = {
          idle: "Delivery",
          loading: "Delivery in progress",
          done: "Delivered",
        };

        demo.addEventListener("change", (event) => {
          const state = event.target.value;

          if (state === "gone") {
            item.remove();
            return;
          }

          if (!item.isConnected) list.append(item);
          item.textContent = labels[state];
          item.toggleAttribute("aria-busy", state === "loading");
          item.toggleAttribute("data-filled", state === "done");
        });
      </script>
    `,
  });
}
