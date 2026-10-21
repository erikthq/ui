import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "states", label: "States" },
  { id: "labeled", label: "Labeled" },
  { id: "colors", label: "Colors" },
];

export async function MeterPage(path: string) {
  return Layout({
    title: "Meter",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Meter</h1>
            ${raw(titleActions(path, "meter"))}
          </div>
          <p>
            A value inside a known range, like disk use or a password score,
            using the native <code>&lt;meter&gt;</code> element.
          </p>
        </hgroup>
        <p>
          Use <code>&lt;meter&gt;</code> for a measurement and
          <a href="/components/progress">Progress</a> for a task that moves
          toward done.
        </p>

        <h2 id="standalone">Standalone</h2>
      </div>
      <div class="example">
        <div class="code-block">${raw(await standaloneLink("meter"))}</div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
        <p>
          Without <code>min</code> and <code>max</code>, the range is
          <code>0</code> to <code>1</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <meter value="0.6"></meter>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<meter value="0.6"></meter>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="states">States</h2>
        <p>
          <code>low</code> and <code>high</code> split the range into three
          parts. <code>optimum</code> says which part is good. The browser
          compares the value with them, and the color follows: green when good,
          yellow when not so good, red when bad.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:var(--ui-spacing-4)">
          <meter
            min="0"
            max="100"
            low="33"
            high="66"
            optimum="80"
            value="90"
          ></meter>
          <meter
            min="0"
            max="100"
            low="33"
            high="66"
            optimum="80"
            value="50"
          ></meter>
          <meter
            min="0"
            max="100"
            low="33"
            high="66"
            optimum="80"
            value="20"
          ></meter>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<!-- a high value is good -->
<meter min="0" max="100" low="33" high="66" optimum="80" value="90"></meter>
<meter min="0" max="100" low="33" high="66" optimum="80" value="50"></meter>
<meter min="0" max="100" low="33" high="66" optimum="80" value="20"></meter>`),
          )}
        </div>
      </div>
      <div class="prose">
        <p>
          Put <code>optimum</code> in the low part when a low value is good,
          like disk use.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:var(--ui-spacing-4)">
          <meter
            min="0"
            max="100"
            low="60"
            high="85"
            optimum="0"
            value="40"
          ></meter>
          <meter
            min="0"
            max="100"
            low="60"
            high="85"
            optimum="0"
            value="95"
          ></meter>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<!-- a low value is good -->
<meter min="0" max="100" low="60" high="85" optimum="0" value="40"></meter>
<meter min="0" max="100" low="60" high="85" optimum="0" value="95"></meter>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="labeled">Labeled</h2>
        <p>
          Wrap in a <code>&lt;label class="field"&gt;</code> to give the meter a
          name. Screen readers read the label with the value.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <label class="field" style="width:100%">
            <span>Storage</span>
            <meter
              min="0"
              max="100"
              low="60"
              high="85"
              optimum="0"
              value="72"
            ></meter>
            <small>72 of 100 GB used</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Storage</span>
  <meter min="0" max="100" low="60" high="85" optimum="0" value="72"></meter>
  <small>72 of 100 GB used</small>
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="colors">Colors</h2>
        <p>
          Each state reads its color from a custom property. Set
          <code>--meter-good</code>, <code>--meter-average</code> or
          <code>--meter-bad</code> to change one.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%;padding-inline:2rem">
          <meter value="0.6" style="--meter-good: var(--ui-primary)"></meter>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<meter value="0.6" style="--meter-good: var(--ui-primary)"></meter>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}
