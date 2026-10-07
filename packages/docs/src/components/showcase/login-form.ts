import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function LoginForm() {
  return html`
    <style>
      .showcase-login-form {
        position: relative;

        > button {
          position: absolute;
          top: var(--ui-spacing-3);
          right: var(--ui-spacing-3);
        }

        .empty {
          padding: 0;

          > button {
            width: 100%;
          }
        }

        hr {
          --bg-color: var(--ui-neutral-100);
        }
      }
    </style>

    <article class="secondary showcase-login-form">
      <button class="secondary round" aria-label="Close">
        ${raw(icon("x"))}
      </button>

      <section class="empty">
        ${raw(icon("user"))}

        <h3>Create an account</h3>
        <p>Start your free 7-day trial. No credit card required.</p>

        <button>Get started</button>

        <hr data-label="OR" />

        <button class="secondary">
          ${raw(icon("brand-google", { filled: true }))} Continue with Google
        </button>
        <button class="secondary">
          ${raw(icon("brand-apple", { filled: true }))} Continue with Apple
        </button>
      </section>
    </article>
  `;
}
