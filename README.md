# SagaSmithAI Website

[Live site](https://sagasmithai.github.io) · [Get started](https://sagasmithai.github.io/start) · [Developer map](https://sagasmithai.github.io/developers) · [SagaSmith Web](https://github.com/SagaSmithAI/SagaSmith-Web) · [Local Agent Kit](https://github.com/SagaSmithAI/SagaSmith-agent)

This repository builds the bilingual static organization site for SagaSmithAI, an AI-native TTRPG platform. The site is a public product and developer entry point. It is not a runtime dashboard, a hosted campaign service, or a substitute for the versioned documentation in each component repository.

## Choose a distribution

SagaSmith has two deployment shapes over the same authoritative domain contract:

| Distribution | Use it for | Host boundary | Storage boundary |
|---|---|---|---|
| [Local Agent Kit](https://github.com/SagaSmithAI/SagaSmith-agent) | Self-hosted Agents, bots, desktop tools, and local Workbenches | SagaSmith Agent or another MCP Host | Operator-controlled SQLite and local files |
| [SagaSmith Web](https://github.com/SagaSmithAI/SagaSmith-Web) | Accounts, collaborative rooms, hosted workers, Forge, Module Studio, and operations | Browser → API/BFF → Agent worker | PostgreSQL, Redis, private object storage, and isolated domain state |

Local Kit does not depend on SagaSmith Web. Local and Hosted may use different transports, authentication, storage, and deployment, but they preserve the same handlers, tool schemas, structured errors, authority, revisions, idempotency, and rule-write semantics.

## Current repository map

| Layer | Current repository |
|---|---|
| Agent host, Local Agent Kit, and Hosted worker base | [`SagaSmith-agent`](https://github.com/SagaSmithAI/SagaSmith-agent) |
| Hosted browser product | [`SagaSmith-Web`](https://github.com/SagaSmithAI/SagaSmith-Web) |
| System-neutral runtime | [`Sagasmith-core`](https://github.com/SagaSmithAI/Sagasmith-core) |
| D&D Domain / MCP / Skills / UI | [`Sagasmith-dnd`](https://github.com/SagaSmithAI/Sagasmith-dnd) |
| CoC Domain / MCP / Skills / UI | [`Sagasmith-coc`](https://github.com/SagaSmithAI/Sagasmith-coc) |
| Narrative Domain / MCP / Skills | [`sagasmith-narrative`](https://github.com/SagaSmithAI/sagasmith-narrative) |
| Rights-aware Content Pack catalog | [`SagaSmith-dnd-content-library`](https://github.com/SagaSmithAI/SagaSmith-dnd-content-library) |
| Organization profile and community policy | [`.github`](https://github.com/SagaSmithAI/.github) |

Former standalone MCP, Skills, UI, and generic Module Generator repositories are archived read-only history. They are not current installation paths, release inputs, producers, consumers, or compatibility fallbacks. Historical news may retain links that were accurate on its publication date.

## MCP 2026-07-28 contract

`sagasmith.authoritative-mcp/v2` uses MCP `2026-07-28` as its modern protocol target:

- A modern Host calls `server/discover` and supplies protocol, capability, and trusted identity metadata on every request. It does not derive authority from initialization, a connection, or `Mcp-Session-Id`.
- Each domain exposes a deterministically sorted, authorization-scoped catalog. `tools/list` does not change because another request on the same connection mutated phase or exposure state.
- The Host connects only the MCP for the campaign's current `system_id`, then projects the relevant system/phase/role/task facade. SagaSmith Web persists no more than **16 sorted, unique tool IDs** with a turn. This is a Host selection policy, not an MCP protocol limit and never a replacement for call-time authorization.
- Cross-call state uses an explicit server-issued opaque handle or explicit campaign/revision parameters. A handle has an owner and expiry, is re-authorized on every request, and is a name rather than a bearer capability.
- HTTP validates authorization on every request. Connection pools never pool implicit principal/session state, and browser or provider tokens are never passed through to a domain MCP.
- The pinned legacy initialize/session adapter exists only for an atomic rollback of a compatible Web, Agent, Core, and domain set. Modern and legacy components must not be mixed.

The Host keeps model-visible tool lists small because selection accuracy generally falls when many irrelevant low-level tools compete. Domain MCPs can retain a complete, stable catalog while the Host presents a compact set of facade/workflow tools for the current task.

## Hosted reliability and trust boundaries

SagaSmith Web owns hosted workflow; the matching domain MCP remains the sole authority for campaign membership, actor authority, phase/combat/random state, revision, idempotency, settlement, and Pack activation.

### Durable room turns

Every accepted room action persists the user message and a durable `RoomTurnJob`. Its states are `queued`, `running`, `waiting`, `succeeded`, `failed`, and `cancelled`. Leases, heartbeats, retry counts, error classification, result references, startup recovery, and periodic recovery allow work to survive worker or Web restarts.

Browser, Web, Agent, and MCP retries reuse one business idempotency key. Quota reservations are renewed while work is live and settled or released from durable state. An optional `base_revision` enables optimistic concurrency without holding a room or database lock for the LLM turn; only the final ordered message/outbox settlement uses short per-room serialization. A stale revision is recoverable instead of silently overwriting newer state.

If a domain operation commits but Web publication fails, the saved standard MCP result is reused. The write and quota charge are not repeated.

### Identity and delegation

Trusted authority context is structurally separate from player text. It identifies the caller/workload, requester/resource owner, acting Host/character, allowed operations, audience, campaign, `room_turn_id`, `base_revision`, and expiry. The model cannot choose authoritative identity.

Web signs a short-lived delegation for the exact target MCP audience. D&D and CoC use their hosted Streamable HTTP paths; Narrative remains process-local stdio in the current Hosted lock. A shared HTTP client may reuse connections, but every request carries and validates its own authority.

### Results, media, and projections

Hosted workers preserve the standard MCP `CallToolResult`, including text, image, audio, resource, and embedded-resource content. Web stores the original result and projects accepted media internally through `sagasmith.host-media/v1` (`HostMediaEnvelope`) into private artifact/object IDs with audience checks, bounds, checksums, and idempotent keys. This supports room/group images and combat grids without inventing a replacement MCP wire protocol.

Web never reads or writes a domain's authoritative database directly. Successful MCP receipts drive a durable outbox and revisioned, audience-safe Web projections. Cache keys include authority revision; successful commits invalidate only affected scopes, while failed, rolled-back, and no-op operations do not invalidate data. Tool-catalog caching changes with authorization/catalog scope, not with each combat write.

### MCP Tasks and Host jobs

`RoomTurnJob` represents an entire Web-hosted LLM turn and is not an MCP Task. The negotiated `io.modelcontextprotocol/tasks` extension is used only for a genuinely long domain tool. Ordinary tools remain synchronous; claim, authenticated poll, cancel, timeout, and recovery activate only after capability negotiation and an accepted Task claim. The current reviewed path uses this for D&D module-draft work.

### Worker workspaces

Hosted workers use a stable opaque `--workspace-id` under the registered managed root. The supervisor bounds worker count and spawn concurrency, coalesces simultaneous starts, and applies TTL, LRU, count, and byte limits. Terminal success removes registered state and startup recovers crash-left markers. Unknown, malformed, external, legacy, symlinked, or active directories are retained for operator review rather than deleted.

## Release lock, upgrade, and rollback

The current Hosted manifest is [`component-versions.json`](https://github.com/SagaSmithAI/SagaSmith-Web/blob/main/component-versions.json), schema `sagasmith.release-lock/v3`. It records the exact reviewed Agent, Core, D&D, CoC, and Narrative revisions, protocol/auth contracts, runtime locks, and the maximum 16-tool Host projection. Its current status is a compatibility lock, not a published release.

Local release profiles use the equivalent immutable lock in [`SagaSmith-agent`](https://github.com/SagaSmithAI/SagaSmith-agent/tree/main/sagasmith-release). Production upgrades move Web, Agent, Core, and the three domain components as one validated set after protocol and data canaries. Rollback restores the previous complete lock and compatible schema; it never substitutes an archived repository, an unlocked `main`, or hidden legacy session state.

For operational commands and migration ordering, use the component-owned guides:

- [SagaSmith Web deployment and recovery](https://github.com/SagaSmithAI/SagaSmith-Web/blob/main/docs/operations.md)
- [SagaSmith Web acceptance matrix](https://github.com/SagaSmithAI/SagaSmith-Web/blob/main/docs/test-matrix.md)
- [Local Agent Kit deployment](https://github.com/SagaSmithAI/SagaSmith-agent/blob/main/docs/deployment.md)
- [Local Agent Kit architecture](https://github.com/SagaSmithAI/SagaSmith-agent/blob/main/docs/architecture.md)

Do not copy example secrets into production, use real campaign data in tests, or treat this static site's `main` branch as a product component lock.

## Site information architecture

| Route | Purpose |
|---|---|
| `/` | Product thesis, Local/Hosted contract map, experience boundaries, maturity, and recent progress |
| `/start` | Current release-locked Local Kit install, MCP-host templates, transports, and SagaSmith Web development entry |
| `/developers` | Authoritative contract, Hosted reliability boundaries, ownership, and current repository topology |
| `/library` | Content Pack inventory and integrity/authority/rights boundaries |
| `/updates` | Dated public progress summaries with explicit evidence limits |
| `/security` | Private vulnerability-reporting routes and sensitive-data guidance |
| `/privacy` | Privacy notice for this static GitHub Pages site |
| `/404` | Bilingual not-found recovery page |

Chinese is the default language. The language control reveals complete English copy on the same static routes and stores only `sagasmith-language` in browser `localStorage`.

## Develop and validate the site

Node.js 22.12+ is required.

```bash
npm ci
npm run check:content
npm run build
npm run check:site
npm run check:external
```

`npm run check` runs deterministic content/topology checks, the production build, and built-site metadata/internal-link/asset-budget checks. `check:external` is the separate network-dependent external-link pass.

The GitHub Pages workflow builds only this repository and publishes `dist/`. Pull requests run deterministic checks; deployment occurs only from `main` or an explicit workflow dispatch. Domain Workbenches and other repositories are never bundled into the site artifact.

## Observability and security scope

This static site has no account login, campaign data, hosted worker, analytics script, remote font, image CDN, or SagaSmithAI form backend. The language preference is local-only. GitHub Pages and linked destinations apply their own privacy policies.

Product telemetry belongs to the owning component. SagaSmith Web exposes low-cardinality service, MCP-phase, projection, durable-job, quota, database, outbox, and realtime metrics; user, campaign, room, job, and tool arguments are not metric labels. `traceparent`, `tracestate`, and `baggage` propagate through Web, Agent, and MCP boundaries.

Never publish vulnerability details, credentials, private campaigns, personal data, provider responses, or restricted Pack/source content in a public issue. Use the [security route](https://sagasmithai.github.io/security) to find the private reporting path owned by the affected repository.

## Source layout and assets

```text
src/layouts/SiteLayout.astro  Shared metadata, bilingual navigation, accessibility, and footer
src/lib/site.ts               Current repository, system-status, and Local profile data
src/lib/news.ts               Local dated-news loader
src/pages/                    Public routes, including privacy, security, updates, and 404
src/styles/site.css           Shared responsive visual system and reduced-motion handling
news/                         Dated historical progress sources
scripts/                      Content, built-site, and external-link checks
public/                       First-party brand assets, manifest, sitemap, and robots policy
```

The committed wordmark, mark, favicon, manifest icon, and SVG render sources are first-party site assets covered by this repository's Apache-2.0 license and `NOTICE`. The site copies no proprietary SagaSmith Web source, texture, icon, model, cache, or generated workflow.

## License

Apache-2.0. See [`NOTICE`](NOTICE). Repository visibility and this website license do not grant rights to separately licensed Content Packs or SagaSmith Web source.
