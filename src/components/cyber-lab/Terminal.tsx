'use client';

import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Step } from '@/data/cyberLab';

const PROMPT = 'portfolio=> ';
const TOKENS = /('[^']*'?)|\b(SELECT|FROM|WHERE|ORDER|BY|WITH|AS|DESC|now|min|max|extract|age|to_char|array_to_string|year)\b/g;

// Keywords and functions in signal blue, string literals dimmed; works on half-typed text too.
function Sql({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of Array.from(text.matchAll(TOKENS))) {
    out.push(text.slice(last, m.index!));
    out.push(
      <span key={m.index!} className={m[1] ? 'text-dim' : 'text-signal'}>
        {m[0]}
      </span>,
    );
    last = m.index! + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

// Continuation lines get psql's "portfolio->" prompt, like a real multi-line statement.
function Query({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((l, i) => (
        <Fragment key={i}>
          {i > 0 && '\n'}
          <span className="text-dim">{i === 0 ? PROMPT : 'portfolio-> '}</span>
          <Sql text={l} />
        </Fragment>
      ))}
    </>
  );
}

export default function Terminal({ session }: { session: Step[] }) {
  // step = which query is typing; typed = chars shown; shown = its result is printed
  const [s, setS] = useState({ step: 0, typed: 0, shown: false });
  const box = useRef<HTMLDivElement>(null);
  const still = useRef(false);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      still.current = true;
      setS({ step: session.length, typed: 0, shown: false }); // everything, no typing
      return;
    }
    const q = session[s.step]?.query;
    let wait: number;
    let next: typeof s;
    if (!q) [wait, next] = [5000, { step: 0, typed: 0, shown: false }]; // loop
    else if (s.typed < q.length) [wait, next] = [q[s.typed] === '\n' ? 220 : 26, { ...s, typed: s.typed + 1 }];
    else if (!s.shown) [wait, next] = [450, { ...s, shown: true }]; // the "query ran" beat
    else [wait, next] = [2400, { step: s.step + 1, typed: 0, shown: false }];
    const t = setTimeout(() => setS(next), s.step === 0 && s.typed === 0 ? 900 : wait);
    return () => clearTimeout(t);
  }, [s, session]);

  useEffect(() => {
    if (box.current && !still.current) box.current.scrollTop = box.current.scrollHeight;
  }, [s]);

  const current = session[s.step];

  return (
    <div className="overflow-hidden rounded-[18px] border border-hairline bg-ground/85 shadow-[0_18px_40px_-24px_rgb(0_0_0/0.9)] lg:bg-ground/60 lg:backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-3 font-mono whitespace-nowrap text-[11px] tracking-[0.08em] text-dim uppercase">
        <span>psql · portfolio</span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-crimson" />
          Recording<span className="hidden sm:inline"> · not connected</span>
        </span>
      </div>

      {/* Screen readers get the whole session once instead of a typing loop. */}
      <pre className="sr-only">
        {session.map((st) => `${PROMPT}${st.query}\n${st.output}\n`).join('\n')}
      </pre>

      <div
        ref={box}
        aria-hidden
        className="h-[min(34rem,68dvh)] overflow-auto p-5 font-mono text-[12px] leading-[1.6] text-ink md:p-6 md:text-[13px]"
      >
        <pre className="font-mono">
          <span className="text-dim">psql (16.4){'\n'}Type &quot;help&quot; for help.{'\n\n'}</span>
          {session.slice(0, s.step).map((st, i) => (
            <Fragment key={i}>
              <Query text={st.query} />
              {'\n'}
              <span className="text-muted">{st.output}</span>
              {'\n\n'}
            </Fragment>
          ))}
          {current ? (
            <>
              <Query text={current.query.slice(0, s.typed)} />
              {s.shown ? (
                <>
                  {'\n'}
                  <span className="text-muted">{current.output}</span>
                  {'\n\n'}
                  <span className="text-dim">{PROMPT}</span>
                </>
              ) : null}
            </>
          ) : (
            <span className="text-dim">{PROMPT}</span>
          )}
          <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-[blink_1.1s_steps(1)_infinite] bg-crimson" />
        </pre>
      </div>
    </div>
  );
}
