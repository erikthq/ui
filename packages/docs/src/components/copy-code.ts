import { html } from "hono/html";
import { url } from "../layout";

export default () => html`
  <script type="module" src="${url("/elements.js")}"></script>

  <template id="code-copy-btn-template">
    <copy-to-clipboard>
      <button
        type="button"
        class="code-copy-btn ghost square"
        aria-label="Copy code"
        data-tooltip="left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </button>
    </copy-to-clipboard>
  </template>

  <script defer>
    document.addEventListener("DOMContentLoaded", () => {
      const template = document.getElementById("code-copy-btn-template");

      document.querySelectorAll(".code-block").forEach((block) => {
        const code = block.querySelector("code")?.innerText ?? "";

        const fragment = template.content.cloneNode(true);
        fragment.querySelector("copy-to-clipboard").setAttribute("value", code);

        block.appendChild(fragment);
      });
    });

    document.addEventListener("clipboard-copy", (e) => {
      const btn = e.target.querySelector(".code-copy-btn");
      if (!btn) return;

      btn.setAttribute("data-copied", "");
      const defaultLabel = btn.getAttribute("aria-label");
      btn.setAttribute("aria-label", "Copied");

      setTimeout(() => {
        btn.removeAttribute("data-copied");
        btn.setAttribute("aria-label", defaultLabel);
      }, 1500);
    });
  </script>

  <style>
    copy-to-clipboard {
      display: contents;
    }

    .code-copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      color: var(--ui-neutral-400);
    }

    .code-copy-btn[data-copied] {
      color: var(--ui-constructive-400);
    }
  </style>
`;
