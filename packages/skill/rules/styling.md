# Styling

## Contents

- Use tokens, not raw values
- Radius uses the rounded scale
- CSS is for layout
- Change things once
- No `!important`
- Don't size icons
- No `z-index` on overlays
- Dark mode
- Component properties
- Token reference

---

## Use tokens, not raw values

**Incorrect:**

```css
.stat {
  color: #16a34a;
  border: 1px solid #e5e7eb;
  padding: 12px;
}
```

**Correct:**

```css
.stat {
  color: var(--ui-constructive-600);
  border: 1px solid var(--ui-neutral-200);
  padding: var(--ui-spacing-3);
}
```

Better still, check if a variant already does it. `<span class="badge constructive">` needs no CSS at all.

---

## Radius uses the rounded scale

Corner rounding has 8 steps, `--ui-rounded-1` to `--ui-rounded-8`, plus `--ui-rounded-full` for pills and circles. Pick the step that matches what the element is.

| Element | Token |
| --- | --- |
| Small inline things, like a tag or code chip | `--ui-rounded-2` |
| Controls, like buttons, inputs and menu items | `--ui-rounded-3` |
| Surfaces, like cards, panels and popovers | `--ui-rounded-5` |
| Pills and circles | `--ui-rounded-full` |

**Incorrect:**

```css
.panel {
  border-radius: 12px;
}
.pill {
  border-radius: 9999px;
}
```

**Correct:**

```css
.panel {
  border-radius: var(--ui-rounded-5);
}
.pill {
  border-radius: var(--ui-rounded-full);
}
```

Don't use `border-radius: 50%` or a large pixel value for circles. Those ignore `--ui-rounded-scale`, so they stay round when the user asks for square corners.

### Nested corners

Two steps next to each other differ by `--ui-spacing-1` at the default scale. To nest a rounded box in another, pad the outer box by the difference between the two steps. The corners then run parallel.

```css
.outer {
  border-radius: var(--ui-rounded-5);
  padding: var(--ui-spacing-3); /* 5 - 2 = 3 */
}
.inner {
  border-radius: var(--ui-rounded-2);
}
```

### Changing the roundness

To make the whole UI rounder or sharper, set `--ui-rounded-scale` on `:root`. Don't override single steps for this.

```css
:root {
  --ui-rounded-scale: 0; /* square corners everywhere */
}
```

| Property | Default | Effect |
| --- | --- | --- |
| `--ui-rounded-scale` | `1` | Multiplies every step and `--ui-rounded-full`. `0` is square, `2` is twice as round |
| `--ui-rounded` | `2px` | The seed that every step starts from |

