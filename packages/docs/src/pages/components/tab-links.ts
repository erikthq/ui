import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { icon } from "../../icon";
import { apiReference } from "../../components/api-reference";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "example", label: "Example" },
  { id: "usage", label: "Usage" },
  { id: "view-transitions", label: "View transitions" },
  { id: "morph", label: "Without view transitions" },
  { id: "icons", label: "With icons" },
  { id: "disabled", label: "Disabled link" },
  { id: "multiple", label: "Several bars per page" },
  { id: "custom-properties", label: "Custom properties" },
  { id: "api-reference", label: "API reference" },
];

const demo = [
  { label: "Overview", body: html`<p>The overview page.</p>` },
  { label: "Activity", body: html`<p>The activity page.</p>` },
  { label: "Settings", body: html`<p>The settings page.</p>` },
];

export async function TabLinksPage(path: string) {
  return Layout({
    title: "Tab Links",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Tab Links <sup class="badge constructive">New</sup></h1>
            ${raw(titleActions(path, "tab-links"))}
          </div>
          <p>
            Links that look like <a href="${url("/components/tabs")}">Tabs</a>.
            Use it to move between pages.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(await standaloneLink("tab-links"))}
        </div>
      </div>

      <div class="prose">
        <h2 id="example">Example</h2>
      </div>
      <div class="example">
        <div class="preview preview-padded" style="gap: 1.5rem">
          <nav class="tab-links" aria-label="Demo views" data-demo="views">
            ${demo.map(
              (tab, i) =>
                html`<a
                  href="#example"
                  ${i === 0 ? raw('aria-current="page"') : ""}
                  >${tab.label}</a
                >`,
            )}
          </nav>
          <div id="views-panel" class="prose">
            ${demo.map(
              (tab, i) =>
                html`<div data-view ${i === 0 ? "" : raw("hidden")}>
                  ${tab.body}
                </div>`,
            )}
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav class="tab-links" aria-label="Sections">
  <a href="/overview" aria-current="page">Overview</a>
  <a href="/activity">Activity</a>
  <a href="/settings">Settings</a>
</nav>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="usage">Usage</h2>
        <ul>
          <li>
            Put the links directly inside <code>.tab-links</code>. Use a
            <code>&lt;nav&gt;</code>.
          </li>
          <li>
            Add <code>aria-current="page"</code> to the link for the current
            page. The highlight goes there.
          </li>
          <li>
            Add an <code>aria-label</code> to the <code>&lt;nav&gt;</code> if
            the page has more than one <code>&lt;nav&gt;</code>.
          </li>
        </ul>
      </div>

      <div class="prose">
        <h2 id="view-transitions">View transitions</h2>
        <p>
          The highlight slides to the new link during a view transition.
        </p>

        <h3>On the same page</h3>
        <p>
          Move <code>aria-current</code> inside
          <code>document.startViewTransition()</code>.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `bar.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link || link.hasAttribute("aria-current")) return;

  event.preventDefault();

  document.startViewTransition(() => {
    for (const a of bar.querySelectorAll("a")) a.removeAttribute("aria-current");
    link.setAttribute("aria-current", "page");
  });
});`,
              72,
              "js",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h3>Between pages</h3>
        <p>
          Add this to the <code>&lt;head&gt;</code> of every page with the bar.
          It must be in the <code>&lt;head&gt;</code>, or the transition
          sometimes does not run.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `<style>
  @view-transition {
    navigation: auto;
  }
</style>`,
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h3>Change the motion</h3>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `/* the highlight */
::view-transition-group(.ui-tab-links) {
  animation-duration: 400ms;
  animation-timing-function: var(--ease-snap);
}

/* the labels */
::view-transition-group(.ui-tab-link),
::view-transition-old(.ui-tab-link),
::view-transition-new(.ui-tab-link) {
  animation-duration: 400ms;
}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="morph">Without view transitions</h2>
        <p>
          Add <code>.morph</code> if you update the bar without a view
          transition, for example with htmx morphing. The highlight still
          slides.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <nav
            class="tab-links morph"
            aria-label="Morph example"
            data-demo="morph"
          >
            <a href="#morph" aria-current="page">Overview</a>
            <a href="#morph">Activity</a>
            <a href="#morph">Settings</a>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav class="tab-links morph">
  <a href="/overview" aria-current="page">Overview</a>
  <a href="/activity">Activity</a>
  <a href="/settings">Settings</a>
</nav>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="icons">With icons</h2>
        <p>Put an icon before the label.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <nav
            class="tab-links"
            aria-label="Icon example"
            data-demo="icons"
            style="--ui-tab-links-name: ui-icons-demo"
          >
            <a href="#icons" aria-current="page">
              ${raw(icon("layout", { size: 14 }))} Board
            </a>
            <a href="#icons">${raw(icon("table", { size: 14 }))} Table</a>
            <a href="#icons">${raw(icon("chart-bar", { size: 14 }))} Chart</a>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav class="tab-links">
  <a href="/board" aria-current="page">
  <svg><!-- icon --></svg> Board</a>
  <a href="/table">
  <svg><!-- icon --></svg> Table</a>
  <a href="/chart">
  <svg><!-- icon --></svg> Chart</a>
</nav>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="disabled">Disabled link</h2>
        <p>
          Add <code>aria-disabled="true"</code> and remove the
          <code>href</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <nav
            class="tab-links"
            aria-label="Disabled example"
            data-demo="disabled"
            style="--ui-tab-links-name: ui-disabled-demo"
          >
            <a href="#disabled" aria-current="page">Overview</a>
            <a href="#disabled">Analytics</a>
            <a aria-disabled="true">Reports</a>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav class="tab-links">
  <a href="/overview" aria-current="page">Overview</a>
  <a href="/analytics">Analytics</a>
  <a aria-disabled="true">Reports</a>
</nav>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="multiple">Several bars per page</h2>
        <p>
          Give each extra bar its own <code>--ui-tab-links-name</code>. Without
          it, only one bar animates. A <code>.morph</code> bar does not need
          a name.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded" style="gap: 0.75rem">
          <nav
            class="tab-links"
            aria-label="Primary example"
            data-demo="folders"
            style="--ui-tab-links-name: ui-folders-demo"
          >
            <a href="#multiple" aria-current="page">Inbox</a>
            <a href="#multiple">Archive</a>
          </nav>
          <nav
            class="tab-links"
            aria-label="Secondary example"
            data-demo="sort"
            style="--ui-tab-links-name: ui-sort-demo"
          >
            <a href="#multiple">Newest</a>
            <a href="#multiple" aria-current="page">Oldest</a>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav class="tab-links" aria-label="Folders">
  <a href="/inbox" aria-current="page">Inbox</a>
  <a href="/archive">Archive</a>
</nav>

<nav class="tab-links" aria-label="Sort" style="--ui-tab-links-name: ui-sort">
  <a href="/inbox?sort=new">Newest</a>
  <a href="/inbox?sort=old" aria-current="page">Oldest</a>
</nav>`),
          )}
        </div>
      </div>

        </div>
      </div>

      <div class="prose">
        <h2 id="custom-properties">Custom properties</h2>
        <p>
          Set these on the bar.
        </p>

        <table class="align-left">
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>--bg</code></td>
              <td><code>var(--ui-neutral-200)</code></td>
              <td>Background of the bar.</td>
            </tr>
            <tr>
              <td><code>--bg-active</code></td>
              <td><code>var(--ui-neutral-50)</code></td>
              <td>Background of the highlight behind the current link.</td>
            </tr>
            <tr>
              <td><code>--fg</code></td>
              <td><code>var(--ui-neutral-800)</code></td>
              <td>Text color of the links.</td>
            </tr>
            <tr>
              <td><code>--fg-hover</code></td>
              <td><code>var(--ui-neutral-950)</code></td>
              <td>Text color of a link on hover.</td>
            </tr>
            <tr>
              <td><code>--fg-active</code></td>
              <td><code>var(--ui-neutral-950)</code></td>
              <td>Text color of the current link.</td>
            </tr>
            <tr>
              <td><code>--ui-tab-links-name</code></td>
              <td><code>ui-tab-links</code></td>
              <td>Name for the highlight. Unique per bar on a page.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `.tab-links {\n  --bg: var(--ui-neutral-100);\n  --bg-active: var(--ui-neutral-0);\n}`,
              80,
              "css",
            ),
          )}
        </div>
      </div>

      ${apiReference([
        { type: "State", values: ['[aria-current="page"]'], description: "Marks the active link and moves the highlight to it" },
        { type: "Disabled", values: ['[aria-disabled="true"]'], description: "Fades the link and blocks clicks" },
        { type: "Modifier", values: [".morph"], description: "Slides the highlight with a CSS transition instead of a view transition, for DOM morphing" },
        { type: "Transition name", values: ["--ui-tab-links-name: ui-sort"], description: "View transition name, unique per tab bar on a page" },
        { type: "Track", values: ["--bg: var(--ui-neutral-200)"], description: "Background of the bar" },
        { type: "Highlight", values: ["--bg-active: var(--ui-neutral-50)"], description: "Background of the highlight behind the active link" },
        { type: "Text", values: ["--fg: var(--ui-neutral-800)"], description: "Text color of links" },
        { type: "Hover text", values: ["--fg-hover: var(--ui-neutral-950)"], description: "Text color of a hovered link" },
        { type: "Active text", values: ["--fg-active: var(--ui-neutral-950)"], description: "Text color of the active link" },
      ])}

      <script type="module">
        // One handler for every bar on the page. The first demo also swaps its
        // panel; the rest only move aria-current.
        const switchTab = (bar, link) => {
          const links = [...bar.querySelectorAll("a")];
          const panels =
            bar.dataset.demo === "views"
              ? [...document.querySelectorAll("#views-panel > [data-view]")]
              : [];

          const update = () => {
            for (const a of links) a.removeAttribute("aria-current");
            link.setAttribute("aria-current", "page");
            const index = links.indexOf(link);
            panels.forEach((panel, i) => (panel.hidden = i !== index));
          };

          if (document.startViewTransition && !bar.classList.contains("morph"))
            document.startViewTransition(update);
          else update();
        };

        for (const bar of document.querySelectorAll(".tab-links[data-demo]")) {
          bar.addEventListener("click", (event) => {
            const link = event.target.closest("a[href]");
            if (!link || !bar.contains(link)) return;
            if (link.hasAttribute("aria-current")) return;

            event.preventDefault();
            switchTab(bar, link);
          });
        }
      </script>
    `,
  });
}
