import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import { IconsSearchDialog } from "./pages/icons-dialog";
import { SearchDialog } from "./pages/search-dialog";
import { icon } from "./icon";
import { SchemePicker } from "./components/scheme-picker";
import { ThemePicker } from "./components/theme-picker";
import { SidebarNav } from "./components/sidebar-nav";
import { TableOfContents } from "./components/table-of-contents";
import copyCode from "./components/copy-code";

const b = (process.env.BASE_URL ?? "/").replace(/\/$/, "");
export const url = (path: string) => b + path;

const siteOrigin = (process.env.SITE_URL ?? "https://ui.erikt.me").replace(
  /\/$/,
  "",
);
export const siteUrl = siteOrigin + b;

type TocItem = { id: string; label: string };

type LayoutProps = {
  title: string;
  path: string;
  description?: string;
  toc?: TocItem[];
  wide?: boolean;
  content: HtmlEscapedString | Promise<HtmlEscapedString>;
};

const slug = (p: string) => "/" + p.split("/").pop();

export const sections: { label: string; path: string; description: string }[] =
  [
    {
      label: "Introduction",
      path: "/getting-started/introduction",
      description: "What @erikt/ui is, how to install it, and when to use it.",
    },
    {
      label: "Customization",
      path: "/getting-started/customization",
      description: "Override design tokens to match your brand.",
    },
    {
      label: "Themes",
      path: "/getting-started/themes",
      description: "Control light and dark mode with color-scheme.",
    },
    {
      label: "Icons",
      path: "/getting-started/icons",
      description: "Use Tabler icons as inline SVGs.",
    },
    {
      label: "Easings",
      path: "/getting-started/easings",
      description: "Curated easing curves for CSS transitions.",
    },
    {
      label: "Skills",
      path: "/getting-started/skills",
      description:
        "Reference guide for AI-assisted development with @erikt/ui.",
    },
  ];

export const blocks: { label: string; path: string; description: string }[] = [
  {
    label: "Richtext Editor",
    path: "/blocks/richtext-editor",
    description:
      "A full-featured text editor with formatting toolbar and keyboard shortcuts.",
  },
  {
    label: "Signup Form",
    path: "/blocks/signup-form",
    description:
      "A clean authentication form with email, password, and validation states.",
  },
  {
    label: "Sidebar",
    path: "/blocks/sidebar",
    description:
      "An app navigation sidebar with grouped links, expandable sections, and a user menu.",
  },
  {
    label: "Complex Menu",
    path: "/blocks/complex-menu",
    description:
      "A multi-section dropdown with keyboard shortcuts, checkable items, and nested submenus.",
  },
  {
    label: "Admin Dashboard",
    path: "/blocks/admin-dashboard",
    description:
      "A task management dashboard with sidebar navigation, filterable data table, and row actions.",
  },
];

