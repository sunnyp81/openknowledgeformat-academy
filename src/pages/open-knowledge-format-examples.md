---
layout: ../layouts/MarkdownPageLayout.astro
title: Open Knowledge Format Examples (Copy-Paste)
h1: Open Knowledge Format Examples You Can Copy and Paste
description: Six fully worked Open Knowledge Format examples plus minimal concepts, a sample bundle tree, index.md and log.md. Valid, copy-pasteable OKF.
pubDate: 2026-06-26
faq:
  - q: >-
      What makes an OKF concept document valid?
    a: >-
      It is a UTF-8 markdown file (not a reserved filename) whose YAML frontmatter block parses and contains a non-empty type field. Everything else, including title, description, resource, tags, and timestamp, is recommended but optional.
  - q: >-
      Do I have to use one of the example types like table or metric?
    a: >-
      No. Type values are not centrally registered. You can invent any short string, and conformant consumers tolerate unknown types. The examples here are conventions, not a fixed list.
  - q: >-
      Can a single .md file hold more than one concept?
    a: >-
      The pattern is one concept per file, with one frontmatter block at the top followed by a markdown body. If you have many related concepts, use a directory and an index.md to list them.
  - q: >-
      What are index.md and log.md for?
    a: >-
      They are the two reserved filenames. index.md is a directory listing for progressive disclosure, and log.md records update history. Concept documents use any other filename.
  - q: >-
      Will broken links or missing fields break my bundle?
    a: >-
      No. The conformance rules explicitly say consumers accept broken links, missing optional fields, and unknown types. The only hard requirement is parseable frontmatter with a non-empty type on every non-reserved file.
---

The Open Knowledge Format (OKF) is an open specification (v0.1) published by Google Cloud on 12 June 2026 for packaging the metadata, context, and curated knowledge that AI systems need. A bundle is simply a directory tree of markdown files, each carrying a small YAML frontmatter block. The only hard rule for a concept document is a non-empty `type`. This page collects working examples you can copy, adapt, and drop into your own bundle. This is an independent reference and is not affiliated with Google.

If you are new to the format, start with [What is the Open Knowledge Format?](/what-is-open-knowledge-format/) and then return here for the patterns.

Every example below is valid per the spec. The frontmatter sits between two `---` lines, `type` is always present, and the body is ordinary markdown that a human can read without any tooling.

## 1. A database table concept (`type: table`)

This documents a single warehouse table: its columns, grain, and where it lives. Note the `resource` URI pointing at the physical asset and the ISO 8601 `timestamp`.

```markdown
---
type: table
title: orders
description: One row per customer order placed through the storefront checkout.
resource: bigquery://acme-analytics/sales/orders
tags: [sales, transactions, ecommerce]
timestamp: 2026-06-26T09:30:00Z
---

# orders

Grain: one row per completed order. Refunds appear as separate rows in
`order_refunds`, not as negative rows here.

## Columns

| Column        | Type      | Description                                  |
|---------------|-----------|----------------------------------------------|
| order_id      | STRING    | Primary key. Stable across the order lifetime.|
| customer_id   | STRING    | Foreign key to `customers.customer_id`.      |
| order_ts      | TIMESTAMP | When the order was confirmed (UTC).          |
| status        | STRING    | One of: placed, shipped, delivered, cancelled.|
| gross_amount  | NUMERIC   | Order total before discounts, in GBP.        |
| currency      | STRING    | ISO 4217 code. Always GBP in this dataset.   |

## Notes

- `gross_amount` excludes shipping. Shipping lives in `order_shipping`.
- Cancelled orders keep their row; filter on `status != 'cancelled'` for revenue.
```

**What it demonstrates:** the most common OKF use case, a data asset described so an agent can answer questions about it without scanning the data. The column table is just markdown, so it renders anywhere.

## 2. A metric / KPI definition (`type: metric`)

Metrics are a natural fit because the hard part is the agreed definition, not the number.

