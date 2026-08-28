import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const requiredPages = ['index', 'start', 'developers', 'library', 'updates', 'security', 'privacy', '404'];
const currentRepos = [
  'SagaSmith-agent',
  'SagaSmith-Web',
  'Sagasmith-core',
  'Sagasmith-dnd',
  'Sagasmith-coc',
  'sagasmith-narrative',
  'SagaSmith-dnd-content-library',
];
const legacyNames = [
  'SagaSmith-service',
  'SagaSmith-dnd-mcp',
  'SagaSmith-dnd-skills',
  'sagasmith-dnd-ui',
  'SagaSmith-coc-mcp',
  'SagaSmith-coc-skills',
  'sagasmith-coc-ui',
  'SagaSmith-narrative-mcp',
  'SagaSmith-narrative-skills',
  'SagaSmith-module-gen-skills',
  'sagasmith-ui',
];

const read = (file) => readFile(path.join(root, file), 'utf8');

for (const page of requiredPages) {
  const file = `src/pages/${page}.astro`;
  try {
    const source = await read(file);
    if (!source.includes('<SiteLayout')) failures.push(`${file}: missing SiteLayout`);
    if (!source.includes('titleEn=')) failures.push(`${file}: missing English title`);
    if (!source.includes('descriptionEn=')) failures.push(`${file}: missing English description`);
    if (!source.includes('class="zh"') || !source.includes('class="en"')) failures.push(`${file}: missing bilingual content`);
  } catch {
    failures.push(`${file}: missing required page`);
  }
}

const authoritativeFiles = [
  ...(await readdir(path.join(root, 'src', 'pages'))).filter((file) => file.endsWith('.astro')).map((file) => `src/pages/${file}`),
  'src/layouts/SiteLayout.astro',
  'src/lib/site.ts',
  'README.md',
  'AGENTS.md',
  '.github/workflows/deploy.yml',
];
const authoritativeText = (await Promise.all(authoritativeFiles.map(read))).join('\n');

for (const legacy of legacyNames) {
  if (authoritativeText.includes(legacy)) failures.push(`authoritative surfaces still name legacy repository: ${legacy}`);
}
for (const repo of currentRepos) {
  if (!authoritativeText.includes(repo)) failures.push(`current repository missing from authoritative surfaces: ${repo}`);
}

const workflow = await read('.github/workflows/deploy.yml');
if (/repository:\s+SagaSmithAI\//.test(workflow)) failures.push('Pages workflow still checks out an external release input');
if (workflow.includes('/dnd-ui') || workflow.includes('build:ui')) failures.push('Pages workflow still bundles a domain Workbench');

const manifest = JSON.parse(await read('public/site.webmanifest'));
if (manifest.start_url !== '/' || manifest.scope !== '/') failures.push('manifest start_url and scope must both be /');
if (!manifest.icons?.some((icon) => icon.src === '/favicon.svg')) failures.push('manifest is missing the SVG icon');

const sitemap = await read('public/sitemap.xml');
for (const page of requiredPages.filter((page) => page !== '404' && page !== 'index')) {
  if (!sitemap.includes(`/${page}</loc>`)) failures.push(`sitemap missing /${page}`);
}

if (failures.length) {
  console.error(`Content checks failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Content checks passed: ${requiredPages.length} bilingual routes, current topology, manifest, sitemap, and Pages source.`);
