import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { icon } from "../../icon";

const tasks = [
  {
    id: "TASK-8782",
    type: "Feature",
    title:
      "You can't compress the program without quantifying the open-source SSD pixel.",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-7878",
    type: "Bug",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-7839",
    type: "Feature",
    title: "We need to bypass the neural TCP card!",
    status: "Todo",
    priority: "High",
  },
  {
    id: "TASK-5562",
    type: "Feature",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-8686",
    type: "Bug",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "Canceled",
    priority: "Medium",
  },
  {
    id: "TASK-1280",
    type: "Documentation",
    title:
      "Use the digital TLS panel, then you can transmit the haptic system!",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-7262",
    type: "Feature",
    title:
      "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-1138",
    type: "Feature",
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-7184",
    type: "Bug",
    title: "We need to program the back-end THX pixel!",
    status: "Todo",
    priority: "Low",
  },
  {
    id: "TASK-5160",
    type: "Documentation",
    title:
      "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    status: "In Progress",
    priority: "High",
  },
];

const statusIcon: Record<string, string> = {
  Todo: icon("circle", { size: 14 }),
  "In Progress": icon("loader-2", { size: 14 }),
  Done: icon("circle-check", { size: 14 }),
  Canceled: icon("circle-x", { size: 14 }),
  Backlog: icon("circle-dashed", { size: 14 }),
};

const priorityIcon: Record<string, string> = {
  High: icon("arrow-up", { size: 14 }),
  Medium: icon("minus", { size: 14 }),
  Low: icon("arrow-down", { size: 14 }),
};

const typeColor: Record<string, string> = {
  Feature: "color2",
  Bug: "destructive",
  Documentation: "neutral",
};

