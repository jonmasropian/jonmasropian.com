// Formats rows the way psql's default "aligned" output does, so the Cyber Lab recording looks real.
export function psqlTable(columns: string[], rows: (string | number)[][]): string {
  const cells = rows.map((r) => r.map(String));
  const widths = columns.map((c, i) => Math.max(c.length, ...cells.map((r) => r[i].length)));
  // psql centers headers, left-aligns text, right-aligns numbers
  const header = columns.map((c, i) => {
    const pad = widths[i] - c.length;
    return ' '.repeat(Math.floor(pad / 2)) + c + ' '.repeat(Math.ceil(pad / 2));
  });
  const line = (parts: string[]) => ` ${parts.join(' | ')}`.trimEnd();
  const body = rows.map((r) =>
    line(r.map((v, i) => (typeof v === 'number' ? String(v).padStart(widths[i]) : String(v).padEnd(widths[i])))),
  );
  const n = rows.length;
  return [line(header), widths.map((w) => '-'.repeat(w + 2)).join('+'), ...body, `(${n} row${n === 1 ? '' : 's'})`].join('\n');
}
