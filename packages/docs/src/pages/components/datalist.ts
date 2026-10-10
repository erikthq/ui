import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "in-a-field", label: "In a field" },
];

export async function DatalistPage(path: string) {
  return Layout({
    title: "Datalist",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Datalist</h1>
          <p>
            A native browser combobox. Pair any text input with a
            <code>&lt;datalist&gt;</code> to get autocomplete suggestions for
            free, no CSS or JavaScript required.
          </p>
        </hgroup>

        <h3>Composed of</h3>
        <dl class="composition">
          <dt><a href="${url("/components/text-field")}"><code>Text Field</code></a></dt>
          <dd>The input the suggestions attach to</dd>
        </dl>

        <p>
          The browser handles filtering, keyboard navigation, and
          accessibility. The tradeoff is that the suggestion popup is
          browser-controlled and cannot be styled.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <input type="text" list="datalist-fruits" placeholder="Search fruits..." />
          <datalist id="datalist-fruits">
            <option value="Apple"></option>
            <option value="Banana"></option>
            <option value="Cherry"></option>
            <option value="Mango"></option>
            <option value="Pineapple"></option>
          </datalist>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<input type="text" list="fruits" placeholder="Search fruits...">

<datalist id="fruits">
  <option value="Apple">
  <option value="Banana">
  <option value="Cherry">
  <option value="Mango">
  <option value="Pineapple">
</datalist>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="in-a-field">In a field</h2>
        <p>
          Works inside <code>.field</code> like any other input. The
          <code>&lt;datalist&gt;</code> is <code>display: none</code> so it
          drops out of the flex layout without adding any gap.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <label class="field" style="width:100%">
            <span>Favourite fruit</span>
            <input type="text" list="datalist-fruits-field" placeholder="Search..." />
            <datalist id="datalist-fruits-field">
              <option value="Apple"></option>
              <option value="Banana"></option>
              <option value="Cherry"></option>
              <option value="Mango"></option>
              <option value="Pineapple"></option>
            </datalist>
            <small>Start typing to filter suggestions.</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Favourite fruit</span>
  <input type="text" list="fruits" placeholder="Search...">
  <datalist id="fruits">
    <option value="Apple">
    <option value="Banana">
    <option value="Cherry">
  </datalist>
  <small>Start typing to filter suggestions.</small>
</label>`),
          )}
        </div>
      </div>
    `,
  });
}
