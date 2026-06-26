---
layout: ../layouts/MarkdownPageLayout.astro
title: What Is the Open Knowledge Format (OKF)?
h1: What Is the Open Knowledge Format (OKF)?
description: A plain-English guide to OKF, Google’s open, vendor-neutral format for packaging AI-ready knowledge as markdown files with YAML frontmatter (spec v0.1).
pubDate: 2026-06-26
faq:
  - q: >-
      Is the Open Knowledge Format made by Google?
    a: >-
      Yes. OKF is an open specification published by Google Cloud on 12 June 2026 at version 0.1. This site is an independent resource and is not affiliated with or endorsed by Google.
  - q: >-
      Do I need special software to read or write OKF?
    a: >-
      No. An OKF bundle is just a folder of UTF-8 markdown files with YAML frontmatter. If you can open a text file, you can read OKF; if you can clone a Git repository, you can ship it. There is no required SDK, runtime, or account.
  - q: >-
      What is the only mandatory field in an OKF document?
    a: >-
      The type field. Every concept document must carry a non-empty type string in its frontmatter. All other fields are optional but recommended.
  - q: >-
      Is OKF an SEO ranking trick?
    a: >-
      No. OKF is a format for packaging curated knowledge so AI agents and people can consume it reliably. It is not a search ranking hack and does not promise higher rankings.
  - q: >-
      Is OKF a replacement for RAG or vector databases?
    a: >-
      Not exactly. OKF is a portable way to author and store curated knowledge. It can feed a retrieval system, but it is a content and packaging standard rather than a retrieval engine.
  - q: >-
      What does v0.1 status mean for adopting it now?
    a: >-
      Version 0.1 signals an early, deliberately minimal specification. The core ideas (markdown, frontmatter, a required type) are stable and human-readable, so bundles you write today remain readable regardless of how the spec evolves.
---

> This is an independent educational resource. It is not affiliated with, sponsored by, or endorsed by Google. "Open Knowledge Format" and "Google Cloud" are referenced for descriptive purposes only.

The Open Knowledge Format (OKF) is an open specification, published by Google Cloud on 12 June 2026 at version 0.1, for representing the metadata, context, and curated knowledge that AI systems need in order to work reliably. In plain terms: it is a simple, agreed way to write down what an agent should know about a thing, and to package that knowledge so it travels cleanly across tools, organisations, and time.

This page is the cornerstone explainer. It covers what OKF is, the problem it solves, the exact file format, the required and recommended fields, the reserved files, the design principles, how OKF relates to ideas like RAG and llms.txt, the reference implementations Google shipped alongside it, and how to start. For definitions of individual terms, see the [OKF glossary](/glossary/).

## Why Google introduced OKF

Modern AI agents are only as good as the context they are given. A large language model can reason fluently, but it does not inherently know your company's data tables, your internal metrics, the meaning of a particular column, or the curated playbook your team follows. Teams have increasingly solved this by writing what is often called an "LLM-wiki": a collection of human-written notes, descriptions, and context that an agent reads to ground its answers.

The problem is that every team built this pattern differently. One group keeps context in a Notion workspace, another in a proprietary vector store, another in bespoke JSON that only their own SDK understands. The knowledge is valuable, but it is locked to a tool. It cannot be diffed in version control, handed to a different agent, or audited by a human without specialist software.

OKF formalises the LLM-wiki pattern into a portable, interoperable format. Instead of inventing a private structure, you write your curated knowledge as plain markdown files with a small, predictable block of metadata at the top of each one. The result is knowledge that a person can read in a text editor and an agent can parse without a custom integration.

## What an OKF bundle actually is

An OKF bundle is a directory tree of UTF-8 markdown files. Each file begins with a YAML frontmatter block, delimited by triple-dash lines (`---`), followed by free-form markdown content.

That is the whole idea. There is no database, no binary container, no proprietary index. A bundle is a folder you can put in a Git repository, zip up, or copy to another machine.

```text
my-okf-bundle/
  index.md
  log.md
  customers/
    index.md
    orders-table.md
    churn-metric.md
  playbooks/
    refund-runbook.md
```

Each `.md` file (other than the reserved ones described below) is a **concept document**: a single, self-contained unit of knowledge.

## The format in detail: frontmatter and the type field

Every concept document opens with YAML frontmatter. The single **required** field is `type`: a non-empty short string that identifies the kind of concept the document describes.

Crucially, `type` values are not registered with any central authority. You choose strings that make sense for your domain. Because of this freedom, the specification is explicit that consumers (the agents and tools reading a bundle) must tolerate unknown types gracefully. An agent that has never seen `type: churn-metric` should still ingest the document rather than fail.

Alongside the required `type`, the specification recommends a small set of **optional** fields:

| Field | Purpose | Example |
|---|---|---|
| `type` (required) | Short string naming the kind of concept | `table`, `metric`, `runbook` |
| `title` | Human-readable name of the concept | `Orders table` |
| `description` | One or two lines summarising the concept | `Line-item orders for the storefront.` |
| `resource` | A URI identifying the underlying asset | `bigquery://project.dataset.orders` |
| `tags` | A YAML list of labels for grouping and search | `[ecommerce, finance]` |
| `timestamp` | ISO 8601 datetime for when the concept was captured or updated | `2026-06-12T09:30:00Z` |

Here is a complete, valid OKF concept document with annotated frontmatter:

```markdown
---
type: table
title: Orders
description: One row per order line item for the online storefront.
resource: bigquery://acme-shop.sales.orders
tags:
  - ecommerce
  - finance
  - core
timestamp: 2026-06-12T09:30:00Z
---

# Orders

The `orders` table records a single row for every line item placed
through the storefront. It is the source of truth for revenue and
fulfilment reporting.

## Key columns

- `order_id` - unique identifier for the order
- `customer_id` - foreign key into the `customers` concept
- `line_total` - net amount for the line item, in GBP minor units
- `created_at` - timestamp the order was placed

## Notes for agents

Revenue figures should always exclude rows where `status = 'cancelled'`.
For lifetime value, join to the `customers` concept on `customer_id`.
```

