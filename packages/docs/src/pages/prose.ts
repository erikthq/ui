import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

const toc = [
  { id: 'headings', label: 'Headings' },
  { id: 'lead', label: 'Lead' },
  { id: 'paragraphs', label: 'Paragraphs' },
  { id: 'lists', label: 'Lists' },
  { id: 'blockquote', label: 'Blockquote' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'article', label: 'Article example' },
]

export async function ProsePage(path: string) {
  return Layout({
    title: 'Prose',
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Prose</h1>
          <p>
            Add <code>.prose</code> to any container to give headings and paragraphs
            consistent vertical spacing.
          </p>
        </hgroup>

        <h2 id="headings">Headings</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded prose" style="display: block;">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="lead">Lead</h2>
        <p>
          An <code>&lt;hgroup&gt;</code> pairs a heading with a muted subtitle.
          Any <code>&lt;p&gt;</code> inside is automatically dimmed.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded prose" style="display: block;">
          <hgroup>
            <h2>Tasks</h2>
            <p>Here's a list of your tasks for this month.</p>
          </hgroup>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<hgroup>
  <h2>Tasks</h2>
  <p>Here's a list of your tasks for this month.</p>
</hgroup>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="paragraphs">Paragraphs</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded prose" style="display: block;">
          <p>
            @erikt/ui is a minimal CSS design system. It styles native HTML
            elements directly, with no class names for most components.
          </p>
          <p>
            Drop in the stylesheet and start writing semantic HTML. The defaults
            are sensible, and everything is customizable via CSS variables.
          </p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="lists">Lists</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded prose" style="display: block;">
          <p>There are a few points to note regarding this.</p>
          <ul>
            <li>It is a long established fact that a reader will be distracted by the readable content of a page.</li>
            <li>There are many variations of passages of Lorem Ipsum available.</li>
            <li>The majority have suffered alteration in some form.</li>
          </ul>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <p>There are a few points to note.</p>
  <ul>
    <li>First item.</li>
    <li>Second item.</li>
    <li>Third item.</li>
  </ul>
</div>`),
          )}
        </div>
      </div>
      <div class="example">
        <div class="preview preview-padded prose" style="display: block;">
          <p>Follow these steps to get started.</p>
          <ol>
            <li>Import the stylesheet into your project.</li>
            <li>Write semantic HTML as you normally would.</li>
            <li>Override CSS variables to match your brand.</li>
          </ol>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <p>Follow these steps to get started.</p>
  <ol>
    <li>Import the stylesheet into your project.</li>
    <li>Write semantic HTML as you normally would.</li>
    <li>Override CSS variables to match your brand.</li>
  </ol>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="blockquote">Blockquote</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded prose" style="display: block;">
          <blockquote>
            "Design is a funny word. Some people think design means how it looks. But of course, if you dig deeper, it's really how it works."
            <footer><cite>— Steve Jobs</cite></footer>
          </blockquote>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<blockquote>
  "Design is a funny word. Some people think design means how it
  looks. But of course, if you dig deeper, it's really how it works."
  <footer>
    <cite>— Steve Jobs</cite>
  </footer>
</blockquote>`))}
        </div>
      </div>

      <div class="prose">
        <h2 id="spacing">Spacing</h2>
        <p>
          Vertical spacing between elements is controlled by
          <code>--ui-typography-spacing</code>, which defaults to
          <code>.61em</code>.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(`:root {
  --ui-typography-spacing: .61em;
}`, 80, 'css'),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="article">Article example</h2>
        <p>
          A realistic mix of all prose elements together.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded prose" style="display: block;">
          <hgroup>
            <h1>The Case for Plain HTML</h1>
            <p>Why writing semantic markup still matters in 2025.</p>
          </hgroup>
          <p>
            There is a quiet movement happening at the edges of the web. Developers,
            exhausted by ever-growing dependency trees, are rediscovering a simple
            truth: <a href="#">the browser already knows how to do most things</a>.
          </p>
          <h2>Start with the right element</h2>
          <p>
            Semantic HTML is not a relic. Elements like <code>&lt;article&gt;</code>,
            <code>&lt;nav&gt;</code>, and <code>&lt;details&gt;</code> carry meaning
            that a <code>&lt;div&gt;</code> never can. Screen readers, search engines,
            and browser devtools all benefit.
          </p>
          <ul>
            <li>Use <code>&lt;button&gt;</code> for actions, <code>&lt;a&gt;</code> for navigation.</li>
            <li>Reach for <code>&lt;details&gt;</code> before writing a toggle component.</li>
            <li>Let the browser handle focus management wherever possible.</li>
          </ul>
          <h2>Progressive enhancement</h2>
          <p>
            Build a solid HTML foundation first, then layer on styles and behaviour.
            A form that works without JavaScript is more resilient than one that
            requires three npm packages to render.
          </p>
          <ol>
            <li>Write the HTML structure.</li>
            <li>Add CSS for visual polish.</li>
            <li>Sprinkle JavaScript only where interaction cannot be avoided.</li>
          </ol>
          <blockquote>
            "The web is agreement. Every time you use a standard element you are
            contributing to a shared contract between authors and browsers."
            <footer><cite>Jeremy Keith</cite></footer>
          </blockquote>
          <h3>A note on accessibility</h3>
          <p>
            Accessible markup is not extra work added at the end. It is the natural
            result of writing HTML the way it was designed to be written.
          </p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="prose">
  <hgroup>
    <h1>The Case for Plain HTML</h1>
    <p>Why writing semantic markup still matters in 2025.</p>
  </hgroup>
  <p>
    There is a quiet movement happening at the edges of the web.
    Developers, exhausted by ever-growing dependency trees, are
    rediscovering a simple truth:
    <a href="#">the browser already knows how to do most things</a>.
  </p>
  <h2>Start with the right element</h2>
  <p>
    Semantic HTML is not a relic. Elements like <code>&lt;article&gt;</code>,
    <code>&lt;nav&gt;</code>, and <code>&lt;details&gt;</code> carry meaning
    that a <code>&lt;div&gt;</code> never can.
  </p>
  <ul>
    <li>Use <code>&lt;button&gt;</code> for actions.</li>
    <li>Reach for <code>&lt;details&gt;</code> before writing a toggle.</li>
    <li>Let the browser handle focus management.</li>
  </ul>
  <h2>Progressive enhancement</h2>
  <ol>
    <li>Write the HTML structure.</li>
    <li>Add CSS for visual polish.</li>
    <li>Sprinkle JavaScript only where necessary.</li>
  </ol>
  <blockquote>
    "The web is agreement."
    <footer><cite>Jeremy Keith</cite></footer>
  </blockquote>
  <h3>A note on accessibility</h3>
  <p>
    Accessible markup is not extra work. It is the natural result of
    writing HTML the way it was designed to be written.
  </p>
</div>`),
          )}
        </div>
      </div>
    `,
  })
}
