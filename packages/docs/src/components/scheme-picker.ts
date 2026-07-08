import { html, raw } from "hono/html";
import { icon } from "../icon";

export function SchemePicker() {
  return html`
    <fieldset
      role="group"
      x-data="{ scheme: $persist('system') }"
      x-init="if (scheme !== 'system') document.documentElement.style.colorScheme = scheme; $watch('scheme', () => { if (scheme !== 'system') { document.documentElement.style.colorScheme = scheme } else document.documentElement.style.removeProperty('color-scheme') })"
    >
      <label class="toggle square" aria-label="Light" data-tooltip="bottom">
        <input
          type="radio"
          name="theme"
          value="light"
          :checked="scheme === 'light'"
          @change="scheme = $event.target.value"
        />
        ${raw(icon("sun"))}
      </label>
      <label class="toggle square" aria-label="Dark" data-tooltip="bottom">
        <input
          type="radio"
          name="theme"
          value="dark"
          :checked="scheme === 'dark'"
          @change="scheme = $event.target.value"
        />
        ${raw(icon("moon"))}
      </label>
      <label class="toggle square" aria-label="System" data-tooltip="bottom">
        <input
          type="radio"
          name="theme"
          value="system"
          :checked="scheme === 'system'"
          @change="scheme = 'system'"
        />
        ${raw(icon("device-desktop"))}
      </label>
    </fieldset>
  `;
}