export const components: {
  label: string;
  path: string;
  description: string;
  badge?: string;
  badgeClass?: string;
}[] = [
  {
    label: "Accordion",
    path: "/components/accordion",
    description: "Collapsible sections for progressive disclosure.",
  },
  {
    label: "Alert",
    path: "/components/alert",
    description: "Contextual message for status, updates, or errors.",
  },
  {
    label: "Avatar",
    path: "/components/avatar",
    description: "User picture, initials, or icon with status indicator.",
    badge: "0.0.13",
    badgeClass: "constructive",
  },
  {
    label: "Badge",
    path: "/components/badge",
    description: "Small labels for status, counts, or categories.",
  },
  {
    label: "Breadcrumbs",
    path: "/components/breadcrumbs",
    description: "Shows the current page's position in a hierarchy.",
  },
  {
    label: "Button",
    path: "/components/button",
    description: "Clickable actions with multiple style variants.",
  },
  {
    label: "Button Group",
    path: "/components/button-group",
    description: "Join related buttons into a single connected unit.",
  },
  {
    label: "Card",
    path: "/components/card",
    description: "Contained surface for grouping related content.",
  },
  {
    label: "Checkbox",
    path: "/components/checkbox",
    description: "Toggle boolean form values.",
  },
  {
    label: "Code",
    path: "/components/code",
    description: "Inline and block code formatting.",
  },
  {
    label: "Color Input",
    path: "/components/color-input",
    description: "Native color picker with hex value display.",
  },
  {
    label: "Color Swatch",
    path: "/components/color-swatch",
    description: "Selectable or decorative circular color indicator.",
    badge: "0.0.13",
    badgeClass: "constructive",
  },
  {
    label: "Combobox",
    path: "/components/combobox",
    description: "Searchable dropdown with autocomplete suggestions.",
    badge: "WIP",
  },
  {
    label: "Datalist",
    path: "/components/datalist",
    description: "Text input with browser-native autocomplete.",
  },
  {
    label: "Date Input",
    path: "/components/date-input",
    description: "Styled date, time, and datetime-local inputs.",
  },
  {
    label: "Dialog",
    path: "/components/dialog",
    description: "Modal overlay for focused tasks or confirmations.",
  },
  {
    label: "Drawer",
    path: "/components/drawer",
    description: "Dialog variant that slides in from the edge of the screen.",
    badge: "0.0.13",
    badgeClass: "constructive",
  },
  {
    label: "Dropdown",
    path: "/components/dropdown",
    description: "Button-triggered popover for actions or options.",
  },
  {
    label: "Empty State",
    path: "/components/empty",
    description: "Placeholder for empty lists or zero-data views.",
  },
  {
    label: "Expander",
    path: "/components/expander",
    description: "Reveal additional content inline.",
  },
  {
    label: "Field",
    path: "/components/field",
    description: "Labeled input with hint text and validation states.",
  },
  {
    label: "File Drop",
    path: "/components/file-drop",
    description: "Drag-and-drop file upload zone.",
  },
  {
    label: "Focus Group",
    path: "/components/focus-group",
    description: "Arrow-key navigation for custom widget groups.",
  },
  {
    label: "Input OTP",
    path: "/components/input-otp",
    description: "One-time passcode input styled as separate boxes.",
    badge: "WIP",
  },
  {
    label: "Kbd",
    path: "/components/kbd",
    description: "Keyboard shortcut key labels.",
  },
  {
    label: "Loading",
    path: "/components/loading",
    description: "Animated spinner for async operations.",
  },
  {
    label: "Marquee",
    path: "/components/marquee",
    description: "Infinitely scrolling row of content.",
    badge: "0.0.13",
    badgeClass: "constructive",
  },
  {
    label: "Menu",
    path: "/components/menu",
    description: "Vertical list of actions with icons and shortcuts.",
  },
  {
    label: "Number Field",
    path: "/components/number-field",
    description: "Native number input with unit suffix support.",
  },
  {
    label: "Pagination",
    path: "/components/pagination",
    description: "Page navigation with numbered controls.",
    badge: "0.0.13",
    badgeClass: "constructive",
  },
  {
    label: "Popover",
    path: "/components/popover",
    description: "Floating panel anchored to a trigger element.",
  },
  {
    label: "Progress",
    path: "/components/progress",
    description: "Linear indicator for task or upload progress.",
  },
  {
    label: "Prose",
    path: "/components/prose",
    description: "Typography styles for long-form content.",
  },
  {
    label: "Radio",
    path: "/components/radio",
    description: "Select one value from a set of options.",
  },
  {
    label: "Radio Group",
    path: "/components/radio-group",
    description: "Styled radio buttons with group semantics.",
  },
  {
    label: "Select",
    path: "/components/select",
    description: "Native select element with custom styling.",
  },
  {
    label: "Separator",
    path: "/components/separator",
    description: "Horizontal rule to divide content sections.",
  },
  {
    label: "Skeleton",
    path: "/components/skeleton",
    description: "Shimmering placeholder for loading content.",
    badge: "0.0.13",
    badgeClass: "constructive",
  },
  {
    label: "Slider",
    path: "/components/slider",
    description: "Range input for selecting a numeric value.",
  },
  {
    label: "Submenu",
    path: "/components/submenu",
    description: "Nested popover menus for hierarchical navigation.",
  },
  {
    label: "Switch",
    path: "/components/switch",
    description: "Toggle switch for on/off settings.",
  },
  {
    label: "Table",
    path: "/components/table",
    description: "Structured data in rows and columns.",
  },
  {
    label: "Tabs",
    path: "/components/tabs",
    description: "Panel navigation using accessible tab controls.",
    badge: "0.0.2",
  },
  {
    label: "Tag Group",
    path: "/components/tag-group",
    description: "Selectable tags built from badges and checkboxes or radios.",
    badge: "0.0.13",
    badgeClass: "constructive",
  },
  {
    label: "Text Field",
    path: "/components/text-field",
    description: "Single-line input with prefix and suffix slots.",
  },
  {
    label: "Textarea",
    path: "/components/textarea",
    description: "Multi-line text input.",
  },
  {
    label: "Toast",
    path: "/components/toast",
    description: "Top-layer notification popover with configurable placement.",
  },
  {
    label: "Toggle",
    path: "/components/toggle",
    description: "Pressable button that stays active or inactive.",
  },
  {
    label: "Toggle Group",
    path: "/components/toggle-group",
    description: "Select one or multiple from a group of toggles.",
  },
  {
    label: "Tooltip",
    path: "/components/tooltip",
    description: "Contextual label shown on hover or focus.",
  },
  {
    label: "Tree View",
    path: "/components/tree-view",
    description: "Nested file or folder hierarchy with disclosures.",
    badge: "0.0.13",
    badgeClass: "constructive",
  },
];

