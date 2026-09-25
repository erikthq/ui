import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "radio", label: "Radio" },
  { id: "checkbox", label: "Checkbox" },
  { id: "description", label: "With description" },
  { id: "required", label: "Required" },
];

export async function RadioGroupPage(path: string) {
  return Layout({
    title: "Radio Group",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Radio Group</h1>
          <p>
            A <code>fieldset</code> that groups radio buttons or checkboxes under
            a shared <code>legend</code>. No class name needed.
          </p>
        </hgroup>

        <h2 id="radio">Radio</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <fieldset>
            <legend>Favorite fruit</legend>
            <label
              ><input type="radio" name="fruit" value="apple" /> Apple</label
            >
            <label
              ><input type="radio" name="fruit" value="banana" /> Banana</label
            >
            <label
              ><input type="radio" name="fruit" value="cherry" /> Cherry</label
            >
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset>
  <legend>Favorite fruit</legend>
  <label>
    <input type="radio" name="fruit" value="apple" /> Apple
  </label>
  <label>
    <input type="radio" name="fruit" value="banana" /> Banana
  </label>
  <label>
    <input type="radio" name="fruit" value="cherry" /> Cherry
  </label>
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="checkbox">Checkbox</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <fieldset>
            <legend>Toppings</legend>
            <label
              ><input type="checkbox" name="toppings" value="cheese" />
              Cheese</label
            >
            <label
              ><input type="checkbox" name="toppings" value="tomato" />
              Tomato</label
            >
            <label
              ><input type="checkbox" name="toppings" value="onion" />
              Onion</label
            >
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset>
  <legend>Toppings</legend>
  <label>
    <input type="checkbox" name="toppings" value="cheese" /> Cheese
  </label>
  <label>
    <input type="checkbox" name="toppings" value="tomato" /> Tomato
  </label>
  <label>
    <input type="checkbox" name="toppings" value="onion" /> Onion
  </label>
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="description">With description</h2>
        <p>Add a <code>small</code> element for a hint below the options.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <fieldset>
            <legend>Notifications</legend>
            <label
              ><input type="checkbox" name="notify" value="email" />
              Email</label
            >
            <label
              ><input type="checkbox" name="notify" value="sms" /> SMS</label
            >
            <label
              ><input type="checkbox" name="notify" value="push" /> Push</label
            >
            <small>Choose how you'd like to be notified.</small>
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset>
  <legend>Notifications</legend>
  <label>
    <input type="checkbox" name="notify" value="email" /> Email
  </label>
  <label>
    <input type="checkbox" name="notify" value="sms" /> SMS
  </label>
  <label>
    <input type="checkbox" name="notify" value="push" /> Push
  </label>
  <small>Choose how you'd like to be notified.</small>
</fieldset>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="required">Required</h2>
        <p>
          Add <code>required</code> to any input and a <code>*</code> appears on
          the legend automatically.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <fieldset>
            <legend>Plan</legend>
            <label
              ><input type="radio" name="plan" value="free" required />
              Free</label
            >
            <label
              ><input type="radio" name="plan" value="pro" required />
              Pro</label
            >
            <label
              ><input type="radio" name="plan" value="enterprise" required />
              Enterprise</label
            >
          </fieldset>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<fieldset>
  <legend>Plan</legend>
  <label>
    <input type="radio" name="plan" value="free" required /> Free
  </label>
  <label>
    <input type="radio" name="plan" value="pro" required /> Pro
  </label>
  <label>
    <input type="radio" name="plan" value="enterprise" required /> Enterprise
  </label>
</fieldset>`),
          )}
        </div>
      </div>
    `,
  });
}
