import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "nested", label: "Nested" },
];

export async function SubmenuPage(path: string) {
  return Layout({
    title: "Submenu",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Submenu</h1>
          <p>
            A nested menu that opens to the side of a parent menu item. Built
            with the native Popover API. No JavaScript.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <button popovertarget="submenu-demo">Edit</button>
          <div id="submenu-demo" popover>
            <menu>
              <li><button class="ghost">Cut</button></li>
              <li><button class="ghost">Copy</button></li>
              <li><button class="ghost">Paste</button></li>
              <li>
                <button class="ghost" popovertarget="submenu-find">Find</button>
                <div id="submenu-find" popover data-placement="right top">
                  <menu>
                    <li><button class="ghost">Find…</button></li>
                    <li><button class="ghost">Find Next</button></li>
                    <li><button class="ghost">Find Previous</button></li>
                  </menu>
                </div>
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="edit-menu">Edit</button>

<div id="edit-menu" popover>
  <menu>
    <li><button class="ghost">Cut</button></li>
    <li><button class="ghost">Copy</button></li>
    <li><button class="ghost">Paste</button></li>
    <li>
      <button class="ghost" popovertarget="find-menu">Find</button>
      <div id="find-menu" popover data-placement="right top">
        <menu>
          <li><button class="ghost">Find…</button></li>
          <li><button class="ghost">Find Next</button></li>
          <li><button class="ghost">Find Previous</button></li>
        </menu>
      </div>
    </li>
  </menu>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="nested">Nested</h2>
        <p>Submenus can be nested to any depth.</p>
      </div>
      <div class="example">
        <div class="preview">
          <button popovertarget="submenu-demo-2">Format</button>
          <div id="submenu-demo-2" popover>
            <menu>
              <li><button class="ghost">Bold</button></li>
              <li><button class="ghost">Italic</button></li>
              <li>
                <button class="ghost" popovertarget="submenu-lists">
                  Lists
                </button>
                <div id="submenu-lists" popover data-placement="right top">
                  <menu>
                    <li><button class="ghost">Bullet List</button></li>
                    <li><button class="ghost">Numbered List</button></li>
                    <li>
                      <button class="ghost" popovertarget="submenu-indent">
                        Indent
                      </button>
                      <div
                        id="submenu-indent"
                        popover
                        data-placement="right top"
                      >
                        <menu>
                          <li><button class="ghost">Increase</button></li>
                          <li><button class="ghost">Decrease</button></li>
                        </menu>
                      </div>
                    </li>
                  </menu>
                </div>
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button popovertarget="format-menu">Format</button>

<div id="format-menu" popover>
  <menu>
    <li><button class="ghost">Bold</button></li>
    <li><button class="ghost">Italic</button></li>
    <li>
      <button class="ghost" popovertarget="lists-menu">Lists</button>
      <div id="lists-menu" popover data-placement="right top">
        <menu>
          <li><button class="ghost">Bullet List</button></li>
          <li><button class="ghost">Numbered List</button></li>
          <li>
            <button class="ghost" popovertarget="indent-menu">Indent</button>
            <div id="indent-menu" popover data-placement="right top">
              <menu>
                <li><button class="ghost">Increase</button></li>
                <li><button class="ghost">Decrease</button></li>
              </menu>
            </div>
          </li>
        </menu>
      </div>
    </li>
  </menu>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
