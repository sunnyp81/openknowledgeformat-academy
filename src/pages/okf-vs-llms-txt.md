---
layout: ../layouts/MarkdownPageLayout.astro
title: "OKF vs llms.txt: Key Differences Explained"
h1: "OKF vs llms.txt: What Each One Actually Does"
description: OKF is a portable knowledge bundle format for AI agents; llms.txt is a single web-root file guiding LLMs around a public site. Compare scope, use, and overlap.
pubDate: 2026-06-26
faq:
  - q: >-
      Is OKF a replacement for llms.txt?
    a: >-
      No. They solve different problems. llms.txt helps an LLM or crawler navigate the key public pages of a website. OKF packages curated, version-controlled knowledge into a portable directory of markdown files that an agent reads directly. One points to web content; the other is the content.
  - q: >-
      Do I need both?
    a: >-
      Often yes. You can publish an llms.txt at your site root so AI tools can find your most important pages, and separately maintain OKF bundles for the structured, authored knowledge your own agents or partners consume. They sit at different layers and do not conflict.
  - q: >-
      Which one lives at my website root?
    a: >-
      llms.txt. By convention it is a single markdown file at /llms.txt. OKF is not tied to a web root at all. An OKF bundle is a directory tree that can live in a git repository, be shared as an archive, or be loaded straight into an agent's context.
  - q: >-
      Is llms.txt an official standard like OKF?
    a: >-
      Neither is a formal standards-body specification. llms.txt is a community proposal that gained traction as a convention. OKF is an open specification (v0.1) published by Google Cloud on 12 June 2026. Both are open in spirit, but OKF has a published spec with required fields and reserved files.
  - q: >-
      Can an OKF bundle and an llms.txt reference each other?
    a: >-
      Yes. An llms.txt can link to documentation authored as an OKF bundle, and an OKF resource field can point to a public URL summarised in an llms.txt. They compose cleanly because both are plain markdown.
---

Two of the most talked-about ideas in "making content legible to AI" are llms.txt and the Open Knowledge Format (OKF). They are frequently mentioned in the same breath, which creates the impression that you must choose one. You do not. They operate at different layers of the stack and, in many setups, the best answer is to use both.

This page explains what each one is, where they overlap, where they genuinely differ, and how to decide which fits your situation.

## What llms.txt is

llms.txt is a proposed convention: a single markdown file placed at the root of a website, at `/llms.txt`. Its job is to give large language models a curated, navigable summary of the site's most important content. Instead of forcing a model to crawl and guess at a sprawling site, the file offers a clean, human-curated map: here are the key pages, here is what they cover, here is where to look for detail.

The scope of llms.txt is a public website. It is discovery-oriented. It exists so that crawl-time and inference-time systems can quickly orient themselves around content that already lives on the web. It is a pointer file, not a content store. The actual information still sits in the pages it links to.

## What OKF is

The Open Knowledge Format is an open specification (v0.1) published by Google Cloud on 12 June 2026. It is a vendor-neutral, agent-friendly and human-friendly standard for packaging the metadata, context, and curated knowledge that AI systems need.

An OKF bundle is a directory tree of UTF-8 markdown files. Each file carries YAML frontmatter delimited by `---`, with a single required field, `type`, plus recommended fields such as `title`, `description`, `resource` (a URI), `tags`, and `timestamp`. Two filenames are reserved: `index.md` and `log.md`. There is no central registry, no runtime, and no required SDK. You read and write bundles with the same tools you already use for markdown and git.

The scope of OKF is curated knowledge, not a website. It formalises the "LLM-wiki" pattern: human-maintained, version-controlled, portable knowledge that both people and agents can parse. A bundle can describe a dataset, an internal process, a product, or any body of authored context. To see this in practice, look at the [OKF bundle examples](/open-knowledge-format-examples/) or start from the [OKF starter template](/okf-starter-template/).

## The core difference in one line

llms.txt tells an AI how to find its way around your public website. OKF is a portable package of the knowledge itself, authored for agents to consume directly. One is a signpost on the public web; the other is a self-contained knowledge artefact you can move anywhere.

