---
layout: ../layouts/MarkdownPageLayout.astro
title: OKF Starter Template (Free Download)
h1: "OKF Starter Template: A Spec-Conformant Bundle You Can Clone"
description: A free, spec-conformant Open Knowledge Format starter bundle. README, index.md, log.md, four example concepts and a licence. Clone and adapt.
pubDate: 2026-06-26
faq:
  - q: >-
      Is this starter template official?
    a: >-
      No. This is an independent, free template built to follow the public OKF v0.1 specification. It is not affiliated with or endorsed by Google. Links to the official spec are on the resources page.
  - q: >-
      What licence is the template under?
    a: >-
      CC0 1.0, which places it in the public domain. You can use, modify, and redistribute it for any purpose with no attribution required. Replace the licence if your own bundle needs different terms.
  - q: >-
      How do I turn these files into a working bundle?
    a: >-
      Download the zip, or create a folder and save each FILE block below at its given path, keeping index.md and log.md at the root. That folder is a conformant OKF bundle. Edit the placeholder concepts to describe your real assets.
  - q: >-
      Do I need an SDK or runtime to use it?
    a: >-
      No. OKF requires no SDK, runtime, account, or schema registry. The files are human-readable markdown and agent-parseable YAML. Any tool that can read text can consume them.
  - q: >-
      How do I know my edited bundle is still valid?
    a: >-
      Check that every non-reserved .md file has a frontmatter block that parses as YAML and contains a non-empty type, and that index.md and log.md keep their reserved roles. Missing optional fields, unknown types, and broken links are all tolerated.
---

This is a free, ready-to-clone Open Knowledge Format (OKF) starter bundle. OKF is the open specification published by Google Cloud on 12 June 2026 for packaging the curated knowledge AI agents need, as a plain directory of markdown files with YAML frontmatter. The starter below gives you a working, well-commented skeleton so you do not have to assemble one from scratch.

This template and this site are independent and not affiliated with Google. For the authoritative specification and Google's reference tools, see the [resources](/resources/) page.

<div class="not-prose my-8 rounded-2xl border border-accent/30 bg-accent-soft/60 p-6 text-center">
  <p class="text-sm font-semibold uppercase tracking-wide text-accent">Lead magnet</p>
  <h2 class="mt-2 text-xl font-bold text-ink">Download the OKF starter bundle</h2>
  <p class="mx-auto mt-2 max-w-md text-sm text-ink-soft">A zip containing the README, reserved index.md and log.md, four example concepts, and a CC0 licence. Free, no email required.</p>
  <a href="/okf-starter-bundle.zip" download class="mt-4 inline-block rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-ink">Download the bundle (.zip)</a>
  <form class="mx-auto mt-5 flex max-w-sm flex-col gap-2 sm:flex-row" action="https://formspree.io/f/your-form-id" method="POST" data-newsletter>
    <label for="tpl-email" class="sr-only">Email address</label>
    <input id="tpl-email" type="email" name="email" placeholder="Email me future templates (optional)" class="flex-1 rounded-lg border border-line bg-white px-3 py-2 text-sm" />
    <button type="submit" class="rounded-lg border border-accent bg-white px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white">Notify me</button>
  </form>
</div>

## What is in the template

The bundle is deliberately small so you can read all of it in a few minutes:

- **`README.md`** explains the bundle, points to the spec, and states clearly that it is independent.
- **`index.md`** is the reserved directory listing, the first thing a consumer reads for orientation.
- **`log.md`** is the reserved update history.
- **Four example concepts** of varied `type`: a `table`, a `metric`, a `runbook`, and an `api`. Each holds realistic but obviously placeholder content marked with `REPLACE` notes.
- **`LICENSE`** releases the template under CC0 so you can do anything with it.

Every file is conformant: each concept document carries frontmatter with a non-empty `type`, and the two reserved filenames keep their special roles.

## How to use it

1. Create an empty folder named for your domain, for example `my-okf-bundle/`.
2. Save each `FILE` block below to the path shown in its heading, keeping `index.md` and `log.md` at the root.
3. Open `README.md` and `index.md` and replace the Acme placeholders with your own project name and one-line summaries.
4. Edit each concept document so it describes a real asset you own. Keep the `type` field, update `title`, `description`, `resource`, `tags`, and `timestamp`, and rewrite the body.
5. Add an entry to `log.md` whenever you change the bundle. Commit the folder to version control so changes stay diffable.

That is the whole workflow. There is no build step, no registry to publish to, and no account to create. Once you want more patterns, the [examples gallery](/open-knowledge-format-examples/) has six more concept types to copy from.

## The files

Save each block below at the path in its heading. Together they form the complete starter bundle.

### FILE: README.md

```markdown
# OKF Starter Bundle

A small, spec-conformant example bundle for the Open Knowledge Format (OKF).
Clone it, replace the placeholder content, and you have a working knowledge
bundle for your own data, metrics, and operations.

## What this is

OKF is an open specification for packaging the metadata, context, and curated
knowledge that AI agents and humans need, as a directory of UTF-8 markdown
files with YAML frontmatter. Each concept document requires only a non-empty
`type` field; everything else is optional.

## Layout

    okf-starter-bundle/
      README.md      this file
      LICENSE        CC0 1.0, public domain
      index.md       reserved: directory listing
      log.md         reserved: update history
      orders.md      type: table
      signup-rate.md type: metric
      restart-api.md type: runbook
      status-api.md  type: api

## How to use

1. Replace the "Acme" and "REPLACE" placeholders with your own content.
2. Keep a non-empty `type` in every concept's frontmatter.
3. Keep index.md and log.md at the root; they are reserved filenames.
4. Record changes in log.md and commit to version control.

## Not affiliated with Google

This template is an independent resource. OKF is an open specification; this
bundle is not produced, endorsed by, or affiliated with Google. See the
official specification for the authoritative rules.

## License

CC0 1.0 Universal. See LICENSE. You may use, modify, and redistribute this
template for any purpose without attribution.
```