const pageDescriptions: Record<string, string> = {
  "/": "The CSS design system that lives in one <link> tag. Drop in a single stylesheet and get a full component library, theming, and dark mode — no build step required.",
  "/blocks":
    "Ready-to-use UI blocks built with @erikt/ui. Copy-paste layouts for authentication, dashboards, navigation, and more.",
  "/typography": "Typography scale and text utility styles in @erikt/ui.",
  ...Object.fromEntries(sections.map((s) => [s.path, s.description])),
  ...Object.fromEntries(components.map((c) => [c.path, c.description])),
  ...Object.fromEntries(blocks.map((bl) => [bl.path, bl.description])),
};

const COVER_IMAGE = `${siteUrl}/cover-min.jpg`;
const FALLBACK_DESC =
  "The CSS design system that lives in one <link> tag. No build step, no class soup — just HTML and one stylesheet.";

function head(title: string, path: string, descriptionOverride?: string) {
  const description =
    descriptionOverride ?? pageDescriptions[path] ?? FALLBACK_DESC;
  const canonicalUrl = `${siteUrl}${path === "/" ? "" : path}`;
  const pageTitle = `${title} – @erikt/ui`;
  const isHome = path === "/";

  const jsonLd = isHome
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            name: "@erikt/ui",
            url: siteUrl,
            description,
            author: { "@type": "Person", name: "Erik Thalén" },
          },
          {
            "@type": "SoftwareApplication",
            name: "@erikt/ui",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            url: siteUrl,
            description,
            license: "https://opensource.org/licenses/MIT",
          },
        ],
      }
    : {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        name: title,
        description,
        url: canonicalUrl,
        isPartOf: { "@type": "WebSite", name: "@erikt/ui", url: siteUrl },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "@erikt/ui",
              item: siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: title,
              item: canonicalUrl,
            },
          ],
        },
      };

  return html`
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageTitle}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="Erik Thalén" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonicalUrl}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="@erikt/ui" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${COVER_IMAGE}" />
    <meta property="og:image:width" content="1456" />
    <meta property="og:image:height" content="816" />
    <meta property="og:image:alt" content="@erikt/ui component library demo" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${COVER_IMAGE}" />

    <script type="application/ld+json">
      ${raw(JSON.stringify(jsonLd))}
    </script>

    <link
      rel="icon"
      href="data:image/svg+xml,<svg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='512' height='512' rx='80' fill='%23FFFFFF'/><path d='M260.215 378.287C257.518 378.287 256.169 376.932 256.169 374.22L256.169 332.09C256.169 330.029 256.709 328.403 257.787 327.21L281.74 303.135C283.034 301.942 283.682 300.207 283.682 297.93L283.682 138.354C283.682 135.643 285.031 134.287 287.728 134.287L347.123 134.287C349.82 134.287 351.169 135.643 351.169 138.354L351.169 336.97C351.169 337.946 351.061 338.868 350.845 339.735C350.63 340.494 350.09 341.308 349.227 342.175L315.726 375.847C314.108 377.474 312.489 378.287 310.871 378.287L260.215 378.287Z' fill='black'/><path d='M252.08 134.287C254.806 134.287 256.169 135.643 256.169 138.354L256.169 180.485C256.169 182.545 255.624 184.172 254.534 185.364L230.329 209.439C229.021 210.632 228.367 212.367 228.367 214.645L228.367 374.22C228.367 376.932 227.004 378.287 224.278 378.287L164.258 378.287C161.532 378.287 160.169 376.932 160.169 374.22L160.169 175.605C160.169 174.629 160.278 173.707 160.496 172.839C160.714 172.08 161.259 171.267 162.132 170.399L195.985 136.727C197.621 135.1 199.256 134.287 200.891 134.287L252.08 134.287Z' fill='black'/></svg>"
    />
    <link rel="stylesheet" href="${url("/ui.css")}" />
    <link rel="stylesheet" href="${url("/main.css")}" />
    ${import.meta.env.DEV
      ? raw('<script type="module" src="/@vite/client"></script>')
      : ""}
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        var sidebar = document.querySelector(".docs-sidebar");
        if (!sidebar) return;
        var saved = sessionStorage.getItem("sidebar-scroll");
        if (saved) sidebar.scrollTop = parseInt(saved, 10);
        window.addEventListener("pagehide", function () {
          sessionStorage.setItem("sidebar-scroll", sidebar.scrollTop);
        });
      });
    </script>

    <script type="importmap">
      {
        "imports": {
          "alpinejs": "https://esm.sh/alpinejs@3.15.12",
          "@alpinejs/persist": "https://esm.sh/@alpinejs/persist@3.15.12"
        }
      }
    </script>

    <script type="module">
      import Alpine from "alpinejs";
      import persist from "@alpinejs/persist";

      Alpine.plugin(persist);
    </script>

    ${copyCode()}
  `;
}

