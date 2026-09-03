import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "default", label: "Default" },
  { id: "disabled", label: "Disabled tab" },
  { id: "with-cards", label: "With content" },
  { id: "nested", label: "Nested" },
];

export async function TabsPage(path: string) {
  return Layout({
    title: "Tabs",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Tabs <sup class="badge constructive">New</sup></h1>
          <p>
            A set of <code>label</code> elements with hidden radio inputs inside
            a <code>.tabs</code> container. No JavaScript. CSS
            <code>:has()</code> handles panel switching.
          </p>
        </hgroup>

        <h2 id="default">Default</h2>
        <ul>
          <li>
            Each <code>label</code> wraps a hidden radio <code>input</code>. Add
            <code>checked</code> to set the default tab. <br /><small
              >CSS uses <code>:has()</code> to watch the checked state inside
              <code>[role="tablist"]</code> and show the panel at the matching
              position, with no JavaScript.</small
            >
          </li>
          <li>
            Give the <code>header</code> <code>role="tablist"</code> and an
            <code>aria-label</code>. <br /><small
              >The tab bar styling targets
              <code>[role="tablist"]</code> directly. Screen readers also use
              this to announce the group and let users navigate between
              tabs.</small
            >
          </li>
          <li>
            Connect each input to its panel with matching <code>id</code> and
            <code>aria-controls</code>. <br /><small
              >Lets assistive technology jump directly from a tab to its
              associated content.</small
            >
          </li>
          <li>
            Mark each panel with <code>role="tabpanel"</code>,
            <code>aria-labelledby</code>, and <code>tabindex="0"</code>.
            <br /><small
              >All <code>[role="tabpanel"]</code> elements are hidden by
              default. The Nth panel is revealed when the Nth tab is checked.
              <code>aria-labelledby</code> names the panel after its tab, and
              <code>tabindex="0"</code> makes it reachable by keyboard.</small
            >
          </li>
        </ul>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="tabs">
            <header role="tablist" aria-label="Account settings">
              <label>
                <input
                  type="radio"
                  name="tab-demo"
                  id="tab-demo-account"
                  checked
                  aria-controls="panel-demo-account"
                />
                Account
              </label>
              <label>
                <input
                  type="radio"
                  name="tab-demo"
                  id="tab-demo-password"
                  aria-controls="panel-demo-password"
                />
                Password
              </label>
              <label>
                <input
                  type="radio"
                  name="tab-demo"
                  id="tab-demo-notifications"
                  aria-controls="panel-demo-notifications"
                />
                Notifications
              </label>
            </header>

            <div
              role="tabpanel"
              id="panel-demo-account"
              aria-labelledby="tab-demo-account"
              tabindex="0"
            >
              <p>Manage your account settings and preferences.</p>
            </div>
            <div
              role="tabpanel"
              id="panel-demo-password"
              aria-labelledby="tab-demo-password"
              tabindex="0"
            >
              <p>Change your password and security settings.</p>
            </div>
            <div
              role="tabpanel"
              id="panel-demo-notifications"
              aria-labelledby="tab-demo-notifications"
              tabindex="0"
            >
              <p>Configure how and when you receive notifications.</p>
            </div>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="tabs">
  <header role="tablist" aria-label="Account settings">
    <label>
    <input type="radio" name="tabs" id="tab-1" checked aria-controls="panel-1" /> Account
    </label>
    <label>
    <input type="radio" name="tabs" id="tab-2" aria-controls="panel-2" /> Password
    </label>
    <label>
    <input type="radio" name="tabs" id="tab-3" aria-controls="panel-3" /> Notifications
    </label>
  </header>

  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">
    <p>Manage your account settings and preferences.</p>
  </div>
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0">
    <p>Change your password and security settings.</p>
  </div>
  <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" tabindex="0">
    <p>Configure how and when you receive notifications.</p>
  </div>
</section>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled tab</h2>
        <p>Add <code>disabled</code> to the radio input to disable a tab.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section
            class="tabs"
            style="display: grid; grid-templates-areas: header tabs"
          >
            <header role="tablist" aria-label="Dashboard">
              <label>
                <input
                  type="radio"
                  name="tab-disabled"
                  id="tab-disabled-overview"
                  checked
                  aria-controls="panel-disabled-overview"
                />
                Overview
              </label>
              <label>
                <input
                  type="radio"
                  name="tab-disabled"
                  id="tab-disabled-analytics"
                  aria-controls="panel-disabled-analytics"
                />
                Analytics
              </label>
              <label>
                <input
                  type="radio"
                  name="tab-disabled"
                  id="tab-disabled-reports"
                  disabled
                  aria-controls="panel-disabled-reports"
                />
                Reports
              </label>
            </header>
            <div
              role="tabpanel"
              id="panel-disabled-overview"
              aria-labelledby="tab-disabled-overview"
              tabindex="0"
              style="display: grid; gap: 1rem;"
            >
              <p>Overview content goes here.</p>
            </div>
            <div
              role="tabpanel"
              id="panel-disabled-analytics"
              aria-labelledby="tab-disabled-analytics"
              tabindex="0"
            >
              <p>Analytics content goes here.</p>
            </div>
            <div
              role="tabpanel"
              id="panel-disabled-reports"
              aria-labelledby="tab-disabled-reports"
              tabindex="0"
            >
              <p>Reports content goes here.</p>
            </div>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="tabs">
                <header role="tablist" aria-label="Dashboard">
                  <label>
                    <input
                      type="radio"
                      name="tabs"
                      id="tab-1"
                      checked
                      aria-controls="panel-1"
                    />
                    Overview
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tabs"
                      id="tab-2"
                      aria-controls="panel-2"
                    />
                    Analytics
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tabs"
                      id="tab-3"
                      disabled
                      aria-controls="panel-3"
                    />
                    Reports
                  </label>
                </header>

                <div
                  role="tabpanel"
                  id="panel-1"
                  aria-labelledby="tab-1"
                  tabindex="0"
                >
                  Overview content goes here.
                </div>
                <div
                  role="tabpanel"
                  id="panel-2"
                  aria-labelledby="tab-2"
                  tabindex="0"
                >
                  Analytics content goes here.
                </div>
                <div
                  role="tabpanel"
                  id="panel-3"
                  aria-labelledby="tab-3"
                  tabindex="0"
                >
                  Reports content goes here.
                </div>
              </section>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="with-cards">With content</h2>
        <p>Tab panels can contain any content.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <section class="tabs" style="display: grid; gap: 1rem;">
            <header role="tablist" aria-label="Team">
              <label>
                <input
                  type="radio"
                  name="tab-cards"
                  id="tab-cards-members"
                  checked
                  aria-controls="panel-cards-members"
                />
                Members
              </label>
              <label>
                <input
                  type="radio"
                  name="tab-cards"
                  id="tab-cards-activity"
                  aria-controls="panel-cards-activity"
                />
                Activity
              </label>
              <label>
                <input
                  type="radio"
                  name="tab-cards"
                  id="tab-cards-invite"
                  aria-controls="panel-cards-invite"
                />
                Invite
              </label>
            </header>

            <div
              role="tabpanel"
              id="panel-cards-members"
              aria-labelledby="tab-cards-members"
              tabindex="0"
            >
              <table>
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
              </table>
            </div>
            <div
              role="tabpanel"
              id="panel-cards-activity"
              aria-labelledby="tab-cards-activity"
              tabindex="0"
            >
              <section class="empty">
                ${raw(icon("inbox", { size: 24 }))}
                <h3>No activity yet</h3>
                <p>Actions taken by your team will appear here.</p>
              </section>
            </div>
            <div
              role="tabpanel"
              id="panel-cards-invite"
              aria-labelledby="tab-cards-invite"
              tabindex="0"
            >
              <form style="display: grid; gap: 1em;">
                <label class="field">
                  <span>Email address</span>
                  <input type="email" placeholder="colleague@example.com" />
                </label>
                <div class="field">
                  <span>Role</span>
                  <button
                    type="button"
                    class="outlined"
                    popovertarget="tab-invite-role"
                    style="justify-content:space-between"
                  >
                    <span>Member</span>
                    ${raw(icon("chevron-down", { size: 14 }))}
                  </button>
                  <div
                    id="tab-invite-role"
                    popover
                    onchange="document.querySelector('[popovertarget=tab-invite-role] span').textContent=event.target.closest('label').textContent.trim();this.hidePopover()"
                  >
                    <menu>
                      <li>
                        <label
                          ><input
                            type="radio"
                            name="invite-role"
                            value="member"
                            checked
                          />
                          Member</label
                        >
                      </li>
                      <li>
                        <label
                          ><input
                            type="radio"
                            name="invite-role"
                            value="admin"
                          />
                          Admin</label
                        >
                      </li>
                      <li>
                        <label
                          ><input
                            type="radio"
                            name="invite-role"
                            value="viewer"
                          />
                          Viewer</label
                        >
                      </li>
                    </menu>
                  </div>
                </div>
                <button type="submit">Send invite</button>
              </form>
            </div>
          </section>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<section class="tabs" style="display: grid; gap: 1rem;">
  <header role="tablist" aria-label="Team">
    <label>
    <input type="radio" name="tabs" id="tab-1" checked aria-controls="panel-1" /> Members
    </label>
    <label>
    <input type="radio" name="tabs" id="tab-2" aria-controls="panel-2" /> Activity
    </label>
    <label>
    <input type="radio" name="tabs" id="tab-3" aria-controls="panel-3" /> Invite
    </label>
  </header>

  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Alice</td><td>Engineer</td><td>Active</td></tr>
        <tr><td>Bob</td><td>Designer</td><td>Away</td></tr>
        <tr><td>Carol</td><td>Manager</td><td>Active</td></tr>
      </tbody>
    </table>
  </div>

  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0">
    <section class="empty">
      <svg><!-- icon --></svg>
      <h3>No activity yet</h3>
      <p>Actions taken by your team will appear here.</p>
    </section>
  </div>

  <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" tabindex="0">
    <form style="display: grid; gap: 1em;">
      <label class="field">
        <span>Email address</span>
        <input type="email" placeholder="colleague@example.com" />
      </label>
      <div class="field">
        <span>Role</span>
        <button type="button" class="outlined" popovertarget="role">Member</button>
        <div id="role" popover>
          <menu>
            <li><label>
            <input type="radio" name="role" value="member" checked /> Member
            </label></li>
            <li><label>
            <input type="radio" name="role" value="admin" /> Admin
            </label></li>
            <li><label>
            <input type="radio" name="role" value="viewer" /> Viewer
            </label></li>
          </menu>
        </div>
      </div>
      <button type="submit">Send invite</button>
    </form>
  </div>
</section>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="nested">Nested</h2>
        <p>
          Tabs nest as deep as you like. Each level is independent, so
          switching the outer tabs leaves the inner ones where they were.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <!-- Level 1 -->
          <section class="tabs parent-tabs">
            <header role="tablist" aria-label="Outer tabs">
              <label>
                <input type="radio" name="outer" checked /> Overview
              </label>
              <label><input type="radio" name="outer" /> Settings</label>
            </header>

            <div role="tabpanel">
              <p>Outer panel one, holding another tabs component:</p>
              <!-- Level 2 -->
              <section class="tabs child-tabs">
                <header role="tablist" aria-label="Inner tabs">
                  <label><input type="radio" name="inner" /> Info</label>
                  <label>
                    <input type="radio" name="inner" checked /> Animals
                  </label>
                </header>

                <div role="tabpanel">
                  <p>There's another tabs component in the other tab</p>
                </div>
                <div role="tabpanel">
                  <!-- Level 3 -->
                  <section class="tabs third-tabs">
                    <header role="tablist" aria-label="Inner tabs">
                      <label>
                        <input type="radio" name="third" checked /> Dog
                      </label>
                      <label><input type="radio" name="third" /> Cat</label>
                    </header>

                    <div role="tabpanel"><p>Woof</p></div>
                    <div role="tabpanel"><p>Meow</p></div>
                  </section>
                </div>
              </section>
            </div>

            <div role="tabpanel">
              <p>Outer panel two.</p>
            </div>
          </section>

          <style>
            .parent-tabs {
              padding: 1rem;
              border: 1px solid var(--ui-neutral-100);
            }

            .child-tabs {
              padding: 1rem;
              background-color: var(--ui-neutral-100);
            }

            .third-tabs {
              padding: 1rem;
              background-color: var(--ui-neutral-0);
            }
          </style>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<!-- Level 1 -->
          <section class="tabs first">
            <header role="tablist" aria-label="Outer tabs">
              <label>
                <input type="radio" name="outer" checked /> Overview
              </label>
              <label><input type="radio" name="outer" /> Settings</label>
            </header>

            <div role="tabpanel">
              <p>Outer panel one, holding another tabs component:</p>
              <!-- Level 2 -->
              <section class="tabs second">
                <header role="tablist" aria-label="Inner tabs">
                  <label><input type="radio" name="inner" /> Info</label>
                  <label>
                    <input type="radio" name="inner" checked /> Animals
                  </label>
                </header>

                <div role="tabpanel">
                  <p>There's another tabs component in the other tab</p>
                </div>
                <div role="tabpanel">
                  <!-- Level 3 -->
                  <section class="tabs third">
                    <header role="tablist" aria-label="Inner tabs">
                      <label>
                        <input type="radio" name="third" checked /> Dog
                      </label>
                      <label><input type="radio" name="third" /> Cat</label>
                    </header>

                    <div role="tabpanel"><p>Woof</p></div>
                    <div role="tabpanel"><p>Meow</p></div>
                  </section>
                </div>
              </section>
            </div>

            <div role="tabpanel">
              <p>Outer panel two.</p>
            </div>
          </section>

          <style>
            .tabs {
              padding: 1rem;

              .first {
                border: 1px solid var(--ui-neutral-100);
              }

              .second {
                background-color: var(--ui-neutral-100);
              }
              
              .third {
                background-color: var(--ui-neutral-0);
              }
            }

          </style>`),
          )}
        </div>
      </div>
    `,
  });
}
