import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "length", label: "Length" },
  { id: "placeholder", label: "Placeholder" },
  { id: "in-field", label: "In a field" },
  { id: "disabled", label: "Disabled" },
];

export async function InputOtpPage(path: string) {
  return Layout({
    title: "Input OTP",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Input OTP</h1>
          <p>
            A one-time passcode input using a single native
            <code>&lt;input&gt;</code>, wrapped in
            <code>&lt;span class="otp"&gt;</code> so it can be cropped to
            look like separate boxes.
          </p>
        </hgroup>
        <p>
          It's a real, single <code>&lt;input&gt;</code> under the hood, not
          several inputs stitched together with JavaScript. That means
          paste, backspace, and mobile SMS autofill via
          <code>autocomplete="one-time-code"</code> all work natively, and
          screen readers announce it as one text field. The wrapper's only
          job is to clip the input's own overflow: the input is rendered a
          cell wider than the wrapper, so there's always slack room for the
          text cursor and it never has to auto-scroll into view. The
          tradeoff: CSS can't read how many characters have been typed, so
          the focus ring highlights the whole input rather than just the
          box currently being filled.
        </p>

        <h2 id="default">Default</h2>
        <p>
          Set <code>inputmode="numeric"</code>,
          <code>pattern="\\d*"</code>, and <code>maxlength</code> to match
          the number of digits.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <span class="otp">
            <input
              type="text"
              inputmode="numeric"
              pattern="\\d*"
              maxlength="6"
              autocomplete="one-time-code"
              aria-label="One-time passcode"
            />
          </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="otp">
  <input
    type="text"
    inputmode="numeric"
    pattern="\\d*"
    maxlength="6"
    autocomplete="one-time-code"
    aria-label="One-time passcode"
  />
</span>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="length">Length</h2>
        <p>
          The number of boxes follows <code>maxlength</code> automatically.
          Override <code>--otp-length</code> on the wrapper directly if you
          ever need to.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <span class="otp">
            <input
              type="text"
              inputmode="numeric"
              pattern="\\d*"
              maxlength="4"
              autocomplete="one-time-code"
              aria-label="One-time passcode"
            />
          </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="otp">
  <input
    type="text"
    inputmode="numeric"
    pattern="\\d*"
    maxlength="4"
    autocomplete="one-time-code"
    aria-label="One-time passcode"
  />
</span>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="placeholder">Placeholder</h2>
        <p>
          A <code>placeholder</code> of dashes or dots reads naturally as
          empty boxes, since the same letter spacing applies to it.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <span class="otp">
            <input
              type="text"
              inputmode="numeric"
              pattern="\\d*"
              maxlength="6"
              autocomplete="one-time-code"
              placeholder="000000"
              aria-label="One-time passcode"
            />
          </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="otp">
  <input
    type="text"
    inputmode="numeric"
    pattern="\\d*"
    maxlength="6"
    autocomplete="one-time-code"
    placeholder="000000"
    aria-label="One-time passcode"
  />
</span>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="in-field">In a field</h2>
        <p>Drop it inside a Field for a visible label and hint text.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <label class="field">
            <span>Enter PIN</span>
            <span class="otp">
              <input
                type="text"
                inputmode="numeric"
                pattern="\\d*"
                maxlength="4"
                autocomplete="one-time-code"
              />
            </span>
            <small>We sent a 4-digit code to your phone.</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<label class="field">
  <span>Enter PIN</span>
  <span class="otp">
    <input
      type="text"
      inputmode="numeric"
      pattern="\\d*"
      maxlength="4"
      autocomplete="one-time-code"
    />
  </span>
  <small>We sent a 4-digit code to your phone.</small>
</label>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
      </div>
      <div class="example">
        <div class="preview">
          <span class="otp">
            <input
              type="text"
              inputmode="numeric"
              pattern="\\d*"
              maxlength="6"
              value="248"
              disabled
              aria-label="One-time passcode"
            />
          </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="otp">
  <input type="text" inputmode="numeric" pattern="\\d*" maxlength="6" disabled />
</span>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}
