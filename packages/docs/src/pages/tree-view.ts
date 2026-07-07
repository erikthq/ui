import { html, raw } from "hono/html";
import { Layout, url } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "open", label: "Open by default" },
];

export async function TreeViewPage(path: string) {
  return Layout({
    title: "Tree View",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Tree View</h1>
          <p>
            A nested file or folder hierarchy built from
            <code>&lt;ul&gt;</code>, <code>&lt;li&gt;</code>, and native
            <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>
            disclosures, using <code>class="tree"</code>.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Wrap each folder in a <code>&lt;details&gt;</code> containing a
          <code>&lt;summary&gt;</code> and a nested <code>&lt;ul&gt;</code>.
          Icons come from the markup: drop an <code>&lt;svg&gt;</code> before
          the text in a <code>&lt;summary&gt;</code> or <code>&lt;li&gt;</code>.
          Give a <code>&lt;summary&gt;</code> two icons and the first shows
          while closed, the second while open. Files are plain
          <code>&lt;li&gt;</code> items with no <code>&lt;details&gt;</code>.
          Expand and collapse works natively, no JavaScript required.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <ul class="tree" style="min-width: 200px">
            <li>
              <details>
                <summary>
                  ${raw(icon("folder"))} ${raw(icon("folder-open"))}
                  node_modules
                </summary>
                <ul>
                  <li>
                    <a href="#" class="button ghost"
                      >${raw(icon("file"))} zag-js</a
                    >
                  </li>
                  <li>
                    <button class="ghost">${raw(icon("file"))} panda</button>
                  </li>
                  <li>
                    <details>
                      <summary>
                        ${raw(icon("folder"))} ${raw(icon("folder-open"))}
                        @types
                      </summary>
                      <ul>
                        <li>
                          <button class="ghost">
                            ${raw(icon("file"))} react
                          </button>
                        </li>
                        <li>
                          <button class="ghost">
                            ${raw(icon("file"))} react-dom
                          </button>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  ${raw(icon("folder"))} ${raw(icon("folder-open"))} src
                </summary>
                <ul>
                  <li>
                    <button class="ghost">${raw(icon("file"))} index.ts</button>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <button class="ghost">
                ${raw(icon("file"))} panda.config.ts
              </button>
            </li>
            <li>
              <button class="ghost">${raw(icon("file"))} package.json</button>
            </li>
            <li>
              <button class="ghost">${raw(icon("file"))} renovate.json</button>
            </li>
            <li>
              <button class="ghost">${raw(icon("file"))} README.md</button>
            </li>
          </ul>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ul class="tree">
  <li>
    <details>
      <summary>
        <svg><!-- folder --></svg>
        <svg><!-- folder-open --></svg>
        node_modules
      </summary>
      <ul>
        <li><a href="#" class="button ghost">
        <svg><!-- file --></svg> zag-js
        </a></li>
        <li><button class="ghost"><svg><!-- file --></svg> panda</button></li>
        <li>
          <details>
            <summary>
              <svg><!-- folder --></svg>
              <svg><!-- folder-open --></svg>
              @types
            </summary>
            <ul>
              <li><button class="ghost"><svg><!-- file --></svg> react</button></li>
              <li><button class="ghost"><svg><!-- file --></svg> react-dom</button></li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </li>
  <li><button class="ghost"><svg><!-- file --></svg> package.json</button></li>
  <li><button class="ghost"><svg><!-- file --></svg> README.md</button></li>
</ul>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="open">Open by default</h2>
        <p>
          Add the <code>open</code> attribute to any
          <code>&lt;details&gt;</code>
          to expand it by default, same as the
          <a href="${url("/components/accordion")}">Accordion</a> component.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <ul class="tree" style="min-width: 200px">
            <li>
              <details open>
                <summary>
                  ${raw(icon("folder"))} ${raw(icon("folder-open"))} components
                </summary>
                <ul>
                  <li>
                    <button class="ghost">
                      ${raw(icon("file"))} button.tsx
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      ${raw(icon("file"))} input.tsx
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ul class="tree">
  <li>
    <details open>
      <summary>
        <svg><!-- folder --></svg>
        <svg><!-- folder-open --></svg>
        components
      </summary>
      <ul>
        <li><svg><!-- file --></svg> button.tsx</li>
        <li><svg><!-- file --></svg> input.tsx</li>
      </ul>
    </details>
  </li>
</ul>`),
          )}
        </div>
      </div>
    `,
  });
}
