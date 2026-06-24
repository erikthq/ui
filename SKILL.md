---
name: erikt-ui
description: Teaches agents how to use the erikt/ui design system. Use when writing HTML/CSS for a project that uses erikt/ui, or when asked to add UI components with erikt/ui.
---

# erikt/ui Design System

erikt/ui is a single CSS file that styles native HTML elements directly. No class names required for most things. Link the stylesheet and write semantic HTML.

Docs: https://ui.erikt.me

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

## Card

```html
<article>Content</article>

<article>
  <header>Title</header>
  <p>Body</p>
  <footer>Actions</footer>
</article>
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

## Available components

- `Accordion`
- `Badge`
- `Button`
- `Button Group`
- `Card`
- `Checkbox`
- `Code`
- `Color Input`
- `Combobox` (WIP)
- `Datalist`
- `Date Input`
- `Dialog`
- `Dropdown`
- `Empty State`
- `Expander`
- `Field`
- `File Drop`
- `Focus Group`
- `Kbd`
- `Loading`
- `Menu`
- `Number Field`
- `Popover`
- `Progress`
- `Prose`
- `Radio`
- `Radio Group`
- `Select`
- `Separator`
- `Slider`
- `Submenu`
- `Switch`
- `Table`
- `Tabs` (0.0.2)
- `Text Field`
- `Textarea`
- `Toggle`
- `Toggle Group`
- `Tooltip`
