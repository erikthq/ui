---
name: erikt-ui
description: Teaches agents how to use the erikt/ui CSS design system, which native HTML elements and minimal class names already come styled (buttons, forms, dialogs, menus, cards, tabs, tooltips, toasts, and more) so no custom CSS or component library is needed. Use this whenever writing, reviewing, or fixing HTML/CSS in a project that depends on erikt/ui or @erikt/ui — signals include a <link>/@import referencing erikt/ui or esm.sh/@erikt/ui, an @erikt/ui entry in package.json, or --ui-* CSS custom properties. Also use whenever asked to add or style any UI component, even if erikt/ui isn't named explicitly.
---

# erikt/ui Design System

erikt/ui is a single CSS file that styles native HTML elements directly. No class names required for most things. Link the stylesheet and write semantic HTML.

Full docs: https://ui.erikt.me. For any component below without an example, or for variants and options beyond what's shown here, fetch https://ui.erikt.me/llms.txt for the exact docs URL of that component before guessing at markup.

## Mindset: minimal markup, minimal CSS

Default to plain HTML using the elements and class names shown in this file. Most UI needs zero custom CSS, so resist adding wrapper `<div>`s, extra classes, or inline styles unless the layout genuinely needs them (e.g. `flex`/`grid` for arrangement, since erikt/ui intentionally has no layout opinions).

When matching a target design (a screenshot, a mockup, "make it look like X"), get close using erikt/ui's existing components and tokens rather than pixel-matching with heavy overrides. A result that's 90% right with plain erikt/ui markup is usually the better outcome over one that's 100% right but held together by dozens of one-off inline styles, since the latter fights the system instead of using it.

If a real style deviation is needed, change it globally instead of per instance: override the seed variables on `:root` (see Theming below) rather than sprinkling inline `style` attributes or one-off classes across individual elements. Unlayered styles always win over erikt/ui without needing `!important`, so a single `:root` override is cheap and keeps the whole UI consistent. Reach for a per-instance override only for something genuinely one-of-a-kind, not as the default way to match a design.

## Setup

```html
<link rel="stylesheet" href="https://esm.sh/erikt/ui" />
```

## Core idea

erikt/ui styles native elements. A `<button>` is already a styled button. An `<input>` is already a styled input. No wrapper divs or base classes needed.

```html
<button>Click me</button>
<input type="text" placeholder="Type here" />
<select><option>Option</option></select>
```

## Layout

erikt/ui does not provide layout utilities. Use CSS `flex` and `grid` directly.

```html
<div style="display:flex;gap:1rem">
  <button>Cancel</button>
  <button>Submit</button>
</div>
```

## Button variants

```html
<button>Primary</button>
<button class="outlined">Outline</button>
<button class="ghost">Ghost</button>
<button class="secondary">Secondary</button>
<button class="destructive">Delete</button>
<button class="square">...</button>
<button class="round">Pill</button>
```

## Button group (joined buttons or input+button)

```html
<fieldset role="group">
  <button class="ghost">Week</button>
  <button class="ghost">Month</button>
  <button class="ghost">Year</button>
</fieldset>

<fieldset role="group">
  <input type="text" placeholder="Search" />
  <button>Go</button>
</fieldset>
```

## Text field with adornments (icons, kbd hints)

```html
<label>
  <svg><!-- icon --></svg>
  <input type="search" placeholder="Search" />
  <kbd>⌘K</kbd>
</label>
```

## Field (label + input + description)

```html
<label class="field">
  <span>Email</span>
  <input type="email" placeholder="you@example.com" />
  <small>We'll never share your email.</small>
</label>
```

Add `required` to the input and a `*` appears on the label automatically.

## Checkbox and radio

```html
<label>
  <input type="checkbox" />
  Enable notifications
</label>

<label>
  <input type="radio" name="size" />
  Large
</label>
```

## Switch

```html
<label>
  <input type="checkbox" class="switch" />
  Dark mode
</label>
```

## Toggle (button-style checkbox/radio)

```html
<label class="toggle">
  <input type="checkbox" />
  Bold
</label>
```

## Select

```html
<select>
  <option>Option A</option>
  <option>Option B</option>
</select>
```

## Slider

```html
<input type="range" min="0" max="100" value="50" />
```

Note: erikt/ui uses a `--pct` CSS custom property for the fill. Set it via JS:
```js
el.style.setProperty('--pct', (el.value - el.min) / (el.max - el.min))
el.addEventListener('input', () =>
  el.style.setProperty('--pct', (el.value - el.min) / (el.max - el.min))
)
```

## Progress

```html
<progress value="65" max="100"></progress>
<progress></progress>
```

## Badge

```html
<span class="badge">Default</span>
<span class="badge secondary">Secondary</span>
<span class="badge destructive">Error</span>
<span class="badge outlined">Outline</span>
```

## Alert

An `<article>` with `role="alert"` or `role="status"`, reusing the card surface. `role="alert"` interrupts a screen reader for urgent messages, `role="status"` is for calmer updates.

```html
<article role="status">Saved successfully.</article>
<article role="alert" class="color2">Something went wrong.</article>
```

