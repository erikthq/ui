class RelativeTime extends HTMLElement {
  static observedAttributes = ["datetime"];

  connectedCallback() {
    this.render();
    this.interval = setInterval(() => this.render(), 1000);
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const datetime = this.getAttribute("datetime");
    if (!datetime) return;

    const locale = document.documentElement.lang || undefined;
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    const diff = (new Date(datetime) - new Date()) / 1000;

    const units = [
      ["year", 31536000],
      ["month", 2592000],
      ["week", 604800],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1],
    ];

    for (const [unit, secs] of units) {
      if (Math.abs(diff) >= secs || unit === "second") {
        this.textContent = rtf.format(Math.round(diff / secs), unit);
        break;
      }
    }
  }
}

class CopyToClipboard extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", this.copy);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.copy);
  }

  copy = async () => {
    const selector = this.getAttribute("for");
    const source = selector ? document.querySelector(selector) : null;
    const text = source
      ? ("value" in source ? source.value : source.textContent).trim()
      : this.getAttribute("value");

    if (text == null) return;

    await navigator.clipboard.writeText(text);
    this.dispatchEvent(
      new CustomEvent("clipboard-copy", { bubbles: true, detail: { text } }),
    );
  };
}

// Animates its text when the text changes. Letters that are in both texts
// slide to their new place, the others fade out or in. Set the text like on
// any element, with textContent or the text property, and it morphs.
//
// Each letter is its own element, so a view transition can move it. The
// transition runs on the element itself where the browser supports it, so
// other parts of the page keep working during it, and on the document where
// it does not. Without view transitions, the text just changes.
class TextMorph extends HTMLElement {
  #text = "";
  // The newest text asked for. A later change can start before an earlier
  // transition updates, so the update always renders this one
  #pending = "";
  #transition = null;
  #resizing = null;
  #units = [];
  #letters = document.createElement("span");
  #observer = new MutationObserver(() => this.#onMutation());

  constructor() {
    super();
    // Screen readers read the whole text from data-text, which the CSS shows
    // in ::before, not the letters one by one
    this.#letters.className = "text-morph-letters";
    this.#letters.setAttribute("aria-hidden", "true");
  }

  get text() {
    return this.#text;
  }

  set text(value) {
    this.#morph(normalize(value));
  }

  connectedCallback() {
    this.#render(normalize(this.textContent));
    this.#observe();
  }

  disconnectedCallback() {
    this.#observer.disconnect();
  }

