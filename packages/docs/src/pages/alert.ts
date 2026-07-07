import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "colors", label: "Colors" },
  { id: "with-action", label: "With action" },
  { id: "with-list", label: "With list" },
  { id: "dismissible", label: "Dismissible" },
  { id: "loading", label: "Loading" },
];

export async function AlertPage(path: string) {
  return Layout({
    title: "Alert",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Alert</h1>
          <p>
            An <code>&lt;article&gt;</code> with <code>role="alert"</code> or
            <code>role="status"</code>, reusing the same card surface as
            <a href="/components/card">Card</a>. Use
            <code>role="alert"</code> for urgent messages that should
            interrupt a screen reader, and <code>role="status"</code> for
            calmer ones like success or progress updates.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Icon, <code>&lt;strong&gt;</code> title, and <code>&lt;p&gt;</code>
          description as direct children. Color variants
          (<code>primary</code>, <code>constructive</code>,
          <code>destructive</code>, <code>color1</code> through
          <code>color6</code>) tint the icon and title, same as
          <a href="/components/badge">Badge</a>.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="flex-direction:column;width:100%">
          <article role="status" style="width:100%">
            ${raw(icon("info-circle"))}
            <strong>New features available</strong>
            <p>
              Check out our latest updates including dark mode support and
              improved accessibility features.
            </p>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article role="status">
  <svg><!-- icon --></svg>
  <strong>New features available</strong>
  <p>
    Check out our latest updates including dark mode support and improved
    accessibility features.
  </p>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="colors">Colors</h2>
        <p>
          Same color modifiers as <a href="/components/badge">Badge</a>:
          <code>primary</code>, <code>constructive</code>,
          <code>destructive</code>, and <code>color1</code> through
          <code>color6</code>. They tint the icon and title, the description
          stays neutral.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%">
          <article role="alert" class="color2" style="width:100%">
            ${raw(icon("alert-triangle"))}
            <strong>Scheduled maintenance</strong>
            <p>
              Our services will be unavailable on Sunday, March 15th from
              2:00 AM to 6:00 AM UTC for scheduled maintenance.
            </p>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article role="alert" class="color2">
  <svg><!-- icon --></svg>
  <strong>Scheduled maintenance</strong>
  <p>
    Our services will be unavailable on Sunday, March 15th from 2:00 AM to
    6:00 AM UTC for scheduled maintenance.
  </p>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-action">With action</h2>
        <p>
          A trailing <code>&lt;button&gt;</code> stays vertically centered
          next to the content.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%">
          <article role="status" class="primary" style="width:100%">
            ${raw(icon("info-circle"))}
            <strong>Update available</strong>
            <p>
              A new version of the application is available. Please refresh
              to get the latest features and bug fixes.
            </p>
            <button>Refresh</button>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article role="status" class="primary">
  <svg><!-- icon --></svg>
  <strong>Update available</strong>
  <p>A new version of the application is available.</p>
  <button>Refresh</button>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-list">With list</h2>
        <p>
          A <code>&lt;ul&gt;</code> as a direct child lines up under the
          title and description, and still leaves room for a trailing
          action.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%">
          <article role="alert" class="destructive" style="width:100%">
            ${raw(icon("alert-circle"))}
            <strong>Unable to connect to server</strong>
            <p>We're experiencing connection issues. Please try the following:</p>
            <ul>
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
            </ul>
            <button class="destructive">Retry</button>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article role="alert" class="destructive">
  <svg><!-- icon --></svg>
  <strong>Unable to connect to server</strong>
  <p>We're experiencing connection issues. Please try the following:</p>
  <ul>
    <li>Check your internet connection</li>
    <li>Refresh the page</li>
    <li>Clear your browser cache</li>
  </ul>
  <button class="destructive">Retry</button>
</article>`),
          )}
        </div>
      </div>

      <div class="example">
        <div class="preview" style="width:100%">
          <article role="status" class="primary" style="width:100%">
            ${raw(icon("info-circle"))}
            <strong>Steps to reset your password</strong>
            <p>Follow these steps in order:</p>
            <ol>
              <li>Open the account settings page</li>
              <li>Click "Reset password"</li>
              <li>Check your email for a confirmation link</li>
            </ol>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article role="status" class="primary">
  <svg><!-- icon --></svg>
  <strong>Steps to reset your password</strong>
  <p>Follow these steps in order:</p>
  <ol>
    <li>Open the account settings page</li>
    <li>Click "Reset password"</li>
    <li>Check your email for a confirmation link</li>
  </ol>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="dismissible">Dismissible</h2>
        <p>
          Pair a <code>ghost square round</code> button with
          <code>onclick</code> to close the alert, same pattern as anywhere
          else in @erikt/ui.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%">
          <article role="status" class="constructive" id="alert-dismissible" style="width:100%">
            ${raw(icon("circle-check"))}
            <strong>Profile updated successfully</strong>
            <button
              class="ghost square round"
              aria-label="Dismiss"
              onclick="document.getElementById('alert-dismissible').remove()"
            >
              ${raw(icon("x"))}
            </button>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article role="status" class="constructive">
  <svg><!-- icon --></svg>
  <strong>Profile updated successfully</strong>
  <button
    class="ghost square round"
    aria-label="Dismiss"
    onclick="this.closest('article').remove()"
  >
    <svg><!-- x icon --></svg>
  </button>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="loading">Loading</h2>
        <p>
          Swap the icon for an element with <code>aria-busy="true"</code> to
          get the built-in <a href="/components/loading">spinner</a>.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="width:100%">
          <article role="status" class="primary" style="width:100%">
            <span aria-busy="true"></span>
            <strong>Processing your request</strong>
            <p>Please wait while we sync your data. This may take a few moments.</p>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article role="status" class="primary">
  <span aria-busy="true"></span>
  <strong>Processing your request</strong>
  <p>Please wait while we sync your data. This may take a few moments.</p>
</article>`),
          )}
        </div>
      </div>
    `,
  });
}
