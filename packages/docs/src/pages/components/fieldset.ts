import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "side-by-side", label: "Side by side" },
  { id: "description", label: "With description" },
];

export async function FieldsetPage(path: string) {
  return Layout({
    title: "Fieldset",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Fieldset</h1>
          <p>
            A <code>fieldset</code> groups related fields under one
            <code>legend</code>. No class name needed. The fields inside
            stack, and their labels step down a level so the legend reads as
            the heading.
          </p>
        </hgroup>

        <h3>Works with</h3>
        <dl class="composition">
          <dt><a href="${url("/components/field")}"><code>Field</code></a></dt>
          <dd>The labelled fields it groups</dd>
        </dl>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <fieldset style="width: 100%">
            <legend>Shipping address</legend>
            <label class="field">
              <span>Street</span>
              <input type="text" placeholder="12 Main Street" />
            </label>
            <label class="field">
              <span>City</span>
              <input type="text" placeholder="Copenhagen" />
            </label>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset>
  <legend>Shipping address</legend>
  <label class="field">
    <span>Street</span>
    <input type="text" placeholder="12 Main Street" />
  </label>
  <label class="field">
    <span>City</span>
    <input type="text" placeholder="Copenhagen" />
  </label>
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="side-by-side">Side by side</h2>
        <p>
          erikt/ui leaves layout to you. Set the direction on the fieldset
          itself. The legend stays on top.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <fieldset style="flex-direction: row">
            <legend>Primary color</legend>
            <label class="field">
              <span>Light</span>
              <input type="color" value="#1e90ff" />
            </label>
            <label class="field">
              <span>Dark</span>
              <input type="color" value="#5aa8ff" />
            </label>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset style="flex-direction: row">
  <legend>Primary color</legend>
  <label class="field">
    <span>Light</span>
    <input type="color" value="#1e90ff" />
  </label>
  <label class="field">
    <span>Dark</span>
    <input type="color" value="#5aa8ff" />
  </label>
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="description">With description</h2>
        <p>Put a <code>small</code> after the fields for a hint.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <fieldset style="width: 100%">
            <legend>Password</legend>
            <label class="field">
              <span>New password</span>
              <input type="password" />
            </label>
            <label class="field">
              <span>Repeat password</span>
              <input type="password" />
            </label>
            <small>Use at least 12 characters.</small>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset>
  <legend>Password</legend>
  <label class="field">
    <span>New password</span>
    <input type="password" />
  </label>
  <label class="field">
    <span>Repeat password</span>
    <input type="password" />
  </label>
  <small>Use at least 12 characters.</small>
</fieldset>`),
          )}
        </div>
      </div>
    `,
  });
}
