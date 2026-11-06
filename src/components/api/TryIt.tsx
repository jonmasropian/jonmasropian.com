'use client';

import { useState } from 'react';
import { LoaderCircle, Play } from 'lucide-react';

type Result = { status: number; ms: number; body: string } | { failed: true };

// Sends a real request to this site's API and prints the real response.
export default function TryIt({ method, path, body }: { method: 'GET' | 'POST'; path: string; body?: object }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function run() {
    setBusy(true);
    const start = performance.now();
    try {
      const res = await fetch(path, {
        method,
        cache: 'no-store',
        ...(body && { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
      });
      const text = await res.text();
      let pretty = text;
      try {
        pretty = JSON.stringify(JSON.parse(text), null, 2);
      } catch {}
      setResult({ status: res.status, ms: Math.round(performance.now() - start), body: pretty });
    } catch {
      setResult({ failed: true });
    }
    setBusy(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => !busy && run()}
        aria-disabled={busy}
        className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-3 font-mono text-xs tracking-[0.08em] text-signal uppercase transition-colors hover:border-signal/60 hover:text-ink aria-disabled:cursor-wait"
      >
        {busy ? <LoaderCircle aria-hidden size={14} className="animate-spin" /> : <Play aria-hidden size={14} strokeWidth={1.75} />}
        Try it<span className="sr-only">: {method} {path}</span>
      </button>

      <div aria-live="polite">
        {result &&
          ('failed' in result ? (
            <p className="mt-4 text-alert">The request didn&apos;t reach the server. Check your connection and try again.</p>
          ) : (
            <div className="mt-4 overflow-hidden rounded-xl border border-hairline bg-ground/80">
              <p className="flex gap-5 border-b border-hairline px-4 py-3 font-mono text-xs text-dim tabular-nums">
                <span className={result.status < 400 ? 'text-signal' : 'text-alert'}>{result.status}</span>
                <span>{result.ms} ms</span>
              </p>
              <pre className="max-h-80 overflow-auto p-4 font-mono text-[12px] leading-relaxed text-muted">{result.body}</pre>
            </div>
          ))}
      </div>
    </div>
  );
}
