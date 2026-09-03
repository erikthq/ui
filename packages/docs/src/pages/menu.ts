import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "with-icons", label: "With icons" },
  { id: "with-section-labels", label: "With section labels" },
  { id: "with-radios", label: "With radios" },
  { id: "with-checkboxes", label: "With checkboxes" },
];

export async function MenuPage(path: string) {
  return Layout({
    title: "Menu",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Menu</h1>
          <p>
            A styled list of actions or options. The
            <code>&lt;menu&gt;</code> element is styled directly, no class
            needed. Place it inside a <code>[popover]</code> for a dropdown, or
            use it standalone anywhere.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li><button class="ghost">Edit</button></li>
              <li><button class="ghost">Duplicate</button></li>
              <li><button class="ghost">Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li><button class="ghost">Edit</button></li>
  <li><button class="ghost">Duplicate</button></li>
  <li><button class="ghost">Share</button></li>
  <li><hr /></li>
  <li><button class="ghost destructive">Delete</button></li>
</menu>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-icons">With icons</h2>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li>
                <button class="ghost">
                  ${raw(icon("pencil"))}
                  Edit
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(icon("copy"))}
                  Duplicate
                </button>
              </li>
              <li>
                <button class="ghost">
                  ${raw(icon("share"))}
                  Share
                </button>
              </li>
              <li><hr /></li>
              <li>
                <button class="ghost destructive">
                  ${raw(icon("trash"))}
                  Delete
                </button>
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li>
    <button class="ghost">
      <svg><!-- edit icon --></svg>
      Edit
    </button>
  </li>
  <li>
    <button class="ghost">
      <svg><!-- copy icon --></svg>
      Duplicate
    </button>
  </li>
  <li>
    <button class="ghost">
      <svg><!-- share icon --></svg>
      Share
    </button>
  </li>
  <li><hr /></li>
  <li>
    <button class="ghost destructive">
      <svg><!-- trash icon --></svg>
      Delete
    </button>
  </li>
</menu>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-section-labels">With section labels</h2>
        <p>
          A <code>&lt;li&gt;</code> whose only child is a text-only
          <code>&lt;small&gt;</code> renders as a muted section header.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li><small>Actions</small></li>
              <li><button class="ghost">New File</button></li>
              <li><button class="ghost">New Folder</button></li>
              <li><hr /></li>
              <li><small>Danger zone</small></li>
              <li><button class="ghost destructive">Delete</button></li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li><small>Actions</small></li>
  <li><button class="ghost">New File</button></li>
  <li><button class="ghost">New Folder</button></li>
  <li><hr /></li>
  <li><small>Danger zone</small></li>
  <li><button class="ghost destructive">Delete</button></li>
</menu>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-radios">With radios</h2>
        <p>
          Radio inputs inside <code>&lt;label&gt;</code>s show a checkmark on
          the selected item. The input itself is hidden.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li><small>Sort by</small></li>
              <li>
                <label
                  ><input type="radio" name="menu-sort" value="newest" checked />
                  Newest</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="menu-sort" value="oldest" />
                  Oldest</label
                >
              </li>
              <li>
                <label
                  ><input type="radio" name="menu-sort" value="name" />
                  Name</label
                >
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li><small>Sort by</small></li>
  <li><label>
    <input type="radio" name="sort" value="newest" checked /> Newest
  </label></li>
  <li><label>
    <input type="radio" name="sort" value="oldest" /> Oldest
  </label></li>
  <li><label>
    <input type="radio" name="sort" value="name" /> Name
  </label></li>
</menu>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-checkboxes">With checkboxes</h2>
        <p>
          Checkboxes show a filled square when checked and a faint empty one
          when not, so an option reads as toggleable either way.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <div style="width:180px">
            <menu>
              <li><small>Columns</small></li>
              <li>
                <label
                  ><input
                    type="checkbox"
                    name="menu-col-name"
                    checked
                  />Name</label
                >
              </li>
              <li>
                <label
                  ><input
                    type="checkbox"
                    name="menu-col-size"
                    checked
                  />Size</label
                >
              </li>
              <li>
                <label
                  ><input type="checkbox" name="menu-col-type" />Type</label
                >
              </li>
              <li>
                <label
                  ><input
                    type="checkbox"
                    name="menu-col-modified"
                  />Modified</label
                >
              </li>
            </menu>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<menu>
  <li><small>Columns</small></li>
  <li><label>
    <input type="checkbox" name="name" checked /> Name
  </label></li>
  <li><label>
    <input type="checkbox" name="size" checked /> Size
  </label></li>
  <li><label>
    <input type="checkbox" name="type" /> Type
  </label></li>
  <li><label>
    <input type="checkbox" name="modified" /> Modified
  </label></li>
</menu>`),
          )}
        </div>
      </div>
    `,
  });
}