### FILE: index.md

```markdown
---
type: index
title: Acme Starter Knowledge
description: A starter OKF bundle. Replace these concepts with your own.
tags: [starter, example]
timestamp: 2026-06-26T09:00:00Z
---

# Acme Starter Knowledge

REPLACE this with a one-paragraph summary of what your bundle covers.

This starter contains one concept of each common type so you can see the
shape, then swap in your real assets.

## Concepts

- [orders](orders.md) - table. One row per completed order.
- [signup-rate](signup-rate.md) - metric. Visitor to signup conversion.
- [restart-api](restart-api.md) - runbook. Recovering the API service.
- [status-api](status-api.md) - api. Public health-check endpoint.

## How to read this bundle

Start here, then open only the concepts you need. Each file is independent and
human-readable without any tooling.
```

### FILE: log.md

```markdown
---
type: log
title: Change log
description: Update history for the starter bundle.
timestamp: 2026-06-26T09:00:00Z
---

# Change log

## 2026-06-26
- Initial starter bundle: one table, metric, runbook, and api concept.

<!-- Add a dated entry here every time you change the bundle. Newest first. -->
```

### FILE: orders.md

```markdown
---
type: table
title: orders
description: REPLACE. One row per completed customer order.
resource: REPLACE://your-warehouse/dataset/orders
tags: [REPLACE, table, example]
timestamp: 2026-06-26T09:00:00Z
---

# orders

REPLACE this with a one-line statement of the table grain, for example:
"One row per completed order. Refunds live in a separate table."

## Columns

| Column      | Type      | Description                          |
|-------------|-----------|--------------------------------------|
| order_id    | STRING    | REPLACE. Primary key.                |
| customer_id | STRING    | REPLACE. Foreign key to customers.   |
| order_ts    | TIMESTAMP | REPLACE. Order confirmation time, UTC.|
| status      | STRING    | REPLACE. placed, shipped, cancelled. |
| amount      | NUMERIC   | REPLACE. Order total, your currency. |

## Notes

- REPLACE with anything an agent should know before using this table,
  such as how cancellations or refunds are handled.
```

### FILE: signup-rate.md

```markdown
---
type: metric
title: Signup Rate
description: REPLACE. Share of visitors who create an account.
resource: https://wiki.example.com/metrics/signup-rate
tags: [REPLACE, metric, conversion]
timestamp: 2026-06-26T09:00:00Z
---

# Signup Rate

REPLACE with the agreed definition. Example:

    signup_rate = new_signups / unique_visitors

Window: REPLACE, for example a rolling 7-day window.

## Inclusions and exclusions

- REPLACE. State what counts as a signup and a visitor.
- REPLACE. Note any bot filtering or deduplication.

## Targets

- REPLACE with your healthy, watch, and action thresholds.
```

### FILE: restart-api.md

```markdown
---
type: runbook
title: Restart the API service
description: REPLACE. Steps to safely restart the public API.
resource: https://ops.example.com/runbooks/restart-api
tags: [REPLACE, runbook, oncall]
timestamp: 2026-06-26T09:00:00Z
---

# Runbook: restart the API service

Trigger: REPLACE, for example "health check returns 5xx for over 2 minutes".

## 1. Confirm

- REPLACE. How to verify the service is actually unhealthy.

## 2. Act

- REPLACE. The exact restart command or console steps.

## 3. Verify recovery

- REPLACE. How to confirm the service is healthy again.

## Escalation

- REPLACE. Who to contact if the restart does not resolve it.
```

### FILE: status-api.md

```markdown
---
type: api
title: Status API
description: REPLACE. Public health-check endpoint.
resource: https://api.example.com/v1/status
tags: [REPLACE, api, health]
timestamp: 2026-06-26T09:00:00Z
---

# Status API

`GET /v1/status`

REPLACE with a one-line description. Returns service health. No auth required.

## Response

REPLACE. Example:

    { "status": "ok", "version": "1.4.2", "time": "2026-06-26T09:00:00Z" }

## Notes

- REPLACE. Rate limits, caching, or anything a caller should know.
```

### FILE: LICENSE

```text
CC0 1.0 Universal

This OKF starter bundle is dedicated to the public domain under the Creative
Commons CC0 1.0 Universal Public Domain Dedication.

To the extent possible under law, the author(s) have waived all copyright and
related or neighbouring rights to this template. You may copy, modify,
distribute, and use it, including for commercial purposes, all without asking
permission.

Full text: https://creativecommons.org/publicdomain/zero/1.0/legalcode

This template is an independent resource and is not affiliated with,
endorsed by, or produced by Google.
```

## Why this template stays conformant

Each concept file keeps a frontmatter block with a non-empty `type`, which is the single hard requirement. The `index.md` and `log.md` files keep their reserved roles. Optional fields are present as examples but you can delete any of them and the bundle still conforms. Because consumers tolerate unknown types, broken links, and missing optional fields, you can grow the bundle gradually without fear of breaking it.

When you are ready for more variety, the [examples gallery](/open-knowledge-format-examples/) adds dataset and glossary-term concepts, and the [glossary](/glossary/) defines every field used here. If you are weighing OKF against other approaches, [OKF vs RAG](/okf-vs-rag/) and [OKF vs llms.txt](/okf-vs-llms-txt/) cover the trade-offs. More about who maintains this independent reference is on the [about](/about/) page.
