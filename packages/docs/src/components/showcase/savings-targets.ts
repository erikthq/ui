import { html } from "hono/html";

const targets = [
  { label: "Retirement", goal: "$420,000", saved: "$273,000", percent: 65 },
  { label: "Real estate", goal: "$85,000", saved: "$27,200", percent: 32 },
];

export function SavingsTargets() {
  return html`
    <article class="secondary" style="display:grid;gap:var(--ui-spacing-4)">
      <hgroup>
        <h3>Savings targets</h3>
        <p>
          Active milestones for 2026 across your portfolio. Monitor how close
          you are to each savings goal.
        </p>
      </hgroup>

      ${targets.map(
        (target) => html`
          <article
            class="tertiary"
            style="display:grid;gap:var(--ui-spacing-3)"
          >
            <small>${target.label}</small>

            <strong style="font-size:2em">${target.goal}</strong>

            <progress
              value="${target.percent}"
              max="100"
              aria-label="${target.label} progress"
            ></progress>

            <div
              style="display:flex;justify-content:space-between;align-items:flex-end"
            >
              <small>${target.percent}% achieved</small>
              <p>${target.saved}</p>
            </div>
          </article>
        `,
      )}
    </article>
  `;
}
