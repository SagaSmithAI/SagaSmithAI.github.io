import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

test('GET fallback cancels a body when the server ignores Range', { timeout: 10_000 }, async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'sagasmith-links-'));
  const server = createServer((request, response) => {
    if (request.method === 'HEAD') {
      response.writeHead(405).end();
      return;
    }
    response.writeHead(200, { 'content-type': 'text/plain' });
    response.write('body that continues until cancelled');
    const interval = setInterval(() => response.write('.'), 100);
    response.on('close', () => clearInterval(interval));
  });
  let child;
  try {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    await mkdir(path.join(root, 'dist'));
    await writeFile(path.join(root, 'dist/index.html'),
      `<a href="http://127.0.0.1:${server.address().port}/resource">Resource</a>`);
    const script = fileURLToPath(new URL('./check-external-links.mjs', import.meta.url));
    child = spawn(process.execPath, [script], { cwd: root, stdio: 'pipe' });
    let output = '';
    child.stdout.on('data', (chunk) => { output += chunk; });
    child.stderr.on('data', (chunk) => { output += chunk; });
    const timeout = setTimeout(() => child.kill(), 5_000);
    const [code] = await once(child, 'close');
    clearTimeout(timeout);
    assert.equal(code, 0, output);
    assert.match(output, /External-link checks passed/);
  } finally {
    if (child && child.exitCode === null) child.kill();
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});
