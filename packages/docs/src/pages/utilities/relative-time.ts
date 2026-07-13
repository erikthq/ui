import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [
  { id: "usage", label: "Usage" },
  { id: "web-component", label: "Web Component" },
];

const CODE = `function timeAgo(date) {
  const locale = document.documentElement.lang || undefined;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const diff = (new Date(date) - new Date()) / 1000; // seconds, negative = past

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
      return rtf.format(Math.round(diff / secs), unit);
    }
  }
}`;

const CODE_ELEMENT = `class RelativeTime extends HTMLElement {
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

if (!customElements.get("relative-time")) {
  customElements.define("relative-time", RelativeTime);
}`;

const CODE_ELEMENT_USAGE = `<relative-time datetime="2026-07-12T09:00:00.000Z"></relative-time>`;

export async function RelativeTimePage(path: string) {
  return Layout({
    title: "Relative Time",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Relative Time</h1>
          <p>
            Format a date as relative time (e.g. "3 hours ago") using the
            native <code>Intl.RelativeTimeFormat</code> API. No dependencies,
            handles pluralization and locales automatically.
          </p>
        </hgroup>

        <h2 id="usage">Usage</h2>
      </div>
      <div class="example">
        <div
          class="preview preview-padded"
          id="relative-time-demo"
          style="gap:var(--ui-spacing-2)"
        >
          <span data-offset="-60000"></span>
          <span data-offset="-180000"></span>
          <span data-offset="-3600000"></span>
          <span data-offset="-86400000"></span>
          <span data-offset="86400000"></span>
        </div>
        <div class="code-block">${raw(await highlight(CODE, 80, "js"))}</div>
      </div>

      <div class="prose">
        <h2 id="web-component">Web Component</h2>
        <p>
          Wrap the same logic in a custom element for drop-in use in plain
          HTML, no glue code required. It re-renders every second so
          long-lived pages stay accurate, and updates automatically if the
          <code>datetime</code> attribute changes.
        </p>
      </div>
      <div class="example">
        <div class="preview" id="relative-time-element-demo"></div>
        <div class="code-block">
          ${raw(await highlight(CODE_ELEMENT_USAGE, 80, "html"))}
        </div>
      </div>
      <div class="code-block">
        ${raw(await highlight(CODE_ELEMENT, 80, "js"))}
      </div>

      <script type="module">
        function timeAgo(date) {
          const locale = document.documentElement.lang || undefined;
          const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
          const diff = (new Date(date) - new Date()) / 1000;

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
              return rtf.format(Math.round(diff / secs), unit);
            }
          }
        }

        document
          .querySelectorAll("#relative-time-demo [data-offset]")
          .forEach((el) => {
            const offset = Number(el.dataset.offset);
            el.textContent = timeAgo(Date.now() + offset);
          });

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
            this.textContent = timeAgo(datetime);
          }
        }

        if (!customElements.get("relative-time")) {
          customElements.define("relative-time", RelativeTime);
        }

        const elementDemo = document.getElementById(
          "relative-time-element-demo",
        );
        const el = document.createElement("relative-time");
        el.setAttribute("datetime", new Date().toISOString());
        elementDemo.append(el);
      </script>
    `,
  });
}
