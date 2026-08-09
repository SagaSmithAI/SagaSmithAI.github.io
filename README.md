# SagaSmithAI Website

The source for [sagasmithai.github.io](https://sagasmithai.github.io): the public home of the AI-native TTRPG platform.

## What the site communicates

- fully autonomous game mastering as the primary player-facing experience;
- human-DM collaboration as a supported second hosting mode;
- persistent choices, actor-scoped knowledge, and clear table boundaries;
- honest D&D and CoC experience status;
- extended ruleset import as an explicitly experimental capability;
- checksum-validated unified core-rule, addon, module, and preset packages;
- the separately deployed, license-gated
  [D&D Content Library](https://sagasmithai.github.io/SagaSmith-dnd-content-library/),
  visualized by the D&D UI without duplicating package data in this repository;
- a separate developer path for architecture, repositories, and ownership boundaries;
- short public-facing platform updates.

The site is bilingual (Chinese/English), static, and deliberately contains no runtime dashboard or user campaign data.

## Development

Requires Node.js 22.12+.

```bash
npm install
npm run dev
npm run build
npm run preview
```

Main files:

```text
src/pages/index.astro        DM/player homepage and autonomous-hosting story
src/pages/developers.astro   Developer architecture and repository map
src/layouts/SiteLayout.astro Shared metadata, navigation, language, and footer
src/styles/site.css          Shared responsive visual system
src/lib/news.ts              Local field-note loader
news/                        Dated Markdown field notes
public/                      Logo and favicons
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
- Do not claim bundled access to commercial rulebooks or modules.
- Distinguish unified content packages from campaign saves: no permissions,
  ActorKnowledge, progress, random stream, branches, or Snapshots migrate with them.
- Describe rule-package imports as validated inactive installations; branch activation
  remains a separate Owner/DM operation and never implies source authority.
- Update the organization Profile and platform README when the platform map changes.

## License

Apache-2.0
