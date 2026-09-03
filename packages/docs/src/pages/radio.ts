import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-label", label: "With label" },
  { id: "disabled", label: "Disabled" },
  { id: "choice-card", label: "Choice card" },
];

export async function RadioPage(path: string) {
  return Layout({
    title: "Radio",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Radio</h1>
          <p>
            A native <code>&lt;input type="radio"&gt;</code> for selecting one
            option from a group.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <input type="radio" name="bare" />
          <input type="radio" name="bare" checked />
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<input type="radio" name="group" />\n<input type="radio" name="group" checked />`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-label">With label</h2>
      </div>
      <div class="example">
        <div
          class="preview"
          style="flex-direction:column;align-items:flex-start;gap:0.5rem"
        >
          <label>
            <input type="radio" name="density" value="default" />
            Default
          </label>
          <label>
            <input type="radio" name="density" value="comfortable" checked />
            Comfortable
          </label>
          <label>
            <input type="radio" name="density" value="compact" />
            Compact
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <input type="radio" name="density" value="default" />
  Default
</label>
<label>
  <input type="radio" name="density" value="comfortable" checked />
  Comfortable
</label>
<label>
  <input type="radio" name="density" value="compact" />
  Compact
</label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
      <div class="example">
        <div
          class="preview"
          style="flex-direction:column;align-items:flex-start;gap:0.5rem"
        >
          <label>
            <input type="radio" name="density-disabled" disabled />
            Default
          </label>
          <label>
            <input type="radio" name="density-disabled" disabled checked />
            Comfortable
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label>
  <input type="radio" name="density" disabled />
  Default
</label>
<label>
  <input type="radio" name="density" disabled checked />
  Comfortable
</label>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="choice-card">Choice card</h2>
        <p>
          A card-style radio group. Semantic markup plus a few lines of CSS.
        </p>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          style="flex-direction:column;width:100%"
        >
          <style>
            .choice-card {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              gap: var(--ui-spacing-4);
              padding: var(--ui-spacing-4);
              border: 1px solid var(--ui-neutral-300);
              border-radius: var(--ui-spacing-3);

              > div {
                display: grid;
                gap: 0.25rem;
              }

              small {
                color: var(--ui-neutral-500);
              }
            }
            .choice-card:has(input:checked) {
              background: var(--ui-neutral-50);
              border-color: var(--ui-neutral-600);
            }
          </style>
          <fieldset
            style="border:none;display:flex;flex-direction:column;gap:var(--ui-spacing-3);width:100%;flex-direction:column;width:100%;max-width:400px;margin:auto"
          >
            <label class="choice-card">
              <div>
                <h4>Plus</h4>
                <small>For individuals and small teams.</small>
              </div>
              <input type="radio" name="plan" value="plus" />
            </label>
            <label class="choice-card">
              <div>
                <h4>Pro</h4>
                <small> For growing businesses. </small>
              </div>
              <input type="radio" name="plan" value="pro" checked />
            </label>
            <label class="choice-card">
              <div>
                <h4>Enterprise</h4>
                <small> For large teams and enterprises. </small>
              </div>
              <input type="radio" name="plan" value="enterprise" />
            </label>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<style>
  .choice-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--ui-spacing-2);
    padding: var(--ui-spacing-4);
    border: 1px solid var(--ui-neutral-300);
    border-radius: var(--ui-spacing-3);

    > div {
      display: grid;
      gap: 0.5rem;
    }
    
    small {
      color:var(--ui-neutral-500);
    }
  }
  .choice-card:has(input:checked) {
    background: var(--ui-neutral-100);
    border-color: var(--ui-neutral-400);
  }
</style>

<fieldset>
  <label class="choice-card">
    <div>
      <h4>Plus</h4>
      <small>For individuals and small teams.</small>
    </div>
    <input type="radio" name="plan" value="plus" />
  </label>
  <label class="choice-card">
    <div>
      <h4>Pro</h4>
      <small>For growing businesses.</small>
    </div>
    <input type="radio" name="plan" value="pro" checked />
  </label>
</fieldset>`),
          )}
        </div>
      </div>
    `,
  });
}
