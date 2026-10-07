import { html } from "hono/html";

const topics = [
  {
    label: "General",
    questions: [
      {
        q: "How secure is my financial data?",
        a: "We use bank-level AES-256 encryption and SOC 2 Type II certified infrastructure, and we never store your credentials. All connections use read-only access tokens.",
      },
      {
        q: "How do I connect my bank or investment accounts?",
        a: "Go to Accounts, select Add account and search for your bank. You sign in with your bank directly, and we never see your password.",
      },
      {
        q: "Can I export my data for tax purposes?",
        a: "Yes. Go to Settings and select Export. You can download your transactions as CSV or PDF for any date range.",
      },
    ],
  },
  {
    label: "Billing",
    questions: [
      {
        q: "When am I charged?",
        a: "You are charged on the same day each month, starting on the day your trial ends.",
      },
      {
        q: "Can I cancel at any time?",
        a: "Yes. Cancel from Settings and you keep access until the end of the billing period.",
      },
    ],
  },
  {
    label: "Goals",
    questions: [
      {
        q: "How many goals can I create?",
        a: "As many as you like. Each goal gets its own progress bar and savings pace.",
      },
      {
        q: "Can I share a goal with my partner?",
        a: "Yes. Open the goal, select Share and send an invite by email.",
      },
    ],
  },
];

export function Faq() {
  return html`
    <style>
      .showcase-faq {
        /* Full width tabs, split evenly */
        [role="tablist"] {
          width: 100%;

          label {
            flex: 1;
            justify-content: center;
          }
        }

        details:last-child {
          border-bottom: none;
        }

        > footer {
          align-items: stretch;
          border-top: 1px solid var(--ui-neutral-200);
        }
      }
    </style>

    <article class="secondary showcase-faq">
      <section class="tabs gap-4">
        <header role="tablist" aria-label="FAQ topics">
          ${topics.map(
            (topic, i) => html`
              <label>
                <input type="radio" name="showcase-faq" ${i === 0 ? "checked" : ""} />
                ${topic.label}
              </label>
            `,
          )}
        </header>

        ${topics.map(
          (topic, t) => html`
            <div role="tabpanel">
              ${topic.questions.map(
                (item, i) => html`
                  <details name="showcase-faq-${t}" ${t === 0 && i === 0 ? "open" : ""}>
                    <summary><strong>${item.q}</strong></summary>
                    <p>${item.a}</p>
                  </details>
                `,
              )}
            </div>
          `,
        )}
      </section>

      <footer class="flex-col">
        <button>Contact support</button>
      </footer>
    </article>
  `;
}
