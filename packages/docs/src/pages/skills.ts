import { html, raw } from 'hono/html'
import { Layout } from '../layout'
import { highlight } from '../highlight'

export async function SkillsPage(path: string) {
  const pnpmInstall = await highlight(
    "pnpm dlx skills add erikthq/ui/packages/skill",
    80,
    "bash",
  );
  const npmBunInstall = await highlight(
    `npx skills add erikthq/ui/packages/skill
bunx skills add erikthq/ui/packages/skill`,
    80,
    "bash",
  );

  return Layout({
    title: 'Skills',
    path,
    toc: [],
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Skills</h1>
          <p>
            Teach your AI coding agent how to use @erikt/ui with one command.
          </p>
        </hgroup>

        <p>
          @erikt/ui ships a <code>SKILL.md</code> file that gives agents like Claude
          Code, Cursor, and Windsurf a concise reference for every component,
          theming API, and HTML pattern in the library.
        </p>

        <p>Install it into your project using the <code>skills</code> CLI:</p>
      </div>

      <div class="example">
        <div class="code-block">${raw(pnpmInstall)}</div>
      </div>

      <div class="prose">
        <p>Or with npm / bun:</p>
      </div>

      <div class="example">
        <div class="code-block">${raw(npmBunInstall)}</div>
      </div>

      <div class="prose">
        <p>
          Once installed, your agent will know how to reach for the right element
          and pattern when building UI with @erikt/ui. No prompting required.
        </p>

        <p>
          The skill is kept in sync with the library and regenerated on every
          release. You can also read it directly:
          <a href="https://github.com/erikthq/ui/blob/main/packages/skill/SKILL.md" target="_blank" rel="noopener">SKILL.md on GitHub</a>.
        </p>
      </div>
    `,
  })
}