export async function AdminDashboardPage(path: string) {
  return Layout({
    wide: true,
    title: "Admin Dashboard",
    path,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Admin Dashboard</h1>
          <p>
            A task management dashboard with a sidebar, filterable data table,
            status and priority badges, and row actions.
          </p>
        </hgroup>
      </div>

      <div class="example">
        <div
          class="preview"
          style="padding:0;align-items:stretch;justify-content:stretch;min-height:600px"
        >
          <style>
            .admin-layout {
              display: grid;
              grid-template-columns: 220px 1fr;
            }

            .admin-sidebar {
              border-right: 1px solid var(--ui-neutral-200);
              padding: 1rem 0.5rem;
            }

            .admin-main {
              display: flex;
              flex-direction: column;
              padding: 1.5rem 2rem;
              gap: 1rem;
            }

            .admin-toolbar {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              flex-wrap: wrap;
            }

            .task-table td:nth-child(3) {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          </style>

          <div class="admin-layout">
            <!-- Sidebar -->
            <aside class="admin-sidebar">
              <menu>
                <li><small>General</small></li>
                <li>
                  <a class="button ghost" href="#">
                    ${raw(icon("home", { size: 14 }))} Dashboard
                  </a>
                </li>
                <li>
                  <a class="button ghost" href="#" aria-current="page">
                    ${raw(icon("clipboard-list", { size: 14 }))} Tasks
                  </a>
                </li>
                <li>
                  <a class="button ghost" href="#">
                    ${raw(icon("download", { size: 14 }))} Apps
                  </a>
                </li>
                <li>
                  <a class="button ghost" href="#">
                    ${raw(icon("message", { size: 14 }))} Chats
                    <span class="badge">3</span>
                  </a>
                </li>
                <li>
                  <a class="button ghost" href="#">
                    ${raw(icon("users", { size: 14 }))} Users
                  </a>
                </li>
                <li><small>Settings</small></li>
                <li>
                  <a class="button ghost" href="#">
                    ${raw(icon("settings", { size: 14 }))} Settings
                  </a>
                </li>
                <li>
                  <a class="button ghost" href="#">
                    ${raw(icon("help-circle", { size: 14 }))} Help Center
                  </a>
                </li>
              </menu>
            </aside>

            <!-- Main -->
            <main class="admin-main">
              <div
                style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem"
              >
                <div>
                  <h2 style="margin:0 0 0.25rem">Tasks</h2>
                  <p style="color:var(--ui-neutral-500)">
                    <small> Here's a list of your tasks for this month. </small>
                  </p>
                </div>
                <div style="display:flex;gap:0.5rem;flex-shrink:0">
                  <button class="outlined">
                    ${raw(icon("download", { size: 14 }))} Import
                  </button>
                  <button>${raw(icon("plus", { size: 14 }))} Create</button>
                </div>
              </div>

              <!-- Toolbar -->
              <div class="admin-toolbar">
                <label>
                  ${raw(icon("search", { size: 14, attrs: "data-prefix" }))}
                  <input type="search" placeholder="Filter tasks..." />
                </label>
                <button class="outlined" popovertarget="status-filter">
                  ${raw(icon("circle-dot", { size: 14 }))} Status
                </button>
                <div id="status-filter" popover>
                  <menu>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          name="status"
                          value="todo"
                        />
                        ${raw(icon("circle", { size: 14 }))} Todo
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          name="status"
                          value="in-progress"
                        />
                        ${raw(icon("loader-2", { size: 14 }))} In Progress
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          name="status"
                          value="done"
                        />
                        ${raw(icon("circle-check", { size: 14 }))} Done
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          name="status"
                          value="canceled"
                        />
                        ${raw(icon("circle-x", { size: 14 }))} Canceled
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          name="status"
                          value="backlog"
                        />
                        ${raw(icon("circle-dashed", { size: 14 }))} Backlog
                      </label>
                    </li>
                  </menu>
                </div>
                <button class="outlined" popovertarget="priority-filter">
                  ${raw(icon("arrow-up", { size: 14 }))} Priority
                </button>
                <div id="priority-filter" popover>
                  <menu>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          name="priority"
                          value="high"
                        />
                        ${raw(icon("arrow-up", { size: 14 }))} High
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          name="priority"
                          value="medium"
                        />
                        ${raw(icon("minus", { size: 14 }))} Medium
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          type="checkbox"
                          checked
                          name="priority"
                          value="low"
                        />
                        ${raw(icon("arrow-down", { size: 14 }))} Low
                      </label>
                    </li>
                  </menu>
                </div>
                <button class="outlined" style="margin-left:auto">
                  ${raw(icon("adjustments-horizontal", { size: 14 }))} View
                </button>
              </div>

              <!-- Table -->
              <table
                class="task-table"
                style="--cols: 90px 120px 1fr 130px 100px 51px"
              >
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${tasks.map(
                    (task, i) => html`
                      <tr>
                        <td style="color:var(--ui-neutral-500);">
                          <small> ${task.id} </small>
                        </td>
                        <td>
                          <span class="badge ${typeColor[task.type]}">
                            ${task.type}
                          </span>
                        </td>
                        <td>${task.title}</td>
                        <td>
                          <span
                            style="display:flex;align-items:center;gap:0.375rem;color:var(--ui-neutral-600)"
                          >
                            ${raw(statusIcon[task.status] ?? "")} ${task.status}
                          </span>
                        </td>
                        <td>
                          <span
                            style="display:flex;align-items:center;gap:0.375rem;color:var(--ui-neutral-600)"
                          >
                            ${raw(priorityIcon[task.priority] ?? "")}
                            ${task.priority}
                          </span>
                        </td>
                        <td>
                          <button
                            class="ghost square"
                            style="anchor-name:--task-actions-${i}"
                            popovertarget="task-actions-${i}"
                          >
                            ${raw(icon("dots", { size: 14 }))}
                          </button>
                          <div
                            id="task-actions-${i}"
                            popover
                            style="position-anchor:--task-actions-${i};top:anchor(bottom);right:anchor(right);left:unset;margin:0"
                          >
                            <menu>
                              <li><button class="ghost">Edit</button></li>
                              <li>
                                <button class="ghost">Duplicate</button>
                              </li>
                              <li><hr /></li>
                              <li>
                                <button class="ghost">Mark as done</button>
                              </li>
                              <li><hr /></li>
                              <li>
                                <button class="ghost destructive">
                                  Delete
                                </button>
                              </li>
                            </menu>
                          </div>
                        </td>
                      </tr>
                    `,
                  )}
                </tbody>
              </table>

              <!-- Pagination -->
              <small
                style="display:flex;align-items:center;justify-content:space-between"
              >
                <span>0 of 100 row(s) selected.</span>
                <div style="display:flex;align-items:center;gap:1rem">
                  <span>Rows per page</span>
                  <select>
                    <button>
                      <selectedcontent></selectedcontent>
                      ${raw(icon("chevron-down"))}
                    </button>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>

                  <nav class="pagination" aria-label="Pagination">
                    <ul>
                      <li>
                        <a
                          href="?page=0"
                          class="button ghost square"
                          aria-label="Previous page"
                          aria-disabled="true"
                        >
                          ${raw(icon("chevron-left"))}
                        </a>
                      </li>
                      <li>
                        <a
                          href="?page=1"
                          class="button ghost square"
                          aria-current="page"
                          >1</a
                        >
                      </li>
                      <li>
                        <a href="?page=2" class="button ghost square">2</a>
                      </li>
                      <li>
                        <a href="?page=3" class="button ghost square">3</a>
                      </li>
                      <li>
                        <a
                          href="?page=2"
                          class="button ghost square"
                          aria-label="Next page"
                        >
                          ${raw(icon("chevron-right"))}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </small>
            </main>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<style>
  .admin-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
  }

  .admin-sidebar {
    border-right: 1px solid var(--ui-neutral-200);
    padding: 1rem 0.5rem;
  }

  .admin-main {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    gap: 1rem;
  }

  .admin-toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .task-table td:nth-child(3) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<div class="admin-layout">
  <aside class="admin-sidebar">
    <menu>
      <li><small>General</small></li>
      <li><a class="button ghost" href="#">Dashboard</a></li>
      <li><a class="button ghost" href="#" aria-current="page">Tasks</a></li>
      <li><a class="button ghost" href="#">
        Chats
        <span class="badge">3</span>
      </a></li>
      <li><small>Settings</small></li>
      <li><a class="button ghost" href="#">Settings</a></li>
      <li><a class="button ghost" href="#">Help Center</a></li>
    </menu>
  </aside>

  <main class="admin-main">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem">
      <div>
        <h2 style="margin:0 0 0.25rem">Tasks</h2>
        <p style="color:var(--ui-neutral-500)">Here's a list of your tasks for this month.</p>
      </div>
      <div style="display:flex;gap:0.5rem;flex-shrink:0">
        <button class="outlined"><svg><!-- download --></svg> Import</button>
        <button><svg><!-- plus --></svg> Create</button>
      </div>
    </div>

    <div class="admin-toolbar">
      <label>
        <svg data-prefix><!-- search --></svg>
        <input type="search" placeholder="Filter tasks..." />
      </label>
      <button class="outlined" popovertarget="status-filter">
        <svg><!-- circle-dot --></svg> Status
      </button>
      <div id="status-filter" popover>
        <menu>
          <li><label><input type="checkbox" checked name="status" value="todo" /> <svg><!-- circle --></svg> Todo</label></li>
          <li><label><input type="checkbox" checked name="status" value="in-progress" /> <svg><!-- loader-2 --></svg> In Progress</label></li>
          <li><label><input type="checkbox" checked name="status" value="done" /> <svg><!-- circle-check --></svg> Done</label></li>
          <li><label><input type="checkbox" checked name="status" value="canceled" /> <svg><!-- circle-x --></svg> Canceled</label></li>
          <li><label><input type="checkbox" checked name="status" value="backlog" /> <svg><!-- circle-dashed --></svg> Backlog</label></li>
        </menu>
      </div>
      <button class="outlined" popovertarget="priority-filter">
        <svg><!-- arrow-up --></svg> Priority
      </button>
      <div id="priority-filter" popover>
        <menu>
          <li><label><input type="checkbox" checked name="priority" value="high" /> <svg><!-- arrow-up --></svg> High</label></li>
          <li><label><input type="checkbox" checked name="priority" value="medium" /> <svg><!-- minus --></svg> Medium</label></li>
          <li><label><input type="checkbox" checked name="priority" value="low" /> <svg><!-- arrow-down --></svg> Low</label></li>
        </menu>
      </div>
      <button class="outlined" style="margin-left:auto">
        <svg><!-- adjustments-horizontal --></svg> View
      </button>
    </div>

    <table class="task-table" style="--cols: 90px 120px 1fr 130px 100px 51px">
      <thead>
        <tr>
          <th>Task</th><th>Type</th><th>Title</th>
          <th>Status</th><th>Priority</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><small>TASK-8782</small></td>
          <td><span class="badge color2">Feature</span></td>
          <td>You can't compress the program without quantifying...</td>
          <td><svg><!-- circle --></svg> In Progress</td>
          <td><svg><!-- minus --></svg> Medium</td>
          <td>
            <button class="ghost square" style="anchor-name:--row-1" popovertarget="row-actions-1">
              <svg><!-- dots --></svg>
            </button>
            <div id="row-actions-1" popover style="position-anchor:--row-1;top:anchor(bottom);right:anchor(right);left:unset;margin:0">
              <menu>
                <li><button class="ghost">Edit</button></li>
                <li><button class="ghost">Duplicate</button></li>
                <li><hr /></li>
                <li><button class="ghost">Mark as done</button></li>
                <li><hr /></li>
                <li><button class="ghost destructive">Delete</button></li>
              </menu>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <small style="display:flex;align-items:center;justify-content:space-between">
      <span>0 of 100 row(s) selected.</span>
      <div style="display:flex;align-items:center;gap:1rem">
        <span>Rows per page</span>
        <select style="width:auto"><option>10</option></select>
        <span>Page 1 of 10</span>
        <fieldset role="group">
          <button class="outlined square" disabled><svg><!-- chevrons-left --></svg></button>
          <button class="outlined square" disabled><svg><!-- chevron-left --></svg></button>
          <button class="outlined square"><svg><!-- chevron-right --></svg></button>
          <button class="outlined square"><svg><!-- chevrons-right --></svg></button>
        </fieldset>
      </div>
    </small>
  </main>
</div>`),
          )}
        </div>
      </div>
    `,
  });
}
