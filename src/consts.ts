// Central site configuration and navigation.
export const SITE_TITLE = 'Open Knowledge Format Academy';
export const SITE_TAGLINE =
  'Open Knowledge Format resources, examples, templates, and tutorials.';
export const SITE_DESCRIPTION =
  'An independent learning resource for Google’s Open Knowledge Format (OKF): plain-English guides, copy-paste examples, a starter template, and comparisons.';
export const SITE_ORIGIN = 'https://openknowledgeformat.academy';
export const SITE_NAME_SHORT = 'OKF Academy';

// Primary navigation. Order matters: pillar first.
export const NAV: { href: string; label: string }[] = [
  { href: '/what-is-open-knowledge-format/', label: 'What is OKF' },
  { href: '/open-knowledge-format-examples/', label: 'Examples' },
  { href: '/okf-starter-template/', label: 'Starter Template' },
  { href: '/okf-vs-llms-txt/', label: 'OKF vs llms.txt' },
  { href: '/okf-vs-rag/', label: 'OKF vs RAG' },
  { href: '/glossary/', label: 'Glossary' },
  { href: '/resources/', label: 'Resources' },
  { href: '/about/', label: 'About' },
];

// Human-readable labels for breadcrumb generation, keyed by slug segment.
export const CRUMB_LABELS: Record<string, string> = {
  'what-is-open-knowledge-format': 'What is OKF',
  'open-knowledge-format-examples': 'Examples',
  'okf-starter-template': 'Starter Template',
  'okf-vs-llms-txt': 'OKF vs llms.txt',
  'okf-vs-rag': 'OKF vs RAG',
  glossary: 'Glossary',
  resources: 'Resources',
  about: 'About',
};

export const OFFICIAL = {
  blog: 'https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing',
  repo: 'https://github.com/GoogleCloudPlatform/knowledge-catalog',
  spec: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md',
};