The library computes the steps on `:root`. Setting `--ui-rounded-scale` or `--ui-rounded` on a smaller element does nothing, unless that element has `data-ui-theme` (see [Scoped themes](#scoped-themes)). Without it, set the steps there:

```css
.sidebar {
  --ui-rounded-3: 0;
  --ui-rounded-5: 0;
}
```

---

## CSS is for layout

erikt/ui has no layout utilities. Write `flex` and `grid` yourself. Leave the look of components alone.

**Incorrect:**

```html
<div style="display: flex; gap: 8px">
  <button style="background: #2563eb; border-radius: 6px; padding: 8px 16px">Save</button>
</div>
```

**Correct:**

```html
<div style="display: flex; gap: var(--ui-spacing-2)">
  <button>Save</button>
</div>
```

Use a class in a stylesheet instead of inline `style` when the same layout appears more than once.

---

## Change things once

To match a brand or a mockup, change the seed variables on `:root`. Every component follows.

**Incorrect:**

```html
<button style="background: purple">Save</button>
<span class="badge" style="background: purple">New</span>
<a style="color: purple">Link</a>
```

**Correct:**

```css
:root {
  --ui-primary: purple;
}
```

To change one component everywhere, write one unlayered rule:

```css
summary:hover {
  text-decoration-color: transparent;
}
```

To change one area, give it `data-ui-theme` and set the seeds there:

```html
<aside data-ui-theme class="sidebar">...</aside>
```

```css
.sidebar {
  --ui-primary: var(--ui-color5);
}
```

### Scoped themes

The color scales (`--ui-primary-50` to `-950`), the rounding steps and the spacing steps are computed on `:root`. A seed set on a smaller element changes only the seed. The scales keep the `:root` values.

`data-ui-theme` makes the element compute its own copy of every token. Seeds set on it then reach every scale inside.

- It follows the page's light or dark mode. Set `color-scheme` on it to force one.
- It resets inherited tokens. Seeds set on `:root` do not reach inside, so set them on the element itself.

---

## No `!important`

All erikt/ui styles live in `@layer ui`. Unlayered CSS always beats a layer, whatever the specificity. If your rule doesn't apply, it is probably inside another `@layer` that comes earlier. Move it out of the layer.

---

## Don't size icons

SVGs are `1lh` wide and high, so they match the line of text they sit in. They use `currentColor`. The docs use [Tabler icons](https://tabler.io/icons) as inline SVG.

**Incorrect:**

```html
<button><svg width="16" height="16" style="margin-right: 6px; color: white">...</svg> Save</button>
```

**Correct:**

```html
<button><svg><!-- icon --></svg> Save</button>
```

To make an icon bigger, change the `font-size` of its container.

---

## No `z-index` on overlays

`<dialog>`, `[popover]`, toasts and drawers render in the top layer. They are always above the page. Adding `z-index` does nothing and hides the real problem if something looks wrong.

---

## Dark mode

The library sets `color-scheme: light dark`. All tokens use `light-dark()`, so they switch with the system theme.

**Incorrect:**

```css
@media (prefers-color-scheme: dark) {
  .card { background: #111; color: #eee; }
}
```

**Correct:** use tokens and do nothing else. To force a theme:

```css
:root {
  color-scheme: dark; /* or light */
}
```

For a custom seed that needs two values, use `light-dark()`:

```css
:root {
  --ui-primary: light-dark(royalblue, lightskyblue);
}
```

---

## Component properties

Some components read their own variables. Set them on the element, not on `:root`.

| Component | Property |
| --- | --- |
| Table | `--cols` (grid columns, for example `2fr 1fr 80px`) |
| Description list | `--ui-description-list-label` (label column width) |
| Timeline | `--ui-timeline-gap`, `--ui-timeline-color`, `--ui-timeline-dot` |
| Carousel | `--visible` (slides shown at once) |
| Marquee | `--marquee-duration` |
| Expander | `--lines` (lines shown when closed) |
| Color swatch | `--swatch-color` |
| Input OTP | `--otp-length` (set from `maxlength` on its own) |
| Prose | `--ui-typography-spacing` |

---

## Token reference

| Token | Values |
| --- | --- |
| Neutral scale | `--ui-neutral-0`, `-50`, `-100` to `-900`, `-950`, `-1000` |
| Color scales | `--ui-primary-*`, `--ui-constructive-*`, `--ui-destructive-*`, `--ui-color1-*` to `--ui-color6-*`, each `50` to `950` |
| Seeds | `--ui-primary`, `--ui-neutral`, `--ui-constructive`, `--ui-destructive`, `--ui-color1` to `--ui-color6` |
| Spacing | `--ui-spacing` (base, `0.25em`), `--ui-spacing-1` to `--ui-spacing-8` |
| Radius | `--ui-rounded-scale` (multiplier, `1`), `--ui-rounded` (seed, `2px`), `--ui-rounded-1` to `--ui-rounded-8`, `--ui-rounded-full` (pills and circles). Controls use `-3`, cards and dialogs `-5` |
| Surface | `--ui-background-color`, `--ui-text-color` |
| Easing | `--ease-glide`, `--ease-snap`, `--ease-heavy` |

Use `--ui-neutral-500` for muted text and `--ui-neutral-200` or `-300` for borders.
