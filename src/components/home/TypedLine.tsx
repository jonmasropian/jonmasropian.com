'use client';

import { useEffect, useState } from 'react';

// The page's one authored motion moment. Screen readers and no-JS get the full sentence at once.
export default function TypedLine({ text, className }: { text: string; className?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      // brief beat after each sentence so it reads like someone typing, not a ticker
      if (i < text.length) timer = setTimeout(tick, text[i - 1] === '.' ? 380 : 34);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, count)}
        <span className="ml-1 inline-block h-[1.05em] w-[0.45em] translate-y-[0.15em] animate-[blink_1.1s_steps(1)_infinite] bg-crimson" />
      </span>
    </p>
  );
}
