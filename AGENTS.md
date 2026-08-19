# SagaSmithAI Website Agent Guide

## Purpose

This Astro site is the public product and developer documentation surface for
SagaSmithAI. It must describe the current evidence and ownership boundaries
without becoming a runtime dashboard or duplicating authoritative component
documentation.

## Current repository map

- `sagasmith-core`: system-neutral runtime primitives.
- `sagasmith-dnd`, `sagasmith-coc`, `sagasmith-narrative`: vertical domain
  repositories owning Domain, MCP, Skills, and UI where present.
- `SagaSmith-agent`: Agent host and channels.
- `SagaSmith-service`: hosted control plane.
- `SagaSmith-dnd-content-library`: rights-aware Content Pack catalog.
- `.github`: organization profile and contribution/release policy.

Former standalone MCP, Skills, UI, and generic Module Generator repositories are
archived read-only. Do not link them as current repositories or suggest that
their releases remain supported entry points. Historical news may retain
accurate historical references.

## Content rules

- Describe fully autonomous hosting as the primary experience and human-DM
  collaboration as a supported mode.
- Keep Agent, Domain, MCP, Core, Service, client, and content-rights authorities
  distinct.
- Treat repository visibility, software licensing, and Pack/source/asset rights
  as separate facts.
- Do not claim bundled commercial rules or modules.
- Label extended ruleset import as experimental and never imply arbitrary books
  or unadapted systems can run safely.
- Keep Chinese and English claims aligned and update the organization profile
  when the public topology changes.

## Development

Requires Node.js 22.12+:

```powershell
npm install
npm run dev
npm run build
npm run preview
```

Use the repository scripts as the source of truth. A topology change is not
complete until `src/pages/developers.astro` and the relevant README/profile/news
entry agree.
