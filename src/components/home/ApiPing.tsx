'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Times one real call to /api/github from the visitor's browser; links to the API docs.
export default function ApiPing() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    fetch('/api/github')
      .then((r) => r.ok && setMs(Math.round(performance.now() - start)))
      .catch(() => {});
  }, []);

  return (
    <Link href="/under-the-hood" className="text-dim hover:text-ink">
      API{ms !== null && <span className="text-ink tabular-nums"> · {ms} ms</span>} · docs →
    </Link>
  );
}
