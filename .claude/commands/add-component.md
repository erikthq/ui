# Add a erikt/ui component

Add a new component to erikt/ui. The argument is the component name, e.g. `/add-component tooltip`.

## Steps

Given the component name `$ARGUMENTS`:

1. **Create the CSS file** at `packages/core/src/components/<name>.css`
   - Style native HTML elements or use a minimal class name matching the component name
   - Use `var(--ui-*)` color tokens, `var(--ui-spacing-*)` for spacing, `var(--ease-*)` for transitions
   - No hardcoded hex colors, no JavaScript, no em dashes in comments
   - Use all the most modern CSS features, browser support is not to important.

2. **Import it** in `packages/core/src/main.css`

3. **Create the docs page** at `packages/docs/src/pages/<name>.ts`
   - Export an async function `<Name>Page(path: string)`
   - Use `Layout` from `../layout`, `html`/`raw` from `hono/html`, `highlight` from `../highlight`
   - Include a `toc` array and at minimum a Default example
   - Each example uses `.example > .preview` + `.example > .code-block` with `highlight()`

4. **Register the route** in `packages/docs/src/index.ts`
   - `import { <Name>Page } from './pages/<name>'`
   - `app.get('/components/<name>', (c) => c.html(<Name>Page(c.req.path)))`

5. **Add to the generate script** in `packages/docs/scripts/generate.mjs`
   - Add `"/components/<name>"` to the `routes` array

6. **Add to the sidebar** in `packages/docs/src/layout.ts`
   - Add `{ label: '<Label>', path: '/components/<name>' }` to the `components` array, in alphabetical order

When done, confirm what was created and remind the user to run `pnpm dev` to preview.
