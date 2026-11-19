import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import worker from './worker.mjs';

const host = 'review.example.test';
const digest = 'e'.repeat(64);
const content = '%PDF-1.5\nfixture';
const catalogue = {version: 1, documents: [{sha256: digest, filename: 'Revue <é>.pdf', size: content.length}]};
const original = {body: content, size: content.length};
const password = 'example-reviewer-password-for-test';
const authorization = 'Basic ' + btoa(`reviewer:${password}`);

function fixture() {
  const calls = [];
  const env = {
    REVIEW_HOST: host, REVIEW_PASSWORD: password,
    REVIEW_RATE_LIMIT: { limit: async () => ({ success: true }) },
    REVIEW_PDFS: {
      async get(key) {
        calls.push(['get', key]);
        if (key === 'catalogue.json') return { json: async () => catalogue };
        if (key === `pdfs/${digest}.pdf`) return original;
      },
      async head(key) { calls.push(['head', key]); return key === `pdfs/${digest}.pdf` ? original : null; },
    },
  };
  const request = (path, {auth, method = 'GET', origin = `https://${host}`} = {}) => worker.fetch(new Request(origin + path, {
    method, headers: auth ? { Authorization: auth } : {},
  }), env);
  return { env, calls, request };
}

test('catalogue and both direct document routes fail before accessing storage without credentials', async () => {
  const { request, calls } = fixture();
  for (const path of ['/', `/view/${digest}`, `/download/${digest}`]) {
    for (const method of ['GET', 'HEAD']) {
      const result = await request(path, {method});
      assert.equal(result.status, 401);
      assert.match(result.headers.get('WWW-Authenticate'), /^Basic/);
      assert.equal(result.headers.get('Cache-Control'), 'private, no-store');
      if (method === 'HEAD') assert.equal(await result.text(), '');
    }
    assert.equal((await request(path, {auth: 'Basic YmFkOjE='})).status, 401);
  }
  assert.deepEqual(calls, []);
});

test('reject unconfigured passwords, other hostnames, HTTP and rate-limited attempts', async () => {
  const { request, env, calls } = fixture();
  assert.equal((await request('/', {origin: 'https://worker.workers.dev', auth: authorization})).status, 404);
  assert.equal((await request('/', {origin: `http://${host}`, auth: authorization})).status, 404);
  env.REVIEW_RATE_LIMIT.limit = async () => ({success: false});
  assert.equal((await request('/', {auth: 'Basic YmFkOjE='})).status, 429);
  env.REVIEW_PASSWORD = undefined;
  assert.equal((await request('/', {auth: authorization})).status, 503);
  assert.deepEqual(calls, []);
});

test('authenticated catalogue escapes titles and PDFs serve originals inline or as downloads', async () => {
  const { request, calls } = fixture();
  const listing = await request('/', {auth: authorization});
  assert.equal(listing.status, 200);
  assert.equal(listing.headers.get('X-Robots-Tag'), 'noindex, nofollow, noarchive');
  assert.match(await listing.text(), /Revue &lt;é&gt;\.pdf/);
  for (const [action, disposition] of [['view', 'inline'], ['download', 'attachment']]) {
    const pdf = await request(`/${action}/${digest}`, {auth: authorization});
    assert.equal(pdf.status, 200);
    assert.match(pdf.headers.get('Content-Disposition'), new RegExp(`^${disposition}`));
    assert.equal(pdf.headers.get('Content-Type'), 'application/pdf');
    assert.equal(pdf.headers.get('Cache-Control'), 'private, no-store');
    assert.equal(await pdf.text(), content);
  }
  const headersOnly = await request(`/view/${digest}`, {auth: authorization, method: 'HEAD'});
  assert.equal(headersOnly.status, 200);
  assert.equal(await headersOnly.text(), '');
  assert.deepEqual(calls.at(-1), ['head', `pdfs/${digest}.pdf`]);
});

test('uncatalogued keys and mismatched objects cannot be served', async () => {
  const { request, env, calls } = fixture();
  assert.equal((await request(`/view/${'1'.repeat(64)}`, {auth: authorization})).status, 404);
  assert.deepEqual(calls, [['get', 'catalogue.json']]);
  const get = env.REVIEW_PDFS.get;
  env.REVIEW_PDFS.get = async (key) => key === 'catalogue.json' ? get(key) : {...original, size: 1};
  assert.equal((await request(`/download/${digest}`, {auth: authorization})).status, 404);
});

test('a password change invalidates the old credential', async () => {
  const { request, env, calls } = fixture();
  env.REVIEW_PASSWORD = 'new-example-reviewer-password';
  assert.equal((await request('/', {auth: authorization})).status, 401);
  assert.deepEqual(calls, []);
  const result = await request('/', {auth: 'Basic ' + btoa(`reviewer:${env.REVIEW_PASSWORD}`)});
  assert.equal(result.status, 200);
});
