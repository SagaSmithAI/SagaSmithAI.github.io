import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const statusPath = resolve(root, 'src/data/library-catalog-status.json');
const status = JSON.parse(await readFile(statusPath, 'utf8'));
const publicStatus = JSON.parse(
  await readFile(resolve(root, 'public/library-catalog-status.json'), 'utf8'),
);
for (const field of ['catalog_url', 'generated_on', 'source_commit', 'surface', 'published_at']) {
  if (status[field] !== publicStatus[field]) {
    throw new Error(`catalog marker mismatch between src/data and public: ${field}`);
  }
}

const catalogResponse = await fetch(status.catalog_url, {
  headers: { 'user-agent': 'SagaSmithAI-site-catalog-check/1' },
});
if (!catalogResponse.ok) {
  throw new Error(`catalog index request failed: ${catalogResponse.status}`);
}
const catalog = await catalogResponse.json();

const commitsResponse = await fetch(
  'https://api.github.com/repos/SagaSmithAI/SagaSmith-dnd-content-library/commits?path=content-library/index.json&per_page=1',
  {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'SagaSmithAI-site-catalog-check/1',
    },
  },
);
if (!commitsResponse.ok) {
  throw new Error(`catalog source lookup failed: ${commitsResponse.status}`);
}
const commits = await commitsResponse.json();
const sourceCommit = commits?.[0]?.sha;
if (typeof sourceCommit !== 'string' || sourceCommit.length !== 40) {
  throw new Error('catalog source lookup returned no commit');
}

if (status.generated_on !== catalog.generated_on) {
  throw new Error(
    `catalog date mismatch: marker=${status.generated_on}, index=${catalog.generated_on}`,
  );
}
if (status.source_commit !== sourceCommit) {
  throw new Error(
    `catalog source mismatch: marker=${status.source_commit}, main=${sourceCommit}`,
  );
}

console.log(
  JSON.stringify({
    fresh: true,
    generated_on: status.generated_on,
    source_commit: sourceCommit,
  }),
);
