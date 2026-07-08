import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [{ id: "default", label: "Default" }];

export async function ChartPage(path: string) {
  return Layout({
    title: "Chart",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Chart</h1>
          <p class="lead">
            A bar chart built from a native <code>&lt;table&gt;</code> only,
            the most semantically correct element for tabular data. No
            wrapper elements, no SVG, no JavaScript.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Each category is its own <code>&lt;tr&gt;</code> with a
          <code>&lt;th scope="row"&gt;</code> label and a single
          <code>&lt;td&gt;</code> value, the correct pairing for this data.
          <code>grid-auto-flow: column</code> lays those rows out side by
          side so each one renders as a vertical bar, while assistive tech
          still reads them in their natural row order. Set <code>--v</code>
          on each <code>&lt;td&gt;</code> to its value as a percentage of
          <code>--chart-height</code>. The y-axis scale is a
          <code>&lt;ul&gt;</code> nested inside <code>&lt;caption&gt;</code>,
          the only element a table permits outside of rows. Column headers
          become redundant once every row has its own label, so they are
          visually hidden but kept for structure.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <table class="chart">
            <caption>
              Signups by month
              <ul class="chart-y-axis" aria-hidden="true">
                <li>60</li>
                <li>40</li>
                <li>20</li>
                <li>0</li>
              </ul>
            </caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Signups</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">01</th>
                <td style="--v: 29"><span>29</span></td>
              </tr>
              <tr>
                <th scope="row">02</th>
                <td style="--v: 52"><span>52</span></td>
              </tr>
              <tr>
                <th scope="row">03</th>
                <td style="--v: 34"><span>34</span></td>
              </tr>
              <tr>
                <th scope="row">04</th>
                <td style="--v: 16"><span>16</span></td>
              </tr>
              <tr>
                <th scope="row">05</th>
                <td style="--v: 43"><span>43</span></td>
              </tr>
              <tr>
                <th scope="row">06</th>
                <td style="--v: 23"><span>23</span></td>
              </tr>
              <tr>
                <th scope="row">07</th>
                <td style="--v: 25"><span>25</span></td>
              </tr>
              <tr>
                <th scope="row">08</th>
                <td style="--v: 30"><span>30</span></td>
              </tr>
              <tr>
                <th scope="row">09</th>
                <td style="--v: 8"><span>8</span></td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td style="--v: 43"><span>43</span></td>
              </tr>
              <tr>
                <th scope="row">11</th>
                <td style="--v: 37"><span>37</span></td>
              </tr>
              <tr>
                <th scope="row">12</th>
                <td style="--v: 31"><span>31</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<table class="chart">
  <caption>
    Signups by month
    <ul class="chart-y-axis" aria-hidden="true">
      <li>60</li>
      <li>40</li>
      <li>20</li>
      <li>0</li>
    </ul>
  </caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Signups</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">01</th>
      <td style="--v: 29"><span>29</span></td>
    </tr>
    <tr>
      <th scope="row">02</th>
      <td style="--v: 52"><span>52</span></td>
    </tr>
  </tbody>
</table>`),
          )}
        </div>
      </div>
    `,
  });
}
