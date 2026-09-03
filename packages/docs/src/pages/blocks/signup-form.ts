import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { icon } from "../../icon";

export async function SignupFormPage(path: string) {
  return Layout({
    wide: true,
    title: "Signup Form",
    path,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Signup Form</h1>
          <p>
            An account creation form with social logins, built from native form
            elements.
          </p>
        </hgroup>
      </div>

      <div class="example">
        <div class="preview" style="justify-content:center">
          <form
            style="display:flex;flex-direction:column;gap:var(--ui-spacing-4);width:100%;max-width:420px;"
          >
            <header style="text-align:center">
              <h2 style="margin-bottom:var(--ui-spacing-1)">
                Create your account
              </h2>
              <p style="color:var(--ui-neutral-400)">
                Enter your email below to create your account
              </p>
            </header>

            <label class="field">
              Email
              <input type="email" placeholder="coolcat@example.com" />
              <small
                >We'll use this to contact you. We will not share your email
                with anyone else.</small
              >
            </label>

            <div
              style="display:grid;grid-template-columns:1fr 1fr;gap:var(--ui-spacing-3)"
            >
              <label class="field">
                Password
                <input type="password" minlength="8" />
              </label>
              <label class="field">
                Confirm Password
                <input type="password" minlength="8" />
              </label>
            </div>
            <small
              style="text-align:left;margin-top:calc(var(--ui-spacing-1) * -1)"
              >Must be at least 8 characters long.</small
            >

            <button type="submit">Create Account</button>

            <div
              style="display:flex;align-items:center;gap:var(--ui-spacing-3)"
            >
              <hr style="flex:1" />
              <small style="color:var(--ui-neutral-400)"
                >Or continue with</small
              >
              <hr style="flex:1" />
            </div>

            <div
              style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--ui-spacing-3)"
            >
              <button type="button" class="outlined">
                ${raw(icon("brand-apple", { size: 14, filled: true }))}
              </button>
              <button type="button" class="outlined">
                ${raw(icon("brand-google", { size: 14, filled: true }))}
              </button>
              <button type="button" class="outlined">
                ${raw(icon("brand-facebook", { size: 14, filled: true }))}
              </button>
            </div>

            <footer style="color:var(--ui-neutral-400);text-align:center">
              Already have an account? <a href="#">Sign in</a>
            </footer>
          </form>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--ui-spacing-4);
    width: 100%;
    max-width: 420px;
    }
    
  header, footer {
    text-align: center;
  }

  .password-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--ui-spacing-3);
    text-align: left;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: var(--ui-spacing-3);
  }

  .divider hr {
    flex: 1;
  }

  .social-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--ui-spacing-3);
  }
</style>

<form>
  <header>
    <h2>Create your account</h2>
    <p style="color: var(--ui-neutral-400)">Enter your email below to create your account</p>
  </header>

  <label class="field" style="">
    Email
    <input type="email" placeholder="coolcat@example.com" />
    <small>
    We'll use this to contact you. We will not share your email with anyone else.
    </small>
  </label>

  <div class="password-row">
    <label class="field">
      Password
      <input type="password" minlength="8" />
    </label>
    <label class="field">
      Confirm Password
      <input type="password" minlength="8" />
    </label>
  </div>
  <small>Must be at least 8 characters long.</small>

  <button type="submit">Create Account</button>

  <div class="divider">
    <hr />
    <small style="color:var(--ui-neutral-400)">Or continue with</small>
    <hr />
  </div>

  <div class="social-row">
    <button type="button" class="outlined"><svg>...</svg></button>
    <button type="button" class="outlined"><svg>...</svg></button>
    <button type="button" class="outlined"><svg>...</svg></button>
  </div>

  <footer style="color:var(--ui-neutral-400)">Already have an account? <a href="#">Sign in</a></footer>
</form>`),
          )}
        </div>
      </div>
    `,
  });
}