## Side-by-side comparison

| Dimension | OKF | llms.txt |
|---|---|---|
| Purpose | Package curated, authored knowledge for agents and humans | Help LLMs navigate a public website's key content |
| Format | Directory of markdown files with YAML frontmatter | A single markdown file |
| Scope / granularity | Many topics, files, and nested context; bundle-level | Whole-site summary; one curated index |
| Location | Anywhere: git repo, archive, loaded into context | Fixed at web root, `/llms.txt` |
| Audience | AI agents and human maintainers | LLMs and crawlers visiting a site |
| Structure | Typed files (`type` required), reserved `index.md` / `log.md` | Headings plus curated link lists |
| Versioning | Designed for version control; `timestamp`, `log.md` | Edit-in-place; no built-in versioning model |
| Multi-file vs single-file | Multi-file by design | Single file by design |
| Maintained by | Knowledge owners, in source control | Site owner, at the domain root |
| Status | Open spec v0.1, published by Google Cloud, 12 Jun 2026 | Community convention, no formal spec body |

## Where they overlap

Both are deliberately plain markdown, both are human-readable, and both reject the idea that you need heavyweight tooling or proprietary formats to make content useful to AI. Both are also curation-first: a human decides what matters and presents it cleanly, rather than dumping raw data and hoping a model sorts it out. That shared philosophy is why people compare them.

They also overlap in intent at the edges. An llms.txt curates and summarises; an OKF `index.md` orients an agent inside a bundle. If you squint, both are "a friendly entry point for a machine reader." The difference is what sits behind that entry point.

## Where they genuinely differ

The substantive difference is content versus pointer, and portable artefact versus fixed location.

llms.txt lives at one URL and describes content that remains on the public web. Remove the website and the llms.txt is meaningless. OKF bundles carry their knowledge with them. You can hand a bundle to a partner, commit it to a private repo, or load it directly into an agent's context window with no web server involved.

llms.txt has no native concept of typed content or versioning. OKF requires a `type` on every file, reserves `log.md` for change history, and recommends `timestamp`, which makes it suited to knowledge that evolves and needs an audit trail. llms.txt is a snapshot map; OKF is a maintained corpus.

Granularity differs too. llms.txt is intentionally one file, a single readable overview. OKF is intentionally many files, a structured tree that supports progressive disclosure: an agent reads the index, then descends only into the branches it needs.

## When to use which

Use llms.txt when your goal is public discoverability. You have a website, you want AI tools and crawlers to understand its shape and find your best pages, and you want a low-effort, standards-adjacent way to guide them. It is the right tool for "help models navigate what I already publish."

Use OKF when your goal is to package knowledge for agents to consume. You are building internal tooling, sharing a curated corpus with partners, or feeding an agent authored context that must be portable, typed, and version-controlled. It is the right tool for "give my agent a clean, maintained body of knowledge."

## Can you use both?

Yes, and for many organisations that is the strongest setup. They are complementary, not competing.

A typical pattern: publish an llms.txt at your domain root so external AI systems can discover and navigate your public pages. Separately, maintain OKF bundles in your repositories for the structured knowledge your own agents, internal tools, or close partners rely on. The llms.txt handles outward-facing discovery; the OKF bundles handle deep, authored, portable context.

They can even reference each other. Because both are plain markdown, an OKF file's `resource` field can point at a public URL that your llms.txt also lists, and your llms.txt can link to documentation that is itself authored as an OKF bundle. There is no format clash to manage.

If you are choosing where to invest first, decide by goal. If you mainly want public AI tools to understand your site, start with llms.txt. If you mainly want to feed agents reliable, maintainable knowledge, start with OKF. Most mature setups end up with both.

For a deeper look at the format itself, read [what the Open Knowledge Format is](/what-is-open-knowledge-format/). To understand how OKF relates to retrieval systems, see [how OKF compares with RAG](/okf-vs-rag/). Official specifications are listed on the [resources page](/resources/).