```markdown
---
type: metric
title: Net Revenue Retention
description: Trailing-12-month net revenue retention for subscription customers.
resource: https://wiki.acme.example/metrics/nrr
tags: [finance, saas, retention, kpi]
timestamp: 2026-06-26T10:00:00Z
---

# Net Revenue Retention (NRR)

NRR measures revenue kept and expanded from existing customers over 12 months,
excluding new logos.

## Definition

    NRR = (starting MRR + expansion - contraction - churn) / starting MRR

Cohort: customers active at the start of the trailing 12-month window.

## Inclusions and exclusions

- Includes upsell, cross-sell, and downgrades from existing accounts.
- Excludes revenue from customers acquired inside the window.
- One-off services revenue is excluded.

## Targets

- Healthy: above 100 percent.
- Watch: 90 to 100 percent.
- Action: below 90 percent.
```

**What it demonstrates:** a definitional concept where the body is the value. An agent asked "how do we calculate NRR" can quote this verbatim.

## 3. A runbook (`type: runbook`)

Runbooks turn operational knowledge into something an agent or an on-call human can follow step by step.

```markdown
---
type: runbook
title: Nightly ETL failed
description: Recovery steps when the orders ETL job does not complete by 06:00 UTC.
resource: https://ops.acme.example/runbooks/etl-orders
tags: [oncall, etl, data-platform]
timestamp: 2026-06-26T08:15:00Z
---

# Runbook: nightly orders ETL failed

Trigger: the `orders_etl` job is not marked success in the scheduler by 06:00 UTC.

## 1. Confirm the failure

- Open the scheduler run for `orders_etl`.
- Check whether the job is still running or has errored.

## 2. Classify

- Still running after 05:30: likely a slow source extract. Wait to 06:15.
- Errored on extract: source database is unreachable. Go to step 3.
- Errored on load: warehouse permissions or schema drift. Go to step 4.

## 3. Source unreachable

- Verify the source endpoint responds.
- If down, page the database on-call and pause downstream jobs.

## 4. Load error

- Diff the source schema against the `orders` table contract.
- If a column was added upstream, update the mapping and re-run.

## Escalation

If unresolved by 07:00 UTC, notify the data platform lead.
```

**What it demonstrates:** procedural knowledge. Numbered headings keep it diffable in version control, so changes to the procedure show up cleanly in a pull request.

## 4. An API concept (`type: api`)

```markdown
---
type: api
title: Orders Search API
description: Read-only HTTP endpoint for querying orders by customer or date range.
resource: https://api.acme.example/v2/orders/search
tags: [api, http, orders, read-only]
timestamp: 2026-06-26T11:05:00Z
---

# Orders Search API

`GET /v2/orders/search`

Returns up to 100 orders matching the query. Authentication via bearer token.

## Query parameters

| Param        | Required | Description                              |
|--------------|----------|------------------------------------------|
| customer_id  | no       | Filter to one customer.                  |
| from         | no       | ISO 8601 date, inclusive lower bound.    |
| to           | no       | ISO 8601 date, inclusive upper bound.    |
| limit        | no       | 1 to 100. Default 25.                    |

## Example

    GET /v2/orders/search?customer_id=c_8842&limit=10
    Authorization: Bearer <token>

## Response

A JSON array of order objects, each with `order_id`, `order_ts`, `status`,
and `gross_amount`. Empty array when nothing matches.
```

**What it demonstrates:** an interface contract. The `resource` URI is the live endpoint, while the body explains how to call it.

## 5. A dataset concept (`type: dataset`)

```markdown
---
type: dataset
title: UK Public EV Charge Points
description: Open dataset of public electric vehicle charge point locations in the UK.
resource: https://data.example.gov.uk/ev-charge-points
tags: [open-data, ev, geography, uk]
timestamp: 2026-06-26T07:45:00Z
---

# UK Public EV Charge Points

A periodically refreshed snapshot of public charge points, one row per connector.

## Shape

- Roughly 70,000 connector rows.
- Key fields: site_id, latitude, longitude, connector_type, power_kw, operator.
- Updated monthly; see log.md for the refresh history.

## Caveats

- Coordinates are operator-supplied and occasionally imprecise.
- `power_kw` is the rated maximum, not the delivered rate.
- Decommissioned sites are removed on refresh, not flagged.
```

