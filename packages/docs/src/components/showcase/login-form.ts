import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function LoginForm() {
  return html`
    <article class="secondary" style="position: relative;">
      <button
        class="secondary round"
        aria-label="Close"
        style="position:absolute;top:var(--ui-spacing-3);right:var(--ui-spacing-3)"
      >
        ${raw(icon("x"))}
      </button>

      <section class="empty" style="padding: 0;">
        ${raw(icon("user"))}

        <h3>Create an account</h3>
        <p>Start your free 7-day trial. No credit card required.</p>

        <button style="width:100%">Get started</button>

        <hr data-label="OR" style="--bg-color: var(--ui-neutral-100)" />

        <button class="secondary" style="width:100%">
          ${raw(icon("brand-google", { filled: true }))} Continue with Google
        </button>
        <button class="secondary" style="width:100%">
          ${raw(icon("brand-apple", { filled: true }))} Continue with Apple
        </button>
      </section>
    </article>
  `;
}
