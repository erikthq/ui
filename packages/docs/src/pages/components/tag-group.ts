import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { icon } from "../../icon";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "checkbox", label: "Checkbox (multi-select)" },
  { id: "radio", label: "Radio (single-select)" },
  { id: "colors", label: "Colors" },
  { id: "in-field", label: "In a field" },
  { id: "disabled", label: "Disabled" },
];

export async function TagGroupPage(path: string) {
  return Layout({
    title: "Tag Group",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Tag Group</h1>
            ${raw(titleActions(path, "tag-group"))}
          </div>
          <p>
            Selectable tags built from
            <a href="${url("/components/badge")}">Badge</a>s wrapping a hidden
            <code>&lt;input type="checkbox"&gt;</code> or
            <code>&lt;input type="radio"&gt;</code>.
          </p>
        </hgroup>

        <h3>Composed of</h3>
        <dl class="composition">
          <dt><a href="${url("/components/badge")}"><code>Badge</code></a></dt>
          <dd>The look of each tag</dd>
        </dl>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("tag-group"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="checkbox">Checkbox (multi-select)</h2>
        <p>
          Use <code>&lt;input type="checkbox"&gt;</code> to let more than one
          tag be selected at once.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label
            ><input type="checkbox" checked /><span class="badge"
              >${raw(icon("palette"))} Design</span
            ></label
          >
          <label
            ><input type="checkbox" /><span class="badge"
              >${raw(icon("code"))} Engineering</span
            ></label
          >
          <label
            ><input type="checkbox" checked /><span class="badge"
              >${raw(icon("box"))} Product</span
            ></label
          >
          <label
            ><input type="checkbox" /><span class="badge"
              >${raw(icon("speakerphone"))} Marketing</span
            ></label
          >
          <label
            ><input type="checkbox" /><span class="badge"
              >${raw(icon("lifebuoy"))} Support</span
            ></label
          >
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
  <label>
  <input type="checkbox" checked />
  <span class="badge">
  <svg><!-- palette --></svg> Design
  </span>
  </label>
  <label>
  <input type="checkbox" />
  <span class="badge">
  <svg><!-- code --></svg> Engineering
  </span>
  </label>
  <label>
  <input type="checkbox" checked />
  <span class="badge">
  <svg><!-- box --></svg> Product
  </span>
  </label>
  <label>
  <input type="checkbox" />
  <span class="badge">
  <svg><!-- speakerphone --></svg> Marketing
  </span>
  </label>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="radio">Radio (single-select)</h2>
        <p>
          Use <code>&lt;input type="radio"&gt;</code> with a shared
          <code>name</code> so only one tag can be selected.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label
            ><input type="radio" name="tag-size" checked /><span class="badge"
              >Small</span
            ></label
          >
          <label
            ><input type="radio" name="tag-size" /><span class="badge"
              >Medium</span
            ></label
          >
          <label
            ><input type="radio" name="tag-size" /><span class="badge"
              >Large</span
            ></label
          >
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
  <label><input type="radio" name="size" checked /><span class="badge">Small</span></label>
  <label><input type="radio" name="size" /><span class="badge">Medium</span></label>
  <label><input type="radio" name="size" /><span class="badge">Large</span></label>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="colors">Colors</h2>
        <p>
          Any <a href="${url("/components/badge")}">Badge</a> color modifier
          works, including <code>outlined</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label
            ><input type="checkbox" checked /><span class="badge constructive"
              >Constructive</span
            ></label
          >
          <label
            ><input type="checkbox" checked /><span class="badge destructive"
              >Destructive</span
            ></label
          >
          <label
            ><input type="checkbox" /><span class="badge color4 outlined"
              >Outlined</span
            ></label
          >
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label><input type="checkbox" checked /><span class="badge constructive">Constructive</span></label>
<label><input type="checkbox" checked /><span class="badge destructive">Destructive</span></label>
<label><input type="checkbox" /><span class="badge color4 outlined">Outlined</span></label>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="in-field">In a field</h2>
        <p>
          Drop tags inside a <a href="${url("/components/field")}">Field</a>
          for a labeled control with hint text.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="field">
            <span>Skills</span>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
              <label
                ><input type="checkbox" checked /><span class="badge"
                  >Design</span
                ></label
              >
              <label
                ><input type="checkbox" /><span class="badge"
                  >Research</span
                ></label
              >
              <label
                ><input type="checkbox" checked /><span class="badge"
                  >Writing</span
                ></label
              >
            </div>
            <small>Select all that apply.</small>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="field">
  <span>Skills</span>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
    <label><input type="checkbox" checked /><span class="badge">Design</span></label>
    <label><input type="checkbox" /><span class="badge">Research</span></label>
    <label><input type="checkbox" checked /><span class="badge">Writing</span></label>
  </div>
  <small>Select all that apply.</small>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled</h2>
        <p>Add <code>disabled</code> to the input to disable a single tag.</p>
      </div>
      <div class="example">
        <div class="preview" style="gap:0.5rem">
          <label
            ><input type="checkbox" checked /><span class="badge"
              >Design</span
            ></label
          >
          <label
            ><input type="checkbox" disabled /><span class="badge"
              >Engineering</span
            ></label
          >
          <label
            ><input type="checkbox" checked disabled /><span class="badge"
              >Product</span
            ></label
          >
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<label><input type="checkbox" disabled /><span class="badge">Engineering</span></label>`,
            ),
          )}
        </div>
      </div>
    `,
  });
}
