# SagaSmithAI Website

[Live site](https://sagasmithai.github.io) · [Platform overview](https://github.com/SagaSmithAI/.github/blob/main/profile/README.md) · [SagaSmith Web](https://github.com/SagaSmithAI/SagaSmith-Web) · [Local Agent Kit](https://github.com/SagaSmithAI/SagaSmith-agent)

The bilingual static organization site for SagaSmithAI, an AI-native TTRPG platform. It is a public product and developer entry surface, not a runtime dashboard, hosted campaign service, or replacement for component documentation.

## Information architecture

| Route | Purpose |
|---|---|
| `/` | Product thesis, Local/Hosted contract map, experience boundaries, maturity, and recent progress |
| `/start` | Current release-locked Local Kit install, MCP-host templates, transports, and SagaSmith Web development entry |
| `/developers` | Authoritative contract, ownership boundaries, and current repository topology |
| `/library` | Current Content Pack inventory and integrity/authority/rights boundaries |
| `/updates` | Dated public progress summaries with explicit evidence limits |
| `/security` | Private vulnerability-reporting routes and sensitive-data guidance |
| `/privacy` | Privacy notice for this static GitHub Pages site |
| `/404` | Bilingual not-found recovery page |

Chinese is the default language. The language control reveals complete English copy on the same static routes and stores only `sagasmith-language` in browser `localStorage`.

## Current repository map

| Layer | Current repository |
|---|---|
| Agent host and Local Agent Kit | [`SagaSmith-agent`](https://github.com/SagaSmithAI/SagaSmith-agent) |
| Hosted browser product | [`SagaSmith-Web`](https://github.com/SagaSmithAI/SagaSmith-Web) |
| System-neutral runtime | [`Sagasmith-core`](https://github.com/SagaSmithAI/Sagasmith-core) |
| D&D Domain / MCP / Skills / UI | [`Sagasmith-dnd`](https://github.com/SagaSmithAI/Sagasmith-dnd) |
| CoC Domain / MCP / Skills / UI | [`Sagasmith-coc`](https://github.com/SagaSmithAI/Sagasmith-coc) |
| Narrative Domain / MCP / Skills | [`sagasmith-narrative`](https://github.com/SagaSmithAI/sagasmith-narrative) |
| Rights-aware Content Pack catalog | [`SagaSmith-dnd-content-library`](https://github.com/SagaSmithAI/SagaSmith-dnd-content-library) |
| Organization profile and community policy | [`.github`](https://github.com/SagaSmithAI/.github) |

Former standalone MCP, Skills, UI, and generic Module Generator repositories are archived read-only history. They are not current documentation, release inputs, producers, consumers, or compatibility fallbacks.

## Product boundaries

- SagaSmith Local Agent Kit and SagaSmith Web are two deployments of the
  `sagasmith.authoritative-mcp/v2` application contract, with MCP `2026-07-28` as the modern
  protocol target.
- Transport, authentication, storage, and deployment may differ. Handlers, tool schemas, errors, authority, revisions, idempotency, and rule-write semantics may not.
- Modern requests use `server/discover`, carry protocol/capability/identity metadata on every
  request, and never treat initialize, a connection, or `Mcp-Session-Id` as authority. Domain
  `tools/list` is deterministic and privately cacheable for one authorization scope; the Host
  projects the task-relevant facade subset without mutating the server catalog.
- Cross-call state uses explicit server-issued opaque handles or explicit campaign/revision
  parameters. Handles have an owner and expiry, are re-authorized on every call, and are names—not
  bearer capabilities. Legacy initialize/session exposure is retained only by an explicitly pinned
  compatibility adapter while older clients are migrated.
- SagaSmith Web owns accounts, sessions, quota, collaboration, Forge, Module Studio, hosted orchestration, and cloud projections. Domain MCPs remain authoritative for game state.
- Agent and Skills may interpret, facilitate, and propose. Domain runtimes and MCP settle deterministic rules and authoritative writes.
- `sagasmith.content-package` v2 Packs do not carry campaign permissions, ActorKnowledge, progress, random streams, branches, or snapshots.
- Public repository or catalog visibility is not a content license. Every Pack, source, image, map, font, and derived asset retains its own rights requirements.
- Extended ruleset import is Experimental and does not imply arbitrary unadapted rulebooks can execute safely.
- Local release profiles and SagaSmith Web production builds pin exact validated component commits.
  Rollback restores the previous complete lock and compatible data/schema state; archived split
  repositories are never release inputs or fallbacks.

## Development and validation

Requires Node.js 22.12+.

```bash
npm ci
npm run check:content
npm run build
npm run check:site
npm run check:external
```

`npm run check` runs the deterministic content/topology checks, production build, and built-site metadata/internal-link/asset-budget checks. `check:external` performs the network-dependent external-link pass separately.

The GitHub Pages workflow builds only this repository and publishes `dist/`. It has no cross-repository release input or bundled Workbench. Pull requests run the same deterministic checks; deployment occurs only from `main` or an explicit workflow dispatch.

## Assets and visual source

- `public/logo-wordmark.png`, `public/logo-mark.png`, and the original favicon path are first-party brand assets already committed to this Apache-2.0 website in PR #9. They remain covered by this repository's `LICENSE` and `NOTICE`.
- `public/og.png` is rendered at 1200×630 from the site-owned, reviewable `src/assets/og-source.svg`; it uses only inline vectors, text, and the documented site tokens.
- `public/favicon.svg` is a site-owned vector mark adapted from the existing website favicon and recolored to the current product palette. `public/icon-512.png` is rendered from the reviewable `src/assets/icon-source.svg` for exact manifest and Apple touch dimensions.
- The visual token names and interaction patterns are aligned with the current SagaSmith Web product language: void `#0c0d0d`, forge panel `#151716`, iron line `#2a2d2b`, vellum ink `#eee9dc`, forge gold `#d9ad5b`, and moss state `#718d6a`.
- SagaSmith Web is proprietary. No SagaSmith Web source file, texture, icon, private implementation, model, cache, or generated workflow is copied into this static repository.
- The site loads no remote font, analytics, image CDN, or third-party visual asset at runtime.

## Main sources

```text
src/layouts/SiteLayout.astro  Shared metadata, bilingual navigation, accessibility, and footer
src/lib/site.ts               Current repository, system-status, and Local profile data
src/lib/news.ts               Local dated-news loader
src/pages/                    Every public route, including privacy, security, updates, and 404
src/styles/site.css           Shared responsive visual system and reduced-motion handling
news/                         Dated historical progress sources
scripts/                      Content, built-site, and external-link checks
public/                       First-party brand assets, manifest, sitemap, and robots policy
```

## License

Apache-2.0. See [`NOTICE`](NOTICE). Repository visibility and this website license do not grant rights to separately licensed Content Packs or SagaSmith Web source.
