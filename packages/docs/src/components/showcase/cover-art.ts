import { html, raw } from "hono/html";
import { icon } from "../../icon";

export function CoverArt() {
  return html`
    <style>
      .showcase-cover-art {
        > div {
          > small {
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--ui-neutral-500);
          }
        }

        .file-drop {
          aspect-ratio: 1;

          > svg {
            width: 2.5rem;
            height: 2.5rem;
          }
        }

        > footer {
          align-items: stretch;
          border-top: 1px solid var(--ui-neutral-200);
          text-align: center;
          color: var(--ui-neutral-500);
        }
      }
    </style>

    <article class="secondary showcase-cover-art">
      <div class="grid gap-4">
        <small>Cover art</small>

        <label class="file-drop" aria-label="Cover art">
          <input id="cover-art" type="file" accept="image/jpeg,image/png" />
          ${raw(icon("photo"))}
        </label>
      </div>

      <footer class="flex-col gap-3">
        <label for="cover-art" class="button secondary">Upload artwork</label>
        <small>Minimum 3000 × 3000px<br />JPEG or PNG only</small>
      </footer>
    </article>
  `;
}
