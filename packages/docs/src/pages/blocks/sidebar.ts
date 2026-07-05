import { html, raw } from "hono/html";
import { Layout } from "../../layout";
import { highlight } from "../../highlight";
import { icon } from "../../icon";

export async function SidebarPage(path: string) {
  return Layout({
    wide: true,
    title: "Sidebar",
    path,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Sidebar</h1>
          <p>
            An app navigation sidebar with grouped links, an expandable section,
            and a pinned user footer.
          </p>
        </hgroup>
      </div>

      <style>
        .sidebar {
          width: 230px;

          header {
            display: flex;
            align-items: center;
            gap: var(--ui-spacing-3);
          }

          section > menu {
            padding-top: var(--ui-spacing-2);
          }

          details {
            border-bottom: 0;
            padding-inline: var(--ui-spacing-3);

            summary {
              padding-block: var(--ui-spacing-2);
            }

            menu {
              border-left: 1px solid var(--ui-neutral-200);
              margin-left: var(--ui-spacing-2);
              margin-block: 0 var(--ui-spacing-4);
              padding-block: 0;
              padding-left: var(--ui-spacing-1);
            }
          }

          li {
            position: relative;

            button.square {
              position: absolute;
              right: 0;
              width: revert;

              @media (hover: hover) {
                opacity: 0;
              }
            }

            &:hover,
            &:has([popover]:popover-open) {
              button.square {
                opacity: 1;
              }
            }
          }

          .sidebar-user {
            text-align: left;
            width: 100%;
          }
        }
      </style>

      <div class="example">
        <div class="preview">
          <nav class="sidebar">
            <header>
              <img
                src="https://api.dicebear.com/9.x/icons/svg?seed=Emery"
                width="32"
                height="32"
                alt="avatar"
              />
              <div style="display:grid">
                <strong>Acme Inc</strong>
                <small>Enterprise</small>
              </div>
            </header>

            <section>
              <menu>
                <li><small>Platform</small></li>
                <li>
                  <details open>
                    <summary>
                      <span style="display:flex;align-items:center;gap:0.5rem">
                        ${raw(icon("terminal-2"))} Playground
                      </span>
                    </summary>
                    <menu class="sidebar-submenu">
                      <li><button class="ghost">History</button></li>
                      <li><button class="ghost">Starred</button></li>
                      <li><button class="ghost">Settings</button></li>
                    </menu>
                  </details>
                </li>
                <li>
                  <button class="ghost">${raw(icon("search"))} Models</button>
                </li>
                <li>
                  <button class="ghost">
                    ${raw(icon("books"))} Documentation
                  </button>
                </li>
                <li>
                  <button class="ghost">
                    ${raw(icon("settings"))} Settings
                  </button>
                </li>
              </menu>
            </section>

            <section>
              <menu>
                <li><small>Projects</small></li>
                <li>
                  <button class="ghost">
                    ${raw(icon("layout-grid"))} Design Engineering
                  </button>
                  <button class="ghost square" popovertarget="sidebar-de-menu">
                    ${raw(icon("dots"))}
                  </button>
                  <div id="sidebar-de-menu" popover data-placement="right top">
                    <menu>
                      <li>
                        <button class="ghost">${raw(icon("eye"))} View</button>
                      </li>
                      <li>
                        <button class="ghost">
                          ${raw(icon("share"))} Share
                        </button>
                      </li>
                      <li><hr /></li>
                      <li>
                        <button class="ghost destructive">
                          ${raw(icon("trash"))} Delete
                        </button>
                      </li>
                    </menu>
                  </div>
                </li>
                <li>
                  <button class="ghost">
                    ${raw(icon("trending-up"))} Sales &amp; Marketing
                  </button>
                  <button class="ghost square" popovertarget="sidebar-sm-menu">
                    ${raw(icon("dots"))}
                  </button>
                  <div id="sidebar-sm-menu" popover data-placement="right top">
                    <menu>
                      <li>
                        <button class="ghost">${raw(icon("eye"))} View</button>
                      </li>
                      <li>
                        <button class="ghost">
                          ${raw(icon("share"))} Share
                        </button>
                      </li>
                      <li><hr /></li>
                      <li>
                        <button class="ghost destructive">
                          ${raw(icon("trash"))} Delete
                        </button>
                      </li>
                    </menu>
                  </div>
                </li>
                <li>
                  <button class="ghost">${raw(icon("plane"))} Travel</button>
                  <button
                    class="ghost square"
                    popovertarget="sidebar-travel-menu"
                  >
                    ${raw(icon("dots"))}
                  </button>
                  <div
                    id="sidebar-travel-menu"
                    popover
                    data-placement="right top"
                  >
                    <menu>
                      <li>
                        <button class="ghost">${raw(icon("eye"))} View</button>
                      </li>
                      <li>
                        <button class="ghost">
                          ${raw(icon("share"))} Share
                        </button>
                      </li>
                      <li><hr /></li>
                      <li>
                        <button class="ghost destructive">
                          ${raw(icon("trash"))} Delete
                        </button>
                      </li>
                    </menu>
                  </div>
                </li>
                <li>
                  <button class="ghost">${raw(icon("dots"))} More</button>
                </li>
              </menu>
            </section>

            <hr />

            <footer>
              <menu>
                <li>
                  <small
                    ><button class="ghost">
                      ${raw(icon("lifebuoy"))} Support
                    </button></small
                  >
                </li>
                <li>
                  <small
                    ><button class="ghost">
                      ${raw(icon("message"))} Feedback
                    </button></small
                  >
                </li>
              </menu>
              <hr />
              <button
                class="ghost sidebar-user"
                popovertarget="sidebar-user-menu"
              >
                <img
                  class="avatar square"
                  src="https://api.dicebear.com/9.x/pixel-art/svg?seed=erikt-ui"
                  alt=""
                />
                <div style="display:grid">
                  <strong>miles</strong>
                  <small>m@example.com</small>
                </div>
                <span style="display:flex;margin-left:auto">
                  ${raw(icon("selector"))}
                </span>
              </button>
              <div id="sidebar-user-menu" popover data-placement="right bottom">
                <menu>
                  <li
                    style="display:flex;align-items:center;gap:var(--ui-spacing-3);padding:var(--ui-spacing-2) var(--ui-spacing-3)"
                  >
                    <img
                      class="avatar square"
                      src="https://api.dicebear.com/9.x/pixel-art/svg?seed=erikt-ui"
                      alt=""
                    />
                    <div style="display:grid">
                      <strong>miles</strong>
                      <small>m@example.com</small>
                    </div>
                  </li>
                  <li><hr /></li>
                  <li>
                    <button class="ghost" style="color: var(--ui-color2-600);">
                      ${raw(icon("sparkles"))} Upgrade to Pro
                    </button>
                  </li>
                  <li><hr /></li>
                  <li>
                    <button class="ghost">
                      ${raw(icon("user-circle"))} Account
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      ${raw(icon("credit-card"))} Billing
                    </button>
                  </li>
                  <li>
                    <button class="ghost">
                      ${raw(icon("bell"))} Notifications
                    </button>
                  </li>
                  <li><hr /></li>
                  <li>
                    <button class="ghost destructive">
                      ${raw(icon("logout"))} Log out
                    </button>
                  </li>
                </menu>
              </div>
            </footer>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<style>
  .sidebar {
    width: 230px;

    header {
      display: flex;
      align-items: center;
      gap: var(--ui-spacing-3);
    }

    section > menu {
      padding-top: var(--ui-spacing-2);
    }

    details {
      border-bottom: 0;
      padding-inline: var(--ui-spacing-3);

      summary {
        padding-block: var(--ui-spacing-2);
      }

      menu {
        border-left: 1px solid var(--ui-neutral-200);
        margin-left: var(--ui-spacing-2);
        margin-block: 0 var(--ui-spacing-4);
        padding-block: 0;
        padding-left: var(--ui-spacing-1);
      }
    }

    li {
      position: relative;

      button.square {
        position: absolute;
        right: 0;
        width: revert;

        @media (hover: hover) {
          opacity: 0;
        }
      }

      &:hover,
      &:has([popover]:popover-open) {
        button.square {
          opacity: 1;
        }
      }
    }

    .sidebar-user {
      text-align: left;
      width: 100%;
    }
  }
</style>

<nav class="sidebar">
  <header>
    <img
      src="https://api.dicebear.com/9.x/icons/svg?seed=Emery"
      width="32"
      height="32"
      alt="avatar"
    />
    <div style="display:grid">
      <strong>Acme Inc</strong>
      <small>Enterprise</small>
    </div>
  </header>

    <section>
      <menu>
        <li><small>Platform</small></li>
        <li>
          <details open>
            <summary>
              <span style="display:flex;align-items:center;gap:0.5rem">
                <svg><!-- terminal-2 --></svg>
                Playground
              </span>
            </summary>
            <menu class="sidebar-submenu">
              <li><button class="ghost">History</button></li>
              <li><button class="ghost">Starred</button></li>
              <li><button class="ghost">Settings</button></li>
            </menu>
          </details>
        </li>
        <li><button class="ghost"><svg><!-- search --></svg> Models</button></li>
        <li><button class="ghost"><svg><!-- books --></svg> Documentation</button></li>
        <li><button class="ghost"><svg><!-- settings --></svg> Settings</button></li>
      </menu>
    </section>

    <section>
      <menu>
        <li><small>Projects</small></li>
        <li>
          <button class="ghost"><svg><!-- layout-grid --></svg> Design Engineering</button>
          <button class="ghost square" popovertarget="de-menu"><svg><!-- dots --></svg></button>
          <div id="de-menu" popover data-placement="right top">
            <menu>
              <li><button class="ghost"><svg><!-- eye --></svg> View</button></li>
              <li><button class="ghost"><svg><!-- share --></svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg><!-- trash --></svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg><!-- trending-up --></svg> Sales &amp; Marketing</button>
          <button class="ghost square" popovertarget="sm-menu"><svg><!-- dots --></svg></button>
          <div id="sm-menu" popover data-placement="right top">
            <menu>
              <li><button class="ghost"><svg><!-- eye --></svg> View</button></li>
              <li><button class="ghost"><svg><!-- share --></svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg><!-- trash --></svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg><!-- plane --></svg> Travel</button>
          <button class="ghost square" popovertarget="travel-menu"><svg><!-- dots --></svg></button>
          <div id="travel-menu" popover data-placement="right top">
            <menu>
              <li><button class="ghost"><svg><!-- eye --></svg> View</button></li>
              <li><button class="ghost"><svg><!-- share --></svg> Share</button></li>
              <li><hr /></li>
              <li><button class="ghost destructive"><svg><!-- trash --></svg> Delete</button></li>
            </menu>
          </div>
        </li>
        <li>
          <button class="ghost"><svg><!-- dots --></svg> More</button>
        </li>
      </menu>
    </section>


  <hr />

  <footer>
    <menu>
      <li><small>
        <button class="ghost"><svg><!-- lifebuoy --></svg> Support</button>
      </small></li>
      <li><small>
        <button class="ghost"><svg><!-- message --></svg> Feedback</button>
      </small></li>
    </menu>
    <hr />
    <button class="ghost sidebar-user" popovertarget="user-menu">
      <img src="avatar.png" width="26" height="26" alt="" />
      <div style="display:grid">
        <strong>miles</strong>
        <small>m@example.com</small>
      </div>
      <svg><!-- selector --></svg>
    </button>
    <div id="user-menu" popover data-placement="right bottom">
      <menu>
        <li style="display:flex;align-items:center;gap:var(--ui-spacing-3);padding:var(--ui-spacing-2) var(--ui-spacing-3)">
          <img src="avatar.png" width="32" height="32" alt="" />
          <div style="display:grid">
            <strong>miles</strong>
            <small>m@example.com</small>
          </div>
        </li>
        <li><hr /></li>
        <li><button class="ghost" style="color: var(--ui-color2-600);"><svg><!-- sparkles --></svg> Upgrade to Pro</button></li>
        <li><hr /></li>
        <li><button class="ghost"><svg><!-- user-circle --></svg> Account</button></li>
        <li><button class="ghost"><svg><!-- credit-card --></svg> Billing</button></li>
        <li><button class="ghost"><svg><!-- bell --></svg> Notifications</button></li>
        <li><hr /></li>
        <li><button class="ghost destructive"><svg><!-- logout --></svg> Log out</button></li>
      </menu>
    </div>
  </footer>
</nav>`),
          )}
        </div>
      </div>
    `,
  });
}
