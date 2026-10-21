import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "usage", label: "Usage" },
  { id: "change-the-text", label: "Change the text" },
  { id: "words", label: "Words" },
  { id: "speed", label: "Speed" },
  { id: "how-it-works", label: "How it works" },
];

const words = ["Save", "Saving", "Saved", "Save changes"];

export async function TextMorphPage(path: string) {
  return Layout({
    title: "Text Morph",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Text Morph</h1>
          <p>
            Animates text when it changes. Letters that are in both texts
            slide to their new place, and the other letters fade out or in.
          </p>
        </hgroup>

        <h2 id="usage">Usage</h2>
        <p>
          Load <code>elements.js</code> and put the text in a
          <code>&lt;text-morph&gt;</code> element. The styles are in
          <code>ui.css</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview" x-data="{ i: 0, words: ${JSON.stringify(words)} }">
          <button type="button" @click="i = (i + 1) % words.length">
            <text-morph x-text="words[i]">${words[0]}</text-morph>
          </button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<script type="module" src="https://esm.sh/@erikt/ui/elements"></script>

<button>
  <text-morph>Save</text-morph>
</button>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="change-the-text">Change the text</h2>
        <p>
          Change the text the way you change any element. Set
          <code>textContent</code>, or the <code>text</code> property. Tools
          that set the text for you, like Alpine's <code>x-text</code>, work
          too.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `const label = document.querySelector("text-morph");

label.textContent = "Saving";
// or
label.text = "Saving";`,
              80,
              "js",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="words">Words</h2>
        <p>
          Add <code>by="word"</code> to move whole words. Words that are in
          both texts slide, the others fade. Use it for longer text, where
          single letters flying around would be too busy.
        </p>
      </div>
      <div
        class="example"
        x-data="{ on: false }"
      >
        <div class="preview" style="flex-direction: column; gap: 0.5rem;">
          <p style="margin:0">
            <text-morph
              by="word"
              x-text="on ? 'Your changes are saved to the cloud' : 'Your changes are saved on this device'"
              >Your changes are saved on this device</text-morph
            >
          </p>
          <button type="button" class="secondary" @click="on = !on">
            Toggle
          </button>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(
              `<text-morph by="word">Your changes are saved on this device</text-morph>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="speed">Speed</h2>
        <p>
          Set <code>--text-morph-duration</code> on the element. The default
          is <code>500ms</code>. Letters that fade out take half that time.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `text-morph {
  --text-morph-duration: 800ms;
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="how-it-works">How it works</h2>
        <ul>
          <li>
            Each letter is its own element. When the text changes, the
            letters that are in both texts keep their element, so a view
            transition can move them.
          </li>
          <li>
            The transition runs on the element itself
            (<code>element.startViewTransition()</code>), so the rest of the
            page keeps working during it. Browsers without it run the
            transition on the whole page instead. Browsers without view
            transitions change the text at once.
          </li>
          <li>
            When it runs on the element, only the text animates. If the text
            makes its button wider, the button changes size at once.
          </li>
          <li>
            Screen readers read the whole text, not the letters one by one.
          </li>
          <li>
            With reduced motion turned on, the text changes at once.
          </li>
        </ul>
      </div>
    `,
  });
}
