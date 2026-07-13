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

if (!customElements.get("relative-time")) {
  customElements.define("relative-time", RelativeTime);
}

if (!customElements.get("copy-to-clipboard")) {
  customElements.define("copy-to-clipboard", CopyToClipboard);
}
