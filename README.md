# SagaSmithAI Website

[Live site](https://sagasmithai.github.io) · [Platform overview](https://github.com/SagaSmithAI/.github/blob/main/profile/README.md) · [SagaSmith Web](https://github.com/SagaSmithAI/SagaSmith-Web) · [Content catalog](https://github.com/SagaSmithAI/SagaSmith-dnd-content-library)

The source for [sagasmithai.github.io](https://sagasmithai.github.io): the public home of the AI-native TTRPG platform.

## What the site communicates

- fully autonomous game mastering as the primary player-facing experience;
- human-DM collaboration as a supported second hosting mode;
- persistent choices, actor-scoped knowledge, and clear table boundaries;
- honest D&D and CoC experience status;
- extended ruleset import as an explicitly experimental capability;
- checksum-validated unified core-rule, addon, module, and preset packages;
- the public-source hosted [SagaSmith Web](https://github.com/SagaSmithAI/SagaSmith-Web),
  while keeping game-state authority in system MCPs;
- Local Agent Kit and Hosted Web as two deployments of the same authoritative MCP contract;
- the public, rights-aware
  [Content Pack repository](https://github.com/SagaSmithAI/SagaSmith-dnd-content-library)
  and checksum catalog, without treating repository visibility as a content license;
- a separate developer path for architecture, repositories, and ownership boundaries;
- short public-facing platform updates.

The site is bilingual (Chinese/English), static, and deliberately contains no runtime dashboard or user campaign data.

## Current repository map

| Layer | Current repository |
|---|---|
| Neutral runtime | [`sagasmith-core`](https://github.com/SagaSmithAI/sagasmith-core) |
| D&D Domain / MCP / Skills / UI | [`sagasmith-dnd`](https://github.com/SagaSmithAI/sagasmith-dnd) |
| CoC Domain / MCP / Skills / UI | [`sagasmith-coc`](https://github.com/SagaSmithAI/sagasmith-coc) |
| Narrative Domain / MCP / Skills | [`sagasmith-narrative`](https://github.com/SagaSmithAI/sagasmith-narrative) |
| Agent host | [`SagaSmith-agent`](https://github.com/SagaSmithAI/SagaSmith-agent) |
| Hosted Web product | [SagaSmith Web (`SagaSmith-Web`)](https://github.com/SagaSmithAI/SagaSmith-Web) |
| Content catalog | [`SagaSmith-dnd-content-library`](https://github.com/SagaSmithAI/SagaSmith-dnd-content-library) |

Former standalone MCP, Skills, UI, and generic Module Generator repositories
are archived history, do not accept new issues, and are not current documentation,
release inputs, or compatibility fallbacks. Their landing READMEs should point to the matching
vertical repository.

## Verified integration baseline

The public status published on 2026-08-20 is backed by a current-source hosted
run: SagaSmith Web-signed principal context reached session-scoped Agent/MCP tools,
and the D&D and CoC reference campaigns completed concurrently without a
reported regression gap. The D&D path recorded a legal ending. Catalog-wide
discovery and exclusions remain machine-readable; the site must not describe
this reference run as complete playthrough coverage for every Pack or branch.

## Development

Requires Node.js 22.12+.

```bash
npm install
npm run dev
npm run build
npm run preview
```

The Pages workflow publishes `/dnd-ui` from `apps/ui` in the current
[`sagasmith-dnd`](https://github.com/SagaSmithAI/Sagasmith-dnd) vertical
repository. That external release input is pinned to a full commit SHA in
`.github/workflows/deploy.yml` and is advanced only after the replacement
revision passes the D&D workbench CI.

Main files:

```text
src/pages/index.astro        DM/player homepage and autonomous-hosting story
src/pages/start.astro        Executable Local Kit, MCP-client, and Hosted Web entry paths
src/pages/developers.astro   Developer architecture and repository map
src/pages/library.astro      Rights-aware public Content Pack catalog frame
src/layouts/SiteLayout.astro Shared metadata, navigation, language, and footer
src/styles/site.css          Shared responsive visual system
src/lib/news.ts              Local field-note loader
news/                        Dated Markdown field notes
public/                      Logo, favicons, and social preview image
```

## Content rules

- Describe SagaSmithAI as an **AI-native TTRPG platform** with complete autonomous
  hosting as its primary end-user experience.
- Keep DM and player outcomes ahead of implementation details on the homepage.
- Present human-DM collaboration as a supported mode, not the only mode.
- Use the D&D-style fantasy d20 reference path for primary visual storytelling
  while CoC remains less mature; keep CoC in clearly labeled system-status areas.
- Present D&D as the end-to-end reference path and label CoC/UI maturity honestly.
- Always label extended ruleset import as experimental; never imply arbitrary
  rulebooks or unadapted third-party systems can be imported and run reliably.
- Keep domain state out of the website; link to MCP/Agent setup instead.
- Describe SagaSmith Web as the full hosted browser product, with its control plane as one backend
  responsibility, never as the owner of D&D, CoC, or Narrative campaign state.
- Keep the Local Agent Kit independent from SagaSmith Web and require both deployments to preserve
  the same MCP schemas, capabilities, errors, authority, revision, and idempotency behavior.
- Do not claim bundled access to commercial rulebooks or modules.
- Treat repository visibility and content licensing as separate facts. Every
  public catalog entry still requires its own license and distribution rights.
- Distinguish unified content packages from campaign saves: no permissions,
  ActorKnowledge, progress, random stream, branches, or Snapshots migrate with them.
- Describe rule-package imports as validated inactive storage; branch activation
  remains a separate Owner/DM operation and never implies source authority.
- Update the organization Profile and platform README when the platform map changes.
- Tie verification claims to dated, machine-readable regression evidence and keep
  unexecuted modules or paths explicit.

## License

Apache-2.0