async function fetchStars(): Promise<number | null> {
  try {
    const res = await fetch("https://api.github.com/repos/erikthq/ui");
    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

async function header(path: string) {
  const stars = await fetchStars();

  return html`
    <header>
      <a
        href="${url("/")}"
        class="docs-logo"
        aria-label="@erikt/ui docs homepage"
      >
        <svg
          height="24"
          viewBox="0 0 401 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M208.831 511.996C203.142 511.996 200.298 509.152 200.298 503.463L200.298 415.058C200.298 410.735 201.436 407.322 203.711 404.819L254.228 354.302C256.959 351.798 258.324 348.158 258.324 343.379L258.324 8.53331C258.324 2.84446 261.169 4.03482e-05 266.857 4.08455e-05L392.126 5.17969e-05C397.815 5.22942e-05 400.659 2.84447 400.659 8.53332L400.659 425.298C400.659 427.346 400.432 429.281 399.976 431.101C399.521 432.694 398.384 434.401 396.563 436.221L325.908 506.877C322.494 510.29 319.081 511.996 315.668 511.996L208.831 511.996Z"
            fill="var(--ui-neutral-1000)"
          />
          <path
            d="M191.828 0.00359467C197.517 0.00359516 200.361 2.84805 200.361 8.5369L200.361 96.9416C200.361 101.265 199.224 104.678 196.948 107.182L146.431 157.698C143.7 160.202 142.335 163.842 142.335 168.621L142.335 503.467C142.335 509.156 139.491 512 133.802 512L8.53331 512C2.84447 512 4.87818e-05 509.156 4.92792e-05 503.467L8.57139e-05 86.7017C8.5893e-05 84.6537 0.227637 82.7195 0.682739 80.899C1.13784 79.3062 2.27561 77.5995 4.09605 75.779L74.7516 5.12354C78.1649 1.71023 81.5782 0.00358503 84.9915 0.00358533L191.828 0.00359467Z"
            fill="var(--ui-neutral-1000)"
          />
        </svg>
      </a>

      <nav>
        <label
          class="toggle square docs-burger"
          aria-label="Toggle navigation"
          data-tooltip="right"
        >
          <input type="checkbox" id="sidebar-toggle" class="sidebar-toggle" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </label>

        <a
          href="${url("/getting-started/introduction")}"
          class="button ghost"
          ${sections.some((s) => slug(s.path) === slug(path))
            ? html`aria-current="page"`
            : ""}
        >
          ${raw(icon("book"))} Getting started
        </a>
        <a
          href="${url("/components/button")}"
          class="button ghost"
          ${path.startsWith("/components/") ? html`aria-current="page"` : ""}
        >
          ${raw(icon("components"))} Components
        </a>
        <a
          href="${url("/blocks")}"
          class="button ghost"
          ${path === "/blocks" || path.startsWith("/blocks/")
            ? 'aria-current="page"'
            : ""}
        >
          ${raw(icon("layout"))} Blocks
        </a>
        <button
          class="ghost"
          onclick="document.getElementById('icons-dialog').showModal()"
        >
          ${raw(icon("icons"))} Icons
        </button>
      </nav>

      <div style="display: flex; gap: 1rem; margin-left: auto;">
        <button
          class="search-field outlined"
          style="min-width: 150px"
          onclick="document.getElementById('search-dialog').showModal()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          Search

          <kbd>⌘F</kbd>
        </button>

        ${SchemePicker()} ${ThemePicker()}

        <a
          id="github-link"
          href="https://github.com/erikthq/ui"
          target="_blank"
          rel="noopener"
          class="button ghost ${stars === null ? "square" : ""}"
          aria-label="GitHub"
          data-tooltip="bottom"
        >
          ${raw(icon("brand-github"))}
          <small id="github-stars" ${stars === null ? " hidden" : ""}>
            ${stars ?? ""}
          </small>
        </a>
      </div>

      <!-- <script>
        fetch("https://api.github.com/repos/erikthq/ui")
          .then(r => r.json())
          .then(({ stargazers_count: n }) => {
            if (!n) return;
            const link = document.getElementById("github-link");
            const small = document.getElementById("github-stars");
            small.textContent = n;
            small.removeAttribute("hidden");
            link.classList.remove("square");
          })
          .catch(() => {});
      </script> -->
    </header>
  `;
}

export function HomeLayout({
  title,
  path,
  description,
  content,
}: Omit<LayoutProps, "toc">) {
  return html`<!doctype html>
    <html lang="en">
      <head>
        ${head(title, path, description)}
      </head>
      <body>
        ${header(path)}
        <main class="home-content">${content}</main>
        ${raw(IconsSearchDialog())} ${raw(SearchDialog())}
      </body>

      <script type="module">
        import Alpine from "alpinejs";

        Alpine.start();
      </script>
    </html>`;
}

export function Layout({
  title,
  path,
  description,
  toc,
  wide,
  content,
}: LayoutProps) {
  return html`<!doctype html>
    <html lang="en">
      <head>
        ${head(title, path, description)}
      </head>

      <body>
        ${header(path)}

        <div class="docs-layout${wide ? " docs-layout-wide" : ""}">
          <aside class="docs-sidebar">${SidebarNav(path)}</aside>

          <main class="docs-content">${content}</main>

          ${TableOfContents(toc)}
        </div>
        ${raw(IconsSearchDialog())} ${raw(SearchDialog())}
      </body>

      <script type="module">
        import Alpine from "alpinejs";

        Alpine.start();
      </script>
    </html>`;
}
