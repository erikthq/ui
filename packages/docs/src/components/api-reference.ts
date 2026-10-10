import { html } from "hono/html";

// One row per choice. Values in the same row are alternatives, values that can be
// combined go in rows of their own
export type ApiRow = { type: string; values: string[]; description: string };

export function apiReference(rows: ApiRow[]) {
  return html`
    <div class="prose">
      <h2 id="api-reference">API reference</h2>
      <table class="align-left" style="--cols: auto 1fr 1fr">
        <thead>
          <tr>
            <th>Type</th>
            <th>Classes / attributes</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(
            (row) => html`
              <tr>
                <td>${row.type}</td>
                <td>${row.values.map((v, i) => html`${i ? html`<br />` : ""}<code>${v}</code>`)}</td>
                <td>${row.description}</td>
              </tr>
            `,
          )}
        </tbody>
      </table>
    </div>
  `;
}