**What it demonstrates:** describing a whole dataset rather than one table, including shape and trustworthiness caveats an agent should surface.

## 6. A glossary term (`type: glossary-term`)

A concept can be as small as a single defined word. Type values are free-form, so `glossary-term` is perfectly valid.

```markdown
---
type: glossary-term
title: Active Customer
description: The shared internal definition of an active customer.
tags: [glossary, definitions]
timestamp: 2026-06-26T12:00:00Z
---

# Active Customer

A customer with at least one completed, non-cancelled order in the trailing
90 days. Used consistently across analytics, finance, and lifecycle email.

Related: see the `Net Revenue Retention` metric, which uses a 12-month window
rather than 90 days.
```

**What it demonstrates:** the format scales down. The same structure that documents a warehouse table also captures one shared definition.

## Minimal valid concept

The smallest legal concept document is a frontmatter block with a non-empty `type`, then a body. Everything else is optional.

```markdown
---
type: note
---

# Quick note

Pricing is reviewed quarterly. The next review is in Q3.
```

**What it demonstrates:** the true floor of conformance. If this file parses and `type` is non-empty, it conforms.

## A small bundle: directory tree

A bundle is a directory tree. Reserved filenames `index.md` and `log.md` sit alongside ordinary concept files. Folders can nest for progressive disclosure.

```text
acme-sales-bundle/
  index.md            # reserved: directory listing
  log.md              # reserved: update history
  orders.md           # type: table
  net-revenue-retention.md   # type: metric
  orders-search-api.md       # type: api
  runbooks/
    index.md          # reserved: lists this subdirectory
    etl-orders-failed.md     # type: runbook
```

**What it demonstrates:** structure is just folders and files. An agent walks the tree, reads each `index.md` first for orientation, then opens concepts as needed.

## Example `index.md`

`index.md` is reserved. It lists what is in its directory so a reader, human or agent, can navigate before opening every file.

```markdown
---
type: index
title: Acme Sales Knowledge
description: Curated knowledge about Acme sales data, metrics, and operations.
timestamp: 2026-06-26T12:30:00Z
---

# Acme Sales Knowledge

A small OKF bundle covering the core sales tables, metrics, and runbooks.

## Concepts

- [orders](orders.md) - table, one row per completed order.
- [Net Revenue Retention](net-revenue-retention.md) - metric, trailing 12 months.
- [Orders Search API](orders-search-api.md) - read-only HTTP endpoint.

## Subdirectories

- [runbooks/](runbooks/index.md) - operational recovery procedures.
```

**What it demonstrates:** progressive disclosure. The listing gives one-line summaries and links, so a consumer can decide what to read without loading the whole bundle.

## Example `log.md`

`log.md` is the other reserved file. It records the update history of the bundle so changes are traceable.

```markdown
---
type: log
title: Change log
description: Update history for the Acme sales bundle.
timestamp: 2026-06-26T12:30:00Z
---

# Change log

## 2026-06-26
- Added `Orders Search API` concept.
- Clarified that `gross_amount` excludes shipping in `orders`.

## 2026-06-19
- Initial bundle: orders table, NRR metric, ETL runbook.
```

**What it demonstrates:** a human-readable, diffable history. Because it is plain markdown in version control, the change log and the actual diffs reinforce each other.

## Where to go next

Grab the [OKF starter template](/okf-starter-template/) to get all of these files pre-wired in a folder you can clone. To understand how OKF relates to neighbouring ideas, compare [OKF vs llms.txt](/okf-vs-llms-txt/) and [OKF vs RAG](/okf-vs-rag/). Definitions for every term used here live in the [glossary](/glossary/), and the [resources](/resources/) page links the official specification and Google's reference tools.
