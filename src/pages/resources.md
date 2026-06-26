---
layout: ../layouts/MarkdownPageLayout.astro
title: "OKF Resources: Official Spec, Tools & Guides"
h1: Open Knowledge Format Resources
description: "Curated Open Knowledge Format resources: the official Google Cloud blog post and GitHub spec, sample bundles, the visualiser, and verified community tools."
pubDate: 2026-06-26
---

A curated, honest set of links for learning and using OKF. We list the primary sources first, then our own guides, then community tools we have verified actually exist. Where something is third-party, we say so. When in doubt, treat the official Google Cloud sources as authoritative.

> This site is independent and not affiliated with Google. The links below to Google properties and third-party projects are provided for reference only.

## Official resources

- **[How the Open Knowledge Format can improve data sharing](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)** (Google Cloud Blog): the launch announcement explaining the motivation behind OKF and how it formalises the LLM-wiki pattern.
- **[GoogleCloudPlatform/knowledge-catalog](https://github.com/GoogleCloudPlatform/knowledge-catalog)** (GitHub): the official repository containing the spec, sample bundles, and reference tooling.
- **[OKF v0.1 specification (okf/SPEC.md)](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)**: the authoritative specification covering bundle structure, the required `type` field, recommended fields, and the reserved files `index.md` and `log.md`.
- **Sample bundles** (in the official repo): example OKF bundles published by Google, including a GA4 e-commerce dataset, a Stack Overflow dataset, and a Bitcoin dataset.
- **Reference implementations** (in the official repo): a BigQuery enrichment agent that generates and enriches bundles, and a static HTML visualiser for browsing a bundle in the browser.
- **[Google Cloud Tech on X](https://x.com/GoogleCloudTech/status/2067012903337664886)**: the short official announcement thread introducing OKF.

## On this site

- **[What is OKF?](/what-is-open-knowledge-format/)**: our pillar guide, a plain-language definition, the bundle structure, the design principles, and where OKF fits.
- **[OKF examples](/open-knowledge-format-examples/)**: annotated bundle layouts and frontmatter you can study.
- **[OKF starter template](/okf-starter-template/)**: a minimal bundle to copy and adapt for your own knowledge.
- **[OKF vs llms.txt](/okf-vs-llms-txt/)**: a comparison with the llms.txt convention.
- **[OKF vs RAG](/okf-vs-rag/)**: how curated OKF bundles relate to retrieval-augmented generation.
- **[Glossary](/glossary/)**: definitions for the core OKF terms.

## Community tools

These are third-party, independent projects we found on GitHub. They are not official and not maintained by Google or by this site. Verify each project's licence, status, and suitability before relying on it.

- **[GitHub topic: okf](https://github.com/topics/okf)**: a live index of repositories tagged `okf`, useful for finding new community projects as they appear.
- **[W4G1/okf](https://github.com/W4G1/okf)**: a pure-Rust, zero-dependency implementation of OKF v0.1.
- **[catancs/okf-skill](https://github.com/catancs/okf-skill)**: a toolkit to validate, query, lint, and create OKF bundles for coding agents.
- **[eli-l/okf-builder](https://github.com/eli-l/okf-builder)**: an agent-skill procedure for authoring, reading, and validating OKF v0.1 bundles.

If you maintain an OKF tool and would like it listed, note that we only include projects we can independently verify exist and are reachable. See [About](/about/) for our editorial stance.
