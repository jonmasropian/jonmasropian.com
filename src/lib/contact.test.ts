// Run: node --test src/lib/contact.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rateLimited, validateContact, WINDOW_MS } from './contact.ts';

test('validateContact accepts a good message and trims it', () => {
  assert.deepEqual(validateContact({ name: ' Ana ', email: 'ana@x.io', message: 'Hello there, Jon.' }), {
    data: { name: 'Ana', email: 'ana@x.io', message: 'Hello there, Jon.' },
  });
});

test('validateContact reports every bad field, including junk bodies', () => {
  const r = validateContact({ name: '', email: 'nope', message: 'hi' });
  assert.deepEqual(Object.keys('errors' in r ? r.errors : {}).sort(), ['email', 'message', 'name']);
  assert.ok('errors' in validateContact(null));
  assert.ok('errors' in validateContact({ name: 5, email: [], message: {} }));
});

test('validateContact strips newlines from the name (email subject)', () => {
  const r = validateContact({ name: 'A\r\nBcc: x@y.z', email: 'a@b.co', message: '0123456789' });
  assert.ok('data' in r && !/[\r\n]/.test(r.data.name));
});

test('rateLimited allows 3 per window, then blocks until the window passes', () => {
  const t = 1_000_000;
  assert.equal(rateLimited('ip', t), false);
  assert.equal(rateLimited('ip', t + 1), false);
  assert.equal(rateLimited('ip', t + 2), false);
  assert.equal(rateLimited('ip', t + 3), true);
  assert.equal(rateLimited('other', t + 3), false);
  assert.equal(rateLimited('ip', t + WINDOW_MS + 5), false);
});