  #observe() {
    this.#observer.observe(this, { childList: true, characterData: true, subtree: true });
  }

  // Changes to the element's own children, from outside this class. They
  // already replaced the letters, so put the old letters back before the
  // browser paints, then morph to the new text
  #onMutation() {
    const next = normalize(this.textContent);
    this.#write(() => this.replaceChildren(this.#letters));
    this.#morph(next);
  }

  // Writes without seeing its own changes as new text
  #write(change) {
    this.#observer.disconnect();
    change();
    this.#observer.takeRecords();
    this.#observe();
  }

  #morph(next) {
    this.#pending = next;
    if (next === this.#text) return;

    // The type lets the CSS find this transition when it runs on the document
    const start = "startViewTransition" in Element.prototype
      ? (update) => this.startViewTransition(update)
      : document.startViewTransition
        ? (update) => document.startViewTransition({ update, types: ["text-morph"] })
        : null;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!start || reduce || !this.isConnected) return this.#render(next);

    // The letters only get transition names while this element morphs, so
    // other view transitions on the page leave them alone
    this.setAttribute("data-morphing", "");
    let sizes;
    const transition = start(() => (sizes = this.#measure(() => this.#render(this.#pending))));
    this.#transition = transition;
    // The size only animates once the browser has its picture of the new
    // text. Before that, the letters would be pictured inside the old size
    // and jump when the transition ends. A newer change skips this
    // transition, which is fine
    transition.ready.then(() => sizes && this.#resize(sizes), () => {});
    transition.finished.finally(() => {
      if (this.#transition !== transition) return;
      this.removeAttribute("data-morphing");
      // A skipped transition never resized, so let the letters size freely
      if (!this.#resizing) {
        this.#letters.style.width = "";
        this.#letters.style.height = "";
      }
    });
  }

  // Runs a change and returns the size before and after it. The letters
  // keep the size after it, so they do not wrap or move while the element
  // animates its size
  #measure(change) {
    // Measured first, so a size animation that still runs starts from where
    // it is now
    const from = this.getBoundingClientRect();
    this.#resizing?.cancel();
    this.#letters.style.width = "";
    this.#letters.style.height = "";
    change();
    const to = this.getBoundingClientRect();
    if (from.width === to.width && from.height === to.height) return null;

    this.#letters.style.width = `${to.width}px`;
    this.#letters.style.height = `${to.height}px`;
    return { from, to };
  }

  // Animates this element from its old size to its new one, so a parent that
  // fits its content, like a button, grows and shrinks with the text
  #resize({ from, to }) {
    const style = getComputedStyle(this);
    const value = style.getPropertyValue("--text-morph-duration").trim();
    const duration = (parseFloat(value) || 500) * (value.endsWith("ms") || !value ? 1 : 1000);
    const easing = style.getPropertyValue("--ease-glide").trim() || "ease";

    const resizing = this.animate(
      [
        { width: `${from.width}px`, height: `${from.height}px` },
        { width: `${to.width}px`, height: `${to.height}px` },
      ],
      { duration, easing },
    );
    this.#resizing = resizing;

    const done = () => {
      if (this.#resizing !== resizing) return;
      this.#letters.style.width = "";
      this.#letters.style.height = "";
      this.#resizing = null;
    };
    resizing.finished.then(done, done);
  }

  #render(text) {
    const words = this.getAttribute("by") === "word";
    const units = split(text, words);
    const matches = match(this.#units, units);

    // Reuse the element of each matched letter, so the transition moves it
    for (const [i, unit] of units.entries()) {
      const old = matches.get(i);
      if (old !== undefined) {
        unit.el = this.#units[old].el;
      } else if (!unit.space) {
        unit.el = document.createElement("span");
        unit.el.className = "text-morph-letter";
        unit.el.textContent = unit.value;
      }
    }

    // Letters inside a word sit in one span that does not wrap, so a line
    // only breaks at spaces
    const children = [];
    let word = null;
    for (const unit of units) {
      if (unit.space) {
        word = null;
        children.push(document.createTextNode(" "));
      } else {
        if (!word) {
          word = document.createElement("span");
          word.className = "text-morph-word";
          children.push(word);
        }
        word.append(unit.el);
      }
    }

    this.#write(() => {
      this.#letters.replaceChildren(...children);
      this.replaceChildren(this.#letters);
    });
    this.dataset.text = text;

    this.#text = text;
    this.#units = units;
  }
}

// One space between words, none at the ends, like the browser shows it
const normalize = (text) => String(text ?? "").replace(/\s+/g, " ").trim();

// The text as letters, or as words, and the spaces between them
function split(text, words) {
  const segmenter = new Intl.Segmenter(undefined, { granularity: words ? "word" : "grapheme" });
  return [...segmenter.segment(text)].map(({ segment }) => ({
    value: segment,
    space: /^\s+$/.test(segment),
  }));
}

// Pairs the letters the old and the new text share, in order, as a map from
// new index to old index. The longest common subsequence keeps the most
// letters in place. Long texts skip it and fade as a whole
function match(before, after) {
  const pairs = new Map();
  const a = before.filter((unit) => !unit.space);
  const b = after.filter((unit) => !unit.space);
  if (!a.length || !b.length || a.length * b.length > 40000) return pairs;

  const lengths = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lengths[i][j] = a[i].value === b[j].value
        ? lengths[i + 1][j + 1] + 1
        : Math.max(lengths[i + 1][j], lengths[i][j + 1]);
    }
  }

  const oldIndex = new Map(a.map((unit) => [unit, before.indexOf(unit)]));
  const newIndex = new Map(b.map((unit) => [unit, after.indexOf(unit)]));
  for (let i = 0, j = 0; i < a.length && j < b.length; ) {
    if (a[i].value === b[j].value) {
      pairs.set(newIndex.get(b[j]), oldIndex.get(a[i]));
      i++;
      j++;
    } else if (lengths[i + 1][j] >= lengths[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  return pairs;
}

if (!customElements.get("relative-time")) {
  customElements.define("relative-time", RelativeTime);
}

if (!customElements.get("copy-to-clipboard")) {
  customElements.define("copy-to-clipboard", CopyToClipboard);
}

if (!customElements.get("text-morph")) {
  customElements.define("text-morph", TextMorph);
}
