import { components } from '../layout'

const base = 'https://ui.erikt.me'

export function LlmsPage() {
  const sections = [
    { label: 'Introduction', path: '/introduction', description: 'Getting started, usage, and philosophy' },
    { label: 'Themes', path: '/themes', description: 'Color scales, theming with CSS custom properties, dark mode' },
    { label: 'Easings', path: '/easings', description: 'Custom easing curves: --ease-glide, --ease-snap, --ease-heavy' },
    { label: 'Icons', path: '/icons', description: 'Icon usage with @erikt/ui' },
    { label: 'Customization', path: '/customization', description: 'How to customize @erikt/ui beyond the default theme' },
    { label: 'Prose', path: '/components/prose', description: 'Typography and prose styling' },
  ]

  const lines = [
    `# @erikt/ui`,
    ``,
    `A minimal CSS design system. A single stylesheet, no build step, no JavaScript, no class names required. Drop in the stylesheet and use semantic HTML.`,
    ``,
    `Documentation: ${base}/introduction`,
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
