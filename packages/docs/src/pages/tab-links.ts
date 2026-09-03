import { html, raw } from "hono/html";
import { Layout, url } from "../layout";
import { highlight } from "../highlight";
import { icon } from "../icon";

const toc = [
  { id: "live", label: "Live demo" },
  { id: "markup", label: "Markup" },
  { id: "view-transitions", label: "View transitions" },
  { id: "icons", label: "With icons" },
  { id: "disabled", label: "Disabled link" },
  { id: "multiple", label: "Several bars per page" },
];

const base = "/components/tab-links";

const demo = [
  {
    slug: "",
    label: "Overview",
    body: html`<p>
      Every tab here is an <code>&lt;a&gt;</code>. Clicking one loads a new
      document, and the highlight glides across because the browser hands the
      pseudo element to a view transition.
    </p>`,
  },
  {
    slug: "/activity",
    label: "Activity",
    body: html`<p>
      This panel came from <code>${base}/activity</code>. The page fully
      reloaded, the sidebar and header were rebuilt from scratch, and the
      highlight still animated to its new spot.
    </p>`,
  },
  {
    slug: "/settings",
    label: "Settings",
    body: html`<p>
      And this one from <code>${base}/settings</code>. No JavaScript is
      involved: the active state is <code>aria-current</code> in the HTML, the
      motion is CSS.
    </p>`,
  },
];

