# SagaSmithAI Website

The source for [sagasmithai.github.io](https://sagasmithai.github.io): the public home of the AI-native TTRPG platform.

## What the site communicates

- the platform positioning and design principles;
- the `lobby` → `play` → `combat` D&D MCP lifecycle;
- Agent/MCP/rules/Core ownership boundaries;
- repository map and honest maturity labels;
- short architecture and field-note updates.

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
src/pages/index.astro   Homepage, content, styles, interactions
src/lib/news.ts         Local field-note loader
news/                   Dated Markdown field notes
public/                 Logo and favicons
```

## Content rules

- Describe SagaSmithAI as an **AI-native TTRPG platform**, not a single AI DM.
- Present D&D as the end-to-end reference path and label CoC/UI maturity honestly.
- Keep domain state out of the website; link to MCP/Agent setup instead.
- Do not claim bundled access to commercial rulebooks or modules.
- Update the organization Profile and platform README when the platform map changes.

## License

MIT
