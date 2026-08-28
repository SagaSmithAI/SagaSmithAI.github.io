import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const htmlFiles = (await walk(dist)).filter((file) => file.endsWith('.html'));
const links = new Set();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/\shref="(https?:\/\/[^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'));
    if (url.hostname === 'sagasmithai.github.io') continue;
    links.add(url.toString());
  }
}

const failures = [];
const warnings = [];
const queue = [...links];

async function check(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'SagaSmithAI-site-link-check/1.0' },
    });
    if (response.status === 405) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'SagaSmithAI-site-link-check/1.0', range: 'bytes=0-0' },
      });
    }
    if (response.status === 404 || response.status === 410) failures.push(`${response.status} ${url}`);
    else if (!response.ok && response.status !== 403 && response.status !== 429) failures.push(`${response.status} ${url}`);
    else if (!response.ok) warnings.push(`${response.status} ${url}`);
  } catch (error) {
    failures.push(`${error.name}: ${url}`);
  } finally {
    clearTimeout(timeout);
  }
}

const workers = Array.from({ length: Math.min(4, queue.length) }, async () => {
  while (queue.length) await check(queue.shift());
});
await Promise.all(workers);

warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
if (failures.length) {
  console.error(`External-link checks failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`External-link checks passed: ${links.size} unique URLs (${warnings.length} access-limited warnings).`);
