import { html, raw } from "hono/html";
import { icon } from "../../icon";

const options = ["Social media", "Search engine", "Referral", "Other"];

export function ReferralSurvey() {
  return html`
    <style>
      .showcase-referral-survey {
        [role="radiogroup"] {
          flex-wrap: wrap;
        }
      }
    </style>

    <article class="outlined showcase-referral-survey grid gap-4">
      <hgroup>
        <h3 id="referral-title">How did you hear about us?</h3>
        <p>Select the option that best describes how you found us.</p>
      </hgroup>

      <div role="radiogroup" aria-labelledby="referral-title" class="flex gap-2">
        ${options.map(
          (option, i) => html`
            <label class="toggle fill">
              <input type="radio" name="referral" ${i === 0 ? "checked" : ""} />
              ${raw(icon("x", { filled: true, attrs: "data-unchecked" }))}
              ${raw(icon("check", { filled: true, attrs: "data-checked" }))}
              ${option}
            </label>
          `,
        )}
      </div>
    </article>
  `;
}
