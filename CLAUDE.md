# openknowledgeformat.academy — repo brain

Independent education site for Google's **Open Knowledge Format (OKF)**. Astro 5 + Tailwind 4 static. Goal: rank early for OKF terms + become the citation source for "what is OKF". Part of the .academy + .agency OKF land-grab (agency = commercial sibling, not yet built as of Jun 26).

## State (2026-06-26) — BUILT + PUSHED (github.com/sunnyp81/openknowledgeformat-academy, public, master). NOT deployed yet.
- 9 pages live in build: `/` (home), `/what-is-open-knowledge-format/` (PILLAR), `/open-knowledge-format-examples/`, `/okf-starter-template/` (lead magnet + downloadable zip), `/okf-vs-llms-txt/`, `/okf-vs-rag/`, `/glossary/` (28 terms, DefinedTermSet), `/resources/`, `/about/`.
- `npm run build` green. All pages 200, sitemap/robots/llms.txt/og/zip served. JSON-LD valid (Organization, WebSite, Article, FAQPage, BreadcrumbList, DefinedTermSet). No broken internal links. WCAG AA pass (a11y-auditor: 4 fixes applied). No em/en dashes (verified).
- Content built by 4 parallel subagents, all grounded in the verified spec (NOT model memory): OKF = open spec v0.1, Google Cloud, 12 Jun 2026. Official: github.com/GoogleCloudPlatform/knowledge-catalog (okf/SPEC.md).

## OKF spec facts (for content accuracy)
Bundle = dir tree of UTF-8 .md + YAML frontmatter. Required field: `type` (non-empty, not centrally registered, consumers tolerate unknown). Recommended: title, description, resource (URI), tags, timestamp. Reserved files: `index.md` (listing/progressive disclosure), `log.md` (history). No registry/runtime/SDK/account. Google ref impls: BigQuery enrichment agent, static HTML visualiser, 3 sample bundles (GA4 ecom, Stack Overflow, Bitcoin).

## NEXT (launch steps for Sunny)
1. DONE: pushed to github.com/sunnyp81/openknowledgeformat-academy (public).
2. CF Pages: connect repo, build `npm run build`, output `dist`, NODE_VERSION=22. Needs the `.academy` domain registered + zone in a CF acct.
3. Wire the waitlist + template-notify forms (currently placeholder `formspree.io/f/your-form-id`) to a real ESP.
4. Replace About maintainer placeholder with real bio/name.
5. Post-deploy: submit sitemap to GSC + Bing; index-push the pillar.
6. Off-page = the real ceiling (cite-worthiness): get listed on OKF community/tool lists, GitHub topic, etc.

## Conventions / warnings
- HARD: no em/en dashes anywhere (commas/colons/hyphens). Scan before deploy.
- No fabricated authority/testimonials/clients/adoption numbers. All claims cite primary sources.
- Do NOT frame OKF as an SEO ranking hack — it's a knowledge-packaging format.
- Article pages = Markdown w/ `MarkdownPageLayout`; YAML descriptions containing `: ` MUST be quoted (build-breaking).
- OG PNG generated from `public/og-default.svg` via sharp (`npm i --no-save sharp` then rasterize).
