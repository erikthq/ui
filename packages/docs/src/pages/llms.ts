import { sections, components } from '../layout'

const base = 'https://ui.erikt.me'

export function LlmsPage() {
  const lines = [
    `# @erikt/ui`,
    ``,
    `A minimal CSS design system. A single stylesheet, no build step, no JavaScript, no class names required. Drop in the stylesheet and use semantic HTML.`,
    ``,
    `Documentation: ${base}/getting-started/introduction`,
    ``,
    `## Sections`,
    ``,
    ...sections.map(s => `- [${s.label}](${base}${s.path}): ${s.description}`),
    ``,
    `## Components`,
    ``,
    ...components.map(c => `- [${c.label}](${base}${c.path})${c.badge ? ` (${c.badge})` : ''}`),
  ]

  return lines.join('\n')
}
