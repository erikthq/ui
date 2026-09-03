import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'overriding-styles', label: 'Overriding styles' },
  { id: 'example', label: 'Example' },
]

export async function CustomizationPage(path: string) {
  return Layout({
    title: 'Customization',
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Customization</h1>
          <p>
            @erikt/ui lives in a <code>@layer</code>. Any styles you write
            outside of a layer beat it.
          </p>
        </hgroup>

        <h2 id="how-it-works">How it works</h2>
        <p>
          Everything @erikt/ui ships sits inside <code>@layer ui</code>. The
          cascade ranks unlayered styles above every layer, so plain CSS
          overrides any of it. No <code>!important</code>, no specificity
          games.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await highlight(
            `/* erikt/ui internals, low priority */\n` +
            `@layer ui {\n` +
            `  button { border-radius: 8px; }\n` +
            `}\n` +
            `\n` +
            `/* your styles, always win */\n` +
            `button { border-radius: 0; }`,
            80, 'css'
          ))}
        </div>
      </div>

      <div class="prose">
        <h2 id="overriding-styles">Overriding styles</h2>
        <p>
          Put your overrides in a plain stylesheet loaded after @erikt/ui. Any
          element or class it styles is fair game.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await highlight(
            `<link rel="stylesheet" href="ui.css" />\n` +
            `<link rel="stylesheet" href="your-styles.css" />`,
            80, 'html'
          ))}
        </div>
      </div>
      <div class="prose">
        <p>
          Or inline in a <code>&lt;style&gt;</code> tag, or inside your own
          <code>@layer</code> as long as it is declared after
          <code>erikt/ui</code> in the layer order.
        </p>

        <h2 id="example">Example</h2>
        <p>
          A default button next to one with <code>border-radius: 0</code> from
          a local override.
        </p>
      </div>

      <div class="example">
        <div class="preview" style="gap: 1rem; flex-direction: column; align-items: flex-start">
          <div style="display: flex; gap: 0.5rem; align-items: center">
            <button>Default</button>
            <button class="outlined">Default</button>
            <button class="ghost">Default</button>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center">
            <style>
              .btn-sharp { border-radius: 0; }
            </style>
            <button class="btn-sharp">Sharp</button>
            <button class="outlined btn-sharp">Sharp</button>
            <button class="ghost btn-sharp">Sharp</button>
          </div>
        </div>
        <div class="code-block">
          ${raw(await highlight(
            `/* your-styles.css */\n` +
            `button { border-radius: 0; }`,
            80, 'css'
          ))}
        </div>
      </div>

      <div class="prose">
        <p>
          The same works for spacing, font sizes, colors, transitions, anything
          else. Tokens like <code>--ui-primary</code> go further. Change one and
          every component that reads it updates at once. See
          <a href="/themes">Themes</a> for the full list.
        </p>
      </div>
    `,
  })
}