## Avatar

```html
<img class="avatar" src="/avatar.jpg" alt="" />
<span class="avatar">JR</span>
```

## Card

```html
<article>Content</article>

<article>
  <header>Title</header>
  <p>Body</p>
  <footer>Actions</footer>
</article>
```

## Breadcrumbs

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Laptop</li>
  </ol>
</nav>
```

## Accordion

```html
<details>
  <summary>Question</summary>
  <p>Answer</p>
</details>
```

## Dialog / modal

```html
<dialog id="my-dialog">
  <article>
    <header>Title</header>
    <p>Content</p>
    <footer>
      <button class="ghost" onclick="document.getElementById('my-dialog').close()">Cancel</button>
      <button>Confirm</button>
    </footer>
  </article>
</dialog>
<button onclick="document.getElementById('my-dialog').showModal()">Open</button>
```

## Popover

The native Popover API, declarative, no JavaScript. `popovertarget` on a trigger opens the element with matching `id`. Menu, Dropdown, Submenu, and Toast below are all built on this.

```html
<button popovertarget="my-popover">Open</button>
<div id="my-popover" popover>Content</div>
```

## Menu

A `<menu>` element is styled as a vertical list of actions. Use it standalone or inside a popover.

```html
<menu>
  <li><button class="ghost">Edit</button></li>
  <li><button class="ghost">Duplicate</button></li>
  <li><hr /></li>
  <li><button class="ghost destructive">Delete</button></li>
</menu>
```

Section labels: a `<li>` whose only child is a text-only `<small>` renders as a muted group header:

```html
<menu>
  <li><small>Actions</small></li>
  <li><button class="ghost">New File</button></li>
  <li><button class="ghost">New Folder</button></li>
</menu>
```

Radio and checkbox inputs inside `<label>`s show a checkmark indicator:

```html
<menu>
  <li><label><input type="radio" name="sort" checked /> Newest</label></li>
  <li><label><input type="radio" name="sort" /> Oldest</label></li>
</menu>
```

## Dropdown (popover menu)

Place a `<menu>` inside any `[popover]` — styles and padding apply automatically:

```html
<button popovertarget="my-menu">Options</button>
<div id="my-menu" popover>
  <menu>
    <li><small>Actions</small></li>
    <li><button class="ghost">Edit</button></li>
    <li><button class="ghost">Duplicate</button></li>
    <li><hr /></li>
    <li><button class="ghost destructive">Delete</button></li>
  </menu>
</div>
```

## Submenu

A `[popover]` that is a sibling of a `<button>` inside a menu `<li>` becomes a submenu. The trigger button gets a chevron automatically:

```html
<div id="parent-menu" popover>
  <menu>
    <li><button class="ghost">Cut</button></li>
    <li>
      <button class="ghost" popovertarget="find-menu">Find</button>
      <div id="find-menu" popover data-placement="right top">
        <menu>
          <li><button class="ghost">Find…</button></li>
          <li><button class="ghost">Find Next</button></li>
        </menu>
      </div>
    </li>
  </menu>
</div>
```

## Toast

A `[popover]` promoted to the top layer, so it always renders above everything else with no `z-index` needed. Put an Alert inside for the message, open it with `popovertarget`.

```html
<button popovertarget="my-toast">Show toast</button>
<div id="my-toast" popover class="toast">
  <article role="status">Saved successfully.</article>
</div>
```

## Tooltip

```html
<button aria-label="Save changes" data-tooltip>Save</button>
<button aria-label="Left side" data-tooltip="left">Info</button>
```

## Table

```html
<table>
  <thead><tr><th>Name</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Alice</td><td>Active</td></tr>
  </tbody>
</table>
```

## Prose (typography)

```html
<div class="prose">
  <h1>Title</h1>
  <p>Body text with correct spacing.</p>
  <ul><li>List item</li></ul>
</div>
```

## Textarea

```html
<textarea placeholder="Write something..."></textarea>
```

## Separator

```html
<hr />
<hr data-label="or" />
```

## Expander (truncated text with show more)

```html
<div class="expander">
  <p>Long text that gets truncated...</p>
  <label>
    <input type="checkbox" />
    Show more
  </label>
</div>
```

Control the number of visible lines with `--lines` (default: 3):
```html
<div class="expander" style="--lines:5">...</div>
```

## File Drop

```html
<div class="file-drop">
  Drop files here or click to browse
  <input type="file" />
</div>
```

## Loading indicator

Add `aria-busy="true"` to any element to show a spinner before it:

```html
<p aria-busy="true">Loading...</p>
<button aria-busy="true">Saving</button>
```

## Radio Group (fieldset with legend)

```html
<fieldset>
  <legend>Notification preference</legend>
  <label><input type="radio" name="notif" /> Email</label>
  <label><input type="radio" name="notif" /> SMS</label>
  <small>Choose how you want to be notified.</small>
