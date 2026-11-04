// Run: node --test src/lib/github.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { summarize, timeAgo } from './github.ts';

const now = Date.parse('2026-11-04T12:00:00Z');
const ev = (type: string, at: string, repo = 'jonmasropian/a') => ({ type, created_at: at, repo: { name: repo } });

test('summarize picks the newest push and counts 30-day pushes', () => {
  const s = summarize(
    [
      ev('PushEvent', '2026-10-01T00:00:00Z'),
      ev('CreateEvent', '2026-11-04T11:00:00Z'),
      ev('PushEvent', '2026-11-03T12:00:00Z', 'jonmasropian/newest'),
      ev('PushEvent', '2026-10-20T00:00:00Z'),
    ],
    now,
  );
  assert.deepEqual(s, { lastPushRepo: 'newest', lastPushAt: '2026-11-03T12:00:00Z', pushes30d: 2 });
});

test('summarize returns null without pushes', () => {
  assert.equal(summarize([ev('CreateEvent', '2026-11-01T00:00:00Z')], now), null);
});

test('timeAgo units', () => {
  assert.equal(timeAgo('2026-11-04T11:55:00Z', now), '5 min ago');
  assert.equal(timeAgo('2026-11-04T11:00:00Z', now), '1 hr ago');
  assert.equal(timeAgo('2026-11-01T12:00:00Z', now), '3 days ago');
});