Notice what is happening. A human can read this and understand the table immediately. An agent can parse the frontmatter to learn the `type`, locate the underlying `resource`, and then read the markdown body to learn the domain rules ("exclude cancelled rows") that would never be visible in a raw schema. That curated, human-authored context is the point of OKF.

## Reserved files: index.md and log.md

Two filenames are reserved and carry special meaning anywhere they appear in the tree:

- **`index.md`** provides a directory listing and supports **progressive disclosure**. Rather than forcing an agent to read every file in a large bundle at once, an `index.md` lets it see what is available in a directory and drill in only where relevant. This keeps the amount of knowledge loaded into a model's context window manageable.
- **`log.md`** records the update history of a bundle or directory: what changed, and when. Because bundles live in version control, `log.md` complements Git history with a human-curated, narrative record.

Every other `.md` file is treated as a concept document. The reserved files must follow their expected structures, while concept documents are free-form below the frontmatter.

## What counts as a "concept"

A concept can be almost anything you want to capture and make available to an agent: a database table, a dataset, a metric or KPI definition, a playbook, an operational runbook, or an API. The format does not constrain the subject matter. It only asks that you give each concept its own markdown file, label it with a `type`, and write the context a reader (human or machine) would need.

This is why OKF is often described as a packaging standard rather than a schema. It does not tell you what your knowledge must contain. It tells you how to write it down so that it stays portable.

## Design principles

The specification is built around a handful of deliberately strict principles:

1. **Readable by humans without tooling.** If you can `cat` a file, you can read OKF. No viewer required.
2. **Parseable by agents without bespoke SDKs.** YAML frontmatter plus markdown is parseable everywhere, so no proprietary client is needed.
3. **Diffable in version control.** Plain text means meaningful diffs and reviewable pull requests.
4. **Portable across tools, organisations, and time.** No schema registry, no central authority, no required SDK or runtime, no proprietary account.

The shorthand that captures the whole philosophy: *if you can cat a file, you can read OKF; if you can git clone a repo, you can ship it.*

## How OKF differs from RAG, vector databases, and llms.txt

OKF is frequently mentioned in the same breath as a few adjacent ideas. A short orientation here, with dedicated pages for depth:

- **RAG (retrieval-augmented generation)** is a runtime technique: fetch relevant snippets and feed them to a model at query time. OKF is not a retrieval engine. It is a way to author and store the curated knowledge that a RAG system might retrieve from. The two are complementary. See [OKF compared to RAG](/okf-vs-rag/).
- **Vector databases** store embeddings for similarity search. They are an implementation detail of many retrieval pipelines. OKF, by contrast, is human-readable source text. You could embed an OKF bundle into a vector database, but OKF itself stays as plain files you can read and diff.
- **llms.txt** is a convention for telling AI crawlers where to find a website's important content. It operates at the level of a single site file. OKF is a richer, directory-structured format for curated concept knowledge with required typing and reserved files. See [how OKF differs from llms.txt](/okf-vs-llms-txt/).

A useful way to hold it: vector databases and RAG are about *retrieval mechanics*; llms.txt is about *site-level discovery*; OKF is about *authoring and packaging the curated knowledge itself* in a form that outlives any one tool.

## Reference implementations Google shipped

Alongside the specification, Google published reference implementations that show OKF in practice:

- **An enrichment agent** that walks a BigQuery dataset and drafts an OKF concept document for each table or view, then runs a second LLM pass that crawls authoritative documentation to enrich each concept with context.
- **A static HTML visualiser** that turns an OKF bundle into an interactive graph, letting you explore concepts and their relationships in a browser.
- **Three sample bundles** built from public datasets: GA4 e-commerce, Stack Overflow, and Bitcoin.

These show both directions of the workflow: generating bundles from existing data, and consuming bundles for human exploration. For links, see the [official OKF resources](/resources/), and for hands-on study see [OKF examples and sample bundles](/open-knowledge-format-examples/).

## Conformance: what makes a bundle valid

A bundle is conformant when:

- every non-reserved `.md` file has parseable YAML frontmatter;
- every frontmatter block contains a non-empty `type`;
- reserved filenames (`index.md`, `log.md`) follow their expected structures; and
- consumers accept broken links, missing optional fields, and unknown types gracefully.

That last point matters. Conformance is intentionally forgiving. A bundle does not break because one link is stale or one optional field is absent, and a reader does not break because it meets a `type` it has never seen. This tolerance is what lets bundles evolve independently of the tools that read them.

## How to start with OKF

You do not need permission or infrastructure to try OKF:

1. Create a directory for your bundle.
2. Add an `index.md` that lists what the bundle contains.
3. For each concept you want to capture, create a markdown file with frontmatter that includes at least a `type`, and write the context a reader would need in the body.
4. Add a `log.md` to track changes.
5. Commit the directory to a Git repository.

That is a working OKF bundle. From there you can layer in `title`, `description`, `resource`, `tags`, and `timestamp` where they help. A ready-to-copy scaffold is on the [OKF starter template](/okf-starter-template/) page.

## The v0.1 status

OKF is at version 0.1: an early, deliberately minimal release. The minimalism is a feature. Because the core of the format is nothing more than markdown, YAML frontmatter, and a single required field, anything you write today remains readable and useful regardless of how later versions extend the specification. You are not betting on a runtime or a vendor. You are writing plain files.

For precise definitions of every term used here, continue to the [OKF glossary](/glossary/).
