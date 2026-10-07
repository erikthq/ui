import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";

const toc = [{ id: "default", label: "Default" }];

const gaps = [1, 2, 3, 4, 5, 6, 7, 8];

export async function FlowPage(path: string) {
  return Layout({
    title: "Flow",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Flow</h1>
          <p>
            A few helper classes to put elements in a row, a column or a grid,
            with or without centering. Add <code>.gap-1</code> to
            <code>.gap-8</code> to space them out.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `.flex {
  display: flex;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-center {
  display: flex;
  align-items: center;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.grid {
  display: grid;
}

${gaps.map((n) => `.gap-${n} {\n  gap: var(--ui-spacing-${n});\n}`).join("\n\n")}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>
    `,
  });
}
