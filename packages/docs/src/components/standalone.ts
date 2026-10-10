import { html, raw } from "hono/html";
import { highlight } from "../highlight";
import { icon } from "../icon";
import { components, url } from "../layout";

const cdn = "https://esm.sh/@erikt/ui";
const sourceUrl = (name: string) => `${cdn}/components/${name}.css`;

// The <link> tags for one component's standalone build in core/dist/components.
// The tokens file is shared, so it is loaded once next to any number of components
export function standaloneLink(name: string) {
  return highlight(`<link rel="stylesheet" href="${cdn}/tokens.css" />
<link rel="stylesheet" href="${sourceUrl(name)}" />`);
}

// Previous component, view source and next component, in the sidebar's order.
// Pages without a stylesheet of their own get no source link
export function titleActions(path: string, source?: string) {
  const i = components.findIndex((c) => c.path === path);
  // Pages missing from the sidebar (like Chart) get no previous/next
  const prev = i > 0 ? components[i - 1] : undefined;
  const next = i >= 0 ? components[i + 1] : undefined;

  const step = (
    c: (typeof components)[number] | undefined,
    chevron: string,
  ) => {
    return c
      ? html`<a
          href="${url(c.path)}"
          class="button secondary square"
          aria-label="${c.label}"
          data-tooltip="bottom"
          >${raw(icon(chevron))}</a
        >`
      : "";
  };

  return html`<div class="flex gap-2">
    ${source
      ? html`<a
          href="${sourceUrl(source)}"
          target="_blank"
          rel="noopener"
          class="button square secondary"
          aria-label="View source"
          data-tooltip="bottom"
          >${raw(icon("code"))}</a
        >`
      : ""}
    ${step(prev, "chevron-left")}${step(next, "chevron-right")}
  </div>`;
}
