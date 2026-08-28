import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const failures = [];

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const byPath = new Set(files.map((file) => path.relative(dist, file).replaceAll('\\', '/')));
const pageAnchors = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(dist, file).replaceAll('\\', '/');
  const required = [
    /<html[^>]+lang=/,
    /<title>[^<]+<\/title>/,
    /<meta name="description" content="[^"]+"/,
    /<link rel="canonical" href="https:\/\/sagasmithai\.github\.io/,
    /<meta property="og:image"/,
    /<link rel="manifest" href="\/site\.webmanifest"/,
    /<link rel="icon"/,
    /<h1[\s>]/,
    /class="zh"/,
    /class="en"/,
  ];
  required.forEach((pattern) => {
    if (!pattern.test(html)) failures.push(`${relative}: missing ${pattern}`);
  });
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) failures.push(`${relative}: expected exactly one h1`);
  if (relative === 'index.html' && (html.match(/class="news-card"/g) || []).length !== 3) failures.push(`${relative}: expected three current update cards`);
  if (relative === 'updates/index.html' && (html.match(/data-update/g) || []).length < 7) failures.push(`${relative}: expected the complete dated update list`);
  pageAnchors.set(relative, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])));
}

function pageFileFor(pathname) {
  const clean = pathname.replace(/^\//, '').replace(/\/$/, '');
  if (!clean) return 'index.html';
  if (path.extname(clean)) return clean;
  return `${clean}/index.html`;
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(dist, file).replaceAll('\\', '/');
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const [rawPath, hash] = value.split('#');
    const currentRoute = `/${relative.replace(/index\.html$/, '')}`;
    const resolved = new URL(rawPath || currentRoute, `https://sagasmithai.github.io${currentRoute}`);
    const target = pageFileFor(resolved.pathname);
    if (!byPath.has(target)) {
      failures.push(`${relative}: broken internal reference ${value} -> ${target}`);
      continue;
    }
    if (hash && target.endsWith('.html') && !pageAnchors.get(target)?.has(hash)) {
      failures.push(`${relative}: missing anchor ${value}`);
    }
  }
}

const budgets = [
  ['HTML', htmlFiles, 300_000],
  ['CSS', files.filter((file) => file.endsWith('.css')), 160_000],
  ['IMAGE', files.filter((file) => /\.(?:png|webp|jpg|jpeg|svg)$/.test(file)), 750_000],
];
for (const [label, group, max] of budgets) {
  for (const file of group) {
    const size = (await stat(file)).size;
    if (size > max) failures.push(`${path.relative(dist, file)}: ${label} asset ${size} bytes exceeds ${max}`);
  }
}

if (failures.length) {
  console.error(`Built-site checks failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Built-site checks passed: ${htmlFiles.length} HTML routes, internal links/anchors, metadata, bilingual markup, and asset budgets.`);
