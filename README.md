# Open Knowledge Format Academy

Independent educational site for Google's **Open Knowledge Format (OKF)** — the open spec (v0.1, published by Google Cloud 12 June 2026) for packaging agent-readable knowledge as markdown + YAML frontmatter. Not affiliated with Google.

Live domain: `openknowledgeformat.academy`

## Stack
Astro 5 (static) + Tailwind 4 (`@tailwindcss/vite`) + `@tailwindcss/typography` + `@astrojs/sitemap`.

## Commands
```bash
npm install
npm run dev      # local dev
npm run build    # static build -> dist/
npm run preview  # serve dist/
```

## Structure
- `src/pages/` — 9 routes. Article pages are Markdown (`MarkdownPageLayout`); home + glossary are `.astro`.
- `src/layouts/BaseLayout.astro` — SEO head, OG/Twitter, sitewide Organization + WebSite + auto BreadcrumbList JSON-LD.
- `src/layouts/MarkdownPageLayout.astro` — Article + FAQPage JSON-LD from frontmatter, prose + FAQ render.
- `src/consts.ts` — site config, nav, official links.
- `public/` — robots.txt, llms.txt, favicon.svg, og-default.(svg|png), `okf-starter-bundle.zip` (lead magnet).

## Pages
`/` · `/what-is-open-knowledge-format/` (pillar) · `/open-knowledge-format-examples/` · `/okf-starter-template/` · `/okf-vs-llms-txt/` · `/okf-vs-rag/` · `/glossary/` · `/resources/` · `/about/`

## Conventions
- No em/en dashes in any content (hard rule). Commas/colons/hyphens only.
- All OKF claims grounded in the official spec; no fabricated authority/testimonials.
- Forms point to a placeholder Formspree endpoint — wire a real ESP before launch.

## Deploy
GitHub → Cloudflare Pages. Build `npm run build`, output `dist`, `NODE_VERSION=22`.
