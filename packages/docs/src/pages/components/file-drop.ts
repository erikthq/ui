import { html, raw } from 'hono/html'
import { Layout, url } from '../../layout'
import { highlight } from '../../highlight'
import { icon } from '../../icon'

const toc = [
  { id: 'default', label: 'Default' },
  { id: 'with-hint', label: 'With hint' },
  { id: 'with-filename', label: 'With filename' },
  { id: 'with-field', label: 'With field' },
]

export async function FileDropPage(path: string) {
  return Layout({
    title: 'File Drop',
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>File Drop</h1>
          <p>
            A styled file input drop zone using <code>label.file-drop</code>.
          </p>
        </hgroup>

        <h3>Works with</h3>
        <dl class="composition">
          <dt><a href="${url("/components/field")}"><code>Field</code></a></dt>
          <dd>Wrapper for a label</dd>
        </dl>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="file-drop" style="width:100%">
            <input type="file" />
            ${raw(icon("upload"))}
            Drag files here or choose from folder
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="file-drop">
  <input type="file" />
  <svg><!-- upload icon --></svg>
  Drag files here or choose from folder
</label>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="with-hint">With hint</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="file-drop" style="width:100%">
            <input type="file" accept="image/*" />
            ${raw(icon("upload"))}
            Drag image here or choose from folder
            <small>PNG, JPG or WebP up to 10 MB</small>
          </label>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<label class="file-drop">
  <input type="file" accept="image/*" />
  <svg><!-- upload icon --></svg>
  Drag image here or choose from folder
  <small>PNG, JPG or WebP up to 10 MB</small>
</label>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-filename">With filename</h2>
      </div>
      <div class="example">
        <div class="preview">
          <label class="file-drop" style="width:100%">
            <input type="file" onchange="this.nextElementSibling.nextElementSibling.textContent = this.files[0]?.name ?? 'Drag files here or choose from folder'" />
            ${raw(icon("upload"))}
            <span>Drag files here or choose from folder</span>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="file-drop">
  <input type="file"
    onchange="this.nextElementSibling.nextElementSibling.textContent =
      this.files[0]?.name ?? 'Drag files here or choose from folder'" />
  <svg><!-- upload icon --></svg>
  <span>Drag files here or choose from folder</span>
</label>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="with-field">With field</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <div class="field" style="width:100%">
            <span>Attachment</span>
            <label class="file-drop">
              <input type="file" />
              ${raw(icon("upload"))}
              Drag files here or choose from folder
            </label>
            <small>Max 10 MB.</small>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="field">
  <span>Attachment</span>
  <label class="file-drop">
    <input type="file" />
    <svg><!-- upload icon --></svg>
    Drag files here or choose from folder
  </label>
  <small>Max 10 MB.</small>
</div>`),
          )}
        </div>
      </div>
    `,
  })
}
