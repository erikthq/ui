import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "headings", label: "Headings" },
  { id: "paragraphs", label: "Paragraphs" },
  { id: "inline", label: "Inline text" },
  { id: "lists", label: "Lists" },
  { id: "blockquote", label: "Blockquote" },
  { id: "code", label: "Code" },
];

export async function TypographyPage(path: string) {
  return Layout({
    title: "Typography",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Typography</h1>
          <p>
            Native text elements, styled just enough to read well and inherit
            whatever you set on top.
          </p>
        </hgroup>

        <h2 id="headings">Headings</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="paragraphs">Paragraphs</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <p>
            A paragraph of text. @erikt/ui styles native HTML elements directly with
            no class names needed for basic usage.
          </p>
          <p>
            A second paragraph. Spacing between paragraphs is handled
            automatically.
          </p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<p>A paragraph of text.</p>
<p>A second paragraph.</p>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="inline">Inline text</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <p><strong>Strong importance</strong></p>
          <p><em>Emphasized text</em></p>
          <p><b>Bold, no added importance</b></p>
          <p><i>Idiomatic or technical term</i></p>
          <p><u>Underlined annotation</u></p>
          <p><s>Struck-through, no longer accurate</s></p>
          <p><mark>Highlighted for reference</mark></p>
          <p><small>Fine print or side comment</small></p>
          <p>H<sub>2</sub>O (subscript)</p>
          <p>E = mc<sup>2</sup> (superscript)</p>
          <p>
            <abbr title="HyperText Markup Language">HTML</abbr> (abbreviation)
          </p>
          <p><cite>The Elements of Typographic Style</cite></p>
          <q>An inline quotation pulls text into context.</q>
          <p><del>Removed from the document</del></p>
          <p><ins>Inserted into the document</ins></p>
          <p>Press <kbd>⌘K</kbd> to open the palette.</p>
          <p><code>const x = 42</code></p>
          <p>Let <var>x</var> be an unknown quantity.</p>
          <p>Output: <samp>Error: file not found</samp></p>
          <p>Visit the <a href="#">documentation</a> to learn more.</p>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<strong>Strong importance</strong>
<em>Emphasized text</em>
<b>Bold, no added importance</b>
<i>Idiomatic or technical term</i>
<u>Underlined annotation</u>
<s>Struck-through, no longer accurate</s>
<mark>Highlighted for reference</mark>
<small>Fine print or side comment</small>
H<sub>2</sub>O
E = mc<sup>2</sup>
<abbr title="HyperText Markup Language">HTML</abbr>
<cite>The Elements of Typographic Style</cite>
<q>An inline quotation pulls text into context.</q>
<del>Removed from the document</del>
<ins>Inserted into the document</ins>
<kbd>⌘K</kbd>
<code>const x = 42</code>
Let <var>x</var> be an unknown quantity.
Output: <samp>Error: file not found</samp>
<a href="#">documentation</a>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="lists">Lists</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <ul>
            <li>Unordered item</li>
            <li>Unordered item</li>
            <li>Unordered item</li>
          </ul>
          <ol>
            <li>Ordered item</li>
            <li>Ordered item</li>
            <li>Ordered item</li>
          </ol>
          <dl>
            <dt>Term</dt>
            <dd>Description of the term above.</dd>
            <dt>Another term</dt>
            <dd>Its description.</dd>
          </dl>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<ul>
  <li>Unordered item</li>
</ul>

<ol>
  <li>Ordered item</li>
</ol>

<dl>
  <dt>Term</dt>
  <dd>Description.</dd>
</dl>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="blockquote">Blockquote</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <blockquote>
            <p>The details are not the details. They make the design.</p>
            <footer>Charles Eames</footer>
          </blockquote>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<blockquote>
  <p>The details are not the details. They make the design.</p>
  <footer>Charles Eames</footer>
</blockquote>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="code">Code</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <pre><code>const greeting = "hello, world"
console.log(greeting)</code></pre>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<pre><code>const greeting = "hello, world"
console.log(greeting)</code></pre>`),
          )}
        </div>
      </div>
    `,
  });
}
