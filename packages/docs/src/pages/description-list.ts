import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "grouped", label: "Grouped pairs" },
  { id: "label-width", label: "Label width" },
  { id: "multiple", label: "Several values" },
];

export async function DescriptionListPage(path: string) {
  return Layout({
    title: "Description List",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Description List</h1>
          <p>
            A native <code>&lt;dl&gt;</code> laid out as a two column grid. Each
            <code>&lt;dt&gt;</code> sits in the label column with its
            <code>&lt;dd&gt;</code> beside it, so the values line up all the way
            down the list.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>No class names. Write the list and the terms align.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <dl>
            <dt>Name</dt>
            <dd>Ada Lovelace</dd>
            <dt>Role</dt>
            <dd>Mathematician</dd>
            <dt>Known for</dt>
            <dd>The first published algorithm for a machine</dd>
          </dl>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<dl>
  <dt>Name</dt>
  <dd>Ada Lovelace</dd>
  <dt>Role</dt>
  <dd>Mathematician</dd>
  <dt>Known for</dt>
  <dd>The first published algorithm for a machine</dd>
</dl>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="grouped">Grouped pairs</h2>
        <p>
          A <code>&lt;div&gt;</code> is the one element a
          <code>&lt;dl&gt;</code> may wrap its pairs in. Use it when a row needs
          its own border, background, or click target. The wrapper spans both
          tracks and re-uses them with
          <code>grid-template-columns: subgrid</code>, so the columns stay
          aligned across every row.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <dl style="row-gap: 0">
            <div style="padding-block: var(--ui-spacing-3)">
              <dt>Plan</dt>
              <dd>Team</dd>
            </div>
            <div
              style="padding-block: var(--ui-spacing-3); border-block: 1px solid var(--ui-neutral-200)"
            >
              <dt>Seats</dt>
              <dd>24 of 30 used</dd>
            </div>
            <div style="padding-block: var(--ui-spacing-3)">
              <dt>Renews</dt>
              <dd>1 April 2026</dd>
            </div>
          </dl>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<dl>
  <div>
    <dt>Plan</dt>
    <dd>Team</dd>
  </div>
  <div>
    <dt>Seats</dt>
    <dd>24 of 30 used</dd>
  </div>
</dl>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="label-width">Label width</h2>
        <p>
          The label column is <code>max-content</code> by default, so it is as
          wide as the longest term. Set
          <code>--ui-description-list-label</code> to pin it instead.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <dl style="--ui-description-list-label: 8rem">
            <dt>Status</dt>
            <dd>Shipped</dd>
            <dt>Carrier</dt>
            <dd>PostNord</dd>
            <dt>Tracking</dt>
            <dd><code>SE1148203372</code></dd>
          </dl>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<dl style="--ui-description-list-label: 8rem">
  <dt>Status</dt>
  <dd>Shipped</dd>
  <dt>Carrier</dt>
  <dd>PostNord</dd>
</dl>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="multiple">Several values</h2>
        <p>
          A term may carry more than one <code>&lt;dd&gt;</code>. The extra
          values stack under the first one instead of flowing back into the
          label column.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <dl>
            <dt>Maintainers</dt>
            <dd>Isaac Newton</dd>
            <dd>Ada Lovelace</dd>
            <dt>Licence</dt>
            <dd>MIT</dd>
          </dl>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<dl>
  <dt>Maintainers</dt>
  <dd>Isaac Newton</dd>
  <dd>Ada Lovelace</dd>
  <dt>Licence</dt>
  <dd>MIT</dd>
</dl>`),
          )}
        </div>
      </div>
    `,
  });
}
