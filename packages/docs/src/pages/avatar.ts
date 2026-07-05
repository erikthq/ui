import { html, raw } from "hono/html";
import { Layout, url } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "fallback", label: "Fallback" },
  { id: "square", label: "Square" },
  { id: "status", label: "Status" },
  { id: "group", label: "Group" },
  { id: "with-tooltip", label: "With tooltip" },
  { id: "with-popover", label: "With popover" },
];

export async function AvatarPage(path: string) {
  return Layout({
    title: "Avatar",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Avatar <sup class="badge constructive">0.0.13</sup></h1>
          <p>
            A user's picture, initials, or icon using
            <code>class="avatar"</code>.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <img
            class="avatar"
            src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-1"
            alt=""
          />
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<img class="avatar" src="/avatar.jpg" alt="" />`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="fallback">Fallback</h2>
        <p>
          Skip the <code>&lt;img&gt;</code> and use initials or an icon instead.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <span class="avatar">JR</span>
          <span class="avatar" style="margin-inline-start:0;box-shadow:none">
            ${raw(icon("user"))}
          </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span class="avatar">JR</span>
<span class="avatar">
<svg><!-- icon --></svg>
</span>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="square">Square</h2>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <img
            class="avatar square"
            src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-1"
            alt=""
          />
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<img  class="avatar square" src="/avatar.jpg" alt="" />`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="status">Status</h2>
        <p>
          Nest a <code>&lt;span class="badge"&gt;</code> inside the avatar to
          show a presence dot in the corner. Any
          <a href="${url("/components/badge")}">Badge</a> color modifier
          works.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <span class="avatar">
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-1"
              alt=""
            />
            <span class="badge constructive">
              ${raw(icon('plus'))}
            </span>
          </span>
          <span class="avatar" style="margin-inline-start:0;box-shadow:none">
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-2"
              alt=""
            />
            <span class="badge destructive">
              ${raw(icon('trash'))}
            </span>
          </span>
          <span class="avatar" style="margin-inline-start:0;box-shadow:none">
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-3"
              alt=""
            />
            <span class="badge color2"></span>
          </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="avatar">
  <img src="/avatar.jpg" alt="" />
  <span class="badge constructive">
  <svg><!-- icon --></svg>
  </span>
</span>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="group">Group</h2>
        <p>
          Adjacent avatars automatically overlap into a stack, no wrapper
          needed.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <span class="avatar">
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-1"
              alt=""
            />
          </span>
          <span class="avatar">
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-2"
              alt=""
            />
          </span>
          <span class="avatar">
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-3"
              alt=""
            />
          </span>
          <span class="avatar">+3</span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<span class="avatar"><img src="/a.jpg" alt="" /></span>
<span class="avatar"><img src="/b.jpg" alt="" /></span>
<span class="avatar"><img src="/c.jpg" alt="" /></span>
<span class="avatar">+3</span>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-tooltip">With tooltip</h2>
        <p>
          Add <code>data-tooltip</code>, and <code>aria-label</code> to show a
          name on hover or keyboard focus.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <span
            class="avatar"
            tabindex="0"
            data-tooltip
            aria-label="Jordan Rivera"
          >
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-1"
              alt=""
            />
          </span>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<span class="avatar" data-tooltip aria-label="Jordan Rivera">
  <img src="/avatar.jpg" alt="" />
</span>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-popover">With popover</h2>
        <p>
          Turn the avatar into a <code>&lt;button&gt;</code> and connect it to a
          <code>[popover]</code> with <code>popovertarget</code> to show a menu
          on click.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <button
            class="avatar secondary"
            popovertarget="avatar-popover-demo"
            aria-label="Open account menu"
          >
            <img
              src="https://api.dicebear.com/9.x/pixel-art/svg?seed=avatar-1"
              alt=""
            />
          </button>
          <div id="avatar-popover-demo" popover>
            <menu>
              <li><small>Jordan Rivera</small></li>
              <li><button class="ghost">Profile</button></li>
              <li><button class="ghost">Settings</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive">Sign out</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<button class="avatar secondary" popovertarget="avatar-menu">
  <img src="/avatar.jpg" alt="" />
</button>

<div id="avatar-menu" popover>
  <menu>
    <li><small>Jordan Rivera</small></li>
    <li><button class="ghost">Profile</button></li>
    <li><button class="ghost">Settings</button></li>
    <li><hr /></li>
    <li><button class="ghost destructive">Sign out</button></li>
  </menu>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
