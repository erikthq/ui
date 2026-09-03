import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "custom-columns", label: "Custom columns" },
  { id: "overflow", label: "Overflow" },
  { id: "with-actions", label: "With actions" },
  { id: "zebra", label: "Zebra" },
];

export async function TablePage(path: string) {
  return Layout({
    title: "Table",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Table</h1>
          <p class="lead">
            A native <code>&lt;table&gt;</code> laid out with grid and subgrid,
            so every row shares the same columns.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <p>
          Column count is detected automatically from the header row. All rows
          inherit the same grid via <code>subgrid</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <table>
            <caption>Team members</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>Engineer</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>Designer</td>
                <td>Away</td>
              </tr>
              <tr>
                <td>Carol</td>
                <td>Manager</td>
                <td>Active</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>3 members</td>
                <td></td>
                <td>2 active</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<table>
  <caption>Team members</caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Engineer</td>
      <td>Active</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>3 members</td>
      <td></td>
      <td>2 active</td>
    </tr>
  </tfoot>
</table>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="custom-columns">Custom columns</h2>
        <p>
          Set <code>--cols</code> on the table to override the default equal
          widths with any grid template value.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <table style="--cols: 2fr 1fr 1fr 80px">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monthly subscription</td>
                <td>Mar 1</td>
                <td>Software</td>
                <td>$12.00</td>
              </tr>
              <tr>
                <td>Office supplies</td>
                <td>Mar 8</td>
                <td>Equipment</td>
                <td>$34.50</td>
              </tr>
              <tr>
                <td>Team lunch</td>
                <td>Mar 15</td>
                <td>Food</td>
                <td>$87.20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<table style="--cols: 2fr 1fr 1fr 80px">
  <thead>
    <tr>
      <th>Description</th>
      <th>Date</th>
      <th>Category</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monthly subscription</td>
      <td>Mar 1</td>
      <td>Software</td>
      <td>$12.00</td>
    </tr>
  </tbody>
</table>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="overflow">Overflow</h2>
        <p>
          Tables scroll horizontally when their content exceeds the container
          width. No wrapper needed.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Location</th>
                <th>Start date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>alice@example.com</td>
                <td>Engineering</td>
                <td>New York</td>
                <td>Jan 12, 2022</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>bob@example.com</td>
                <td>Design</td>
                <td>London</td>
                <td>Mar 4, 2023</td>
                <td>Away</td>
              </tr>
              <tr>
                <td>Carol</td>
                <td>carol@example.com</td>
                <td>Management</td>
                <td>Berlin</td>
                <td>Sep 1, 2021</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Department</th>
      <th>Location</th>
      <th>Start date</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>alice@example.com</td>
      <td>Engineering</td>
      <td>New York</td>
      <td>Jan 12, 2022</td>
      <td>Active</td>
    </tr>
  </tbody>
</table>`),
          )}
        </div>
      </div>
      <div class="prose">
        <h2 id="with-actions">With actions</h2>
        <p>
          A dropdown in the last column gives each row its own actions.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>Engineer</td>
                <td>Active</td>
                <td>
                  <button class="ghost square" popovertarget="table-actions-1" style="anchor-name:--table-actions-1">
                    ${raw(icon("dots"))}
                  </button>
                  <div id="table-actions-1" popover style="position-anchor:--table-actions-1;top:anchor(bottom);right:anchor(right);left:unset;margin:0">
                    <menu>
                      <li><button class="ghost">Edit</button></li>
                      <li><button class="ghost">Duplicate</button></li>
                      <li><hr /></li>
                      <li><button class="ghost destructive">Remove</button></li>
                    </menu>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>Designer</td>
                <td>Away</td>
                <td>
                  <button class="ghost square" popovertarget="table-actions-2" style="anchor-name:--table-actions-2">
                    ${raw(icon("dots"))}
                  </button>
                  <div id="table-actions-2" popover style="position-anchor:--table-actions-2;top:anchor(bottom);right:anchor(right);left:unset;margin:0">
                    <menu>
                      <li><button class="ghost">Edit</button></li>
                      <li><button class="ghost">Duplicate</button></li>
                      <li><hr /></li>
                      <li><button class="ghost destructive">Remove</button></li>
                    </menu>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Carol</td>
                <td>Manager</td>
                <td>Active</td>
                <td>
                  <button class="ghost square" popovertarget="table-actions-3" style="anchor-name:--table-actions-3">
                    ${raw(icon("dots"))}
                  </button>
                  <div id="table-actions-3" popover style="position-anchor:--table-actions-3;top:anchor(bottom);right:anchor(right);left:unset;margin:0">
                    <menu>
                      <li><button class="ghost">Edit</button></li>
                      <li><button class="ghost">Duplicate</button></li>
                      <li><hr /></li>
                      <li><button class="ghost destructive">Remove</button></li>
                    </menu>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Status</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Engineer</td>
      <td>Active</td>
      <td>
        <button class="ghost square" popovertarget="actions-1">
          <svg><!-- ellipsis icon --></svg>
        </button>
        <div id="actions-1" popover>
          <menu>
            <li><button class="ghost">Edit</button></li>
            <li><button class="ghost">Duplicate</button></li>
            <li><hr /></li>
            <li><button class="ghost destructive">Remove</button></li>
          </menu>
        </div>
      </td>
    </tr>
  </tbody>
</table>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="zebra">Zebra</h2>
        <p>
          Add <code>class="zebra"</code> to the table to alternate row
          backgrounds.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <table class="zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>Engineer</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>Designer</td>
                <td>Away</td>
              </tr>
              <tr>
                <td>Carol</td>
                <td>Manager</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>David</td>
                <td>Engineer</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<table class="zebra">...</table>`))}
        </div>
      </div>
    `,
  });
}