export async function TabLinksPage(path: string) {
  const current = demo.find((t) => path === base + t.slug) ?? demo[0];

  return Layout({
    // The demo lives on three URLs but is one page, so keep the canonical URL
    // and the sidebar pointed at the base path.
    title: "Tab Links",
    path: base,
    toc,
    viewTransition: true,
    expect: "views-panel",
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Tab Links <sup class="badge constructive">New</sup></h1>
          <p>
            A <code>.tab-links</code> bar that looks like
            <a href="${url("/components/tabs")}">Tabs</a> but navigates. The
            items are links, the one matching the current page carries
            <code>aria-current</code>, and the highlight is a pseudo element so
            it can animate between pages with view transitions.
          </p>
        </hgroup>

        <h2 id="live">Live demo</h2>
        <p>
          These three tabs are real links to three real URLs. Click through them
          and watch the highlight slide instead of jumping.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded" style="gap: 1.5rem">
          <nav class="tab-links" aria-label="Demo views">
            ${demo.map(
              (tab) =>
                html`<a
                  href="${url(base + tab.slug)}"
                  ${tab.slug === current.slug ? raw('aria-current="page"') : ""}
                  >${tab.label}</a
                >`,
            )}
          </nav>
          <!-- rel="expect" waits on this, since it sits after the bar -->
          <div id="views-panel" class="prose">${current.body}</div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<!-- rendered on every page, with aria-current moved to the active URL -->
<nav class="tab-links" aria-label="Demo views">
  <a href="/overview" aria-current="page">Overview</a>
  <a href="/activity">Activity</a>
  <a href="/settings">Settings</a>
</nav>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="markup">Markup</h2>
        <ul>
          <li>
            Wrap the links in a <code>nav.tab-links</code> with an
            <code>aria-label</code>. <br /><small
              >A list of links to other pages is navigation, not a tab widget,
              so there is no <code>role="tablist"</code> here. Screen readers
              announce it as a labelled navigation landmark.</small
            >
          </li>
          <li>
            Put <code>aria-current="page"</code> on the link for the current
            URL. <br /><small
              >This is the only piece of state. The highlight is anchored to
              that link with <code>anchor-name</code>, so moving the attribute
              moves the highlight. With no current link the highlight is
              hidden.</small
            >
          </li>
          <li>
            Use <code>aria-disabled="true"</code> to soften a link you do not
            want followed yet. <br /><small
              >There is no <code>disabled</code> attribute on
              <code>&lt;a&gt;</code>. Drop the <code>href</code> as well if the
              link should be unreachable by keyboard.</small
            >
          </li>
        </ul>
      </div>

      <div class="prose">
        <h2 id="view-transitions">View transitions</h2>
        <p>
          The highlight is a <code>::before</code> on the bar rather than a
          background on the active link. One element, present on every page, in
          a different place each time. That is exactly what a view transition
          needs to interpolate.
        </p>
        <p>
          The component names it and tags it with a view transition class. It
          also names each link, which matters more than it sounds: a named
          element is lifted out of the page snapshot and drawn on top of it, so
          if only the highlight were named it would slide <em>over</em> the
          labels for the length of the transition. Naming the links lifts them
          out too, and because they paint after the highlight they land back on
          top of it. They use <code>view-transition-name: match-element</code>,
          so the names stay unique however many bars a page holds.
        </p>
        <p>
          Add the <code>@view-transition</code> opt-in to both documents and the
          browser does the rest.
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `<!-- in the head of every page that shows the bar -->
<style>
  @view-transition {
    navigation: auto;
  }
</style>

<!-- optional: hold the first render until the bar has been parsed.
     Name an element that comes after the bar, not the bar itself. -->
<link rel="expect" blocking="render" href="#after-views" />`,
            ),
          )}
        </div>
      </div>
      <div class="prose">
        <p>
          <strong>Put the opt-in in the <code>&lt;head&gt;</code>.</strong> The
          browser captures the incoming page right before its first rendering
          opportunity, so it has to know the page opted in by then. A
          <code>&lt;style&gt;</code> further down the body is a race, and it is
          the kind of race that flips depending on how fast the stylesheets
          load. A transition that runs with devtools open and not without it is
          almost always this: an empty cache slows the first paint down enough
          for the parser to reach the rule in time, and a warm cache does not.
        </p>
        <p>
          <code>&lt;link rel="expect"&gt;</code> covers the other end of the
          same problem. It holds the first render until the named element shows
          up, so the browser cannot capture the new page before the bar exists.
          Without it, a bar far down a long page can be missing at capture time
          and the highlight fades instead of gliding. Point it at an element
          that comes <em>after</em> the bar: the block lifts as soon as the
          named element itself lands in the DOM, which for the bar would be
          before its links have been parsed.
        </p>
      </div>
      <div class="prose">
        <p>
          For a single page app, wrap the route change in
          <code>document.startViewTransition()</code> instead. Tune the motion
          through the view transition classes, which every bar and every link
          share:
        </p>
      </div>
      <div class="example">
        <div class="code-block">
          ${raw(
            await highlight(
              `/* the sliding highlight */
::view-transition-group(.ui-tab-links) {
  animation-duration: 400ms;
  animation-timing-function: var(--ease-snap);
}

/* the labels riding above it */
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
        <h2 id="icons">With icons</h2>
        <p>Links accept an inline icon next to the label.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          <nav
            class="tab-links"
            aria-label="Icon example"
            style="--ui-tab-links-name: none"
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
            await highlight(`<nav class="tab-links" aria-label="Views">
  <a href="/board" aria-current="page"><svg><!-- icon --></svg> Board</a>
  <a href="/table"><svg><!-- icon --></svg> Table</a>
  <a href="/chart"><svg><!-- icon --></svg> Chart</a>
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
            style="--ui-tab-links-name: none"
          >
            <a href="#disabled" aria-current="page">Overview</a>
            <a href="#disabled">Analytics</a>
            <a aria-disabled="true">Reports</a>
          </nav>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<nav class="tab-links" aria-label="Dashboard">
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
          A view transition name has to be unique in a document. Every bar uses
          <code>ui-tab-links</code> by default, so give each extra bar its own
          name through <code>--ui-tab-links-name</code>, or set it to
          <code>none</code> to leave that bar out of the transition entirely.
        </p>
        <p>
          <small
            >The illustrative examples above are set to <code>none</code>, which
            is why only the live demo animates.</small
          >
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded" style="gap: 0.75rem">
          <nav
            class="tab-links"
            aria-label="Primary example"
            style="--ui-tab-links-name: none"
          >
            <a href="#multiple" aria-current="page">Inbox</a>
            <a href="#multiple">Archive</a>
          </nav>
          <nav
            class="tab-links"
            aria-label="Secondary example"
            style="--ui-tab-links-name: none"
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
    `,
  });
}
