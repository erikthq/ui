import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { apiReference } from "../../components/api-reference";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "with-label", label: "With label" },
  { id: "disabled", label: "Disabled" },
  { id: "choice-card", label: "Choice card" },
  { id: "api-reference", label: "API reference" },
];

export async function RadioPage(path: string) {
  return Layout({
    title: "Radio",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Radio</h1>
            ${raw(titleActions(path, "radio"))}
          </div>
          <p>
            A native <code>&lt;input type="radio"&gt;</code> for selecting one
            option from a group.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
      </div>
      <div class="example">
        <div class="code-block">${raw(await standaloneLink("radio"))}</div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview gap-2">
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
            .choice-card article {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }

            .choice-card article:has(input:checked) {
              background: var(--ui-neutral-100);
              border-color: var(--ui-neutral-600);
            }
          </style>
          <fieldset style="width: min(100%, 400px); margin: auto;">
            <label class="choice-card">
              <article>
                <small>
                  <hgroup>
                    <h3>Plus</h3>
                    <p>For individuals and small teams.</p>
                  </hgroup>
                </small>
                <input type="radio" name="plan" value="plus" />
              </article>
            </label>
            <label class="choice-card">
              <article>
                <small>
                  <hgroup>
                    <h3>Pro</h3>
                    <p>For growing businesses.</p>
                  </hgroup>
                </small>
                <input type="radio" name="plan" value="pro" checked />
              </article>
            </label>
            <label class="choice-card">
              <article>
                <small>
                  <hgroup>
                    <h3>Enterprise</h3>
                    <p>For large teams and enterprises.</p>
                  </hgroup>
                </small>
                <input type="radio" name="plan" value="enterprise" />
              </article>
            </label>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<style>
  .choice-card article {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }

            .choice-card article:has(input:checked) {
              background: var(--ui-neutral-100);
              border-color: var(--ui-neutral-600);
            }
</style>

<fieldset>
  <label class="choice-card">
              <article>
                <small>
                  <hgroup>
                    <h3>Plus</h3>
                    <p>For individuals and small teams.</p>
                  </hgroup>
                </small>
                <input type="radio" name="plan" value="plus" />
              </article>
            </label>
            <label class="choice-card">
              <article>
                <small>
                  <hgroup>
                    <h3>Pro</h3>
                    <p>For growing businesses.</p>
                  </hgroup>
                </small>
                <input type="radio" name="plan" value="pro" checked />
              </article>
            </label>
</fieldset>`),
          )}
        </div>
      </div>

      ${apiReference([
        {
          type: "Disabled",
          values: ["[disabled]"],
          description: "Fades the radio and its label and blocks input",
        },
      ])}
    `,
  });
}
