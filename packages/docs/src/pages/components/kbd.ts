import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "combinations", label: "Combinations" },
];

export async function KbdPage(path: string) {
  return Layout({
    title: "Kbd",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Kbd</h1>
            ${raw(titleActions(path, "kbd"))}
          </div>
          <p>
            Represents a keyboard input using the native
            <code>&lt;kbd&gt;</code> element.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("kbd"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <kbd>⌘</kbd>
          <kbd>⇧</kbd>
          <kbd>⌥</kbd>
          <kbd>⌃</kbd>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<kbd>⌘</kbd>
<kbd>⇧</kbd>
<kbd>⌥</kbd>
<kbd>⌃</kbd>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="combinations">Combinations</h2>
        <p>Wrap keys in an outer <code>&lt;kbd&gt;</code> to form a combination. The <code>+</code> separator is a plain text node between the inner elements.</p>
      </div>
      <div class="example">
        <div class="preview">
          <kbd><kbd>⌘</kbd>+<kbd>K</kbd></kbd>
          <kbd><kbd>⌘</kbd>+<kbd>⇧</kbd>+<kbd>P</kbd></kbd>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<kbd><kbd>⌘</kbd>+<kbd>K</kbd></kbd>
<kbd><kbd>⌘</kbd>+<kbd>⇧</kbd>+<kbd>P</kbd></kbd>`))}
        </div>
      </div>
    `,
  });
}