</fieldset>
```

Add `required` to an input and a `*` appears on the legend automatically.

## Toggle Group (toolbar-style buttons)

Use `<label class="toggle">` inside `<fieldset role="group">`. Radio for mutually exclusive, checkbox for independent:

```html
<fieldset role="group">
  <label class="toggle square" aria-label="Align left" data-tooltip>
    <input type="radio" name="align" />
    <svg>...</svg>
  </label>
  <label class="toggle square" aria-label="Align center" data-tooltip>
    <input type="radio" name="align" checked />
    <svg>...</svg>
  </label>
  <label class="toggle square" aria-label="Align right" data-tooltip>
    <input type="radio" name="align" />
    <svg>...</svg>
  </label>
</fieldset>
```

## Tabs

A `.tabs` section with a `[role="tablist"]` of `<label>`-wrapped radio inputs. CSS `:has()` shows the matching panel, no JavaScript. Wire each tab to its panel with matching `id`/`aria-controls`/`aria-labelledby`.

```html
<section class="tabs">
  <header role="tablist" aria-label="Account settings">
    <label>
      <input type="radio" name="tab" id="tab-account" checked aria-controls="panel-account" />
      Account
    </label>
    <label>
      <input type="radio" name="tab" id="tab-password" aria-controls="panel-password" />
      Password
    </label>
  </header>

  <div role="tabpanel" id="panel-account" aria-labelledby="tab-account" tabindex="0">
    <p>Manage your account settings.</p>
  </div>
  <div role="tabpanel" id="panel-password" aria-labelledby="tab-password" tabindex="0">
    <p>Change your password.</p>
  </div>
</section>
```

## Code and Kbd

```html
<p>Use <code>flex</code> for layout.</p>
<kbd>⌘K</kbd>
```

Put a `<kbd>` inside a button to show a keyboard shortcut hint:

```html
<button class="ghost">Save <kbd>⌘S</kbd></button>
```

## Color Input

```html
<input type="color" value="#3b82f6" />
```

## Date Input

```html
<input type="date" />
<input type="time" />
<input type="datetime-local" />
```

## Empty State

```html
<div class="empty">
  <svg><!-- icon --></svg>
  <h3>No items yet</h3>
  <p>There's nothing here. Add something to get started.</p>
</div>
```

Add a button to give the user a clear next step:
```html
<div class="empty">
  <svg><!-- icon --></svg>
  <h3>No documents</h3>
  <p>Create your first document to get started.</p>
  <button>New document</button>
</div>
```

## Datalist (autocomplete input)

```html
<input list="fruits" placeholder="Pick a fruit" />
<datalist id="fruits">
  <option value="Apple" />
  <option value="Banana" />
  <option value="Cherry" />
</datalist>
```

## Theming

Override seed variables on `:root` after the stylesheet. All color scales are derived automatically via `color-mix()`:

```css
:root {
  --ui-primary: dodgerblue;               /* or light-dark(blue, lightblue) */
  --ui-neutral: #8b8c93;
  --ui-constructive: #5dbb55;             /* success/positive actions */
  --ui-destructive: #ef5655;             /* danger/error actions */
  --ui-color1: crimson;                  /* accent colors 1-6 */
  --ui-color2: gold;
}
```

## Dark mode

erikt/ui responds to `prefers-color-scheme` automatically (via `color-scheme: light dark`). To force a theme, set `color-scheme` on the root:

```css
:root { color-scheme: dark; }
:root { color-scheme: light; }
```

Or inline:

```html
<html style="color-scheme:dark">...</html>
```

## Spacing tokens

`--ui-spacing-1` through `--ui-spacing-8` (multiples of `--ui-spacing: 0.25em`).

## Easing tokens

- `--ease-glide` — smooth deceleration, good for most transitions
- `--ease-snap` — fast with a slight overshoot, great for toggles
- `--ease-heavy` — dramatic elastic overshoot

## Web components (optional)

Two dependency-free custom elements ship alongside the stylesheet. Opt-in only, nothing else depends on them.

```html
<script type="module" src="https://esm.sh/@erikt/ui/elements"></script>

<relative-time datetime="2026-07-12T09:00:00.000Z"></relative-time>

<copy-to-clipboard value="npm install @erikt/ui">
  <button type="button">Copy</button>
</copy-to-clipboard>
<copy-to-clipboard for="#some-id">
  <button type="button">Copy</button>
</copy-to-clipboard>
```

## Full component list

Every component in the library: Accordion, Alert, Avatar, Badge, Breadcrumbs, Button, Button Group, Card, Carousel (WIP), Checkbox, Code, Color Input, Color Swatch, Combobox (WIP), Datalist, Date Input, Dialog, Drawer, Dropdown, Empty State, Expander, Field, File Drop, Focus Group, Kbd, Loading, Marquee, Menu, Number Field, Pagination, Popover, Progress, Prose, Radio, Radio Group, Select, Separator, Skeleton, Slider, Submenu, Switch, Table, Tabs (0.0.2), Tag Group, Text Field, Textarea, Toast, Toggle, Toggle Group, Tooltip, Tree View. Each has a docs page with full markup, variants, and options — see https://ui.erikt.me/llms.txt for the exact URL of any one not covered by an example above.
