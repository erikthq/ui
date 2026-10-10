import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "in-a-card", label: "In a card" },
  { id: "in-prose", label: "In prose" },
];

export async function HeadingGroupPage(path: string) {
  return Layout({
    title: "Heading Group",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Heading Group</h1>
            ${raw(titleActions(path, "heading-group"))}
          </div>
          <p>
            A heading with a subtitle, using the native
            <code>&lt;hgroup&gt;</code> element.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("heading-group"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
        <p>
          Put a heading and a <code>&lt;p&gt;</code> inside
          <code>&lt;hgroup&gt;</code>. The paragraph gets a muted color and a
          small gap below the heading.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <hgroup>
            <h3>Set a new milestone</h3>
            <p>Define your target and we'll help you pace your savings.</p>
          </hgroup>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<hgroup>
  <h3>Set a new milestone</h3>
  <p>Define your target and we'll help you pace your savings.</p>
</hgroup>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="in-a-card">In a card</h2>
        <p>
          Heading groups work anywhere, not only inside
          <code>.prose</code>. Use one as the title of a card or a form.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <article style="max-width:22rem">
            <hgroup>
              <h3>Team</h3>
              <p>Invite people to collaborate on this project.</p>
            </hgroup>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article>
  <hgroup>
    <h3>Team</h3>
    <p>Invite people to collaborate on this project.</p>
  </hgroup>
</article>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="in-prose">In prose</h2>
        <p>
          Inside <code>.prose</code>, a heading group also gets space below
          it, to separate it from the text that follows.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="prose">
            <hgroup>
              <h2>Release notes</h2>
              <p>Version 2.0</p>
            </hgroup>
            <p>This release adds dark mode and a new color system.</p>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <hgroup>
    <h2>Release notes</h2>
    <p>Version 2.0</p>
  </hgroup>
  <p>This release adds dark mode and a new color system.</p>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
