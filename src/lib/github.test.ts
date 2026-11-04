// Run: node --test src/lib/github.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { summarizeCommits, summarizeEvents, timeAgo } from './github.ts';

const now = Date.parse('2026-11-04T12:00:00Z');
const ev = (type: string, at: string, repo = 'jonmasropian/a') => ({ type, created_at: at, repo: { name: repo } });
const commit = (date: string) => ({ commit: { author: { date } } });

test('summarizeEvents picks the newest push and counts 30-day pushes', () => {
  const s = summarizeEvents(
    [
      ev('PushEvent', '2026-10-01T00:00:00Z'),
      ev('CreateEvent', '2026-11-04T11:00:00Z'),
      ev('PushEvent', '2026-11-03T12:00:00Z', 'jonmasropian/newest'),
      ev('PushEvent', '2026-10-20T00:00:00Z'),
    ],
    now,
  );
  assert.deepEqual(s, { repo: 'newest', isPrivate: false, lastAt: '2026-11-03T12:00:00Z', count30d: 2, unit: 'pushes' });
});

test('summarizeEvents returns null without pushes', () => {
  assert.equal(summarizeEvents([ev('CreateEvent', '2026-11-01T00:00:00Z')], now), null);
});

test('summarizeCommits uses the newest commit date regardless of order', () => {
  const s = summarizeCommits([commit('2026-10-28T16:03:43Z'), commit('2026-11-03T23:48:21Z')]);
  assert.equal(s?.lastAt, '2026-11-03T23:48:21Z');
  assert.equal(s?.count30d, 2);
  assert.equal(s?.repo, 'LMS_Backend');
  assert.equal(summarizeCommits([]), null);
});

test('timeAgo units', () => {
  assert.equal(timeAgo('2026-11-04T11:55:00Z', now), '5 min ago');
  assert.equal(timeAgo('2026-11-04T11:00:00Z', now), '1 hr ago');
  assert.equal(timeAgo('2026-11-01T12:00:00Z', now), '3 days ago');
});
