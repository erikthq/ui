import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { apiReference } from "../../components/api-reference";
import { standaloneLink, titleActions } from "../../components/standalone";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "default", label: "Default" },
  { id: "api-reference", label: "API reference" },
];

const gaps = [1, 2, 3, 4, 5, 6, 7, 8];

export async function FlowPage(path: string) {
  return Layout({
    title: "Flow",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Flow</h1>
            ${raw(titleActions(path, "flow"))}
          </div>
          <p>
            A few helper classes to put elements in a row, a column or a grid,
            with or without centering. The <code>-center</code> classes center
            on both axes, and the <code>-x</code> and <code>-y</code> versions
            center on one axis only. Add
            <code>.gap-1</code> to
            <code>.gap-8</code> to space them out.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
        <p>Load the shared tokens once, then only this component and the components it is built on:</p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("flow"))}
        </div>
      </div>

      <div class="prose">
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
  justify-content: center;
}

.flex-center-x {
  display: flex;
  justify-content: center;
}

.flex-center-y {
  display: flex;
  align-items: center;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex-col-center-x {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-col-center-y {
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

      ${apiReference([
        { type: "Layout", values: [".flex", ".flex-col", ".flex-center", ".flex-center-x", ".flex-center-y", ".flex-col-center", ".flex-col-center-x", ".flex-col-center-y", ".grid"], description: "Row, column or grid, with optional centering" },
        { type: "Gap", values: [".gap-1", ".gap-2", ".gap-3", ".gap-4", ".gap-5", ".gap-6", ".gap-7", ".gap-8"], description: "Space between children, from the spacing scale" },
      ])}
    `,
  });
}
