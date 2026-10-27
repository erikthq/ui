# erikt/ui — Agent Guide

A minimal CSS design system. One stylesheet, no build step required for users.

## Repo structure

```
packages/
  core/      — The CSS library (source + build)
  docs/      — Documentation site (Hono SSG + Vite)
  skill/     — Downloadable AI agent skill (SKILL.md), edited by hand
```

`packages/core/dist/ui.css` (+ `.map`) is the built stylesheet. `dist/` is not committed. The readme's size badge reads the published file from jsDelivr. The build also writes one standalone file per component to `dist/components/`, the tokens to `dist/tokens.css`, the reset to `dist/reset.css`, and writes an exact `exports` entry per component to `package.json` (esm.sh does not resolve wildcard exports). The core `build` script then builds the docs and runs `copy-docs.mjs`, which copies the `@erikt/ui-docs` package's exported `dist/` (a devDependency of core) into `dist/docs/`, so it ships on npm. Docs reads the built CSS from `../core/dist` by path and does not depend on `@erikt/ui`, which keeps the two packages from depending on each other. `packages/core/bin/erikt-ui.js` is the package's CLI: `npx @erikt/ui docs` serves `dist/docs` on http://localhost:3456 (override with `PORT`). npm publishes `bin/` and all of `dist/`.

## Dev commands

```bash
pnpm dev        # Run core + docs in parallel (watch mode)
pnpm build      # Build core CSS, then generate static docs
```

From `packages/docs`:

```bash
pnpm dev        # Vite dev server with HMR
pnpm build      # Build + generate all static HTML pages
```

From `packages/core`:

```bash
pnpm build      # Bundle src/main.css → dist/ (minified), build docs, copy them into dist/docs
```

## Core CSS (`packages/core/src/`)

All styles live inside `@layer ui { }`. This is important — it means any unlayered user styles always win without needing `!important`.

Key files:

- `src/main.css` — entry point, imports everything
- `src/colors.css` — color scales derived from seed variables
- `src/easings.css` — `--ease-glide`, `--ease-snap`, `--ease-heavy`
- `src/tokens.css` — spacing, radius and text size tokens
- `src/components/*.css` — one file per component

### Adding a component

1. Create `src/components/my-component.css` (no `@layer` wrapper; `main.css` and the build put it in `@layer ui`). Its first line is a comment with the file name, like `/* my-component */`. The build copies it above that file's rules in each standalone file
2. At the top of the file, `@import` the components it is built on (e.g. `./card.css`). Do not import the token files (`tokens.css`, `colors.css`, `easings.css`); `main.css` imports those, and the build ships them as `dist/tokens.css`. The bundler includes each file once
3. Import it in `src/main.css`
4. Prefer styling native HTML elements or minimal class names (e.g. `.field`, `.switch`, `.badge`)
5. Avoid JavaScript — use CSS-only where possible (`:has()`, `@starting-style`, Popover API, anchor positioning)

### CSS conventions

- Colors: always use `var(--ui-neutral-*)`, `var(--ui-primary)`, etc. Never hardcode hex values
- Spacing: use `var(--ui-spacing-*)` tokens
- Transitions: use `var(--ease-glide)` / `var(--ease-snap)` / `var(--ease-heavy)`
- No em dashes in any text (copy, comments, docs)

## Docs site (`packages/docs/src/`)

Built with Hono (server-side rendering) + Vite. Pages are TypeScript files that return HTML strings using Hono's `html` tagged template literal.

Key files:

- `src/index.ts` — route definitions
- `src/layout.ts` — shared layout, sidebar nav, `components` array
- `src/pages/**/*.ts` — one file per page, in a folder matching its URL (`/components/badge` lives at `src/pages/components/badge.ts`)
- `src/docs.css` — docs-only styles (not part of the library)
- `scripts/generate.mjs` — generates static HTML for all routes

### Adding a docs page

1. Create `src/pages/<section>/my-page.ts` exporting an async function, where `<section>` matches the URL
2. Register the route in `src/index.ts`
3. Add the path to the routes array in `scripts/generate.mjs`
4. If it's a component page, add it to the `components` array in `src/layout.ts`
5. If it's a section page, add it to the sections nav in `src/layout.ts`

### Page structure

```ts
import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [{ id: "example", label: "Example" }];

export async function MyPage(path: string) {
  return Layout({
    title: "My Component",
    path,
    toc,
    content: html`
      <h1>My Component</h1>
      <p>Short description.</p>

      <h2 id="example">Example</h2>
      <div class="example">
        <div class="preview">
          <!-- live preview here -->
        </div>
        <div class="code-block">
          ${raw(await highlight(`<!-- code shown to user -->`))}
        </div>
      </div>
    `,
  });
}
```

### Example patterns

- `<div class="example">` — wraps a preview + code block pair
- `<div class="preview">` — renders the live component
- `<div class="preview preview-padded">` — left-aligned, column layout
- `<div class="code-block">` — syntax-highlighted code (use `highlight()`)
- `<div class="code-block terminal">` — a code block styled as a terminal window, for shell commands (use `highlight(code, 80, "bash")`)
- `highlight(code, lang?)` — Shiki syntax highlighter, defaults to HTML

## Generated files

These files are regenerated automatically on every `pnpm build` — do not edit them by hand:

- **`dist/llms.txt`** — generated from `packages/docs/src/pages/llms.ts`.

`packages/skill/SKILL.md` is not generated. Edit it directly in `packages/skill/`. Keep it in sync with the docs by hand when components change.

## Design principles

- erikt/ui styles native elements directly. No class names needed for basic usage
- UI only, not layout. erikt/ui does not provide grid/flex utilities
- Semantic HTML first. Use the right element for the job
- One file. The entire library ships as a single `main.css`
