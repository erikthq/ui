import { html } from "hono/html";

const targets = [
  { label: "Retirement", goal: "$420,000", saved: "$273,000", percent: 65 },
  { label: "Real estate", goal: "$85,000", saved: "$27,200", percent: 32 },
];

export function SavingsTargets() {
  return html`
    <style>
      .showcase-savings-targets {
        article {
          div {
            justify-content: space-between;
            align-items: flex-end;
          }
        }
      }
    </style>

    <article class="secondary showcase-savings-targets grid gap-4">
      <hgroup>
        <h3>Savings targets</h3>
        <p>
          Active milestones for 2026 across your portfolio. Monitor how close
          you are to each savings goal.
        </p>
      </hgroup>

      ${targets.map(
        (target) => html`
          <article class="tertiary grid gap-3">
            <small>${target.label}</small>

            <strong class="text-3xl">${target.goal}</strong>

            <progress
              value="${target.percent}"
              max="100"
              aria-label="${target.label} progress"
            ></progress>

            <div class="flex">
              <small>${target.percent}% achieved</small>
              <p>${target.saved}</p>
            </div>
          </article>
        `,
      )}
    </article>
  `;
}
