// Run: node --test src/lib/psql.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { psqlTable } from './psql.ts';

test('psqlTable matches psql aligned output', () => {
  assert.equal(
    psqlTable(['org', 'years'], [['U.S. Army', 22]]),
    ['    org    | years', '-----------+-------', ' U.S. Army |    22', '(1 row)'].join('\n'),
  );
});

test('psqlTable pads text columns and pluralizes the row count', () => {
  const out = psqlTable(['a', 'b'], [['x', 'long'], ['yy', 'z']]).split('\n');
  assert.equal(out[2], ' x  | long');
  assert.equal(out[3], ' yy | z');
  assert.equal(out[4], '(2 rows)');
});
